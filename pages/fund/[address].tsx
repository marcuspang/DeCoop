import {
  ArrowDownTrayIcon,
  ArrowsRightLeftIcon,
} from "@heroicons/react/20/solid";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";
import FundCard from "../../components/Fund/FundCard";
import FundCreditScores from "../../components/Fund/FundCreditScores";
import FundDistributionChart from "../../components/Fund/FundDistributionChart";
import FundTransactionChart from "../../components/Fund/FundTransactionChart";
import FundTransactionTable from "../../components/Fund/FundTransactionTable";

const data: FundContribution[] = [
  { name: "Adithya", value: 2400 },
  { name: "Marcus", value: 4567 },
  { name: "Colin", value: 1398 },
  { name: "Yong Kang", value: 9800 },
  { name: "Kasshif", value: 3908 },
];

export interface FundContribution {
  name: string;
  value: number;
}

const ViewFundPage = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [address, setAddress] = useState("default");
  const [name, setName] = useState("TOKEN");
  const [balance, setBalance] = useState("0");

  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    if (router.query && router.query.address) {
      setAddress(router.query.address.toString());
      setName(router.query.name.toString() + "-T");
      setBalance(router.query.balance.toString());

      axios
        .post("/api/events", { community: router.query.address.toString() })
        .then((res) => {
          setTransactions(res.data);
          setIsLoading(false);
        });
    }
  }, [router.query]);

  const truncate = (fullStr, strLen) => {
    if (fullStr.length <= strLen) return fullStr;
    const separator = "...";

    var sepLen = separator.length,
      charsToShow = strLen - sepLen,
      frontChars = Math.ceil(charsToShow / 2),
      backChars = Math.floor(charsToShow / 2);

    return (
      fullStr.substr(0, frontChars) +
      separator +
      fullStr.substr(fullStr.length - backChars)
    );
  };

  return (
    <div className="w-full px-4">
      <div className="flex justify-end">
        <Link href={"/trade/" + address} passHref>
          <a className="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 transition-all cursor-pointer">
            <ArrowsRightLeftIcon
              width={18}
              height={18}
              className="inline mr-2 mb-1"
            />
            Withdraw/Deposit
          </a>
        </Link>
      </div>
      <div className="flex flex-wrap lg:flex-nowrap justify-between space-x-2">
        <FundCard symbol={name} title="Current Balance" amount={balance} />
        <FundCard
          title="Latest Deposit"
          symbol={name}
          amount={
            isLoading
              ? "-"
              : transactions.deposits[transactions.deposits.length - 1].value
          }
          description={
            isLoading
              ? "-"
              : "By " +
                truncate(transactions.deposits[transactions.deposits.length - 1]
                  .address, 12) +
                ", 9 October 2022"
          }
        />
        <FundCard
          title="Latest Withdrawal"
          symbol={name}
          amount={
            isLoading
              ? "-"
              : transactions.withdrawals[transactions.withdrawals.length - 1]
                  .value
          }
          description={
            isLoading
              ? "-"
              : "By " +
                truncate(transactions.withdrawals[transactions.withdrawals.length - 1]
                  .address, 12) +
                ", 9 October 2022"
          }
        />
      </div>
      <div className="flex flex-wrap lg:flex-nowrap justify-between space-x-2">
        <FundCard title="All Contributors">
          <FundDistributionChart data={(() => {
            if (transactions && transactions.deposits) {
              const dict = {};
              for (const deposit of transactions.deposits) {
                if (!dict[deposit.address]) dict[deposit.address] = 0;
                dict[deposit.address] += deposit.value;
              }

              for (const withdrawal of transactions.withdrawals) {
                if (!dict[withdrawal.address]) dict[withdrawal.address] = 0;
                dict[withdrawal.address] -= withdrawal.value;
              }

              let dist: FundContribution[] = [];

              for (const address in dict) {
                  dist.push({
                    name: truncate(address, 12),
                    value: dict[address],
                  });
              }

              return dist;

            }
            return [];
          })()} />
        </FundCard>
        <FundCard title="Contribution Credit Scores">
          <FundCreditScores data={data} />
        </FundCard>
      </div>
      <FundCard title="Transactions over time">
        <FundTransactionChart />
      </FundCard>
      <FundCard>
        <div className="flex justify-between items-center">
          <h3 className="font-bold text-xl">All Transactions</h3>
          <button className="rounded border-2 p-2 border-gray-300 transition-all hover:bg-gray-100 hover:border-gray-400 focus:border-blue-600">
            Download Full Report{" "}
            <ArrowDownTrayIcon className="inline mb-1" width={16} height={16} />
          </button>
        </div>
      </FundCard>
      <div className="ml-2">
        <FundTransactionTable data={(() => {
          if (transactions && transactions.deposits) {
            let ret = [];

            for (const deposit of transactions.deposits) {
                ret.push({
                  address: deposit.address,
                  date: new Date(),
                  method: "Deposit",
                  amount: deposit.value,
                  actionBy: (
                    <a
                      href="#"
                      className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                    >
                      Edit
                    </a>
                  ),
                });
            }

            for (const deposit of transactions.withdrawals) {
                ret.push({
                  address: deposit.address,
                  date: new Date(),
                  method: "Withdrawal",
                  amount: deposit.value,
                  actionBy: (
                    <a
                      href="#"
                      className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                    >
                      Edit
                    </a>
                  ),
                });
            }

            console.log(ret);

            return ret;
          }
          return [];
        })()}/>
      </div>
    </div>
  );
};

export default ViewFundPage;
