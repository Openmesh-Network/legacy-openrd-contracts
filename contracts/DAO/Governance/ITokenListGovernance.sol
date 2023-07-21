// SPDX-License-Identifier: None
pragma solidity ^0.8.0;

interface ITokenListGovernance {
    /// @notice Adds new members to the token list.
    /// @param _members The Members of members to be added.
    /// @dev This function is used during the plugin initialization.
    function addMembers(
        uint256[] calldata _members
    ) external;

    /// @notice Removes existing members from the token list.
    /// @param _members The Members of the members to be removed.
    function removeMembers(
        uint256[] calldata _members
    ) external;
}