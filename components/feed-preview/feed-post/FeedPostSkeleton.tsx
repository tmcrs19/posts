import React from "react";

export const FeedPostSkeleton: React.FC = () => {
  return (
    <article className="border-b border-gray-200 p-4 grid grid-cols-[50px_1fr] gap-2 items-center animate-pulse">
      <div className="w-12 h-12 rounded-full bg-gray-300"></div>
      <div className="w-1/2 h-6 bg-gray-300 rounded"></div>
      <div className="col-span-2 w-full h-12 bg-gray-300 rounded"></div>
    </article>
  );
};
