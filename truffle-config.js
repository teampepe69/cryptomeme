const path = require("path");
const secrets = require("./secrets.js");
const HDWalletProvider = require("truffle-hdwallet-provider");
const mnemonic = secrets.mnemonic;
const projectId = secrets.projectId;
module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // to customize your Truffle configuration!
  contracts_build_directory: path.join(__dirname, "client/src/contracts"),
  networks: {
    development: {
      host: "127.0.0.1",
      port: 8545,
      network_id: "*",
    },
    ropsten: {
      provider: () =>
        new HDWalletProvider(
          mnemonic,
          `https://ropsten.infura.io/v3/${projectId}`
        ),
      network_id: "3",
    },
  },
  plugins: ["solidity-coverage"],
};
