"use client";

import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";
import { Button } from "@/shared/components/ui/button";
import { Skeleton } from "@/shared/components/ui/skeleton";
import {
  useSubmissionStatistics,
  useAllApplicants,
} from "@/features/admin/hooks";

function AdminDashboard() {
  const { data: stats, isPending: statsLoading } = useSubmissionStatistics();
  const { data: applicants, isPending: applicantsLoading } = useAllApplicants();

  const isLoading = statsLoading || applicantsLoading;

  // Calculate applicants from current month
  const applicantsThisMonth =
    applicants?.filter((applicant) => {
      const createdDate = new Date(applicant.createdAt);
      const now = new Date();
      return (
        createdDate.getMonth() === now.getMonth() &&
        createdDate.getFullYear() === now.getFullYear()
      );
    }).length || 0;

  // Helper function to format counts
  const formatCount = (count: number, singular: string, plural: string) => {
    if (count === 0) return "None yet";
    if (count === 1) return `1 ${singular}`;
    return `${count} ${plural}`;
  };

  // You can temporarily set this to true to see the skeleton loaders
  // const isLoading = true;

  return (
    <>
      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        {isLoading ? (
          <>
            <div className="grid auto-rows-min gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {/* Skeleton for Total Applicants Card */}
              <Card className="p-3 flex flex-col gap-3">
                <CardHeader className="!px-3">
                  <Skeleton className="h-6 w-32 bg-gray-50 " />
                  <Skeleton className="h-4 w-40 mt-2 bg-gray-50" />
                </CardHeader>
                <CardContent className="!px-3">
                  <Skeleton className="h-10 w-20 bg-gray-50" />
                </CardContent>
                <CardFooter className="border-t !pt-3 !px-3">
                  <Skeleton className="h-4 w-48 bg-gray-50" />
                </CardFooter>
              </Card>

              {/* Skeleton for Pending Reviews Card */}
              <Card className="p-3 flex flex-col gap-3">
                <CardHeader className="!px-3">
                  <Skeleton className="h-6 w-32 bg-gray-50" />
                  <Skeleton className="h-4 w-40 mt-2 bg-gray-50" />
                </CardHeader>
                <CardContent className="!px-3">
                  <Skeleton className="h-10 w-20 bg-gray-50" />
                </CardContent>
                <CardFooter className="border-t !pt-3 !px-3">
                  <div className="flex flex-col gap-2 sm:flex-row sm:gap-4">
                    <Skeleton className="h-4 w-24 bg-gray-50" />
                    <Skeleton className="h-4 w-32 bg-gray-50" />
                  </div>
                </CardFooter>
              </Card>

              {/* Skeleton for Approved Forms Card */}
              <Card className="p-3 flex flex-col gap-3 sm:col-span-2 lg:col-span-1">
                <CardHeader className="!px-3">
                  <Skeleton className="h-6 w-32 bg-gray-50" />
                  <Skeleton className="h-4 w-40 mt-2 bg-gray-50" />
                </CardHeader>
                <CardContent className="!px-3">
                  <Skeleton className="h-10 w-20 bg-gray-50" />
                </CardContent>
                <CardFooter className="border-t !pt-3 !px-3">
                  <Skeleton className="h-4 w-44 bg-gray-50" />
                </CardFooter>
              </Card>
            </div>
            <Skeleton className="h-10 w-full bg-gray-50" />
            <div className="flex-1 rounded-xl border bg-gray-50/50 p-8 md:min-h-[400px]">
              <div className="flex h-full items-center justify-center">
                <Skeleton className="h-16 w-64 bg-gray-50" />
              </div>
            </div>
          </>
        ) : (
          <>
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
                    {formatCount(
                      applicants?.length || 0,
                      "applicant",
                      "applicants"
                    )}
                  </div>
                </CardContent>
                <CardFooter className="border-t !pt-3 !px-3  ">
                  <div className="flex items-center justify-between w-full text-xs sm:text-sm">
                    <div>
                      {applicantsThisMonth > 0 ? (
                        <span className="text-green-600 font-medium">
                          +{applicantsThisMonth} this month
                        </span>
                      ) : (
                        <span className="text-muted-foreground">
                          Total registered applicants
                        </span>
                      )}
                    </div>
                    <Link
                      href="/admin/applicants"
                      className="font-medium text-primary hover:underline"
                    >
                      See all →
                    </Link>
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
                    {formatCount(
                      stats?.pendingReviews || 0,
                      "submission",
                      "submissions"
                    )}
                  </div>
                </CardContent>
                <CardFooter className="border-t !pt-3 !px-3">
                  <div className="flex flex-col gap-1 text-xs text-muted-foreground sm:flex-row sm:items-center sm:gap-4 sm:text-sm">
                    <span className="flex items-center gap-1.5">
                      <span className="h-2 w-2 rounded-full bg-yellow-500" />
                      <span className="font-medium">
                        {stats?.byStatus?.DRAFT || 0}{" "}
                        {(stats?.byStatus?.DRAFT || 0) === 1
                          ? "draft"
                          : "drafts"}
                      </span>
                    </span>
                    <span className="flex items-center gap-1.5">
                      <span className="h-2 w-2 rounded-full bg-orange-500" />
                      <span className="font-medium">
                        {stats?.changesRequested || 0}{" "}
                        {(stats?.changesRequested || 0) === 1
                          ? "change request"
                          : "change requests"}
                      </span>
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
                    {formatCount(stats?.approved || 0, "form", "forms")}
                  </div>
                </CardContent>
                <CardFooter className="border-t !pt-3 !px-3">
                  <Link
                    href="/admin/approved-forms"
                    className="text-xs font-medium text-primary hover:underline sm:text-sm"
                  >
                    View all approved forms →
                  </Link>
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
            <div className="flex-1 rounded-xl border bg-gray-50/50 p-8 md:min-h-[400px]">
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
          </>
        )}
      </div>
    </>
  );
}

export default AdminDashboard;
