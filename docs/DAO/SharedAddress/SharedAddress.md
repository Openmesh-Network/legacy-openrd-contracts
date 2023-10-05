# SharedAddress









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

### asDAO

```solidity
function asDAO(uint256 _hat, IDAO.Action[] _actions, uint256 _failureMap) external nonpayable returns (bytes[] returnValueBytes, uint256 failureMap)
```





#### Parameters

| Name | Type | Description |
|---|---|---|
| _hat | uint256 | undefined |
| _actions | IDAO.Action[] | undefined |
| _failureMap | uint256 | undefined |

#### Returns

| Name | Type | Description |
|---|---|---|
| returnValueBytes | bytes[] | undefined |
| failureMap | uint256 | undefined |

### dao

```solidity
function dao() external view returns (contract IDAO)
```

Returns the DAO contract.




#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | contract IDAO | The DAO contract. |

### grantFullAccess

```solidity
function grantFullAccess(uint256 _hat) external nonpayable
```

Grants a hat the permission to do any action.



#### Parameters

| Name | Type | Description |
|---|---|---|
| _hat | uint256 | The hat that is granted the permission. |

### grantFullFunctionAccess

```solidity
function grantFullFunctionAccess(uint256 _hat, address _zone, bytes4 _function) external nonpayable
```

Grants a hat the permission to call one function of one smart contract.



#### Parameters

| Name | Type | Description |
|---|---|---|
| _hat | uint256 | The hat that is granted the permission. |
| _zone | address | The address of the smart contract. |
| _function | bytes4 | The function of the smart contract. |

### grantFullZoneAccess

```solidity
function grantFullZoneAccess(uint256 _hat, address _zone) external nonpayable
```

Grants a hat the permission to call all functions of one smart contract.



#### Parameters

| Name | Type | Description |
|---|---|---|
| _hat | uint256 | The hat that is granted the permission. |
| _zone | address | The address of the smart contract. |

### hasAccess

```solidity
function hasAccess(uint256 _hat, IDAO.Action[] _actions) external view returns (bool)
```





#### Parameters

| Name | Type | Description |
|---|---|---|
| _hat | uint256 | undefined |
| _actions | IDAO.Action[] | undefined |

#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | bool | undefined |

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
function initialize(contract IDAO _dao, contract IHats _hats) external nonpayable
```

Initialize the TaskDisputes plugin.



#### Parameters

| Name | Type | Description |
|---|---|---|
| _dao | contract IDAO | The dao where this plugin is installed. |
| _hats | contract IHats | The deployment of Hats Protocol to use. |

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

### revokeFullAccess

```solidity
function revokeFullAccess(uint256 _hat) external nonpayable
```

Revokes a hat the permission to do any action.



#### Parameters

| Name | Type | Description |
|---|---|---|
| _hat | uint256 | The hat that is granted the permission. |

### revokeFullFunctionAccess

```solidity
function revokeFullFunctionAccess(uint256 _hat, address _zone, bytes4 _function) external nonpayable
```

Revokes a hat the permission to call one function of one smart contract.



#### Parameters

| Name | Type | Description |
|---|---|---|
| _hat | uint256 | The hat that is granted the permission. |
| _zone | address | The address of the smart contract. |
| _function | bytes4 | The function of the smart contract. |

### revokeFullZoneAccess

```solidity
function revokeFullZoneAccess(uint256 _hat, address _zone) external nonpayable
```

Revokes a hat the permission to call all functions of one smart contract.



#### Parameters

| Name | Type | Description |
|---|---|---|
| _hat | uint256 | The hat that is granted the permission. |
| _zone | address | The address of the smart contract. |

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

### Execution

```solidity
event Execution(uint256 indexed nonce, address indexed sender, uint256 hat, IDAO.Action[] actions)
```





#### Parameters

| Name | Type | Description |
|---|---|---|
| nonce `indexed` | uint256 | undefined |
| sender `indexed` | address | undefined |
| hat  | uint256 | undefined |
| actions  | IDAO.Action[] | undefined |

### FullAccessGranted

```solidity
event FullAccessGranted(uint256 indexed hat)
```





#### Parameters

| Name | Type | Description |
|---|---|---|
| hat `indexed` | uint256 | undefined |

### FullAccessRevoked

```solidity
event FullAccessRevoked(uint256 indexed hat)
```





#### Parameters

| Name | Type | Description |
|---|---|---|
| hat `indexed` | uint256 | undefined |

### FullFunctionAccessGranted

```solidity
event FullFunctionAccessGranted(uint256 indexed hat, address zone, bytes4 functionSelector)
```





#### Parameters

| Name | Type | Description |
|---|---|---|
| hat `indexed` | uint256 | undefined |
| zone  | address | undefined |
| functionSelector  | bytes4 | undefined |

### FullFunctionAccessRevoked

```solidity
event FullFunctionAccessRevoked(uint256 indexed hat, address zone, bytes4 functionSelector)
```





#### Parameters

| Name | Type | Description |
|---|---|---|
| hat `indexed` | uint256 | undefined |
| zone  | address | undefined |
| functionSelector  | bytes4 | undefined |

### FullZoneAccessGranted

```solidity
event FullZoneAccessGranted(uint256 indexed hat, address zone)
```





#### Parameters

| Name | Type | Description |
|---|---|---|
| hat `indexed` | uint256 | undefined |
| zone  | address | undefined |

### FullZoneAccessRevoked

```solidity
event FullZoneAccessRevoked(uint256 indexed hat, address zone)
```





#### Parameters

| Name | Type | Description |
|---|---|---|
| hat `indexed` | uint256 | undefined |
| zone  | address | undefined |

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

### AccessDenied

```solidity
error AccessDenied()
```






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

### NotWearingHat

```solidity
error NotWearingHat()
```







