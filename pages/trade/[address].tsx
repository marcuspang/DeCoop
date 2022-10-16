import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import FancyButton from "../../components/Layout/FancyButton";
import TradeForm from "../../components/Trade/TradeForm";
import TradeTabs from "../../components/Trade/TradeTabs";
import useCommunity from "../../hooks/useCommunity";

const TradePage = () => {
  const router = useRouter();
  const [communityAddress, setCommunityAddress] = useState("");
  const [tabSelected, setTabSelected] = useState<"withdraw" | "deposit">(
    "deposit"
  );

  const { data: communityData } = useCommunity(communityAddress);

  useEffect(() => {
    if (router.query && router.query.address) {
      setCommunityAddress(router.query.address.toString());
    }
  }, [router.query]);

  return (
    <div className="w-full lg:pl-0 px-4">
      <div className="flex justify-between pt-3">
        <h1 className="font-bold text-4xl">
          Community Fund:{" "}
          <span className="font-semibold text-gray-700">
            {communityData?.name || "None found"}
          </span>
        </h1>
        <FancyButton spanClassName="px-4 py-2 text-md">
          <Link href={"/fund/" + communityAddress} passHref>
            <a>
              <MagnifyingGlassIcon
                width={20}
                height={20}
                className="inline mr-2 mb-1"
              />
              View Fund
            </a>
          </Link>
        </FancyButton>
      </div>
      <div className="bg-white rounded-md shadow p-4 mt-3">
        <TradeTabs tabSelected={tabSelected} setTabSelected={setTabSelected} />
        <TradeForm
          tabSelected={tabSelected}
          communityAddress={communityAddress}
        />
      </div>
    </div>
  );
};

export default TradePage;
