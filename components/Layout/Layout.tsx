import Head from "next/head";
import { ReactNode } from "react";
import Footer from "./Footer";
import NavBar from "./NavBar";
import Sidebar from "./Sidebar";

interface LayoutProps {
  children?: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
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
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
