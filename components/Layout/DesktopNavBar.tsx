import NetworkButton from "../Wallet/NetworkButton";
import { Wallet } from "../Wallet/Wallet";

const DesktopNavBar = () => {
  return (
    <div className="flex-1 items-center justify-end hidden lg:flex">
      <div
        className={`bg-white flex absolute z-20 top-16 left-0 border-b-2 lg:static lg:flex lg:border-none`}
      >
        <NetworkButton className="" />
        <Wallet className="" />
      </div>
      <div className="items-center justify-end space-x-2 sm:space-x-6">
        <button className="outline-none text-gray-400 block lg:hidden">
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
        </button>
      </div>
    </div>
  );
};

export default DesktopNavBar;
