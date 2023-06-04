// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

import { Counters } from "@openzeppelin/contracts/utils/Counters.sol";

import { ITasks, IERC20 } from "./ITasks.sol";
import { Plugin, IDAO } from "@aragon/osx/core/plugin/Plugin.sol";

contract Tasks is Plugin, ITasks {
    using Counters for Counters.Counter;

    /// @notice The ID of the permission required to create and complete tasks.
    bytes32 public constant MANAGE_TASKS_PERMISSION_ID =
        keccak256("MANAGE_TASKS_PERMISSION");

    /// @notice The ID of the permission required to bypass tasks and withdraw funds from the contract.
    bytes32 public constant ADMIN_WITHDRAWAL_PERMISSION_ID =
        keccak256("ADMIN_WITHDRAWAL_PERMISSION");

    /// @notice The incremental ID for tasks.
    Counters.Counter private taskCounter;

    /// @notice A mapping between task IDs and task information.
    mapping(uint256 => Task) internal tasks;
    
    /// @notice A mapping between ERC20 contract and reserved balance.
    mapping(IERC20 => uint256) internal balanceReserve;

    constructor(IDAO _dao) Plugin(_dao) {

    }
        
    /// @notice Checks if this or the parent contract supports an interface by its ID.
    /// @param _interfaceId The ID of the interface.
    /// @return Returns `true` if the interface is supported.
    function supportsInterface(
        bytes4 _interfaceId
    ) public view virtual override returns (bool) {
        return
            _interfaceId == type(ITasks).interfaceId ||
            super.supportsInterface(_interfaceId);
    }

    /// @inheritdoc ITasks
    function taskCount() public view returns (uint256) {
        return taskCounter.current();
    }

    /// @notice Creates a task ID.
    /// @return taskId The task ID.
    function _createTaskId() internal returns (uint256 taskId) {
        taskId = taskCount();
        taskCounter.increment();
    }

    /// @inheritdoc ITasks
    function createTask(
        bytes calldata _metadata,
        uint64 _expiry,
        ERC20Transfer[] calldata _reward
    ) external auth(MANAGE_TASKS_PERMISSION_ID) returns (uint256 taskId) {
        // Create the task
        taskId = _createTaskId();

        Task storage task_ = tasks[taskId];
        task_.expiry = _expiry;

        // Set and check reserved balance
        for (uint i; i < _reward.length; ) {
            balanceReserve[_reward[i].tokenContract] += _reward[i].amount;
            require(_reward[i].tokenContract.balanceOf(address(this)) >= balanceReserve[_reward[i].tokenContract], "Not enough balance to be able to reward this task");
            task_.reward.push(_reward[i]);

            unchecked {
                i++;
            }
        }
        
        task_.metadata = _metadata;
    }

    /// @inheritdoc ITasks
    function getTask(
        uint256 _taskId
    ) external view returns (Task memory task) {
        task = tasks[_taskId];
    }

    /// @inheritdoc ITasks
    function completeTask(
        uint256 _taskId,
        address _completer
    ) external auth(MANAGE_TASKS_PERMISSION_ID) {
        require(_taskId < taskCount(), "Task does not exist");
        Task storage task = tasks[_taskId];
        require(!task.completed, "Task already completed");
        require(block.timestamp <= task.expiry, "Task expired");
        
        for (uint i; i < task.reward.length; ) {
            task.reward[i].tokenContract.transfer(_completer, task.reward[i].amount);
            balanceReserve[task.reward[i].tokenContract] -= task.reward[i].amount;

            unchecked {
                i++;
            }
        }
        task.completed = true;
    }

    /// @inheritdoc ITasks
    function markTaskExpired(
        uint256 _taskId
    ) external {
        require(_taskId < taskCount(), "Task does not exist");
        Task storage task = tasks[_taskId];
        require(!task.completed, "Task is completed");
        require(!task.expired, "Task already marked as expired");
        require(block.timestamp > task.expiry, "Task not expired yet");

        // Undo balance reservation
        for (uint i; i < task.reward.length; ) {
            balanceReserve[task.reward[i].tokenContract] -= task.reward[i].amount;

            unchecked {
                i++;
            }
        }
        task.expired = true;
    }

    function adminWithdrawal(address _to, uint256 _value, bytes memory _data) external auth(ADMIN_WITHDRAWAL_PERMISSION_ID) returns (bool, bytes memory) {
        return _to.call{value: _value}(_data);
    }
}
