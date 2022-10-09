import { useAccount } from "@web3modal/react";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import FundCard from "../../components/Fund/FundCard";
import { Community } from "../api/communities";

const ViewFundsPage = () => {
  const { address } = useAccount();
  const [communities, setCommunities] = useState<Community[]>([]);

  useEffect(() => {
    if (address) {
      axios
        .post("/api/communities", { address })
        .then((res) => setCommunities(res.data));
    }
  }, [address]);

  return (
    <div className="w-full">
      <FundCard title="Your Funds" className="mt-0">
        <ul>
          {communities.length !== 0 ? (
            communities.map((community) => (
              <li key={community.community}>
                {community.community} {community.erc}
              </li>
            ))
          ) : (
            <div>
              <p>No funds found :(</p>
              <Link href="/fund/default" passHref>
                <a className="text-blue-600 dark:text-blue-500 hover:underline">
                  Click here to see a default fund
                </a>
              </Link>
            </div>
          )}
        </ul>
      </FundCard>
    </div>
  );
};

export default ViewFundsPage;
