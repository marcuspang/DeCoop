import { NextApiRequest, NextApiResponse } from "next";
import { getCommunitiesForPerson } from "./communities";
import { getEvents } from "./events";

// Generate credit score based on wallet address
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const communityFactory: string = process.env.COMMUNITY_FACTORY;
  const address: string = req.body["address"];

  const communities = await getCommunitiesForPerson(communityFactory, address);

  let depositSum = 0;
  let withdrawSum = 0;

  for (const community of communities) {
    const { deposits, withdrawals } = await getEvents(
      community.community,
      address
    );

    depositSum += deposits
      .map((deposit) => deposit.value)
      .reduce((x, y) => x.add(y));
    withdrawSum += withdrawals
      .map((withdrawal) => withdrawal.value)
      .reduce((x, y) => x.add(y));
  }

  const creditScore = Math.min(depositSum, withdrawSum);

  res.status(200).send({ creditScore });
}
