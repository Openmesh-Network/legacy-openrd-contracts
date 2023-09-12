# TokenList









## Methods

### isListed

```solidity
function isListed(uint256 _tokenId) external view returns (bool)
```

Checks if a tokenId is currently on the address list.



#### Parameters

| Name | Type | Description |
|---|---|---|
| _tokenId | uint256 | The tokenId being checked. |

#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | bool | Whether the tokenId is currently listed. |

### isListedAtBlock

```solidity
function isListedAtBlock(uint256 _tokenId, uint256 _blockNumber) external view returns (bool)
```

Checks if a tokenId is on the address list at a specific block number.



#### Parameters

| Name | Type | Description |
|---|---|---|
| _tokenId | uint256 | The tokenId being checked. |
| _blockNumber | uint256 | The block number. |

#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | bool | Whether the tokenId is listed at the specified block number. |

### tokenlistLength

```solidity
function tokenlistLength() external view returns (uint256)
```

Returns the current length of the token list.




#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | uint256 | The current token list length. |

### tokenlistLengthAtBlock

```solidity
function tokenlistLengthAtBlock(uint256 _blockNumber) external view returns (uint256)
```

Returns the length of the token list at a specific block number.



#### Parameters

| Name | Type | Description |
|---|---|---|
| _blockNumber | uint256 | The specific block to get the count from. If `0`, then the latest checkpoint value is returned. |

#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | uint256 | The token list length at the specified block number. |



## Events

### TokensAdded

```solidity
event TokensAdded(uint256[] tokens)
```





#### Parameters

| Name | Type | Description |
|---|---|---|
| tokens  | uint256[] | undefined |

### TokensRemoved

```solidity
event TokensRemoved(uint256[] tokens)
```





#### Parameters

| Name | Type | Description |
|---|---|---|
| tokens  | uint256[] | undefined |



## Errors

### InvalidTokenlistUpdate

```solidity
error InvalidTokenlistUpdate(uint256 tokenId)
```

Thrown when the token list update is invalid, which can be caused by the addition of an existing tokenId or removal of a non-existing tokenId.



#### Parameters

| Name | Type | Description |
|---|---|---|
| tokenId | uint256 | The first invalid tokenId. |


