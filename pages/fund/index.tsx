import { useAccount } from "@web3modal/react";
import Link from "next/link";
import Card from "../../components/Layout/Card";
import FundListCard from "../../components/Fund/FundListCard";
import Spinner from "../../components/Layout/Spinner";
import useUserCommunity from "../../hooks/useUserCommunity";

const ViewFundsPage = () => {
  const { address, status } = useAccount();
  const { data, error, isLoading } = useUserCommunity(address);

  if (status !== "connected") {
    return (
      <div className="w-full">
        <Card title="Your Funds" className="mt-0">
          <p>Please sign in with your wallet to see your funds.</p>
          <Link href="/fund/default" passHref>
            <a className="link">Click here to see a default fund</a>
          </Link>
        </Card>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="w-full">
        <Card title="Your Funds">
          <Spinner />
        </Card>
      </div>
    );
  }

  return (
    <div className="w-full">
      <FundListCard
        title="Your Funds"
        funds={data}
        defaultUrl={"/fund/default"}
        baseUrl="/fund/"
      />
    </div>
  );
};

export default ViewFundsPage;
