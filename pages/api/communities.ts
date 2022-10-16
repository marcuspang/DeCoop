import { ethers } from "ethers";
import { NextApiRequest, NextApiResponse } from "next";
import createErrorResponse from "../../utils/createErrorResponse";

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

export const COMMUNITY_FACTORY_ADDRESS: string = process.env.COMMUNITY_FACTORY;

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
  // addresses
  address: string;
  tokenAddress: string;
  // other data
  name: string;
  tokenBalance: ethers.BigNumber;
  tokenSymbol: string;
}

export async function getCommunitiesForPerson(
  communityFactory: string,
  address: string
) {
  let allCommunities = await getAllCommunities(communityFactory);

  let communities: Pick<Community, "address" | "name">[] = [];

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

    const hasJoinedCommunity = (await soulboundContract.balanceOf(address)) > 0;
    if (hasJoinedCommunity) {
      communities.push({
        address: community,
        name: (await communityContract.name()) as string,
      });
    }
  }

  return communities;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    if (req.query.address === undefined || req.query.address === "") {
      return res
        .status(400)
        .send(createErrorResponse("Invalid wallet address"));
    }
    try {
      const communities = await getCommunitiesForPerson(
        COMMUNITY_FACTORY_ADDRESS,
        req.query.address.toString()
      );

      return res.status(200).send(communities);
    } catch (error) {
      console.log(error);
      return res.status(400).send(error);
    }
  }
  return res.status(404).send({});
}
