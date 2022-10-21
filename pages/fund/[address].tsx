import {
  ArrowDownTrayIcon,
  ArrowsRightLeftIcon,
} from "@heroicons/react/20/solid";
import { useAccount, useProvider } from "@web3modal/react";
import { isAddress } from "ethers/lib/utils";
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
import { dummyTransactions } from "../../data/transactions";
import useCommunity from "../../hooks/useCommunity";
import useEvents from "../../hooks/useEvents";

export interface FundContribution {
  address: string;
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

  const { data: communityData } = useCommunity(communityAddress);
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
      if (isAddress(communityAddress)) {
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
      } else {
        setTransactions(dummyTransactions);
      }
    };
    updateRows();
  }, [data, provider]);

  return (
    <div className="w-full lg:pl-0 px-4">
      <div className="flex justify-between pt-3 flex-wrap md:flex-nowrap flex-col-reverse md:flex-row">
        <h1 className="font-bold text-4xl mt-2">
          Community Fund:{" "}
          <span className="font-semibold text-gray-700">
            {communityData?.name || "None found"}
          </span>
        </h1>
        <FancyButton
          spanClassName="px-4 py-2 text-md"
          buttonClassName="self-end"
        >
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
          <button className="rounded-md border-2 p-2 px-4 border-color transition-all element-background">
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
