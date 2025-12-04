"use client";
import {
  useApplicantById,
  useApplicantFormSubmissions,
} from "@/features/admin/hooks";
import { Separator } from "@/shared/components/ui/separator";
import { Badge } from "@/shared/components/ui/badge";
import { Button } from "@/shared/components/ui/button";
import { Skeleton } from "@/shared/components/ui/skeleton";
import { MessageSquare } from "lucide-react";
import Link from "next/link";

import { useParams } from "next/navigation";
import React from "react";
import { FormStatus } from "@prisma/client";

function ApplicantPage() {
  const { id } = useParams<{ id: string }>();

  const {
    data: applicant,
    isPending,
    isError,
    error,
  } = useApplicantById({ applicantId: id });

  console.log("Applicant ID:", id);
  console.log("Applicant Data:", applicant);

  const { data: submissions, isPending: isLoadingSubmissions } =
    useApplicantFormSubmissions({
      userId: id,
    });

  // Helper function to format form type names
  const formatFormType = (formType: string) => {
    return formType
      .split("_")
      .map((word) => word.charAt(0) + word.slice(1).toLowerCase())
      .join(" ");
  };

  // Helper function to get status badge variant
  const getStatusVariant = (
    status: FormStatus
  ): "default" | "secondary" | "destructive" | "outline" => {
    switch (status) {
      case FormStatus.APPROVED:
        return "default";
      case FormStatus.UNDER_REVIEW:
      case FormStatus.SUBMITTED:
        return "secondary";
      case FormStatus.CHANGES_REQUESTED:
      case FormStatus.REJECTED:
        return "destructive";
      default:
        return "outline";
    }
  };

  if (isPending) {
    return (
      <main className="w-full h-full p-6 space-y-6">
        {/* Header Skeleton */}
        <section className="bg-card border rounded-lg p-6 shadow-sm">
          <div className="space-y-2">
            <Skeleton className="h-9 w-64 bg-gray-200" />
            <div className="flex items-center gap-4">
              <Skeleton className="h-4 w-48 bg-gray-200" />
              <Skeleton className="h-4 w-32 bg-gray-200" />
              <Skeleton className="h-4 w-36 bg-gray-200" />
            </div>
          </div>
        </section>

        {/* Forms Section Skeleton */}
        <section className="bg-card border rounded-lg p-6 shadow-sm">
          <div className="flex gap-6 items-center mb-6">
            <Skeleton className="h-8 w-48 bg-gray-200" />
            <div className="flex flex-col w-full gap-1">
              <Skeleton className="h-0.5 w-full bg-gray-200" />
              <Skeleton className="h-0.5 w-full bg-gray-200" />
            </div>
          </div>
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center gap-4 pb-3">
                <Skeleton className="h-6 w-48 bg-gray-200" />
                <Skeleton className="h-6 w-24 ml-auto bg-gray-200" />
                <Skeleton className="h-6 w-20 bg-gray-200" />
                <Skeleton className="h-6 w-16 bg-gray-200" />
                <Skeleton className="h-9 w-28 bg-gray-200" />
              </div>
            ))}
          </div>
        </section>
      </main>
    );
  }

  if (isError || !applicant) {
    return (
      <main className="w-full h-full flex items-center justify-center">
        <div className="text-destructive">
          {error?.message || "Failed to load applicant"}
        </div>
      </main>
    );
  }

  const fullName = [
    applicant.firstName,
    applicant.middleName,
    applicant.lastName,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <main className="w-full h-full sm:p-6 space-y-6 animate-in fade-in duration-300">
      {/* Header Section - Applicant Full Name */}
      <section className="bg-card border rounded-lg p-3 sm:p-6 shadow-sm">
        <div className="space-y-2">
          <h1 className="text-xl sm:text-3xl font-bold tracking-tight">
            {fullName}
          </h1>
          <div className="flex items-center  flex-wrap gap-4 text-sm text-muted-foreground">
            <span className="flex items-center gap-1">
              <span className="font-medium">Email:</span> {applicant.email}
            </span>
            <span className="flex items-center gap-1">
              <span className="font-medium">Status:</span>{" "}
              {applicant.accountStatus}
            </span>
            <span className="flex items-center gap-1">
              <span className="font-medium">Submissions:</span>{" "}
              {applicant._count.formSubmissions}
            </span>
          </div>
        </div>
      </section>

      {/* Applicant Forms Section - Empty for now */}
      <section className="bg-card border rounded-lg p-3 sm:p-6 shadow-sm ">
        <div className="flex gap-6 items-center mb-6">
          <h2 className="text-xl sm:text-2xl font-semibold shrink-0">
            Applicant Forms
          </h2>{" "}
          <div className="flex flex-col w-full gap-1">
            <Separator
              orientation="horizontal"
              className=" border-2 text-primary border-primary"
            />
            <Separator
              orientation="horizontal"
              className=" border-2 text-primary border-primary"
            />
          </div>
        </div>

        {isLoadingSubmissions ? (
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="flex items-center md:grid md:grid-cols-[1fr_100px_80px_100px_200px] gap-4 pb-3"
              >
                <Skeleton className="h-6 w-64 bg-gray-200" />
                <Skeleton className="h-6 w-24 hidden md:block justify-self-center bg-gray-200" />
                <Skeleton className="h-6 w-20 justify-self-center bg-gray-200" />
                <Skeleton className="h-6 w-16 justify-self-center bg-gray-200" />
                <Skeleton className="h-9 w-28 justify-self-end bg-gray-200" />
              </div>
            ))}
          </div>
        ) : !submissions || submissions.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            No forms submitted yet
          </div>
        ) : (
          <div className="space-y-4 animate-in fade-in duration-500">
            {/* Table Header - Hidden on mobile */}
            <div className="hidden md:grid md:grid-cols-[1fr_100px_80px_100px_200px] gap-4 border-b-3 pb-3  bg-muted/50 rounded-lg font-semibold text-sm">
              <div className="">Form Name</div>
              <div className=" justify-self-center">Last Updated</div>
              <div className=" justify-self-center">Status</div>
              <div className=" justify-self-center">Comments</div>
              <div className=" justify-self-end">Action</div>
            </div>

            {/* Table Rows */}
            <div className="space-y-3">
              {submissions.map((submission, index) => (
                <div
                  key={submission.id}
                  className="flex flex-wrap sm:flex-nowrap  items-center md:grid md:grid-cols-[1fr_100px_80px_100px_200px] not-last-of-type:border-b-1 pb-3 gap-4 hover:bg-muted/30 transition-colors animate-in fade-in duration-300"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  {/* Form Name */}
                  <div className="flex flex-col mr-auto shrink-0">
                    <span className="font-semibold text-base lg:text-sm">
                      {formatFormType(submission.formType)}
                    </span>
                    <span className="text-xs text-muted-foreground md:hidden">
                      Updated:{" "}
                      {new Date(submission.updatedAt).toLocaleDateString()}
                    </span>
                  </div>

                  {/* Last Updated - Hidden on mobile */}
                  <div className="hidden md:flex items-center text-sm text-muted-foreground justify-self-center">
                    {new Date(submission.updatedAt).toLocaleDateString()}
                  </div>

                  {/* Status */}
                  <div className="flex items-center justify-self-center">
                    <Badge
                      variant={getStatusVariant(submission.status)}
                      className="w-fit"
                    >
                      {submission.status.replace(/_/g, " ")}
                    </Badge>
                  </div>

                  {/* Comments */}
                  <div className="flex items-center justify-self-center gap-2 text-sm text-muted-foreground">
                    <MessageSquare className="h-4 w-4" />
                    <span>{submission._count.comments}</span>
                  </div>

                  {/* Action Button */}
                  <div className="flex justify-self-end">
                    <Link
                      href={`/admin/submissions/${submission.id}`}
                      className="text-primary underline shrink-0 text-sm sm:text-base"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </section>
    </main>
  );
}

export default ApplicantPage;
