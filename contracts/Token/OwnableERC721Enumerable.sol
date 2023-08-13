// SPDX-License-Identifier: None
pragma solidity ^0.8.0;

import {ERC721Enumerable, ERC721} from "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";

contract OwnableERC721Enumerable is ERC721Enumerable, Ownable {
    constructor(
        string memory name_,
        string memory symbol_
    ) ERC721(name_, symbol_) {}

    /// @notice Mints a token to an address.
    /// @param to The address receiving the token.
    /// @param tokenId The id of the token to be minted.
    function mint(address to, uint256 tokenId) external virtual onlyOwner {
        _mint(to, tokenId);
    }

    /// @notice Burns a token.
    /// @param tokenId The id of the token to be burned.
    function burn(uint256 tokenId) external virtual onlyOwner {
        _burn(tokenId);
    }
}
