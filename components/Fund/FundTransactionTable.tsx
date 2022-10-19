import { ArrowTopRightOnSquareIcon } from "@heroicons/react/20/solid";
import { useNetwork } from "@web3modal/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { dummyTransactions } from "../../data/transactions";
import { CommunityEvent } from "../../pages/api/events";
import truncateEthAddress from "../../utils/truncateEthAddress";
import Pagination from "../Layout/Pagination";

export interface FundTransactionRow extends CommunityEvent {
  date: Date;
  method: "Deposit" | "Withdrawal";
}

interface FundTransactionTableProps {
  data: FundTransactionRow[];
}

const PAGE_SIZE = 5; // no. of transactions in each page

const FundTransactionTable = ({ data }: FundTransactionTableProps) => {
  const router = useRouter();
  const { chain } = useNetwork();
  const [pageIndex, setPageIndex] = useState(0);
  const [rows, setRows] = useState<FundTransactionRow[]>([]);

  useEffect(() => {
    if (data && router.query && router.query.address !== "default") {
      setRows(data);
    } else if (router.query && router.query.address === "default") {
      setRows(dummyTransactions);
    }
  }, [data, router.query]);

  return (
    <>
      <div
        className={`overflow-x-auto relative shadow ${
          !data ? "sm:rounded-md" : "sm:rounded-b-md"
        }`}
      >
        <table className="w-full text-sm text-left text-gray-500 dark:text-slate-300">
          <thead className="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-slate-800 dark:text-slate-300">
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
              <th scope="col">View Tx</th>
            </tr>
          </thead>
          <tbody>
            {rows
              .slice(pageIndex * PAGE_SIZE, (pageIndex + 1) * PAGE_SIZE)
              .map((transaction, index) => (
                <tr
                  className="border-b element-background dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700"
                  key={index}
                >
                  <td
                    scope="row"
                    className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    <Link href={"/profile/" + transaction.from} passHref>
                      <a className="link">
                        {truncateEthAddress(transaction.from)}
                      </a>
                    </Link>
                  </td>
                  <td className="py-4 px-6">
                    {(transaction.date || new Date()).toLocaleDateString()}
                  </td>
                  <td
                    className={`py-4 px-6 font-bold ${
                      transaction.method === "Deposit"
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {transaction.method}
                  </td>
                  <td className="py-4 px-6">{transaction.value}</td>
                  <td className="text-left">
                    <Link
                      href={`https://${
                        chain?.network || "goerli"
                      }.etherscan.io/tx/${transaction.address}`}
                      passHref
                    >
                      <a className="link" target={"_blank"} rel="noreferrer">
                        <ArrowTopRightOnSquareIcon
                          height={16}
                          width={16}
                          className="inline-block ml-1 mb-1"
                        />
                      </a>
                    </Link>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      <Pagination
        data={rows}
        pageCount={Math.ceil(rows.length / PAGE_SIZE)}
        pageIndex={pageIndex}
        setPageIndex={setPageIndex}
        pageSize={PAGE_SIZE}
      />
    </>
  );
};

export default FundTransactionTable;
