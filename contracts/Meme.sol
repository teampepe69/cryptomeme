pragma solidity ^0.5.0;
import "../node_modules/@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract Meme is ERC721 {
    using SafeMath for uint256;

    address contractOwner = msg.sender;

    uint256 numberOfMemes = 0;

    enum memeStates {approved, rejected, pending}

    struct Meme {
        uint256 numLikes;
        string memePath;
        memeStates memeState;
    }

    Meme[] memes;

    event memeCreated(uint256 memeId, string memePath);

    function createMeme(address _memeOwner, string memory _pathToMeme) public {
        Meme memory _meme = Meme(
            numberOfMemes,
            _pathToMeme,
            memeStates.pending
        );
        uint256 _memeId = memes.push(_meme).sub(1);
        _mint(_memeOwner, _memeId);
        numberOfMemes = numberOfMemes.add(1);
        emit memeCreated(_memeId, _pathToMeme);
    }

    function getNumberLikes(uint256 _memeId) public view returns (uint256) {
        return memes[_memeId].numLikes;
    }

    function getMemeState(uint256 _memeId) public view returns (memeStates) {
        return memes[_memeId].memeState;
    }

    function getMemePath(uint256 _memeId) public view returns (string memory) {
        return memes[_memeId].memePath;
    }

    function setMemeLikes(uint256 _memeId, uint256 _memeLikes) public {
        memes[_memeId].numLikes = _memeLikes;
    }

    function approveMeme(uint256 _memeId) public {
        memes[_memeId].memeState = memeStates.approved;
    }

    function rejectMeme(uint256 _memeId) public {
        memes[_memeId].memeState = memeStates.rejected;
    }

    function setMemePath(uint256 _memeId, string memory _memePath) public {
        memes[_memeId].memePath = _memePath;
    }

}
