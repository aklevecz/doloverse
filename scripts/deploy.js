const hre = require("hardhat");
const fs = require("fs");

async function main() {
  const interfacePath =
    __dirname + "/../artifacts/contracts/Doloverse.sol/Doloverse.json";
  const interface = require(interfacePath);
  const networks = interface.networks ?? {};

  const Doloverse = await hre.ethers.getContractFactory("Doloverse");
  const doloverse = await Doloverse.deploy();

  await doloverse.deployed();

  console.log("Doloverse deployed to:", doloverse.address);

  interface.networks = { ...networks, [hre.network.name]: doloverse.address };
  fs.writeFileSync(interfacePath, JSON.stringify(interface));
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
