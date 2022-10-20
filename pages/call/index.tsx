import {
  useAccount,
  useNetwork,
  useSendTransaction,
  useWaitForTransaction,
  useFeeData,
} from "@web3modal/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import ToastMessage from "../../components/Layout/ToastMessage";

const ExternalCallPage = () => {
  const [isExecuting, setIsExecuting] = useState(false);
  const [hasPrintedError, setHasPrintedError] = useState(false);

  const {
    query: { to, calldata },
  } = useRouter();
  const { address } = useAccount();
  const { chain } = useNetwork();
  const feeData  = useFeeData();
  const { sendTransaction, error, data } = useSendTransaction({
    chainId: chain?.id || 5,
    request: {
      from: address,
      to: to?.toString() || "",
      data: calldata?.toString() || "",
    },
  });
  const { receipt, isWaiting } = useWaitForTransaction({
    hash: data?.hash,
  });

  useEffect(() => {
    if (to && calldata && chain && !feeData.isLoading) {
      sendTransaction({
        chainId: chain.id,
        request: {
          from: address,
          to: to.toString(),
          data: calldata.toString(),
          gasPrice: feeData.data.gasPrice, 
        },
      }).then((res) => {
        if (res) {
          toast(
            <ToastMessage title="Creation executed!">
              See your transaction{" "}
              <a
                href={`https://${chain.network || "goerli"}.etherscan.io/tx/${
                  res.hash
                }`}
                target="_blank"
                rel="noreferrer"
                className="link"
              >
                here
              </a>
            </ToastMessage>
          );
          setIsExecuting(true);
        }
      });
    }
  }, [to, calldata, address, feeData.isLoading]);

  useEffect(() => {
    if (receipt && !isWaiting && isExecuting) {
      toast(<ToastMessage title="Transaction executed" />);
      setIsExecuting(false);
    }
  }, [isExecuting, isWaiting, receipt]);

  useEffect(() => {
    if (error && !hasPrintedError) {
      toast(
        <ToastMessage title="An error occured (see console for more details)">
          <p className="break-all">
            {error.message.substring(0, 300) +
              (error.message.length > 300 ? "..." : "")}
          </p>
        </ToastMessage>
      );
      setHasPrintedError(true);
      console.log(error);
    }
  }, [error]);

  if (!address) {
    return (
      <div className="w-full lg:pl-0 px-4">
        <h1 className="font-bold text-2xl pt-4">Please connect your wallet</h1>
      </div>
    );
  }

  return (
    <div className="w-full lg:pl-0 px-4">
      <h1 className="font-bold text-2xl pt-4 break-all">
        Executing transaction to <code>{to?.toString()}</code> with calldata{" "}
        <code>{calldata?.toString() || ""}</code>...
      </h1>
    </div>
  );
};

export default ExternalCallPage;
