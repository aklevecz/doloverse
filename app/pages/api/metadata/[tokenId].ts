import { NextApiRequest, NextApiResponse } from "next";
import { HOST } from "../../../constants";

import DoloverseDb from "../../../lib/doloverseDb";
import ddb from "../../../lib/ddb";

const TICKET_TOKENID_MAX = 40;

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { tokenId } = req.query;
  const dolodb = new DoloverseDb();
  const cleanTokenId = (tokenId as string).replace(".json", "");
  let tokenIdInt = 0;
  if (cleanTokenId.length === 64) {
    tokenIdInt = parseInt(cleanTokenId, 16);
  } else {
    tokenIdInt = parseInt(cleanTokenId);
  }
  // const cleanTokenIdInt = parseInt(cleanTokenId);
  // let ticket = await dolodb.queryTicketByTString(cleanTokenId as string);
  // if (!ticket) {
  //   ticket = await dolodb.queryTicketByTokenId(cleanTokenIdInt);
  // }
  let data: any = { name: "", description: "", image: "" };
  if (tokenIdInt <= TICKET_TOKENID_MAX) {
    const ticket = await dolodb.queryTicketByTokenId(tokenIdInt);

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
      data = ticket;
    }
  } else if (tokenIdInt > TICKET_TOKENID_MAX) {
    const eggParams = {
      ExpressionAttributeValues: {
        ":tokenId": tokenIdInt,
      },
      IndexName: "tokenId-index",
      KeyConditionExpression: `tokenId = :tokenId`,
      TableName: "markers",
    };
    const eggResp = await ddb.query(eggParams).promise();
    if (eggResp.Items) {
      const egg = eggResp.Items[0];
      // query the egg from markers
      data.name = egg.marker_name;
      data.description = "This is an egg";
      data.image = `https://assets.doloverse.com/${egg.marker_name}.png`;
      // data = egg;
    }
  }
  res.json(data);

  res.status(404).end();
};
