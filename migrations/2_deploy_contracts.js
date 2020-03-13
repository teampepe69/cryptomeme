var SimpleStorage = artifacts.require("./SimpleStorage.sol");
var Meme = artifacts.require("./Meme.sol");

module.exports = function(deployer) {
  deployer.deploy(SimpleStorage);
  deployer.deploy(Meme);
};
