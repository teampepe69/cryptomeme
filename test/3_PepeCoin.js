var PepeCoin = artifacts.require("PepeCoin.sol");

contract("PepeCoin.sol", function (accounts) {
  let pepeCoinInstance;
  let user1 = accounts[1];
  let user2 = accounts[2];
  let mintAmount = 50;
  let transferAmount = 27;

  before(async () => {
    pepeCoinInstance = await PepeCoin.deployed();
  });

  it("Should successfully deploy pepeCoin instance", async () => {
    assert.notEqual(pepeCoinInstance.address, 0x0);
    assert.notEqual(pepeCoinInstance.address, null);
    assert.notEqual(pepeCoinInstance.address, undefined);
    assert.notEqual(pepeCoinInstance.address, "");
    assert.notEqual(pepeCoinInstance.address, " ");
  });

  it("Should successfully mint PepeCoins", async () => {
    let mintPepeCoins = await pepeCoinInstance.mintPepeCoins(user1, mintAmount);
    try {
      await pepeCoinInstance.mintPepeCoins(user1, mintAmount, { from: user1 });
    } catch (error) {
      assert.fail("Error encountered in minting pepe coins from user1");
    }
  });

  it("Should successfully return correct amount of PepeCoins", async () => {
    let numberOfPepeCoins = await pepeCoinInstance.balanceOf.call(user1);
    assert.strictEqual(
      numberOfPepeCoins.toNumber(),
      mintAmount,
      "Number of PepeCoins minted should be the same as balance"
    );
  });

  it("Should successfully transfer correct amount of PepeCoins", async () => {
    let user1BalanceBefore = await pepeCoinInstance.balanceOf.call(user1);
    try {
      await pepeCoinInstance.transferPepeCoins(user1, user2, transferAmount, {
        from: user1,
      });
    } catch (error) {
      assert.fail("Error encounterd in transferring PepeCoins");
    }
    let user1BalanceAfter = await pepeCoinInstance.balanceOf.call(user1);
    assert.strictEqual(
      user1BalanceAfter.toNumber(),
      user1BalanceBefore.toNumber() - transferAmount,
      "User 1 balance was not reduced upon transfer of PepeCoins to user 2"
    );
    let user2Balance = await pepeCoinInstance.balanceOf.call(user2);
    assert.strictEqual(
      user2Balance.toNumber(),
      transferAmount,
      "User 2 balance was not updated with the transfer amount upon transfer of PepeCoins from user1"
    );
  });
});
