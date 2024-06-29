import { Metadata } from "next";
import React from "react";

import { metadata as rootMetadata } from "../layout";
import { Footer } from "./footer";
import { Header } from "./header";

export const metadata: Metadata = {
  ...rootMetadata,
};

type MainLayoutProps = {
  children: React.ReactNode;
};

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow container mx-auto pt-28 px-4 pb-4">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;
