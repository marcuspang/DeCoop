import { useAccount, useBalance } from "@web3modal/react";
import FundCard from "../../components/Fund/FundCard";

const ProfilePage = () => {
  const { address } = useAccount();
  const { data: balanceData } = useBalance({
    addressOrName: address,
  });

  return (
    <div className="w-full">
      <div className="flex">
        <FundCard
          amount={+balanceData?.formatted.slice(0, 6) || 0}
          symbol={balanceData?.symbol}
          title="Wallet Balance"
        />
        <FundCard
          amount={0}
          title="Your Last Deposit"
          description="5 October 2022"
        />
        <FundCard
          amount={0}
          title="Amount Borrowed"
          description="4 October 2022"
        />
      </div>
    </div>
  );
};
export default ProfilePage;
