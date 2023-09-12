// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import {ITasks} from "../../Tasks/ITasks.sol";
import {IPluginProposals} from "../TokenListGovernance/IPluginProposals.sol";

bytes32 constant UPDATE_ADDRESSES_PERMISSION_ID = keccak256(
    "UPDATE_ADDRESSES_PERMISSION"
);

bytes32 constant UPDATE_DISPUTE_COST_PERMISSION_ID = keccak256(
    "UPDATE_DISPUTE_COST_PERMISSION"
);

interface ITaskDisputes {
    error Underpaying();
    error TransferToDAOError();

    /// @notice The minimum amount of native currency that has to be attached to create a dispute.
    function getDisputeCost() external view returns (uint256);

    /// @notice The Tasks contract where tasks are created.
    function getTasksContract() external view returns (ITasks);

    /// @notice The governance plugin (instance) contract where proposals are created.
    function getGovernanceContract() external view returns (IPluginProposals);

    /// @notice Updates the dispute cost.
    /// @param _disputeCost The new dispute cost.
    function updateDisputeCost(uint256 _disputeCost) external;

    /// @notice Updates the tasks contract address.
    /// @param _tasks The new Tasks contract address.
    function updateTasksContract(ITasks _tasks) external;

    /// @notice Updates the governance plugin contract address.
    /// @param _governancePlugin The new governance plugin contract address.
    function updateGovernanceContract(
        IPluginProposals _governancePlugin
    ) external;

    /// @notice Create a dispute for a task
    function createDispute(
        bytes calldata _metadata,
        uint64 _startDate,
        uint64 _endDate,
        uint256 _taskId
    ) external payable;
}
