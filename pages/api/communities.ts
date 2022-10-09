import { ethers } from "ethers";
import { NextApiRequest, NextApiResponse } from "next";

const communityFactoryAbi = [
  "function lastIndex() view returns (uint256)",
  "function communities(uint256 index) view returns (address)",
];
const communityAbi = [
  "function communityToken() view returns (address)",
  "function soulboundToken() view returns (address)",
  "function name() view returns (string memory)",
];
const balanceAbi = ["function balanceOf(address owner) view returns (uint256)"];

export async function getAllCommunities(
  communityFactory: string
): Promise<string[]> {
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

export interface Community {
  community: string;
  erc: string;

  name: string;
  fundBalance: number;
  ercName: string;
}

export async function getCommunitiesForPerson(
  communityFactory: string,
  address: string
): Promise<any[]> {
  let allCommunities = await getAllCommunities(communityFactory);

  let communities: Community[] = [];

  for (const community of allCommunities) {
    const communityContract = new ethers.Contract(
      community,
      communityAbi,
      new ethers.providers.InfuraProvider("goerli", process.env.INFURA_API_KEY)
    );

    const soulboundToken = await communityContract.soulboundToken();

    const soulboundContract = new ethers.Contract(
      soulboundToken,
      balanceAbi,
      new ethers.providers.InfuraProvider("goerli", process.env.INFURA_API_KEY)
    );

    if ((await soulboundContract.balanceOf(address)) > 0) {
      const erc20 = await communityContract.communityToken();

      const erc20Contract = new ethers.Contract(
        erc20,
        balanceAbi,
        new ethers.providers.InfuraProvider(
          "goerli",
          process.env.INFURA_API_KEY
        )
      );

      const name = await communityContract.name();

      communities.push({
        community,
        name,
        erc: erc20,
        fundBalance: (await erc20Contract.balanceOf(community)).toString(),
        ercName: name + "-T",
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

  res
    .status(200)
    .send(await getCommunitiesForPerson(communityFactory, address));
}
