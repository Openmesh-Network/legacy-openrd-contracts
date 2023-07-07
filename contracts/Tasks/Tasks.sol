// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

import { ITasks, IERC20, Escrow } from "./ITasks.sol";
import { Clones } from "@openzeppelin/contracts/proxy/Clones.sol";

contract Tasks is ITasks {
    /// @notice The incremental ID for tasks.
    uint256 private taskCounter;

    /// @notice A mapping between task IDs and task information.
    mapping(uint256 => Task) internal tasks;

    address private escrowImplementation;

    constructor() {
        escrowImplementation = address(new Escrow());
    }

    /// @inheritdoc ITasks
    function taskCount() external view returns (uint256) {
        return taskCounter;
    }

    /// @inheritdoc ITasks
    function getTask(
        uint256 _taskId
    ) external view returns (OffChainTask memory task) {
        if (_taskId >= taskCounter) {
            revert TaskDoesNotExist();
        }

        Task storage task_ = tasks[_taskId];
        task.metadata = task_.metadata;
        task.deadline = task_.deadline;
        task.creationTimestamp = task_.creationTimestamp;
        task.executorConfirmationTimestamp = task_.executorConfirmationTimestamp;
        task.executorApplication = task_.executorApplication;
        task.proposer = task_.proposer;
        task.state = task_.state;
        task.escrow = task_.escrow;

        task.budget = new ERC20Transfer[](task_.budgetCount);
        for (uint8 i; i < task.budget.length; ) {
            task.budget[i] = task_.budget[i];
            unchecked {
                ++i;
            }
        }
        
        task.applications = new OffChainApplication[](task_.applicationCount);
        for (uint8 i; i < task.applications.length; ) {
            Application storage application = task_.applications[i];
            task.applications[i].metadata = application.metadata;
            task.applications[i].timestamp = application.timestamp;
            task.applications[i].applicant = application.applicant;
            task.applications[i].accepted = application.accepted;
            task.applications[i].reward = new uint96[](task_.budgetCount);
            for (uint8 j; j < task.applications[i].reward.length; ) {
                task.applications[i].reward[j] = application.reward[j];
                unchecked {
                    ++j;
                }
            }
            unchecked {
                ++i;
            }
        }

        task.submissions = new Submission[](task_.submissionCount);
        for (uint8 i; i < task.submissions.length; ) {
            task.submissions[i] = task_.submissions[i];
            unchecked {
                ++i;
            }
        }
        
        return task;
    }

    /// @inheritdoc ITasks
    function createTask(
        bytes32 _metadata,
        uint64 _deadline,
        ERC20Transfer[] calldata _budget
    ) external returns (uint256 taskId) {
        unchecked {
            taskId = taskCounter++;
        }

        Task storage task_ = tasks[taskId];
        task_.metadata = _metadata;
        task_.deadline = _deadline;
        task_.budgetCount = uint8(_budget.length);
        Escrow escrow = Escrow(Clones.clone(escrowImplementation));
        escrow.__Escrow_init();
        task_.escrow = escrow;
        for (uint8 i; i < _budget.length; ) {
            _budget[i].tokenContract.transferFrom(msg.sender, address(escrow), _budget[i].amount);
            task_.budget[i] = _budget[i];
            unchecked {
                ++i;
            }
        }
        
        task_.creationTimestamp = uint64(block.timestamp);
        task_.proposer = msg.sender;

        // Default values are already correct (save gas)
        // task_.state = TaskState.Open;
    }

    /// @inheritdoc ITasks
    function applyForTask(
        uint256 _taskId,
        bytes32 _metadata,
        uint96[] calldata _reward
    ) external {
        if (_taskId >= taskCounter) {
            revert TaskDoesNotExist();
        }

        Task storage task_ = tasks[_taskId];
        if (task_.state != TaskState.Open) {
            revert TaskNotOpen();
        }

        Application storage application = task_.applications[task_.applicationCount];
        unchecked {
            ++task_.applicationCount;
        }
        application.metadata = _metadata;
        application.timestamp = uint64(block.timestamp);
        application.applicant = msg.sender;

        uint8 budgetCount = task_.budgetCount;
        for (uint8 i; i < budgetCount; ) {
            if (_reward[i] > task_.budget[i].amount) {
                revert RewardAboveBudget();
            }
            application.reward[i] = _reward[i];

            unchecked {
                ++i;
            }
        }

    }
    
    /// @inheritdoc ITasks
    function acceptApplications(
        uint256 _taskId,
        uint16[] calldata _applications
    ) external {
        if (_taskId >= taskCounter) {
            revert TaskDoesNotExist();
        }
        
        Task storage task_ = tasks[_taskId];
        if (task_.state != TaskState.Open) {
            revert TaskNotOpen();
        }
        if (task_.proposer != msg.sender) {
            revert NotProposer();
        }

        for (uint i; i < _applications.length; ) {
            if (_applications[i] >= task_.applicationCount) {
                revert ApplicationDoesNotExist();
            }
            
            task_.applications[_applications[i]].accepted = true;
            unchecked {
                ++i;
            }
        }
    }
    
    /// @inheritdoc ITasks
    function takeTask(
        uint256 _taskId,
        uint16 _application
    ) external {
        if (_taskId >= taskCounter) {
            revert TaskDoesNotExist();
        }
        
        Task storage task_ = tasks[_taskId];
        if (task_.state != TaskState.Open) {
            revert TaskNotOpen();
        }
        Application storage application_ = task_.applications[_application];
        if (application_.applicant != msg.sender) {
            revert NotYourApplication();
        }
        if (!application_.accepted) {
            revert ApplicationNotAccepted();
        }

        task_.state = TaskState.Taken;
        task_.executorApplication = _application;
        task_.executorConfirmationTimestamp = uint64(block.timestamp);
    }
    
    /// @inheritdoc ITasks
    function createSubmission(
        uint256 _taskId,
        bytes32 _metadata
    ) external {
        if (_taskId >= taskCounter) {
            revert TaskDoesNotExist();
        }
        
        Task storage task_ = tasks[_taskId];
        if (task_.state != TaskState.Taken) {
            revert TaskNotTaken();
        }
        if (task_.applications[task_.executorApplication].applicant != msg.sender) {
            revert NotExecutor();
        }

        unchecked { 
            Submission storage submission = task_.submissions[task_.submissionCount++];
            submission.metadata = _metadata;
            submission.timestamp = uint64(block.timestamp);
        }
    }
    
    /// @inheritdoc ITasks
    function reviewSubmission(
        uint256 _taskId,
        uint8 _submission,
        SubmissionJudgement _judgement,
        bytes32 _feedback
    ) external {
        if (_taskId >= taskCounter) {
            revert TaskDoesNotExist();
        }
        
        Task storage task_ = tasks[_taskId];
        if (task_.state != TaskState.Taken) {
            revert TaskNotTaken();
        }
        if (task_.proposer != msg.sender) {
            revert NotProposer();
        }

        Submission storage submission_ = task_.submissions[_submission];
        if (submission_.judgement != SubmissionJudgement.None) {
            revert SubmissionAlreadyJudged();
        }
        // You can judge with judgement None, to give feedback without any judgement yet
        // You can then call this function again to overwrite the feedback (kinda like a draft)
        submission_.judgement = _judgement;
        submission_.judgementTimestamp = uint64(block.timestamp);
        submission_.feedback = _feedback;

        if (_judgement == SubmissionJudgement.Accepted) {
            uint8 budgetCount = task_.budgetCount;
            Application storage executor = task_.applications[task_.executorApplication];
            address proposer = task_.proposer;
            Escrow escrow = task_.escrow;
            for (uint8 i; i < budgetCount; ) {
                ERC20Transfer memory erc20Transfer = task_.budget[i];
                uint256 reward = executor.reward[i];
                escrow.transfer(erc20Transfer.tokenContract, executor.applicant, reward);
                uint256 refund = erc20Transfer.amount - reward;
                if (refund != 0) {
                    escrow.transfer(erc20Transfer.tokenContract, proposer, refund);
                }

                unchecked {
                    ++i;
                }
            }
            task_.state = TaskState.Closed;
        }
    }

    /// @inheritdoc ITasks
    // function refundTask(
    //     uint256 _taskId
    // ) external {
    //     if (_taskId >= taskCounter) {
    //         revert TaskDoesNotExist();
    //     }

    //     Task storage task_ = tasks[_taskId];
    //     if (task_.state == TaskState.Taken) {
    //         if (task_.deadline < uint64(block.timestamp)) {
    //             revert DeadlineDidNotPass();
    //         }
    //     }
    //     else if (task_.state != TaskState.Open) {
    //         revert TaskNotOpen();
    //     }

    //     uint8 budgetCount = task_.budgetCount;
    //     address proposer = task_.proposer;
    //     Escrow escrow = task_.escrow;
    //     for (uint8 i; i < budgetCount; ) {
    //         ERC20Transfer memory erc20Transfer = task_.budget[i];
    //         escrow.transfer(erc20Transfer.tokenContract, proposer, erc20Transfer.amount);

    //         unchecked {
    //             ++i;
    //         }
    //     }
    //     task_.state = TaskState.Closed;
    // }
}