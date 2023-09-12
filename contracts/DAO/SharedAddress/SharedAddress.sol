// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import {PluginUUPSUpgradeable, IDAO} from "@aragon/osx/core/plugin/PluginUUPSUpgradeable.sol";
import {AccessControlUpgradeable} from "@openzeppelin/contracts-upgradeable/access/AccessControlUpgradeable.sol";

import {ISharedAddress} from "./ISharedAddress.sol";

contract SharedAddress is PluginUUPSUpgradeable, ISharedAddress {
    error AccessDenied(address account, IDAO.Action action);

    uint256 private daoNonce;
    mapping(address => bool) private fullAccess;
    mapping(address => mapping(address => bool)) private fullZoneAccess;
    mapping(uint256 => mapping(address => bool)) private fullFunctionAccess;

    /// @notice Initialize the TaskDisputes plugin.
    /// @param _dao The dao where this plugin is installed.
    /// @param _admin The account that decides who is allowed to do what. This can be another DAO or a different governance plugin / the DAO itself.
    function initialize(IDAO _dao, address _admin) external initializer {
        __PluginUUPSUpgradeable_init(_dao);
        fullAccess[_admin] = true;
    }

    /// @inheritdoc PluginUUPSUpgradeable
    function supportsInterface(
        bytes4 _interfaceId
    ) public view virtual override returns (bool) {
        return
            _interfaceId == type(ISharedAddress).interfaceId ||
            super.supportsInterface(_interfaceId);
    }

    function hasAccess(
        address _account,
        IDAO.Action calldata _action
    ) public view returns (bool) {
        return
            fullAccess[_account] ||
            fullZoneAccess[_action.to][_account] ||
            fullFunctionAccess[_functionId(_action)][_account];
    }

    function asDAO(
        IDAO.Action[] calldata _actions,
        uint256 _failureMap
    ) external returns (bytes[] memory, uint256) {
        for (uint i; i < _actions.length; ) {
            if (!hasAccess(msg.sender, _actions[i])) {
                revert AccessDenied(msg.sender, _actions[i]);
            }

            unchecked {
                ++i;
            }
        }

        return dao().execute(bytes32(daoNonce++), _actions, _failureMap);
    }

    function grantFullAccess(address _account) external {
        // check permission

        fullAccess[_account] = true;
    }

    function grantFullZoneAccess(address _account, address _zone) external {
        // check permission

        fullZoneAccess[_zone][_account] = true;
    }

    function grantFullFunctionAccess(
        address _account,
        address _zone,
        bytes4 _function
    ) external {
        // check permission

        fullFunctionAccess[(uint160(bytes20(_zone)) << 32) + uint32(_function)][
            _account
        ] = true;
    }

    // address + function selector
    function _functionId(
        IDAO.Action calldata _action
    ) internal pure returns (uint256) {
        return
            (uint160(bytes20(_action.to)) << 32) + uint32(bytes4(_action.data));
    }
}
