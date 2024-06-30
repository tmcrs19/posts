import Link from "next/link";
import React from "react";

export const FeedAppBar = () => {
  return (
    <div className="fixed top-0 w-full md:left-1/6 md:w-5/6 lg:left-1/4 lg:w-2/4 bg-white z-10 border-b hidden md:block md:right-0">
      <div className="flex justify-around py-2">
        <button className="text-lg font-semibold">For You</button>
        <button className="text-lg font-semibold">Following</button>
      </div>
    </div>
  );
};

export const FeedPostAppBar = () => {
  return (
    <div className="fixed top-0 w-full md:left-1/6 md:w-5/6 lg:left-1/4 lg:w-2/4 bg-white z-10 border-b hidden md:block md:right-0">
      <div className="flex items-center p-4 py-2">
        <Link
          scroll={false}
          href="/"
          className="text-xl mr-4 flex items-center"
        >
          &lt;
        </Link>
        <h1 className="text-xl">Post</h1>
      </div>
    </div>
  );
};
