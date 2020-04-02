var PepeCoin = artifacts.require("PepeCoin.sol");

contract("PepeCoin.sol", function(accounts) {
    let pepeCoinInstance;
    let memeInstance;
    let memeketPlaceInstance;
    let userInstance
    let memeOwner1 = accounts[1];
    let memeOwner2 = accounts[2];
    let memeOwner3 = accounts[3];
  
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
  
    it("Should mint User 1 and returns balance ", async () => {
      let res1 = await pepeCoinInstance.mintUserCreation(accounts[1]);
      let balance1 = await pepeCoinInstance.getBalance(accounts[1]);
      assert.strictEqual(
        balance1.toNumber(),
          100,
          "Should balance equal to 100"
        );
    });

    it("Should transfer from User 1 to User 2 : 1 ", async () => {
        let balance0 = await pepeCoinInstance.getBalance(accounts[1]);
        await pepeCoinInstance.reactToMeme(accounts[2],{from:accounts[1]}) ;
        let balance1 = await pepeCoinInstance.getBalance(accounts[1]);
        let balance2 = await pepeCoinInstance.getBalance(accounts[2]);
        assert.strictEqual(
            balance1.toNumber(),
              99,
              "Should balance equal to 60"
            );
        assert.strictEqual(
            balance2.toNumber(),
                1,
                "Should balance equal to 40"
            );
      });
  })