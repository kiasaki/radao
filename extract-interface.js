const ethers = require("ethers");
const iface = new ethers.utils.Interface(
  require("./artifacts/contracts/RaDAO.sol/RaDAO.json").abi
);
console.log(iface.format(ethers.utils.FormatTypes.minimal));
