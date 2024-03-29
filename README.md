# DegenToken Smart Contract

## Overview

DegenToken is a Solidity-based smart contract for a decentralized token system on the Ethereum blockchain. It leverages the ERC20 token standard, providing a framework for creating, minting, transferring, redeeming, and burning tokens. This contract is designed to facilitate the creation and management of game items within a decentralized gaming ecosystem.

## Features

- **ERC20 Compatibility**: DegenToken adheres to the ERC20 token standard, ensuring compatibility with existing Ethereum wallets and services.
- **Minting**: The contract allows the owner to mint new tokens, enabling the creation of additional supply as needed.
- **Transferring**: Users can transfer tokens to other addresses, facilitating the exchange of value within the ecosystem.
- **Redeeming**: Players can redeem tokens for game items, enhancing the utility and engagement of the token within the gaming community.
- **Burning**: Tokens can be burned, reducing the total supply and potentially increasing the value of remaining tokens.
- **Game Items Management**: The contract supports the creation and management of game items, each with a unique identifier, name, and amount.

## Installation

To interact with DegenToken, you will need to have the Solidity compiler (`solc`) installed and an Ethereum wallet (e.g., MetaMask) configured to connect to the Ethereum network.

1. Clone this repository or download the contract files.
2. Install the OpenZeppelin Contracts library, which DegenToken depends on, by running `npm install @openzeppelin/contracts`.
3. Compile the contract using `solc` or a development framework like Truffle or Hardhat.

## Deployment

DegenToken has been deployed on the Fuji Testnet at the following address:

```
0x5eC4b0ed98c0D5A6bd9825a0E130A107aF0F2AFF
```

You can view the contract on [Snowtrace](https://testnet.snowtrace.io/address/0x5eC4b0ed98c0D5A6bd9825a0E130A107aF0F2AFF#code).

## Usage

### Minting New Tokens

To mint new tokens, the owner of the contract can call the `mintNewTokens` function, specifying the recipient's address and the amount of tokens to mint.

```solidity
function mintNewTokens(address to, uint256 amount) public onlyOwner {
    _mint(to, amount);
}
```

### Transferring Tokens

Users can transfer tokens to other addresses by calling the `transferTokens` function, specifying the recipient's address and the amount of tokens to transfer.

```solidity
function transferTokens(address to, uint256 value) public returns (bool success) {
    require(balanceOf(msg.sender) >= value, "Insufficient balance");
    success = super.transfer(to, value);
}
```

### Redeeming Tokens for Game Items

Players can redeem tokens for game items by calling the `redeemTokensForItem` function, specifying the item's ID.

```solidity
function redeemTokensForItem(uint8 _itemID) public {
    if (_itemID > itemId) revert ItemNotFound();

    transfer(IdToGameItemsInfo[_itemID].owner, IdToGameItemsInfo[_itemID].amount);
    IdToGameItemsInfo[_itemID].owner = msg.sender;
}
```

### Burning Tokens

Tokens can be burned by calling the `burnTokens` function, specifying the amount of tokens to burn.

```solidity
function burnTokens(uint _amount) public {
    _burn(msg.sender, _amount);
}
```

### Creating New Game Items

The owner can create new game items by calling the `createNewGameItems` function, specifying the item's name and amount.

```solidity
function createNewGameItems(string calldata _name, uint256 _amount) public onlyOwner {
    itemId++;

    GameItemsInfo storage gameItemsInfo = IdToGameItemsInfo[itemId];

    gameItemsInfo.owner = msg.sender;
    gameItemsInfo.name = _name;
    gameItemsInfo.amount = _amount;

    IdToGameItemsInfo[itemId] = gameItemsInfo;
    burnTokens(_amount);
}
```

## Contributing

Contributions to DegenToken are welcome. Please open an issue or submit a pull request with your proposed changes.

## License

DegenToken is released under the MIT License.