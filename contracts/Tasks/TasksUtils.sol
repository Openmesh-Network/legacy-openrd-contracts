// SPDX-License-Identifier: None
pragma solidity ^0.8.0;

import {Escrow, TasksEnsure} from "./TasksEnsure.sol";

/*
  Higher level functions to allow the Tasks file to be more readable.
*/
abstract contract TasksUtils is TasksEnsure {
    function _toOffchainTask(
        Task storage task
    ) internal view returns (OffChainTask memory offchainTask) {
        offchainTask.metadata = task.metadata;
        offchainTask.deadline = task.deadline;
        offchainTask.executorApplication = task.executorApplication;
        offchainTask.creator = task.creator;
        offchainTask.manager = task.manager;
        offchainTask.state = task.state;
        offchainTask.escrow = task.escrow;
        offchainTask.nativeBudget = task.nativeBudget;

        offchainTask.budget = new ERC20Transfer[](task.budgetCount);
        for (uint8 i; i < offchainTask.budget.length; ) {
            offchainTask.budget[i] = task.budget[i];
            unchecked {
                ++i;
            }
        }

        offchainTask.applications = new OffChainApplication[](
            task.applicationCount
        );
        for (uint8 i; i < offchainTask.applications.length; ) {
            Application storage application = task.applications[i];
            offchainTask.applications[i].metadata = application.metadata;
            offchainTask.applications[i].applicant = application.applicant;
            offchainTask.applications[i].accepted = application.accepted;

            offchainTask.applications[i].reward = new Reward[](
                application.rewardCount
            );
            for (uint8 j; j < offchainTask.applications[i].reward.length; ) {
                offchainTask.applications[i].reward[j] = application.reward[j];
                unchecked {
                    ++j;
                }
            }
            offchainTask.applications[i].nativeReward = new NativeReward[](
                application.nativeRewardCount
            );

            for (
                uint8 j;
                j < offchainTask.applications[i].nativeReward.length;

            ) {
                offchainTask.applications[i].nativeReward[j] = application
                    .nativeReward[j];
                unchecked {
                    ++j;
                }
            }
            unchecked {
                ++i;
            }
        }

        offchainTask.submissions = new Submission[](task.submissionCount);
        for (uint8 i; i < offchainTask.submissions.length; ) {
            offchainTask.submissions[i] = task.submissions[i];
            unchecked {
                ++i;
            }
        }

        offchainTask.cancelTaskRequests = new CancelTaskRequest[](
            task.cancelTaskRequestCount
        );
        for (uint8 i; i < offchainTask.cancelTaskRequests.length; ) {
            offchainTask.cancelTaskRequests[i] = task.cancelTaskRequests[i];
            unchecked {
                ++i;
            }
        }
    }

    function _increaseBudgetToReward(
        Task storage task,
        uint8 _length,
        mapping(uint8 => Reward) storage _reward,
        uint8 _nativeLength,
        mapping(uint8 => NativeReward) storage _nativeReward
    ) internal returns (bool increasedBudget) {
        // Gas optimzation
        if (_length != 0) {
            uint8 j;
            ERC20Transfer memory erc20Transfer = task.budget[0];
            uint256 needed;
            for (uint8 i; i < _length; ) {
                unchecked {
                    needed += _reward[i].amount;
                }

                if (_reward[i].nextToken) {
                    if (needed > erc20Transfer.amount) {
                        // Existing budget in escrow doesnt cover the needed reward
                        erc20Transfer.tokenContract.transferFrom(
                            msg.sender,
                            address(task.escrow),
                            needed - erc20Transfer.amount
                        );

                        uint256 got = erc20Transfer.tokenContract.balanceOf(
                            address(task.escrow)
                        );

                        if (got < needed) {
                            // Apparently there is a tax / fee on the token transfer
                            revert ManualBudgetIncreaseNeeded();
                        }

                        task.budget[j].amount = _toUint96(got);
                        increasedBudget = true;
                    }

                    needed = 0;
                    unchecked {
                        erc20Transfer = task.budget[++j];
                    }
                }

                unchecked {
                    ++i;
                }
            }
        }

        if (_nativeLength != 0) {
            uint256 nativeNeeded;
            for (uint8 i; i < _nativeLength; ) {
                nativeNeeded += _nativeReward[i].amount;
                unchecked {
                    ++i;
                }
            }

            if (nativeNeeded > task.nativeBudget) {
                unchecked {
                    if (msg.value != nativeNeeded - task.nativeBudget) {
                        revert IncorrectAmountOfNativeCurrencyAttached();
                    }
                }

                (bool success, ) = address(task.escrow).call{value: msg.value}(
                    ""
                );
                if (!success) {
                    revert NativeTransferFailed();
                }

                task.nativeBudget = nativeNeeded;
                increasedBudget = true;
            }
        }
    }

    function _setRewardBellowBudget(
        Task storage task,
        Application storage application,
        Reward[] calldata _reward,
        NativeReward[] calldata _nativeReward
    ) internal {
        // Gas optimzation
        if (_reward.length != 0) {
            application.rewardCount = _toUint8(_reward.length);

            uint8 j;
            ERC20Transfer memory erc20Transfer = task.budget[0];
            uint256 alreadyReserved;
            for (uint8 i; i < uint8(_reward.length); ) {
                unchecked {
                    alreadyReserved += _reward[i].amount;
                }

                application.reward[i] = _reward[i];

                if (_reward[i].nextToken) {
                    if (alreadyReserved > erc20Transfer.amount) {
                        revert RewardAboveBudget();
                    }
                    alreadyReserved = 0;
                    unchecked {
                        erc20Transfer = task.budget[++j];
                    }
                }

                unchecked {
                    ++i;
                }
            }
        }

        // Gas optimzation
        if (_nativeReward.length != 0) {
            application.nativeRewardCount = _toUint8(_nativeReward.length);
            uint256 nativeReserved;
            for (uint8 i; i < uint8(_nativeReward.length); ) {
                unchecked {
                    nativeReserved += _nativeReward[i].amount;
                }

                application.nativeReward[i] = _nativeReward[i];

                unchecked {
                    ++i;
                }
            }

            if (nativeReserved > task.nativeBudget) {
                revert RewardAboveBudget();
            }
        }
    }

    function _payoutTask(Task storage task) internal {
        Application storage executor = task.applications[
            task.executorApplication
        ];
        address creator = task.creator;
        Escrow escrow = task.escrow;

        // Gas optimzation
        uint8 rewardCount = executor.rewardCount;
        if (rewardCount != 0) {
            uint8 j;
            uint8 budgetCount = task.budgetCount;
            for (uint8 i; i < budgetCount; ) {
                ERC20Transfer memory erc20Transfer = task.budget[i];
                while (j < rewardCount) {
                    Reward memory reward = executor.reward[j];
                    escrow.transfer(
                        erc20Transfer.tokenContract,
                        reward.to,
                        reward.amount
                    );

                    unchecked {
                        erc20Transfer.amount -= reward.amount;
                        ++j;
                    }

                    if (reward.nextToken) {
                        break;
                    }
                }

                // Gas optimization
                if (erc20Transfer.amount != 0) {
                    escrow.transfer(
                        erc20Transfer.tokenContract,
                        creator,
                        erc20Transfer.amount
                    );
                }

                unchecked {
                    ++i;
                }
            }
        }

        // Gas optimzation
        uint8 nativeRewardCount = executor.nativeRewardCount;
        if (nativeRewardCount != 0) {
            uint256 paidOut;
            for (uint8 i; i < nativeRewardCount; ) {
                escrow.transferNative(
                    payable(executor.nativeReward[i].to),
                    executor.nativeReward[i].amount
                );
                unchecked {
                    paidOut += executor.nativeReward[i].amount;
                }

                unchecked {
                    ++i;
                }
            }

            // Gas optimzation
            if (paidOut < task.nativeBudget) {
                unchecked {
                    escrow.transferNative(
                        payable(task.creator),
                        task.nativeBudget - paidOut
                    );
                }
            }
        }

        task.state = TaskState.Closed;
    }

    function _refundCreator(Task storage task) internal {
        Escrow escrow = task.escrow;
        address creator = task.creator;

        uint8 budgetCount = task.budgetCount;
        if (budgetCount != 0) {
            for (uint8 i; i < budgetCount; ) {
                ERC20Transfer memory erc20Transfer = task.budget[i];
                escrow.transfer(
                    erc20Transfer.tokenContract,
                    creator,
                    erc20Transfer.amount
                );

                unchecked {
                    ++i;
                }
            }
        }

        // Gas optimzation
        if (task.nativeBudget != 0) {
            escrow.transferNative(payable(creator), task.nativeBudget);
        }

        task.state = TaskState.Closed;
    }

    function _payoutTaskPartially(
        Task storage task,
        uint88[] calldata _partialReward,
        uint96[] calldata _partialNativeReward
    ) internal {
        Application storage executor = task.applications[
            task.executorApplication
        ];
        Escrow escrow = task.escrow;

        // Gas optimzation
        uint8 rewardCount = executor.rewardCount;
        if (rewardCount != 0) {
            uint8 j;
            uint8 budgetCount = task.budgetCount;
            for (uint8 i; i < budgetCount; ) {
                ERC20Transfer memory erc20Transfer = task.budget[i];
                while (j < rewardCount) {
                    Reward memory reward = executor.reward[j];
                    if (_partialReward[j] > reward.amount) {
                        revert PartialRewardAboveFullReward();
                    }

                    escrow.transfer(
                        erc20Transfer.tokenContract,
                        reward.to,
                        _partialReward[j]
                    );

                    unchecked {
                        executor.reward[j].amount =
                            reward.amount -
                            _partialReward[j];

                        ++j;
                    }

                    if (reward.nextToken) {
                        break;
                    }
                }

                task.budget[i].amount = _toUint96(
                    erc20Transfer.tokenContract.balanceOf(address(escrow))
                );

                unchecked {
                    ++i;
                }
            }
        }

        // Gas optimzation
        uint8 nativeRewardCount = executor.nativeRewardCount;
        if (nativeRewardCount != 0) {
            uint256 paidOut;
            for (uint8 i; i < nativeRewardCount; ) {
                if (_partialNativeReward[i] > executor.nativeReward[i].amount) {
                    revert PartialRewardAboveFullReward();
                }

                escrow.transferNative(
                    payable(executor.nativeReward[i].to),
                    _partialNativeReward[i]
                );

                unchecked {
                    paidOut += _partialNativeReward[i];
                    executor.nativeReward[i].amount -= _partialNativeReward[i];
                    ++i;
                }
            }

            unchecked {
                task.nativeBudget -= paidOut;
            }
        }
    }

    // From: https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/proxy/Clones.sol
    function clone(address implementation) internal returns (address instance) {
        /// @solidity memory-safe-assembly
        assembly {
            // Cleans the upper 96 bits of the `implementation` word, then packs the first 3 bytes
            // of the `implementation` address with the bytecode before the address.
            mstore(
                0x00,
                or(
                    shr(0xe8, shl(0x60, implementation)),
                    0x3d602d80600a3d3981f3363d3d373d3d3d363d73000000
                )
            )
            // Packs the remaining 17 bytes of `implementation` with the bytecode after the address.
            mstore(
                0x20,
                or(shl(0x78, implementation), 0x5af43d82803e903d91602b57fd5bf3)
            )
            instance := create(0, 0x09, 0x37)
        }
        if (instance == address(0)) {
            revert ERC1167FailedCreateClone();
        }
    }

    // From: https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/utils/Strings.sol
    function equal(
        string memory a,
        string memory b
    ) internal pure returns (bool) {
        return keccak256(bytes(a)) == keccak256(bytes(b));
    }
}
