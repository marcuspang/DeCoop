import { ethers } from "ethers";
import { NextApiRequest, NextApiResponse } from "next";

const abi = [
  "event Withdraw(address indexed to, uint256 amount)",
  "event Deposit(address indexed from, uint256 amount)",
];

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const community: string = req.body["community"];
  const address: string = req.body["address"] || null;

  const communityContract = new ethers.Contract(
    community,
    abi,
    new ethers.providers.InfuraProvider("goerli", process.env.INFURA_API_KEY)
  );

  const deposits = await communityContract.queryFilter(
    communityContract.filters.Deposit(address)
  );
  const withdraws = await communityContract.queryFilter(
    communityContract.filters.Withdraw(address)
  );

  res.status(200).send({ deposits, withdraws });
}
