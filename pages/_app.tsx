import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { chains, providers } from "@web3modal/ethereum";
import type { ConfigOptions } from "@web3modal/react";
import { Web3Modal } from "@web3modal/react";
import { useEffect } from "react";
import { ToastContainer } from "react-toastify";
import Layout from "../components/Layout/Layout";

import "react-toastify/dist/ReactToastify.css";
import "../styles/globals.css";
import useColourMode from "../hooks/useColourMode";
import colors from "tailwindcss/colors";

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
  const { isLightMode } = useColourMode();

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
          toastStyle={{
            backgroundColor: isLightMode
              ? colors.slate[100]
              : colors.slate[800],
          }}
          draggable={false}
          closeOnClick={false}
        />
      </Layout>
    </QueryClientProvider>
  );
}

export default App;
