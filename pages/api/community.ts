import { ethers } from "ethers";
import { NextApiRequest, NextApiResponse } from "next";
import { Community } from "./communities";

const communityAbi = [
  "function communityToken() view returns (address)",
  "function soulboundToken() view returns (address)",
  "function name() view returns (string memory)",
];
const balanceAbi = ["function balanceOf(address owner) view returns (uint256)"];

export async function getCommunity(community: string): Promise<Community> {
  const communityContract = new ethers.Contract(
    community,
    communityAbi,
    new ethers.providers.InfuraProvider("goerli", process.env.INFURA_API_KEY)
  );
  const erc20Contract = new ethers.Contract(
    communityContract.communityToken(),
    balanceAbi,
    new ethers.providers.InfuraProvider("goerli", process.env.INFURA_API_KEY)
  );
  const name = await communityContract.name();

  return {
    community,
    name,
    tokenAddress: await communityContract.communityToken(),
    tokenBalance: await erc20Contract.balanceOf(community),
    tokenSymbol: name + "-T",
  };
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    if (req.query.address === undefined || req.query.address === "") {
      return res.status(400).send("Invalid address");
    }
    try {
      const address = req.query.address.toString();
      const community = await getCommunity(address);
      return res.status(200).send(community);
    } catch (error) {
      return res.status(400).send(error);
    }
  }
  return res.status(200).send({});
}
