import { ethers } from "ethers";
import { NextApiRequest, NextApiResponse } from "next";

const abi = [
  "event Withdraw(address indexed to, uint256 amount)",
  "event Deposit(address indexed from, uint256 amount)"
];

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
    const community: string = req.body['community'];
    const address: string = req.body['address'] || null;

    const communityContract = new ethers.Contract(community, abi);

    const deposits = communityContract.queryFilter(communityContract.filters.Deposit(address, null));
    const withdraws = communityContract.queryFilter(communityContract.filters.Withdraw(address, null));

    res.status(200).send({ deposits, withdraws });
}
