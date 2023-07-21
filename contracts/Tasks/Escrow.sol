// SPDX-License-Identifier: None
pragma solidity ^0.8.0;

import { IERC20 } from "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract Escrow {
    error AlreadyInitialized();
    error NotOwner();

    address private owner;

    function __Escrow_init() external {
        if (owner != address(0)) {
            revert AlreadyInitialized();
        }
        
        owner = msg.sender;
    }

    function transfer(IERC20 token, address to, uint256 amount) external {
        if (msg.sender != owner) {
            revert NotOwner();
        }

        token.transfer(to, amount);
    }
}