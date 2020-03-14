pragma solidity ^0.5.0;
import "./Meme.sol";

contract MemeketPlace {
    Meme memeContract;
    constructor(Meme _memeContract) public {
        memeContract = _memeContract;
    }

    function uploadMeme(address _memeOwner, string memory _pathToMeme) public {
        memeContract.createMeme(_memeOwner, _pathToMeme);
    }
}
