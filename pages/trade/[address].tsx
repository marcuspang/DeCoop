import { useAccount, useContractWrite, useNetwork } from "@web3modal/react";
import axios from "axios";
import { useRouter } from "next/router";
import { FormEventHandler, useEffect, useRef, useState } from "react";
import { Community } from "../api/communities";

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

const TradePage = () => {
  const router = useRouter();
  const [fundAddress, setFundAddress] = useState("");
  const [tabSelected, setTabSelected] = useState<"withdraw" | "deposit">(
    "deposit"
  );
  const [community, setCommunity] = useState<Community>(null);
  const tokenAmountRef = useRef<HTMLInputElement>(null);
  const tokenAddressRef = useRef<HTMLInputElement>(null);

  const { chain } = useNetwork();
  const { address: walletAddress } = useAccount();
  const { error, write } = useContractWrite({
    addressOrName: fundAddress,
    contractInterface: abi,
    functionName: "transfer",
  });

  useEffect(() => {
    if (router.query && router.query.address) {
      setFundAddress(router.query.address.toString());
    }
  }, [router.query]);

  useEffect(() => {
    if (fundAddress !== "") {
      axios
        .post("/api/community", {
          community: fundAddress,
        })
        .then((res) => setCommunity(res.data));
    }
  }, [fundAddress]);

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    await write({
      addressOrName: community.erc,
      contractInterface: abi,
      functionName: "transfer",
      args: [fundAddress, +tokenAmountRef.current.value * 10 ** 8],
      chainId: chain.id,
    });
    if (error) {
      console.log(error);
    }
    router.push("/fund/" + fundAddress);
  };

  return (
    <div className="w-full px-4">
      <div className="mb-2">Depositing to {fundAddress}</div>
      <div className="sm:hidden">
        <select
          id="tabs"
          className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        >
          <option>Deposit</option>
          <option>Withdraw</option>
        </select>
      </div>
      <ul className="hidden text-sm font-medium text-center text-gray-500 rounded-lg divide-x divide-gray-200 shadow sm:flex dark:divide-gray-700 dark:text-gray-400 mb-8">
        <li className="w-full">
          <button
            className={`inline-block p-4 w-full  ${
              tabSelected === "deposit"
                ? "text-gray-900 bg-gray-100 rounded-l-lg focus:ring-4 focus:ring-blue-300 focus:outline-none dark:bg-gray-700 dark:text-white"
                : "bg-white hover:text-gray-700 hover:bg-gray-50 focus:ring-4 focus:ring-blue-300 focus:outline-none dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700"
            }`}
            onClick={() => setTabSelected("deposit")}
          >
            Deposit
          </button>
        </li>
        <li className="w-full">
          <button
            className={`inline-block p-4 w-full  ${
              tabSelected === "withdraw"
                ? "text-gray-900 bg-gray-100 rounded-l-lg focus:ring-4 focus:ring-blue-300 focus:outline-none dark:bg-gray-700 dark:text-white"
                : "bg-white hover:text-gray-700 hover:bg-gray-50 focus:ring-4 focus:ring-blue-300 focus:outline-none dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700"
            }`}
            onClick={() => setTabSelected("withdraw")}
          >
            Withdraw
          </button>
        </li>
      </ul>
      <form onSubmit={handleSubmit}>
        <div className="mb-6">
          <label
            htmlFor="amount"
            className="block mb-2 text-lg font-semibold text-gray-900 dark:text-gray-300"
          >
            Amount (in {community?.ercName})
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
            Community Token Address
          </label>
          <input
            type="text"
            ref={tokenAddressRef}
            defaultValue={community?.erc}
            className="block p-4 w-full text-gray-900 bg-gray-50 rounded-lg border border-gray-300 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>

        <div className="mb-6">
          <label
            htmlFor="wallet"
            className="block mb-2 text-lg font-semibold text-gray-900 dark:text-gray-300"
          >
            Wallet
          </label>
          <input
            type="text"
            id="wallet"
            defaultValue={walletAddress}
            className="block p-4 w-full text-gray-900 bg-gray-50 rounded-lg border border-gray-300 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>
        <div className="w-full text-center">
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
    </div>
  );
};

export default TradePage;
