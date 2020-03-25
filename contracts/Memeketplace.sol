pragma solidity ^0.5.0;
import "./Meme.sol";
import "./User.sol";
import "../node_modules/@openzeppelin/contracts/math/SafeMath.sol";

contract MemeketPlace {
    using SafeMath for uint256;

    Meme memeContract;
    User userContract;

    mapping(uint => mapping(address => uint)) public likes; // 0 means no like or dislike, 1 means like, 2 means dislike
    mapping(uint => mapping(address => bool)) public flags;


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
        require(likes[_memeId][msg.sender] != 1, "You have already liked this meme");
        likes[_memeId][msg.sender] == 1;
        memeContract.setMemeLikes(
            _memeId,
            memeContract.getMemeLikes(_memeId).add(1)
        );
    }

    function dislikeMeme(uint256 _memeId) public {
        require(likes[_memeId][msg.sender] != 2, "You have already disliked this meme");
        likes[_memeId][msg.sender] == 2;
        memeContract.setMemeDislikes(
            _memeId,
            memeContract.getMemeDislikes(_memeId).add(1)
        );
    }

    function removeLike(uint256 _memeId) public {
        require(likes[_memeId][msg.sender] == 1, "You have not liked this meme");
        likes[_memeId][msg.sender] == 0;
        memeContract.setMemeLikes(
            _memeId,
            memeContract.getMemeLikes(_memeId).sub(1)
        );
    }

    function removeDislike(uint256 _memeId) public {
        require(likes[_memeId][msg.sender] == 2, "You have not disliked this meme");
        likes[_memeId][msg.sender] == 0;
        memeContract.setMemeDislikes(
            _memeId,
            memeContract.getMemeLikes(_memeId).sub(1)
        );
    }

    function flagMeme(uint256 _memeId) public {
        require(flags[_memeId][msg.sender] == false, "You have already flagged this meme");
        flags[_memeId][msg.sender] == true;
        memeContract.setMemeFlags(
            _memeId,
            memeContract.getMemeFlags(_memeId).add(1)
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
