# TaskDrafts









## Methods

### UPGRADE_PLUGIN_PERMISSION_ID

```solidity
function UPGRADE_PLUGIN_PERMISSION_ID() external view returns (bytes32)
```

The ID of the permission required to call the `_authorizeUpgrade` function.




#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | bytes32 | undefined |

### createDraftTask

```solidity
function createDraftTask(bytes _metadata, uint64 _startDate, uint64 _endDate, ITaskDrafts.CreateTaskInfo _taskInfo) external nonpayable
```





#### Parameters

| Name | Type | Description |
|---|---|---|
| _metadata | bytes | undefined |
| _startDate | uint64 | undefined |
| _endDate | uint64 | undefined |
| _taskInfo | ITaskDrafts.CreateTaskInfo | undefined |

### dao

```solidity
function dao() external view returns (contract IDAO)
```

Returns the DAO contract.




#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | contract IDAO | The DAO contract. |

### getGovernanceContract

```solidity
function getGovernanceContract() external view returns (contract IPluginProposals)
```

The governance plugin (instance) contract where proposals are created.




#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | contract IPluginProposals | undefined |

### getTasksContract

```solidity
function getTasksContract() external view returns (contract ITasks)
```

The Tasks contract where tasks are created.




#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | contract ITasks | undefined |

### implementation

```solidity
function implementation() external view returns (address)
```

Returns the address of the implementation contract in the [proxy storage slot](https://eips.ethereum.org/EIPS/eip-1967) slot the [UUPS proxy](https://eips.ethereum.org/EIPS/eip-1822) is pointing to.




#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | address | The address of the implementation contract. |

### initialize

```solidity
function initialize(contract IDAO _dao, contract ITasks _tasks, contract IPluginProposals _governancePlugin) external nonpayable
```

Initialize the TaskDrafts plugin.



#### Parameters

| Name | Type | Description |
|---|---|---|
| _dao | contract IDAO | The dao where this plugin is installed. |
| _tasks | contract ITasks | The tasks contract to create tasks. |
| _governancePlugin | contract IPluginProposals | The governance plugin contract to create proposals. |

### pluginType

```solidity
function pluginType() external pure returns (enum IPlugin.PluginType)
```

Returns the plugin&#39;s type




#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | enum IPlugin.PluginType | undefined |

### proxiableUUID

```solidity
function proxiableUUID() external view returns (bytes32)
```



*Implementation of the ERC1822 {proxiableUUID} function. This returns the storage slot used by the implementation. It is used to validate the implementation&#39;s compatibility when performing an upgrade. IMPORTANT: A proxy pointing at a proxiable contract should not be considered proxiable itself, because this risks bricking a proxy that upgrades to it, by delegating to itself until out of gas. Thus it is critical that this function revert if invoked through a proxy. This is guaranteed by the `notDelegated` modifier.*


#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | bytes32 | undefined |

### supportsInterface

```solidity
function supportsInterface(bytes4 _interfaceId) external view returns (bool)
```

Checks if an interface is supported by this or its parent contract.



#### Parameters

| Name | Type | Description |
|---|---|---|
| _interfaceId | bytes4 | The ID of the interface. |

#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | bool | Returns `true` if the interface is supported. |

### updateAddresses

```solidity
function updateAddresses(contract ITasks _tasks, contract IPluginProposals _governancePlugin) external nonpayable
```

Updates the Tasks and governance plugin contract addresses.



#### Parameters

| Name | Type | Description |
|---|---|---|
| _tasks | contract ITasks | The new Tasks contract address. |
| _governancePlugin | contract IPluginProposals | The new governance plugin contract address. |

### upgradeTo

```solidity
function upgradeTo(address newImplementation) external nonpayable
```



*Upgrade the implementation of the proxy to `newImplementation`. Calls {_authorizeUpgrade}. Emits an {Upgraded} event.*

#### Parameters

| Name | Type | Description |
|---|---|---|
| newImplementation | address | undefined |

### upgradeToAndCall

```solidity
function upgradeToAndCall(address newImplementation, bytes data) external payable
```



*Upgrade the implementation of the proxy to `newImplementation`, and subsequently execute the function call encoded in `data`. Calls {_authorizeUpgrade}. Emits an {Upgraded} event.*

#### Parameters

| Name | Type | Description |
|---|---|---|
| newImplementation | address | undefined |
| data | bytes | undefined |



## Events

### AdminChanged

```solidity
event AdminChanged(address previousAdmin, address newAdmin)
```





#### Parameters

| Name | Type | Description |
|---|---|---|
| previousAdmin  | address | undefined |
| newAdmin  | address | undefined |

### BeaconUpgraded

```solidity
event BeaconUpgraded(address indexed beacon)
```





#### Parameters

| Name | Type | Description |
|---|---|---|
| beacon `indexed` | address | undefined |

### Initialized

```solidity
event Initialized(uint8 version)
```





#### Parameters

| Name | Type | Description |
|---|---|---|
| version  | uint8 | undefined |

### TaskDraftCreated

```solidity
event TaskDraftCreated(uint256 proposalId, bytes metadata, uint64 startDate, uint64 endDate, ITaskDrafts.CreateTaskInfo taskInfo)
```





#### Parameters

| Name | Type | Description |
|---|---|---|
| proposalId  | uint256 | undefined |
| metadata  | bytes | undefined |
| startDate  | uint64 | undefined |
| endDate  | uint64 | undefined |
| taskInfo  | ITaskDrafts.CreateTaskInfo | undefined |

### Upgraded

```solidity
event Upgraded(address indexed implementation)
```





#### Parameters

| Name | Type | Description |
|---|---|---|
| implementation `indexed` | address | undefined |



## Errors

### DaoUnauthorized

```solidity
error DaoUnauthorized(address dao, address where, address who, bytes32 permissionId)
```

Thrown if a call is unauthorized in the associated DAO.



#### Parameters

| Name | Type | Description |
|---|---|---|
| dao | address | The associated DAO. |
| where | address | The context in which the authorization reverted. |
| who | address | The address (EOA or contract) missing the permission. |
| permissionId | bytes32 | The permission identifier. |


