import { useAccount } from "@web3modal/react";
import error from "next/error";
import { FormEventHandler, useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import useCommunity from "../../hooks/useCommunity";
import useDeposit from "../../hooks/useDeposit";
import useWithdraw from "../../hooks/useWithdraw";

const abi = [
  // Read-Only Functions
  "function balanceOf(address owner) view returns (uint256)",
  "function decimals() view returns (uint8)",
  "function symbol() view returns (string)",

  // Authenticated Functions
  "function transfer(address to, uint amount) returns (bool)",

  // Events
  "event Transfer(address indexed from, address indexed to, uint amount)",
];

interface TradeFormProps {
  communityAddress: string;
  tabSelected: "withdraw" | "deposit";
}

const TradeForm = ({ communityAddress, tabSelected }: TradeFormProps) => {
  const tokenAmountRef = useRef<HTMLInputElement>(null);
  const tokenAddressRef = useRef<HTMLInputElement>(null);
  const [isDepositing, setIsDepositing] = useState(false);
  const [isWithdrawing, setIsWithdrawing] = useState(false);

  const { address: walletAddress } = useAccount();
  const { data } = useCommunity(communityAddress);
  const {
    deposit,
    error: depositError,
    isWaiting: depositIsWaiting,
    receipt: depositReceipt,
  } = useDeposit(communityAddress);
  const {
    withdraw,
    error: withdrawError,
    isWaiting: withdrawIsWaiting,
    receipt: withdrawReceipt,
  } = useWithdraw(communityAddress);

  useEffect(() => {
    if (depositReceipt && !depositIsWaiting && isDepositing) {
      toast("Successfully deposited");
      setIsDepositing(false);
    }
  }, [depositReceipt, depositIsWaiting, isDepositing]);

  useEffect(() => {
    if (withdrawReceipt && !withdrawIsWaiting && isWithdrawing) {
      toast("Successfully withdrawn");
      setIsWithdrawing(false);
    }
  }, [isWithdrawing, withdrawIsWaiting, withdrawReceipt]);

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    if (tabSelected === "deposit") {
      const response = await deposit(+tokenAmountRef.current.value);
      if (response) {
        toast(
          `Deposit executed! See your transaction here https://goerli.etherscan.io/tx/${response.hash}`
        );
      }
      setIsDepositing(true);
    } else {
      const response = await withdraw(+tokenAmountRef.current.value);
      if (response) {
        toast(
          `Withdraw executed! See your transaction here https://goerli.etherscan.io/tx/${response.hash}`
        );
      }
      setIsWithdrawing(true);
    }

    if (depositError || withdrawError) {
      console.log(depositError || withdrawError);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-6">
        <label
          htmlFor="amount"
          className="block mb-2 text-lg font-semibold text-gray-900 dark:text-gray-300"
        >
          Amount (in {data?.tokenSymbol})
        </label>
        <input
          type="text"
          id="amount"
          inputMode="decimal"
          placeholder="0.0"
          minLength={1}
          pattern="^[0-9]*[.,]?[0-9]*$"
          ref={tokenAmountRef}
          className="block p-4 w-full text-gray-900 bg-gray-50 rounded-lg border border-gray-300 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
      </div>
      <div className="mb-6">
        <label
          htmlFor="amount"
          className="block mb-2 text-lg font-semibold text-gray-900 dark:text-gray-300"
        >
          Community Fund Address
        </label>
        <input
          type="text"
          ref={tokenAddressRef}
          defaultValue={data?.tokenAddress}
          className="block p-4 w-full text-gray-900 bg-gray-50 rounded-lg border border-gray-300 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
      </div>

      <div className="mb-6">
        <label
          htmlFor="wallet"
          className="block mb-2 text-lg font-semibold text-gray-900 dark:text-gray-300"
        >
          Selected Wallet
        </label>
        <input
          type="text"
          id="wallet"
          defaultValue={walletAddress}
          className="block p-4 w-full text-gray-900 bg-gray-50 rounded-lg border border-gray-300 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
      </div>
      <div className="w-full text-center pb-4">
        <button
          className="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-green-400 to-blue-600 group-hover:from-green-400 group-hover:to-blue-600 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 text-lg"
          type="submit"
        >
          <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
            {tabSelected.charAt(0).toUpperCase() + tabSelected.slice(1)}
          </span>
        </button>
      </div>
    </form>
  );
};

export default TradeForm;
