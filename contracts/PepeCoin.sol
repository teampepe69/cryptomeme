pragma solidity ^0.5.0;
import "../node_modules/@openzeppelin/contracts/token/ERC20/ERC20.sol";


contract PepeCoin is ERC20{
    
    using SafeMath for uint256;
    address contractOwner = msg.sender;
    uint256 amountCreation = 100;
    uint256 amountLike = 1;

    function mintUserCreation(address _address) public {
        
        _mint(_address,amountCreation);
    }

    function burnBalance(address _address) public {
        
        _burn(_address,balanceOf(_address));
    }

    function reactToMeme(address _address) public {
        
        transfer(_address,amountLike);
    }

    function getBalance(address _address) public view returns(uint256){
        return(balanceOf(_address));
    }

}