"use client";
import React from "react";

// CommonSkeleton Component
export default function CommonSkeleton({
  type = "cards", // "banner", "content", "comparison", "cards"
  count = 3,      // number of cards if type="cards"
  className = "",
}) {
  // Generate array for multiple cards
  const skeletonArray = Array.from({ length: count });

  if (type === "banner") {
    return (
      <div className={`w-full h-60 bg-slate-300 rounded-xl animate-pulse ${className}`} />
    );
  }

  if (type === "content") {
    return (
      <div className={`animate-pulse space-y-4 ${className}`}>
        <div className="h-8 w-3/4 bg-slate-300 rounded" />
        <div className="h-4 w-full bg-slate-200 rounded" />
        <div className="h-4 w-5/6 bg-slate-200 rounded" />
      </div>
    );
  }

  if (type === "comparison") {
    return (
      <div className={`grid grid-cols-1 lg:grid-cols-2 gap-6 animate-pulse ${className}`}>
        <div className="h-48 bg-slate-300 rounded-xl" />
        <div className="h-48 bg-slate-300 rounded-xl" />
      </div>
    );
  }

  if (type === "cards") {
    return (
      <div className={`grid grid-cols-1 lg:grid-cols-3 gap-6 ${className}`}>
        {skeletonArray.map((_, i) => (
          <div
            key={i}
            className={`p-4 rounded-2xl overflow-hidden bg-white shadow-sm transition-all flex flex-col animate-pulse`}
          >
            <div className="w-full h-60 bg-slate-300 rounded-xl mb-3" />
            <div className="flex flex-col flex-grow gap-2">
              <div className="h-4 w-1/2 bg-slate-200 rounded" />
              <div className="h-4 w-full bg-slate-200 rounded" />
              <div className="h-4 w-3/4 bg-slate-200 rounded" />
            </div>
            <div className="mt-4 w-full h-10 bg-slate-300 rounded" />
          </div>
        ))}
      </div>
    );
  }

  return null;
}
