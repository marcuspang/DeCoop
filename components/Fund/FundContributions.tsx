import { isAddress } from "ethers/lib/utils";
import { useEffect, useState } from "react";
import { dummyDistributions, dummyTransactions } from "../../data/transactions";
import useCommunity from "../../hooks/useCommunity";
import useEvents from "../../hooks/useEvents";
import { CommunityEvents } from "../../pages/api/events";
import { FundContribution } from "../../pages/fund/[address]";
import FundCard from "./FundCard";
import FundCreditScores from "./FundCreditScores";
import FundDistributionChart from "./FundDistributionChart";

const data: FundContribution[] = [
  { address: "Adithya", value: 2400 },
  { address: "Marcus", value: 4567 },
  { address: "Colin", value: 1398 },
  { address: "Yong Kang", value: 9800 },
  { address: "Kasshif", value: 3908 },
];

interface FundDistributionProps {
  communityAddress: string;
  walletAddress: string;
}

const transformEventsData = (events: CommunityEvents) => {
  let dist: FundContribution[] = [];
  if (events && events.deposits) {
    const addressValueDict: Record<string, number> = {};

    for (const deposit of events.deposits) {
      if (!addressValueDict[deposit.from]) addressValueDict[deposit.from] = 0;
      addressValueDict[deposit.from] += deposit.value;
    }

    for (const withdrawal of events.withdrawals) {
      if (!addressValueDict[withdrawal.from])
        addressValueDict[withdrawal.from] = 0;
      addressValueDict[withdrawal.from] -= withdrawal.value;
    }

    for (const address in addressValueDict) {
      dist.push({
        address,
        value: addressValueDict[address],
      });
    }
  }
  return dist;
};

const FundContributions = ({
  communityAddress,
  walletAddress,
}: FundDistributionProps) => {
  const { data: communityData } = useCommunity(communityAddress);
  const { data: events } = useEvents(communityAddress, walletAddress);
  const [rows, setRows] = useState<FundContribution[]>([]);

  useEffect(() => {
    if (isAddress(communityAddress)) {
      setRows(transformEventsData(events));
    } else {
      setRows(dummyDistributions);
    }
  }, [communityAddress, events]);

  return (
    <div className="flex flex-wrap lg:flex-nowrap justify-between space-x-3">
      <FundCard title="All Contributors">
        <FundDistributionChart
          data={rows}
          tokenSymbol={communityData?.tokenSymbol || "TOKEN"}
        />
      </FundCard>
      <FundCard title="Contribution Credit Scores">
        <FundCreditScores data={data} />
      </FundCard>
    </div>
  );
};

export default FundContributions;
