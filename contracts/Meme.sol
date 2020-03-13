pragma solidity ^0.5.0;
import "../node_modules/@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract Meme is ERC721 {
    using SafeMath for uint256;

    address contractOwner = msg.sender;

    uint256 numberOfMemes = 0;

    enum memeStates {approved, rejected, pending}

    struct Meme {
        uint256 numLikes,
        string memory memePath,
        memeStates memeState
    }

    Meme[] memes;

    event memeCreated(uint256 memeId, string memory memePath);

    function createMeme(address _memeOwner, string memory _pathToMeme) {
        Meme memory _meme = meme(numberOfMemes, 0, _pathToMeme, memeState.pending);
        uint256 _memeId = memes.push(_meme).sub(1);
        _mint(_memeOwner, _memeId);
        emit memeCreated(_memeId, _pathToMeme);
    }

    function getNumberLikes(uint256 _memeId) public view returns (uint256) {
        return memes[_memeId].numLikes;
    }

    function getMemeState(uint256 _memeId) public view returns {
        return memes[_memeId].memeState;
    }

    function getMemePath(uint256 _memeId) {
        return memes[_memeId].memePath;
    }

    function setMemeLikes(uint256 _memeId, uint256 _memeLikes) public {
        memes[_memeId].memeLikes = _memeLikes;
    }

    function approveMeme(uint256 _memeId) {
        memes[_memeId].memeState = memeStates.approved;
    } 

    function rejectMeme(uint256 _memeId) {
        memes[_memeId].memestate = memeStates.rejected;
    }

    function setMemePath(uint256 _memeId, string memory _memePath) {
        memes[_memeId].memePath = _memePath;
    }

}
