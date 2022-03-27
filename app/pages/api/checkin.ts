import { NextApiRequest, NextApiResponse } from "next";
import CookieService from "../../lib/cookie";
import Iron from "@hapi/iron";
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
    const ticket = await doloverseDb.queryTicketByUser(user.publicAddress);
    if (ticket) {
      if (!ticket.hatched) {
        doloverseDb.updateTicket(ticket.tokenId, true);
      }
    } else {
    }
  } catch (error) {
    res.status(401).end();
  }
  res.end();
};
