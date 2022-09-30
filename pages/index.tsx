import type { NextPage } from "next";
import Head from "next/head";
import Home from "../src/pages/Home";

const Index: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Task Man</title>
        <meta
          name="description"
          content="Best todo list to manage your tasks."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Home />
      </main>
    </div>
  );
};

export default Index;
