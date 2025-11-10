import { createServerClient } from "@supabase/ssr";
import { User } from "@supabase/supabase-js";
import { NextResponse, type NextRequest } from "next/server";
import { UserRole, AccountStatus } from "@prisma/client";

// Types
type RouteType =
  | "auth"
  | "admin"
  | "user"
  | "onboarding"
  | "verification"
  | "public";

// Route configuration
const ROUTE_CONFIG = {
  auth: ["/sign-in", "/sign-up", "/reset-password"],
  admin: ["/admin"],
  user: ["/app/form"],
  onboarding: ["/onboarding"],
  verification: ["/welcome-and-verify"],
  public: ["/", "/about", "/contact", "/pricing"], // Explicit public routes
  redirects: {
    ADMIN: "/admin",
    USER: "/app/form",
  },
} as const;

// Helper function to copy cookies from source to target response
function copyCookies(
  sourceResponse: NextResponse,
  targetResponse: NextResponse
): void {
  sourceResponse.cookies
    .getAll()
    .forEach(({ name, value, ...options }) =>
      targetResponse.cookies.set(name, value, options)
    );
}

// Helper function to classify route type
function getRouteType(pathname: string): RouteType {
  // Exact matching for better precision - avoid false positives
  if (pathname === "/admin" || pathname.startsWith("/admin/")) return "admin";
  if (ROUTE_CONFIG.onboarding.some((route) => pathname.startsWith(route)))
    return "onboarding";
  if (pathname === "/app" || pathname.startsWith("/app/")) return "user";
  if (ROUTE_CONFIG.verification.some((route) => pathname.startsWith(route)))
    return "verification";
  if (ROUTE_CONFIG.auth.some((route) => pathname.startsWith(route)))
    return "auth";
  if (ROUTE_CONFIG.public.some((route) => pathname === route)) return "public";
  return "public"; // Default to public for any unmatched routes
}

// Helper function to create redirect with cookies
function createRedirectWithCookies(
  url: string,
  request: NextRequest,
  supabaseResponse: NextResponse
): NextResponse {
  const redirectResponse = NextResponse.redirect(new URL(url, request.url));
  copyCookies(supabaseResponse, redirectResponse);
  return redirectResponse;
}

// Helper function to force logout and redirect to sign-in
function createLogoutRedirect(
  request: NextRequest,
  supabaseResponse: NextResponse,
  reason: string = "invalid_role"
): NextResponse {
  const signInUrl = new URL("/sign-in", request.url);
  signInUrl.searchParams.set("reason", reason);

  const redirectResponse = NextResponse.redirect(signInUrl);

  // Clear Supabase auth cookies to force logout
  const authCookiesToClear = [
    "sb-access-token",
    "sb-refresh-token",
    "supabase-auth-token",
    "supabase.auth.token",
    "sb-provider-token",
    "sb-provider-refresh-token",
  ];

  authCookiesToClear.forEach((cookieName) => {
    redirectResponse.cookies.set(cookieName, "", {
      expires: new Date(0),
      path: "/",
    });
  });

  // Still copy other non-auth cookies from supabase response
  supabaseResponse.cookies.getAll().forEach(({ name, value, ...options }) => {
    if (!authCookiesToClear.includes(name)) {
      redirectResponse.cookies.set(name, value, options);
    }
  });

  return redirectResponse;
}

// Helper function to validate user role
function isValidUserRole(role: any): role is UserRole {
  return (
    typeof role === "string" &&
    Object.values(UserRole).includes(role as UserRole)
  );
}

// Helper function to validate user status
function isValidUserStatus(status: any): status is AccountStatus {
  return (
    typeof status === "string" &&
    Object.values(AccountStatus).includes(status as AccountStatus)
  );
}

// Route protection logic separated from session management
function protectRoute(
  user: User | null,
  pathname: string,
  request: NextRequest,
  supabaseResponse: NextResponse
): NextResponse | null {
  const routeType = getRouteType(pathname);
  const userRole = user?.user_metadata?.role;
  const userStatus = user?.user_metadata?.status;

  // Handle unauthenticated users
  if (!user) {
    if (
      routeType === "admin" ||
      routeType === "user" ||
      routeType === "onboarding" ||
      routeType === "verification"
    ) {
      const signInUrl = new URL("/sign-in", request.url);
      signInUrl.searchParams.set("redirectTo", pathname);
      return createRedirectWithCookies(
        signInUrl.toString(),
        request,
        supabaseResponse
      );
    }
    return null; // Allow access to auth and public routes
  }

  // Handle authenticated users based on verification status
  if (
    isValidUserStatus(userStatus) &&
    userStatus === AccountStatus.PENDING_VERIFICATION
  ) {
    // Users with pending verification should only access verification routes
    if (routeType !== "verification" && routeType !== "public") {
      return createRedirectWithCookies(
        "/welcome-and-verify",
        request,
        supabaseResponse
      );
    }
    return null; // Allow access to verification and public routes
  }

  // Handle authenticated users on verification routes (already verified)
  if (routeType === "verification") {
    // Only verified users with valid roles should be redirected away from verification
    if (
      isValidUserRole(userRole) &&
      (!userStatus || userStatus === AccountStatus.ACTIVE)
    ) {
      const redirectUrl = ROUTE_CONFIG.redirects[userRole];
      return createRedirectWithCookies(redirectUrl, request, supabaseResponse);
    }
    return null; // Allow access if not properly verified/setup
  }

  // Handle authenticated users on auth routes
  if (routeType === "auth") {
    // Authenticated users should never access auth routes
    // Redirect them to appropriate dashboard based on role
    if (isValidUserRole(userRole)) {
      if (userStatus === AccountStatus.ACTIVE || !userStatus) {
        const redirectUrl = ROUTE_CONFIG.redirects[userRole];
        return createRedirectWithCookies(
          redirectUrl,
          request,
          supabaseResponse
        );
      } else if (userStatus === AccountStatus.PENDING_VERIFICATION) {
        // If pending verification, redirect to verification page
        return createRedirectWithCookies(
          "/welcome-and-verify",
          request,
          supabaseResponse
        );
      }
    } else {
      // User exists but has invalid role - force logout
      return createLogoutRedirect(request, supabaseResponse, "invalid_role");
    }
  }

  // Handle users with invalid or missing roles
  if (!isValidUserRole(userRole)) {
    // Force logout for users without valid roles trying to access protected routes
    if (routeType === "admin" || routeType === "user") {
      return createLogoutRedirect(request, supabaseResponse, "missing_role");
    }
    // Allow access to public routes even with invalid role
    return null;
  }

  // Role-based access control for users with valid roles and verified status
  if (userRole === UserRole.ADMIN) {
    // Admin trying to access user routes - redirect to admin dashboard
    if (routeType === "user" || routeType === "onboarding") {
      return createRedirectWithCookies("/admin", request, supabaseResponse);
    }
  } else if (userRole === UserRole.USER) {
    // Check onboarding status for USER role only
    const hasBasicApplicantData = user?.user_metadata?.hasBasicApplicantData;

    // Handle onboarding flow for users with ACTIVE status
    if (userStatus === AccountStatus.ACTIVE || !userStatus) {
      if (hasBasicApplicantData === false) {
        // User hasn't completed onboarding - redirect to onboarding unless already there
        if (routeType !== "onboarding") {
          return createRedirectWithCookies(
            "/onboarding",
            request,
            supabaseResponse
          );
        }
      } else if (hasBasicApplicantData === true) {
        // User has completed onboarding - redirect away from onboarding to main app
        if (routeType === "onboarding") {
          return createRedirectWithCookies(
            "/app/form",
            request,
            supabaseResponse
          );
        }
      }
      // If hasBasicApplicantData is undefined, allow access (backward compatibility)
    }

    // User trying to access admin routes - redirect to user dashboard
    if (routeType === "admin") {
      return createRedirectWithCookies("/app/form", request, supabaseResponse);
    }
  }

  return null; // Allow access
}

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!, // Using ANON_KEY as per Supabase recommendations
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) =>
            request.cookies.set(name, value)
          );
          supabaseResponse = NextResponse.next({
            request,
          });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  // Do not run code between createServerClient and supabase.auth.getUser()
  // A simple mistake could make it very hard to debug issues with users being randomly logged out.

  // IMPORTANT: DO NOT REMOVE auth.getUser() - this refreshes the auth token
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Apply route protection
  const protectionResult = protectRoute(
    user,
    request.nextUrl.pathname,
    request,
    supabaseResponse
  );
  if (protectionResult) {
    return protectionResult;
  }

  // IMPORTANT: You *must* return the supabaseResponse object as it is.
  // If you're creating a new response object with NextResponse.next() make sure to:
  // 1. Pass the request in it, like so: const myNewResponse = NextResponse.next({ request })
  // 2. Copy over the cookies, like so: myNewResponse.cookies.setAll(supabaseResponse.cookies.getAll())
  // 3. Change the myNewResponse object to fit your needs, but avoid changing the cookies!
  // 4. Finally: return myNewResponse
  // If this is not done, you may be causing the browser and server to go out of sync
  // and terminate the user's session prematurely!

  return supabaseResponse;
}
