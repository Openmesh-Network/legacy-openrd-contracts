// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

import { IERC20 } from "@openzeppelin/contracts/token/ERC20/IERC20.sol";

interface ITasks {
    /// @notice A container for ERC20 transfer information.
    /// @param tokenContract The ERC20 token to transfer.
    /// @param amount How much of this token should be transfered.
    struct ERC20Transfer {
        IERC20 tokenContract;
        uint256 amount;
    }

    /// @notice A container for proposal-related information.
    /// @param completed Whether the task has been completed already.
    /// @param expired Whether the task has been marked as expired.
    /// @param expiry The block timestamp at which this proposal expires if not completed.
    /// @param reward The ERC20 transfers to be executed upon proposal completion.
    /// @param metadata The metadata of the task.
    struct Task {
        bool completed;
        bool expired;
        uint64 expiry;
        ERC20Transfer[] reward;
        bytes metadata;
    }

    /// @notice Retrieves the current amount of created tasks.
    function taskCount() external view returns (uint256);

    function createTask(
        bytes calldata _metadata,
        uint64 _expiry,
        ERC20Transfer[] calldata _reward
    ) external returns (uint256 taskId);

    function getTask(
        uint256 _taskId
    ) external view returns (Task memory task);

    function completeTask(
        uint256 _taskId,
        address _completer
    ) external;

    function markTaskExpired(
        uint256 _taskId
    ) external;
}
