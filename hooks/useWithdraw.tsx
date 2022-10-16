import {
  useAccount,
  useContractWrite,
  useNetwork,
  useWaitForTransaction,
} from "@web3modal/react";
import { toast } from "react-toastify";
import ToastMessage from "../components/Layout/ToastMessage";
import useCommunity from "./useCommunity";

const abi = ["function withdraw(uint256 amount) external"];

const useWithdraw = (communityAddress: string) => {
  const { status } = useAccount();
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

  // amount in 8 decimals
  const withdraw = (amount: number) => {
    if (status === "disconnected") {
      toast(<ToastMessage title="Please sign in to your wallet" />);
      return;
    }
    return write({
      addressOrName: data.address,
      contractInterface: abi,
      functionName: "withdraw",
      args: [amount * 10 ** 8],
      chainId: chain.id,
    });
  };

  return { withdraw, error, receipt, isWaiting };
};

export default useWithdraw;
