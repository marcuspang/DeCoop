import {
  ArrowDownTrayIcon,
  ArrowsRightLeftIcon,
} from "@heroicons/react/20/solid";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import FundCard from "../../components/Fund/FundCard";
import FundCreditScores from "../../components/Fund/FundCreditScores";
import FundDistributionChart from "../../components/Fund/FundDistributionChart";
import FundTransactionChart from "../../components/Fund/FundTransactionChart";
import FundTransactionTable from "../../components/Fund/FundTransactionTable";

const data: FundContribution[] = [
  { name: "Adithya", value: 2400 },
  { name: "Marcus", value: 4567 },
  { name: "Colin", value: 1398 },
  { name: "Yong Kang", value: 9800 },
  { name: "Kasshif", value: 3908 },
];

export interface FundContribution {
  name: string;
  value: number;
}

const ViewFundPage = () => {
  const router = useRouter();
  const [address, setAddress] = useState("default");

  useEffect(() => {
    if (router.query && router.query.address) {
      setAddress(router.query.address.toString());
    }
  }, [router.query]);

  return (
    <div className="w-full px-4">
      <div className="flex justify-end">
        <Link href={"/trade/" + address} passHref>
          <a className="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 transition-all cursor-pointer">
            <ArrowsRightLeftIcon
              width={18}
              height={18}
              className="inline mr-2 mb-1"
            />
            Withdraw/Deposit
          </a>
        </Link>
      </div>
      <div className="flex flex-wrap lg:flex-nowrap justify-between space-x-2">
        <FundCard title="Current Balance" amount={10000} />
        <FundCard
          title="Latest Deposit"
          amount={200}
          description="By Adi, 5 October 2022"
        />
        <FundCard
          title="Latest Withdrawal"
          description="By Colin, 4 October 2022"
          amount={150}
        />
      </div>
      <div className="flex flex-wrap lg:flex-nowrap justify-between space-x-2">
        <FundCard title="All Contributors">
          <FundDistributionChart data={data} />
        </FundCard>
        <FundCard title="Contribution Credit Scores">
          <FundCreditScores data={data} />
        </FundCard>
      </div>
      <FundCard title="Transactions over time">
        <FundTransactionChart />
      </FundCard>
      <FundCard>
        <div className="flex justify-between items-center">
          <h3 className="font-bold text-xl">All Transactions</h3>
          <button className="rounded border-2 p-2 border-gray-300 transition-all hover:bg-gray-100 hover:border-gray-400 focus:border-blue-600">
            Download Full Report{" "}
            <ArrowDownTrayIcon className="inline mb-1" width={16} height={16} />
          </button>
        </div>
      </FundCard>
      <div className="ml-2">
        <FundTransactionTable />
      </div>
    </div>
  );
};

export default ViewFundPage;
