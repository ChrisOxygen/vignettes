"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";
import { Badge } from "@/shared/components/ui/badge";
import { Input } from "@/shared/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/shared/components/ui/pagination";
import { useAllApplicants } from "@/features/admin/hooks";
import { formatDistanceToNow } from "date-fns";
import { Search } from "lucide-react";

function ApplicantsPage() {
  const { data: applicants, isLoading, error } = useAllApplicants();

  // Filtering and pagination state
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("ALL");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Filter and paginate applicants
  const filteredApplicants = useMemo(() => {
    if (!applicants) return [];

    let filtered = applicants;

    // Apply status filter
    if (statusFilter !== "ALL") {
      filtered = filtered.filter(
        (applicant) => applicant.accountStatus === statusFilter
      );
    }

    // Apply search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (applicant) =>
          applicant.firstName?.toLowerCase().includes(query) ||
          applicant.lastName?.toLowerCase().includes(query) ||
          applicant.email?.toLowerCase().includes(query)
      );
    }

    return filtered;
  }, [applicants, statusFilter, searchQuery]);

  // Calculate pagination
  const totalPages = Math.ceil(filteredApplicants.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedApplicants = filteredApplicants.slice(startIndex, endIndex);

  // Reset to page 1 when filters change
  useMemo(() => {
    setCurrentPage(1);
  }, [statusFilter, searchQuery]);

  const getStatusVariant = (status: string) => {
    switch (status) {
      case "ACTIVE":
        return "default";
      case "PENDING_VERIFICATION":
        return "secondary";
      case "SUSPENDED":
        return "destructive";
      case "DEACTIVATED":
        return "outline";
      default:
        return "secondary";
    }
  };

  const formatStatus = (status: string) => {
    return status
      .replace(/_/g, " ")
      .toLowerCase()
      .replace(/\b\w/g, (l) => l.toUpperCase());
  };

  return (
    <Card className="flex-1">
      <CardHeader>
        <CardTitle>Applicants</CardTitle>
        <CardDescription>
          Manage and review all applicants in the system (
          {filteredApplicants?.length || 0} of {applicants?.length || 0} total)
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Filters */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search by name or email..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 border-gray-300 focus:border-gray-400  !focus-visible:shadow-none !focus:shadow-none !focus-within:shadow-none"
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full sm:w-[200px] border-gray-300 focus:border-gray-400 focus:ring-gray-400">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ALL">All Statuses</SelectItem>
              <SelectItem value="ACTIVE">Active</SelectItem>
              <SelectItem value="PENDING_VERIFICATION">
                Pending Verification
              </SelectItem>
              <SelectItem value="SUSPENDED">Suspended</SelectItem>
              <SelectItem value="DEACTIVATED">Deactivated</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Applicants Grid */}
        {isLoading ? (
          <div className="flex h-48 items-center justify-center">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
              <p className="text-muted-foreground">Loading applicants...</p>
            </div>
          </div>
        ) : error ? (
          <div className="text-center text-red-500 py-8">
            Error loading applicants: {error.message}
          </div>
        ) : paginatedApplicants && paginatedApplicants.length > 0 ? (
          <div className="space-y-2">
            {/* Grid Header */}
            <div className="hidden sm:grid sm:grid-cols-8 lg:grid-cols-12 gap-4 px-4 py-3 bg-muted/50 rounded-lg font-bold text-sm text-muted-foreground">
              <div className="col-span-3">Name</div>
              <div className="hidden lg:block lg:col-span-3">Email</div>
              <div className="col-span-2">Status</div>
              <div className="col-span-2">Submissions</div>
              <div className="hidden lg:block lg:col-span-1">Created</div>
              <div className="col-span-1 text-right">Actions</div>
            </div>

            {/* Grid Rows */}
            {paginatedApplicants.map((applicant) => (
              <div
                key={applicant.id}
                className="px-3 py-2 sm:px-4 sm:py-3 border sm:border-t sm:border-x-0 sm:border-b-0 rounded-lg sm:rounded-none hover:shadow-md transition-shadow bg-card"
              >
                <div className="space-y-2 sm:space-y-0 sm:grid sm:grid-cols-8 lg:grid-cols-12 sm:gap-4">
                  {/* Name */}
                  <div className="sm:col-span-3">
                    <div className="font-semibold">
                      {applicant.firstName} {applicant.lastName}
                    </div>
                  </div>

                  {/* Email */}
                  <div className="hidden lg:block lg:col-span-3">
                    <div className="text-sm truncate">{applicant.email}</div>
                  </div>

                  {/* Status */}
                  <div className="hidden sm:block sm:col-span-2">
                    <Badge variant={getStatusVariant(applicant.accountStatus)}>
                      {formatStatus(applicant.accountStatus)}
                    </Badge>
                  </div>

                  {/* Submissions & Actions - Combined on mobile */}
                  <div className="flex items-center justify-between sm:contents">
                    {/* Submissions */}
                    <div className="sm:col-span-2">
                      <div>
                        <span className="font-medium">
                          {applicant._count.formSubmissions}
                        </span>{" "}
                        <span className="text-muted-foreground text-sm">
                          {applicant._count.formSubmissions === 1
                            ? "form"
                            : "forms"}
                        </span>
                      </div>
                    </div>

                    {/* Created */}
                    <div className="hidden lg:block lg:col-span-1">
                      <div className="text-sm text-muted-foreground">
                        {formatDistanceToNow(new Date(applicant.createdAt), {
                          addSuffix: true,
                        })}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="sm:col-span-1 flex items-center justify-end">
                      <Link
                        href={`/admin/applicants/${applicant.id}`}
                        className="px-3 py-1.5 text-sm rounded-md hover:bg-accent transition-colors"
                      >
                        View
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {/* Results Counter */}
            <div className="text-center text-sm text-muted-foreground pt-2">
              Showing {startIndex + 1}-
              {Math.min(endIndex, filteredApplicants.length)} of{" "}
              {filteredApplicants.length} applicants
            </div>
          </div>
        ) : (
          <div className="text-center text-muted-foreground py-12 border rounded-lg">
            No applicants found
          </div>
        )}

        {/* Pagination */}
        {!isLoading && !error && totalPages > 1 && (
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  onClick={() =>
                    setCurrentPage((prev) => Math.max(1, prev - 1))
                  }
                  className={
                    currentPage === 1
                      ? "pointer-events-none opacity-50"
                      : "cursor-pointer"
                  }
                />
              </PaginationItem>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (page) => {
                  // Show first page, last page, current page, and pages around current
                  const showPage =
                    page === 1 ||
                    page === totalPages ||
                    (page >= currentPage - 1 && page <= currentPage + 1);

                  // Show ellipsis
                  const showEllipsisBefore =
                    page === currentPage - 2 && currentPage > 3;
                  const showEllipsisAfter =
                    page === currentPage + 2 && currentPage < totalPages - 2;

                  if (showEllipsisBefore || showEllipsisAfter) {
                    return (
                      <PaginationItem key={page}>
                        <PaginationEllipsis />
                      </PaginationItem>
                    );
                  }

                  if (!showPage) return null;

                  return (
                    <PaginationItem key={page}>
                      <PaginationLink
                        onClick={() => setCurrentPage(page)}
                        isActive={currentPage === page}
                        className="cursor-pointer"
                      >
                        {page}
                      </PaginationLink>
                    </PaginationItem>
                  );
                }
              )}

              <PaginationItem>
                <PaginationNext
                  onClick={() =>
                    setCurrentPage((prev) => Math.min(totalPages, prev + 1))
                  }
                  className={
                    currentPage === totalPages
                      ? "pointer-events-none opacity-50"
                      : "cursor-pointer"
                  }
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        )}
      </CardContent>
    </Card>
  );
}

export default ApplicantsPage;
