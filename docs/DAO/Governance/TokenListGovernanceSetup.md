# TokenListGovernanceSetup









## Methods

### implementation

```solidity
function implementation() external view returns (address)
```

Returns the plugin implementation address.

*The implementation can be instantiated via the `new` keyword, cloned via the minimal clones pattern (see [ERC-1167](https://eips.ethereum.org/EIPS/eip-1167)), or proxied via the UUPS pattern (see [ERC-1822](https://eips.ethereum.org/EIPS/eip-1822)).*


#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | address | The address of the plugin implementation contract. |

### prepareInstallation

```solidity
function prepareInstallation(address _dao, bytes _data) external nonpayable returns (address plugin, struct IPluginSetup.PreparedSetupData preparedSetupData)
```

Prepares the installation of a plugin.



#### Parameters

| Name | Type | Description |
|---|---|---|
| _dao | address | The address of the installing DAO. |
| _data | bytes | The bytes-encoded data containing the input parameters for the installation as specified in the plugin&#39;s build metadata JSON file. |

#### Returns

| Name | Type | Description |
|---|---|---|
| plugin | address | The address of the `Plugin` contract being prepared for installation. |
| preparedSetupData | IPluginSetup.PreparedSetupData | The deployed plugin&#39;s relevant data which consists of helpers and permissions. |

### prepareUninstallation

```solidity
function prepareUninstallation(address _dao, IPluginSetup.SetupPayload _payload) external view returns (struct PermissionLib.MultiTargetPermission[] permissions)
```





#### Parameters

| Name | Type | Description |
|---|---|---|
| _dao | address | undefined |
| _payload | IPluginSetup.SetupPayload | undefined |

#### Returns

| Name | Type | Description |
|---|---|---|
| permissions | PermissionLib.MultiTargetPermission[] | undefined |

### prepareUpdate

```solidity
function prepareUpdate(address _dao, uint16 _currentBuild, IPluginSetup.SetupPayload _payload) external nonpayable returns (bytes initData, struct IPluginSetup.PreparedSetupData preparedSetupData)
```





#### Parameters

| Name | Type | Description |
|---|---|---|
| _dao | address | undefined |
| _currentBuild | uint16 | undefined |
| _payload | IPluginSetup.SetupPayload | undefined |

#### Returns

| Name | Type | Description |
|---|---|---|
| initData | bytes | undefined |
| preparedSetupData | IPluginSetup.PreparedSetupData | undefined |

### supportsInterface

```solidity
function supportsInterface(bytes4 _interfaceId) external view returns (bool)
```

Checks if this or the parent contract supports an interface by its ID.



#### Parameters

| Name | Type | Description |
|---|---|---|
| _interfaceId | bytes4 | The ID of the interface. |

#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | bool | Returns `true` if the interface is supported. |




