import { useState } from "react";
import {
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import colors from "tailwindcss/colors";
import useColourMode from "../../hooks/useColourMode";
import { FundTransactionChartRow } from "../../pages/fund/[address]";
import FundCard from "./FundCard";
import { FundTransactionRow } from "./FundTransactionTable";

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="background p-4 rounded-lg shadow-lg">
        <p className="font-bold">Time: {label}</p>
        <p>Deposit(s): {payload[0].value}</p>
        <p>Withdrawal(s): {payload[1].value}</p>
      </div>
    );
  }

  return null;
};

interface FundTransactionChartProps {
  data: FundTransactionRow[];
}

const transformTransactionsData = (
  transactions: FundTransactionRow[]
): FundTransactionChartRow[] => {
  const dateValuesMap: Record<string, FundTransactionChartRow> = {};
  transactions.forEach((transaction) => {
    const date = transaction.date.toLocaleDateString();
    if (date in dateValuesMap) {
      if (transaction.method === "Deposit") {
        dateValuesMap[date].depositValue += transaction.value;
      } else {
        dateValuesMap[date].withdrawValue += transaction.value;
      }
      dateValuesMap[date].value += transaction.value;
    } else {
      dateValuesMap[date] = {
        depositValue: transaction.method === "Deposit" ? transaction.value : 0,
        withdrawValue:
          transaction.method === "Withdrawal" ? transaction.value : 0,
        date,
        value: transaction.value,
      };
    }
  });
  return Object.values(dateValuesMap);
};

const FundTransactionChart = ({ data }: FundTransactionChartProps) => {
  const [showDeposits, setShowDeposits] = useState(true);
  const [showWithdrawals, setShowWithdrawals] = useState(true);
  const { isLightMode } = useColourMode();

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
          <LineChart data={transformTransactionsData(data)}>
            <XAxis
              dataKey="date"
              stroke={isLightMode ? colors.slate[900] : colors.slate[400]}
            />
            <YAxis
              dataKey="value"
              stroke={isLightMode ? colors.slate[900] : colors.slate[400]}
            />
            <Tooltip content={CustomTooltip} />
            <Line
              dataKey="depositValue"
              hide={!showDeposits}
              stroke={isLightMode ? colors.green[900] : colors.green[400]}
            />
            <Line
              dataKey="withdrawValue"
              hide={!showWithdrawals}
              stroke={isLightMode ? colors.red[900] : colors.red[400]}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </FundCard>
  );
};

export default FundTransactionChart;
