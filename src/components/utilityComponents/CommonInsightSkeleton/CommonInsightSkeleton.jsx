"use client";

import { Skeleton } from "@/components/ui/skeleton";

export default function CommonInsightSkeleton({ bigCount = 2, smallCount = 4 }) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
     
      <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
        {[...Array(bigCount)].map((_, idx) => (
          <div
            key={`big-${idx}`}
            className="rounded-2xl overflow-hidden bg-white  dark:bg-neutral-900 shadow-sm flex flex-col"
          >
            <Skeleton className="w-full h-60" /> 
            <div className="p-4 space-y-3">
              <div className="flex gap-4">
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-4 w-16" />
              </div>
              <Skeleton className="h-6 w-3/4" />
              <Skeleton className="h-6 w-2/3" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-5/6" />
            </div>
          </div>
        ))}
      </div>

     
      <div className="grid grid-cols-1 gap-4">
        {[...Array(smallCount)].map((_, idx) => (
          <div
            key={`small-${idx}`}
            className="rounded-2xl flex overflow-hidden bg-white dark:bg-neutral-900 shadow-sm"
          >
            <Skeleton className="w-24 h-24 flex-shrink-0" />
            <div className="p-3 flex flex-col justify-center gap-2 flex-1">
              <div className="flex gap-4">
                <Skeleton className="h-3 w-16" />
                <Skeleton className="h-3 w-12" />
              </div>
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
