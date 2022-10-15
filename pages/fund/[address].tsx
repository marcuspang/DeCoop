import {
  ArrowDownTrayIcon,
  ArrowsRightLeftIcon,
} from "@heroicons/react/20/solid";
import { useAccount, useProvider } from "@web3modal/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import FundCard from "../../components/Fund/FundCard";
import FundContributions from "../../components/Fund/FundContributions";
import FundStatistics from "../../components/Fund/FundStatistics";
import FundTransactionChart from "../../components/Fund/FundTransactionChart";
import FundTransactionTable, {
  FundTransactionRow,
} from "../../components/Fund/FundTransactionTable";
import FancyButton from "../../components/Layout/FancyButton";
import useEvents from "../../hooks/useEvents";

export interface FundContribution {
  name: string;
  value: number;
}

export interface FundTransactionChartRow {
  date: string;
  value: number;
  depositValue: number;
  withdrawValue: number;
}

const ViewFundPage = () => {
  const router = useRouter();
  const provider = useProvider();
  const { address } = useAccount();
  const [communityAddress, setCommunityAddress] = useState("");
  const { data } = useEvents(communityAddress, address);

  const [transactions, setTransactions] = useState<FundTransactionRow[]>([]);

  useEffect(() => {
    if (router.query && router.query.address) {
      setCommunityAddress(router.query.address.toString());
    }
  }, [router.query]);

  // Update the date of the transactions to the proper datetime value using block number
  useEffect(() => {
    const updateRows = async () => {
      if (data && provider) {
        let newTransactions: FundTransactionRow[] = [];
        if (data.deposits && data.deposits.length !== 0) {
          for (const event of data.deposits) {
            const block = await provider.getBlock(event.blockNumber);
            newTransactions.push({
              ...event,
              method: "Deposit",
              date: new Date(block.timestamp * 1000),
            });
          }
        }

        if (data.withdrawals && data.withdrawals.length !== 0) {
          for (const event of data.withdrawals) {
            const block = await provider.getBlock(event.blockNumber);
            newTransactions.push({
              ...event,
              method: "Withdrawal",
              date: new Date(block.timestamp * 1000),
            });
          }
        }
        setTransactions(newTransactions);
      }
    };
    updateRows();
  }, [data, provider]);

  return (
    <div className="w-full lg:px-0 px-4">
      <div className="flex justify-end pt-3">
        <FancyButton spanClassName="px-4 py-2 text-md">
          <Link href={"/trade/" + communityAddress} passHref>
            <a>
              <ArrowsRightLeftIcon
                width={18}
                height={18}
                className="inline mr-2 mb-0.5"
              />
              Withdraw/Deposit
            </a>
          </Link>
        </FancyButton>
      </div>
      <FundStatistics
        communityAddress={communityAddress}
        walletAddress={address}
      />
      <FundContributions
        communityAddress={communityAddress}
        walletAddress={address}
      />
      <FundTransactionChart data={transactions} />
      <FundCard className={`${!data ? "rounded-b" : "rounded-b-none"}`}>
        <div className="flex justify-between items-center">
          <h3 className="font-bold text-xl">All Transactions</h3>
          <button className="rounded border-2 p-2 border-gray-300 transition-all hover:bg-gray-100 hover:border-gray-400 focus:border-blue-600">
            Download Full Report{" "}
            <ArrowDownTrayIcon className="inline mb-1" width={16} height={16} />
          </button>
        </div>
      </FundCard>
      <FundTransactionTable data={transactions} />
    </div>
  );
};

export default ViewFundPage;
