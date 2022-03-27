import Iron from "@hapi/iron";
import { NextApiRequest, NextApiResponse } from "next";
import CookieService from "../../lib/cookie";
import DoloverseDb from "../../lib/doloverseDb";
const doloverseDb = new DoloverseDb();
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

  if (req.method === "GET") {
    const { name } = req.query;
    const artist = await doloverseDb.getArtist(name as string);

    res.json(artist ?? { artist: null });
  }

  if (req.method === "POST") {
    const { name, description, links } = req.body;
    await doloverseDb.putArtist(name, description, links);

    res.end();
  }

  res.end();
};
