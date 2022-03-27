import Iron from "@hapi/iron";
import { NextApiRequest, NextApiResponse } from "next";
import CookieService from "../../lib/cookie";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  let user;
  try {
    user = await Iron.unseal(
      CookieService.getAuthToken(req.cookies),
      process.env.ENCRYPTION_SECRET!,
      Iron.defaults
    );
    console.log(user);
  } catch (error) {
    res.status(401).end();
  }

  res.json(user);
};
