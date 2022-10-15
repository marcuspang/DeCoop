import {
  ArrowDownTrayIcon,
  ArrowsRightLeftIcon,
} from "@heroicons/react/20/solid";
import { useAccount } from "@web3modal/react";
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
import useCommunityEvents from "../../hooks/useCommunityEvents";
import { CommunityEvents } from "../api/events";

export interface FundContribution {
  name: string;
  value: number;
}

const transformEvents = (events: CommunityEvents) => {
  let rows: FundTransactionRow[] = [];
  if (events) {
    if (events.deposits && events.deposits.length !== 0) {
      for (const event of events.deposits) {
        rows.push({
          address: event.address,
          blockNumber: event.blockNumber,
          method: "Deposit",
          date: null,
          amount: event.value,
        });
      }
    }

    if (events.withdrawals && events.withdrawals.length !== 0) {
      for (const event of events.withdrawals) {
        rows.push({
          address: event.address,
          blockNumber: event.blockNumber,
          method: "Withdrawal",
          date: null,
          amount: event.value,
        });
      }
    }
  }
  return rows;
};

const ViewFundPage = () => {
  const router = useRouter();
  const { address } = useAccount();
  const [communityAddress, setCommunityAddress] = useState("");

  const { data } = useCommunityEvents(communityAddress, address);

  useEffect(() => {
    if (router.query && router.query.address) {
      setCommunityAddress(router.query.address.toString());
    }
  }, [router.query]);

  return (
    <div className="w-full px-4">
      <div className="flex justify-end">
        <Link href={"/trade/" + communityAddress} passHref>
          <a className="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center shadow-md transition-all cursor-pointer">
            <ArrowsRightLeftIcon
              width={18}
              height={18}
              className="inline mr-2 mb-0.5"
            />
            Withdraw/Deposit
          </a>
        </Link>
      </div>
      <FundStatistics
        communityAddress={communityAddress}
        walletAddress={address}
      />
      <FundContributions
        communityAddress={communityAddress}
        walletAddress={address}
      />
      <FundTransactionChart />
      <FundCard>
        <div className="flex justify-between items-center">
          <h3 className="font-bold text-xl">All Transactions</h3>
          <button className="rounded border-2 p-2 border-gray-300 transition-all hover:bg-gray-100 hover:border-gray-400 focus:border-blue-600">
            Download Full Report{" "}
            <ArrowDownTrayIcon className="inline mb-1" width={16} height={16} />
          </button>
        </div>
      </FundCard>
      <FundTransactionTable data={transformEvents(data)} />
    </div>
  );
};

export default ViewFundPage;
