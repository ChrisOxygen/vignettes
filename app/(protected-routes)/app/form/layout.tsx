"use client";

import { useCurrentUser } from "@/features/auth/hooks";
import { AppSidebar } from "@/shared/components/app-sidebar";
import FullScreenLoader from "@/shared/components/FullScreenLoader";
import { usePathname } from "next/navigation";
import { FORM_NAV } from "@/features/user/form/constants";
import { FormComments } from "@/features/user/form/components/comments";
import { FormActionButtons } from "@/features/user/form/components/forms";
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
import { ScrollArea } from "@/shared/components/ui/scroll-area";

function FormLayout({ children }: { children: React.ReactNode }) {
  const { isLoading } = useCurrentUser();
  const pathname = usePathname();

  // Find the current form tab based on the pathname
  const currentFormTab = FORM_NAV.find((item) => pathname === item.url);
  const isFormTabActive = !!currentFormTab; // Only true if it's a valid form route

  if (isLoading) {
    return <FullScreenLoader />;
  }

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="flex items-center w-full justify-between">
            <div className="flex items-center gap-2 px-4">
              <SidebarTrigger className="-ml-1 hover:bg-accent hover:text-accent-foreground" />
              <Separator
                orientation="vertical"
                className="mr-2 data-[orientation=vertical]:h-4"
              />
              <Breadcrumb>
                <BreadcrumbList>
                  <BreadcrumbItem className="hidden md:block text-muted-foreground transition-colors">
                    Form
                  </BreadcrumbItem>
                  {isFormTabActive && currentFormTab && (
                    <>
                      <BreadcrumbSeparator className="hidden md:block" />
                      <BreadcrumbItem>
                        <BreadcrumbPage className="text-foreground font-medium">
                          {currentFormTab.title}
                        </BreadcrumbPage>
                      </BreadcrumbItem>
                    </>
                  )}
                  {!isFormTabActive && (
                    <>
                      <BreadcrumbSeparator className="hidden md:block" />
                      <BreadcrumbItem>
                        <BreadcrumbPage className="text-foreground font-medium">
                          Overview
                        </BreadcrumbPage>
                      </BreadcrumbItem>
                    </>
                  )}
                </BreadcrumbList>
              </Breadcrumb>
            </div>
            {/* Only show action buttons on valid form routes */}
            {isFormTabActive && <FormActionButtons />}
          </div>
        </header>
        <div
          className={`grid gap-4 p-4 rounded-lg ${isFormTabActive ? "grid-cols-[1fr_minmax(300px,400px)]" : "grid-cols-1"}`}
        >
          <ScrollArea className="rounded-lg h-[85vh] grid  ">
            <div className=" min-h-[85vh] grid">{children}</div>
          </ScrollArea>

          {/* Comments Panel - Only visible on form routes */}
          {isFormTabActive && (
            <div className="h-[85vh]">
              <FormComments />
            </div>
          )}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}

export default FormLayout;
