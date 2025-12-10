"use client";

import { usePathname } from "next/navigation";
import { FORM_NAV } from "@/features/user/form/constants";
import { FormComments } from "@/features/user/form/components/comments";
import { FormActionButtons, FormLoadingOverlay } from "./";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/shared/components/ui/breadcrumb";
import { Separator } from "@/shared/components/ui/separator";
import { SidebarTrigger } from "@/shared/components/ui/sidebar";
import { ScrollArea } from "@/shared/components/ui/scroll-area";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/shared/components/ui/sheet";
import { Button } from "@/shared/components/ui/button";
import { MessageSquare } from "lucide-react";
import { FormProvider } from "../../context/FormProviders";

interface FormLayoutContentProps {
  children: React.ReactNode;
}

export function FormLayoutContent({ children }: FormLayoutContentProps) {
  const pathname = usePathname();

  // Find the current form tab based on the pathname
  const currentFormTab = FORM_NAV.find((item) => pathname === item.url);
  const isFormTabActive = !!currentFormTab;

  return (
    <>
      <FormProvider>
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
            <FormActionButtons />
          </div>
        </header>

        <div
          className={`grid gap-4 p-4 rounded-lg ${isFormTabActive ? "lg:grid-cols-[1fr_minmax(300px,400px)] grid-cols-1" : "grid-cols-1"}`}
        >
          <ScrollArea className="rounded-lg h-[85vh] grid relative  ">
            <div className=" min-h-[85vh] grid">{children}</div>
            <FormLoadingOverlay message="Please wait ..." />
          </ScrollArea>

          {/* Comments Panel - Only visible on form routes */}
          {isFormTabActive && (
            <>
              {/* Desktop: Sidebar comments panel (>= 1024px) */}
              <ScrollArea className="rounded-lg h-[85vh] grid relative pr-5  ">
                <FormComments />
              </ScrollArea>

              {/* Mobile: Sheet comments (< 1024px) */}
              <div className="lg:hidden fixed bottom-4 right-4 z-50">
                <Sheet>
                  <SheetTrigger asChild>
                    <Button size="lg" className="shadow-lg">
                      <MessageSquare className="mr-2 h-5 w-5" />
                      Comments
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="right" className="w-full sm:max-w-md">
                    <SheetHeader>
                      <SheetTitle>Form Comments</SheetTitle>
                      <SheetDescription>
                        View and respond to admin feedback on your form
                      </SheetDescription>
                    </SheetHeader>
                    <div className="mt-4 h-[calc(100vh-120px)]">
                      <FormComments />
                    </div>
                  </SheetContent>
                </Sheet>
              </div>
            </>
          )}
        </div>
      </FormProvider>
    </>
  );
}
