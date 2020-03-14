pragma solidity ^0.5.0;
import "./Meme.sol";
import "../node_modules/@openzeppelin/contracts/math/SafeMath.sol";

contract MemeketPlace {
    using SafeMath for uint256;

    Meme memeContract;
    constructor(Meme _memeContract) public {
        memeContract = _memeContract;
    }

    function uploadMeme(address _memeOwner, string memory _pathToMeme) public {
        memeContract.createMeme(_memeOwner, _pathToMeme);
    }

    function likeMeme(uint256 _memeId) public {
        memeContract.setMemeLikes(
            _memeId,
            memeContract.getMemeLikes(_memeId).add(1)
        );
    }
}
