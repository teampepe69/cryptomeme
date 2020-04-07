var User = artifacts.require("User.sol");
var Meme = artifacts.require("Meme.sol");
var PepeCoin = artifacts.require("PepeCoin.sol");
var MemeketPlace = artifacts.require("MemeketPlace.sol");

contract("MemeketPlace.sol", function (accounts) {
  let userInstance;
  let memeInstance;
  let pepeCoinInstance;
  let memeketPlaceInstance;
  let likeMemeReward = 1;
  let createMemeReward = 50;
  let createUserReward = 100;
  let memeOwner1 = accounts[1];
  let memeOwner2 = accounts[2];
  let memeOwner3 = accounts[3];

  before(async () => {
    pepeCoinInstance = await PepeCoin.deployed();
    memeketPlaceInstance = await MemeketPlace.deployed();
  });

  it("Should successfully deploy MemeketPlace instance", async () => {
    assert.notEqual(memeketPlaceInstance.address, 0x0);
    assert.notEqual(memeketPlaceInstance.address, null);
    assert.notEqual(memeketPlaceInstance.address, undefined);
    assert.notEqual(memeketPlaceInstance.address, "");
    assert.notEqual(memeketPlaceInstance.address, " ");
  });

  it("Should create user 1", async () => {
    let createUser1 = await memeketPlaceInstance.createUser(
      memeOwner1,
      "Meme Owner 1",
      "Random About",
      "Random Hash",
      "Random Display Name",
      "Random Website"
    );
  });

  it("Should activate user 1", async () => {
    let activateUser1 = await memeketPlaceInstance.activateUser(memeOwner1);
  });

  it("User 1 should have default created user pepecoins", async () => {
    let numberOfPepeCoinsUser1 = await pepeCoinInstance.balanceOf(memeOwner1);
    assert.strictEqual(
      numberOfPepeCoinsUser1.toNumber(),
      createUserReward,
      "User 1 should have 100 Pepe Coins"
    );
  });
});
