import { chains, providers } from "@web3modal/ethereum";
import type { ConfigOptions } from "@web3modal/react";
import { Web3Modal } from "@web3modal/react";
import { useEffect } from "react";
import Footer from "../components/Footer";
import NavBar from "../components/NavBar";
import Sidebar from "../components/Sidebar";

import "../styles/globals.css";

const modalConfig: ConfigOptions = {
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
  theme: "light",
  accentColor: "default",
  ethereum: {
    appName: "web3Modal",
    autoConnect: true,
    chains: [chains.mainnet, chains.goerli, chains.polygon, chains.optimism],
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
    <>
      <NavBar />
      <main className="max-w-screen-xl mx-auto min-h-[500px]">
        <Component {...pageProps} />
        <Sidebar />
      </main>
      <Footer />
      <Web3Modal config={modalConfig} />
    </>
  );
}

export default App;
