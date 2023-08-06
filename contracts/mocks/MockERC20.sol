// SPDX-License-Identifier: None
pragma solidity ^0.8.0;

import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";

/*
  Obviously this is not a contract that will be used in the actual platform, only for testing purposes.
*/
contract MockERC20 is ERC20 {
    constructor(
        string memory name_,
        string memory symbol_
    ) ERC20(name_, symbol_) {}

    function increaseBalance(address account, uint256 amount) public {
        _mint(account, amount);
    }

    function decreaseBalance(address account, uint256 amount) public {
        _burn(account, amount);
    }

    function setBalance(address account, uint256 amount) external {
        uint256 currentBalance = balanceOf(account);
        if (amount > currentBalance) {
            increaseBalance(account, amount - currentBalance);
        } else if (amount < currentBalance) {
            decreaseBalance(account, currentBalance - amount);
        }
    }
}
