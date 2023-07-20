// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

import { IERC20 } from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import { Escrow } from "./Escrow.sol";

interface ITasks {
    error TaskDoesNotExist();
    error TaskNotOpen();
    error TaskNotTaken();
    error TaskNotClosed();
    error TaskClosed();

    error NotProposer();
    error NotExecutor();

    error RewardAboveBudget(uint8 index);
    error ApplicationDoesNotExist();
    error NotYourApplication();
    error ApplicationNotAccepted();
    error SubmissionDoesNotExist();
    error SubmissionAlreadyJudged();

    error RequestDoesNotExist();
    error RequestAlreadyAccepted();

    event TaskCreated(uint256 taskId, address proposer, string metadata, uint64 deadline, ERC20Transfer[] budget);
    event ApplicationCreated(uint256 taskId, uint16 applicationId, address applicant, string metadata, Reward[] reward);
    event ApplicationsAccepted(uint256 taskId, uint16[] applications, address proposer);
    event TaskTaken(uint256 taskId, uint16 applicationId, address applicant);
    event SubmissionCreated(uint256 taskId, uint8 submissionId, address executor, string metadata);
    event SubmissionReviewed(uint256 taskId, uint8 submissionId, address proposer, SubmissionJudgement judgement, string feedback);
    event TaskCompleted(uint256 taskId);

    event ChangeScopeRequested(uint256 taskId, uint8 requestId, address proposer, string metadata, uint64 deadline, Reward[] reward);
    event DropExecutorRequested(uint256 taskId, uint8 requestId, address proposer, string explanation);
    event CancelTaskRequested(uint256 taskId, uint8 requestId, address proposer, string explanation);
    event RequestAccepted(uint256 taskId, RequestType requestType, uint8 requestId, address executor);
    event TaskCancelled(uint256 taskId);

    /// @notice A container for ERC20 transfer information.
    /// @param tokenContract ERC20 token to transfer.
    /// @param amount How much of this token should be transfered.
    struct ERC20Transfer {
        IERC20 tokenContract;
        uint96 amount;
    }

    /// @notice A container for a reward payout.
    /// @param nextToken If this reward is payed out in the next ERC20 token.
    /// @dev IERC20 (address) is a lot of storage, rather just keep those only in budget.
    /// @param to Whom this token should be transfered to.
    /// @param amount How much of this token should be transfered.
    struct Reward {
        bool nextToken;
        address to; // Might change this to index instead of address array, will do some gas testing
        uint88 amount;
    }

    /// @notice A container for a task application.
    /// @param metadata Metadata of the application. (IPFS hash)
    /// @param timestamp When the application has been made.
    /// @param applicant Who has submitted this application.
    /// @param accepted If the application has been accepted by the proposer.
    /// @param reward How much rewards the applicant want for completion.
    struct Application {
        string metadata;
        uint64 timestamp;
        address applicant;
        bool accepted;
        uint8 rewardCount;
        mapping(uint8 => Reward) reward;
    }

    struct OffChainApplication {
        string metadata;
        uint64 timestamp;
        address applicant;
        bool accepted;
        Reward[] reward;
    }

    enum SubmissionJudgement { None, Accepted, Rejected }
    /// @notice A container for a task submission.
    /// @param metadata Metadata of the submission. (IPFS hash)
    /// @param timestamp When the submission has been made.
    /// @param judgement Judgement cast on the submission.
    /// @param judgementTimestamp When the judgement has been made.
    /// @param feedback A response from the proposer. (IPFS hash)
    struct Submission {
        string metadata;
        uint64 timestamp;
        SubmissionJudgement judgement;
        uint64 judgementTimestamp;
        string feedback;
    }

    enum RequestType { ChangeScope, DropExecutor, CancelTask }

    /// @notice A container for a request to change the scope of a task.
    /// @param accepted When the request was accepted (0 = not accepted)
    /// @param metadata New task metadata. (IPFS hash)
    /// @param timestamp When the request was made.
    /// @param deadline New deadline for the task.
    /// @param reward New reward for the executor of the task.
    struct ChangeScopeRequest {
        string metadata;
        uint64 timestamp;
        uint64 accepted;
        uint64 deadline;
        uint8 rewardCount;
        mapping(uint8 => Reward) reward;
    }

    struct OffChainChangeScopeRequest {
        string metadata;
        uint64 timestamp;
        uint64 accepted;
        uint64 deadline;
        Reward[] reward;
    }

    /// @notice A container for a request to drop the executor of a task.
    /// @param accepted When the request was accepted (0 = not accepted)
    /// @param explanation Why the executor should be dropped.
    /// @param timestamp When the request was made.
    struct DropExecutorRequest {
        string explanation;
        uint64 timestamp;
        uint64 accepted;
    }

    /// @notice A container for a request to cancel the task.
    /// @param accepted When the request was accepted (0 = not accepted)
    /// @param explanation Why the task should be cancelled.
    /// @param timestamp When the request was made.
    struct CancelTaskRequest {
        string explanation;
        uint64 timestamp;
        uint64 accepted;
    }

    enum TaskState { Open, Taken, Closed }
    /// @notice A container for task-related information.
    /// @param metadata Metadata of the task. (IPFS hash)
    /// @param deadline Block timestamp at which the task expires if not completed.
    /// @param budget Maximum ERC20 rewards that can be earned by completing the task.
    /// @param proposer Who has created the task.
    /// @param creationTimestamp When the task has been created.
    /// @param state Current state the task is in.
    /// @param applications Applications to take the job.
    /// @param executorApplication Index of the application that will execture the task.
    /// @param executorConfirmationTimestamp When the executor has confirmed to take the task.
    /// @param submissions Submission made to finish the task.
    struct Task {
        string metadata;

        uint64 creationTimestamp;
        uint64 executorConfirmationTimestamp;
        uint64 deadline;

        Escrow escrow;

        address proposer;
        TaskState state;
        bool changed;
        uint16 executorApplication;
        uint8 budgetCount;
        uint16 applicationCount;
        uint8 submissionCount;
        uint8 changeScopeRequestCount;
        uint8 dropExecutorRequestCount;
        uint8 cancelTaskRequestCount;

        mapping(uint8 => ERC20Transfer) budget;
        mapping(uint16 => Application) applications;
        mapping(uint8 => Submission) submissions;
        mapping(uint8 => ChangeScopeRequest) changeScopeRequests;
        mapping(uint8 => DropExecutorRequest) dropExecutorRequests;
        mapping(uint8 => CancelTaskRequest) cancelTaskRequests;
    }

    struct OffChainTask {
        string metadata;
        uint64 deadline;
        uint64 creationTimestamp;
        uint64 executorConfirmationTimestamp;
        uint16 executorApplication;
        address proposer;
        TaskState state;
        bool changed;
        Escrow escrow;
        ERC20Transfer[] budget;
        OffChainApplication[] applications;
        Submission[] submissions;
        OffChainChangeScopeRequest[] changeScopeRequests;
        DropExecutorRequest[] dropExecutorRequests;
        CancelTaskRequest[] cancelTaskRequests;
    }

    /// @notice Retrieves the current amount of created tasks.
    function taskCount() external view returns (uint256);
    
    /// @notice Retrieves the current statistics of created tasks.
    function taskStatistics() external view returns (uint256 openTasks, uint256 takenTasks, uint256 successfulTasks);

    /// @notice Retrieves all task information by id.
    /// @param _taskId Id of the task.
    function getTask(
        uint256 _taskId
    ) external view returns (OffChainTask memory);
    
    /// @notice Retrieves multiple tasks.
    /// @param _taskIds Ids of the tasks.
    function getTasks(
        uint256[] calldata _taskIds
    ) external view returns (OffChainTask[] memory);
    
    /// @notice Retrieves all tasks of a proposer. Most recent ones first.
    /// @param _proposer The proposer to fetch tasks of.
    /// @param _fromTaskId What taskId to start from.
    /// @param _max The maximum amount of tasks to return. 0 for no max.
    function getProposingTasks(
        address _proposer,
        uint256 _fromTaskId,
        uint256 _max
    ) external view returns (OffChainTask[] memory);
    
    /// @notice Retrieves all tasks of an executor. Most recent ones first.
    /// @param _executor The executor to fetch tasks of.
    /// @param _fromTaskId What taskId to start from.
    /// @param _max The maximum amount of tasks to return. 0 for no max.
    function getExecutingTasks(
        address _executor,
        uint256 _fromTaskId,
        uint256 _max
    ) external view returns (OffChainTask[] memory);

    /// @notice Create a new task.
    /// @param _metadata Metadata of the task. (IPFS hash)
    /// @param _deadline Block timestamp at which the task expires if not completed.
    /// @param _budget Maximum ERC20 rewards that can be earned by completing the task.
    /// @return taskId Id of the newly created task.
    function createTask(
        string calldata _metadata,
        uint64 _deadline,
        ERC20Transfer[] calldata _budget
    ) external returns (uint256 taskId);
    
    /// @notice Apply to take the task.
    /// @param _taskId Id of the task.
    /// @param _metadata Metadata of your application.
    /// @param _reward Wanted rewards for completing the task.
    function applyForTask(
        uint256 _taskId,
        string calldata _metadata,
        Reward[] calldata _reward
    ) external returns (uint16 applicationId);
    
    /// @notice Accept application to allow them to take the task.
    /// @param _taskId Id of the task.
    /// @param _applications Indexes of the applications to accept.
    function acceptApplications(
        uint256 _taskId,
        uint16[] calldata _applications
    ) external;
    
    /// @notice Take the task after your application has been accepted.
    /// @param _taskId Id of the task.
    /// @param _application Index of application you made that has been accepted.
    function takeTask(
        uint256 _taskId,
        uint16 _application
    ) external;
    
    /// @notice Create a submission.
    /// @param _taskId Id of the task.
    /// @param _metadata Metadata of the submission. (IPFS hash)
    function createSubmission(
        uint256 _taskId,
        string calldata _metadata
    ) external returns (uint8 submissionId);
    
    /// @notice Review a submission.
    /// @param _taskId Id of the task.
    /// @param _submission Index of the submission that is reviewed.
    /// @param _judgement Outcome of the review.
    /// @param _feedback Reasoning of the reviewer. (IPFS hash)
    function reviewSubmission(
        uint256 _taskId,
        uint8 _submission,
        SubmissionJudgement _judgement,
        string calldata _feedback
    ) external;
    
    /// @notice Creates a request to change the scope.
    /// @param _taskId Id of the task.
    /// @param _newMetadata New description of the task. (IPFS hash)
    /// @param _newDeadline New deadline of the task.
    /// @param _newReward New reward of the task.
    function changeScope(
        uint256 _taskId,
        string calldata _newMetadata,
        uint64 _newDeadline,
        Reward[] calldata _newReward
    ) external returns (uint8 changeTaskRequestId);

    /// @notice Drops the current executor of the task
    /// @param _taskId Id of the task.
    /// @param _explanation Why the executor should be dropped.
    function dropExecutor(
        uint256 _taskId,
        string calldata _explanation
    ) external returns (uint8 dropExecutorRequestId);

    /// @notice Cancels a task. This can be used to close a task and receive back the budget.
    /// @param _taskId Id of the task.
    /// @param _explanation Why the task was cancelled. (IPFS hash)
    function cancelTask(
        uint256 _taskId,
        string calldata _explanation
    ) external returns (uint8 cancelTaskRequestId);

    /// @notice Accepts a request, executing the proposed action.
    /// @param _taskId Id of the task.
    /// @param _requestType What kind of request it is.
    /// @param _requestId Id of the request.
    function acceptRequest(
        uint256 _taskId,
        RequestType _requestType,
        uint8 _requestId
    ) external;
}