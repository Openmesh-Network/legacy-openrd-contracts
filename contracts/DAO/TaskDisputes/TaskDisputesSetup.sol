// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import {IDAO} from "@aragon/osx/core/dao/IDAO.sol";
import {DAO} from "@aragon/osx/core/dao/DAO.sol";
import {PermissionLib} from "@aragon/osx/core/permission/PermissionLib.sol";
import {PluginSetup, IPluginSetup} from "@aragon/osx/framework/plugin/setup/PluginSetup.sol";
import {TaskDisputes, IPluginProposals, ITasks, UPDATE_ADDRESSES_PERMISSION_ID, UPDATE_DISPUTE_COST_PERMISSION_ID} from "./TaskDisputes.sol";
import {PLUGIN_PROPOSAL_PERMISSION_ID} from "../TokenListGovernance/IPluginProposals.sol";

contract TaskDisputesSetup is PluginSetup {
    /// @notice The address of `TaskDisputes` plugin logic contract to be used in creating proxy contracts.
    TaskDisputes private immutable taskDisputesBase;

    /// @notice The contract constructor, that deploys the `TaskDisputes` plugin logic contract.
    constructor() {
        taskDisputesBase = new TaskDisputes();
    }

    /// @inheritdoc IPluginSetup
    function prepareInstallation(
        address _dao,
        bytes calldata _data
    )
        external
        returns (address plugin, PreparedSetupData memory preparedSetupData)
    {
        // Decode `_data` to extract the params needed for deploying and initializing `TaskDisputes` plugin.
        (
            ITasks tasks,
            IPluginProposals governancePlugin,
            uint256 disputeCost
        ) = abi.decode(_data, (ITasks, IPluginProposals, uint256));

        // Prepare and Deploy the plugin proxy.
        plugin = createERC1967Proxy(
            address(taskDisputesBase),
            abi.encodeWithSelector(
                TaskDisputes.initialize.selector,
                _dao,
                tasks,
                governancePlugin,
                disputeCost
            )
        );

        // Prepare permissions
        PermissionLib.MultiTargetPermission[]
            memory permissions = new PermissionLib.MultiTargetPermission[](3);

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

        permissions[2] = PermissionLib.MultiTargetPermission(
            PermissionLib.Operation.Grant,
            plugin,
            _dao,
            PermissionLib.NO_CONDITION,
            UPDATE_DISPUTE_COST_PERMISSION_ID
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
        permissions = new PermissionLib.MultiTargetPermission[](3);

        // Set permissions to be Revoked.
        permissions[0] = PermissionLib.MultiTargetPermission(
            PermissionLib.Operation.Revoke,
            address(TaskDisputes(_payload.plugin).getGovernanceContract()),
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

        permissions[2] = PermissionLib.MultiTargetPermission(
            PermissionLib.Operation.Revoke,
            _payload.plugin,
            _dao,
            PermissionLib.NO_CONDITION,
            UPDATE_DISPUTE_COST_PERMISSION_ID
        );
    }

    /// @inheritdoc IPluginSetup
    function implementation() external view returns (address) {
        return address(taskDisputesBase);
    }
}
