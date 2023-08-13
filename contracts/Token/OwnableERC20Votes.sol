// SPDX-License-Identifier: None
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Votes.sol";
import {ERC165} from "@openzeppelin/contracts/utils/introspection/ERC165.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";

contract OwnableERC20Votes is ERC20Votes, ERC165, Ownable {
    constructor(
        string memory name_,
        string memory symbol_
    ) ERC20(name_, symbol_) ERC20Permit(name_) {}

    /// @notice Checks if this or the parent contract supports an interface by its ID.
    /// @param _interfaceId The ID of the interface.
    /// @return Returns `true` if the interface is supported.
    function supportsInterface(
        bytes4 _interfaceId
    ) public view virtual override returns (bool) {
        return
            _interfaceId == type(IERC20).interfaceId ||
            _interfaceId == type(IERC20Metadata).interfaceId ||
            _interfaceId == type(IERC20Permit).interfaceId ||
            _interfaceId == type(IVotes).interfaceId ||
            super.supportsInterface(_interfaceId);
    }

    /// @notice Mints tokens to an address.
    /// @param to The address receiving the tokens.
    /// @param amount The amount of tokens to be minted.
    function mint(address to, uint256 amount) external virtual onlyOwner {
        _mint(to, amount);
    }

    /// @notice Burns tokens from an address.
    /// @param from The address losing the tokens.
    /// @param amount The amount of tokens to be burned.
    function burn(address from, uint256 amount) external virtual onlyOwner {
        _burn(from, amount);
    }

    // https://forum.openzeppelin.com/t/self-delegation-in-erc20votes/17501/12?u=novaknole
    /// @inheritdoc ERC20Votes
    function _afterTokenTransfer(
        address from,
        address to,
        uint256 amount
    ) internal override {
        super._afterTokenTransfer(from, to, amount);

        // Automatically turn on delegation on mint/transfer but only for the first time.
        if (
            to != address(0) &&
            numCheckpoints(to) == 0 &&
            delegates(to) == address(0)
        ) {
            _delegate(to, to);
        }
    }
}
