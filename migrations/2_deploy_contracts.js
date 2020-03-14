var SimpleStorage = artifacts.require("./SimpleStorage.sol");
var Meme = artifacts.require("./Meme.sol");
var MemeketPlace = artifacts.require("./MemeketPlace.sol");

module.exports = async function(deployer) {
  await deployer.deploy(SimpleStorage);
  await deployer.deploy(Meme);
  await deployer.deploy(MemeketPlace, Meme.address);
};
