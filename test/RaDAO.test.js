const { BN, constants } = require("@openzeppelin/test-helpers");
const { expect } = require("chai");
const { ZERO_ADDRESS } = constants;
const P = ethers.utils.parseUnits;
const F = ethers.utils.formatUnits;

describe("RaDAO", function () {
  const name = "XYZ DAO Token";
  const symbol = "XYZDAO";
  let initialHolder;
  let recipient;
  let anotherAccount;

  beforeEach(async function () {
    const signers = await ethers.getSigners();
    initialHolder = await signers[0].getAddress();
    recipient = await signers[1].getAddress();
    anotherAccount = await signers[2].getAddress();

    const MockERC20 = await ethers.getContractFactory("MockERC20");
    const RaDAO = await ethers.getContractFactory("RaDAO");
    const RaDAOFactory = await ethers.getContractFactory("RaDAOFactory");

    this.mockERC20 = await MockERC20.deploy("Wrapped Token", "WTOK", P("1000"));
    await this.mockERC20.deployed();
    this.template = await RaDAO.deploy();
    await this.template.deployed();
    this.factory = await RaDAOFactory.deploy(this.template.address);
    await this.factory.deployed();
    const tx = await (
      await this.factory.create(
        name,
        symbol,
        this.mockERC20.address,
        0,
        50,
        15,
        15
      )
    ).wait();
    const daoAddress = tx.events[tx.events.length - 1].args[0];
    this.dao = RaDAO.attach(daoAddress);
  });

  it("erc20 has a name", async function () {
    expect(await this.dao.name()).to.equal(name);
  });

  it("erc20 has a symbol", async function () {
    expect(await this.dao.symbol()).to.equal(symbol);
  });

  it("erc20 has 18 decimals", async function () {
    expect(F(await this.dao.decimals(), 0)).to.be.equal("18");
  });

  it("erc20 totalSupply: starts at 0", async function () {
    expect(F(await this.dao.totalSupply())).to.be.equal("0.0");
  });

  it("erc20 balanceOf: defaults to 0", async function () {
    expect(F(await this.dao.balanceOf(anotherAccount))).to.be.equal("0.0");
  });

  it("lock", async function () {
    expect(F(await this.dao.balanceOf(initialHolder))).to.be.equal("0.0");
    await this.mockERC20.approve(this.dao.address, P("30"));
    await this.dao.lock(P("10"));
    await this.dao.lock(P("20"));
    expect(F(await this.dao.balanceOf(initialHolder))).to.be.equal("30.0");
  });

  it("unlock", async function () {
    await this.mockERC20.approve(this.dao.address, P("100"));
    await this.dao.lock(P("100"));
    expect(F(await this.mockERC20.balanceOf(initialHolder))).to.be.equal(
      "900.0"
    );
    expect(F(await this.dao.balanceOf(initialHolder))).to.be.equal("100.0");
    await this.dao.unlock(P("50"));
    expect(F(await this.mockERC20.balanceOf(initialHolder))).to.be.equal(
      "950.0"
    );
    expect(F(await this.dao.balanceOf(initialHolder))).to.be.equal("50.0");
  });
});
