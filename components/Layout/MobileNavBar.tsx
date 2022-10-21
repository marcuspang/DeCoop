import { WalletIcon } from "@heroicons/react/24/outline";
import { ConnectButton, useAccount, useDisconnect } from "@web3modal/react";
import Link from "next/link";
import { useState } from "react";
import links from "../../data/links";
import NetworkButton from "../Wallet/NetworkButton";
import ColourModeButton from "./ColourModeButton";
import NavMenuButton from "./NavMenuButton";

const MobileNavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { status, address } = useAccount();
  const disconnect = useDisconnect();

  return (
    <div className="flex-1 flex items-center justify-end lg:hidden">
      <div
        className={`background absolute z-20 top-[70px] bottom-0 left-0 lg:border-none w-full p-4 h-screen ${
          isOpen ? "" : "hidden"
        }`}
      >
        {status === "connected" ? (
          <>
            <div className="flex items-center mb-2">
              <WalletIcon width={50} height={50} className="mr-4 dark:text-slate-100" />
              <div className="text-gray-600">
                <p className="font-bold">Address:</p>
                <span className="break-all">{address}</span>
              </div>
            </div>
            <NetworkButton className="ml-0" />
            <ul className="top-12 right-0 mt-5 space-y-5">
              {links.map((link) => (
                <li key={link.link}>
                  <Link href={link.link} passHref>
                    <a className="text">{link.name}</a>
                  </Link>
                </li>
              ))}
              <li>
                <button
                  className="block text w-full text-left"
                  onClick={() => disconnect()}
                >
                  Log out
                </button>
              </li>
            </ul>
          </>
        ) : (
          <ConnectButton label="Sign In" />
        )}
      </div>
      <div className="items-center justify-end space-x-2 flex">
        <ColourModeButton />
        <NavMenuButton
          isOpen={isOpen}
          toggle={() => setIsOpen((prev) => !prev)}
        />
      </div>
    </div>
  );
};

export default MobileNavBar;
