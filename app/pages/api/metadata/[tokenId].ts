import { NextApiRequest, NextApiResponse } from "next";
import { HOST } from "../../../constants";

import DoloverseDb from "../../../lib/doloverseDb";
import ddb from "../../../lib/ddb";

const TICKET_TOKENID_MAX = 40;

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { tokenId } = req.query;
  const dolodb = new DoloverseDb();
  const cleanTokenId = (tokenId as string).replace(".json", "");
  const cleanTokenIdInt = parseInt(cleanTokenId);
  let ticket = await dolodb.queryTicketByTString(cleanTokenId as string);
  if (!ticket) {
    ticket = await dolodb.queryTicketByTokenId(cleanTokenIdInt);
  }
  if (cleanTokenIdInt <= TICKET_TOKENID_MAX) {
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
    }
  } else if (cleanTokenIdInt > TICKET_TOKENID_MAX) {
    if (ticket) {
      const eggParams = {
        ExpressionAttributeValues: {
          ":tokenId": cleanTokenIdInt,
        },
        IndexName: "tokenId-index",
        KeyConditionExpression: `tokenId = :tokenId`,
        TableName: "markers",
      };
      const eggResp = await ddb.query(eggParams).promise();
      if (eggResp.Items) {
        const egg = eggResp.Items[0];
        // query the egg from markers
        ticket.name = egg.marker_name;
        ticket.description = "This is an egg";
        ticket.image = `https://assets.doloverse.com/${egg.marker_name}.png`;
      }
    }
  }
  res.json(ticket);

  res.status(404).end();
};
