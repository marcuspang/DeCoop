import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import FancyButton from "../../components/Layout/FancyButton";
import TradeForm from "../../components/Trade/TradeForm";
import TradeTabs from "../../components/Trade/TradeTabs";

const TradePage = () => {
  const router = useRouter();
  const [communityAddress, setCommunityAddress] = useState("");
  const [tabSelected, setTabSelected] = useState<"withdraw" | "deposit">(
    "deposit"
  );

  useEffect(() => {
    if (router.query && router.query.address) {
      setCommunityAddress(router.query.address.toString());
    }
  }, [router.query]);

  return (
    <div className="w-full lg:pl-0 px-4">
      <div className="flex justify-end pt-3">
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
      <div className="bg-white rounded-md shadow px-4 mt-3">
        <h1 className="pt-4 pb-5 font-bold text-2xl">
          {tabSelected === "deposit" ? "Depositing to " : "Withdrawing from "}{" "}
          <span className="font-semibold break-all">{communityAddress}</span>
        </h1>
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
