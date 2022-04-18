const { ethers } = require("ethers");
const fetch = require("node-fetch");
const DolorverseInterface = require("./Doloverse.json");
// TODO: DEV - PROD
// require("dotenv").config();
const PP = process.env.PP;
// shit testing
const live = process.env.LIVE;
// shit testing
let DOLOVERSE_ADDRESS = "";
let ALCHEMY_KEY = "";
let defaultProvider = null;
if (live === "PROD") {
  DOLOVERSE_ADDRESS = DolorverseInterface.networks.matic;
  ALCHEMY_KEY = process.env.ALCHEMY_KEY;
  defaultProvider = new ethers.providers.AlchemyProvider(
    process.env.NETWORK_NAME,
    ALCHEMY_KEY
  );
}
if (live === "TESTING") {
  DOLOVERSE_ADDRESS = DolorverseInterface.networks.matic_mum;
  ALCHEMY_KEY = process.env.ALCHEMY_KEY_MUMBAI;
  defaultProvider = new ethers.providers.AlchemyProvider(
    "maticmum",
    ALCHEMY_KEY
  );
}

const user = {
  publicAddress: "0xa928293bb65eFB978559058e3C39Ef8d730c6f07",
};

exports.handler = async (event) => {
  // (async () => {
  const messageAttributes = event.Records[0].messageAttributes;
  try {
    const recipient = messageAttributes.address.stringValue;
    const tokenId = parseInt(messageAttributes.tokenId.stringValue);

    // const recipient = "0xA42423529862697a80d2500B483E2c8A4273E683";
    // const tokenId = 2;
    const masterWallet = new ethers.Wallet(PP, defaultProvider);
    const contract = new ethers.Contract(
      DOLOVERSE_ADDRESS,
      DolorverseInterface.abi,
      masterWallet.provider
    );

    const signer = contract.connect(masterWallet);

    // signer.estimateGas
    //   .safeTransferFrom(user.publicAddress, recipient, tokenId, 1, 0x0)
    //   .then((b) => console.log(b.toString()));

    // return;
    ethers.utils.for;
    const fees = await fetch(
      "https://gasstation-mainnet.matic.network/v2"
    ).then((response) => response.json());
    const fee = ethers.BigNumber.from(
      Math.floor(fees.standard.maxFee * 10 ** 9)
    );
    // const fee = 40000000000;
    console.log(fee);
    console.log(DOLOVERSE_ADDRESS, recipient, tokenId);
    console.log("Transfering ticket...");
    const tx = await signer.safeTransferFrom(
      user.publicAddress,
      recipient,
      tokenId,
      1,
      0x0,
      {
        gasPrice: fee,
        gasLimit: 58453,
      }
    );
    console.log("Waiting for tx...");
    console.log(tx);
    const receipt = await tx.wait();
    for (const event of receipt.events) {
      console.log(event);
      if (event.event === "TransferSingle") {
        const tokenId = parseInt(event.args.id);
        console.log("token xfr'd", tokenId);
      }
    }
    const response = {
      statusCode: 200,
      body: JSON.stringify("Hello I'm a lamb!"),
    };
    return response;
  } catch (err) {
    console.log(err);
    return { statusCode: 404 };
  }
};
// })();
