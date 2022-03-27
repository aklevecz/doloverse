const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Doloverse", function () {
  beforeEach(async function () {
    this.Doloverse = await ethers.getContractFactory("Doloverse");
    this.doloverse = await this.Doloverse.deploy();
    await this.doloverse.deployed();

    this.accounts = await ethers.getSigners();
    this.owner = this.accounts[0];
    this.notOwner = this.accounts[1];

    // console.log("--", this.owner.address, this.notOwner.address, "--");

    // this.getLetter = getLetter.bind(this);
    // this.createWordBao = createWordBao.bind(this);
    // this.createWord = createWord.bind(this);
  });

  it("Creates a ticket", async function () {
    await this.doloverse.printTicket(this.owner.address);
    const balance = await this.doloverse.balanceOf(this.owner.address, 1);
    expect(parseInt(balance)).to.equal(1);
  });

  it("Gets tickets of sender", async function () {
    await this.doloverse.printTicket(this.owner.address);
    await this.doloverse.printTicket(this.owner.address);
    await this.doloverse.printTicket(this.owner.address);
    await this.doloverse.printTicket(this.owner.address);
    await this.doloverse.printTicket(this.owner.address);

    const balances = await this.doloverse.getTicketsOfAccount(
      this.owner.address
    );
  });

  it("Has the URI", async function () {
    const uri = await this.doloverse.uri(1);
  });

  it("Checks that the account has a ticket", async function () {
    await this.doloverse.printTicket(this.owner.address);
    const hasTicket = await this.doloverse.accountHasTicket(this.owner.address);
    expect(hasTicket).to.equal(true);
  });

  // it("Spell BAO", async function () {
  //   await this.getLetter("b");
  //   await this.getLetter("a");
  //   await this.getLetter("o");
  //   const { word, letters, amounts } = await makeWordArray("bao");
  //   await this.mottoverse.createWord(letters, amounts, word);
  //   const balanceOfBao = await this.mottoverse.balanceOf(
  //     this.owner.address,
  //     TOKEN_START
  //   );
  //   expect(parseInt(balanceOfBao)).to.equal(1);
  // });
});
