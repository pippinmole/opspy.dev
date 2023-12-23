import JobActions from "@/components/jobs/job-post-actions";
import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

export default function LoadingJobPage() {
  return (
    <div className={"p-8"}>
      <div className={"flex flex-col gap-4"}>
        <div className="flex items-center space-x-4">
          <Skeleton className="h-12 w-12 rounded-full" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-[250px]" />
            <Skeleton className="h-4 w-[200px]" />
          </div>
        </div>

        <div className={"flex flex-row gap-4 my-4"}>
          <Skeleton className="h-10 w-32" />
          <Skeleton className="h-10 w-32" />
          <Skeleton className="h-10 w-32" />
        </div>

        <p className={"flex flex-col gap-y-4"}>
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
        </p>
      </div>
    </div>
  );
}
