import { useAccount, useNetwork } from "@web3modal/react";
import { FormEventHandler, useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import useCreateCommunity from "../../hooks/useCreateCommunity";
import FancyButton from "../Layout/FancyButton";
import ToastMessage from "../Layout/ToastMessage";

const NewFundForm = () => {
  const { address: walletAddress } = useAccount();
  const { chain } = useNetwork();
  const { create, error, receipt, isWaiting } = useCreateCommunity();

  const nameRef = useRef<HTMLInputElement>(null);
  const [isCreating, setIsCreating] = useState(false);

  useEffect(() => {
    if (receipt && !isWaiting && isCreating) {
      toast(<ToastMessage title="Successfully created!"></ToastMessage>);
      setIsCreating(false);
    }
  }, [isCreating, isWaiting, receipt]);

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    const response = await create(nameRef.current.value);
    if (response) {
      toast(
        <ToastMessage title="Creation executed!">
          See your transaction{" "}
          <a
            href={`https://${chain.network || "goerli"}.etherscan.io/tx/${
              response.hash
            }`}
            target="_blank"
            rel="noreferrer"
            className="link"
          >
            here
          </a>
        </ToastMessage>
      );
      setIsCreating(true);
    }
  };

  return (
    <form className="py-4" onSubmit={handleSubmit}>
      <div className="mb-6">
        <label
          htmlFor="name"
          className="block mb-2 text-lg font-semibold text-gray-900 dark:text-gray-300"
        >
          Name
        </label>
        <input
          type="text"
          id="name"
          ref={nameRef}
          minLength={1}
          maxLength={20}
          pattern="^[a-zA-Z\s0-9]{1,20}$"
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
      <div className="w-full text-center">
        <FancyButton submit>Create Community Fund</FancyButton>
      </div>
    </form>
  );
};

export default NewFundForm;
