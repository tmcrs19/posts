// pages/jobs.tsx

import React from "react";
import Head from "next/head";
import MainLayout from "../(layout-group)/layout";

export default function JobsPage() {
  return (
    <MainLayout>
      <Head>
        <title>Jobs</title>
        <meta name="description" content="Jobs page description" />
      </Head>
      <section className="container max-w-4xl mx-auto">
        <div>Jobs</div>
      </section>
    </MainLayout>
  );
}
