import { useAccount, useNetwork } from "@web3modal/react";
import { FormEventHandler, useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import useCommunity from "../../hooks/useCommunity";
import useDeposit from "../../hooks/useDeposit";
import useWithdraw from "../../hooks/useWithdraw";
import FancyButton from "../Layout/FancyButton";
import ToastMessage from "../Layout/ToastMessage";

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

  const { chain } = useNetwork();
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
      toast(<ToastMessage title="Successfully deposited" />);
      setIsDepositing(false);
    }
  }, [depositReceipt, depositIsWaiting, isDepositing]);

  useEffect(() => {
    if (withdrawReceipt && !withdrawIsWaiting && isWithdrawing) {
      toast(<ToastMessage title="Successfully withdrawn" />);
      setIsWithdrawing(false);
    }
  }, [isWithdrawing, withdrawIsWaiting, withdrawReceipt]);

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    if (tabSelected === "deposit") {
      const response = await deposit(+tokenAmountRef.current.value);
      if (response) {
        toast(
          <ToastMessage title="Deposit executed!">
            <div>
              See your transaction{" "}
              <a
                href={`https://${chain.network || "goerli"}.etherscan.io/tx/${
                  response.hash
                }`}
                className="link"
                target={"_blank"}
                rel="noreferrer"
              >
                here
              </a>
            </div>
          </ToastMessage>
        );
        setIsDepositing(true);
      }
    } else {
      const response = await withdraw(+tokenAmountRef.current.value);
      if (response) {
        toast(
          <ToastMessage title="Withdrawal executed!">
            <div>
              See your transaction{" "}
              <a
                href={`https://${chain.network || "goerli"}.etherscan.io/tx/${
                  response.hash
                }`}
                className="link"
                target={"_blank"}
                rel="noreferrer"
              >
                here
              </a>
            </div>
          </ToastMessage>
        );
        setIsWithdrawing(true);
      }
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
          disabled
          className="block p-4 w-full text-gray-500 bg-gray-50 rounded-lg border border-gray-300 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
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
      <div className="w-full text-center">
        <FancyButton submit>
          {tabSelected.charAt(0).toUpperCase() + tabSelected.slice(1)}
        </FancyButton>
      </div>
    </form>
  );
};

export default TradeForm;
