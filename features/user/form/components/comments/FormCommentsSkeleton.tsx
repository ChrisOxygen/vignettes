import React from "react";
import { Skeleton } from "@/shared/components/ui/skeleton";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";
import { Separator } from "@/shared/components/ui/separator";
import { MessageSquare } from "lucide-react";

export function FormCommentsSkeleton() {
  return (
    <Card className="h-[85vh] flex flex-col">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center gap-2">
          <MessageSquare className="h-5 w-5" />
          Comments & Feedback
          <Skeleton className="h-5 w-8 ml-auto bg-gray-200" />
        </CardTitle>
      </CardHeader>

      <CardContent className="flex-1 flex flex-col p-0">
        {/* Add Comment Section Skeleton */}
        <div className="px-4 py-4 space-y-3">
          <Skeleton className="h-9 w-full bg-gray-200" />
        </div>

        <Separator />

        {/* Filter Tabs Skeleton */}
        <div className="px-4 pt-3">
          <div className="w-full grid grid-cols-3 gap-2">
            <Skeleton className="h-9 bg-gray-200" />
            <Skeleton className="h-9 bg-gray-200" />
            <Skeleton className="h-9 bg-gray-200" />
          </div>
        </div>

        {/* Comments List Skeleton */}
        <div className="flex-1 p-4 space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex gap-3">
              <Skeleton className="h-8 w-8 rounded-full flex-shrink-0 bg-gray-200" />
              <div className="flex-1 space-y-2">
                <div className="flex items-center gap-2">
                  <Skeleton className="h-4 w-24 bg-gray-200" />
                  <Skeleton className="h-4 w-16 bg-gray-200" />
                </div>
                <Skeleton className="h-16 w-full bg-gray-200" />
                <Skeleton className="h-3 w-20 bg-gray-200" />
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
