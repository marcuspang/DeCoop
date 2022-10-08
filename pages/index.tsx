import Head from "next/head";
import TransactionCard from "../components/Transactions/TransactionCard";

export default function Home() {
  return (
    <div className="w-full">
      <Head>
        <title>Optimity</title>
        <meta name="description" content="Optimity 2022" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>
        <div className="flex justify-between">
          <TransactionCard />
          <TransactionCard />
          <TransactionCard />
        </div>
        <div>chart</div>
        <div>all transaction</div>
        <div>list</div>
      </div>
    </div>
  );
}
