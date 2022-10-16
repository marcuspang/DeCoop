import { Dispatch, SetStateAction } from "react";

interface TradeTabsProps {
  tabSelected: "deposit" | "withdraw";
  setTabSelected: Dispatch<SetStateAction<"deposit" | "withdraw">>;
}

const TradeTabs = ({ tabSelected, setTabSelected }: TradeTabsProps) => {
  return (
    <ul className="text-center text-gray-500 rounded-lg divide-x divide-gray-200 shadow flex dark:divide-gray-700 dark:text-gray-400 mb-8">
      <li className="w-full">
        <button
          className={`inline-block p-4 w-full font-semibold text-lg ${
            tabSelected === "deposit"
              ? "text-gray-900 bg-gray-100 rounded-l-lg focus:ring-4 focus:ring-blue-300 focus:outline-none dark:bg-gray-700 dark:text-white"
              : "bg-white hover:text-gray-700 hover:bg-gray-50 focus:ring-4 focus:ring-blue-300 focus:outline-none dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700"
          }`}
          onClick={() => setTabSelected("deposit")}
        >
          Deposit
        </button>
      </li>
      <li className="w-full">
        <button
          className={`inline-block p-4 w-full font-semibold text-lg ${
            tabSelected === "withdraw"
              ? "text-gray-900 bg-gray-100 rounded-r-lg focus:ring-4 focus:ring-blue-300 focus:outline-none dark:bg-gray-700 dark:text-white"
              : "bg-white hover:text-gray-700 hover:bg-gray-50 focus:ring-4 focus:ring-blue-300 focus:outline-none dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700"
          }`}
          onClick={() => setTabSelected("withdraw")}
        >
          Withdraw
        </button>
      </li>
    </ul>
  );
};

export default TradeTabs;
