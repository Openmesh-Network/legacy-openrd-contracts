// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

import { PermissionLib } from "@aragon/osx/core/permission/PermissionLib.sol";
import { PluginSetup } from "@aragon/osx/framework/plugin/setup/PluginSetup.sol";
import { DAO } from "@aragon/osx/core/dao/DAO.sol";

import { NFTMultisig, INFTMultisig } from "./NFTMultisig.sol";

contract NFTMultisigSetup is PluginSetup {
  function prepareInstallation(
    address _dao,
    bytes memory _data
  ) external returns (address plugin, PreparedSetupData memory preparedSetupData) {
    // Decode `_data` to extract the params needed for deploying and initializing `DiamondGovernance` plugin
    (INFTMultisig.MultisigSettings memory _multisigSettings, address _nftContractAddress) = abi.decode(_data, (INFTMultisig.MultisigSettings, address));
    NFTMultisig pluginInstace = new NFTMultisig(DAO(payable(_dao)), _multisigSettings, _nftContractAddress);
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
        pluginInstace.UPDATE_MULTISIG_SETTINGS_PERMISSION_ID()
    );

    // Grant `EXECUTE_PERMISSION` of the DAO to the plugin.
    permissions[1] = PermissionLib.MultiTargetPermission(
        PermissionLib.Operation.Grant,
        _dao,
        plugin,
        PermissionLib.NO_CONDITION,
        DAO(payable(_dao)).EXECUTE_PERMISSION_ID()
    );

    preparedSetupData.permissions = permissions;
  }

  function prepareUninstallation(
    address _dao,
    SetupPayload calldata _payload
  ) external view returns (PermissionLib.MultiTargetPermission[] memory permissions) {
    permissions = new PermissionLib.MultiTargetPermission[](2);

    // Remove the list of permissions of the plugin from the DAO.
    permissions[0] = PermissionLib.MultiTargetPermission(
        PermissionLib.Operation.Revoke,
        _payload.plugin,
        _dao,
        PermissionLib.NO_CONDITION,
        NFTMultisig(_payload.plugin).UPDATE_MULTISIG_SETTINGS_PERMISSION_ID()
    );

    // Revoke `EXECUTE_PERMISSION` of the DAO to the plugin.
    permissions[1] = PermissionLib.MultiTargetPermission(
        PermissionLib.Operation.Revoke,
        _dao,
        _payload.plugin,
        PermissionLib.NO_CONDITION,
        DAO(payable(_dao)).EXECUTE_PERMISSION_ID()
    );
  }

  function implementation() external view returns (address) {}
}
