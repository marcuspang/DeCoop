import { ethers } from "ethers";
import { NextApiRequest, NextApiResponse } from "next";

const communityAbi = [
  "function communityToken() view returns (address)",
  "function soulboundToken() view returns (address)",
  "function name() view returns (string memory)",
];
const balanceAbi = ["function balanceOf(address owner) view returns (uint256)"];

export async function getCommunity(community: string) {
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
    erc: await communityContract.communityToken(),
    fundBalance: (await erc20Contract.balanceOf(community)).toString(),
    ercName: name + "-T",
  };
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const community: string = req.body["community"];

  res.status(200).send(await getCommunity(community));
}
