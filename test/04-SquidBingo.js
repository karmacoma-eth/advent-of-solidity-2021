const { expect } = require("chai");

describe("SquidBingo contract", function () {
  let SquidBingoDeployer;
  let squidBingo;
  const COMMA = "0x2c";

  before(async function () {
    SquidBingoDeployer = await ethers.getContractFactory("SquidBingo");
    squidBingo = await SquidBingoDeployer.deploy();
  });

  it("https://adventofcode.com/2021/day/4", async function () {
    // sanity checks
    expect(await squidBingo.stringToUInt("4242")).to.equal(4242);
    expect(await squidBingo.splitString("a,b,c", COMMA)).to.eql(["0x61", "0x62", "0x63"]);
    expect(await squidBingo.splitString("a,,c", COMMA)).to.eql(["0x61", "0x", "0x63"]);
    expect(await squidBingo.splitString("a,,c,", COMMA)).to.eql(["0x61", "0x", "0x63", "0x"]);
    expect(await squidBingo.splitString(", b , c", COMMA)).to.eql(["0x", "0x206220", "0x2063"]);


    // expect(await squidBingo.computeGammaEpsilonProduct(challengeData)).to.equal(3985686);
  });


  it("https://adventofcode.com/2021/day/4#part2", async function () {

  });

  let exampleData = [

  ];

  let challengeData = [
  ];
});
