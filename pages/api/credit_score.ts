import { NextApiRequest, NextApiResponse } from "next";
import createErrorResponse from "../../utils/createErrorResponse";
import {
  COMMUNITY_FACTORY_ADDRESS,
  getCommunitiesForPerson,
} from "./communities";
import { getEvents } from "./events";

// Generate credit score based on wallet address
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
    const address = req.query.address.toString();

    const communities = await getCommunitiesForPerson(
      COMMUNITY_FACTORY_ADDRESS,
      address
    );

    let depositSum = 0;
    let withdrawSum = 0;

    for (const community of communities) {
      const { deposits, withdrawals } = await getEvents(community, address);

      depositSum += deposits
        .map((deposit) => deposit.value)
        .reduce((x, y) => x + y);
      withdrawSum += withdrawals
        .map((withdrawal) => withdrawal.value)
        .reduce((x, y) => x + y);
    }

    const creditScore = Math.min(depositSum, withdrawSum) / 100000000;
    return res.status(200).send({ creditScore });
  }
  return res.status(404).send({});
}
