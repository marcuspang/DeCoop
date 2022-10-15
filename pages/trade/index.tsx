import { useAccount } from "@web3modal/react";
import Link from "next/link";
import FundListCard from "../../components/Fund/FundListCard";
import Card from "../../components/Layout/Card";
import Spinner from "../../components/Layout/Spinner";
import useUserCommunity from "../../hooks/useUserCommunity";

const TradeMainPage = () => {
  const { address, status } = useAccount();
  const { data, error, isLoading } = useUserCommunity(address);

  if (status !== "connected") {
    return (
      <div className="w-full lg:pl-0 px-4">
        <Card title="Your Funds" className="mt-0">
          <div>
            <p>Please sign in with your wallet to see your funds.</p>
            <Link href="/trade/default" passHref>
              <a className="link">Click here to see the default trade screen</a>
            </Link>
          </div>
        </Card>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="w-full lg:pl-0 px-4">
        <Card title="Your Funds">
          <Spinner />
        </Card>
      </div>
    );
  }

  return (
    <div className="w-full lg:pl-0 px-4">
      <FundListCard
        defaultUrl="/fund/default"
        title="Click on a fund to deposit/withdraw from"
        baseUrl="/trade/"
        funds={data}
      />
    </div>
  );
};
export default TradeMainPage;
