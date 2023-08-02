// SPDX-License-Identifier: None
pragma solidity ^0.8.0;

import { SafeCastUpgradeable } from "@openzeppelin/contracts-upgradeable/utils/math/SafeCastUpgradeable.sol";
import { RATIO_BASE, _applyRatioCeiled } from "@aragon/osx/plugins/utils/Ratio.sol";
import { TokenList } from "./TokenList.sol";

import { TokenMajorityVotingBase, IDAO, IERC721 } from "../TokenMajorityVoting/TokenMajorityVotingBase.sol";
import { ITokenMembership } from "../TokenMembership/ITokenMembership.sol";
import { ITokenListGovernance } from "./ITokenListGovernance.sol";
import { IPluginProposals, PLUGIN_PROPOSAL_PERMISSION_ID } from "./IPluginProposals.sol";

// Based on https://github.com/aragon/osx/blob/develop/packages/contracts/src/plugins/governance/majority-voting/addresslist/AddresslistVoting.sol
contract TokenListGovernance is TokenMajorityVotingBase, TokenList, ITokenMembership, ITokenListGovernance, IPluginProposals {
 using SafeCastUpgradeable for uint256;
 
    /// @notice The ID of the permission required to call the `addMembers` and `removeMembers` functions.
    bytes32 public constant UPDATE_MEMBERS_PERMISSION_ID = keccak256("UPDATE_MEMBERS_PERMISSION");

    /// @notice Initializes the component.
    /// @dev This method is required to support [ERC-1822](https://eips.ethereum.org/EIPS/eip-1822).
    /// @param _dao The IDAO interface of the associated DAO.
    /// @param _votingSettings The voting settings.
    /// @param _tokenCollection The ERC721 contract that defines who has what token.
    /// @param _members Initial members of the DAO.
    function initialize(
        IDAO _dao,
        VotingSettings calldata _votingSettings,
        IERC721 _tokenCollection,
        uint256[] calldata _members
    ) external initializer {
        __TokenMajorityVotingBase_init(_dao, _votingSettings, _tokenCollection);

        _addTokens(_members);
    }

    /// @notice Checks if this or the parent contract supports an interface by its ID.
    /// @param _interfaceId The ID of the interface.
    /// @return Returns `true` if the interface is supported.
    function supportsInterface(bytes4 _interfaceId) public view virtual override returns (bool) {
        return _interfaceId == type(ITokenListGovernance).interfaceId || super.supportsInterface(_interfaceId);
    }

    /// @inheritdoc ITokenListGovernance
    function addMembers(
        uint256[] calldata _members
    ) external auth(UPDATE_MEMBERS_PERMISSION_ID) {
        _addTokens(_members);
    }

    /// @inheritdoc ITokenListGovernance
    function removeMembers(
        uint256[] calldata _members
    ) external auth(UPDATE_MEMBERS_PERMISSION_ID) {
        _removeTokens(_members);
    }

    /// @inheritdoc TokenMajorityVotingBase
    function totalVotingPower(uint256 _blockNumber) public view override returns (uint256) {
        return tokenlistLengthAtBlock(_blockNumber);
    }
    
    /// @inheritdoc IPluginProposals
    function createPluginProposal(
        bytes calldata _metadata,
        IDAO.Action[] calldata _actions,
        uint256 _allowFailureMap,
        uint64 _startDate,
        uint64 _endDate
    ) external auth(PLUGIN_PROPOSAL_PERMISSION_ID) returns (uint256 proposalId) {
        proposalId = _createProposalBase(
            _metadata,
            _actions,
            _allowFailureMap,
            _startDate,
            _endDate
        );
    }

    /// @inheritdoc TokenMajorityVotingBase
    function createProposal(
        bytes calldata _metadata,
        IDAO.Action[] calldata _actions,
        uint256 _allowFailureMap,
        uint64 _startDate,
        uint64 _endDate,
        VoteOption _voteOption,
        bool _tryEarlyExecution,
        uint256 _tokenId
    ) external override returns (uint256 proposalId) {
        if (tokenCollection.ownerOf(_tokenId) != _msgSender()) {
            revert TokenNotOwnedBySender(_tokenId, _msgSender());
        }

        if (minProposerVotingPower() != 0 && !isListed(_tokenId)) {
            revert ProposalCreationForbidden(_tokenId);
        }

        proposalId = _createProposalBase(
            _metadata,
            _actions,
            _allowFailureMap,
            _startDate,
            _endDate
        );

        if (_voteOption != VoteOption.None) {
            vote(proposalId, _voteOption, _tryEarlyExecution, _tokenId);
        }
    }
    
    /// @inheritdoc ITokenMembership
    function isMember(uint256 _account) external view override returns (bool) {
        return isListed(_account);
    }

    function _createProposalBase(
        bytes calldata _metadata,
        IDAO.Action[] calldata _actions,
        uint256 _allowFailureMap,
        uint64 _startDate,
        uint64 _endDate
    ) internal returns (uint256 proposalId) {
        uint64 snapshotBlock;
        unchecked {
            snapshotBlock = block.number.toUint64() - 1; // The snapshot block must be mined already to protect the transaction against backrunning transactions causing census changes.
        }

        (_startDate, _endDate) = _validateProposalDates(_startDate, _endDate);

        proposalId = _createProposal({
            _creator: _msgSender(),
            _metadata: _metadata,
            _startDate: _startDate,
            _endDate: _endDate,
            _actions: _actions,
            _allowFailureMap: _allowFailureMap
        });

        // Store proposal related information
        Proposal storage proposal_ = proposals[proposalId];

        proposal_.parameters.startDate = _startDate;
        proposal_.parameters.endDate = _endDate;
        proposal_.parameters.snapshotBlock = snapshotBlock;
        proposal_.parameters.votingMode = votingMode();
        proposal_.parameters.supportThreshold = supportThreshold();
        proposal_.parameters.minVotingPower = _applyRatioCeiled(
            totalVotingPower(snapshotBlock),
            minParticipation()
        );

        // Reduce costs
        if (_allowFailureMap != 0) {
            proposal_.allowFailureMap = _allowFailureMap;
        }

        for (uint256 i; i < _actions.length; ) {
            proposal_.actions.push(_actions[i]);
            unchecked {
                ++i;
            }
        }
    }

    /// @inheritdoc TokenMajorityVotingBase
    function _vote(
        uint256 _proposalId,
        VoteOption _voteOption,
        uint256 _voter,
        bool _tryEarlyExecution
    ) internal override {
        Proposal storage proposal_ = proposals[_proposalId];

        VoteOption state = proposal_.voters[_voter];

        // Remove the previous vote.
        if (state == VoteOption.Yes) {
            proposal_.tally.yes = proposal_.tally.yes - 1;
        } else if (state == VoteOption.No) {
            proposal_.tally.no = proposal_.tally.no - 1;
        } else if (state == VoteOption.Abstain) {
            proposal_.tally.abstain = proposal_.tally.abstain - 1;
        }

        // Store the updated/new vote for the voter.
        if (_voteOption == VoteOption.Yes) {
            proposal_.tally.yes = proposal_.tally.yes + 1;
        } else if (_voteOption == VoteOption.No) {
            proposal_.tally.no = proposal_.tally.no + 1;
        } else if (_voteOption == VoteOption.Abstain) {
            proposal_.tally.abstain = proposal_.tally.abstain + 1;
        }

        proposal_.voters[_voter] = _voteOption;

        emit VoteCast({
            proposalId: _proposalId,
            voter: _voter,
            voteOption: _voteOption,
            votingPower: 1
        });

        if (_tryEarlyExecution && _canExecute(_proposalId)) {
            _execute(_proposalId);
        }
    }

    /// @inheritdoc TokenMajorityVotingBase
    function _canVote(
        uint256 _proposalId,
        uint256 _account,
        VoteOption _voteOption
    ) internal view override returns (bool) {
        Proposal storage proposal_ = proposals[_proposalId];

        // The proposal vote hasn't started or has already ended.
        if (!_isProposalOpen(proposal_)) {
            return false;
        }

        // The voter votes `None` which is not allowed.
        if (_voteOption == VoteOption.None) {
            return false;
        }

        // The voter has no voting power.
        if (!isListedAtBlock(_account, proposal_.parameters.snapshotBlock)) {
            return false;
        }

        // The voter has already voted but vote replacement is not allowed.
        if (
            proposal_.voters[_account] != VoteOption.None &&
            proposal_.parameters.votingMode != VotingMode.VoteReplacement
        ) {
            return false;
        }

        return true;
    }

    /// @dev This empty reserved space is put in place to allow future versions to add new
    /// variables without shifting down storage in the inheritance chain.
    /// https://docs.openzeppelin.com/contracts/4.x/upgradeable#storage_gaps
    uint256[50] private __gap;
}