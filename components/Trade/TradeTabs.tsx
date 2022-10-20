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
          className={`trade-tabs rounded-l-lg ${
            tabSelected === "deposit" ? "active" : ""
          }`}
          onClick={() => setTabSelected("deposit")}
        >
          Deposit
        </button>
      </li>
      <li className="w-full">
        <button
          className={`trade-tabs rounded-r-lg ${
            tabSelected === "withdraw" ? "active" : ""
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
