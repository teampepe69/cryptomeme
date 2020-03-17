var SimpleStorage = artifacts.require("./SimpleStorage.sol");
var Meme = artifacts.require("./Meme.sol");
var MemeketPlace = artifacts.require("./MemeketPlace.sol");
var User = artifacts.require("./User.sol");

module.exports = async function(deployer) {
  await deployer.deploy(User);
  await deployer.deploy(SimpleStorage);
  await deployer.deploy(Meme);
  await deployer.deploy(MemeketPlace, Meme.address, User.address);
};
