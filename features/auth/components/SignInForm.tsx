"use client";

import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { FaRegEye, FaRegEyeSlash, FaGoogle } from "react-icons/fa6";
import { loginSchema, type ZLoginInput } from "../validators/user.validator";
import { useSignInWithCredentials } from "../hooks/useSignInWithCridentials";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shared/components/ui/form";
import { Input } from "@/shared/components/ui/input";
import { Button } from "@/shared/components/ui/button";

import Image from "next/image";
import { Separator } from "@/shared/components/ui/separator";

export function SignInForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [urlMessage, setUrlMessage] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({ type: null, message: "" });

  const router = useRouter();
  const searchParams = useSearchParams();

  // Handle URL parameters for email verification messages
  useEffect(() => {
    const success = searchParams.get("success");
    const error = searchParams.get("error");
    const message = searchParams.get("message");

    if (success === "true" && message) {
      setUrlMessage({ type: "success", message: decodeURIComponent(message) });
    } else if (error && message) {
      setUrlMessage({ type: "error", message: decodeURIComponent(message) });
    }

    // Clear URL parameters after reading them
    if (success || error) {
      const url = new URL(window.location.href);
      url.searchParams.delete("success");
      url.searchParams.delete("error");
      url.searchParams.delete("message");
      window.history.replaceState({}, "", url.toString());
    }
  }, [searchParams]);

  const form = useForm<ZLoginInput>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const {
    mutate: signInUser,
    isPending: isSigningIn,
    isError,
    error,
    isSuccess,
  } = useSignInWithCredentials({
    onSuccess: (response) => {
      // Reset form on success
      form.reset();
      console.log(
        "User signed in successfully:",
        response?.message || "Success"
      );

      // Use navigation instead of refresh to avoid potential issues
      setTimeout(() => {
        // Redirect to the app dashboard
        router.push("/app/form");
      }, 1000); // Give user time to see success message
    },
    onError: (error) => {
      console.error("Sign in error:", error);
      form.setError("root", { message: error });
    },
  });

  const onSubmit = (data: ZLoginInput) => {
    // Prevent multiple submissions
    if (isSigningIn) return;

    // Clear any previous errors
    form.clearErrors("root");

    signInUser(data);
  };

  const handleGoogleSignIn = () => {
    // TODO: Implement Google OAuth
    console.log("Google sign in clicked");
  };

  return (
    <div className="lg:min-h-screen min-h-full relative bg-primary/5 py-20 grid place-items-center">
      <div
        className="absolute opacity-40 inset-0 z-0"
        style={{
          backgroundImage: `
        linear-gradient(to right, hsl(var(--border)) 1px, transparent 1px),
        linear-gradient(to bottom, hsl(var(--border)) 1px, transparent 1px)
      `,
          backgroundSize: "32px 32px",
          WebkitMaskImage:
            "radial-gradient(ellipse 80% 80% at 100% 0%, #000 50%, transparent 90%)",
          maskImage:
            "radial-gradient(ellipse 80% 80% at 100% 0%, #000 50%, transparent 90%)",
        }}
      />
      <div className="w-full max-w-[320px] sm:max-w-[400px] items-center relative gap-6 sm:gap-8 flex flex-col">
        <Image
          src="/I&V-no-bg.png"
          alt="Vignettes Logo"
          width={400}
          height={150}
          className="w-[160px] sm:w-[200px] object-contain"
        />
        <div className="flex flex-col gap-4 sm:gap-6 w-full">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-col gap-4 sm:gap-6 w-full"
            >
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter your email address"
                        type="email"
                        disabled={isSigningIn}
                        className={`h-10 sm:h-12 rounded bg-white text-sm sm:text-base focus-visible:ring-0 focus-visible:ring-offset-0 ${
                          form.formState.errors.email
                            ? "border-destructive"
                            : ""
                        }`}
                        {...field}
                      />
                    </FormControl>

                    <FormMessage className="text-destructive text-sm" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          placeholder="Enter your password"
                          type={showPassword ? "text" : "password"}
                          disabled={isSigningIn}
                          className={`h-10 sm:h-12 rounded pr-10 bg-white text-sm sm:text-base focus-visible:ring-0 focus-visible:ring-offset-0 ${
                            form.formState.errors.password
                              ? "border-destructive"
                              : ""
                          }`}
                          {...field}
                        />
                        <button
                          type="button"
                          disabled={isSigningIn}
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-2 sm:right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {showPassword ? <FaRegEyeSlash /> : <FaRegEye />}
                        </button>
                      </div>
                    </FormControl>
                    <FormMessage className="text-destructive text-sm" />
                  </FormItem>
                )}
              />

              <Link
                href="/forgot-password"
                className="text-sm text-primary underline self-end justify-self-end text-right w-max hover:text-primary/80 transition-colors"
              >
                Forgot password?
              </Link>

              <Button
                type="submit"
                disabled={isSigningIn}
                className="rounded h-10 sm:h-12 w-full bg-primary hover:bg-primary/90 text-primary-foreground transition-colors cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed text-sm sm:text-base"
              >
                {isSigningIn ? (
                  <div className="flex items-center gap-2">
                    <div className="animate-spin rounded-full h-3 w-3 sm:h-4 sm:w-4 border-2 border-white border-t-transparent"></div>
                    <span className="text-xs sm:text-sm">Signing In...</span>
                  </div>
                ) : (
                  "Sign In"
                )}
              </Button>

              {/* URL Error Message (from email verification) */}
              {urlMessage.type === "error" && (
                <div className="p-2 sm:p-3 bg-red-50 border border-red-200 rounded-lg">
                  <span className="text-red-600 text-xs sm:text-sm">
                    {urlMessage.message}
                  </span>
                </div>
              )}

              {/* Form Error Message */}
              {!urlMessage.message &&
                ((isError && error) || form.formState.errors.root) && (
                  <div className="p-2 sm:p-3 bg-red-50 border border-red-200 rounded-lg">
                    <span className="text-red-600 text-xs sm:text-sm">
                      {error || form.formState.errors.root?.message}
                    </span>
                  </div>
                )}

              {/* URL Success Message (from email verification) */}
              {urlMessage.type === "success" && (
                <div className="p-2 sm:p-3 bg-green-50 border border-green-200 rounded-lg">
                  <span className="text-green-600 text-xs sm:text-sm">
                    {urlMessage.message}
                  </span>
                </div>
              )}

              {/* Form Success Message */}
              {!urlMessage.message && isSuccess && (
                <div className="p-2 sm:p-3 bg-green-50 border border-green-200 rounded-lg">
                  <span className="text-green-600 text-xs sm:text-sm">
                    Welcome back! You have been signed in successfully.
                  </span>
                </div>
              )}
            </form>
          </Form>
          <div className=" grid grid-cols-[1fr_20px_1fr] w-full items-center gap-3">
            <Separator />
            or
            <Separator />
          </div>
          <Button
            variant="outline"
            disabled={isSigningIn}
            className="w-full rounded h-10 sm:h-12 flex items-center justify-center gap-2 sm:gap-3 border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-colors cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed text-sm sm:text-base"
            onClick={handleGoogleSignIn}
          >
            {isSigningIn ? (
              <div className="flex items-center gap-2">
                <div className="animate-spin rounded-full h-3 w-3 sm:h-4 sm:w-4 border-2 border-primary border-t-transparent"></div>
                <span className="text-xs sm:text-sm">Please wait...</span>
              </div>
            ) : (
              <>
                <FaGoogle className="w-4 h-4 sm:w-5 sm:h-5" />
                Continue with Google
              </>
            )}
          </Button>

          <div className="text-xs sm:text-sm text-slate-700 text-center">
            Don't have an account?{" "}
            <Link
              href="/sign-up"
              className="text-primary underline hover:text-primary/80 transition-colors"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
