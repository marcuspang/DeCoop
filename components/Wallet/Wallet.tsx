import { Menu, Transition } from "@headlessui/react";
import { WalletIcon } from "@heroicons/react/24/outline";
import { ConnectButton, useAccount, useDisconnect } from "@web3modal/react";
import Link from "next/link";
import { Fragment } from "react";
import links from "../../data/links";

interface WalletProps {
  className?: string;
}

export const Wallet = ({ className }: WalletProps) => {
  const { status, address } = useAccount();
  const disconnect = useDisconnect();

  if (status !== "connected") {
    return (
      <div className={`flex justify-center ${className}`}>
        <ConnectButton label="Sign In" />
      </div>
    );
  }

  return (
    <Menu as="div" className={`relative ${className}`}>
      <div className="hidden lg:block">
        <Menu.Button
          className="dark:text-white element-background focus:outline-none focus:ring-2 focus:ring-darkBlue dark:focus:ring-gray-600 rounded-lg p-2"
          aria-haspopup="true"
          aria-expanded="true"
          id="menu-button"
          type="button"
        >
          <WalletIcon width={26} height={26} className="mx-auto" />
        </Menu.Button>
      </div>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="bg-white dark:bg-darkBlue top-12 right-0 mt-5 space-y-5 lg:absolute lg:border lg:rounded-md lg:text-sm lg:w-52 lg:shadow-md lg:space-y-0 lg:mt-0 border-color">
          <Menu.Item>
            <div className="hidden lg:block lg:p-2.5 border-b-2 border-color">
              <p className="font-bold">Address:</p>
              <span className="break-words">{address}</span>
            </div>
          </Menu.Item>
          {links.map((link) => (
            <Menu.Item key={link.name}>
              <div>
                <Link href={link.link} passHref>
                  <a className="block element-background lg:p-2.5 text">
                    {link.name}
                  </a>
                </Link>
              </div>
            </Menu.Item>
          ))}
          <Menu.Item>
            <div>
              <button
                className="block element-background lg:p-2.5 w-full text-left rounded-b-sm"
                onClick={() => disconnect()}
              >
                Log out
              </button>
            </div>
          </Menu.Item>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};
