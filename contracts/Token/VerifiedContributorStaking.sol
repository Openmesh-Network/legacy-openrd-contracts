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

    function stake(uint256 _tokenId) external {
        if (stakeNFT.ownerOf(_tokenId) != msg.sender) {
            revert NotYourNFT();
        }

        lastClaim[_tokenId] = _toUint64(block.timestamp);
    }

    function _toUint64(uint256 value) internal pure returns (uint64) {
        if (value > type(uint64).max) {
            revert Overflow();
        }
        return uint64(value);
    }

    function claimable(
        uint256 _tokenId
    ) external view returns (uint256 claimableTokens) {
        uint64 currentSeconds = _toUint64(block.timestamp);
        uint64 lastClaimSeconds = lastClaim[_tokenId];
        return (currentSeconds - lastClaimSeconds) * tokensPerSecond;
    }

    function claim(uint256 _tokenId) external {
        uint64 currentSeconds = _toUint64(block.timestamp);
        uint64 lastClaimSeconds = lastClaim[_tokenId];

        rewardToken.mint(
            stakeNFT.ownerOf(_tokenId),
            (currentSeconds - lastClaimSeconds) * tokensPerSecond
        );

        lastClaim[_tokenId] = currentSeconds;
    }
}
