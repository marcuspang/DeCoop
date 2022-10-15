import useCommunity from "../../hooks/useCommunity";
import useEvents from "../../hooks/useEvents";
import { CommunityEvents } from "../../pages/api/events";
import { FundContribution } from "../../pages/fund/[address]";
import truncateEthAddress from "../../utils/truncateEthAddress";
import FundCard from "./FundCard";
import FundCreditScores from "./FundCreditScores";
import FundDistributionChart from "./FundDistributionChart";

const data: FundContribution[] = [
  { name: "Adithya", value: 2400 },
  { name: "Marcus", value: 4567 },
  { name: "Colin", value: 1398 },
  { name: "Yong Kang", value: 9800 },
  { name: "Kasshif", value: 3908 },
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
        name: address,
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
  const { data: events } = useEvents(communityAddress, walletAddress);

  return (
    <div className="flex flex-wrap lg:flex-nowrap justify-between space-x-3">
      <FundCard title="All Contributors">
        <FundDistributionChart data={transformEventsData(events)} />
      </FundCard>
      <FundCard title="Contribution Credit Scores">
        <FundCreditScores data={data} />
      </FundCard>
    </div>
  );
};

export default FundContributions;
