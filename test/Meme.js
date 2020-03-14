var Meme = artifacts.require("Meme.sol");

contract("Meme.sol", function(accounts) {
  let memeInstance;
  let memeOwner1 = accounts[1];
  let memeOwner2 = accounts[2];
  let memeOwner3 = accounts[3];
  let meme1Path = "/path/meme/1";
  let meme2Path = "/path/meme/2";
  let meme3Path = "/path/meme/3";
  let approved = 0;
  let rejected = 1;
  let pending = 2;

  before(async () => {
    memeInstance = await Meme.deployed();
  });

  it("Should successfully deploy meme instance", async () => {
    assert.notEqual(memeInstance.address, 0x0);
    assert.notEqual(memeInstance.address, null);
    assert.notEqual(memeInstance.address, undefined);
    assert.notEqual(memeInstance.address, "");
    assert.notEqual(memeInstance.address, " ");
  });

  it("Should create 3 memes properly", async () => {
    let meme1Result = await memeInstance.createMeme(memeOwner1, meme1Path);
    let meme2Result = await memeInstance.createMeme(memeOwner2, meme2Path);
    let meme3Result = await memeInstance.createMeme(memeOwner3, meme3Path);

    //Meme 1
    assert.strictEqual(
      meme1Result.logs[1].event,
      "MemeCreated",
      "Should create meme 1"
    );

    assert.strictEqual(
      meme1Result.logs[1].args[0].toNumber(),
      0,
      "Should return meme ID 0"
    );

    assert.strictEqual(
      meme1Result.logs[1].args[1],
      meme1Path,
      "Should return meme Owner 1"
    );

    //Meme 2
    assert.strictEqual(
      meme2Result.logs[1].event,
      "MemeCreated",
      "Should create meme 2"
    );

    assert.strictEqual(
      meme2Result.logs[1].args[0].toNumber(),
      1,
      "Should return meme ID 1"
    );

    assert.strictEqual(
      meme2Result.logs[1].args[1],
      meme2Path,
      "Should return meme Owner 2"
    );

    //Meme 3
    assert.strictEqual(
      meme3Result.logs[1].event,
      "MemeCreated",
      "Should create meme 3"
    );

    assert.strictEqual(
      meme3Result.logs[1].args[0].toNumber(),
      2,
      "Should return meme ID 2"
    );

    assert.strictEqual(
      meme3Result.logs[1].args[1],
      meme3Path,
      "Should return meme Owner 3"
    );
  });

  it("Should show meme states to be pending", async () => {
    let meme1State = await memeInstance.getMemeState.call(0);
    let meme2State = await memeInstance.getMemeState.call(1);
    let meme3State = await memeInstance.getMemeState.call(2);

    assert.strictEqual(
      meme1State.toNumber(),
      pending,
      "Meme 1 should be pending"
    );

    assert.strictEqual(
      meme2State.toNumber(),
      pending,
      "Meme 2 should be pending"
    );

    assert.strictEqual(
      meme3State.toNumber(),
      pending,
      "Meme 3 should be pending"
    );
  });

  it("Should return correct owners for memes", async () => {
    let meme1Owner = await memeInstance.ownerOf.call(0);
    let meme2Owner = await memeInstance.ownerOf.call(1);
    let meme3Owner = await memeInstance.ownerOf.call(2);

    assert.strictEqual(
      meme1Owner,
      memeOwner1,
      "Meme 1 owner should be correct"
    );

    assert.strictEqual(
      meme2Owner,
      memeOwner2,
      "Meme 2 owner should be correct"
    );

    assert.strictEqual(
      meme3Owner,
      memeOwner3,
      "Meme 3 owner should be correct"
    );
  });

  it("Should like meme 1 three times", async () => {
    let setMeme1Likes = await memeInstance.setMemeLikes(0, 3);
    let getMeme1Likes = await memeInstance.getMemeLikes.call(0);

    assert.strictEqual(
      setMeme1Likes.logs[0].event,
      "MemeLiked",
      "MemeLiked event should be emitted"
    );

    assert.strictEqual(
      setMeme1Likes.logs[0].args[1].toNumber(),
      3,
      "Meme 1 should have 3 likes"
    );

    assert.strictEqual(
      getMeme1Likes.toNumber(),
      3,
      "Meme 1 should have 3 likes"
    );
  });

  it("Should change meme path of meme 1", async () => {
    let meme1NewPath = "/newpath/meme/1";
    let setMeme1Path = await memeInstance.setMemePath(0, meme1NewPath);
    let getMeme1Path = await memeInstance.getMemePath(0);

    assert.strictEqual(
      setMeme1Path.logs[0].event,
      "MemePathChanged",
      "MemePathChanged event should be emitted"
    );

    assert.strictEqual(
      setMeme1Path.logs[0].args[1],
      meme1NewPath,
      "Meme1 should have a new path"
    );

    assert.strictEqual(
      getMeme1Path,
      meme1NewPath,
      "Meme 1 should have a new path"
    );
  });

  it("Should Approve Meme 2", async () => {
    let approveMeme2 = await memeInstance.approveMeme(1);
    let getMeme2State = await memeInstance.getMemeState(1);
    assert.strictEqual(
      approveMeme2.logs[0].event,
      "MemeApproved",
      "MemeApproved event should be emitted"
    );

    assert.strictEqual(
      approveMeme2.logs[0].args[0].toNumber(),
      1,
      "Meme 2 ID should be emitted in event"
    );

    assert.strictEqual(
      getMeme2State.toNumber(),
      approved,
      "Meme 2 should be approved"
    );
  });

  it("Should reject Meme 3", async () => {
    let rejectMeme3 = await memeInstance.rejectMeme(2);
    let getMeme3State = await memeInstance.getMemeState.call(2);

    assert.strictEqual(
      rejectMeme3.logs[0].event,
      "MemeRejected",
      "MemeRejected event should be emitted"
    );

    assert.strictEqual(
      rejectMeme3.logs[0].args[0].toNumber(),
      2,
      "Meme3 ID should be emitted in event"
    );

    assert.strictEqual(
      getMeme3State.toNumber(),
      rejected,
      "Meme 3 should be rejected"
    );
  });
});
