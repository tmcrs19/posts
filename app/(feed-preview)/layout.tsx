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
    <>
      <Header />
      <main className="pl-4 pb-16 pt-4 md:pl-32 lg:pl-48 md:pb-0 pr-4 md:pr-8 lg:pr-12">
        {children}
      </main>
    </>
  );
};

export default FeedPreviewLayout;
