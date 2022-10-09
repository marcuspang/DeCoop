import { ethers } from "ethers";
import { NextApiRequest, NextApiResponse } from "next";

// Generate credit score based on wallet address
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const creditScore = 0;
  res.status(200).send({ creditScore });
}
