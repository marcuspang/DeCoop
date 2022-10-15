import {
  useNetwork,
  useContractWrite,
  useWaitForTransaction,
} from "@web3modal/react";
import useCommunity from "./useCommunity";

const abi = ["function withdraw(uint256 amount) external"];

const useWithdraw = (communityAddress: string) => {
  const { data } = useCommunity(communityAddress);
  const { chain } = useNetwork();
  const {
    error,
    write,
    data: writeData,
  } = useContractWrite({
    addressOrName: communityAddress,
    contractInterface: abi,
    functionName: "withdraw",
  });
  const { receipt, isWaiting } = useWaitForTransaction({
    hash: writeData?.hash,
  });

  // amount in 10 ** 8
  const withdraw = (amount: number) => {
    return write({
      addressOrName: data.community,
      contractInterface: abi,
      functionName: "withdraw",
      args: [amount * 10 ** 8],
      chainId: chain.id,
    });
  };

  return { withdraw, error, receipt, isWaiting };
};

export default useWithdraw;
