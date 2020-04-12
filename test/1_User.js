var User = artifacts.require("User.sol");

contract("User.sol", function (accounts) {
  let userInstance;
  let contractOwner = accounts[0];
  let memeOwner1 = accounts[1];
  let memeOwner2 = accounts[2];
  let memeOwner3 = accounts[3];

  before(async () => {
    userInstance = await User.deployed();
  });

  it("Should successfully deploy user instance", async () => {
    assert.notEqual(userInstance.address, 0x0);
    assert.notEqual(userInstance.address, null);
    assert.notEqual(userInstance.address, undefined);
    assert.notEqual(userInstance.address, "");
    assert.notEqual(userInstance.address, " ");
  });

  it("Should have already added one (admin) user and return it", async () => {
    let res1 = await userInstance.users.call(0);
    let address1 = await userInstance.getUserAddress.call(0);
    assert.strictEqual(
      address1.toString(),
      contractOwner,
      "User Address should be contract owner address"
    );
    assert.strictEqual(res1.userId.toNumber(), 0, "Should userId equal to 0");
  });

  it("Should create user 1, user 2, user 3", async () => {
    await userInstance.createUser(
      memeOwner1,
      "_about",
      "_displayPictureHash",
      "_displayName",
      "_website",
      { from: memeOwner1 }
    );
    let user1Status = await userInstance.checkUserIsPending.call(memeOwner1);
    assert.strictEqual(
      user1Status.toString(),
      "true",
      "User 1 should be pending"
    );
    await userInstance.createUser(
      memeOwner2,
      "_about",
      "_displayPictureHash",
      "_displayName",
      "_website",
      { from: memeOwner2 }
    );
    let user2Status = await userInstance.checkUserIsPending.call(memeOwner2);
    assert.strictEqual(
      user2Status.toString(),
      "true",
      "User 2 should be pending"
    );
    await userInstance.createUser(
      memeOwner3,
      "_about",
      "_displayPictureHash",
      "_displayName",
      "_website",
      { from: memeOwner3 }
    );
    let user3Status = await userInstance.checkUserIsPending.call(memeOwner3);
    assert.strictEqual(
      user3Status.toString(),
      "true",
      "User 3 should be pending"
    );
  });

  it("Should activate user 1 2 and 3", async () => {
    let beforeActivateUser1 = await userInstance.checkUserIsActive.call(
      memeOwner1
    );
    await userInstance.setUserAsActive(memeOwner1);
    let afterActivateUser1 = await userInstance.checkUserIsActive.call(
      memeOwner1
    );
    assert.strictEqual(
      beforeActivateUser1.toString(),
      "false",
      "Should be false"
    );
    assert.strictEqual(afterActivateUser1.toString(), "true", "Should be true");

    let beforeActivateUser2 = await userInstance.checkUserIsActive.call(
      memeOwner2
    );
    await userInstance.setUserAsActive(memeOwner2);
    let afterActivateUser2 = await userInstance.checkUserIsActive.call(
      memeOwner2
    );
    assert.strictEqual(
      beforeActivateUser2.toString(),
      "false",
      "Should be false"
    );
    assert.strictEqual(afterActivateUser2.toString(), "true", "Should be true");

    let beforeActivateUser3 = await userInstance.checkUserIsActive.call(
      memeOwner3
    );
    await userInstance.setUserAsActive(memeOwner3);
    let afterActivateUser3 = await userInstance.checkUserIsActive.call(
      memeOwner3
    );
    assert.strictEqual(
      beforeActivateUser3.toString(),
      "false",
      "Should be false"
    );
    assert.strictEqual(afterActivateUser3.toString(), "true", "Should be true");
  });

  it("Should return true to check user 1 exists", async () => {
    let checkUser1Exists = await userInstance.checkUserExists(memeOwner1);

    assert.strictEqual(
      checkUser1Exists,
      true,
      "Should return true for checking user 1 exists"
    );
  });

  it("Should give user Admin Rights", async () => {
    try {
      await userInstance.setUserAsDeactivated.call(memeOwner2, {
        from: memeOwner1,
      });
      await userInstance.setUserAsActive.call(memeOwner2, { from: memeOwner1 });
      await userInstance.setUserAsAdmin.call(memeOwner2, { from: memeOwner1 });
      assert.fail(
        "Functions which access is expected to be admin only are accessible by user with no admin rights"
      );
    } catch (error) {
      await userInstance.setUserAsAdmin(memeOwner1, { from: contractOwner });
      try {
        await userInstance.setUserAsDeactivated.call(memeOwner2, {
          from: memeOwner1,
        });
        await userInstance.setUserAsActive.call(memeOwner2, {
          from: memeOwner1,
        });
        await userInstance.setUserAsAdmin.call(memeOwner2, {
          from: memeOwner1,
        });
      } catch (error) {
        asser.fail(
          "After giving user admin rights, user cannot access admin-only functions"
        );
      }
    }
  });
});
