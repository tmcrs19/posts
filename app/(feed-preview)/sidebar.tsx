import { Trends } from "@faceit/components/feed-preview/trends";
import React from "react";

const Sidebar = () => {
  return (
    <aside className="fixed p-4 right-0 top-0 h-screen w-full md:w-1/3 lg:w-1/4 bg-gray-200 hidden lg:block">
      <div className="w-4/5 mr-auto">
        <Trends />
      </div>
    </aside>
  );
};

export default Sidebar;
