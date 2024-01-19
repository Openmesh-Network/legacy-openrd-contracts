# RFPs









## Methods

### acceptProject

```solidity
function acceptProject(uint256 _rfpId, uint16 _projectId) external nonpayable
```

Accept project to be funnded by the RFP.



#### Parameters

| Name | Type | Description |
|---|---|---|
| _rfpId | uint256 | Id of the RFP. |
| _projectId | uint16 | Id of the project to accept. |

### createRFP

```solidity
function createRFP(string _metadata, uint64 _deadline, ITasks.ERC20Transfer[] _budget, address _tasksManager, address _disputeManager, address _manager) external payable returns (uint256 rfpId)
```





#### Parameters

| Name | Type | Description |
|---|---|---|
| _metadata | string | undefined |
| _deadline | uint64 | undefined |
| _budget | ITasks.ERC20Transfer[] | undefined |
| _tasksManager | address | undefined |
| _disputeManager | address | undefined |
| _manager | address | undefined |

#### Returns

| Name | Type | Description |
|---|---|---|
| rfpId | uint256 | undefined |

### emptyRFP

```solidity
function emptyRFP(uint256 _rfpId) external nonpayable
```

Refunds any leftover budget to the creator.



#### Parameters

| Name | Type | Description |
|---|---|---|
| _rfpId | uint256 | Id of the RFP. |

### escrowImplementation

```solidity
function escrowImplementation() external view returns (address)
```

The base escrow contract that will be cloned for every RFP.




#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | address | undefined |

### getRFP

```solidity
function getRFP(uint256 _rfpId) external view returns (struct IRFPs.OffChainRFP offchainRFP)
```

Retrieves all RFP information by id.



#### Parameters

| Name | Type | Description |
|---|---|---|
| _rfpId | uint256 | Id of the RFP. |

#### Returns

| Name | Type | Description |
|---|---|---|
| offchainRFP | IRFPs.OffChainRFP | undefined |

### getRFPs

```solidity
function getRFPs(uint256[] _rfpIds) external view returns (struct IRFPs.OffChainRFP[])
```

Retrieves multiple RFPs.



#### Parameters

| Name | Type | Description |
|---|---|---|
| _rfpIds | uint256[] | Ids of the RFPs. |

#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | IRFPs.OffChainRFP[] | undefined |

### rfpCount

```solidity
function rfpCount() external view returns (uint256)
```

Retrieves the current amount of created RFPs.




#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | uint256 | undefined |

### submitProject

```solidity
function submitProject(uint256 _rfpId, string _metadata, uint64 _deadline, ITasks.Reward[] _reward, ITasks.NativeReward[] _nativeReward) external nonpayable returns (uint16 projectId)
```





#### Parameters

| Name | Type | Description |
|---|---|---|
| _rfpId | uint256 | undefined |
| _metadata | string | undefined |
| _deadline | uint64 | undefined |
| _reward | ITasks.Reward[] | undefined |
| _nativeReward | ITasks.NativeReward[] | undefined |

#### Returns

| Name | Type | Description |
|---|---|---|
| projectId | uint16 | undefined |



## Events

### ProjectAccepted

```solidity
event ProjectAccepted(uint256 indexed rfpId, uint16 projectId, uint256 taskId)
```





#### Parameters

| Name | Type | Description |
|---|---|---|
| rfpId `indexed` | uint256 | undefined |
| projectId  | uint16 | undefined |
| taskId  | uint256 | undefined |

### ProjectSubmitted

```solidity
event ProjectSubmitted(uint256 indexed rfpId, uint16 projectId, string metadata, address representative, uint64 deadline, ITasks.Reward[] reward, ITasks.NativeReward[] nativeReward)
```





#### Parameters

| Name | Type | Description |
|---|---|---|
| rfpId `indexed` | uint256 | undefined |
| projectId  | uint16 | undefined |
| metadata  | string | undefined |
| representative  | address | undefined |
| deadline  | uint64 | undefined |
| reward  | ITasks.Reward[] | undefined |
| nativeReward  | ITasks.NativeReward[] | undefined |

### RFPCreated

```solidity
event RFPCreated(uint256 indexed rfpId, string metadata, uint64 deadline, ITasks.ERC20Transfer[] budget, uint96 nativeBudget, address creator, address tasksManager, address disputeManager, address manager)
```





#### Parameters

| Name | Type | Description |
|---|---|---|
| rfpId `indexed` | uint256 | undefined |
| metadata  | string | undefined |
| deadline  | uint64 | undefined |
| budget  | ITasks.ERC20Transfer[] | undefined |
| nativeBudget  | uint96 | undefined |
| creator  | address | undefined |
| tasksManager  | address | undefined |
| disputeManager  | address | undefined |
| manager  | address | undefined |

### RFPEmptied

```solidity
event RFPEmptied(uint256 indexed rfpId)
```





#### Parameters

| Name | Type | Description |
|---|---|---|
| rfpId `indexed` | uint256 | undefined |



## Errors

### ERC1167FailedCreateClone

```solidity
error ERC1167FailedCreateClone()
```






### NotManager

```solidity
error NotManager()
```






### Overflow

```solidity
error Overflow()
```






### ProjectAlreadyAccepted

```solidity
error ProjectAlreadyAccepted()
```






### ProjectDoesNotExist

```solidity
error ProjectDoesNotExist()
```






### RFPClosed

```solidity
error RFPClosed()
```






### RFPDoesNotExist

```solidity
error RFPDoesNotExist()
```






### RewardDoesntEndWithNextToken

```solidity
error RewardDoesntEndWithNextToken()
```







