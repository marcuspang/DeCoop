import { NextApiRequest, NextApiResponse } from "next";
import {getEvents} from "./events";

// Generate credit score based on wallet address
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const community: string = req.body["community"];
  const address: string = req.body["address"] || null;

  const { deposits, withdrawals } = await getEvents(community, address);

  const depositSum = deposits.map((deposit) => deposit.value).reduce((x, y) => x.add(y));
  const withdrawSum = withdrawals.map((withdrawal) => withdrawal.value).reduce((x, y) => x.add(y));

  const creditScore = Math.min(depositSum, withdrawSum);

  res.status(200).send({ creditScore });
}
