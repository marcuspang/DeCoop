import {useRouter} from "next/router";
import {useAccount, useSendTransaction} from "@web3modal/react";
import {useEffect} from "react";

function Page() {
  const router = useRouter();
  const {address} = useAccount();

  const { sendTransaction } = useSendTransaction({
    chainId: 5,
    request: {
      to: router.query['to'] as string,
      data: router.query['calldata'] as string,
    }
  });

  useEffect(() => {
      try { 
          sendTransaction();
      } catch (e) {
          console.log(e);
      }
      console.log('hmm');
  }, [address]);

  return (
    <>
    {
      address == "" ?
      <div> Please connect your wallet </div>
      :
      <div>
        Sending Transaction to {router.query['to']} with calldata {router.query['calldata']}
      </div>
    }
    </>
  );
}

export default Page;
