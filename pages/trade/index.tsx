import axios from "axios";
import { useEffect, useState } from "react";
import { useAccount } from "@web3modal/react";
import { Community } from "../api/communities";
import FundCard from "../../components/Fund/FundCard";
import Link from "next/link";
import CommunityItem from "../../components/Community/CommunityItem";

const TradeMainPage = () => {
  const { address } = useAccount();
  const [communities, setCommunities] = useState<Community[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (address) {
      axios.post("/api/communities", { address }).then((res) => {
        setCommunities(res.data);
        setIsLoading(false);
      });
    }
  }, [address]);

  return (
    <div className="w-full">
      <FundCard
        title="Click a fund to deposit/withdraw"
        className="mt-0"
        isLoading={isLoading}
      >
        <ul className="list-disc list-inside">
          {communities.length !== 0 ? (
            communities.map((community) => (
              <CommunityItem
                key={community.community}
                {...community}
                baseURL="/trade/"
              />
            ))
          ) : (
            <div>
              <p>No funds found :(</p>
              <Link href="/fund/default" passHref>
                <a className="text-blue-600 dark:text-blue-500 hover:underline">
                  Click here to see the default trade screen
                </a>
              </Link>
            </div>
          )}
        </ul>
      </FundCard>
    </div>
  );
};
export default TradeMainPage;
