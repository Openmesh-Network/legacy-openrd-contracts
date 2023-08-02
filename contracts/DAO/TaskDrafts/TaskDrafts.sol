// SPDX-License-Identifier: None
pragma solidity ^0.8.0;

import { Initializable } from "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import { PluginUUPSUpgradeable, IDAO } from "@aragon/osx/core/plugin/PluginUUPSUpgradeable.sol";

import { ITaskDrafts, ITasks, IPluginProposals, UPDATE_ADDRESSES_PERMISSION_ID } from "./ITaskDrafts.sol";

contract TaskDrafts is Initializable, PluginUUPSUpgradeable, ITaskDrafts {
    ITasks private tasks;
    IPluginProposals private governancePlugin;

    /// @notice Initialize the TaskDrafts plugin.
    /// @param _dao The dao where this plugin is installed.
    /// @param _tasks The tasks contract to create tasks.
    /// @param _governancePlugin The governance plugin contract to create proposals.
    function initialize(
        IDAO _dao,
        ITasks _tasks, 
        IPluginProposals _governancePlugin
    ) external initializer {
        __PluginUUPSUpgradeable_init(_dao);
        tasks = _tasks;
        governancePlugin = _governancePlugin;
    }

    /// @inheritdoc PluginUUPSUpgradeable
    function supportsInterface(bytes4 _interfaceId) public view virtual override returns (bool) {
        return _interfaceId == type(ITaskDrafts).interfaceId || super.supportsInterface(_interfaceId);
    }

    /// @inheritdoc ITaskDrafts
    function getTasksContract() external view returns (ITasks) {
        return tasks;
    }

    /// @inheritdoc ITaskDrafts
    function getGovernanceContract() external view returns (IPluginProposals) {
        return governancePlugin;
    }

    /// @inheritdoc ITaskDrafts
    function updateAddresses(
        ITasks _tasks, 
        IPluginProposals _governancePlugin
    ) external auth(UPDATE_ADDRESSES_PERMISSION_ID) {
        tasks = _tasks;
        governancePlugin = _governancePlugin;
    }

    /// @inheritdoc ITaskDrafts
    function createDraftTask(
    	bytes calldata _metadata,
        uint64 _startDate,
        uint64 _endDate,
        CreateTaskInfo calldata _taskInfo
    ) external {
        IDAO.Action[] memory actions = new IDAO.Action[](1);
        {
            bytes memory callData = abi.encodeWithSelector(
                tasks.createTask.selector, 
                _taskInfo.metadata, 
                _taskInfo.deadline, 
                _taskInfo.budget,
                _taskInfo.manager,
                _taskInfo.preapproved
            );
            actions[0] = IDAO.Action(address(tasks), 0, callData);
        }

        governancePlugin.createPluginProposal(_metadata, actions, 0, _startDate, _endDate);
    }
}