# ITasks









## Methods

### acceptApplications

```solidity
function acceptApplications(uint256 _taskId, uint32[] _applicationIds) external nonpayable
```

Accept application to allow them to take the task.

*Will revert if applicant reward is higher than the budget. increaseBudget should be called beforehand.*

#### Parameters

| Name | Type | Description |
|---|---|---|
| _taskId | uint256 | Id of the task. |
| _applicationIds | uint32[] | Indexes of the applications to accept. |

### acceptRequest

```solidity
function acceptRequest(uint256 _taskId, enum ITasks.RequestType _requestType, uint8 _requestId, bool _execute) external nonpayable
```

Accepts a request, executing the proposed action.



#### Parameters

| Name | Type | Description |
|---|---|---|
| _taskId | uint256 | Id of the task. |
| _requestType | enum ITasks.RequestType | What kind of request it is. |
| _requestId | uint8 | Id of the request. |
| _execute | bool | If the request should also be executed in this transaction. |

### applyForTask

```solidity
function applyForTask(uint256 _taskId, string _metadata, ITasks.Reward[] _reward, ITasks.NativeReward[] _nativeReward) external nonpayable returns (uint32 applicationId)
```





#### Parameters

| Name | Type | Description |
|---|---|---|
| _taskId | uint256 | undefined |
| _metadata | string | undefined |
| _reward | ITasks.Reward[] | undefined |
| _nativeReward | ITasks.NativeReward[] | undefined |

#### Returns

| Name | Type | Description |
|---|---|---|
| applicationId | uint32 | undefined |

### cancelTask

```solidity
function cancelTask(uint256 _taskId, string _explanation) external nonpayable returns (uint8 cancelTaskRequestId)
```

Cancels a task. This can be used to close a task and receive back the budget.



#### Parameters

| Name | Type | Description |
|---|---|---|
| _taskId | uint256 | Id of the task. |
| _explanation | string | Why the task was cancelled. (IPFS hash) |

#### Returns

| Name | Type | Description |
|---|---|---|
| cancelTaskRequestId | uint8 | Id of the newly created request for task cancellation. |

### completeByDispute

```solidity
function completeByDispute(uint256 _taskId, uint88[] _partialReward, uint96[] _partialNativeReward) external nonpayable
```

Completes the task through dispute resolution.



#### Parameters

| Name | Type | Description |
|---|---|---|
| _taskId | uint256 | Id of the task. |
| _partialReward | uint88[] | How much of each ERC20 reward should be paid out. |
| _partialNativeReward | uint96[] | How much of each native reward should be paid out. |

### createSubmission

```solidity
function createSubmission(uint256 _taskId, string _metadata) external nonpayable returns (uint8 submissionId)
```

Create a submission.



#### Parameters

| Name | Type | Description |
|---|---|---|
| _taskId | uint256 | Id of the task. |
| _metadata | string | Metadata of the submission. (IPFS hash) |

#### Returns

| Name | Type | Description |
|---|---|---|
| submissionId | uint8 | Id of the newly created submission. |

### createTask

```solidity
function createTask(string _metadata, uint64 _deadline, ITasks.ERC20Transfer[] _budget, address _manager, ITasks.PreapprovedApplication[] _preapprove, address _disputeManager) external payable returns (uint256 taskId)
```





#### Parameters

| Name | Type | Description |
|---|---|---|
| _metadata | string | undefined |
| _deadline | uint64 | undefined |
| _budget | ITasks.ERC20Transfer[] | undefined |
| _manager | address | undefined |
| _preapprove | ITasks.PreapprovedApplication[] | undefined |
| _disputeManager | address | undefined |

#### Returns

| Name | Type | Description |
|---|---|---|
| taskId | uint256 | undefined |

### editMetadata

```solidity
function editMetadata(uint256 _taskId, string _newMetadata) external nonpayable
```

Edit the metadata of a task.

*This metadata update might change the task completely. Show a warning to people who applied before the change.*

#### Parameters

| Name | Type | Description |
|---|---|---|
| _taskId | uint256 | Id of the task. |
| _newMetadata | string | New metadata of the task. |

### executeRequest

```solidity
function executeRequest(uint256 _taskId, enum ITasks.RequestType _requestType, uint8 _requestId) external nonpayable
```

Exectued an accepted request, allows anyone to pay for the gas costs of the execution.



#### Parameters

| Name | Type | Description |
|---|---|---|
| _taskId | uint256 | Id of the task. |
| _requestType | enum ITasks.RequestType | What kind of request it is. |
| _requestId | uint8 | Id of the request. |

### extendDeadline

```solidity
function extendDeadline(uint256 _taskId, uint64 _extension) external nonpayable
```

Extend the deadline of a task.



#### Parameters

| Name | Type | Description |
|---|---|---|
| _taskId | uint256 | Id of the task. |
| _extension | uint64 | How much to extend the deadline by. |

### getTask

```solidity
function getTask(uint256 _taskId) external view returns (struct ITasks.OffChainTask)
```

Retrieves all task information by id.



#### Parameters

| Name | Type | Description |
|---|---|---|
| _taskId | uint256 | Id of the task. |

#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | ITasks.OffChainTask | undefined |

### getTasks

```solidity
function getTasks(uint256[] _taskIds) external view returns (struct ITasks.OffChainTask[])
```

Retrieves multiple tasks in a single call.



#### Parameters

| Name | Type | Description |
|---|---|---|
| _taskIds | uint256[] | Ids of the tasks. |

#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | ITasks.OffChainTask[] | undefined |

### increaseBudget

```solidity
function increaseBudget(uint256 _taskId, uint96[] _increase) external payable
```

Increase the budget of the task.

*Any attached native reward will also be used to increase the budget.*

#### Parameters

| Name | Type | Description |
|---|---|---|
| _taskId | uint256 | Id of the task. |
| _increase | uint96[] | How much to increase each tokens amount by. |

### partialPayment

```solidity
function partialPayment(uint256 _taskId, uint88[] _partialReward, uint96[] _partialNativeReward) external nonpayable
```

Releases a part of the reward to the executor without marking the task as complete.

*Will fetch balanceOf to set the budget afterwards, can be used in case funds where sent manually to the escrow to sync the budget.*

#### Parameters

| Name | Type | Description |
|---|---|---|
| _taskId | uint256 | Id of the task. |
| _partialReward | uint88[] | How much of each ERC20 reward should be paid out. |
| _partialNativeReward | uint96[] | How much of each native reward should be paid out. |

### reviewSubmission

```solidity
function reviewSubmission(uint256 _taskId, uint8 _submissionId, enum ITasks.SubmissionJudgement _judgement, string _feedback) external nonpayable
```

Review a submission.



#### Parameters

| Name | Type | Description |
|---|---|---|
| _taskId | uint256 | Id of the task. |
| _submissionId | uint8 | Index of the submission that is reviewed. |
| _judgement | enum ITasks.SubmissionJudgement | Outcome of the review. |
| _feedback | string | Reasoning of the reviewer. (IPFS hash) |

### takeTask

```solidity
function takeTask(uint256 _taskId, uint32 _applicationId) external nonpayable
```

Take the task after your application has been accepted.



#### Parameters

| Name | Type | Description |
|---|---|---|
| _taskId | uint256 | Id of the task. |
| _applicationId | uint32 | Index of application you made that has been accepted. |

### taskCount

```solidity
function taskCount() external view returns (uint256)
```

Retrieves the current amount of created tasks.




#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | uint256 | undefined |

### transferManagement

```solidity
function transferManagement(uint256 _taskId, address _newManager) external nonpayable
```

Transfers the manager role to a different address.



#### Parameters

| Name | Type | Description |
|---|---|---|
| _taskId | uint256 | Id of the task. |
| _newManager | address | What address should become the manager. |



## Events

### ApplicationAccepted

```solidity
event ApplicationAccepted(uint256 indexed taskId, uint32 indexed applicationId)
```





#### Parameters

| Name | Type | Description |
|---|---|---|
| taskId `indexed` | uint256 | undefined |
| applicationId `indexed` | uint32 | undefined |

### ApplicationCreated

```solidity
event ApplicationCreated(uint256 indexed taskId, uint32 indexed applicationId, string metadata, ITasks.Reward[] reward, ITasks.NativeReward[] nativeReward)
```





#### Parameters

| Name | Type | Description |
|---|---|---|
| taskId `indexed` | uint256 | undefined |
| applicationId `indexed` | uint32 | undefined |
| metadata  | string | undefined |
| reward  | ITasks.Reward[] | undefined |
| nativeReward  | ITasks.NativeReward[] | undefined |

### BudgetChanged

```solidity
event BudgetChanged(uint256 indexed taskId)
```





#### Parameters

| Name | Type | Description |
|---|---|---|
| taskId `indexed` | uint256 | undefined |

### CancelTaskRequested

```solidity
event CancelTaskRequested(uint256 indexed taskId, uint8 indexed requestId, string explanation)
```





#### Parameters

| Name | Type | Description |
|---|---|---|
| taskId `indexed` | uint256 | undefined |
| requestId `indexed` | uint8 | undefined |
| explanation  | string | undefined |

### DeadlineChanged

```solidity
event DeadlineChanged(uint256 indexed taskId, uint64 newDeadline)
```





#### Parameters

| Name | Type | Description |
|---|---|---|
| taskId `indexed` | uint256 | undefined |
| newDeadline  | uint64 | undefined |

### MetadataChanged

```solidity
event MetadataChanged(uint256 indexed taskId, string newMetadata)
```





#### Parameters

| Name | Type | Description |
|---|---|---|
| taskId `indexed` | uint256 | undefined |
| newMetadata  | string | undefined |

### NewManager

```solidity
event NewManager(uint256 indexed taskId, address manager)
```





#### Parameters

| Name | Type | Description |
|---|---|---|
| taskId `indexed` | uint256 | undefined |
| manager  | address | undefined |

### PartialPayment

```solidity
event PartialPayment(uint256 indexed taskId, uint88[] partialReward, uint96[] partialNativeReward)
```





#### Parameters

| Name | Type | Description |
|---|---|---|
| taskId `indexed` | uint256 | undefined |
| partialReward  | uint88[] | undefined |
| partialNativeReward  | uint96[] | undefined |

### RequestAccepted

```solidity
event RequestAccepted(uint256 indexed taskId, enum ITasks.RequestType indexed requestType, uint8 indexed requestId)
```





#### Parameters

| Name | Type | Description |
|---|---|---|
| taskId `indexed` | uint256 | undefined |
| requestType `indexed` | enum ITasks.RequestType | undefined |
| requestId `indexed` | uint8 | undefined |

### RequestExecuted

```solidity
event RequestExecuted(uint256 indexed taskId, enum ITasks.RequestType indexed requestType, uint8 indexed requestId, address by)
```





#### Parameters

| Name | Type | Description |
|---|---|---|
| taskId `indexed` | uint256 | undefined |
| requestType `indexed` | enum ITasks.RequestType | undefined |
| requestId `indexed` | uint8 | undefined |
| by  | address | undefined |

### SubmissionCreated

```solidity
event SubmissionCreated(uint256 indexed taskId, uint8 indexed submissionId, string metadata)
```





#### Parameters

| Name | Type | Description |
|---|---|---|
| taskId `indexed` | uint256 | undefined |
| submissionId `indexed` | uint8 | undefined |
| metadata  | string | undefined |

### SubmissionReviewed

```solidity
event SubmissionReviewed(uint256 indexed taskId, uint8 indexed submissionId, enum ITasks.SubmissionJudgement judgement, string feedback)
```





#### Parameters

| Name | Type | Description |
|---|---|---|
| taskId `indexed` | uint256 | undefined |
| submissionId `indexed` | uint8 | undefined |
| judgement  | enum ITasks.SubmissionJudgement | undefined |
| feedback  | string | undefined |

### TaskCancelled

```solidity
event TaskCancelled(uint256 indexed taskId)
```





#### Parameters

| Name | Type | Description |
|---|---|---|
| taskId `indexed` | uint256 | undefined |

### TaskCompleted

```solidity
event TaskCompleted(uint256 indexed taskId, enum ITasks.TaskCompletion source)
```





#### Parameters

| Name | Type | Description |
|---|---|---|
| taskId `indexed` | uint256 | undefined |
| source  | enum ITasks.TaskCompletion | undefined |

### TaskCreated

```solidity
event TaskCreated(uint256 indexed taskId, string metadata, uint64 deadline, ITasks.ERC20Transfer[] budget, uint96 nativeBudget, address creator, address manager, address disputeManager)
```





#### Parameters

| Name | Type | Description |
|---|---|---|
| taskId `indexed` | uint256 | undefined |
| metadata  | string | undefined |
| deadline  | uint64 | undefined |
| budget  | ITasks.ERC20Transfer[] | undefined |
| nativeBudget  | uint96 | undefined |
| creator  | address | undefined |
| manager  | address | undefined |
| disputeManager  | address | undefined |

### TaskTaken

```solidity
event TaskTaken(uint256 indexed taskId, uint32 indexed applicationId)
```





#### Parameters

| Name | Type | Description |
|---|---|---|
| taskId `indexed` | uint256 | undefined |
| applicationId `indexed` | uint32 | undefined |



## Errors

### ApplicationDoesNotExist

```solidity
error ApplicationDoesNotExist()
```






### ApplicationNotAccepted

```solidity
error ApplicationNotAccepted()
```






### ERC1167FailedCreateClone

```solidity
error ERC1167FailedCreateClone()
```






### JudgementNone

```solidity
error JudgementNone()
```






### ManualBudgetIncreaseNeeded

```solidity
error ManualBudgetIncreaseNeeded()
```






### NativeTransferFailed

```solidity
error NativeTransferFailed()
```






### NotDisputeManager

```solidity
error NotDisputeManager()
```






### NotEnoughNativeCurrencyAttached

```solidity
error NotEnoughNativeCurrencyAttached()
```






### NotExecutor

```solidity
error NotExecutor()
```






### NotManager

```solidity
error NotManager()
```






### NotYourApplication

```solidity
error NotYourApplication()
```






### Overflow

```solidity
error Overflow()
```






### PartialRewardAboveFullReward

```solidity
error PartialRewardAboveFullReward()
```






### RequestAlreadyAccepted

```solidity
error RequestAlreadyAccepted()
```






### RequestAlreadyExecuted

```solidity
error RequestAlreadyExecuted()
```






### RequestDoesNotExist

```solidity
error RequestDoesNotExist()
```






### RequestNotAccepted

```solidity
error RequestNotAccepted()
```






### RewardAboveBudget

```solidity
error RewardAboveBudget()
```






### RewardDoesntEndWithNextToken

```solidity
error RewardDoesntEndWithNextToken()
```






### SubmissionAlreadyJudged

```solidity
error SubmissionAlreadyJudged()
```






### SubmissionDoesNotExist

```solidity
error SubmissionDoesNotExist()
```






### TaskClosed

```solidity
error TaskClosed()
```






### TaskDoesNotExist

```solidity
error TaskDoesNotExist()
```






### TaskNotClosed

```solidity
error TaskNotClosed()
```






### TaskNotOpen

```solidity
error TaskNotOpen()
```






### TaskNotTaken

```solidity
error TaskNotTaken()
```







