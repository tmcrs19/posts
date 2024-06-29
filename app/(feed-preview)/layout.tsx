import React from "react";
import { Metadata } from "next";
import { metadata as mainLayoutMetaData } from "../(layout-group)/layout";
import Header from "./header";

type FeedPreviewLayoutProps = {
  children: React.ReactNode;
};

export const metadata: Metadata = {
  ...mainLayoutMetaData,
  title: "Feed Preview",
};

const FeedPreviewLayout: React.FC<FeedPreviewLayoutProps> = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen md:flex-row">
      <div className="md:w-1/4 lg:w-1/5">
        <Header />
      </div>
      <main className="flex-grow container mx-auto p-4 md:w-3/4 lg:w-4/5">
        {children}
      </main>
    </div>
  );
};

export default FeedPreviewLayout;
