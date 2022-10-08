import { useNetwork, useSwitchNetwork } from "@web3modal/react";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { Fragment } from "react";

interface NetworkButtonProps {
  className: string;
}

const NetworkButton = ({ className }: NetworkButtonProps) => {
  const { chain, chains } = useNetwork();
  const { switchNetwork } = useSwitchNetwork();

  return (
    <Menu
      as="div"
      className={`relative w-40 px-4 mx-auto text-[15px] ${className}`}
    >
      <Menu.Button
        className="flex items-center justify-between w-full px-3 py-2 text-gray-500 bg-white border rounded-md shadow-sm hover:bg-slate-100 transition-all outline-none focus:border-blue-600"
        aria-haspopup="true"
        aria-expanded="true"
        id="menu-button"
        type="button"
      >
        {chain?.name || "Ethereum"}
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
          className={`w-full mt-1 bg-white border rounded-md absolute`}
        >
          <div className="max-h-64 overflow-y-auto shadow-md" role="none">
            {chains &&
              chains.map(({ name, id }) => (
                <Menu.Item key={id}>
                  {
                    <div
                      onClick={() => {
                        switchNetwork({
                          chainId: id,
                        });
                      }}
                      className={`${
                        id === chain?.id ? "text-blue-600 bg-indigo-50" : ""
                      } cursor-pointer flex items-center justify-between pl-3 pr-2 py-2 duration-150 text-gray-500 hover:text-blue-600 hover:bg-indigo-50`}
                    >
                      {name}
                      {id === chain?.id && (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="w-5 h-5 text-blue-600"
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
                    </div>
                  }
                </Menu.Item>
              ))}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

export default NetworkButton;
