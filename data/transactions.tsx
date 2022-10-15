import { FundTransactionRow } from "../components/Fund/FundTransactionTable";

const TODAY = new Date();
const YESTERDAY = new Date(TODAY.getTime() - 24 * 60 * 60 * 1000);

export const dummyTransactions: FundTransactionRow[] = [
  {
    address: "0xE269cf4647c3BE31E4e99ADeD398aA164BdFa0aC",
    date: YESTERDAY,
    method: "Deposit",
    value: 1,
    blockNumber: 7773376,
    from: "0x0E20DE1E1dFb07EA57898368710Bb926e67f8070",
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
    from: "0x0E20DE1E1dFb07EA57898368710Bb926e67f8070",
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
    date: YESTERDAY,
    method: "Deposit",
    value: 10,
    blockNumber: 7773376,
    from: "0x0E20DE1E1dFb07EA57898368710Bb926e67f8070",
  },
];
