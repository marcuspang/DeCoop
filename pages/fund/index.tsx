import { useAccount } from "@web3modal/react";
import axios from "axios";
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
      <div className="ml-2">
        <FundCard title="Your Funds">
          <ul>
            {communities.map((community) => (
              <li key={community.community}>
                {community.community} {community.erc}
              </li>
            ))}
          </ul>
        </FundCard>
      </div>
    </div>
  );
};

export default ViewFundsPage;
