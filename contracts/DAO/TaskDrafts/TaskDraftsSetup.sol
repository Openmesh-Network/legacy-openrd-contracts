// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import {IDAO} from "@aragon/osx/core/dao/IDAO.sol";
import {DAO} from "@aragon/osx/core/dao/DAO.sol";
import {PermissionLib} from "@aragon/osx/core/permission/PermissionLib.sol";
import {PluginSetup, IPluginSetup} from "@aragon/osx/framework/plugin/setup/PluginSetup.sol";
import {TaskDrafts, IPluginProposals, ITasks, UPDATE_ADDRESSES_PERMISSION_ID} from "./TaskDrafts.sol";
import {PLUGIN_PROPOSAL_PERMISSION_ID} from "../Governance/IPluginProposals.sol";

contract TaskDraftsSetup is PluginSetup {
    /// @notice The address of `TaskDrafts` plugin logic contract to be used in creating proxy contracts.
    TaskDrafts private immutable taskDraftsBase;

    /// @notice The contract constructor, that deploys the `TaskDrafts` plugin logic contract.
    constructor() {
        taskDraftsBase = new TaskDrafts();
    }

    /// @inheritdoc IPluginSetup
    function prepareInstallation(
        address _dao,
        bytes calldata _data
    )
        external
        returns (address plugin, PreparedSetupData memory preparedSetupData)
    {
        // Decode `_data` to extract the params needed for deploying and initializing `TaskDrafts` plugin.
        (ITasks tasks, IPluginProposals governancePlugin) = abi.decode(
            _data,
            (ITasks, IPluginProposals)
        );

        // Prepare and Deploy the plugin proxy.
        plugin = createERC1967Proxy(
            address(taskDraftsBase),
            abi.encodeWithSelector(
                TaskDrafts.initialize.selector,
                _dao,
                tasks,
                governancePlugin
            )
        );

        // Prepare permissions
        PermissionLib.MultiTargetPermission[]
            memory permissions = new PermissionLib.MultiTargetPermission[](2);

        // Set permissions to be granted.
        // Grant the list of permissions of the plugin to the DAO.
        permissions[0] = PermissionLib.MultiTargetPermission(
            PermissionLib.Operation.Grant,
            address(governancePlugin),
            plugin,
            PermissionLib.NO_CONDITION,
            PLUGIN_PROPOSAL_PERMISSION_ID
        );

        permissions[1] = PermissionLib.MultiTargetPermission(
            PermissionLib.Operation.Grant,
            plugin,
            _dao,
            PermissionLib.NO_CONDITION,
            UPDATE_ADDRESSES_PERMISSION_ID
        );

        preparedSetupData.permissions = permissions;
    }

    /// @inheritdoc IPluginSetup
    function prepareUninstallation(
        address _dao,
        SetupPayload calldata _payload
    )
        external
        view
        returns (PermissionLib.MultiTargetPermission[] memory permissions)
    {
        // Prepare permissions
        permissions = new PermissionLib.MultiTargetPermission[](2);

        // Set permissions to be Revoked.
        permissions[0] = PermissionLib.MultiTargetPermission(
            PermissionLib.Operation.Revoke,
            address(TaskDrafts(_payload.plugin).getGovernanceContract()),
            _payload.plugin,
            PermissionLib.NO_CONDITION,
            PLUGIN_PROPOSAL_PERMISSION_ID
        );

        permissions[1] = PermissionLib.MultiTargetPermission(
            PermissionLib.Operation.Revoke,
            _payload.plugin,
            _dao,
            PermissionLib.NO_CONDITION,
            UPDATE_ADDRESSES_PERMISSION_ID
        );
    }

    /// @inheritdoc IPluginSetup
    function implementation() external view returns (address) {
        return address(taskDraftsBase);
    }
}
