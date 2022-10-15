import { ethers } from "ethers";
import { NextApiRequest, NextApiResponse } from "next";
import createErrorResponse from "../../utils/createErrorResponse";

const abi = [
  "event Withdraw(address indexed to, uint256 amount)",
  "event Deposit(address indexed from, uint256 amount)",
];
export interface CommunityEvent {
  blockNumber: number;
  address: string;
  from: string;
  value: number;
}

export interface CommunityEvents {
  deposits: CommunityEvent[];
  withdrawals: CommunityEvent[];
}

// If walletAddress is null, events from all communities are retrieved
export async function getEvents(
  communityAddress: string,
  walletAddress: string | null
): Promise<CommunityEvents> {
  const communityContract = new ethers.Contract(
    communityAddress,
    abi,
    new ethers.providers.InfuraProvider("goerli", process.env.INFURA_API_KEY)
  );
  const depositEvents = await communityContract.queryFilter(
    communityContract.filters.Deposit(walletAddress)
  );
  const deposits = depositEvents.map((deposit) => ({
    blockNumber: deposit.blockNumber,
    address: deposit.transactionHash,
    from: deposit.args[0] as string,
    value: deposit.args[1].toString() / 100000000,
  }));

  const withdrawalEvents = await communityContract.queryFilter(
    communityContract.filters.Withdraw(walletAddress)
  );
  const withdrawals = withdrawalEvents.map((withdrawal) => ({
    blockNumber: withdrawal.blockNumber,
    address: withdrawal.transactionHash,
    from: withdrawal.args[0] as string,
    value: withdrawal.args[1].toString() / 100000000,
  }));

  return { deposits, withdrawals };
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    if (!req.query.community) {
      return res
        .status(400)
        .send(createErrorResponse("Invalid community address"));
    }
    const community = req.query.community.toString();
    const address = req.query.address?.toString() || null;

    if (community === "default") {
      return res.status(200).send({});
    }

    const events = await getEvents(community, address);
    return res.status(200).send(events);
  }
  return res.status(404).send({});
}
