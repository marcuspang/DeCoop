import { useAccount, useBalance } from "@web3modal/react";
import axios from "axios";
import { useEffect, useState } from "react";
import FundCard from "../../components/Fund/FundCard";

const ProfilePage = () => {
  const { address } = useAccount();
  const { data: balanceData } = useBalance({
    addressOrName: address,
  });

  return (
    <div className="w-full px-4">
      <div className="flex space-x-2">
        <FundCard
          amount={+balanceData?.formatted.slice(0, 6) || 0}
          symbol={balanceData?.symbol}
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
      <FundCard title="Credit Score" amount="100" symbol="">
        
      </FundCard>
    </div>
  );
};
export default ProfilePage;
