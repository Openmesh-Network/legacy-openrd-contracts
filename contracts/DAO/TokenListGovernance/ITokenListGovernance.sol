// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface ITokenListGovernance {
    error TokenNotBurned(uint256 id);

    /// @notice Adds new members to the token list.
    /// @param _members The tokens to be added.
    /// @dev This function is used during the plugin initialization.
    function addMembers(uint256[] calldata _members) external;

    /// @notice Removes existing members from the token list.
    /// @param _members The tokens to be removed.
    function removeMembers(uint256[] calldata _members) external;

    /// @notice Removes burned tokens from the token list.
    /// @param _members The bruned token to be removed.
    function removeBurned(uint256[] calldata _members) external;
}
