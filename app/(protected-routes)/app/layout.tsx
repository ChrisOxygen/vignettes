"use client";

import { useCurrentUser } from "@/features/auth/hooks";
import UserOnboardingPage from "@/features/onboarding/components/UserOnboardingPage";
import { AppSidebar } from "@/shared/components/app-sidebar";
import FullScreenLoader from "@/shared/components/FullScreenLoader";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/shared/components/ui/breadcrumb";
import { Separator } from "@/shared/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/shared/components/ui/sidebar";

function AppRoutesLayout({ children }: { children: React.ReactNode }) {
  const { isLoading } = useCurrentUser();
  if (isLoading) {
    return <FullScreenLoader />;
  }

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1 hover:bg-accent hover:text-accent-foreground" />
            <Separator
              orientation="vertical"
              className="mr-2 data-[orientation=vertical]:h-4"
            />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink
                    href="/app"
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    Dashboard
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage className="text-foreground font-medium">
                    Overview
                  </BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4 rounded-lg pt-0">
          {children}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}

export default AppRoutesLayout;
