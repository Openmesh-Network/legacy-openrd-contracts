// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import {IDAO} from "@aragon/osx/core/dao/IDAO.sol";
import {DAO} from "@aragon/osx/core/dao/DAO.sol";
import {PermissionLib} from "@aragon/osx/core/permission/PermissionLib.sol";
import {PluginSetup, IPluginSetup} from "@aragon/osx/framework/plugin/setup/PluginSetup.sol";
import {SubDAO, MANAGE_SUBDAO_PERMISSION_ID} from "./SubDAO.sol";

contract SubDAOSetup is PluginSetup {
    /// @notice The address of `SubDAO` plugin logic contract to be used in creating proxy contracts.
    SubDAO private immutable subDAOBase;

    /// @notice The contract constructor, that deploys the `SubDAO` plugin logic contract.
    constructor() {
        subDAOBase = new SubDAO();
    }

    /// @inheritdoc IPluginSetup
    function prepareInstallation(
        address _dao,
        bytes calldata /*_data*/
    )
        external
        returns (address plugin, PreparedSetupData memory preparedSetupData)
    {
        // Prepare and Deploy the plugin proxy.
        plugin = createERC1967Proxy(
            address(subDAOBase),
            abi.encodeWithSelector(SubDAO.initialize.selector, _dao)
        );

        // Prepare permissions
        PermissionLib.MultiTargetPermission[]
            memory permissions = new PermissionLib.MultiTargetPermission[](1);

        // Set permissions to be granted.
        // Grant the list of permissions of the plugin to the DAO.
        // Grant `EXECUTE_PERMISSION` of the DAO to the plugin.
        permissions[0] = PermissionLib.MultiTargetPermission(
            PermissionLib.Operation.Grant,
            plugin,
            _dao,
            PermissionLib.NO_CONDITION,
            MANAGE_SUBDAO_PERMISSION_ID
        );

        preparedSetupData.permissions = permissions;
    }

    /// @inheritdoc IPluginSetup
    function prepareUninstallation(
        address _dao,
        SetupPayload calldata _payload
    )
        external
        pure
        returns (PermissionLib.MultiTargetPermission[] memory permissions)
    {
        // Prepare permissions
        permissions = new PermissionLib.MultiTargetPermission[](1);

        // Set permissions to be Revoked.
        permissions[0] = PermissionLib.MultiTargetPermission(
            PermissionLib.Operation.Revoke,
            _payload.plugin,
            _dao,
            PermissionLib.NO_CONDITION,
            MANAGE_SUBDAO_PERMISSION_ID
        );
    }

    /// @inheritdoc IPluginSetup
    function implementation() external view returns (address) {
        return address(subDAOBase);
    }
}
