import {
  useAccount,
  useNetwork,
  useSendTransaction,
  useWaitForTransaction,
} from "@web3modal/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import ToastMessage from "../../components/Layout/ToastMessage";

const ExternalCallPage = () => {
  const [isExecuting, setIsExecuting] = useState(false);

  const {
    query: { to, calldata },
  } = useRouter();
  const { address } = useAccount();
  const { chain } = useNetwork();
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
    if (to && calldata && chain) {
      sendTransaction({
        chainId: chain.id,
        request: {
          from: address,
          to: to.toString(),
          data: calldata.toString(),
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
  }, [to, calldata, address]);

  useEffect(() => {
    if (receipt && !isWaiting && isExecuting) {
      toast(<ToastMessage title="Transaction executed" />);
      setIsExecuting(false);
    }
  }, [isExecuting, isWaiting, receipt]);

  useEffect(() => {
    if (error) {
      toast(
        <ToastMessage title="An error occured">
          <p>{error.message}</p>
        </ToastMessage>
      );
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
      <h1 className="font-bold text-2xl pt-4">
        Executing transaction to <code>{to?.toString()}</code> with calldata{" "}
        <code>{calldata?.toString() || ""}</code>...
      </h1>
    </div>
  );
};

export default ExternalCallPage;
