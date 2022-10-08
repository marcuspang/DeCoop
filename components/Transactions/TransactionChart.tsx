import { useState } from "react";
import {
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

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
        <p className="">BTC: {payload[0].value}</p>
        <p className="">ETH: {payload[1].value}</p>
      </div>
    );
  }

  return null;
};

const TransactionChart = () => {
  const [showBTC, setShowBTC] = useState(true);
  const [showETH, setShowETH] = useState(true);

  return (
    <div className="py-4 w-[97%] h-[300px]">
      <div className="flex flex-wrap space-x-4 justify-end">
        <div className="flex items-center mb-4">
          <input
            id="btc-checkbox"
            type="checkbox"
            checked={showBTC}
            className="w-4 h-4 cursor-pointer text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            onChange={() => setShowBTC((prev) => !prev)}
          />
          <label
            htmlFor="btc-checkbox"
            className="ml-2 text-md font-medium text-gray-900 dark:text-gray-300"
          >
            BTC
          </label>
        </div>
        <div>
          <div className="flex items-center mb-4">
            <input
              id="eth-checkbox"
              type="checkbox"
              checked={showETH}
              className="w-4 h-4 cursor-pointer text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              onChange={() => setShowETH((prev) => !prev)}
            />
            <label
              htmlFor="eth-checkbox"
              className="ml-2 text-md font-medium text-gray-900 dark:text-gray-300"
            >
              ETH
            </label>
          </div>
        </div>
      </div>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={composedChartData} margin={{ right: 4 }}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip content={CustomTooltip} />
          <Line dataKey="btc" hide={!showBTC} stroke="#413ea0" dot={null} />
          <Line dataKey="eth" hide={!showETH} stroke="#ff7300" dot={null} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TransactionChart;
