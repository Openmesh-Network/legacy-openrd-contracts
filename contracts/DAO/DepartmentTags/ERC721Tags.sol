// // SPDX-License-Identifier: UNLICENSED
// pragma solidity ^0.8.0;

// import { AccessControl } from "@openzeppelin/contracts/access/AccessControl.sol";
// import { IERC721Tags } from "./IERC721Tags.sol";

// contract ERC721Tags is AccessControl, IERC721Tags {
//     bytes32 public constant TAG_ROLE = keccak256("TAG_ROLE");

//     mapping(uint256 => mapping(bytes32 => bool)) tags; 

//     constructor(address admin) {
//         _grantRole(DEFAULT_ADMIN_ROLE, admin);
//         _grantRole(TAG_ROLE, admin);
//     }

//     function supportsInterface(bytes4 interfaceId) public view virtual override returns (bool) {
//         return interfaceId == type(IERC721Tags).interfaceId || super.supportsInterface(interfaceId);
//     }

//     /// @inheritdoc IERC721Tags
//     function hasTag(uint256 _tokenId, bytes32 _tag) external view virtual returns (bool) {
//         return tags[_tokenId][_tag];
//     }
    
//     /// @inheritdoc IERC721Tags
//     function grantTag(uint256 _tokenId, bytes32 _tag) external virtual onlyRole(TAG_ROLE) {
//         _grantTag(_tokenId, _tag);
//     }

//     /// @inheritdoc IERC721Tags
//     function multiGrantTag(uint256[] calldata _tokenIds, bytes32[] calldata _tags) external virtual onlyRole(TAG_ROLE) {
//         for (uint i; i < _tokenIds.length; ) {
//             _grantTag(_tokenIds[i], _tags[i]);

//             unchecked {
//                 ++i;
//             }
//         }
//     }
    
//     /// @inheritdoc IERC721Tags
//     function revokeTag(uint256 _tokenId, bytes32 _tag) external virtual onlyRole(TAG_ROLE) {
//         _revokeTag(_tokenId, _tag);
//     }

//     /// @inheritdoc IERC721Tags
//     function multiRevokeTag(uint256[] calldata _tokenIds, bytes32[] calldata _tags) external virtual onlyRole(TAG_ROLE) {
//         for (uint i; i < _tokenIds.length; ) {
//             _revokeTag(_tokenIds[i], _tags[i]);

//             unchecked {
//                 ++i;
//             }
//         }
//     }

//     function _grantTag(uint256 _tokenId, bytes32 _tag) internal virtual {
//         tags[_tokenId][_tag] = true;

//         emit TagGranted(_tokenId, _tag);
//     }

//     function _revokeTag(uint256 _tokenId, bytes32 _tag) internal virtual {
//         tags[_tokenId][_tag] = false;

//         emit TagRevoked(_tokenId, _tag);
//     }
// }