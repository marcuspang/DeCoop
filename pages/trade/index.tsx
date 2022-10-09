import axios from "axios";
import { useEffect, useState } from "react";
import { useAccount } from "@web3modal/react";
import { Community } from "../api/communities";
import FundCard from "../../components/Fund/FundCard";

const TradeMainPage = () => {
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
      <FundCard title="Click a fund to deposit/withdraw" className="mt-0">
        test
      </FundCard>
    </div>
  );
};
export default TradeMainPage;
