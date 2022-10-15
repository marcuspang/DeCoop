import { useRouter } from "next/router";
import { useAccount, useSendTransaction } from "@web3modal/react";
import { useEffect } from "react";
import error from "next/error";

function Page() {
  const router = useRouter();
  const { address } = useAccount();

  const { sendTransaction, error } = useSendTransaction({
    chainId: 5,
    request: {
      from: address,
      to: router.query["to"] as string,
      data: router.query["calldata"] as string,
    },
  });

  useEffect(() => {
    if (router.query.to && router.query.calldata) {
      sendTransaction({
        chainId: 5,
        request: {
          from: address,
          to: router.query["to"] as string,
          data: router.query["calldata"] as string,
        },
      }).then((res) => console.log({ res, error }));
    }
  }, [router.query, address]);

  return (
    <div className="w-full lg:px-0 px-4">
      {address == "" ? (
        <div> Please connect your wallet </div>
      ) : (
        <div>
          Executing transaction to {router.query["to"]} with calldata
          {" " + router.query["calldata"] || ""}...
        </div>
      )}
    </div>
  );
}

export default Page;
