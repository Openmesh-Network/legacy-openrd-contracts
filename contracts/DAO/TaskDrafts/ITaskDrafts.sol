// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import {ITasks} from "../../Tasks/ITasks.sol";
import {IPluginProposals} from "../TokenListGovernance/IPluginProposals.sol";

bytes32 constant UPDATE_ADDRESSES_PERMISSION_ID = keccak256(
    "UPDATE_ADDRESSES_PERMISSION"
);

interface ITaskDrafts {
    event TaskDraftCreated(
        uint256 proposalId,
        bytes metadata,
        uint64 startDate,
        uint64 endDate,
        CreateTaskInfo taskInfo
    );

    struct CreateTaskInfo {
        string metadata;
        uint64 deadline;
        ITasks.ERC20Transfer[] budget;
        address manager;
        ITasks.PreapprovedApplication[] preapproved;
    }

    /// @notice The Tasks contract where tasks are created.
    function getTasksContract() external view returns (ITasks);

    /// @notice The governance plugin (instance) contract where proposals are created.
    function getGovernanceContract() external view returns (IPluginProposals);

    /// @notice Updates the tasks contract address.
    /// @param _tasks The new Tasks contract address.
    function updateTasksContract(ITasks _tasks) external;

    /// @notice Updates the governance plugin contract address.
    /// @param _governancePlugin The new governance plugin contract address.
    function updateGovernanceContract(
        IPluginProposals _governancePlugin
    ) external;

    /// @notice Create a proposal to create a task.
    /// @param _metadata The metadata of the proposal.
    /// @param _startDate The start date of the proposal.
    /// @param _endDate The end date of the proposal.
    /// @param _taskInfo The task to be created if the proposal passes.
    function createDraftTask(
        bytes calldata _metadata,
        uint64 _startDate,
        uint64 _endDate,
        CreateTaskInfo calldata _taskInfo
    ) external;
}
