pragma solidity ^0.5.0;
import "../node_modules/@openzeppelin/contracts/math/SafeMath.sol";


contract User {
    /*
    modifier adminOnly() {
        require(msg.sender == admin, "Restricted to admin only");
        _;
    }
    
    // modifier contentCreatorOnly () {
    //     require(registered_Users[traceUser[msg.owner]].role == userRole.contentCreator, "Restricted to Content Creators only");
    //     _;
    // }

    // modifier moderatorOnly () {
    //     require(registered_Users[traceUser[msg.owner]].role == userRole.moderator, "Restricted to moderator only");
    //     _;
    // }

    
    modifier registeredUsersOnly() {
        require(
            registered_Users[msg.sender].state == userStates.registered,
            "Restricted to registered users only"
        );
        _;
    }

    modifier specificUserOnly(address userAd) {
        require(msg.sender == userAd, "Restricted to user only");
        _;
    }

    modifier alreadyFollowed(address userAd) {
        require(
            alreadyFollowing[msg.sender][userAd] == true,
            "User already followed"
        );
        _;
    }
    */
    using SafeMath for uint256;
    address admin = msg.sender;

    enum userStates {pending, active, deactivated, admin}

    uint256 public numberOfUsers = 0;

    struct user {
        uint256 userId;
        address userWallet;
        string about;
        string displayPictureHash;
        string displayName;
        string website;
        userStates state;
    }

    user[] public users;
    mapping(address => bool) public userExists;
    mapping(address => uint256) public userIds;

    event UserCreated(
        uint256 userId,
        address userWallet,
        string about,
        string displayPictureHash,
        string displayName,
        string website
    );
    event UserAboutChanged(address userWallet, string about);
    event UserDisplayPictureChanged(
        address userWallet,
        string displayPictureHash
    );
    event UserDisplayNameChanged(address userWallet, string displayName);
    event UserWebsiteChanged(address userWallet, string website);
    event UserActivated(address userWallet);
    event UserDeactivated(address userWallet);
    event UserNewAdmin(address userWallet);

    modifier uniqueUser(address _userWallet) {
        require(!userExists[_userWallet], "User already exists!");
        _;
    }

    constructor() public {
        //Create admin user
        createUser(
            msg.sender,
            "I am the boss",
            "QmP1KdPrFV9wKbDy5WvCDKd3YcyTBbFvqfvBCzjGrDiVLZ",
            "BigPepeBoss",
            "www.4chan.org"
        );
        users[userIds[msg.sender]].state = userStates.admin;
    }

    function createUser(
        address _userWallet,
        string memory _about,
        string memory _displayPictureHash,
        string memory _displayName,
        string memory _website
    ) public uniqueUser(_userWallet) {
        user memory newUser = user(
            numberOfUsers,
            _userWallet,
            _about,
            _displayPictureHash,
            _displayName,
            _website,
            userStates.pending
        );
        users.push(newUser);
        emit UserCreated(
            numberOfUsers,
            _userWallet,
            _about,
            _displayPictureHash,
            _displayName,
            _website
        );
        userExists[_userWallet] = true;
        userIds[_userWallet] = numberOfUsers;
        numberOfUsers = numberOfUsers.add(1);
    }

    function setUserAbout(address _userWallet, string memory _about) public {
        users[userIds[_userWallet]].about = _about;
        emit UserAboutChanged(_userWallet, _about);
    }

    function setUserDisplayPicture(
        address _userWallet,
        string memory _displayPictureHash
    ) public {
        users[userIds[_userWallet]].displayPictureHash = _displayPictureHash;
        emit UserDisplayPictureChanged(_userWallet, _displayPictureHash);
    }

    function setUserDisplayName(address _userWallet, string memory _displayName)
        public
    {
        users[userIds[_userWallet]].displayName = _displayName;
        emit UserDisplayNameChanged(_userWallet, _displayName);
    }

    function setUserWebsite(address _userWallet, string memory _website)
        public
    {
        users[userIds[_userWallet]].website = _website;
        emit UserWebsiteChanged(_userWallet, _website);
    }

    function setUserAsDeactivated(address _userWallet) public {
        require(checkUserIsAdmin(tx.origin), "You're not an admin");
        users[userIds[_userWallet]].state = userStates.deactivated;
        emit UserDeactivated(_userWallet);
    }

    function setUserAsActive(address _userWallet) public {
        require(checkUserIsAdmin(tx.origin), "You're not an admin");
        users[userIds[_userWallet]].state = userStates.active;
        emit UserActivated(_userWallet);
    }

    function setUserAsAdmin(address _userWallet) public {
        require(checkUserIsAdmin(tx.origin), "You're not an admin");
        users[userIds[_userWallet]].state = userStates.admin;
        emit UserNewAdmin(_userWallet);
    }

    function checkUserExists(address _userWallet) public view returns (bool) {
        return userExists[_userWallet];
    }

    function checkUserIsAdmin(address _userWallet) public view returns (bool) {
        return users[userIds[_userWallet]].state == userStates.admin;
    }

    function checkUserIsActive(address _userWallet) public view returns (bool) {
        return users[userIds[_userWallet]].state == userStates.active;
    }

    function checkUserIsPending(address _userWallet)
        public
        view
        returns (bool)
    {
        return users[userIds[_userWallet]].state == userStates.pending;
    }

    function getNumberUsers() public view returns (uint256) {
        return numberOfUsers;
    }

    function getUserAddress(uint256 i) public view returns (address) {
        require(i < numberOfUsers, "Not a valid User ID");
        return users[i].userWallet;
    }
}
