import { FundTransactionRow } from "../components/Fund/FundTransactionTable";
import events from "../pages/api/events";
import { FundContribution } from "../pages/fund/[address]";

const TODAY = new Date();
const YESTERDAY = new Date(TODAY.getTime() - 24 * 60 * 60 * 1000);
const DAY_BEFORE = new Date(YESTERDAY.getTime() - 24 * 60 * 60 * 1000);

export const dummyTransactions: FundTransactionRow[] = [
  {
    address: "0xE269cf4647c3BE31E4e99ADeD398aA164BdFa0aC",
    date: YESTERDAY,
    method: "Deposit",
    value: 1,
    blockNumber: 7773376,
    from: "0x7730B4Cdc1B1E7a33A309AB7205411faD009C106",
  },
  {
    address: "0xE269cf4647c3BE31E4e99ADeD398aA164BdFa0aC",
    date: TODAY,
    method: "Withdrawal",
    value: 10,
    blockNumber: 7773376,
    from: "0x0E20DE1E1dFb07EA57898368710Bb926e67f8070",
  },
  {
    address: "0xE269cf4647c3BE31E4e99ADeD398aA164BdFa0aC",
    date: YESTERDAY,
    method: "Deposit",
    value: 2,
    blockNumber: 7773376,
    from: "0x0E20DE1E1dFb07EA57898368710Bb926e67f8070",
  },
  {
    address: "0xE269cf4647c3BE31E4e99ADeD398aA164BdFa0aC",
    date: YESTERDAY,
    method: "Deposit",
    value: 3,
    blockNumber: 7773376,
    from: "0x7730B4Cdc1B1E7a33A309AB7205411faD009C106",
  },
  {
    address: "0xE269cf4647c3BE31E4e99ADeD398aA164BdFa0aC",
    date: TODAY,
    method: "Withdrawal",
    value: 3,
    blockNumber: 7773376,
    from: "0x0E20DE1E1dFb07EA57898368710Bb926e67f8070",
  },
  {
    address: "0xE269cf4647c3BE31E4e99ADeD398aA164BdFa0aC",
    date: YESTERDAY,
    method: "Deposit",
    value: 4,
    blockNumber: 7773376,
    from: "0x0E20DE1E1dFb07EA57898368710Bb926e67f8070",
  },
  {
    address: "0xE269cf4647c3BE31E4e99ADeD398aA164BdFa0aC",
    date: DAY_BEFORE,
    method: "Deposit",
    value: 10,
    blockNumber: 7773376,
    from: "0x0E20DE1E1dFb07EA57898368710Bb926e67f8070",
  },
];

const transformTransactionsData = (transactions: FundTransactionRow[]) => {
  let dist: FundContribution[] = [];
  const addressValueDict: Record<string, number> = {};

  transactions.forEach((transaction) => {
    if (!addressValueDict[transaction.from])
      addressValueDict[transaction.from] = 0;
    if (transaction.method === "Deposit") {
      addressValueDict[transaction.from] += transaction.value;
    } else {
      addressValueDict[transaction.from] -= transaction.value;
    }
  });

  for (const address in addressValueDict) {
    if (addressValueDict[address] >= 0) {
      dist.push({
        address,
        value: addressValueDict[address],
      });
    }
  }
  return dist;
};

export const dummyDistributions = transformTransactionsData(dummyTransactions);
