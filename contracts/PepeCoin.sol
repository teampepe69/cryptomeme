pragma solidity ^0.5.0;
import "../node_modules/@openzeppelin/contracts/token/ERC20/ERC20.sol";


contract PepeCoin is ERC20 {
    using SafeMath for uint256;
    address contractOwner = msg.sender;

    function mintPepeCoins(address _address, uint256 _amountToMint) public {
        _mint(_address, _amountToMint);
    }
}
