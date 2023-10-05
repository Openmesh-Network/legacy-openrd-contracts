# Escrow









## Methods

### __Escrow_init

```solidity
function __Escrow_init() external payable
```

Initializes the Escrow with the sender of the transaction as owner.

*This should be called in the same transaction as deploying the escrow, to prevent front running.*


### transfer

```solidity
function transfer(contract IERC20 token, address to, uint256 amount) external nonpayable
```

Transfers a certain amount of ERC20 token to a given address. Can only be called by the owner.



#### Parameters

| Name | Type | Description |
|---|---|---|
| token | contract IERC20 | The ERC20 contract address. |
| to | address | The address to recieve the tokens. |
| amount | uint256 | The amount of ERC20 token to receive. |

### transferNative

```solidity
function transferNative(address payable to, uint256 amount) external nonpayable
```

Transfers a certain amount of native currency to a given address. Can only be called by the owner.



#### Parameters

| Name | Type | Description |
|---|---|---|
| to | address payable | The address to recieve the currency. |
| amount | uint256 | The amount of native currency to receive. |




## Errors

### AlreadyInitialized

```solidity
error AlreadyInitialized()
```






### NotOwner

```solidity
error NotOwner()
```







