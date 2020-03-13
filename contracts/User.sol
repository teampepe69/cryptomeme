pragma solidity ^0.5.0;

contract User {

    address admin = msg.sender;

    enum userState {unregistered, registered}
    enum userRole {viewer, contentCreator, moderator}
    
    
    struct user {
        address eWalletAd;
        userState state;
        userRole role;
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

    modifier registeredUsersOnly () {
        require(registered_Users[msg.sender].state == userState.registered, "Restricted to registered users only");
        _;
    }

    modifier specificUserOnly(address userAd) {
        require(msg.sender == userAd, "Restricted to user only");
        _;
    }

    modifier alreadyFollowed(address userAd) {
        require(alreadyFollowing[msg.sender][userAd] == true , "User already followed");
        _;
    }
    
    function createUser(address userAd, address eWallet) public adminOnly {

        user memory newUser = user(
            eWallet,
            userState.registered,
            userRole.viewer
        );
        registered_Users[userAd] = newUser;
    }

    function editUserWallet(address userAd, address eWallet) public specificUserOnly(userAd) {
        registered_Users[userAd].eWalletAd = eWallet;
    }


    function deactivateUser(address userAd) public adminOnly {
        registered_Users[userAd].state = userState.unregistered;
    }

    function registerModerator(address userAd) public adminOnly{
        registered_Users[userAd].role = userRole.moderator;
    }

    function removeModerator(address userAd) public adminOnly{
        registered_Users[userAd].role = userRole.contentCreator;
    }

    function registerContentCreator(address userAd) public adminOnly{
        registered_Users[userAd].role = userRole.contentCreator;
    }

    function getUserRole(address userAd) public view returns (string memory){
        return getRoleKeyByValue(registered_Users[userAd].role);
    }

    function getRoleKeyByValue(userRole r) internal pure returns (string memory) {
        // Error handling for input
        require(uint8(r) <= 3);
            
        // Loop through possible options
        if (userRole.viewer == r) return "viewer";
        if (userRole.contentCreator == r) return "contentCreator";
        if (userRole.moderator == r) return "moderator";
    }

    function getUserStatus(address userAd) public view returns (string memory){
        return getStatusKeyByValue(registered_Users[userAd].state);
    }

    function getStatusKeyByValue(userState s) internal pure returns (string memory) {

        // Error handling for input
        require(uint8(s) <= 2);

        // Loop through possible options
        if (userState.unregistered == s) return "unregistered";
        if (userState.registered == s) return "registered";
    }

    function followUser(address userAd) public registeredUsersOnly alreadyFollowed(userAd) {
        alreadyFollowing[msg.sender][userAd] = true;
        following[msg.sender].push(userAd);
    }

    function getUserFollowing(address userAd) public view returns (address[] memory){
        return following[userAd];
    }
}