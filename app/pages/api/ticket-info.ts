import Iron from "@hapi/iron";
import { NextApiRequest, NextApiResponse } from "next";
import CookieService from "../../lib/cookie";
import DoloverseDb from "../../lib/doloverseDb";
const dolodb = new DoloverseDb();
export default async (req: NextApiRequest, res: NextApiResponse) => {
  let user;
  try {
    user = await Iron.unseal(
      CookieService.getAuthToken(req.cookies),
      process.env.ENCRYPTION_SECRET!,
      Iron.defaults
    );
  } catch (error) {
    res.status(401).end();
  }

  const count = await dolodb.getLastTokenId();

  res.json({ count });
};
