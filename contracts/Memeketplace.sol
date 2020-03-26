pragma solidity ^0.5.0;
import "./Meme.sol";
import "./User.sol";
import "../node_modules/@openzeppelin/contracts/math/SafeMath.sol";

contract MemeketPlace {
    using SafeMath for uint256;

    Meme memeContract;
    User userContract;

    constructor(Meme _memeContract, User _userContract) public {
        memeContract = _memeContract;
        userContract = _userContract;
    }

    function uploadMeme(
        address _memeOwner,
        string memory _memePath,
        string memory _memeTitle,
        string memory _memeDescription
    ) public {
        memeContract.createMeme(
            _memeOwner,
            _memePath,
            _memeTitle,
            _memeDescription
        );
    }

    function likeMeme(uint256 _memeId) public {
        memeContract.setMemeLikes(
            _memeId,
            memeContract.getMemeLikes(_memeId).add(1)
        );
    }

    function dislikeMeme(uint256 _memeId) public {
        memeContract.setMemeDislikes(
            _memeId,
            memeContract.getMemeDislikes(_memeId).add(1)
        );
    }

    function flagMeme(uint256 _memeId) public {
        memeContract.setMemeFlags(
            _memeId,
            memeContract.getMemeFlags(_memeId).add(1)
        );
    }

    function createUser(
        address _userWallet,
        string memory _username,
        string memory _about,
        string memory _displayPictureHash,
        string memory _diplayName,
        string memory _website
    ) public {
        userContract.createUser(
            _userWallet,
            _username,
            _about,
            _displayPictureHash,
            _diplayName,
            _website
        );
    }

    function updateUserProfile(
        address _userWallet,
        string memory _username,
        string memory _about,
        string memory _displayPictureHash,
        string memory _displayName,
        string memory _website
    ) public {
        userContract.setUsername(_userWallet, _username);
        userContract.setUserAbout(_userWallet, _about);
        userContract.setUserDisplayPicture(_userWallet, _displayPictureHash);
        userContract.setUserDisplayName(_userWallet, _displayName);
        userContract.setUserWebsite(_userWallet, _website);
    }

    function activateUser(address _userWallet) public {
        userContract.setUserAsActive(_userWallet);
    }

    function deactivateUser(address _userWallet) public {
        userContract.setUserAsDeactivated(_userWallet);
    }
}
