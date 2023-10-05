# TaskDisputes









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

### createDispute

```solidity
function createDispute(bytes _metadata, uint64 _startDate, uint64 _endDate, uint256 _taskId, uint88[] _partialReward, uint96[] _partialNativeReward) external payable
```

Create a dispute for a task



#### Parameters

| Name | Type | Description |
|---|---|---|
| _metadata | bytes | Metadata of the proposal. |
| _startDate | uint64 | Start date of the proposal. |
| _endDate | uint64 | End date of the proposal. |
| _taskId | uint256 | The task wanting to complete by dispute. |
| _partialReward | uint88[] | Complete with how much of the reward. |
| _partialNativeReward | uint96[] | Complete with how much of the native reward. |

### dao

```solidity
function dao() external view returns (contract IDAO)
```

Returns the DAO contract.




#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | contract IDAO | The DAO contract. |

### getDisputeCost

```solidity
function getDisputeCost() external view returns (uint256)
```

The minimum amount of native currency that has to be attached to create a dispute.




#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | uint256 | undefined |

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
function initialize(contract IDAO _dao, contract ITasks _tasks, contract IPluginProposals _governancePlugin, uint256 _disputeCost) external nonpayable
```

Initialize the TaskDisputes plugin.



#### Parameters

| Name | Type | Description |
|---|---|---|
| _dao | contract IDAO | The dao where this plugin is installed. |
| _tasks | contract ITasks | The tasks contract to create tasks. |
| _governancePlugin | contract IPluginProposals | The governance plugin contract to create proposals. |
| _disputeCost | uint256 | undefined |

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

### updateDisputeCost

```solidity
function updateDisputeCost(uint256 _disputeCost) external nonpayable
```

Updates the dispute cost.



#### Parameters

| Name | Type | Description |
|---|---|---|
| _disputeCost | uint256 | The new dispute cost. |

### updateGovernanceContract

```solidity
function updateGovernanceContract(contract IPluginProposals _governancePlugin) external nonpayable
```

Updates the governance plugin contract address.



#### Parameters

| Name | Type | Description |
|---|---|---|
| _governancePlugin | contract IPluginProposals | The new governance plugin contract address. |

### updateTasksContract

```solidity
function updateTasksContract(contract ITasks _tasks) external nonpayable
```

Updates the tasks contract address.



#### Parameters

| Name | Type | Description |
|---|---|---|
| _tasks | contract ITasks | The new Tasks contract address. |

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

### TransferToDAOError

```solidity
error TransferToDAOError()
```






### Underpaying

```solidity
error Underpaying()
```







