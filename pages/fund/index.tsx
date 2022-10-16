import { PlusIcon } from "@heroicons/react/24/outline";
import { useAccount } from "@web3modal/react";
import Link from "next/link";
import { useRouter } from "next/router";
import FundListCard from "../../components/Fund/FundListCard";
import Card from "../../components/Layout/Card";
import FancyButton from "../../components/Layout/FancyButton";
import Spinner from "../../components/Layout/Spinner";
import useUserCommunity from "../../hooks/useUserCommunity";

const ViewFundsPage = () => {
  const { address, status } = useAccount();
  const { data, error, isLoading } = useUserCommunity(address);

  if (status !== "connected") {
    return (
      <div className="w-full lg:pl-0 px-4">
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
      <div className="w-full lg:pl-0 px-4">
        <div className="flex justify-end pt-3">
          <h1 className="font-bold text-4xl">Your Commmunity Funds</h1>
          <FancyButton spanClassName="px-4 py-2 text-md">
            <Link href={"/fund/new"} passHref>
              <a>
                <PlusIcon width={20} height={20} className="inline mr-2 mb-1" />
                Create Fund
              </a>
            </Link>
          </FancyButton>
        </div>
        <Card title="Your Funds">
          <Spinner />
        </Card>
      </div>
    );
  }

  return (
    <div className="w-full lg:pl-0 px-4">
      <div className="flex justify-between pt-3">
        <h1 className="font-bold text-4xl">Your Commmunity Funds</h1>
        <FancyButton spanClassName="px-4 py-2 text-md">
          <Link href={"/fund/new"} passHref>
            <a>
              <PlusIcon width={20} height={20} className="inline mr-2 mb-1" />
              Create Fund
            </a>
          </Link>
        </FancyButton>
      </div>
      <FundListCard
        funds={data}
        defaultUrl={"/fund/default"}
        baseUrl="/fund/"
      />
    </div>
  );
};

export default ViewFundsPage;
