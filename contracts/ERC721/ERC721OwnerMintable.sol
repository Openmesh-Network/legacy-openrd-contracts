// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

import { IERC721Mintable } from "./IERC721Mintable.sol";
import { ERC721Enumerable, ERC721 } from "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import { Ownable } from "@openzeppelin/contracts/access/Ownable.sol"; 

contract ERC721OwnerMintable is ERC721Enumerable, Ownable, IERC721Mintable {
    constructor(string memory name_, string memory symbol_) ERC721(name_, symbol_) {

    }

    function mint(address to) external virtual override onlyOwner {
        _safeMint(to, totalSupply());
    }
}
