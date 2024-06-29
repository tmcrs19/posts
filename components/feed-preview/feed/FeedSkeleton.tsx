import React from "react";
import { FeedPostSkeleton } from "@faceit/components/feed-preview/feed-post";

export const FeedSkeleton: React.FC = () => {
  return (
    <div>
      {Array.from(new Array(5)).map((_, index) => (
        <FeedPostSkeleton key={index} />
      ))}
    </div>
  );
};
