// SPDX-License-Identifier: UNLICENSED
// Based on 
// - Multisig: https://github.com/aragon/osx/blob/develop/packages/contracts/src/plugins/governance/multisig/Multisig.sol
// - MajorityVotingBase: https://github.com/aragon/osx/blob/develop/packages/contracts/src/plugins/governance/majority-voting/MajorityVotingBase.sol
pragma solidity ^0.8.0;

import { IMembership } from "@aragon/osx/core/plugin/membership/IMembership.sol";
import { Plugin, IDAO } from "@aragon/osx/core/plugin/Plugin.sol";

import { Proposal } from "@aragon/osx/core/plugin/proposal/Proposal.sol";
import { INFTMultisig } from "./INFTMultisig.sol";

import { IERC721Enumerable } from "@openzeppelin/contracts/token/ERC721/extensions/IERC721Enumerable.sol";
import { SafeCast } from "@openzeppelin/contracts/utils/math/SafeCast.sol";
import { RATIO_BASE, RatioOutOfBounds } from "@aragon/osx/plugins/utils/Ratio.sol";

contract NFTMultisig is 
    INFTMultisig,
    IMembership,
    Plugin,
    Proposal
{
    using SafeCast for uint256;

    /// @notice The ID of the permission required to change the multisigSettings.
    bytes32 public constant UPDATE_MULTISIG_SETTINGS_PERMISSION_ID =
        keccak256("UPDATE_MULTISIG_SETTINGS_PERMISSION");

    /// @notice A mapping between proposal IDs and proposal information.
    mapping(uint256 => ProposalData) internal proposals;

    /// @notice The current plugin settings.
    MultisigSettings public multisigSettings;

    /// @notice The current nft contract.
    /// @dev Enumerable is needed to get total supply.
    IERC721Enumerable public nftContract;
    
    constructor(IDAO _dao, MultisigSettings memory _multisigSettings, address _nftContractAddress) Plugin(_dao) {
        _updateMultisigSettings(_multisigSettings);
        nftContract = IERC721Enumerable(_nftContractAddress);
    }
    
    /// @notice Checks if this or the parent contract supports an interface by its ID.
    /// @param _interfaceId The ID of the interface.
    /// @return Returns `true` if the interface is supported.
    function supportsInterface(
        bytes4 _interfaceId
    ) public view virtual override(Plugin, Proposal) returns (bool) {
        return
            _interfaceId == type(INFTMultisig).interfaceId ||
            _interfaceId == type(IMembership).interfaceId ||
            Plugin.supportsInterface(_interfaceId) ||
            Proposal.supportsInterface(_interfaceId);
    }

    /// @inheritdoc INFTMultisig
    function updateMultisigSettings(
        MultisigSettings calldata _multisigSettings
    ) external auth(UPDATE_MULTISIG_SETTINGS_PERMISSION_ID) {
        _updateMultisigSettings(_multisigSettings);
    }

    /// @inheritdoc INFTMultisig
    function createProposal(
        bytes calldata _metadata,
        IDAO.Action[] calldata _actions,
        uint64 _startDate,
        uint64 _endDate
    ) external returns (uint256 proposalId) {
        require(nftContract.balanceOf(_msgSender()) > 0, "Proposer needs to hold at least 1 NFT");

        uint64 snapshotBlock;
        unchecked {
            snapshotBlock = block.number.toUint64() - 1; // The snapshot block must be mined already to protect the transaction against backrunning transactions causing census changes.
        }

        if (_startDate == 0) {
            _startDate = block.timestamp.toUint64();
        } else {
            require(_startDate >= block.timestamp.toUint64(), "Start date needs to be after current block timestamp");
        }

        require(_endDate >= _startDate, "End date needs to be after start date");

        proposalId = _createProposal({
            _creator: _msgSender(),
            _metadata: _metadata,
            _startDate: _startDate,
            _endDate: _endDate,
            _actions: _actions,
            _allowFailureMap: 0
        });

        // Create the proposal
        ProposalData storage proposal_ = proposals[proposalId];

        proposal_.parameters.approvalThreshold = multisigSettings.approvalThreshold;
        proposal_.parameters.snapshotBlock = snapshotBlock;
        proposal_.parameters.startDate = _startDate;
        proposal_.parameters.endDate = _endDate;

        for (uint256 i; i < _actions.length; ) {
            proposal_.actions.push(_actions[i]);
            unchecked {
                ++i;
            }
        }

        proposal_.metadata = _metadata;
    }

    /// @inheritdoc INFTMultisig
    function approve(uint256 _proposalId, uint256 _tokenId) external {
        require(_canApprove(_proposalId, _tokenId, _msgSender()), "Not allowed to approve");

        ProposalData storage proposal_ = proposals[_proposalId];
        proposal_.approvers[_tokenId] = true;
        unchecked {
            proposal_.approvals += 1;
        }
    }

    /// @inheritdoc INFTMultisig
    function approveAll(uint256 _proposalId) external {
        uint256 tokensHeld = nftContract.balanceOf(_msgSender());
        ProposalData storage proposal_ = proposals[_proposalId];

        for (uint256 i; i < tokensHeld; ) {
            uint256 tokenId = nftContract.tokenOfOwnerByIndex(_msgSender(), i);
            require(_canApprove(_proposalId, tokenId, _msgSender()), "Not allowed to approve");
            proposal_.approvers[tokenId] = true;

            unchecked {
                i++;
            }
        }

        unchecked {
            proposal_.approvals += tokensHeld;
        }
    }

    /// @inheritdoc INFTMultisig
    function execute(uint256 _proposalId) external {
        require(_canExecute(_proposalId), "Not allowed to execute");

        _execute(_proposalId);
    }

    /// @inheritdoc INFTMultisig
    function canApprove(uint256 _proposalId, uint256 _tokenId) external view returns (bool) {
        return _canApprove(_proposalId, _tokenId, _msgSender());
    }

    /// @inheritdoc INFTMultisig
    function hasApproved(uint256 _proposalId, uint256 _tokenId) external view returns (bool) {
        return proposals[_proposalId].approvers[_tokenId];
    }

    /// @inheritdoc INFTMultisig
    function canExecute(uint256 _proposalId) external view returns (bool) {
        return _canExecute(_proposalId);
    }

    /// @inheritdoc INFTMultisig
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
        )
    {
        ProposalData storage proposal_ = proposals[_proposalId];

        executed = proposal_.executed;
        approvals = proposal_.approvals;
        parameters = proposal_.parameters;
        actions = proposal_.actions;
        metadata = proposal_.metadata;
    }

    /// @inheritdoc IMembership
    function isMember(address _account) external view returns (bool) {
        return nftContract.balanceOf(_account) > 0;
    }

    /// @notice Internal function to execute a vote. It assumes the queried proposal exists.
    /// @param _proposalId The ID of the proposal.
    function _execute(uint256 _proposalId) internal {
        ProposalData storage proposal_ = proposals[_proposalId];

        proposal_.executed = true;

        _executeProposal(
            dao(),
            _proposalId,
            proposals[_proposalId].actions,
            0
        );
    }

    /// @notice Internal function to check if an account can approve. It assumes the queried proposal exists.
    /// @param _proposalId The ID of the proposal.
    /// @param _tokenId The token id of the NFT wanting to be used to approve.
    /// @param _account The account to check.
    /// @return Returns `true` if the given account can approve on a certain proposal and `false` otherwise.
    function _canApprove(uint256 _proposalId, uint256 _tokenId, address _account) internal view returns (bool) {
        ProposalData storage proposal_ = proposals[_proposalId];

        if (!_isProposalOpen(proposal_)) {
            // The proposal was executed already
            return false;
        }

        if (nftContract.ownerOf(_tokenId) != _account) {
            // Account doesnt hold the NFT with this token id
            return false;
        }

        if (proposal_.approvers[_tokenId]) {
            // The NFT was already used to approve
            return false;
        }

        return true;
    }

    /// @notice Internal function to check if a proposal can be executed. It assumes the queried proposal exists.
    /// @param _proposalId The ID of the proposal.
    /// @return Returns `true` if the proposal can be executed and `false` otherwise.
    function _canExecute(uint256 _proposalId) internal view returns (bool) {
        ProposalData storage proposal_ = proposals[_proposalId];

        // Verify that the proposal has not been executed or expired.
        if (!_isProposalOpen(proposal_)) {
            return false;
        }

        return (RATIO_BASE - proposal_.parameters.approvalThreshold) * proposal_.approvals >
            proposal_.parameters.approvalThreshold * (nftContract.totalSupply() - proposal_.approvals);
    }

    /// @notice Internal function to check if a proposal vote is still open.
    /// @param proposal_ The proposal struct.
    /// @return True if the proposal vote is open, false otherwise.
    function _isProposalOpen(ProposalData storage proposal_) internal view returns (bool) {
        uint64 currentTimestamp64 = block.timestamp.toUint64();
        return
            !proposal_.executed &&
            proposal_.parameters.startDate <= currentTimestamp64 &&
            proposal_.parameters.endDate >= currentTimestamp64;
    }

    /// @notice Internal function to update the plugin settings.
    /// @param _multisigSettings The new settings.
    function _updateMultisigSettings(MultisigSettings memory _multisigSettings) internal {
        require(_multisigSettings.approvalThreshold < RATIO_BASE, "Approval threshold should be in the interval [0, 10^6-1].");

        multisigSettings = _multisigSettings;
    }
}
