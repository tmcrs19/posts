import { Footer } from "@faceit/components/Footer";
import { Header } from "@faceit/components/Header";
import { Metadata } from "next";
import React from "react";
import { metadata as rootMetadata } from "../layout";

export const metadata: Metadata = {
  ...rootMetadata,
  title: "Feed Preview",
};

type LayoutProps = {
  children: React.ReactNode;
};

const Layout: React.FC<LayoutProps> = ({ children }) => {
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

export default Layout;
