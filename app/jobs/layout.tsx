import React from "react";
import { Metadata } from "next";
import MainLayout, {
  metadata as mainLayoutMetaData,
} from "../(layout-group)/layout";

type JobsLayoutProps = {
  children: React.ReactNode;
};

export const metadata: Metadata = {
  ...mainLayoutMetaData,
  title: "Jobs",
  description: "Jobs page description",
};

const JobsLayout: React.FC<JobsLayoutProps> = ({ children }) => {
  return <MainLayout>{children}</MainLayout>;
};

export default JobsLayout;
