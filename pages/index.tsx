import Head from "next/head";
import React from "react";

// Components
import Layout from "../components/layout";
import CardGrid from "../components/card-grid/card-grid";

export default function Home() {
  return (
    <Layout>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <CardGrid />
    </Layout>
  );
}
