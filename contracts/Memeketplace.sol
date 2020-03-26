pragma solidity ^0.5.0;
import "./Meme.sol";
import "./User.sol";
import "../node_modules/@openzeppelin/contracts/math/SafeMath.sol";

contract MemeketPlace {
    using SafeMath for uint256;

    Meme memeContract;
    User userContract;

    mapping(uint256 => mapping(address => uint256)) public likes; // 0 means no like or dislike, 1 means like, 2 means dislike
    mapping(uint256 => mapping(address => bool)) public flags;

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
        if (likes[_memeId][msg.sender] == 1) {
            //This meme has already been liked before, so when they like again, it will unlike.
            memeContract.setMemeLikes(
                _memeId,
                memeContract.getMemeLikes(_memeId).sub(1)
            );
            likes[_memeId][msg.sender] = 0;
        } else if (likes[_memeId][msg.sender] == 2) {
            //This meme was intially dislike, so when they like, dislike should subtract
            memeContract.setMemeDislikes(
                _memeId,
                memeContract.getMemeDislikes(_memeId).sub(1)
            );
            memeContract.setMemeLikes(
                _memeId,
                memeContract.getMemeLikes(_memeId).add(1)
            );
            likes[_memeId][msg.sender] = 1;
        } else {
            //uint by default is 0
            memeContract.setMemeLikes(
                _memeId,
                memeContract.getMemeLikes(_memeId).add(1)
            );
            likes[_memeId][msg.sender] = 1;
        }

    }

    function dislikeMeme(uint256 _memeId) public {
        // require(likes[_memeId][msg.sender] != 2, "You have already disliked this meme");

        if (likes[_memeId][msg.sender] == 2) {
            //This meme has already been disliked before, so when they like again, it will undislike.
            memeContract.setMemeDislikes(
                _memeId,
                memeContract.getMemeDislikes(_memeId).sub(1)
            );
            likes[_memeId][msg.sender] = 0;
        } else if (likes[_memeId][msg.sender] == 1) {
            //This meme was intially liked, so when they dislike, like should subtract
            memeContract.setMemeLikes(
                _memeId,
                memeContract.getMemeLikes(_memeId).sub(1)
            );
            memeContract.setMemeDislikes(
                _memeId,
                memeContract.getMemeDislikes(_memeId).add(1)
            );
            likes[_memeId][msg.sender] = 2;
        } else {
            //uint by default is 0
            memeContract.setMemeDislikes(
                _memeId,
                memeContract.getMemeDislikes(_memeId).add(1)
            );
            likes[_memeId][msg.sender] = 2;
        }
    }

    // function removeLike(uint256 _memeId) public {
    //     require(likes[_memeId][msg.sender] == 1, "You have not liked this meme");
    //     likes[_memeId][msg.sender] == 0;
    //     memeContract.setMemeLikes(
    //         _memeId,
    //         memeContract.getMemeLikes(_memeId).sub(1)
    //     );
    // }

    // function removeDislike(uint256 _memeId) public {
    //     require(likes[_memeId][msg.sender] == 2, "You have not disliked this meme");
    //     likes[_memeId][msg.sender] == 0;
    //     memeContract.setMemeDislikes(
    //         _memeId,
    //         memeContract.getMemeLikes(_memeId).sub(1)
    //     );
    // }

    function flagMeme(uint256 _memeId) public {
        require(
            flags[_memeId][msg.sender] == false,
            "You have already flagged this meme"
        );
        flags[_memeId][msg.sender] == true;
        memeContract.setMemeFlags(
            _memeId,
            memeContract.getMemeFlags(_memeId).add(1)
        );
    }

    function getLikes(uint256 _memeId, address user)
        public
        view
        returns (uint256)
    {
        return likes[_memeId][user];
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
