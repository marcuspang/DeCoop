import { ArrowDownTrayIcon } from "@heroicons/react/20/solid";
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
  return (
    <div className="w-full px-2">
      <div className="flex flex-wrap lg:flex-nowrap justify-between">
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
      <div className="flex flex-wrap lg:flex-nowrap justify-between">
        <FundCard title="All Contributors">
          <FundDistributionChart data={data} />
        </FundCard>
        <FundCard title="Contribution Credit Scores">
          <FundCreditScores data={data} />
        </FundCard>
      </div>
      <FundTransactionChart />
      <div className="my-12 bg-white p-4 rounded shadow flex justify-between items-center">
        <h3 className="font-bold text-xl">All Transactions</h3>
        <button className="rounded border-2 p-2 border-gray-300 transition-all hover:bg-gray-100 hover:border-gray-400 focus:border-blue-600">
          Download Full Report{" "}
          <ArrowDownTrayIcon className="inline mb-1" width={16} height={16} />
        </button>
      </div>
      <FundTransactionTable />
    </div>
  );
};

export default ViewFundPage;
