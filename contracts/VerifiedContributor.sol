// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import {ERC721} from "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";

contract VerifiedContributor is ERC721, Ownable {
    constructor(
        string memory name_,
        string memory symbol_
    ) ERC721(name_, symbol_) {}

    function mint(address account, uint256 tokenId) external onlyOwner {
        _mint(account, tokenId);
    }

    function burn(uint256 tokenId) external onlyOwner {
        _burn(tokenId);
    }
}
