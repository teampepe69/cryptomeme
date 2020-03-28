var MemeketPlace = artifacts.require("Memeketplace.sol");

contract("MemeketPlace.sol", function(accounts) {

    let meme1Owner = accounts[1];
    let meme1Path = "PATH TO SU";
    let meme1Title = "PEPE IS KING";
    let meme1Desc = "ALL HAIL PEPE THE GREAT";
    let meme1Id = 0; // meme contract, id starts from 0

    let liker1 = accounts[2];
    let hater1 = accounts[3];

    before(async () => {
        memeketPlaceInstance = await MemeketPlace.deployed();
    });

    it("Should successfully deploy MemeketPlace instance", async () => {
        assert.notEqual(memeketPlaceInstance.address, 0x0);
        assert.notEqual(memeketPlaceInstance.address, null);
        assert.notEqual(memeketPlaceInstance.address, undefined);
        assert.notEqual(memeketPlaceInstance.address, "");
        assert.notEqual(memeketPlaceInstance.address, " ");
    });

    it("Should upload meme", async() => {
        try {
            await memeketPlaceInstance.uploadMeme(
                meme1Owner,
                meme1Path,
                meme1Title,
                meme1Desc
            );
        } catch (error) {
            assert.fail("Error encounterd in uploading meme");
        };
        let likeStatus = await memeketPlaceInstance.getLikes(meme1Id,liker1);
        assert.strictEqual(likeStatus.toNumber(), 0, "Should return 0 but got " + likeStatus)
    });

    it("Should like meme" , async() => {
        try {
            await memeketPlaceInstance.likeMeme(meme1Id, {from:liker1});
        } catch (error) {
            assert.fail("Error encounterd in liking meme");
        }
        let likeStatus = await memeketPlaceInstance.getLikes(meme1Id,liker1);
        assert.strictEqual(likeStatus.toNumber(), 1, "Should return 1 but got " + likeStatus)
    });

    it("Should unlike meme if likeMeme is called again" , async() => {
        try {
            await memeketPlaceInstance.likeMeme(meme1Id, {from:liker1});
        } catch (error) {
            assert.fail("Error encounterd in unliking meme");
        }
        let likeStatus = await memeketPlaceInstance.getLikes(meme1Id,liker1);
        assert.strictEqual(likeStatus.toNumber(), 0, "Should return 0 but got " + likeStatus)
    });

    it("Should dislike meme" , async() => {
        try {
            await memeketPlaceInstance.dislikeMeme(meme1Id, {from:hater1});
        } catch (error) {
            assert.fail("Error encounterd in disliking meme");
        }
        let likeStatus = await memeketPlaceInstance.getLikes(meme1Id,hater1);
        assert.strictEqual(likeStatus.toNumber(), 2, "Should return 0 but got " + likeStatus);
    });

    it("Should un-dislike meme if dislikeMeme is called again" , async() => {
        try {
            await memeketPlaceInstance.dislikeMeme(meme1Id, {from:hater1});
        } catch (error) {
            assert.fail("Error encounterd in disliking meme");
        }
        let likeStatus = await memeketPlaceInstance.getLikes(meme1Id,hater1);
        assert.strictEqual(likeStatus.toNumber(), 0, "Should return 0 but got " + likeStatus);
    });

    it("likeMeme to overwrite dislikeMeme if its called after dislikeMeme" , async() => {
        await memeketPlaceInstance.dislikeMeme(meme1Id, {from:hater1});
        let likeStatus = await memeketPlaceInstance.getLikes(meme1Id,hater1);
        assert.strictEqual(likeStatus.toNumber(), 2, "Should return 2 but got " + likeStatus);

        await memeketPlaceInstance.likeMeme(meme1Id, {from:hater1});
        likeStatus = await memeketPlaceInstance.getLikes(meme1Id,hater1);
        assert.strictEqual(likeStatus.toNumber(), 1, "Should return 1 but got " + likeStatus);
    });

    it("Should flag Meme" , async() => {
        try {
            await memeketPlaceInstance.flagMeme(meme1Id, {from:hater1});
        } catch (error) {
            assert.fail("Error encounterd in flagging meme");
        }
    });

    it("Should not flag Meme twice" , async() => {
        let result = true;
        try {
            await memeketPlaceInstance.flagMeme(meme1Id, {from:hater1});
            result = false;
        } catch (error) {
            result = true;
        }
        assert.strictEqual(result, true, "User can flag meme twice")
    });
    

})