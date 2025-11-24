"use client";

import {
  SidebarTrigger,
  SidebarProvider,
} from "@/shared/components/ui/sidebar";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";
import { Separator } from "@/shared/components/ui/separator";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/shared/components/ui/breadcrumb";
import { Button } from "@/shared/components/ui/button";

function AdminDashboard() {
  return (
    <>
      <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
        <div className="flex items-center gap-2 px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink href="/admin">Admin</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem>
                <BreadcrumbPage>Dashboard</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </header>
      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        <div className="grid auto-rows-min gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <Card className="transition-all hover:shadow-md p-3 flex flex-col gap-3">
            <CardHeader className="!px-3">
              <CardTitle className="text-base font-semibold sm:text-lg">
                Total Applicants
              </CardTitle>
              <CardDescription className="text-xs sm:text-sm">
                Active users in the system
              </CardDescription>
            </CardHeader>
            <CardContent className="!px-3">
              <div className="text-3xl font-bold tracking-tight sm:text-4xl">
                0
              </div>
            </CardContent>
            <CardFooter className="border-t !pt-3 !px-3  ">
              <div className="text-xs text-muted-foreground sm:text-sm">
                <span className="font-medium text-green-600">+2</span> new this
                month
              </div>
            </CardFooter>
          </Card>
          <Card className="transition-all hover:shadow-md p-3 flex flex-col gap-3">
            <CardHeader className="!px-3">
              <CardTitle className="text-base font-semibold sm:text-lg">
                Pending Reviews
              </CardTitle>
              <CardDescription className="text-xs sm:text-sm">
                Forms awaiting review
              </CardDescription>
            </CardHeader>
            <CardContent className="!px-3">
              <div className="text-3xl font-bold tracking-tight sm:text-4xl">
                0
              </div>
            </CardContent>
            <CardFooter className="border-t !pt-3 !px-3">
              <div className="flex flex-col gap-1 text-xs text-muted-foreground sm:flex-row sm:items-center sm:gap-4 sm:text-sm">
                <span className="flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-yellow-500" />
                  <span className="font-medium">3</span> drafts
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-orange-500" />
                  <span className="font-medium">3</span> change requests
                </span>
              </div>
            </CardFooter>
          </Card>
          <Card className="transition-all hover:shadow-md p-3 flex flex-col gap-3 sm:col-span-2 lg:col-span-1">
            <CardHeader className="!px-3">
              <CardTitle className="text-base font-semibold sm:text-lg">
                Approved Forms
              </CardTitle>
              <CardDescription className="text-xs sm:text-sm">
                Successfully processed
              </CardDescription>
            </CardHeader>
            <CardContent className="!px-3">
              <div className="text-3xl font-bold tracking-tight sm:text-4xl">
                0
              </div>
            </CardContent>
            <CardFooter className="border-t !pt-3 !px-3">
              <button className="text-xs font-medium text-primary hover:underline sm:text-sm">
                View all approved forms →
              </button>
            </CardFooter>
          </Card>
        </div>
        <Button
          className="w-full"
          variant="outline"
          size="lg"
          onClick={() => {}}
        >
          Generate Admin Code
        </Button>
        <div className="flex-1 rounded-xl border bg-muted/50 p-8 md:min-h-[400px]">
          <div className="flex h-full items-center justify-center text-center">
            <div>
              <h3 className="mb-1 text-base font-semibold text-muted-foreground sm:mb-2 sm:text-lg">
                Analytics Dashboard Coming Soon
              </h3>
              <p className="text-xs text-muted-foreground sm:text-sm">
                Charts and detailed analytics will be displayed here
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AdminDashboard;
