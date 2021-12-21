const hre = require("hardhat");

async function main() {
  const Contract = await hre.ethers.getContractFactory("RaDAO");
  console.log("contract size", Contract.bytecode.length / 2);
  const contract = await Contract.deploy();
  await contract.deployed();
  console.log("RaDAO master template deployed to:", contract.address);

  const Factory = await hre.ethers.getContractFactory("RaDAOFactory");
  const factory = await Factory.deploy(contract.address);
  await factory.deployed();
  console.log("RaDAOFactory deployed to:", factory.address);

  /*
  const tx = await (
    await factory.create(
      "Z Voting Token",
      "Z",
      "0x0000000000000000000000000000000000000000",
      0,
      500000000000,
      240,
      60
    )
  ).wait();
  const daoAddress = tx.events[tx.events.length - 1].args[0];

  console.log("RaDAO deployed to:", daoAddress);
  */
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
