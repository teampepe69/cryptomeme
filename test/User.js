var User = artifacts.require("User.sol");

contract("User.sol", function(accounts) {

    let admin = accounts[0];
    let registeredUser1 = accounts[1];
    let moderator1 = accounts[2];

    before(async () => {
        userInstance = await User.deployed();
    });

    it("Should successfully deploy user instance", async () => {
        assert.notEqual(userInstance.address, 0x0);
        assert.notEqual(userInstance.address, null);
        assert.notEqual(userInstance.address, undefined);
        assert.notEqual(userInstance.address, "");
        assert.notEqual(userInstance.address, " ");
        console.log("User Instance Address: " + userInstance.address);
    });

    it("Should register user", async () => {
        await userInstance.createUser("UserName", 
        "Password",
        registeredUser1,
        "displayPicture", {from: admin});

        let result = await userInstance.numberOfUsers.call();
        assert.equal(result,1,"Total number of users should be 1 but got " + result);
        
        assert.equal(userInstance.users[0]._username,"UserName");
    })


})