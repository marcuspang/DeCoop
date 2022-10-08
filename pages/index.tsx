import Head from "next/head";
import TransactionCard from "../components/Transactions/TransactionCard";
import TransactionChart from "../components/Transactions/TransactionChart";

export default function Home() {
  return (
    <div className="w-full">
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
      <div className="py-4">
        <TransactionChart />
      </div>
      <div>all transaction</div>
      <div>list</div>
    </div>
  );
}
