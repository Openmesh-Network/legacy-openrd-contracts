# ISharedAddress









## Methods

### asDAO

```solidity
function asDAO(uint256 _hat, IDAO.Action[] _actions, uint256 _failureMap) external nonpayable returns (bytes[], uint256)
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
| _0 | bytes[] | undefined |
| _1 | uint256 | undefined |

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



## Events

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



## Errors

### AccessDenied

```solidity
error AccessDenied()
```






### NotWearingHat

```solidity
error NotWearingHat()
```







