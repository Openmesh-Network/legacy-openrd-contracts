// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import {IDAO} from "@aragon/osx/core/dao/IDAO.sol";

bytes32 constant GRANT_ACCESS_PERMISSION_ID = keccak256(
    "GRANT_ACCESS_PERMISSION"
);
bytes32 constant REVOKE_ACCESS_PERMISSION_ID = keccak256(
    "REVOKE_ACCESS_PERMISSION"
);

interface ISharedAddress {
    error NotWearingHat();
    error AccessDenied();

    event Execution(
        uint256 indexed nonce,
        address indexed sender,
        uint256 hat,
        IDAO.Action[] actions
    );

    event FullAccessGranted(uint256 indexed hat);
    event FullZoneAccessGranted(uint256 indexed hat, address zone);
    event FullFunctionAccessGranted(
        uint256 indexed hat,
        address zone,
        bytes4 functionSelector
    );

    event FullAccessRevoked(uint256 indexed hat);
    event FullZoneAccessRevoked(uint256 indexed hat, address zone);
    event FullFunctionAccessRevoked(
        uint256 indexed hat,
        address zone,
        bytes4 functionSelector
    );

    /// @notice Verifies if a hat is allowed to execute a list of actions.
    /// @param _hat The hat to check with.
    /// @param _actions The actions to check.
    /// @dev Only a single hat means that a user holding multiple hats might need to split their actions into one batch per hat.
    function hasAccess(
        uint256 _hat,
        IDAO.Action[] calldata _actions
    ) external view returns (bool);

    /// @notice Executes a list of actions as the DAO.
    /// @param _hat The hat to use for validations the actions are allowed.
    /// @param _actions The actions to execute.
    /// @param _failureMap Which actions are allowed to fail without reverting the whole transaction.
    function asDAO(
        uint256 _hat,
        IDAO.Action[] calldata _actions,
        uint256 _failureMap
    ) external returns (bytes[] memory, uint256);

    /// @notice Grants a hat the permission to do any action.
    /// @param _hat The hat that is granted the permission.
    function grantFullAccess(uint256 _hat) external;

    /// @notice Grants a hat the permission to call all functions of one smart contract.
    /// @param _hat The hat that is granted the permission.
    /// @param _zone The address of the smart contract.
    function grantFullZoneAccess(uint256 _hat, address _zone) external;

    /// @notice Grants a hat the permission to call one function of one smart contract.
    /// @param _hat The hat that is granted the permission.
    /// @param _zone The address of the smart contract.
    /// @param _function The function of the smart contract.
    function grantFullFunctionAccess(
        uint256 _hat,
        address _zone,
        bytes4 _function
    ) external;

    /// @notice Revokes a hat the permission to do any action.
    /// @param _hat The hat that is granted the permission.
    function revokeFullAccess(uint256 _hat) external;

    /// @notice Revokes a hat the permission to call all functions of one smart contract.
    /// @param _hat The hat that is granted the permission.
    /// @param _zone The address of the smart contract.
    function revokeFullZoneAccess(uint256 _hat, address _zone) external;

    /// @notice Revokes a hat the permission to call one function of one smart contract.
    /// @param _hat The hat that is granted the permission.
    /// @param _zone The address of the smart contract.
    /// @param _function The function of the smart contract.
    function revokeFullFunctionAccess(
        uint256 _hat,
        address _zone,
        bytes4 _function
    ) external;
}
