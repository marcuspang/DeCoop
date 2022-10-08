import { useNetwork, useSwitchNetwork } from "@web3modal/react";
import { useState } from "react";

const NetworkButton = () => {
  const { chain, chains } = useNetwork();
  const { switchNetwork } = useSwitchNetwork();

  const [state, setState] = useState(false);

  if (chain) {
    return (
      <div className="relative w-40 px-4 mx-auto text-[15px]">
        <button
          className="flex items-center justify-between w-full px-3 py-2 text-gray-500 bg-white border rounded-md shadow-sm hover:bg-slate-100 transition-all outline-none focus:border-indigo-600"
          aria-haspopup="true"
          aria-expanded="true"
          onClick={() => setState(!state)}
        >
          {chain.name}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 9l4-4 4 4m0 6l-4 4-4-4"
            />
          </svg>
        </button>

        {state ? (
          <div className="relative w-full">
            <ul
              className="absolute w-full mt-1 bg-white border rounded-md shadow-sm"
              role="listbox"
            >
              <div className="max-h-64 overflow-y-auto shadow-md">
                {chains.map(({ name, id }) => (
                  <li
                    key={id}
                    onClick={() => {
                      switchNetwork({
                        chainId: id,
                      });
                      setState(false);
                    }}
                    role="option"
                    aria-selected={id === chain.id}
                    className={`${
                      chain.id === id ? "text-indigo-600 bg-indigo-50" : ""
                    } cursor-pointer flex items-center justify-between px-3 py-2 duration-150 text-gray-500 hover:text-indigo-600 hover:bg-indigo-50`}
                  >
                    {name}
                    {chain.id === id ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-5 h-5 text-indigo-600"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    ) : (
                      ""
                    )}
                  </li>
                ))}
              </div>
            </ul>
          </div>
        ) : (
          ""
        )}
      </div>
    );
  }
  return <button>not connected</button>;
};

export default NetworkButton;
