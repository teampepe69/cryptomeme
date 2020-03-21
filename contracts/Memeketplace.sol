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

    function createUser(
        string memory _name,
        string memory _email,
        string memory _username,
        string memory _passwordHash,
        address _userWallet,
        string memory _displayPicturePath
    ) public {
        userContract.createUser(
            _name,
            _email,
            _username,
            _passwordHash,
            _userWallet,
            _displayPicturePath
        );
    }
}
