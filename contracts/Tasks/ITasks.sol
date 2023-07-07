// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

import { IERC20 } from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import { Escrow } from "./Escrow.sol";

interface ITasks {
    error TaskDoesNotExist();
    error TaskNotOpen();
    error TaskNotTaken();
    error TaskNotClosed();

    error NotProposer();
    error NotExecutor();

    error RewardAboveBudget();
    error ApplicationDoesNotExist();
    error NotYourApplication();
    error ApplicationNotAccepted();
    error SubmissionAlreadyJudged();
    error DeadlineDidNotPass();

    /// @notice A container for ERC20 transfer information.
    /// @param tokenContract ERC20 token to transfer.
    /// @param amount How much of this token should be transfered.
    struct ERC20Transfer {
        IERC20 tokenContract;
        uint96 amount;
    }

    /// @notice A container for a task application.
    /// @param metadata Metadata of the application. (IPFS hash)
    /// @param timestamp When the application has been made.
    /// @param applicant Who has submitted this application.
    /// @param accepted If the application has been accepted by the proposer.
    /// @param reward How much rewards the applicant want for completion. (just the amount, in the same order as budget)
    struct Application {
        bytes32 metadata;
        uint64 timestamp;
        address applicant;
        bool accepted;
        mapping(uint8 => uint96) reward;
    }

    struct OffChainApplication {
        bytes32 metadata;
        uint64 timestamp;
        address applicant;
        bool accepted;
        uint96[] reward;
    }

    enum SubmissionJudgement { None, Accepted, Rejected }
    /// @notice A container for a task submission.
    /// @param metadata Metadata of the submission. (IPFS hash)
    /// @param timestamp When the submission has been made.
    /// @param judgement Judgement cast on the submission.
    /// @param judgementTimestamp When the judgement has been made.
    /// @param feedback A response from the proposer. (IPFS hash)
    struct Submission {
        bytes32 metadata;
        uint64 timestamp;
        SubmissionJudgement judgement;
        uint64 judgementTimestamp;
        bytes32 feedback;
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
        bytes32 metadata;

        uint64 creationTimestamp;
        uint64 executorConfirmationTimestamp;
        uint64 deadline;

        Escrow escrow;

        address proposer;
        TaskState state;
        uint16 executorApplication;
        uint8 budgetCount;
        uint16 applicationCount;
        uint8 submissionCount;

        mapping(uint8 => ERC20Transfer) budget;
        mapping(uint16 => Application) applications;
        mapping(uint8 => Submission) submissions;
    }

    struct OffChainTask {
        bytes32 metadata;
        uint64 deadline;
        uint64 creationTimestamp;
        uint64 executorConfirmationTimestamp;
        uint16 executorApplication;
        address proposer;
        TaskState state;
        Escrow escrow;
        ERC20Transfer[] budget;
        OffChainApplication[] applications;
        Submission[] submissions;
    }

    /// @notice Retrieves the current amount of created tasks.
    function taskCount() external view returns (uint256);

    /// @notice Retrieves all task information by id.
    /// @param _taskId Id of the task.
    function getTask(
        uint256 _taskId
    ) external view returns (OffChainTask memory);

    /// @notice Create a new task.
    /// @param _metadata Metadata of the task. (IPFS hash)
    /// @param _deadline Block timestamp at which the task expires if not completed.
    /// @param _budget Maximum ERC20 rewards that can be earned by completing the task.
    /// @return taskId Id of the newly created task.
    function createTask(
        bytes32 _metadata,
        uint64 _deadline,
        ERC20Transfer[] calldata _budget
    ) external returns (uint256 taskId);
    
    /// @notice Apply to take the task.
    /// @param _taskId Id of the task.
    /// @param _metadata Metadata of your application.
    /// @param _reward Wanted rewards for completing the task.
    function applyForTask(
        uint256 _taskId,
        bytes32 _metadata,
        uint96[] calldata _reward
    ) external;
    
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
        bytes32 _metadata
    ) external;
    
    /// @notice Review a submission.
    /// @param _taskId Id of the task.
    /// @param _submission Index of the submission that is reviewed.
    /// @param _judgement Outcome of the review.
    /// @param _feedback Reasoning of the reviewer. (IPFS hash)
    function reviewSubmission(
        uint256 _taskId,
        uint8 _submission,
        SubmissionJudgement _judgement,
        bytes32 _feedback
    ) external;

    /// @notice Refund a task. This can be used to close a task and receive back the budget.
    /// @param _taskId Id of the task.
    // function refundTask(
    //     uint256 _taskId
    // ) external;
}