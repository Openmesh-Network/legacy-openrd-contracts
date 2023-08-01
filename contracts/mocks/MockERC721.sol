// SPDX-License-Identifier: None
pragma solidity ^0.8.0;

import { ERC721 } from "@openzeppelin/contracts/token/ERC721/ERC721.sol";

/*
  Obviously this is not a contract that will be used in the actual platform, only for testing purposes.
*/
contract MockERC721 is ERC721 {
    constructor(string memory name_, string memory symbol_) ERC721(name_, symbol_) {

    }

    function grantToken(address account, uint256 tokenId) external {
        _mint(account, tokenId);
    }

    function burnToken(uint256 tokenId) external {
        _burn(tokenId);
    }
}