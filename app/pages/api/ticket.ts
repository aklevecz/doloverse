import { NextApiRequest, NextApiResponse } from "next";
import Iron from "@hapi/iron";
import CookieService from "../../lib/cookie";
import DoloverseDb from "../../lib/doloverseDb";
import sqs from "../../lib/sqs";

const dolodb = new DoloverseDb();
const sqsUrl = "https://sqs.us-west-1.amazonaws.com/669844428319/doloverse";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  let user;

  try {
    user = await Iron.unseal(
      CookieService.getAuthToken(req.cookies),
      process.env.ENCRYPTION_SECRET!,
      Iron.defaults
    );

    // TICKET XFER
    if (req.method === "POST") {
      const hasTicket = await dolodb.queryHasTicket(user.publicAddress);
      if (hasTicket) {
        return res.status(405).json({ error: "HAS_TICKET" });
      }

      const newTokenId = await dolodb.updateTokenCount();
      const params = {
        MessageAttributes: {
          address: { DataType: "String", StringValue: user.publicAddress },
          email: { DataType: "String", StringValue: user.email },
          tokenId: { DataType: "Number", StringValue: newTokenId.toString() },
        },
        MessageBody: `Printing ticket for ${user.publicAddress}`,
        // MessageDeduplicationId: "TheWhistler",  // Required for FIFO queues
        // MessageGroupId: "Group1",  // Required for FIFO queues
        QueueUrl: sqsUrl,
      };

      sqs.sendMessage(params, function (err, data) {
        if (err) {
          console.log("Error", err);
        } else {
          console.log("Success", data.MessageId);
        }
      });
      const err = await dolodb.putTicket(
        newTokenId,
        user.email,
        user.publicAddress
      );
      if (err !== "{}") {
        res.status(405).send(err);
      }
      res.json({ tokenId: newTokenId });
    }
    // END TICKET XFER

    if (req.method === "GET") {
      const ticket = await dolodb.queryTicketByUser(user.publicAddress);
      return res.json(ticket ?? { tokenId: 0 });
    }

    if (req.method === "PUT") {
      const ticket = await dolodb.queryTicketByUser(user.publicAddress);
      if (ticket) {
        if (!ticket.hatched) {
          dolodb.updateTicket(ticket.tokenId, true);
        }
      }
    }
  } catch (error) {
    console.log(error);
    res.status(401).end();
  }
  res.end();
};
