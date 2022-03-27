import { NextApiRequest, NextApiResponse } from "next";
import CookieService from "../../lib/cookie";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  CookieService.clearAuthCookies(res);
  res.end();
};
