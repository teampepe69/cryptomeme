var MemeketPlace = artifacts.require("MemeketPlace.sol");
var User = artifacts.require("User.sol");
var Meme = artifacts.require("Meme.sol");
var PepeCoin = artifacts.require("PepeCoin.sol");

contract("MemeketPlace.sol", function(accounts) {
  let userInstance;
  let memeInstance;
  let memeketPlaceInstance;
  let pepeCoinInstance;
  let memeOwner1 = accounts[1];
  let memeOwner2 = accounts[2];
  let memeOwner3 = accounts[3];

  before(async () => {
    userInstance = await User.deployed();
    memeInstance = await Meme.deployed();
    pepeCoinInstance = await PepeCoin.deployed();
    memeketPlaceInstance = await MemeketPlace.deployed();
  });

  it("Should successfully deploy user instance", async () => {
    assert.notEqual(memeketPlaceInstance.address, 0x0);
    assert.notEqual(memeketPlaceInstance.address, null);
    assert.notEqual(memeketPlaceInstance.address, undefined);
    assert.notEqual(memeketPlaceInstance.address, "");
    assert.notEqual(memeketPlaceInstance.address, " ");
  });

  it("Should getUser 0 : admin from userContract", async () => {
    let res1 = await userInstance.getUser(0);
    assert.strictEqual(
        res1.userId,
        "0",
        "Should userId equal to 0"
      );
  });
})