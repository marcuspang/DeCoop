import { useRouter } from "next/router";
import { useAccount, useSendTransaction } from "@web3modal/react";
import { useEffect } from "react";

function Page() {
  const router = useRouter();
  const { address } = useAccount();

  const { sendTransaction } = useSendTransaction({
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
      }).then((res) => console.log({ res }));
    }
  }, [router.query, address]);

  return (
    <div className="w-full">
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
