const secrets = require("./secrets.js");
const HDWalletProvider = require("truffle-hdwallet-provider");

let ropstenPrivateKey = new Buffer(secrets.ropstenPK, "hex");
let ropstenWallet = Wallet.fromPrivateKey(ropstenPrivateKey);
let ropstenProvider = new WalletProvider(
  ropstenWallet,
  "https://ropsten.infura.io/"
);

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
      provider: ropstenProvider,
      network_id: "3",
    },
  },
  plugins: ["solidity-coverage"],
};
