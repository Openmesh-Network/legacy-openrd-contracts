// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import {IDAO} from "@aragon/osx/core/dao/IDAO.sol";
import {DAO} from "@aragon/osx/core/dao/DAO.sol";
import {PermissionLib} from "@aragon/osx/core/permission/PermissionLib.sol";
import {PluginSetup, IPluginSetup} from "@aragon/osx/framework/plugin/setup/PluginSetup.sol";
import {SharedAddress} from "./SharedAddress.sol";

contract SharedAddressSetup is PluginSetup {
    /// @notice The address of `SharedAddress` plugin logic contract to be used in creating proxy contracts.
    SharedAddress private immutable sharedAddressBase;

    /// @notice The contract constructor, that deploys the `SharedAddress` plugin logic contract.
    constructor() {
        sharedAddressBase = new SharedAddress();
    }

    /// @inheritdoc IPluginSetup
    function prepareInstallation(
        address _dao,
        bytes calldata _data
    )
        external
        returns (address plugin, PreparedSetupData memory preparedSetupData)
    {
        // Decode `_data` to extract the params needed for deploying and initializing `SharedAddress` plugin.
        address admin = abi.decode(_data, (address));

        // Prepare and Deploy the plugin proxy.
        plugin = createERC1967Proxy(
            address(sharedAddressBase),
            abi.encodeWithSelector(
                SharedAddress.initialize.selector,
                _dao,
                admin
            )
        );

        // Prepare permissions
        PermissionLib.MultiTargetPermission[]
            memory permissions = new PermissionLib.MultiTargetPermission[](1);

        // Set permissions to be granted.
        // Grant the list of permissions of the plugin to the DAO.
        // Grant `EXECUTE_PERMISSION` of the DAO to the plugin.
        permissions[0] = PermissionLib.MultiTargetPermission(
            PermissionLib.Operation.Grant,
            _dao,
            plugin,
            PermissionLib.NO_CONDITION,
            DAO(payable(_dao)).EXECUTE_PERMISSION_ID()
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
        permissions = new PermissionLib.MultiTargetPermission[](1);

        // Set permissions to be Revoked.
        permissions[0] = PermissionLib.MultiTargetPermission(
            PermissionLib.Operation.Revoke,
            _dao,
            _payload.plugin,
            PermissionLib.NO_CONDITION,
            DAO(payable(_dao)).EXECUTE_PERMISSION_ID()
        );
    }

    /// @inheritdoc IPluginSetup
    function implementation() external view returns (address) {
        return address(sharedAddressBase);
    }
}
