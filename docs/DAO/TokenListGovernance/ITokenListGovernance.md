# ITokenListGovernance









## Methods

### addMembers

```solidity
function addMembers(uint256[] _members) external nonpayable
```

Adds new members to the token list.

*This function is used during the plugin initialization.*

#### Parameters

| Name | Type | Description |
|---|---|---|
| _members | uint256[] | The tokens to be added. |

### removeBurned

```solidity
function removeBurned(uint256[] _members) external nonpayable
```

Removes burned tokens from the token list.



#### Parameters

| Name | Type | Description |
|---|---|---|
| _members | uint256[] | The bruned token to be removed. |

### removeMembers

```solidity
function removeMembers(uint256[] _members) external nonpayable
```

Removes existing members from the token list.



#### Parameters

| Name | Type | Description |
|---|---|---|
| _members | uint256[] | The tokens to be removed. |




## Errors

### TokenNotBurned

```solidity
error TokenNotBurned(uint256 id)
```





#### Parameters

| Name | Type | Description |
|---|---|---|
| id | uint256 | undefined |


