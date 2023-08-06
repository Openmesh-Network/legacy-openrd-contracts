// SPDX-License-Identifier: None
pragma solidity ^0.8.0;

import {IDAO} from "@aragon/osx/core/dao/IDAO.sol";

bytes32 constant PLUGIN_PROPOSAL_PERMISSION_ID = keccak256(
    "PLUGIN_PROPOSAL_PERMISSION"
);

interface IPluginProposals {
    /// @notice Allows other plugins to create proposals
    /// @param _metadata The proposal metadata.
    /// @param _actions The proposal actions.
    /// @param _allowFailureMap The proposal failure map.
    /// @param _startDate The proposal start date.
    /// @param _endDate The proposal end date.
    /// @return proposalId The id of the created proposal.
    function createPluginProposal(
        bytes calldata _metadata,
        IDAO.Action[] calldata _actions,
        uint256 _allowFailureMap,
        uint64 _startDate,
        uint64 _endDate
    ) external returns (uint256 proposalId);
}
