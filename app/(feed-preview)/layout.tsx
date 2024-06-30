import React from "react";
import { Metadata } from "next";
import { metadata as mainLayoutMetaData } from "../(layout-group)/layout";
import Header from "./header";
import Sidebar from "./sidebar";
import { FeedAppBar } from "./app-bar";

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
      <main className="flex flex-col pb-20 md:flex-row flex-grow container pt-11 md:mr-0 md:w-5/6 md:ml-auto lg:w-2/4 lg:mx-auto">
        {children}
      </main>
      <Sidebar />
    </>
  );
};

export default FeedPreviewLayout;
