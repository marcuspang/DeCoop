import { chains, providers } from "@web3modal/ethereum";
import type { ConfigOptions } from "@web3modal/react";
import { Web3Modal } from "@web3modal/react";
import Head from "next/head";
import { useEffect } from "react";
import Footer from "../components/Layout/Footer";
import NavBar from "../components/Layout/NavBar";
import Sidebar from "../components/Layout/Sidebar";

import "../styles/globals.css";

const modalConfig: ConfigOptions = {
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
  theme: "light",
  accentColor: "default",
  ethereum: {
    appName: "DeCoop",
    autoConnect: true,
    chains: [
      chains.goerli,
      chains.mainnet,
      chains.polygon,
      chains.optimism,
      chains.arbitrum,
    ],
    providers: [
      providers.walletConnectProvider({
        projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
      }),
    ],
  },
};

function App({ Component, pageProps }) {
  useEffect(() => {
    // On page load or when changing themes, best to add inline in `head` to avoid FOUC
    if (
      localStorage.theme === "dark" ||
      (!("theme" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    // hardcode to be light mode for now
    localStorage.theme = "light";
  }, []);

  return (
    <div className="bg-slate-50">
      <Head>
        <title>DeCoop</title>
        <meta name="description" content="DeCoop 2022" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <NavBar />
      <main className="max-w-screen-xl mx-auto flex my-4 justify-center flex-wrap lg:flex-nowrap">
        <Sidebar />
        <Component {...pageProps} />
      </main>
      <Footer />
      <Web3Modal config={modalConfig} />
    </div>
  );
}

export default App;
