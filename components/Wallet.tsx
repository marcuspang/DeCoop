import { Menu, Transition } from "@headlessui/react";
import { ConnectButton, useAccount, useDisconnect } from "@web3modal/react";
import Link from "next/link";
import { Fragment } from "react";

export const links = [
  { name: "Dashboard", link: "/" },
  { name: "Settings", link: "/" },
];

export const Wallet = ({ className }) => {
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
          className="w-10 h-10 outline-none"
          aria-haspopup="true"
          aria-expanded="true"
          id="menu-button"
          type="button"
        >
          <img src="/wallet.svg" className="w-8 h-8" />
        </Menu.Button>
      </div>
      <div className="lg:hidden flex items-center">
        <img src="/wallet.svg" className="w-8 h-8 mr-3" />
        <div className="lg:hidden text-gray-600">
          <p className="font-bold">Address:</p>
          <span className="break-all">{address}</span>
        </div>
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
        <Menu.Items
          className={`bg-white top-12 right-0 mt-5 space-y-5 lg:absolute lg:border lg:rounded-md lg:text-sm lg:w-52 lg:shadow-md lg:space-y-0 lg:mt-0
          `}
        >
          <Menu.Item>
            <div className="hidden lg:block text-gray-600 lg:p-2.5">
              <p className="font-bold">Address:</p>
              <span className="break-words">{address}</span>
            </div>
          </Menu.Item>
          {links.map((link) => (
            <Menu.Item key={link.name}>
              <div>
                <Link href={link.link} passHref>
                  <a className="block text-gray-600 lg:hover:bg-gray-50 lg:p-2.5">
                    {link.name}
                  </a>
                </Link>
              </div>
            </Menu.Item>
          ))}
          <Menu.Item>
            <div>
              <button
                className="block text-gray-600 lg:hover:bg-gray-50 lg:p-2.5 w-full text-left"
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
