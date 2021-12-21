const hre = require("hardhat");

async function main() {
  const Contract = await hre.ethers.getContractFactory("MockERC20");
  console.log("contract size", Contract.bytecode.length / 2);
  const contract = await Contract.deploy(
    "Mock ERC20",
    "MERC",
    hre.ethers.utils.parseUnits("10000")
  );
  await contract.deployed();
  console.log("MockERC20 deployed to:", contract.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
