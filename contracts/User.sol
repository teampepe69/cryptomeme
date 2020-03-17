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

    enum userStates {pending, active, deactivated, moderator, admin}

    uint256 public numberOfUsers = 0;

    struct User {
        uint256 userId;
        string name;
        string email;
        string username;
        string passwordHash;
        address userWallet;
        string displayPicturePath;
        userStates state;
    }

    User[] public users;

    event UserCreated(
        uint256 userId,
        string name,
        string email,
        string username,
        address userWallet,
        string displayPicturePath
    );

    event NameChanged(uint256 userId, string name);
    event UserEmailChanged(uint256 userId, string email);
    event UsernameChanged(uint256 userId, string username);
    event UserPasswordChanged(uint256 userId, string passwordHash);
    event UserWalletChanged(uint256 userId, address userWallet);
    event UserDisplayPictureChanged(uint256 userId, string displayPicturePath);
    event UserActivated(uint256 userId);
    event UserDeactivated(uint256 userId);
    event UserModeratored(uint256 userId);
    event UserBecameAdmin(uint256 userId);

    function createUser(
        string memory _name,
        string memory _email,
        string memory _username,
        string memory _passwordHash,
        address _userWallet,
        string memory _displayPicturePath
    ) public {
        User memory newUser = User(
            numberOfUsers,
            _name,
            _email,
            _username,
            _passwordHash,
            _userWallet,
            _displayPicturePath,
            userStates.pending
        );
        users.push(newUser);
        emit UserCreated(
            numberOfUsers,
            _name,
            _email,
            _username,
            _userWallet,
            _displayPicturePath
        );
        numberOfUsers = numberOfUsers.add(1);
    }

    function setName(uint256 _userId, string memory _name) public {
        users[_userId].name = _name;
        emit NameChanged(_userId, _name);
    }

    function setEmail(uint256 _userId, string memory _email) public {
        users[_userId].email = _email;
        emit UserEmailChanged(_userId, _email);
    }

    function setUsername(uint256 _userId, string memory _username) public {
        users[_userId].username = _username;
        emit UsernameChanged(_userId, _username);
    }

    function setUserPassword(uint256 _userId, string memory _passwordHash)
        public
    {
        users[_userId].passwordHash = _passwordHash;
        emit UserPasswordChanged(_userId, _passwordHash);
    }

    function setUserWallet(uint256 _userId, address _userWallet) public {
        users[_userId].userWallet = _userWallet;
        emit UserWalletChanged(_userId, _userWallet);
    }

    function setDisplayPicturePath(
        uint256 _userId,
        string memory _displayPicturePath
    ) public {
        users[_userId].displayPicturePath = _displayPicturePath;
        emit UserDisplayPictureChanged(_userId, _displayPicturePath);
    }

    function setUserAsDeactivated(uint256 _userId) public {
        users[_userId].state = userStates.deactivated;
        emit UserDeactivated(_userId);
    }

    function setUserAsActive(uint256 _userId) public {
        users[_userId].state = userStates.active;
        emit UserActivated(_userId);
    }

    function setUserAsModerator(uint256 _userId) public {
        users[_userId].state = userStates.moderator;
        emit UserModeratored(_userId);
    }

    function setUserAsAdmin(uint256 _userId) public {
        users[_userId].state = userStates.admin;
        emit UserBecameAdmin(_userId);
    }

    /*
    function getUserRole(address userAd) public view returns (string memory) {
        return getRoleKeyByValue(registered_Users[userAd].role);
    }

    function getRoleKeyByValue(userRoles r)
        internal
        pure
        returns (string memory)
    {
        // Error handling for input
        require(uint8(r) <= 3);

        // Loop through possible options
        if (userRoles.viewer == r) return "viewer";
        if (userRoles.contentCreator == r) return "contentCreator";
        if (userRoles.moderator == r) return "moderator";
    }
    

    function getUserStatus(address userAd) public view returns (string memory) {
        return getStatusKeyByValue(registered_Users[userAd].state);
    }

    function getStatusKeyByValue(userStates s)
        internal
        pure
        returns (string memory)
    {
        // Error handling for input
        require(uint8(s) <= 2);

        // Loop through possible options
        if (userStates.unregistered == s) return "unregistered";
        if (userStates.registered == s) return "registered";
    }

    function followUser(address userAd)
        public
        registeredUsersOnly
        alreadyFollowed(userAd)
    {
        alreadyFollowing[msg.sender][userAd] = true;
        following[msg.sender].push(userAd);
    }

    function getUserFollowing(address userAd)
        public
        view
        returns (address[] memory)
    {
        return following[userAd];
    }
    */

}
