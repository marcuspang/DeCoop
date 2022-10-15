import { useAccount, useNetwork } from "@web3modal/react";
import Link from "next/link";
import Card from "../../components/Layout/Card";
import FundListCard from "../../components/Fund/FundListCard";
import Spinner from "../../components/Layout/Spinner";
import useUserCommunity from "../../hooks/useUserCommunity";
import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";
import FancyButton from "../../components/Layout/FancyButton";
import { PlusIcon } from "@heroicons/react/24/outline";

const ViewFundsPage = () => {
  const { address, status } = useAccount();
  const { data, error, isLoading } = useUserCommunity(address);

  if (status !== "connected") {
    return (
      <div className="w-full lg:px-0 px-4">
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
      <div className="w-full lg:px-0 px-4">
        <div className="flex justify-end pt-3">
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
    <div className="w-full lg:px-0 px-4">
      <div className="flex justify-end pt-3">
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
        title="Your Funds"
        funds={data}
        defaultUrl={"/fund/default"}
        baseUrl="/fund/"
      />
    </div>
  );
};

export default ViewFundsPage;
