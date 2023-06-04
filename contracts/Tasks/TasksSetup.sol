// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

import { PermissionLib } from "@aragon/osx/core/permission/PermissionLib.sol";
import { PluginSetup } from "@aragon/osx/framework/plugin/setup/PluginSetup.sol";
import { DAO } from "@aragon/osx/core/dao/DAO.sol";

import { Tasks } from "./Tasks.sol";

contract TasksSetup is PluginSetup {
  function prepareInstallation(
    address _dao,
    bytes memory/* _data*/
  ) external returns (address plugin, PreparedSetupData memory preparedSetupData) {
    Tasks pluginInstace = new Tasks(DAO(payable(_dao)));
    plugin = address(pluginInstace);

    // Prepare permissions
    PermissionLib.MultiTargetPermission[]
        memory permissions = new PermissionLib.MultiTargetPermission[](2);

    // Set plugin permissions to be granted.
    // Grant the list of permissions of the plugin to the DAO.
    permissions[0] = PermissionLib.MultiTargetPermission(
        PermissionLib.Operation.Grant,
        plugin,
        _dao,
        PermissionLib.NO_CONDITION,
        pluginInstace.MANAGE_TASKS_PERMISSION_ID()
    );

    permissions[1] = PermissionLib.MultiTargetPermission(
        PermissionLib.Operation.Grant,
        plugin,
        _dao,
        PermissionLib.NO_CONDITION,
        pluginInstace.ADMIN_WITHDRAWAL_PERMISSION_ID()
    );

    preparedSetupData.permissions = permissions;
  }

  function prepareUninstallation(
    address _dao,
    SetupPayload calldata _payload
  ) external view returns (PermissionLib.MultiTargetPermission[] memory permissions) {
    Tasks pluginInstace = Tasks(_payload.plugin);
    permissions = new PermissionLib.MultiTargetPermission[](2);

    // Remove the list of permissions of the plugin from the DAO.
    permissions[0] = PermissionLib.MultiTargetPermission(
        PermissionLib.Operation.Revoke,
        _payload.plugin,
        _dao,
        PermissionLib.NO_CONDITION,
        pluginInstace.MANAGE_TASKS_PERMISSION_ID()
    );

    permissions[1] = PermissionLib.MultiTargetPermission(
        PermissionLib.Operation.Revoke,
        _payload.plugin,
        _dao,
        PermissionLib.NO_CONDITION,
        pluginInstace.ADMIN_WITHDRAWAL_PERMISSION_ID()
    );
  }

  function implementation() external view returns (address) {}
}
