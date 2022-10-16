import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { chains, providers } from "@web3modal/ethereum";
import type { ConfigOptions } from "@web3modal/react";
import { Web3Modal } from "@web3modal/react";
import { useEffect } from "react";
import { ToastContainer } from "react-toastify";
import Layout from "../components/Layout/Layout";

import "react-toastify/dist/ReactToastify.css";
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

const queryClient = new QueryClient();

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
    // Hardcode to be light mode for now
    localStorage.theme = "light";
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <Layout>
        <Component {...pageProps} />
        <Web3Modal config={modalConfig} />
        <ToastContainer
          autoClose={5000}
          position="bottom-center"
          pauseOnFocusLoss
          hideProgressBar
          draggable={false}
          closeOnClick={false}
        />
      </Layout>
    </QueryClientProvider>
  );
}

export default App;
