require("@nomiclabs/hardhat-waffle");

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: "0.8.9",
  networks: {
    hardhat: {
      blockGasLimit: 10 ** 9,
    },
  },
  mocha: {
    timeout: 60000
  }
};
