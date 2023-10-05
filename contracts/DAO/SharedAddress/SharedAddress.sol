// SPDX-License-Identifier: MIT
pragma solidity 0.8.17; // For verification, the setup contract (deployer) is fixed on 0.8.17

import {PluginUUPSUpgradeable} from "@aragon/osx/core/plugin/PluginUUPSUpgradeable.sol";
import {IHats} from "../../Deps/hats-protocol/Interfaces/IHats.sol";
import {ISharedAddress, IDAO, GRANT_ACCESS_PERMISSION_ID, REVOKE_ACCESS_PERMISSION_ID} from "./ISharedAddress.sol";

contract SharedAddress is PluginUUPSUpgradeable, ISharedAddress {
    uint256 private daoNonce;
    IHats private hats; // Should work for any ERC-1155 collection though
    mapping(uint256 => bool) private fullAccess;
    mapping(address => mapping(uint256 => bool)) private fullZoneAccess;
    mapping(uint256 => mapping(uint256 => bool)) private fullFunctionAccess;

    modifier wearingHat(uint256 _hat) {
        if (hats.balanceOf(msg.sender, _hat) == 0) {
            revert NotWearingHat();
        }
        _;
    }

    /// @notice Initialize the TaskDisputes plugin.
    /// @param _dao The dao where this plugin is installed.
    /// @param _hats The deployment of Hats Protocol to use.
    function initialize(IDAO _dao, IHats _hats) external initializer {
        __PluginUUPSUpgradeable_init(_dao);
        hats = _hats;
    }

    /// @inheritdoc PluginUUPSUpgradeable
    function supportsInterface(
        bytes4 _interfaceId
    ) public view virtual override returns (bool) {
        return
            _interfaceId == type(ISharedAddress).interfaceId ||
            super.supportsInterface(_interfaceId);
    }

    /// @inheritdoc ISharedAddress
    function hasAccess(
        uint256 _hat,
        IDAO.Action[] calldata _actions
    ) public view returns (bool) {
        if (!fullAccess[_hat]) {
            for (uint i; i < _actions.length; ) {
                if (!_hasAccess(_hat, _actions[i])) {
                    return false;
                }

                unchecked {
                    ++i;
                }
            }
        }
        return true;
    }

    /// @inheritdoc ISharedAddress
    function asDAO(
        uint256 _hat,
        IDAO.Action[] calldata _actions,
        uint256 _failureMap
    )
        external
        wearingHat(_hat)
        returns (bytes[] memory returnValueBytes, uint256 failureMap)
    {
        if (!hasAccess(_hat, _actions)) {
            revert AccessDenied();
        }

        (returnValueBytes, failureMap) = dao().execute(
            bytes32(daoNonce),
            _actions,
            _failureMap
        );
        emit Execution(daoNonce, msg.sender, _hat, _actions);
        ++daoNonce;
    }

    /// @inheritdoc ISharedAddress
    function grantFullAccess(
        uint256 _hat
    ) external auth(GRANT_ACCESS_PERMISSION_ID) {
        fullAccess[_hat] = true;
        emit FullAccessGranted(_hat);
    }

    /// @inheritdoc ISharedAddress
    function grantFullZoneAccess(
        uint256 _hat,
        address _zone
    ) external auth(GRANT_ACCESS_PERMISSION_ID) {
        fullZoneAccess[_zone][_hat] = true;
        emit FullZoneAccessGranted(_hat, _zone);
    }

    /// @inheritdoc ISharedAddress
    function grantFullFunctionAccess(
        uint256 _hat,
        address _zone,
        bytes4 _function
    ) external auth(GRANT_ACCESS_PERMISSION_ID) {
        fullFunctionAccess[_functionId(_zone, _function)][_hat] = true;
        emit FullFunctionAccessGranted(_hat, _zone, _function);
    }

    /// @inheritdoc ISharedAddress
    function revokeFullAccess(
        uint256 _hat
    ) external auth(REVOKE_ACCESS_PERMISSION_ID) {
        fullAccess[_hat] = false;
        emit FullAccessRevoked(_hat);
    }

    /// @inheritdoc ISharedAddress
    function revokeFullZoneAccess(
        uint256 _hat,
        address _zone
    ) external auth(REVOKE_ACCESS_PERMISSION_ID) {
        fullZoneAccess[_zone][_hat] = false;
        emit FullZoneAccessRevoked(_hat, _zone);
    }

    /// @inheritdoc ISharedAddress
    function revokeFullFunctionAccess(
        uint256 _hat,
        address _zone,
        bytes4 _function
    ) external auth(REVOKE_ACCESS_PERMISSION_ID) {
        fullFunctionAccess[_functionId(_zone, _function)][_hat] = false;
        emit FullFunctionAccessRevoked(_hat, _zone, _function);
    }

    function _hasAccess(
        uint256 _hat,
        IDAO.Action calldata _action
    ) internal view returns (bool) {
        return
            fullZoneAccess[_action.to][_hat] ||
            fullFunctionAccess[_functionId(_action.to, bytes4(_action.data))][
                _hat
            ];
    }

    // address + function selector
    function _functionId(
        address _zone,
        bytes4 _function
    ) internal pure returns (uint256) {
        return (uint160(bytes20(_zone)) << 32) + uint32(_function);
    }

    /// @dev This empty reserved space is put in place to allow future versions to add new
    /// variables without shifting down storage in the inheritance chain.
    /// https://docs.openzeppelin.com/contracts/4.x/upgradeable#storage_gaps
    uint256[50] private __gap;
}
