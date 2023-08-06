// SPDX-License-Identifier: None
pragma solidity ^0.8.0;

import {IDAO} from "@aragon/osx/core/dao/IDAO.sol";
import {DAO} from "@aragon/osx/core/dao/DAO.sol";
import {PermissionLib} from "@aragon/osx/core/permission/PermissionLib.sol";
import {PluginSetup, IPluginSetup} from "@aragon/osx/framework/plugin/setup/PluginSetup.sol";
import {TokenListGovernance, TokenMajorityVotingBase} from "./TokenListGovernance.sol";

// Based on https://github.com/aragon/osx/blob/develop/packages/contracts/src/plugins/governance/majority-voting/addresslist/AddresslistVotingSetup.sol
contract TokenListGovernanceSetup is PluginSetup {
    /// @notice The address of `TokenListGovernance` plugin logic contract to be used in creating proxy contracts.
    TokenListGovernance private immutable tokenListGovernanceBase;

    /// @notice The contract constructor, that deploys the `TokenListGovernance` plugin logic contract.
    constructor() {
        tokenListGovernanceBase = new TokenListGovernance();
    }

    /// @inheritdoc IPluginSetup
    function prepareInstallation(
        address _dao,
        bytes calldata _data
    )
        external
        returns (address plugin, PreparedSetupData memory preparedSetupData)
    {
        // Decode `_data` to extract the params needed for deploying and initializing `TokenListGovernance` plugin.
        (
            TokenMajorityVotingBase.VotingSettings memory votingSettings,
            address tokenCollection,
            uint256[] memory members,
            address manager
        ) = abi.decode(
                _data,
                (
                    TokenMajorityVotingBase.VotingSettings,
                    address,
                    uint256[],
                    address
                )
            );

        // Prepare and Deploy the plugin proxy.
        plugin = createERC1967Proxy(
            address(tokenListGovernanceBase),
            abi.encodeWithSelector(
                TokenListGovernance.initialize.selector,
                _dao,
                votingSettings,
                tokenCollection,
                members
            )
        );

        // Prepare permissions
        PermissionLib.MultiTargetPermission[]
            memory permissions = new PermissionLib.MultiTargetPermission[](5);

        // Set permissions to be granted.
        // Grant the list of permissions of the plugin to the DAO.
        permissions[0] = PermissionLib.MultiTargetPermission(
            PermissionLib.Operation.Grant,
            plugin,
            _dao,
            PermissionLib.NO_CONDITION,
            tokenListGovernanceBase.UPDATE_MEMBERS_PERMISSION_ID()
        );

        permissions[1] = PermissionLib.MultiTargetPermission(
            PermissionLib.Operation.Grant,
            plugin,
            _dao,
            PermissionLib.NO_CONDITION,
            tokenListGovernanceBase.UPDATE_VOTING_SETTINGS_PERMISSION_ID()
        );

        permissions[2] = PermissionLib.MultiTargetPermission(
            PermissionLib.Operation.Grant,
            plugin,
            _dao,
            PermissionLib.NO_CONDITION,
            tokenListGovernanceBase.UPGRADE_PLUGIN_PERMISSION_ID()
        );

        // Grant `EXECUTE_PERMISSION` of the DAO to the plugin.
        permissions[3] = PermissionLib.MultiTargetPermission(
            PermissionLib.Operation.Grant,
            _dao,
            plugin,
            PermissionLib.NO_CONDITION,
            DAO(payable(_dao)).EXECUTE_PERMISSION_ID()
        );

        permissions[4] = PermissionLib.MultiTargetPermission(
            PermissionLib.Operation.Grant,
            plugin,
            manager,
            PermissionLib.NO_CONDITION,
            tokenListGovernanceBase.UPDATE_MEMBERS_PERMISSION_ID()
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
        permissions = new PermissionLib.MultiTargetPermission[](4);

        // Set permissions to be Revoked.
        permissions[0] = PermissionLib.MultiTargetPermission(
            PermissionLib.Operation.Revoke,
            _payload.plugin,
            _dao,
            PermissionLib.NO_CONDITION,
            tokenListGovernanceBase.UPDATE_MEMBERS_PERMISSION_ID()
        );

        permissions[1] = PermissionLib.MultiTargetPermission(
            PermissionLib.Operation.Revoke,
            _payload.plugin,
            _dao,
            PermissionLib.NO_CONDITION,
            tokenListGovernanceBase.UPDATE_VOTING_SETTINGS_PERMISSION_ID()
        );

        permissions[2] = PermissionLib.MultiTargetPermission(
            PermissionLib.Operation.Revoke,
            _payload.plugin,
            _dao,
            PermissionLib.NO_CONDITION,
            tokenListGovernanceBase.UPGRADE_PLUGIN_PERMISSION_ID()
        );

        permissions[3] = PermissionLib.MultiTargetPermission(
            PermissionLib.Operation.Revoke,
            _dao,
            _payload.plugin,
            PermissionLib.NO_CONDITION,
            DAO(payable(_dao)).EXECUTE_PERMISSION_ID()
        );

        // manager permission ?
    }

    /// @inheritdoc IPluginSetup
    function implementation() external view returns (address) {
        return address(tokenListGovernanceBase);
    }
}
