# SubDAO









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

### addSubDAO

```solidity
function addSubDAO(address _subDAO) external nonpayable
```

Adds an existing DAO as sub DAO.



#### Parameters

| Name | Type | Description |
|---|---|---|
| _subDAO | address | The address of the DAO to add as sub DAO. |

### createSubDAO

```solidity
function createSubDAO(contract DAOFactory _daoFactory, DAOFactory.DAOSettings _daoSettings, DAOFactory.PluginSettings[] _pluginSettings) external nonpayable
```





#### Parameters

| Name | Type | Description |
|---|---|---|
| _daoFactory | contract DAOFactory | undefined |
| _daoSettings | DAOFactory.DAOSettings | undefined |
| _pluginSettings | DAOFactory.PluginSettings[] | undefined |

### dao

```solidity
function dao() external view returns (contract IDAO)
```

Returns the DAO contract.




#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | contract IDAO | The DAO contract. |

### getSubDAO

```solidity
function getSubDAO(uint256 _index) external view returns (address subDAO)
```

Gets the address of a currently added sub DAO at a specific index.



#### Parameters

| Name | Type | Description |
|---|---|---|
| _index | uint256 | The index of the sub DAO that you want the address of. |

#### Returns

| Name | Type | Description |
|---|---|---|
| subDAO | address | undefined |

### getSubDAOCount

```solidity
function getSubDAOCount() external view returns (uint256 count)
```

Gets the amount of sub DAOs currently added to this DAO.




#### Returns

| Name | Type | Description |
|---|---|---|
| count | uint256 | undefined |

### getSubDAOs

```solidity
function getSubDAOs() external view returns (address[] subDAOArray)
```

Gets the address of all currently added sub DAOs.




#### Returns

| Name | Type | Description |
|---|---|---|
| subDAOArray | address[] | undefined |

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
function initialize(contract IDAO _dao) external nonpayable
```

Initialize the TaskDisputes plugin.



#### Parameters

| Name | Type | Description |
|---|---|---|
| _dao | contract IDAO | The dao where this plugin is installed. |

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

### removeSubDAO

```solidity
function removeSubDAO(uint256 _index) external nonpayable
```

Removes an existing DAO as sub DAO.

*If removing multiple in the same transaction, do it back to front (highest index first).*

#### Parameters

| Name | Type | Description |
|---|---|---|
| _index | uint256 | The index of the DAO to remove as sub DAO. |

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

### Initialized

```solidity
event Initialized(uint8 version)
```





#### Parameters

| Name | Type | Description |
|---|---|---|
| version  | uint8 | undefined |

### SubDAOAdded

```solidity
event SubDAOAdded(address subdao)
```





#### Parameters

| Name | Type | Description |
|---|---|---|
| subdao  | address | undefined |

### SubDAORemoved

```solidity
event SubDAORemoved(address subdao)
```





#### Parameters

| Name | Type | Description |
|---|---|---|
| subdao  | address | undefined |

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

### IndexOutOfBound

```solidity
error IndexOutOfBound(uint256 index, uint256 count)
```





#### Parameters

| Name | Type | Description |
|---|---|---|
| index | uint256 | undefined |
| count | uint256 | undefined |


