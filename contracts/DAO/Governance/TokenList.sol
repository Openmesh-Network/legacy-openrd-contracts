// SPDX-License-Identifier: None
pragma solidity ^0.8.0;

import {CheckpointsUpgradeable} from "@openzeppelin/contracts-upgradeable/utils/CheckpointsUpgradeable.sol";

import {_uncheckedAdd, _uncheckedSub} from "@aragon/osx/utils/UncheckedMath.sol";

// Based on https://github.com/aragon/osx/blob/develop/packages/contracts/src/plugins/utils/Addresslist.sol
abstract contract TokenList {
    using CheckpointsUpgradeable for CheckpointsUpgradeable.History;

    event TokensAdded(uint256[] tokens);
    event TokensRemoved(uint256[] tokens);

    /// @notice The mapping containing the checkpointed history of the token list.
    mapping(uint256 => CheckpointsUpgradeable.History) private _tokenlistCheckpoints;

    /// @notice The checkpointed history of the length of the address list.
    CheckpointsUpgradeable.History private _tokenlistLengthCheckpoints;

    /// @notice Thrown when the token list update is invalid, which can be caused by the addition of an existing tokenId or removal of a non-existing tokenId.
    /// @param tokenId The first invalid tokenId.
    error InvalidTokenlistUpdate(uint256 tokenId);

    /// @notice Checks if a tokenId is on the address list at a specific block number.
    /// @param _tokenId The tokenId being checked.
    /// @param _blockNumber The block number.
    /// @return Whether the tokenId is listed at the specified block number.
    function isListedAtBlock(
        uint256 _tokenId,
        uint256 _blockNumber
    ) public view virtual returns (bool) {
        return _tokenlistCheckpoints[_tokenId].getAtBlock(_blockNumber) == 1;
    }

    /// @notice Checks if a tokenId is currently on the address list.
    /// @param _tokenId The tokenId being checked.
    /// @return Whether the tokenId is currently listed.
    function isListed(uint256 _tokenId) public view virtual returns (bool) {
        return _tokenlistCheckpoints[_tokenId].latest() == 1;
    }

    /// @notice Returns the length of the token list at a specific block number.
    /// @param _blockNumber The specific block to get the count from. If `0`, then the latest checkpoint value is returned.
    /// @return The token list length at the specified block number.
    function tokenlistLengthAtBlock(uint256 _blockNumber) public view virtual returns (uint256) {
        return _tokenlistLengthCheckpoints.getAtBlock(_blockNumber);
    }

    /// @notice Returns the current length of the token list.
    /// @return The current token list length.
    function tokenlistLength() public view virtual returns (uint256) {
        return _tokenlistLengthCheckpoints.latest();
    }

    /// @notice Internal function to add new tokens to the token list.
    /// @param _newTokens The new tokens to be added.
    function _addTokens(uint256[] calldata _newTokens) internal virtual {
        for (uint256 i; i < _newTokens.length; ) {
            if (isListed(_newTokens[i])) {
                revert InvalidTokenlistUpdate(_newTokens[i]);
            }

            // Mark the address as listed
            _tokenlistCheckpoints[_newTokens[i]].push(1);

            unchecked {
                ++i;
            }
        }
        _tokenlistLengthCheckpoints.push(_uncheckedAdd, _newTokens.length);

        emit TokensAdded(_newTokens);
    }

    /// @notice Internal function to remove existing tokens from the token list.
    /// @param _exitingTokens The existing tokens to be removed.
    function _removeTokens(uint256[] calldata _exitingTokens) internal virtual {
        for (uint256 i; i < _exitingTokens.length; ) {
            if (!isListed(_exitingTokens[i])) {
                revert InvalidTokenlistUpdate(_exitingTokens[i]);
            }

            // Mark the address as not listed
            _tokenlistCheckpoints[_exitingTokens[i]].push(0);

            unchecked {
                ++i;
            }
        }
        _tokenlistLengthCheckpoints.push(_uncheckedSub, _exitingTokens.length);

        emit TokensRemoved(_exitingTokens);
    }

    /// @dev This empty reserved space is put in place to allow future versions to add new
    /// variables without shifting down storage in the inheritance chain.
    /// https://docs.openzeppelin.com/contracts/4.x/upgradeable#storage_gaps
    uint256[48] private __gap;
}
