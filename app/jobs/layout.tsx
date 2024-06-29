import React from "react";
import { Metadata } from "next";
import MainLayout, {
  metadata as mainLayoutMetaData,
} from "../(layout-group)/layout";

type FeedPreviewLayoutProps = {
  children: React.ReactNode;
};

export const metadata: Metadata = {
  ...mainLayoutMetaData,
  title: "Jobs",
  description: "Jobs page description",
};

const FeedPreviewLayout: React.FC<FeedPreviewLayoutProps> = ({ children }) => {
  return <MainLayout>{children}</MainLayout>;
};

export default FeedPreviewLayout;
