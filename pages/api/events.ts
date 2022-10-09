import { ethers } from "ethers";
import { NextApiRequest, NextApiResponse } from "next";

const abi = [
  "event Withdraw(address indexed to, uint256 amount)",
  "event Deposit(address indexed from, uint256 amount)",
];

export async function getEvents(community: string, address: string): Promise<{ deposits: any, withdrawals: any }> {
  const communityContract = new ethers.Contract(
    community,
    abi,
    new ethers.providers.InfuraProvider("goerli", process.env.INFURA_API_KEY)
  );

  let deposits: any[] = await communityContract.queryFilter(
    communityContract.filters.Deposit(address)
  );
  let withdrawals: any[]= await communityContract.queryFilter(
    communityContract.filters.Withdraw(address)
  );

  deposits = deposits.map((deposit) => {
      return {
          address: deposit.args[0],
          value: deposit.args[1].toString(),
      }
  });

  withdrawals = withdrawals.map((withdrawal) => {
      return {
          address: withdrawal.args[0],
          value: withdrawal.args[1].toString(),
      }
  });

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
