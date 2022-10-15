import { useBalance } from "@web3modal/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import FundCard from "../../components/Fund/FundCard";
import useCreditScore from "../../hooks/useCreditScore";

const ProfilePage = () => {
  const router = useRouter();
  const [address, setAddress] = useState("");

  const { data: balanceData, isLoading: balanceIsLoading } = useBalance({
    addressOrName: address,
  });
  const { data, error, isLoading } = useCreditScore(address);

  useEffect(() => {
    if (router.query && router.query.address) {
      setAddress(router.query.address.toString());
    }
  }, [router.query]);

  return (
    <div className="w-full">
      <div className="flex space-x-2">
        <FundCard
          amount={+balanceData?.formatted.slice(0, 6) || 0}
          symbol={balanceData?.symbol}
          isLoading={balanceIsLoading}
          title="Wallet Balance"
        />
        <FundCard
          amount={0}
          title="Total Deposits"
          description="5 October 2022"
        />
        <FundCard
          amount={0}
          title="Total Withdrawals"
          description="4 October 2022"
        />
      </div>
      <FundCard
        title="Credit Score"
        amount={data?.creditScore.toFixed(8)}
        symbol=""
        isLoading={isLoading}
      ></FundCard>
    </div>
  );
};
export default ProfilePage;
