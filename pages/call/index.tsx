import { useAccount, useNetwork, useSendTransaction } from "@web3modal/react";
import { useRouter } from "next/router";
import { useEffect } from "react";

const ExternalCallPage = () => {
  const {
    query: { to, calldata },
  } = useRouter();
  const { address } = useAccount();
  const { chain } = useNetwork();

  const { sendTransaction, error } = useSendTransaction({
    chainId: chain?.id || 5,
    request: {
      from: address,
      to: to?.toString() || "",
      data: calldata?.toString() || "",
    },
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
        console.log({ res, error });
      });
    }
  }, [to, calldata, address]);

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
