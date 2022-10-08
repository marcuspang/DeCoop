import { ConnectButton, useAccount, useDisconnect } from "@web3modal/react";
import Link from "next/link";
import { useRef, useState } from "react";

export const Wallet = ({ className }) => {
  const [state, setState] = useState(false);
  const profileRef = useRef<HTMLButtonElement>(null);
  const { status, address } = useAccount();
  const disconnect = useDisconnect();

  return (
    <div className={`relative ${className}`}>
      {status === "connected" ? (
        <>
          <div className="flex items-center space-x-4">
            <button
              ref={profileRef}
              className="w-10 h-10 outline-none"
              onClick={() => {
                setState(!state);
              }}
            >
              <img src="/wallet.svg" className="w-8 h-8" />
            </button>
            <div className="lg:hidden text-gray-600">
              <p className="font-bold">Address:</p>
              <span className="break-words">{address}</span>
            </div>
          </div>
          <ul
            className={`bg-white top-12 right-0 mt-5 space-y-5 lg:absolute lg:border lg:rounded-md lg:text-sm lg:w-52 lg:shadow-md lg:space-y-0 lg:mt-0 ${
              state ? "" : "lg:hidden"
            }`}
          >
            <li>
              <div className="hidden lg:block text-gray-600 lg:p-2.5">
                <p className="font-bold">Address:</p>
                <span className="break-words">{address}</span>
              </div>
            </li>
            <li>
              <Link href="/" passHref>
                <a className="block text-gray-600 lg:hover:bg-gray-50 lg:p-2.5">
                  Dashboard
                </a>
              </Link>
            </li>
            <li>
              <Link href="/" passHref>
                <a className="block text-gray-600 lg:hover:bg-gray-50 lg:p-2.5">
                  Settings
                </a>
              </Link>
            </li>
            <li>
              <button
                className="block text-gray-600 lg:hover:bg-gray-50 lg:p-2.5 w-full text-left"
                onClick={disconnect}
              >
                Log out
              </button>
            </li>
          </ul>
        </>
      ) : (
        <div className="flex justify-center">
          <ConnectButton label="Sign In" />
        </div>
      )}
    </div>
  );
};
