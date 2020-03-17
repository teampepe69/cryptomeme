var User = artifacts.require("User.sol");

contract("User.sol", function(accounts) {

    let admin = accounts[0];
    let registeredUser1 = accounts[1];
    let registeredUser2 = accounts[2];

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
        
        result = await userInstance.getUsername.call(0);
        assert.equal(result,"UserName", "Should return UserName but got " + result);
        
        result = await userInstance.getUserPassword.call(0);
        assert.equal(result,"Password", "Should return Password but got " + result);
        
        result = await userInstance.getUserWallet.call(0);
        assert.equal(result,registeredUser1, "Should return " + registeredUser1.address + "but got " + result);

        result = await userInstance.getUserState.call(0);
        assert.equal(result,"pending", "Should return pending but got " + result);
    
        result = await userInstance.getUserDisplayPicturePath.call(0);
        assert.equal(result,"displayPicture", "Should return displayPicture but got " + result);
    
    });

    it("Should edit user" , async () => {
        await userInstance.setUsername(0,"UserName2");
        let result = await userInstance.getUsername.call(0);
        assert.equal(result,"UserName2", "Should return UserName2 but got " + result);

        await userInstance.setUserPassword(0,"Password2");
        result = await userInstance.getUserPassword.call(0);
        assert.equal(result,"Password2", "Should return Password2 but got " + result);

        await userInstance.setUserWallet(0,registeredUser2);
        result = await userInstance.getUserWallet.call(0);
        assert.equal(result,registeredUser2, "Should return " + registeredUser2.address + "but got " + result);

        await userInstance.setDisplayPicturePath(0,"displayPicture2");
        result = await userInstance.getUserDisplayPicturePath.call(0);
        assert.equal(result,"displayPicture2", "Should return displayPicture2 but got " + result);

        await userInstance.setUserAsDeactivated(0);
        result = await userInstance.getUserState.call(0);
        assert.equal(result,"deactivated", "Should return deactivated but got " + result);

        await userInstance.setUserAsActive(0);
        result = await userInstance.getUserState.call(0);
        assert.equal(result,"active", "Should return active but got " + result);

        await userInstance.setUserAsModerator(0);
        result = await userInstance.getUserState.call(0);
        assert.equal(result,"moderator", "Should return moderator but got " + result);

        await userInstance.setUserAsAdmin(0);
        result = await userInstance.getUserState.call(0);
        assert.equal(result,"admin", "Should return admin but got " + result);
    });



})