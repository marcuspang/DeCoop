import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { useNetwork, useSwitchNetwork } from "@web3modal/react";
import { Fragment } from "react";

interface NetworkButtonProps {
  className?: string;
}

const NetworkButton = ({ className }: NetworkButtonProps) => {
  const { chain, chains } = useNetwork();
  const { switchNetwork } = useSwitchNetwork();

  return (
    <Menu as="div" className={`relative w-36 mx-auto text-[15px] ${className}`}>
      <Menu.Button
        className="flex items-center justify-between w-full px-3 py-2  border-2 border-color rounded-lg hover:bg-slate-100  dark:hover:bg-slate-700 hover:border-slate-400 transition-all outline-none focus:border-darkBlue dark:focus:border-slate-500"
        aria-haspopup="true"
        aria-expanded="true"
        id="menu-button"
        type="button"
      >
        {chain?.name || "Goerli"}
        <ChevronDownIcon className="-mr-1 ml-2 h-5 w-5" aria-hidden="true" />
      </Menu.Button>

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
          className={`w-full mt-1 border border-color rounded-md absolute`}
        >
          <ul className="max-h-64 overflow-y-auto shadow-md" role="none">
            {chains &&
              chains.map(({ name, id }, index) => (
                <Menu.Item key={id}>
                  {
                    <li
                      onClick={() => {
                        switchNetwork({
                          chainId: id,
                        });
                      }}
                      className={`element-background
                      ${index === 0 ? "rounded-t-md" : ""}
                      ${index === chains.length - 1 ? "rounded-b-md" : ""}
                      ${
                        id === chain?.id ? "!bg-slate-200 dark:!bg-slate-600" : ""
                      } cursor-pointer flex items-center justify-between pl-3 pr-2 py-2 duration-150`}
                    >
                      {name}
                      {id === chain?.id && (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="w-5 h-5 text-indigo-700 dark:text-purple-300"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      )}
                    </li>
                  }
                </Menu.Item>
              ))}
          </ul>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

export default NetworkButton;
