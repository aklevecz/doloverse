import ddb from "./ddb";

class DoloverseDb {
  T_STRING_INDEX_NAME = "tString-index";
  T_STRING_KEY = "tString";

  ADDRESS_INDEX_NAME = "userAddress-index";
  ADDRESS_KEY = "userAddress";

  _tableName = "doloverse";
  _countTableName = "doloverse-counter";
  _artistTableName = "artists";
  _eggMarkerTable = "markers";
  constructor() {}

  async getLastTokenId() {
    const params = {
      TableName: this._countTableName,
      KeyConditionExpression: "event = :event",
      ExpressionAttributeValues: {
        ":event": "fools",
      },
    };
    const count = await ddb.query(params).promise();
    return count.Items![0].tokenId;
  }

  async updateTokenCount() {
    var params = {
      TableName: this._countTableName,
      Key: {
        event: "fools",
      },
      UpdateExpression: "set tokenId = tokenId + :val",
      ExpressionAttributeValues: {
        ":val": 1,
      },
      ReturnValues: "UPDATED_NEW",
    };
    const { Attributes } = await ddb.update(params).promise();
    if (Attributes) {
      return Attributes.tokenId;
    }
    return null;
  }

  _queryParams(
    value: string | number,
    IndexName: string | undefined,
    key: string
  ) {
    return {
      ExpressionAttributeValues: {
        ":v": value,
      },
      IndexName: IndexName ?? IndexName,
      KeyConditionExpression: `${key} = :v`,
      TableName: this._tableName,
    };
  }

  async queryTicketByTString(tokenId: string) {
    const params = this._queryParams(
      tokenId.replace(".json", ""),
      this.T_STRING_INDEX_NAME,
      this.T_STRING_KEY
    );
    const ticket = await ddb.query(params).promise();
    if (ticket && ticket.Items) {
      return ticket.Items[0];
    } else {
      return undefined;
    }
  }

  async queryTicketByTokenId(tokenId: number) {
    const params = this._queryParams(tokenId, undefined, "tokenId");
    const ticket = await ddb.query(params).promise();
    if (ticket && ticket.Items) {
      return ticket.Items[0];
    } else {
      return undefined;
    }
  }

  async queryEggMarkerByTokenId(tokenId: number) {
    const params = {
      ExpressionAttributeValues: {
        ":tokenId": tokenId,
      },
      IndexName: "tokenId-index",
      KeyConditionExpression: `tokenId = :tokenId`,
      TableName: "markers",
    };
    const marker = await ddb.query(params).promise();
    if (marker && marker.Items) {
      return marker.Items[0];
    } else {
      return undefined;
    }
  }

  async putTicket(tokenId: number, userEmail: string, userAddress: string) {
    const putParams = {
      TableName: this._tableName,
      Item: {
        tokenId,
        userEmail,
        userAddress,
        hatched: false,
        tString: tokenId.toString(16).padStart(64, "0"),
      },
    };
    const response = await ddb
      .put(putParams)
      .promise()
      .catch((e) => {
        return e.message;
      });
    return JSON.stringify(response);
  }

  async getArtist(name: string) {
    const queryParams = {
      ExpressionAttributeValues: {
        ":v": name,
      },
      ExpressionAttributeNames: { "#name": "name" },
      KeyConditionExpression: `#name = :v`,
      TableName: this._artistTableName,
    };

    const artist = await ddb.query(queryParams).promise();
    if (artist && artist.Items) {
      return artist.Items[0];
    }
    return null;
  }
  async putArtist(name: string, description: string, links: string[]) {
    console.log(name, description);
    const putParams = {
      TableName: this._artistTableName,
      Item: {
        name,
        description,
        links,
      },
    };

    const response = await ddb
      .put(putParams)
      .promise()
      .catch((e) => e.message);
    return JSON.stringify(response);
  }

  async queryHasTicket(address: string) {
    const params = this._queryParams(
      address,
      this.ADDRESS_INDEX_NAME,
      this.ADDRESS_KEY
    );
    const ticket = await ddb.query(params).promise();
    return ticket.Count;
  }

  async queryTicketByUser(address: string) {
    const params = this._queryParams(
      address,
      this.ADDRESS_INDEX_NAME,
      this.ADDRESS_KEY
    );
    const ticket = await ddb.query(params).promise();
    if (ticket && ticket.Items) {
      return ticket.Items[0];
    }
    return null;
  }

  async updateTicket(tokenId: number, hatched: boolean) {
    const updateParams = {
      TableName: this._tableName,
      Key: {
        tokenId: tokenId,
      },
      UpdateExpression: "set hatched = :h",
      ExpressionAttributeValues: {
        ":h": hatched,
      },
    };

    const res = await ddb.update(updateParams).promise();
    console.log(res);
    return res;
  }
}

export default DoloverseDb;
