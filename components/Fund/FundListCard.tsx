import Link from "next/link";
import CommunityItem from "../Community/CommunityItem";
import Card from "../Layout/Card";

interface FundListCardProps {
  funds: string[];
}

const FundListCard = ({ funds }: FundListCardProps) => {
  if (funds.length === 0) {
    return (
      <Card title="Your Funds" className="mt-0">
        <div>
          <p>No funds found :(</p>
          <Link href="/fund/default" passHref>
            <a className="text-blue-600 dark:text-blue-500 hover:underline">
              Click here to see a default fund
            </a>
          </Link>
        </div>
      </Card>
    );
  }

  return (
    <Card title={"Your Funds"} className="mt-0">
      <ul className="list-disc list-inside">
        {funds.map((community) => (
          <CommunityItem key={community} address={community} baseURL="/fund/" />
        ))}
      </ul>
    </Card>
  );
};

export default FundListCard;
