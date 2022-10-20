import { useNetwork, useProvider } from "@web3modal/react";
import { ethers } from "ethers";
import { useEffect, useState } from "react";
import useCommunity from "../../hooks/useCommunity";
import useEvents from "../../hooks/useEvents";
import { CommunityEvent } from "../../pages/api/events";
import truncateEthAddress from "../../utils/truncateEthAddress";
import FundCard from "./FundCard";

interface FundStatisticsProps {
  communityAddress: string;
  walletAddress: string;
}

const defaults = {
  communityName: "default",
  symbol: "TOKEN",
  latestDeposit: "1",
  latestWithdrawal: "-",
  balance: 0,
};

// timestamp is in seconds
const formatTransaction = (transaction: CommunityEvent, timestamp: number) => {
  if (!transaction) {
    return "-";
  }
  return (
    "By " +
    truncateEthAddress(transaction.from) +
    ", " +
    new Date(timestamp * 1000).toLocaleDateString()
  );
};

const FundStatistics = ({
  walletAddress,
  communityAddress,
}: FundStatisticsProps) => {
  const provider = useProvider();
  const [latestDepositTimestamp, setLatestDepositTimestamp] = useState(0);
  const [latestWithdrawalTimestamp, setLatestWithdrawalTimestamp] = useState(0);
  const { chain } = useNetwork();

  const { data: community, isLoading: isCommunityLoading } =
    useCommunity(communityAddress);
  const { data: events, isLoading: isEventsLoading } = useEvents(
    communityAddress,
    walletAddress
  );

  useEffect(() => {
    if (provider && events) {
      if (events.deposits && events.deposits.length !== 0) {
        provider
          .getBlock(events.deposits[events.deposits.length - 1].blockNumber)
          .then((block) => setLatestDepositTimestamp(block.timestamp));
      }
      if (events.withdrawals && events.withdrawals.length !== 0) {
        provider
          .getBlock(
            events.withdrawals[events.withdrawals.length - 1].blockNumber
          )
          .then((block) => setLatestWithdrawalTimestamp(block.timestamp));
      }
    }
  }, [events, provider]);

  if (isCommunityLoading || isEventsLoading) {
    return (
      <div className="flex flex-wrap lg:flex-nowrap justify-between lg:space-x-3 space-x-0">
        <FundCard title="Current Balance" isLoading={isCommunityLoading} />
        <FundCard title="Latest Deposit" isLoading={isEventsLoading} />
        <FundCard title="Latest Withdrawal" isLoading={isEventsLoading} />
      </div>
    );
  }

  if (!community || !events) {
    return (
      <div className="flex flex-wrap lg:flex-nowrap justify-between lg:space-x-3 space-x-0">
        <FundCard
          title="Current Balance"
          symbol={defaults.symbol}
          amount={defaults.balance}
        />
        <FundCard
          title="Latest Deposit"
          symbol={defaults.symbol}
          amount={defaults.latestDeposit}
        />
        <FundCard
          title="Latest Withdrawal"
          symbol={defaults.symbol}
          amount={defaults.latestWithdrawal}
        />
      </div>
    );
  }

  const { tokenSymbol, tokenBalance } = community;
  const [latestDeposit, latestWithdrawal] = [
    events.deposits[events.deposits.length - 1] || null,
    events.withdrawals[events.withdrawals.length - 1] || null,
  ];

  return (
    <div className="flex flex-wrap lg:flex-nowrap justify-between lg:space-x-3 space-x-0">
      <FundCard
        title="Current Balance"
        symbol={tokenSymbol || defaults.symbol}
        amount={ethers.utils.formatUnits(tokenBalance || defaults.balance, 8)}
        isLoading={isCommunityLoading}
      />
      <FundCard
        title="Latest Deposit"
        symbol={tokenSymbol || defaults.symbol}
        amount={latestDeposit?.value || defaults.latestDeposit}
        description={formatTransaction(latestDeposit, latestDepositTimestamp)}
        descriptionLink={`https://${
          chain?.network || "goerli"
        }.etherscan.io/tx/${latestDeposit?.address}`}
        isLoading={isEventsLoading}
      />
      <FundCard
        title="Latest Withdrawal"
        symbol={tokenSymbol || defaults.symbol}
        amount={latestWithdrawal?.value || defaults.latestWithdrawal}
        description={formatTransaction(
          latestWithdrawal,
          latestWithdrawalTimestamp
        )}
        descriptionLink={`https://${
          chain?.network || "goerli"
        }.etherscan.io/tx/${latestWithdrawal?.address}`}
        isLoading={isEventsLoading}
      />
    </div>
  );
};

export default FundStatistics;
