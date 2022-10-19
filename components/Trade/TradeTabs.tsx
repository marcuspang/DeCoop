import { Dispatch, SetStateAction } from "react";

interface TradeTabsProps {
  tabSelected: "deposit" | "withdraw";
  setTabSelected: Dispatch<SetStateAction<"deposit" | "withdraw">>;
}

const TradeTabs = ({ tabSelected, setTabSelected }: TradeTabsProps) => {
  return (
    <ul className="text-center text-slate-500 rounded-lg divide-x divide-slate-200 shadow flex dark:divide-slate-700 dark:text-slate-400 mb-8">
      <li className="w-full">
        <button
          className={`inline-block p-4 w-full font-semibold text-lg ${
            tabSelected === "deposit"
              ? "text-slate-900 bg-slate-100 rounded-l-lg focus:ring-4 focus:ring-blue-300 focus:outline-none dark:bg-slate-700 dark:text-white"
              : "bg-white hover:text-slate-700 hover:bg-slate-50 focus:ring-4 focus:ring-blue-300 focus:outline-none dark:hover:text-white dark:bg-slate-800 dark:hover:bg-slate-700"
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
              ? "text-slate-900 bg-slate-100 rounded-r-lg focus:ring-4 focus:ring-blue-300 focus:outline-none dark:bg-slate-700 dark:text-white"
              : "bg-white hover:text-slate-700 hover:bg-slate-50 focus:ring-4 focus:ring-blue-300 focus:outline-none dark:hover:text-white dark:bg-slate-800 dark:hover:bg-slate-700"
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
