var Meme = artifacts.require("./Meme.sol");
var User = artifacts.require("./User.sol");
var PepeCoin = artifacts.require("./PepeCoin.sol");
var MemeketPlace = artifacts.require("./Memeketplace.sol");
var likeMemeReward = 1;
var createMemeReward = 50;
var createUserReward = 100;

module.exports = async function (deployer) {
  await deployer.deploy(Meme);
  await deployer.deploy(User);
  await deployer.deploy(PepeCoin);
  await deployer.deploy(
    MemeketPlace,
    Meme.address,
    User.address,
    PepeCoin.address,
    likeMemeReward,
    createMemeReward,
    createUserReward
  );
};
