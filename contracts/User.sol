pragma solidity ^0.5.0;
import "../node_modules/@openzeppelin/contracts/math/SafeMath.sol";


contract User {
    using SafeMath for uint256;
    address contractOwner = msg.sender;

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

    /**
     * Ensures a unique user address is supplied
     */
    modifier uniqueUser(address _userWallet) {
        require(!userExists[_userWallet], "User already exists!");
        _;
    }

    /**
     * Ensures that meme owner is the one modifying meme contents
     */
    modifier isUser(address _userWallet) {
        require(
            tx.origin == _userWallet,
            "You must be the User of your own profile"
        );
        _;
    }

    /**
     * Ensures that function caller is an admin
     */
    modifier isAdmin() {
        require(
            checkUserIsAdmin(tx.origin),
            "You must be an admin to call this function"
        );
        _;
    }

    /**
     * Creates a default admin account
     */
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

    function getContractOwner() public returns (address) {
        return contractOwner;
    }

    /**
     * Creates a new user with supplied variables
     * Requirements:
     * - `_userwallet` supplied must be user's own address
     */
    function createUser(
        address _userWallet,
        string memory _about,
        string memory _displayPictureHash,
        string memory _displayName,
        string memory _website
    ) public isUser(_userWallet) uniqueUser(_userWallet) {
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

    /**
     * Update User's about description
     * Requirements:
     * - User calling this function has to be owner of user profile
     */
    function setUserAbout(address _userWallet, string memory _about)
        public
        isUser(_userWallet)
    {
        users[userIds[_userWallet]].about = _about;
        emit UserAboutChanged(_userWallet, _about);
    }

    /**
     * Update User's Display Picture
     * Requirements:
     * - User calling this function has to be owner of user profile
     */
    function setUserDisplayPicture(
        address _userWallet,
        string memory _displayPictureHash
    ) public isUser(_userWallet) {
        users[userIds[_userWallet]].displayPictureHash = _displayPictureHash;
        emit UserDisplayPictureChanged(_userWallet, _displayPictureHash);
    }

    /**
     * Update User's display name
     * Requirements:
     * - User calling this function has to be owner of user profile
     */
    function setUserDisplayName(address _userWallet, string memory _displayName)
        public
        isUser(_userWallet)
    {
        users[userIds[_userWallet]].displayName = _displayName;
        emit UserDisplayNameChanged(_userWallet, _displayName);
    }

    /**
     * Update User's website
     * Requirements:
     * - User calling this function has to be owner of user profile
     */
    function setUserWebsite(address _userWallet, string memory _website)
        public
        isUser(_userWallet)
    {
        users[userIds[_userWallet]].website = _website;
        emit UserWebsiteChanged(_userWallet, _website);
    }

    /**
     * Deactivate User
     * Requirements:
     * - User calling this function has to be an admin
     */
    function setUserAsDeactivated(address _userWallet) public isAdmin() {
        users[userIds[_userWallet]].state = userStates.deactivated;
        emit UserDeactivated(_userWallet);
    }

    /**
     * Activate User
     * Requirements:
     * - User calling this function has to be an admin
     */
    function setUserAsActive(address _userWallet) public isAdmin() {
        users[userIds[_userWallet]].state = userStates.active;
        emit UserActivated(_userWallet);
    }

    /**
     * Set user as admin
     * Requirements:
     * - User calling this function has to be an admin
     */
    function setUserAsAdmin(address _userWallet) public isAdmin() {
        users[userIds[_userWallet]].state = userStates.admin;
        emit UserNewAdmin(_userWallet);
    }

    /**
     * developers: Checks if a supplied `_userWallet` exists
     */
    function checkUserExists(address _userWallet) public view returns (bool) {
        return userExists[_userWallet];
    }

    /**
     * developers: Checks if a supplied `_userWallet` is an admin
     */
    function checkUserIsAdmin(address _userWallet) public view returns (bool) {
        return users[userIds[_userWallet]].state == userStates.admin;
    }

    /**
     * Checks if a supplied `_userWallet` is active
     */
    function checkUserIsActive(address _userWallet) public view returns (bool) {
        return users[userIds[_userWallet]].state == userStates.active;
    }

    /**
     * Checks if a supplied `_userWallet` is pending
     */
    function checkUserIsPending(address _userWallet)
        public
        view
        returns (bool)
    {
        return users[userIds[_userWallet]].state == userStates.pending;
    }

    /**
     * Returns total number of registered users
     */
    function getNumberUsers() public view returns (uint256) {
        return numberOfUsers;
    }

    /**
     * Returns a User Address given a supplied index `i`
     * Requirements:
     * - Supplied index `i` must be a valid index
     */
    function getUserAddress(uint256 i) public view returns (address) {
        require(i < numberOfUsers, "Not a valid User ID");
        return users[i].userWallet;
    }
}
