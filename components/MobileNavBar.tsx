import Link from "next/link";
import { useState } from "react";
import { useAccount, useDisconnect } from "@web3modal/react";
import NetworkButton from "./NetworkButton";
import { links, Wallet } from "./Wallet";

const MobileNavBar = () => {
  const [menuState, setMenuState] = useState(false);
  const { status } = useAccount();
  const disconnect = useDisconnect();

  return (
    <div className="flex-1 flex items-center justify-end lg:hidden">
      <div
        className={`bg-white absolute z-20 top-16 left-0 border-b lg:static lg:block lg:border-none w-full p-4 border-t ${
          menuState ? "" : "hidden"
        }`}
      >
        <div className="flex items-center">
          <Wallet className="" />
          <NetworkButton className="ml-0" />
        </div>
        <ul className="top-12 right-0 mt-5 space-y-5">
          {links.map((link) => (
            <li key={link.link}>
              <Link href={link.link} passHref>
                <a className="block text-gray-600 p-1">{link.name}</a>
              </Link>
            </li>
          ))}
          {status === "connected" && (
            <li>
              <button
                className="block text-gray-600 p-1 w-full text-left"
                onClick={() => disconnect()}
              >
                Log out
              </button>
            </li>
          )}
        </ul>
      </div>
      <div className="items-center justify-end space-x-2 sm:space-x-6">
        <button
          className="outline-none text-gray-900 block lg:hidden"
          onClick={() => setMenuState(!menuState)}
        >
          {menuState ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          )}
        </button>
      </div>
    </div>
  );
};

export default MobileNavBar;
