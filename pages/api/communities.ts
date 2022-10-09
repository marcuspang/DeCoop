import { ethers } from "ethers";
import { NextApiRequest, NextApiResponse } from "next";

const communityFactoryAbi = [
  "function lastIndex() view returns (uint256)",
  "function communities(uint256 index) view returns (address)",
];
const communityAbi = [
  "function communityToken() view returns (address)",
  "function soulboundToken() view returns (address)",
];
const soulboundAbi = [
  "function balanceOf(address owner) view returns (uint256)",
];

export async function getAllCommunities(communityFactory: string): Promise<string[]> {
  const communityFactoryContract = new ethers.Contract(
    communityFactory,
    communityFactoryAbi,
    new ethers.providers.InfuraProvider("goerli", process.env.INFURA_API_KEY)
  );

  let index = await communityFactoryContract.lastIndex(); 

  let communities = [];
  for (let i = 0; i < index; i++) {
      communities.push(await communityFactoryContract.communities(i));
  }

  return communities; 
}

export async function getCommunitiesForPerson(communityFactory: string, address: string): Promise<any[]> {
  let allCommunities = await getAllCommunities(communityFactory);

  let communities = [];

  for (const community of allCommunities) {
      const communityContract = new ethers.Contract(
        community,
        communityAbi,
        new ethers.providers.InfuraProvider("goerli", process.env.INFURA_API_KEY)
      );

      const soulboundToken = await communityContract.soulboundToken();

      const soulboundContract = new ethers.Contract(
        soulboundToken,
        soulboundAbi,
        new ethers.providers.InfuraProvider("goerli", process.env.INFURA_API_KEY)
      );

      if (await soulboundContract.balanceOf(address) > 0) {
          communities.push({
              community,
              erc: await communityContract.communityToken(),
          });
      }
  }

  return communities;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const communityFactory: string = process.env.COMMUNITY_FACTORY; 
  const address: string = req.body["address"];

  res.status(200).send(await getCommunitiesForPerson(communityFactory, address)); 
}
