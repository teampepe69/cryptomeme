pragma solidity ^0.5.0;
import "../node_modules/@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract Meme is ERC721 {
    using SafeMath for uint256;

    address contractOwner = msg.sender;

    uint256 public numberOfMemes = 0;

    enum memeStates {approved, rejected, pending}

    struct Meme {
        uint256 memeId;
        uint256 memeLikes;
        string memePath;
        memeStates memeState;
    }

    Meme[] public memes;

    event MemeCreated(uint256 memeId, string memePath);
    event MemeLiked(uint256 memeId, uint256 memeLikes);
    event MemeApproved(uint256 memeId);
    event MemeRejected(uint256 memeId);
    event MemePathChanged(uint256 memeId, string memePath);

    function createMeme(address _memeOwner, string memory _pathToMeme)
        public
        returns (uint256)
    {
        Meme memory _meme = Meme(
            numberOfMemes,
            0,
            _pathToMeme,
            memeStates.pending
        );
        uint256 _memeId = memes.push(_meme).sub(1);
        _mint(_memeOwner, _memeId);
        numberOfMemes = numberOfMemes.add(1);
        emit MemeCreated(_memeId, _pathToMeme);
        return _memeId;
    }

    function getMemeLikes(uint256 _memeId) public view returns (uint256) {
        return memes[_memeId].memeLikes;
    }

    function getMemeState(uint256 _memeId) public view returns (memeStates) {
        return memes[_memeId].memeState;
    }

    function getMemePath(uint256 _memeId) public view returns (string memory) {
        return memes[_memeId].memePath;
    }

    function setMemeLikes(uint256 _memeId, uint256 _memeLikes) public {
        memes[_memeId].memeLikes = _memeLikes;
        emit MemeLiked(_memeId, _memeLikes);
    }

    function approveMeme(uint256 _memeId) public {
        memes[_memeId].memeState = memeStates.approved;
        emit MemeApproved(_memeId);
    }

    function rejectMeme(uint256 _memeId) public {
        memes[_memeId].memeState = memeStates.rejected;
        emit MemeRejected(_memeId);
    }

    function setMemePath(uint256 _memeId, string memory _memePath) public {
        memes[_memeId].memePath = _memePath;
        emit MemePathChanged(_memeId, _memePath);
    }

}
