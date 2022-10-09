import { ethers } from "ethers";
import { NextApiRequest, NextApiResponse } from "next";

const abi = [
  "event Withdraw(address indexed to, uint256 amount)",
  "event Deposit(address indexed from, uint256 amount)",
];

export async function getEvents(community: string, address: string) {
  const communityContract = new ethers.Contract(
    community,
    abi,
    new ethers.providers.InfuraProvider("goerli", process.env.INFURA_API_KEY)
  );

  const deposits = (
    await communityContract.queryFilter(
      communityContract.filters.Deposit(address)
    )
  ).map((deposit) => ({
    address: deposit.args[0],
    value: deposit.args[1].toString(),
  }));

  const withdrawals = (
    await communityContract.queryFilter(
      communityContract.filters.Withdraw(address)
    )
  ).map((withdrawal) => ({
    address: withdrawal.args[0],
    value: withdrawal.args[1].toString(),
  }));

  return { deposits, withdrawals };
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const community: string = req.body["community"];
  const address: string = req.body["address"] || null;

  res.status(200).send(await getEvents(community, address));
}
