# ITaskDrafts









## Methods

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



## Events

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



