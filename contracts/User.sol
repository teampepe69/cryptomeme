pragma solidity ^0.5.0;
import "../node_modules/@openzeppelin/contracts/math/SafeMath.sol";

contract User {
    using SafeMath for uint256;
    address admin = msg.sender;

    enum userStates {unregistered, registered}
    enum userRoles {viewer, contentCreator, moderator, admin}

    struct user {
        address eWalletAd;
        userStates state;
        userRoles role;
    }

    mapping(address => user) registered_Users;

    mapping(address => mapping(address => bool)) likes;
    mapping(address => address[]) following;
    mapping(address => mapping(address => bool)) alreadyFollowing;

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

    function createUser(address userAd, address eWallet) public adminOnly {
        user memory newUser = user(
            eWallet,
            userStates.registered,
            userRoles.viewer
        );
        registered_Users[userAd] = newUser;
    }

    function editUserWallet(address userAd, address eWallet)
        public
        specificUserOnly(userAd)
    {
        registered_Users[userAd].eWalletAd = eWallet;
    }

    function deactivateUser(address userAd) public adminOnly {
        registered_Users[userAd].state = userStates.unregistered;
    }

    function registerModerator(address userAd) public adminOnly {
        registered_Users[userAd].role = userRoles.moderator;
    }

    function removeModerator(address userAd) public adminOnly {
        registered_Users[userAd].role = userRoles.contentCreator;
    }

    function registerContentCreator(address userAd) public adminOnly {
        registered_Users[userAd].role = userRoles.contentCreator;
    }

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
}
