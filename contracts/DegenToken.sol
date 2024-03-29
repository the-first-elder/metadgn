// SPDX-License-Identifier: MIT
pragma solidity 0.8.20;
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract DegenToken is ERC20 {
    address public immutable owner;
    uint itemId;

    struct GameItemsInfo {
        address owner;
        string name;
        uint256 amount;
    }

    mapping(uint => GameItemsInfo) public IdToGameItemsInfo;

    constructor() ERC20("Degen", "DGN") {
        owner = msg.sender;
        _mint(address(this), 10e18);
    }

    error NotOwner();
    error InsufficientBalance();
    error ItemNotFound();

    modifier onlyOwner() {
        if (msg.sender != owner) revert NotOwner();
        _;
    }

    // MINTING NEW TOKENS
    function mintNewTokens(address to, uint256 amount) public onlyOwner {
        _mint(to, amount);
    }

    // TRANSFERRING TOKENS
    function transferTokens(
        address to,
        uint256 value
    ) public returns (bool success) {
        require(balanceOf(msg.sender) >= value, "Insufficient balance");
        success = super.transfer(to, value);
    }

    // REDEEMING TOKENS
    function redeemTokensForItem(uint8 _itemID) public {
        if (_itemID > itemId) revert ItemNotFound();

        transfer(
            IdToGameItemsInfo[_itemID].owner,
            IdToGameItemsInfo[_itemID].amount
        );
        IdToGameItemsInfo[_itemID].owner = msg.sender;
    }

    // CHECKING TOKEN BALANCE
    function checkTokenBalance(
        address _account
    ) public view returns (uint256) {
        return super.balanceOf(_account);
    }

    // BURNING TOKENS
    function burnTokens(uint _amount) public {
        // checks that balance is not greater that amount
        // if (balanceOf(msg.sender) < _amount) revert InsufficientBalance();
        _burn(msg.sender, _amount);
    }

    function createNewGameItems(
        string calldata _name,
        uint256 _amount
    ) public onlyOwner {
        itemId++;

        GameItemsInfo storage gameItemsInfo = IdToGameItemsInfo[itemId];

        gameItemsInfo.owner = msg.sender;
        gameItemsInfo.name = _name;
        gameItemsInfo.amount = _amount;

        IdToGameItemsInfo[itemId] = gameItemsInfo;
    }
}

