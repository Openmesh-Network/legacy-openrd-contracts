// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import {IERC721} from "@openzeppelin/contracts/token/ERC721/IERC721.sol";

import {IERC20MintBurnable} from "./IERC20MintBurnable.sol";

contract VerifiedContributorStaking {
    IERC20MintBurnable public immutable rewardToken;
    IERC721 public immutable stakeNFT;
    uint256 public immutable tokensPerSecond;

    mapping(uint256 => uint64) private lastClaim;

    error NotYourNFT();
    error NFTAlreadyStaked();
    error NFTNotStaked();
    error Overflow();

    constructor(
        IERC20MintBurnable _rewardToken,
        IERC721 _stakeNFT,
        uint256 _tokensPerSecond
    ) {
        rewardToken = _rewardToken;
        stakeNFT = _stakeNFT;
        tokensPerSecond = _tokensPerSecond;
    }

    /// Stakes your NFT.
    /// @param _tokenId The id of the NFT to stake.
    function stake(uint256 _tokenId) external {
        if (stakeNFT.ownerOf(_tokenId) != msg.sender) {
            revert NotYourNFT();
        }
        if (lastClaim[_tokenId] != 0) {
            revert NFTAlreadyStaked();
        }

        lastClaim[_tokenId] = _toUint64(block.timestamp);
    }

    /// Unstakes your NFT.
    /// @param _tokenId The id of the NFT to unstake.
    function unstake(uint256 _tokenId) external {
        if (stakeNFT.ownerOf(_tokenId) != msg.sender) {
            revert NotYourNFT();
        }

        _claim(_tokenId);

        lastClaim[_tokenId] = 0;
    }

    /// Checks how much tokens are claimable.
    /// @param _tokenId The id of the NFT to check claimable tokens.
    function claimable(
        uint256 _tokenId
    ) public view returns (uint256 claimableTokens) {
        uint64 currentSeconds = _toUint64(block.timestamp);
        uint64 lastClaimSeconds = lastClaim[_tokenId];
        if (lastClaimSeconds == 0) {
            revert NFTNotStaked();
        }
        return (currentSeconds - lastClaimSeconds) * tokensPerSecond;
    }

    /// Claims all claimable tokens.
    /// @param _tokenId The id of the NFT to claim tokens for.
    /// @notice Can be called by any wallet, but tokens will be claimed to NFT owner.
    function claim(uint256 _tokenId) external {
        _claim(_tokenId);

        lastClaim[_tokenId] = _toUint64(block.timestamp);
    }

    /// Safecast uint256 to uint64.
    /// @param value The uint256 to cast.
    function _toUint64(uint256 value) internal pure returns (uint64) {
        if (value > type(uint64).max) {
            revert Overflow();
        }
        return uint64(value);
    }

    /// Mints claimable tokens to the NFT owner.
    /// @param _tokenId The NFT to claim the tokens for.
    /// @dev Due to gas optimization this does not update lastClaim, IS SHOULD ALWAYS BE UPDATED.
    function _claim(uint256 _tokenId) internal {
        rewardToken.mint(stakeNFT.ownerOf(_tokenId), claimable(_tokenId));
    }
}
