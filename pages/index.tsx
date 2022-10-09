import {
  ArrowDownOnSquareIcon,
  ArrowDownTrayIcon,
} from "@heroicons/react/20/solid";
import Head from "next/head";
import TransactionCard from "../components/Transactions/TransactionCard";
import TransactionChart from "../components/Transactions/TransactionChart";
import TransactionsTable from "../components/Transactions/TransactionsTable";

export default function Home() {
  return (
    <div className="w-full px-2">
      <Head>
        <title>Optimity</title>
        <meta name="description" content="Optimity 2022" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex flex-wrap lg:flex-nowrap justify-between">
        <TransactionCard title="Current Balance" amount={10000} />
        <TransactionCard
          title="Latest Deposit"
          amount={200}
          latest="By Adi, 5 October 2022"
        />
        <TransactionCard
          title="Latest Withdrawal"
          latest="By Colin, 4 October 2022"
          amount={150}
        />
      </div>
      <TransactionChart />
      <div className="my-12 bg-white p-4 rounded shadow flex justify-between items-center">
        <h3 className="font-bold text-xl">All Transactions</h3>
        <button className="rounded border-2 p-2 border-gray-300 transition-all hover:bg-gray-100 hover:border-gray-400 focus:border-blue-600">
          Download Full Report{" "}
          <ArrowDownTrayIcon className="inline mb-1" width={16} height={16} />
        </button>
      </div>
      <TransactionsTable />
    </div>
  );
}
