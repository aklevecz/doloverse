import { NextApiRequest, NextApiResponse } from "next";
import { HOST } from "../../../constants";

import DoloverseDb from "../../../lib/doloverseDb";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { tokenId } = req.query;
  const dolodb = new DoloverseDb();
  const cleanTokenId = (tokenId as string).replace(".json", "");
  let ticket = await dolodb.queryTicketByTString(cleanTokenId as string);
  if (!ticket) {
    ticket = await dolodb.queryTicketByTokenId(parseInt(cleanTokenId));
  }
  if (ticket) {
    if (!ticket.hatched) {
      ticket.name = `Doloverse Ticket ${cleanTokenId}`;
      ticket.description = `This is your ticket to Doloverse. Once it is checked in at the festival grounds it will take a new form.`;
      ticket.image = `${HOST}/bw-bao.png`;
    } else {
      ticket.name = `Doloverse Transformed Ticket ${cleanTokenId}`;
      ticket.description = `This is your ticket to Doloverse. You are checked in and ready to enjoy the show!`;
      ticket.image = `${HOST}/roll_vid.mp4`;
      ticket.animation_url = `${HOST}/roll.mp4`;
    }

    console.log(ticket);
    res.json(ticket);
  }
  res.status(404).end();
};
