import { useState } from "react";
import {
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { FundTransactionChartRow } from "../../pages/fund/[address]";
import FundCard from "./FundCard";
import { FundTransactionRow } from "./FundTransactionTable";

export const composedChartData = [
  {
    name: "-7d",
    btc: 2155,
    eth: 2400,
  },
  {
    name: "-6d",
    btc: 2800,
    eth: 2512,
  },
  {
    name: "-5d",
    btc: 2500,
    eth: 2000,
  },
  {
    name: "-4d",
    btc: 2980,
    eth: 3208,
  },
  {
    name: "-3d",
    btc: 2600,
    eth: 3000,
  },
  {
    name: "-2d",
    btc: 4090,
    eth: 3800,
  },
  {
    name: "-1d",
    btc: 5090,
    eth: 4600,
  },
];

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-4 rounded-lg shadow-lg">
        <p className="font-bold">Time: {label}</p>
        <p>Deposit(s): {payload[0].value}</p>
        <p>Withdrawal(s): {payload[1].value}</p>
      </div>
    );
  }

  return null;
};

interface FundTransactionChartProps {
  data: FundTransactionChartRow[];
}

const FundTransactionChart = ({ data }: FundTransactionChartProps) => {
  const [showDeposits, setShowDeposits] = useState(true);
  const [showWithdrawals, setShowWithdrawals] = useState(true);

  return (
    <FundCard title="Transactions over time">
      <div className="py-4 mb-4 w-[97%] h-[300px]">
        <div className="flex flex-wrap space-x-4 justify-end">
          <div className="flex items-center mb-4">
            <input
              id="deposits-checkbox"
              type="checkbox"
              checked={showDeposits}
              className="w-4 h-4 cursor-pointer text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-1 dark:bg-gray-700 dark:border-gray-600"
              onChange={() => setShowDeposits((prev) => !prev)}
            />
            <label
              htmlFor="deposits-checkbox"
              className="ml-2 text-md font-medium text-gray-900 dark:text-gray-300"
            >
              Deposits
            </label>
          </div>
          <div>
            <div className="flex items-center mb-4">
              <input
                id="withdrawals-checkbox"
                type="checkbox"
                checked={showWithdrawals}
                className="w-4 h-4 cursor-pointer text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-1 dark:bg-gray-700 dark:border-gray-600"
                onChange={() => setShowWithdrawals((prev) => !prev)}
              />
              <label
                htmlFor="withdrawals-checkbox"
                className="ml-2 text-md font-medium text-gray-900 dark:text-gray-300"
              >
                Withdrawals
              </label>
            </div>
          </div>
        </div>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <XAxis dataKey="date" />
            <YAxis dataKey="value" />
            <Tooltip content={CustomTooltip} />
            <Line
              dataKey="depositValue"
              hide={!showDeposits}
              stroke="#413ea0"
              dot={null}
            />
            <Line
              dataKey="withdrawValue"
              hide={!showWithdrawals}
              stroke="#ff7300"
              dot={null}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </FundCard>
  );
};

export default FundTransactionChart;
