import { useRouter } from "next/router";
import { useEffect, useState } from "react";
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
    <div className="w-full">
      <div className="bg-white rounded shadow px-4 mt-3">
        <h1 className="pt-4 pb-5 font-bold text-2xl">
          {tabSelected === "deposit" ? "Depositing to " : "Withdrawing from "}{" "}
          <span className="font-semibold">{communityAddress}</span>
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
