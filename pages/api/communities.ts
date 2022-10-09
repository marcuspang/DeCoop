import { ethers } from "ethers";
import { NextApiRequest, NextApiResponse } from "next";

const communityAbi = [
  "function lastIndex() view returns (uint256)",
  "function communities(uint256 index) view returns (address)",
];

export async function getCommunities(communityFactory: string): Promise<string[]> {
  const communityFactoryContract = new ethers.Contract(
    communityFactory,
    communityAbi,
    new ethers.providers.InfuraProvider("goerli", process.env.INFURA_API_KEY)
  );

  let index = await communityFactoryContract.lastIndex(); 

  let communities = [];
  for (let i = 0; i < index; i++) {
      communities.push(await communityFactoryContract.communities(i));
  }

  return communities; 
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const community: string = req.body["community"];
  const address: string = req.body["address"] || null;

  res.status(200).send(await getEvents(community, address)); 
}
