// SPDX-License-Identifier: None
pragma solidity ^0.8.0;

import { ITasks } from "../../Tasks/ITasks.sol";
import { IPluginProposals } from "../Governance/IPluginProposals.sol";

bytes32 constant UPDATE_ADDRESSES_PERMISSION_ID = keccak256("UPDATE_ADDRESSES_PERMISSION");

interface ITaskDrafts {
    struct CreateTaskInfo {
        string metadata;
        uint64 deadline;
        ITasks.ERC20Transfer[] budget;
        address manager;
        ITasks.PreapprovedApplication[] preapproved;
    }

    function getTasksContract() external view returns (ITasks);

    function getGovernanceContract() external view returns (IPluginProposals);

    function updateAddresses(
        ITasks _tasks, 
        IPluginProposals _governancePlugin
    ) external;

    function createDraftTask(
    	bytes calldata _metadata,
        uint64 _startDate,
        uint64 _endDate,
        CreateTaskInfo calldata _taskInfo
    ) external;
}