import {
  useAccount,
  useContractWrite,
  useNetwork,
  useWaitForTransaction,
} from "@web3modal/react";
import { toast } from "react-toastify";
import ToastMessage from "../components/Layout/ToastMessage";
import { COMMUNITY_FACTORY_ADDRESS } from "../pages/api/communities";

const abi = ["function create(string memory name) external returns (address)"];

const useCreateCommunity = () => {
  const { status } = useAccount();
  const { chain } = useNetwork();
  const {
    error,
    write,
    data: writeData,
  } = useContractWrite({
    addressOrName: COMMUNITY_FACTORY_ADDRESS,
    contractInterface: abi,
    functionName: "create",
  });
  const { receipt, isWaiting } = useWaitForTransaction({
    hash: writeData?.hash,
  });

  // amount in 8 decimals
  const create = (name: string) => {
    if (status === "disconnected") {
      toast(<ToastMessage title="Please sign in to your wallet" />);
      return;
    }
    return write({
      addressOrName: COMMUNITY_FACTORY_ADDRESS,
      contractInterface: abi,
      functionName: "create",
      args: [name],
      chainId: chain.id,
    });
  };

  return { create, error, receipt, isWaiting };
};

export default useCreateCommunity;
