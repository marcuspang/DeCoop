import { chains, providers } from "@web3modal/ethereum";
import type { ConfigOptions } from "@web3modal/react";
import { Web3Modal } from "@web3modal/react";
import NavBar from "../components/NavBar";

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
  return (
    <>
      <NavBar />
      <Component {...pageProps} />
      <Web3Modal config={modalConfig} />
    </>
  );
}

export default App;
