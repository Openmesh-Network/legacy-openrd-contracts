// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

import { IDAO } from "@aragon/osx/core/dao/IDAO.sol";

interface INFTMultisig {
    /// @notice A container for proposal-related information.
    /// @param executed Whether the proposal is executed or not.
    /// @param approvals The number of approvals casted.
    /// @param parameters The proposal-specific approve settings at the time of the proposal creation.
    /// @param approvers The token ids of the tokens that approved.
    /// @param actions The actions to be executed when the proposal passes.
    /// @param metadata The metadata of the proposal.
    struct ProposalData {
        bool executed;
        uint256 approvals;
        ProposalParameters parameters;
        mapping(uint256 => bool) approvers;
        IDAO.Action[] actions;
        bytes metadata;
    }

    /// @notice A container for the proposal parameters.
    /// @param approvalThreshold The percentage of total supply that has to approve. The value has to be in the interval [0, 10^6] defined by `RATIO_BASE = 10**6`.
    /// @param snapshotBlock The number of the block prior to the proposal creation.
    /// @param startDate The timestamp when the proposal starts.
    /// @param endDate The timestamp when the proposal expires.
    struct ProposalParameters {
        uint32 approvalThreshold;
        uint64 snapshotBlock;
        uint64 startDate;
        uint64 endDate;
    }

    /// @notice A container for the plugin settings.
    /// @param approvalThreshold The percentage of total supply that has to approve. The value has to be in the interval [0, 10^6] defined by `RATIO_BASE = 10**6`.
    struct MultisigSettings {
        uint32 approvalThreshold;
    }

    /// @notice Updates the plugin settings.
    /// @param _multisigSettings The new settings.
    function updateMultisigSettings(
        MultisigSettings calldata _multisigSettings
    ) external;

    /// @notice Creates a new multisig proposal.
    /// @param _metadata The metadata of the proposal.
    /// @param _actions The actions that will be executed after the proposal passes.
    /// @param _startDate The start date of the proposal.
    /// @param _endDate The end date of the proposal.
    /// @return proposalId The ID of the proposal.
    function createProposal(
        bytes calldata _metadata,
        IDAO.Action[] calldata _actions,
        uint64 _startDate,
        uint64 _endDate
    ) external returns (uint256 proposalId);

    function approve(uint256 _proposalId, uint256 _tokenId) external;

    function approveAll(uint256 _proposalId) external;

    function execute(uint256 _proposalId) external;

    function canApprove(uint256 _proposalId, uint256 _tokenId) external view returns (bool);

    function hasApproved(uint256 _proposalId, uint256 _tokenId) external view returns (bool);

    function canExecute(uint256 _proposalId) external view returns (bool);

    /// @notice Returns all information for a proposal vote by its ID.
    /// @param _proposalId The ID of the proposal.
    /// @return executed Whether the proposal is executed or not.
    /// @return approvals The number of approvals casted.
    /// @return parameters The parameters of the proposal vote.
    /// @return actions The actions to be executed in the associated DAO after the proposal has passed.
    function getProposal(
        uint256 _proposalId
    )
        external
        view
        returns (
            bool executed,
            uint256 approvals,
            ProposalParameters memory parameters,
            IDAO.Action[] memory actions,
            bytes memory metadata
        );
}
