import useCommunity from "../../hooks/useCommunity";
import useCommunityEvents from "../../hooks/useCommunityEvents";
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

const FundContributions = ({
  communityAddress,
  walletAddress,
}: FundDistributionProps) => {
  const { data: events } = useCommunityEvents(communityAddress, walletAddress);

  return (
    <div className="flex flex-wrap lg:flex-nowrap justify-between space-x-3">
      <FundCard title="All Contributors">
        <FundDistributionChart
          data={(() => {
            if (events && events.deposits) {
              const dict = {};
              for (const deposit of events.deposits) {
                if (!dict[deposit.address]) dict[deposit.address] = 0;
                dict[deposit.address] += deposit.value;
              }

              for (const withdrawal of events.withdrawals) {
                if (!dict[withdrawal.address]) dict[withdrawal.address] = 0;
                dict[withdrawal.address] -= withdrawal.value;
              }

              let dist: FundContribution[] = [];

              for (const address in dict) {
                dist.push({
                  name: truncateEthAddress(address),
                  value: dict[address],
                });
              }

              return dist;
            }
            return [];
          })()}
        />
      </FundCard>
      <FundCard title="Contribution Credit Scores">
        <FundCreditScores data={data} />
      </FundCard>
    </div>
  );
};

export default FundContributions;
