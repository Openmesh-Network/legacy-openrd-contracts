// SPDX-License-Identifier: None
pragma solidity ^0.8.0;

import {Initializable} from "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import {PluginUUPSUpgradeable, IDAO} from "@aragon/osx/core/plugin/PluginUUPSUpgradeable.sol";

import {ITaskDisputes, ITasks, IPluginProposals, UPDATE_ADDRESSES_PERMISSION_ID, UPDATE_DISPUTE_COST_PERMISSION_ID} from "./ITaskDisputes.sol";

contract TaskDisputes is Initializable, PluginUUPSUpgradeable, ITaskDisputes {
    ITasks private tasks;
    IPluginProposals private governancePlugin;
    uint256 private disputeCost;

    /// @notice Initialize the TaskDisputes plugin.
    /// @param _dao The dao where this plugin is installed.
    /// @param _tasks The tasks contract to create tasks.
    /// @param _governancePlugin The governance plugin contract to create proposals.
    function initialize(
        IDAO _dao,
        ITasks _tasks,
        IPluginProposals _governancePlugin,
        uint256 _disputeCost
    ) external initializer {
        __PluginUUPSUpgradeable_init(_dao);
        tasks = _tasks;
        governancePlugin = _governancePlugin;
        disputeCost = _disputeCost;
    }

    /// @inheritdoc PluginUUPSUpgradeable
    function supportsInterface(
        bytes4 _interfaceId
    ) public view virtual override returns (bool) {
        return
            _interfaceId == type(ITaskDisputes).interfaceId ||
            super.supportsInterface(_interfaceId);
    }

    /// @inheritdoc ITaskDisputes
    function getDisputeCost() external view returns (uint256) {
        return disputeCost;
    }

    /// @inheritdoc ITaskDisputes
    function getTasksContract() external view returns (ITasks) {
        return tasks;
    }

    /// @inheritdoc ITaskDisputes
    function getGovernanceContract() external view returns (IPluginProposals) {
        return governancePlugin;
    }

    /// @inheritdoc ITaskDisputes
    function updateDisputeCost(
        uint256 _disputeCost
    ) external auth(UPDATE_DISPUTE_COST_PERMISSION_ID) {
        disputeCost = _disputeCost;
    }

    /// @inheritdoc ITaskDisputes
    function updateTasksContract(
        ITasks _tasks
    ) external auth(UPDATE_ADDRESSES_PERMISSION_ID) {
        tasks = _tasks;
    }

    /// @inheritdoc ITaskDisputes
    function updateGovernanceContract(
        IPluginProposals _governancePlugin
    ) external auth(UPDATE_ADDRESSES_PERMISSION_ID) {
        governancePlugin = _governancePlugin;
    }

    /// @inheritdoc ITaskDisputes
    function createDispute(
        bytes calldata _metadata,
        uint64 _startDate,
        uint64 _endDate,
        uint256 _taskId
    ) external payable {
        // Dispute cost is required to make a dispute proposal. It is sent to the DAO.
        if (msg.value < disputeCost) {
            revert Underpaying();
        }
        payable(address(dao())).transfer(msg.value);

        IDAO.Action[] memory actions = new IDAO.Action[](1);
        {
            bytes memory callData = abi.encodeWithSelector(
                tasks.completeByDispute.selector,
                _taskId
            );
            actions[0] = IDAO.Action(address(tasks), 0, callData);
        }

        governancePlugin.createPluginProposal(
            _metadata,
            actions,
            0,
            _startDate,
            _endDate
        );
    }
}
