import { ArrowTopRightOnSquareIcon } from "@heroicons/react/20/solid";
import { useNetwork } from "@web3modal/react";
import Link from "next/link";
import { useState } from "react";
import Pagination from "../Layout/Pagination";

const transactions = [
  {
    address: "0xE269cf4647c3BE31E4e99ADeD398aA164BdFa0aC",
    date: new Date(),
    method: "Buy",
    amount: "Any amount",
    actionBy: (
      <a
        href="#"
        className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
      >
        Edit
      </a>
    ),
  },
  {
    address: "0xE269cf4647c3BE31E4e99ADeD398aA164BdFa0aC",
    date: new Date(),
    method: "Buy",
    amount: "Any amount",
    actionBy: (
      <a
        href="#"
        className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
      >
        Edit
      </a>
    ),
  },
  {
    address: "0xE269cf4647c3BE31E4e99ADeD398aA164BdFa0aC",
    date: new Date(),
    method: "Buy",
    amount: "Any amount",
    actionBy: (
      <a
        href="#"
        className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
      >
        Edit
      </a>
    ),
  },
  {
    address: "0xE269cf4647c3BE31E4e99ADeD398aA164BdFa0aC",
    date: new Date(),
    method: "Buy",
    amount: "Any amount",
    actionBy: (
      <a
        href="#"
        className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
      >
        Edit
      </a>
    ),
  },
  {
    address: "0xE269cf4647c3BE31E4e99ADeD398aA164BdFa0aC",
    date: new Date(),
    method: "Buy",
    amount: "Any amount",
    actionBy: (
      <a
        href="#"
        className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
      >
        Edit
      </a>
    ),
  },
  {
    address: "0xE269cf4647c3BE31E4e99ADeD398aA164BdFa0aC",
    date: new Date(),
    method: "Buy",
    amount: "Any amount",
    actionBy: (
      <a
        href="#"
        className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
      >
        Edit
      </a>
    ),
  },
  {
    address: "0xE269cf4647c3BE31E4e99ADeD398aA164BdFa0aC",
    date: new Date(),
    method: "Buy",
    amount: "Any amount",
    actionBy: (
      <a
        href="#"
        className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
      >
        Edit
      </a>
    ),
  },
  {
    address: "0xE269cf4647c3BE31E4e99ADeD398aA164BdFa0aC",
    date: new Date(),
    method: "Buy",
    amount: "Any amount",
    actionBy: (
      <a
        href="#"
        className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
      >
        Edit
      </a>
    ),
  },
  {
    address: "0xE269cf4647c3BE31E4e99ADeD398aA164BdFa0aC",
    date: new Date(),
    method: "Buy",
    amount: "Any amount",
    actionBy: (
      <a
        href="#"
        className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
      >
        Edit
      </a>
    ),
  },
  {
    address: "0xE269cf4647c3BE31E4e99ADeD398aA164BdFa0aC",
    date: new Date(),
    method: "Buy",
    amount: "Any amount",
    actionBy: (
      <a
        href="#"
        className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
      >
        Edit
      </a>
    ),
  },
  {
    address: "0xE269cf4647c3BE31E4e99ADeD398aA164BdFa0aC",
    date: new Date(),
    method: "Buy",
    amount: "Any amount",
    actionBy: (
      <a
        href="#"
        className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
      >
        Edit
      </a>
    ),
  },
];

const PAGE_SIZE = 3;

const FundTransactionTable = ({ data }) => {
  const [pageIndex, setPageIndex] = useState(0);
  const PAGE_COUNT = Math.ceil(transactions.length / PAGE_SIZE);

  return (
    <>
      <div className="overflow-x-auto relative shadow sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 ">
          <thead className="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="py-3 px-6">
                Account
              </th>
              <th scope="col" className="py-3 px-6">
                Date
              </th>
              <th scope="col" className="py-3 px-6">
                Method
              </th>
              <th scope="col" className="py-3 px-6">
                Amount
              </th>
            </tr>
          </thead>
          <tbody>
            {data
              ? data
                  .slice(pageIndex * PAGE_SIZE, (pageIndex + 1) * PAGE_SIZE)
                  .map((transaction, index) => (
                    <tr
                      className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                      // key={transaction.address}
                      key={index}
                    >
                      <th
                        scope="row"
                        className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                      >
                        <Link
                          href={
                            "https://etherscan.io/tx/" + transaction.address
                          }
                          passHref
                        >
                          <a className="text-blue-600 dark:text-blue-500 hover:underline">
                            {transaction.address}
                            <ArrowTopRightOnSquareIcon
                              height={16}
                              width={16}
                              className="inline-block ml-1 mb-1"
                            />
                          </a>
                        </Link>
                      </th>
                      <td className="py-4 px-6">09/10/2022</td>
                      <td className="py-4 px-6">{transaction.method}</td>
                      <td className="py-4 px-6">{transaction.amount}</td>
                    </tr>
                  ))
              : ""}
          </tbody>
        </table>
      </div>
      <Pagination
        data={transactions}
        pageCount={PAGE_COUNT}
        pageIndex={pageIndex}
        setPageIndex={setPageIndex}
        pageSize={PAGE_SIZE}
      />
    </>
  );
};

export default FundTransactionTable;
