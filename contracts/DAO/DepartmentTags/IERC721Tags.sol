// // SPDX-License-Identifier: UNLICENSED
// pragma solidity ^0.8.0;

// interface IERC721Tags {
//     event TagGranted(uint256 tokenId, bytes32 tag);
//     event TagRevoked(uint256 tokenId, bytes32 tag);

//     /// @notice Checks if an NFT has a certain tag.
//     /// @param _tokenId Id of the NFT.
//     /// @param _tag Tag to check.
//     function hasTag(uint256 _tokenId, bytes32 _tag) external view returns (bool);

//     /// @notice Grants a tag to a certain NFT.
//     /// @param _tokenId Id of the NFT.
//     /// @param _tag Tag to grant.
//     function grantTag(uint256 _tokenId, bytes32 _tag) external;

//     /// @notice Grants the NFT at position i, the tag at position i.
//     /// @param _tokenIds Ids of the NFTs.
//     /// @param _tags Tags to grant.
//     function multiGrantTag(uint256[] calldata _tokenIds, bytes32[] calldata _tags) external;

//     /// @notice Revokes a tag of a certain NFT.
//     /// @param _tokenId Id of the NFT.
//     /// @param _tag Tag to revoke.
//     function revokeTag(uint256 _tokenId, bytes32 _tag) external;

//     /// @notice Revokes the NFT at position i, the tag at position i.
//     /// @param _tokenIds Ids of the NFTs.
//     /// @param _tags Tags to revoke.
//     function multiRevokeTag(uint256[] calldata _tokenIds, bytes32[] calldata _tags) external;
// }