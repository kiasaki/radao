require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-ethers");
require("@nomiclabs/hardhat-etherscan");

module.exports = {
  solidity: "0.8.6",
  settings: {
    optimizer: {
      enabled: true,
      runs: 1,
    },
  },
  networks: {
    /*
    ropsten: {
      url: "https://ropsten.infura.io/v3/" + process.env.INFURA_PROJECT_ID,
      accounts: [process.env.RADAO_ROPSTEN_KEY]
    },
    mainnet: {
      url: "https://mainnet.infura.io/v3/" + process.env.INFURA_PROJECT_ID,
      accounts: [process.env.RADAO_MAINNET_KEY]
    },
    */
  },
  etherscan: {
    apiKey: process.env.ETHERSCAN_API_KEY,
  },
};
