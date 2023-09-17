export default {
  "name": "polygon",
  "chainId": "137",
  "contracts": {
    "DAOFactory": {
      "address": "0x51Ead12DEcD31ea75e1046EdFAda14dd639789b8",
      "abi": [
        {
          "inputs": [
            {
              "internalType": "contract DAORegistry",
              "name": "_registry",
              "type": "address"
            },
            {
              "internalType": "contract PluginSetupProcessor",
              "name": "_pluginSetupProcessor",
              "type": "address"
            }
          ],
          "stateMutability": "nonpayable",
          "type": "constructor"
        },
        {
          "inputs": [],
          "name": "NoPluginProvided",
          "type": "error"
        },
        {
          "inputs": [
            {
              "components": [
                {
                  "internalType": "address",
                  "name": "trustedForwarder",
                  "type": "address"
                },
                {
                  "internalType": "string",
                  "name": "daoURI",
                  "type": "string"
                },
                {
                  "internalType": "string",
                  "name": "subdomain",
                  "type": "string"
                },
                {
                  "internalType": "bytes",
                  "name": "metadata",
                  "type": "bytes"
                }
              ],
              "internalType": "struct DAOFactory.DAOSettings",
              "name": "_daoSettings",
              "type": "tuple"
            },
            {
              "components": [
                {
                  "components": [
                    {
                      "components": [
                        {
                          "internalType": "uint8",
                          "name": "release",
                          "type": "uint8"
                        },
                        {
                          "internalType": "uint16",
                          "name": "build",
                          "type": "uint16"
                        }
                      ],
                      "internalType": "struct PluginRepo.Tag",
                      "name": "versionTag",
                      "type": "tuple"
                    },
                    {
                      "internalType": "contract PluginRepo",
                      "name": "pluginSetupRepo",
                      "type": "address"
                    }
                  ],
                  "internalType": "struct PluginSetupRef",
                  "name": "pluginSetupRef",
                  "type": "tuple"
                },
                {
                  "internalType": "bytes",
                  "name": "data",
                  "type": "bytes"
                }
              ],
              "internalType": "struct DAOFactory.PluginSettings[]",
              "name": "_pluginSettings",
              "type": "tuple[]"
            }
          ],
          "name": "createDao",
          "outputs": [
            {
              "internalType": "contract DAO",
              "name": "createdDao",
              "type": "address"
            }
          ],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "daoBase",
          "outputs": [
            {
              "internalType": "address",
              "name": "",
              "type": "address"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "daoRegistry",
          "outputs": [
            {
              "internalType": "contract DAORegistry",
              "name": "",
              "type": "address"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "pluginSetupProcessor",
          "outputs": [
            {
              "internalType": "contract PluginSetupProcessor",
              "name": "",
              "type": "address"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "protocolVersion",
          "outputs": [
            {
              "internalType": "uint8[3]",
              "name": "",
              "type": "uint8[3]"
            }
          ],
          "stateMutability": "pure",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "bytes4",
              "name": "_interfaceId",
              "type": "bytes4"
            }
          ],
          "name": "supportsInterface",
          "outputs": [
            {
              "internalType": "bool",
              "name": "",
              "type": "bool"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        }
      ]
    },
    "DAORegistry": {
      "address": "0x96E54098317631641703404C06A5afAD89da7373",
      "abi": [
        {
          "inputs": [],
          "stateMutability": "nonpayable",
          "type": "constructor"
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "registrant",
              "type": "address"
            }
          ],
          "name": "ContractAlreadyRegistered",
          "type": "error"
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "registrant",
              "type": "address"
            }
          ],
          "name": "ContractERC165SupportInvalid",
          "type": "error"
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "registrant",
              "type": "address"
            }
          ],
          "name": "ContractInterfaceInvalid",
          "type": "error"
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "dao",
              "type": "address"
            },
            {
              "internalType": "address",
              "name": "where",
              "type": "address"
            },
            {
              "internalType": "address",
              "name": "who",
              "type": "address"
            },
            {
              "internalType": "bytes32",
              "name": "permissionId",
              "type": "bytes32"
            }
          ],
          "name": "DaoUnauthorized",
          "type": "error"
        },
        {
          "inputs": [
            {
              "internalType": "string",
              "name": "subdomain",
              "type": "string"
            }
          ],
          "name": "InvalidDaoSubdomain",
          "type": "error"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": false,
              "internalType": "address",
              "name": "previousAdmin",
              "type": "address"
            },
            {
              "indexed": false,
              "internalType": "address",
              "name": "newAdmin",
              "type": "address"
            }
          ],
          "name": "AdminChanged",
          "type": "event"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": true,
              "internalType": "address",
              "name": "beacon",
              "type": "address"
            }
          ],
          "name": "BeaconUpgraded",
          "type": "event"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": true,
              "internalType": "address",
              "name": "dao",
              "type": "address"
            },
            {
              "indexed": true,
              "internalType": "address",
              "name": "creator",
              "type": "address"
            },
            {
              "indexed": false,
              "internalType": "string",
              "name": "subdomain",
              "type": "string"
            }
          ],
          "name": "DAORegistered",
          "type": "event"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": false,
              "internalType": "uint8",
              "name": "version",
              "type": "uint8"
            }
          ],
          "name": "Initialized",
          "type": "event"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": true,
              "internalType": "address",
              "name": "implementation",
              "type": "address"
            }
          ],
          "name": "Upgraded",
          "type": "event"
        },
        {
          "inputs": [],
          "name": "REGISTER_DAO_PERMISSION_ID",
          "outputs": [
            {
              "internalType": "bytes32",
              "name": "",
              "type": "bytes32"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "UPGRADE_REGISTRY_PERMISSION_ID",
          "outputs": [
            {
              "internalType": "bytes32",
              "name": "",
              "type": "bytes32"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "dao",
          "outputs": [
            {
              "internalType": "contract IDAO",
              "name": "",
              "type": "address"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "",
              "type": "address"
            }
          ],
          "name": "entries",
          "outputs": [
            {
              "internalType": "bool",
              "name": "",
              "type": "bool"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "contract IDAO",
              "name": "_managingDao",
              "type": "address"
            },
            {
              "internalType": "contract ENSSubdomainRegistrar",
              "name": "_subdomainRegistrar",
              "type": "address"
            }
          ],
          "name": "initialize",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "proxiableUUID",
          "outputs": [
            {
              "internalType": "bytes32",
              "name": "",
              "type": "bytes32"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "contract IDAO",
              "name": "dao",
              "type": "address"
            },
            {
              "internalType": "address",
              "name": "creator",
              "type": "address"
            },
            {
              "internalType": "string",
              "name": "subdomain",
              "type": "string"
            }
          ],
          "name": "register",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "subdomainRegistrar",
          "outputs": [
            {
              "internalType": "contract ENSSubdomainRegistrar",
              "name": "",
              "type": "address"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "targetInterfaceId",
          "outputs": [
            {
              "internalType": "bytes4",
              "name": "",
              "type": "bytes4"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "newImplementation",
              "type": "address"
            }
          ],
          "name": "upgradeTo",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "newImplementation",
              "type": "address"
            },
            {
              "internalType": "bytes",
              "name": "data",
              "type": "bytes"
            }
          ],
          "name": "upgradeToAndCall",
          "outputs": [],
          "stateMutability": "payable",
          "type": "function"
        }
      ]
    },
    "NFT": {
      "address": "0x09f9e1C802da3d8D123b2bC8Ba7252B3Dedd5Db0",
      "abi": [
        {
          "inputs": [
            {
              "internalType": "string",
              "name": "name_",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "symbol_",
              "type": "string"
            }
          ],
          "stateMutability": "nonpayable",
          "type": "constructor"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": true,
              "internalType": "address",
              "name": "owner",
              "type": "address"
            },
            {
              "indexed": true,
              "internalType": "address",
              "name": "approved",
              "type": "address"
            },
            {
              "indexed": true,
              "internalType": "uint256",
              "name": "tokenId",
              "type": "uint256"
            }
          ],
          "name": "Approval",
          "type": "event"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": true,
              "internalType": "address",
              "name": "owner",
              "type": "address"
            },
            {
              "indexed": true,
              "internalType": "address",
              "name": "operator",
              "type": "address"
            },
            {
              "indexed": false,
              "internalType": "bool",
              "name": "approved",
              "type": "bool"
            }
          ],
          "name": "ApprovalForAll",
          "type": "event"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": true,
              "internalType": "address",
              "name": "previousOwner",
              "type": "address"
            },
            {
              "indexed": true,
              "internalType": "address",
              "name": "newOwner",
              "type": "address"
            }
          ],
          "name": "OwnershipTransferred",
          "type": "event"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": true,
              "internalType": "address",
              "name": "from",
              "type": "address"
            },
            {
              "indexed": true,
              "internalType": "address",
              "name": "to",
              "type": "address"
            },
            {
              "indexed": true,
              "internalType": "uint256",
              "name": "tokenId",
              "type": "uint256"
            }
          ],
          "name": "Transfer",
          "type": "event"
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "to",
              "type": "address"
            },
            {
              "internalType": "uint256",
              "name": "tokenId",
              "type": "uint256"
            }
          ],
          "name": "approve",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "owner",
              "type": "address"
            }
          ],
          "name": "balanceOf",
          "outputs": [
            {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "uint256",
              "name": "tokenId",
              "type": "uint256"
            }
          ],
          "name": "burn",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "uint256",
              "name": "tokenId",
              "type": "uint256"
            }
          ],
          "name": "getApproved",
          "outputs": [
            {
              "internalType": "address",
              "name": "",
              "type": "address"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "owner",
              "type": "address"
            },
            {
              "internalType": "address",
              "name": "operator",
              "type": "address"
            }
          ],
          "name": "isApprovedForAll",
          "outputs": [
            {
              "internalType": "bool",
              "name": "",
              "type": "bool"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "account",
              "type": "address"
            },
            {
              "internalType": "uint256",
              "name": "tokenId",
              "type": "uint256"
            }
          ],
          "name": "mint",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "name",
          "outputs": [
            {
              "internalType": "string",
              "name": "",
              "type": "string"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "owner",
          "outputs": [
            {
              "internalType": "address",
              "name": "",
              "type": "address"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "uint256",
              "name": "tokenId",
              "type": "uint256"
            }
          ],
          "name": "ownerOf",
          "outputs": [
            {
              "internalType": "address",
              "name": "",
              "type": "address"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "renounceOwnership",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "from",
              "type": "address"
            },
            {
              "internalType": "address",
              "name": "to",
              "type": "address"
            },
            {
              "internalType": "uint256",
              "name": "tokenId",
              "type": "uint256"
            }
          ],
          "name": "safeTransferFrom",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "from",
              "type": "address"
            },
            {
              "internalType": "address",
              "name": "to",
              "type": "address"
            },
            {
              "internalType": "uint256",
              "name": "tokenId",
              "type": "uint256"
            },
            {
              "internalType": "bytes",
              "name": "data",
              "type": "bytes"
            }
          ],
          "name": "safeTransferFrom",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "operator",
              "type": "address"
            },
            {
              "internalType": "bool",
              "name": "approved",
              "type": "bool"
            }
          ],
          "name": "setApprovalForAll",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "bytes4",
              "name": "interfaceId",
              "type": "bytes4"
            }
          ],
          "name": "supportsInterface",
          "outputs": [
            {
              "internalType": "bool",
              "name": "",
              "type": "bool"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "symbol",
          "outputs": [
            {
              "internalType": "string",
              "name": "",
              "type": "string"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "uint256",
              "name": "tokenId",
              "type": "uint256"
            }
          ],
          "name": "tokenURI",
          "outputs": [
            {
              "internalType": "string",
              "name": "",
              "type": "string"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "from",
              "type": "address"
            },
            {
              "internalType": "address",
              "name": "to",
              "type": "address"
            },
            {
              "internalType": "uint256",
              "name": "tokenId",
              "type": "uint256"
            }
          ],
          "name": "transferFrom",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "newOwner",
              "type": "address"
            }
          ],
          "name": "transferOwnership",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        }
      ]
    },
    "PluginRepoFactory": {
      "address": "0x6E924eA5864044D8642385683fFA5AD42FB687f2",
      "abi": [
        {
          "inputs": [
            {
              "internalType": "contract PluginRepoRegistry",
              "name": "_pluginRepoRegistry",
              "type": "address"
            }
          ],
          "stateMutability": "nonpayable",
          "type": "constructor"
        },
        {
          "inputs": [
            {
              "internalType": "string",
              "name": "_subdomain",
              "type": "string"
            },
            {
              "internalType": "address",
              "name": "_initialOwner",
              "type": "address"
            }
          ],
          "name": "createPluginRepo",
          "outputs": [
            {
              "internalType": "contract PluginRepo",
              "name": "",
              "type": "address"
            }
          ],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "string",
              "name": "_subdomain",
              "type": "string"
            },
            {
              "internalType": "address",
              "name": "_pluginSetup",
              "type": "address"
            },
            {
              "internalType": "address",
              "name": "_maintainer",
              "type": "address"
            },
            {
              "internalType": "bytes",
              "name": "_releaseMetadata",
              "type": "bytes"
            },
            {
              "internalType": "bytes",
              "name": "_buildMetadata",
              "type": "bytes"
            }
          ],
          "name": "createPluginRepoWithFirstVersion",
          "outputs": [
            {
              "internalType": "contract PluginRepo",
              "name": "pluginRepo",
              "type": "address"
            }
          ],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "pluginRepoBase",
          "outputs": [
            {
              "internalType": "address",
              "name": "",
              "type": "address"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "pluginRepoRegistry",
          "outputs": [
            {
              "internalType": "contract PluginRepoRegistry",
              "name": "",
              "type": "address"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "protocolVersion",
          "outputs": [
            {
              "internalType": "uint8[3]",
              "name": "",
              "type": "uint8[3]"
            }
          ],
          "stateMutability": "pure",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "bytes4",
              "name": "_interfaceId",
              "type": "bytes4"
            }
          ],
          "name": "supportsInterface",
          "outputs": [
            {
              "internalType": "bool",
              "name": "",
              "type": "bool"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        }
      ]
    },
    "PluginRepoRegistry": {
      "address": "0xA03C2182af8eC460D498108C92E8638a580b94d4",
      "abi": [
        {
          "inputs": [],
          "stateMutability": "nonpayable",
          "type": "constructor"
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "registrant",
              "type": "address"
            }
          ],
          "name": "ContractAlreadyRegistered",
          "type": "error"
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "registrant",
              "type": "address"
            }
          ],
          "name": "ContractERC165SupportInvalid",
          "type": "error"
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "registrant",
              "type": "address"
            }
          ],
          "name": "ContractInterfaceInvalid",
          "type": "error"
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "dao",
              "type": "address"
            },
            {
              "internalType": "address",
              "name": "where",
              "type": "address"
            },
            {
              "internalType": "address",
              "name": "who",
              "type": "address"
            },
            {
              "internalType": "bytes32",
              "name": "permissionId",
              "type": "bytes32"
            }
          ],
          "name": "DaoUnauthorized",
          "type": "error"
        },
        {
          "inputs": [],
          "name": "EmptyPluginRepoSubdomain",
          "type": "error"
        },
        {
          "inputs": [
            {
              "internalType": "string",
              "name": "subdomain",
              "type": "string"
            }
          ],
          "name": "InvalidPluginSubdomain",
          "type": "error"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": false,
              "internalType": "address",
              "name": "previousAdmin",
              "type": "address"
            },
            {
              "indexed": false,
              "internalType": "address",
              "name": "newAdmin",
              "type": "address"
            }
          ],
          "name": "AdminChanged",
          "type": "event"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": true,
              "internalType": "address",
              "name": "beacon",
              "type": "address"
            }
          ],
          "name": "BeaconUpgraded",
          "type": "event"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": false,
              "internalType": "uint8",
              "name": "version",
              "type": "uint8"
            }
          ],
          "name": "Initialized",
          "type": "event"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": false,
              "internalType": "string",
              "name": "subdomain",
              "type": "string"
            },
            {
              "indexed": false,
              "internalType": "address",
              "name": "pluginRepo",
              "type": "address"
            }
          ],
          "name": "PluginRepoRegistered",
          "type": "event"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": true,
              "internalType": "address",
              "name": "implementation",
              "type": "address"
            }
          ],
          "name": "Upgraded",
          "type": "event"
        },
        {
          "inputs": [],
          "name": "REGISTER_PLUGIN_REPO_PERMISSION_ID",
          "outputs": [
            {
              "internalType": "bytes32",
              "name": "",
              "type": "bytes32"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "UPGRADE_REGISTRY_PERMISSION_ID",
          "outputs": [
            {
              "internalType": "bytes32",
              "name": "",
              "type": "bytes32"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "dao",
          "outputs": [
            {
              "internalType": "contract IDAO",
              "name": "",
              "type": "address"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "",
              "type": "address"
            }
          ],
          "name": "entries",
          "outputs": [
            {
              "internalType": "bool",
              "name": "",
              "type": "bool"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "contract IDAO",
              "name": "_dao",
              "type": "address"
            },
            {
              "internalType": "contract ENSSubdomainRegistrar",
              "name": "_subdomainRegistrar",
              "type": "address"
            }
          ],
          "name": "initialize",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "proxiableUUID",
          "outputs": [
            {
              "internalType": "bytes32",
              "name": "",
              "type": "bytes32"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "string",
              "name": "subdomain",
              "type": "string"
            },
            {
              "internalType": "address",
              "name": "pluginRepo",
              "type": "address"
            }
          ],
          "name": "registerPluginRepo",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "subdomainRegistrar",
          "outputs": [
            {
              "internalType": "contract ENSSubdomainRegistrar",
              "name": "",
              "type": "address"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "targetInterfaceId",
          "outputs": [
            {
              "internalType": "bytes4",
              "name": "",
              "type": "bytes4"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "newImplementation",
              "type": "address"
            }
          ],
          "name": "upgradeTo",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "newImplementation",
              "type": "address"
            },
            {
              "internalType": "bytes",
              "name": "data",
              "type": "bytes"
            }
          ],
          "name": "upgradeToAndCall",
          "outputs": [],
          "stateMutability": "payable",
          "type": "function"
        }
      ]
    },
    "PluginSetupProcessor": {
      "address": "0x879D9dfe3F36d7684BeC1a2bB4Aa8E8871A7245B",
      "abi": [
        {
          "inputs": [
            {
              "internalType": "contract PluginRepoRegistry",
              "name": "_repoRegistry",
              "type": "address"
            }
          ],
          "stateMutability": "nonpayable",
          "type": "constructor"
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "plugin",
              "type": "address"
            }
          ],
          "name": "IPluginNotSupported",
          "type": "error"
        },
        {
          "inputs": [
            {
              "internalType": "bytes32",
              "name": "currentAppliedSetupId",
              "type": "bytes32"
            },
            {
              "internalType": "bytes32",
              "name": "appliedSetupId",
              "type": "bytes32"
            }
          ],
          "name": "InvalidAppliedSetupId",
          "type": "error"
        },
        {
          "inputs": [
            {
              "components": [
                {
                  "internalType": "uint8",
                  "name": "release",
                  "type": "uint8"
                },
                {
                  "internalType": "uint16",
                  "name": "build",
                  "type": "uint16"
                }
              ],
              "internalType": "struct PluginRepo.Tag",
              "name": "currentVersionTag",
              "type": "tuple"
            },
            {
              "components": [
                {
                  "internalType": "uint8",
                  "name": "release",
                  "type": "uint8"
                },
                {
                  "internalType": "uint16",
                  "name": "build",
                  "type": "uint16"
                }
              ],
              "internalType": "struct PluginRepo.Tag",
              "name": "newVersionTag",
              "type": "tuple"
            }
          ],
          "name": "InvalidUpdateVersion",
          "type": "error"
        },
        {
          "inputs": [],
          "name": "PluginAlreadyInstalled",
          "type": "error"
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "plugin",
              "type": "address"
            }
          ],
          "name": "PluginNonupgradeable",
          "type": "error"
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "proxy",
              "type": "address"
            },
            {
              "internalType": "address",
              "name": "implementation",
              "type": "address"
            },
            {
              "internalType": "bytes",
              "name": "initData",
              "type": "bytes"
            }
          ],
          "name": "PluginProxyUpgradeFailed",
          "type": "error"
        },
        {
          "inputs": [],
          "name": "PluginRepoNonexistent",
          "type": "error"
        },
        {
          "inputs": [
            {
              "internalType": "bytes32",
              "name": "preparedSetupId",
              "type": "bytes32"
            }
          ],
          "name": "SetupAlreadyPrepared",
          "type": "error"
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "dao",
              "type": "address"
            },
            {
              "internalType": "address",
              "name": "caller",
              "type": "address"
            },
            {
              "internalType": "bytes32",
              "name": "permissionId",
              "type": "bytes32"
            }
          ],
          "name": "SetupApplicationUnauthorized",
          "type": "error"
        },
        {
          "inputs": [
            {
              "internalType": "bytes32",
              "name": "preparedSetupId",
              "type": "bytes32"
            }
          ],
          "name": "SetupNotApplicable",
          "type": "error"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": true,
              "internalType": "address",
              "name": "dao",
              "type": "address"
            },
            {
              "indexed": true,
              "internalType": "address",
              "name": "plugin",
              "type": "address"
            },
            {
              "indexed": false,
              "internalType": "bytes32",
              "name": "preparedSetupId",
              "type": "bytes32"
            },
            {
              "indexed": false,
              "internalType": "bytes32",
              "name": "appliedSetupId",
              "type": "bytes32"
            }
          ],
          "name": "InstallationApplied",
          "type": "event"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": true,
              "internalType": "address",
              "name": "sender",
              "type": "address"
            },
            {
              "indexed": true,
              "internalType": "address",
              "name": "dao",
              "type": "address"
            },
            {
              "indexed": false,
              "internalType": "bytes32",
              "name": "preparedSetupId",
              "type": "bytes32"
            },
            {
              "indexed": true,
              "internalType": "contract PluginRepo",
              "name": "pluginSetupRepo",
              "type": "address"
            },
            {
              "components": [
                {
                  "internalType": "uint8",
                  "name": "release",
                  "type": "uint8"
                },
                {
                  "internalType": "uint16",
                  "name": "build",
                  "type": "uint16"
                }
              ],
              "indexed": false,
              "internalType": "struct PluginRepo.Tag",
              "name": "versionTag",
              "type": "tuple"
            },
            {
              "indexed": false,
              "internalType": "bytes",
              "name": "data",
              "type": "bytes"
            },
            {
              "indexed": false,
              "internalType": "address",
              "name": "plugin",
              "type": "address"
            },
            {
              "components": [
                {
                  "internalType": "address[]",
                  "name": "helpers",
                  "type": "address[]"
                },
                {
                  "components": [
                    {
                      "internalType": "enum PermissionLib.Operation",
                      "name": "operation",
                      "type": "uint8"
                    },
                    {
                      "internalType": "address",
                      "name": "where",
                      "type": "address"
                    },
                    {
                      "internalType": "address",
                      "name": "who",
                      "type": "address"
                    },
                    {
                      "internalType": "address",
                      "name": "condition",
                      "type": "address"
                    },
                    {
                      "internalType": "bytes32",
                      "name": "permissionId",
                      "type": "bytes32"
                    }
                  ],
                  "internalType": "struct PermissionLib.MultiTargetPermission[]",
                  "name": "permissions",
                  "type": "tuple[]"
                }
              ],
              "indexed": false,
              "internalType": "struct IPluginSetup.PreparedSetupData",
              "name": "preparedSetupData",
              "type": "tuple"
            }
          ],
          "name": "InstallationPrepared",
          "type": "event"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": true,
              "internalType": "address",
              "name": "dao",
              "type": "address"
            },
            {
              "indexed": true,
              "internalType": "address",
              "name": "plugin",
              "type": "address"
            },
            {
              "indexed": false,
              "internalType": "bytes32",
              "name": "preparedSetupId",
              "type": "bytes32"
            }
          ],
          "name": "UninstallationApplied",
          "type": "event"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": true,
              "internalType": "address",
              "name": "sender",
              "type": "address"
            },
            {
              "indexed": true,
              "internalType": "address",
              "name": "dao",
              "type": "address"
            },
            {
              "indexed": false,
              "internalType": "bytes32",
              "name": "preparedSetupId",
              "type": "bytes32"
            },
            {
              "indexed": true,
              "internalType": "contract PluginRepo",
              "name": "pluginSetupRepo",
              "type": "address"
            },
            {
              "components": [
                {
                  "internalType": "uint8",
                  "name": "release",
                  "type": "uint8"
                },
                {
                  "internalType": "uint16",
                  "name": "build",
                  "type": "uint16"
                }
              ],
              "indexed": false,
              "internalType": "struct PluginRepo.Tag",
              "name": "versionTag",
              "type": "tuple"
            },
            {
              "components": [
                {
                  "internalType": "address",
                  "name": "plugin",
                  "type": "address"
                },
                {
                  "internalType": "address[]",
                  "name": "currentHelpers",
                  "type": "address[]"
                },
                {
                  "internalType": "bytes",
                  "name": "data",
                  "type": "bytes"
                }
              ],
              "indexed": false,
              "internalType": "struct IPluginSetup.SetupPayload",
              "name": "setupPayload",
              "type": "tuple"
            },
            {
              "components": [
                {
                  "internalType": "enum PermissionLib.Operation",
                  "name": "operation",
                  "type": "uint8"
                },
                {
                  "internalType": "address",
                  "name": "where",
                  "type": "address"
                },
                {
                  "internalType": "address",
                  "name": "who",
                  "type": "address"
                },
                {
                  "internalType": "address",
                  "name": "condition",
                  "type": "address"
                },
                {
                  "internalType": "bytes32",
                  "name": "permissionId",
                  "type": "bytes32"
                }
              ],
              "indexed": false,
              "internalType": "struct PermissionLib.MultiTargetPermission[]",
              "name": "permissions",
              "type": "tuple[]"
            }
          ],
          "name": "UninstallationPrepared",
          "type": "event"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": true,
              "internalType": "address",
              "name": "dao",
              "type": "address"
            },
            {
              "indexed": true,
              "internalType": "address",
              "name": "plugin",
              "type": "address"
            },
            {
              "indexed": false,
              "internalType": "bytes32",
              "name": "preparedSetupId",
              "type": "bytes32"
            },
            {
              "indexed": false,
              "internalType": "bytes32",
              "name": "appliedSetupId",
              "type": "bytes32"
            }
          ],
          "name": "UpdateApplied",
          "type": "event"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": true,
              "internalType": "address",
              "name": "sender",
              "type": "address"
            },
            {
              "indexed": true,
              "internalType": "address",
              "name": "dao",
              "type": "address"
            },
            {
              "indexed": false,
              "internalType": "bytes32",
              "name": "preparedSetupId",
              "type": "bytes32"
            },
            {
              "indexed": true,
              "internalType": "contract PluginRepo",
              "name": "pluginSetupRepo",
              "type": "address"
            },
            {
              "components": [
                {
                  "internalType": "uint8",
                  "name": "release",
                  "type": "uint8"
                },
                {
                  "internalType": "uint16",
                  "name": "build",
                  "type": "uint16"
                }
              ],
              "indexed": false,
              "internalType": "struct PluginRepo.Tag",
              "name": "versionTag",
              "type": "tuple"
            },
            {
              "components": [
                {
                  "internalType": "address",
                  "name": "plugin",
                  "type": "address"
                },
                {
                  "internalType": "address[]",
                  "name": "currentHelpers",
                  "type": "address[]"
                },
                {
                  "internalType": "bytes",
                  "name": "data",
                  "type": "bytes"
                }
              ],
              "indexed": false,
              "internalType": "struct IPluginSetup.SetupPayload",
              "name": "setupPayload",
              "type": "tuple"
            },
            {
              "components": [
                {
                  "internalType": "address[]",
                  "name": "helpers",
                  "type": "address[]"
                },
                {
                  "components": [
                    {
                      "internalType": "enum PermissionLib.Operation",
                      "name": "operation",
                      "type": "uint8"
                    },
                    {
                      "internalType": "address",
                      "name": "where",
                      "type": "address"
                    },
                    {
                      "internalType": "address",
                      "name": "who",
                      "type": "address"
                    },
                    {
                      "internalType": "address",
                      "name": "condition",
                      "type": "address"
                    },
                    {
                      "internalType": "bytes32",
                      "name": "permissionId",
                      "type": "bytes32"
                    }
                  ],
                  "internalType": "struct PermissionLib.MultiTargetPermission[]",
                  "name": "permissions",
                  "type": "tuple[]"
                }
              ],
              "indexed": false,
              "internalType": "struct IPluginSetup.PreparedSetupData",
              "name": "preparedSetupData",
              "type": "tuple"
            },
            {
              "indexed": false,
              "internalType": "bytes",
              "name": "initData",
              "type": "bytes"
            }
          ],
          "name": "UpdatePrepared",
          "type": "event"
        },
        {
          "inputs": [],
          "name": "APPLY_INSTALLATION_PERMISSION_ID",
          "outputs": [
            {
              "internalType": "bytes32",
              "name": "",
              "type": "bytes32"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "APPLY_UNINSTALLATION_PERMISSION_ID",
          "outputs": [
            {
              "internalType": "bytes32",
              "name": "",
              "type": "bytes32"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "APPLY_UPDATE_PERMISSION_ID",
          "outputs": [
            {
              "internalType": "bytes32",
              "name": "",
              "type": "bytes32"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "_dao",
              "type": "address"
            },
            {
              "components": [
                {
                  "components": [
                    {
                      "components": [
                        {
                          "internalType": "uint8",
                          "name": "release",
                          "type": "uint8"
                        },
                        {
                          "internalType": "uint16",
                          "name": "build",
                          "type": "uint16"
                        }
                      ],
                      "internalType": "struct PluginRepo.Tag",
                      "name": "versionTag",
                      "type": "tuple"
                    },
                    {
                      "internalType": "contract PluginRepo",
                      "name": "pluginSetupRepo",
                      "type": "address"
                    }
                  ],
                  "internalType": "struct PluginSetupRef",
                  "name": "pluginSetupRef",
                  "type": "tuple"
                },
                {
                  "internalType": "address",
                  "name": "plugin",
                  "type": "address"
                },
                {
                  "components": [
                    {
                      "internalType": "enum PermissionLib.Operation",
                      "name": "operation",
                      "type": "uint8"
                    },
                    {
                      "internalType": "address",
                      "name": "where",
                      "type": "address"
                    },
                    {
                      "internalType": "address",
                      "name": "who",
                      "type": "address"
                    },
                    {
                      "internalType": "address",
                      "name": "condition",
                      "type": "address"
                    },
                    {
                      "internalType": "bytes32",
                      "name": "permissionId",
                      "type": "bytes32"
                    }
                  ],
                  "internalType": "struct PermissionLib.MultiTargetPermission[]",
                  "name": "permissions",
                  "type": "tuple[]"
                },
                {
                  "internalType": "bytes32",
                  "name": "helpersHash",
                  "type": "bytes32"
                }
              ],
              "internalType": "struct PluginSetupProcessor.ApplyInstallationParams",
              "name": "_params",
              "type": "tuple"
            }
          ],
          "name": "applyInstallation",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "_dao",
              "type": "address"
            },
            {
              "components": [
                {
                  "internalType": "address",
                  "name": "plugin",
                  "type": "address"
                },
                {
                  "components": [
                    {
                      "components": [
                        {
                          "internalType": "uint8",
                          "name": "release",
                          "type": "uint8"
                        },
                        {
                          "internalType": "uint16",
                          "name": "build",
                          "type": "uint16"
                        }
                      ],
                      "internalType": "struct PluginRepo.Tag",
                      "name": "versionTag",
                      "type": "tuple"
                    },
                    {
                      "internalType": "contract PluginRepo",
                      "name": "pluginSetupRepo",
                      "type": "address"
                    }
                  ],
                  "internalType": "struct PluginSetupRef",
                  "name": "pluginSetupRef",
                  "type": "tuple"
                },
                {
                  "components": [
                    {
                      "internalType": "enum PermissionLib.Operation",
                      "name": "operation",
                      "type": "uint8"
                    },
                    {
                      "internalType": "address",
                      "name": "where",
                      "type": "address"
                    },
                    {
                      "internalType": "address",
                      "name": "who",
                      "type": "address"
                    },
                    {
                      "internalType": "address",
                      "name": "condition",
                      "type": "address"
                    },
                    {
                      "internalType": "bytes32",
                      "name": "permissionId",
                      "type": "bytes32"
                    }
                  ],
                  "internalType": "struct PermissionLib.MultiTargetPermission[]",
                  "name": "permissions",
                  "type": "tuple[]"
                }
              ],
              "internalType": "struct PluginSetupProcessor.ApplyUninstallationParams",
              "name": "_params",
              "type": "tuple"
            }
          ],
          "name": "applyUninstallation",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "_dao",
              "type": "address"
            },
            {
              "components": [
                {
                  "internalType": "address",
                  "name": "plugin",
                  "type": "address"
                },
                {
                  "components": [
                    {
                      "components": [
                        {
                          "internalType": "uint8",
                          "name": "release",
                          "type": "uint8"
                        },
                        {
                          "internalType": "uint16",
                          "name": "build",
                          "type": "uint16"
                        }
                      ],
                      "internalType": "struct PluginRepo.Tag",
                      "name": "versionTag",
                      "type": "tuple"
                    },
                    {
                      "internalType": "contract PluginRepo",
                      "name": "pluginSetupRepo",
                      "type": "address"
                    }
                  ],
                  "internalType": "struct PluginSetupRef",
                  "name": "pluginSetupRef",
                  "type": "tuple"
                },
                {
                  "internalType": "bytes",
                  "name": "initData",
                  "type": "bytes"
                },
                {
                  "components": [
                    {
                      "internalType": "enum PermissionLib.Operation",
                      "name": "operation",
                      "type": "uint8"
                    },
                    {
                      "internalType": "address",
                      "name": "where",
                      "type": "address"
                    },
                    {
                      "internalType": "address",
                      "name": "who",
                      "type": "address"
                    },
                    {
                      "internalType": "address",
                      "name": "condition",
                      "type": "address"
                    },
                    {
                      "internalType": "bytes32",
                      "name": "permissionId",
                      "type": "bytes32"
                    }
                  ],
                  "internalType": "struct PermissionLib.MultiTargetPermission[]",
                  "name": "permissions",
                  "type": "tuple[]"
                },
                {
                  "internalType": "bytes32",
                  "name": "helpersHash",
                  "type": "bytes32"
                }
              ],
              "internalType": "struct PluginSetupProcessor.ApplyUpdateParams",
              "name": "_params",
              "type": "tuple"
            }
          ],
          "name": "applyUpdate",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "_dao",
              "type": "address"
            },
            {
              "components": [
                {
                  "components": [
                    {
                      "components": [
                        {
                          "internalType": "uint8",
                          "name": "release",
                          "type": "uint8"
                        },
                        {
                          "internalType": "uint16",
                          "name": "build",
                          "type": "uint16"
                        }
                      ],
                      "internalType": "struct PluginRepo.Tag",
                      "name": "versionTag",
                      "type": "tuple"
                    },
                    {
                      "internalType": "contract PluginRepo",
                      "name": "pluginSetupRepo",
                      "type": "address"
                    }
                  ],
                  "internalType": "struct PluginSetupRef",
                  "name": "pluginSetupRef",
                  "type": "tuple"
                },
                {
                  "internalType": "bytes",
                  "name": "data",
                  "type": "bytes"
                }
              ],
              "internalType": "struct PluginSetupProcessor.PrepareInstallationParams",
              "name": "_params",
              "type": "tuple"
            }
          ],
          "name": "prepareInstallation",
          "outputs": [
            {
              "internalType": "address",
              "name": "plugin",
              "type": "address"
            },
            {
              "components": [
                {
                  "internalType": "address[]",
                  "name": "helpers",
                  "type": "address[]"
                },
                {
                  "components": [
                    {
                      "internalType": "enum PermissionLib.Operation",
                      "name": "operation",
                      "type": "uint8"
                    },
                    {
                      "internalType": "address",
                      "name": "where",
                      "type": "address"
                    },
                    {
                      "internalType": "address",
                      "name": "who",
                      "type": "address"
                    },
                    {
                      "internalType": "address",
                      "name": "condition",
                      "type": "address"
                    },
                    {
                      "internalType": "bytes32",
                      "name": "permissionId",
                      "type": "bytes32"
                    }
                  ],
                  "internalType": "struct PermissionLib.MultiTargetPermission[]",
                  "name": "permissions",
                  "type": "tuple[]"
                }
              ],
              "internalType": "struct IPluginSetup.PreparedSetupData",
              "name": "preparedSetupData",
              "type": "tuple"
            }
          ],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "_dao",
              "type": "address"
            },
            {
              "components": [
                {
                  "components": [
                    {
                      "components": [
                        {
                          "internalType": "uint8",
                          "name": "release",
                          "type": "uint8"
                        },
                        {
                          "internalType": "uint16",
                          "name": "build",
                          "type": "uint16"
                        }
                      ],
                      "internalType": "struct PluginRepo.Tag",
                      "name": "versionTag",
                      "type": "tuple"
                    },
                    {
                      "internalType": "contract PluginRepo",
                      "name": "pluginSetupRepo",
                      "type": "address"
                    }
                  ],
                  "internalType": "struct PluginSetupRef",
                  "name": "pluginSetupRef",
                  "type": "tuple"
                },
                {
                  "components": [
                    {
                      "internalType": "address",
                      "name": "plugin",
                      "type": "address"
                    },
                    {
                      "internalType": "address[]",
                      "name": "currentHelpers",
                      "type": "address[]"
                    },
                    {
                      "internalType": "bytes",
                      "name": "data",
                      "type": "bytes"
                    }
                  ],
                  "internalType": "struct IPluginSetup.SetupPayload",
                  "name": "setupPayload",
                  "type": "tuple"
                }
              ],
              "internalType": "struct PluginSetupProcessor.PrepareUninstallationParams",
              "name": "_params",
              "type": "tuple"
            }
          ],
          "name": "prepareUninstallation",
          "outputs": [
            {
              "components": [
                {
                  "internalType": "enum PermissionLib.Operation",
                  "name": "operation",
                  "type": "uint8"
                },
                {
                  "internalType": "address",
                  "name": "where",
                  "type": "address"
                },
                {
                  "internalType": "address",
                  "name": "who",
                  "type": "address"
                },
                {
                  "internalType": "address",
                  "name": "condition",
                  "type": "address"
                },
                {
                  "internalType": "bytes32",
                  "name": "permissionId",
                  "type": "bytes32"
                }
              ],
              "internalType": "struct PermissionLib.MultiTargetPermission[]",
              "name": "permissions",
              "type": "tuple[]"
            }
          ],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "_dao",
              "type": "address"
            },
            {
              "components": [
                {
                  "components": [
                    {
                      "internalType": "uint8",
                      "name": "release",
                      "type": "uint8"
                    },
                    {
                      "internalType": "uint16",
                      "name": "build",
                      "type": "uint16"
                    }
                  ],
                  "internalType": "struct PluginRepo.Tag",
                  "name": "currentVersionTag",
                  "type": "tuple"
                },
                {
                  "components": [
                    {
                      "internalType": "uint8",
                      "name": "release",
                      "type": "uint8"
                    },
                    {
                      "internalType": "uint16",
                      "name": "build",
                      "type": "uint16"
                    }
                  ],
                  "internalType": "struct PluginRepo.Tag",
                  "name": "newVersionTag",
                  "type": "tuple"
                },
                {
                  "internalType": "contract PluginRepo",
                  "name": "pluginSetupRepo",
                  "type": "address"
                },
                {
                  "components": [
                    {
                      "internalType": "address",
                      "name": "plugin",
                      "type": "address"
                    },
                    {
                      "internalType": "address[]",
                      "name": "currentHelpers",
                      "type": "address[]"
                    },
                    {
                      "internalType": "bytes",
                      "name": "data",
                      "type": "bytes"
                    }
                  ],
                  "internalType": "struct IPluginSetup.SetupPayload",
                  "name": "setupPayload",
                  "type": "tuple"
                }
              ],
              "internalType": "struct PluginSetupProcessor.PrepareUpdateParams",
              "name": "_params",
              "type": "tuple"
            }
          ],
          "name": "prepareUpdate",
          "outputs": [
            {
              "internalType": "bytes",
              "name": "initData",
              "type": "bytes"
            },
            {
              "components": [
                {
                  "internalType": "address[]",
                  "name": "helpers",
                  "type": "address[]"
                },
                {
                  "components": [
                    {
                      "internalType": "enum PermissionLib.Operation",
                      "name": "operation",
                      "type": "uint8"
                    },
                    {
                      "internalType": "address",
                      "name": "where",
                      "type": "address"
                    },
                    {
                      "internalType": "address",
                      "name": "who",
                      "type": "address"
                    },
                    {
                      "internalType": "address",
                      "name": "condition",
                      "type": "address"
                    },
                    {
                      "internalType": "bytes32",
                      "name": "permissionId",
                      "type": "bytes32"
                    }
                  ],
                  "internalType": "struct PermissionLib.MultiTargetPermission[]",
                  "name": "permissions",
                  "type": "tuple[]"
                }
              ],
              "internalType": "struct IPluginSetup.PreparedSetupData",
              "name": "preparedSetupData",
              "type": "tuple"
            }
          ],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "repoRegistry",
          "outputs": [
            {
              "internalType": "contract PluginRepoRegistry",
              "name": "",
              "type": "address"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "bytes32",
              "name": "",
              "type": "bytes32"
            }
          ],
          "name": "states",
          "outputs": [
            {
              "internalType": "uint256",
              "name": "blockNumber",
              "type": "uint256"
            },
            {
              "internalType": "bytes32",
              "name": "currentAppliedSetupId",
              "type": "bytes32"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "bytes32",
              "name": "pluginInstallationId",
              "type": "bytes32"
            },
            {
              "internalType": "bytes32",
              "name": "preparedSetupId",
              "type": "bytes32"
            }
          ],
          "name": "validatePreparedSetupId",
          "outputs": [],
          "stateMutability": "view",
          "type": "function"
        }
      ]
    },
    "TaskDraftsImplementation": {
      "address": "0x65Bd053a490B11AE6BAc38b89b39365d73574439",
      "abi": [
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "dao",
              "type": "address"
            },
            {
              "internalType": "address",
              "name": "where",
              "type": "address"
            },
            {
              "internalType": "address",
              "name": "who",
              "type": "address"
            },
            {
              "internalType": "bytes32",
              "name": "permissionId",
              "type": "bytes32"
            }
          ],
          "name": "DaoUnauthorized",
          "type": "error"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": false,
              "internalType": "address",
              "name": "previousAdmin",
              "type": "address"
            },
            {
              "indexed": false,
              "internalType": "address",
              "name": "newAdmin",
              "type": "address"
            }
          ],
          "name": "AdminChanged",
          "type": "event"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": true,
              "internalType": "address",
              "name": "beacon",
              "type": "address"
            }
          ],
          "name": "BeaconUpgraded",
          "type": "event"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": false,
              "internalType": "uint8",
              "name": "version",
              "type": "uint8"
            }
          ],
          "name": "Initialized",
          "type": "event"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": false,
              "internalType": "uint256",
              "name": "proposalId",
              "type": "uint256"
            },
            {
              "indexed": false,
              "internalType": "bytes",
              "name": "metadata",
              "type": "bytes"
            },
            {
              "indexed": false,
              "internalType": "uint64",
              "name": "startDate",
              "type": "uint64"
            },
            {
              "indexed": false,
              "internalType": "uint64",
              "name": "endDate",
              "type": "uint64"
            },
            {
              "components": [
                {
                  "internalType": "string",
                  "name": "metadata",
                  "type": "string"
                },
                {
                  "internalType": "uint64",
                  "name": "deadline",
                  "type": "uint64"
                },
                {
                  "components": [
                    {
                      "internalType": "contract IERC20",
                      "name": "tokenContract",
                      "type": "address"
                    },
                    {
                      "internalType": "uint96",
                      "name": "amount",
                      "type": "uint96"
                    }
                  ],
                  "internalType": "struct ITasks.ERC20Transfer[]",
                  "name": "budget",
                  "type": "tuple[]"
                },
                {
                  "internalType": "address",
                  "name": "manager",
                  "type": "address"
                },
                {
                  "components": [
                    {
                      "internalType": "address",
                      "name": "applicant",
                      "type": "address"
                    },
                    {
                      "components": [
                        {
                          "internalType": "bool",
                          "name": "nextToken",
                          "type": "bool"
                        },
                        {
                          "internalType": "address",
                          "name": "to",
                          "type": "address"
                        },
                        {
                          "internalType": "uint88",
                          "name": "amount",
                          "type": "uint88"
                        }
                      ],
                      "internalType": "struct ITasks.Reward[]",
                      "name": "reward",
                      "type": "tuple[]"
                    }
                  ],
                  "internalType": "struct ITasks.PreapprovedApplication[]",
                  "name": "preapproved",
                  "type": "tuple[]"
                }
              ],
              "indexed": false,
              "internalType": "struct ITaskDrafts.CreateTaskInfo",
              "name": "taskInfo",
              "type": "tuple"
            }
          ],
          "name": "TaskDraftCreated",
          "type": "event"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": true,
              "internalType": "address",
              "name": "implementation",
              "type": "address"
            }
          ],
          "name": "Upgraded",
          "type": "event"
        },
        {
          "inputs": [],
          "name": "UPGRADE_PLUGIN_PERMISSION_ID",
          "outputs": [
            {
              "internalType": "bytes32",
              "name": "",
              "type": "bytes32"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "bytes",
              "name": "_metadata",
              "type": "bytes"
            },
            {
              "internalType": "uint64",
              "name": "_startDate",
              "type": "uint64"
            },
            {
              "internalType": "uint64",
              "name": "_endDate",
              "type": "uint64"
            },
            {
              "components": [
                {
                  "internalType": "string",
                  "name": "metadata",
                  "type": "string"
                },
                {
                  "internalType": "uint64",
                  "name": "deadline",
                  "type": "uint64"
                },
                {
                  "components": [
                    {
                      "internalType": "contract IERC20",
                      "name": "tokenContract",
                      "type": "address"
                    },
                    {
                      "internalType": "uint96",
                      "name": "amount",
                      "type": "uint96"
                    }
                  ],
                  "internalType": "struct ITasks.ERC20Transfer[]",
                  "name": "budget",
                  "type": "tuple[]"
                },
                {
                  "internalType": "address",
                  "name": "manager",
                  "type": "address"
                },
                {
                  "components": [
                    {
                      "internalType": "address",
                      "name": "applicant",
                      "type": "address"
                    },
                    {
                      "components": [
                        {
                          "internalType": "bool",
                          "name": "nextToken",
                          "type": "bool"
                        },
                        {
                          "internalType": "address",
                          "name": "to",
                          "type": "address"
                        },
                        {
                          "internalType": "uint88",
                          "name": "amount",
                          "type": "uint88"
                        }
                      ],
                      "internalType": "struct ITasks.Reward[]",
                      "name": "reward",
                      "type": "tuple[]"
                    }
                  ],
                  "internalType": "struct ITasks.PreapprovedApplication[]",
                  "name": "preapproved",
                  "type": "tuple[]"
                }
              ],
              "internalType": "struct ITaskDrafts.CreateTaskInfo",
              "name": "_taskInfo",
              "type": "tuple"
            }
          ],
          "name": "createDraftTask",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "dao",
          "outputs": [
            {
              "internalType": "contract IDAO",
              "name": "",
              "type": "address"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "getGovernanceContract",
          "outputs": [
            {
              "internalType": "contract IPluginProposals",
              "name": "",
              "type": "address"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "getTasksContract",
          "outputs": [
            {
              "internalType": "contract ITasks",
              "name": "",
              "type": "address"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "implementation",
          "outputs": [
            {
              "internalType": "address",
              "name": "",
              "type": "address"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "contract IDAO",
              "name": "_dao",
              "type": "address"
            },
            {
              "internalType": "contract ITasks",
              "name": "_tasks",
              "type": "address"
            },
            {
              "internalType": "contract IPluginProposals",
              "name": "_governancePlugin",
              "type": "address"
            }
          ],
          "name": "initialize",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "pluginType",
          "outputs": [
            {
              "internalType": "enum IPlugin.PluginType",
              "name": "",
              "type": "uint8"
            }
          ],
          "stateMutability": "pure",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "proxiableUUID",
          "outputs": [
            {
              "internalType": "bytes32",
              "name": "",
              "type": "bytes32"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "bytes4",
              "name": "_interfaceId",
              "type": "bytes4"
            }
          ],
          "name": "supportsInterface",
          "outputs": [
            {
              "internalType": "bool",
              "name": "",
              "type": "bool"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "contract ITasks",
              "name": "_tasks",
              "type": "address"
            },
            {
              "internalType": "contract IPluginProposals",
              "name": "_governancePlugin",
              "type": "address"
            }
          ],
          "name": "updateAddresses",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "newImplementation",
              "type": "address"
            }
          ],
          "name": "upgradeTo",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "newImplementation",
              "type": "address"
            },
            {
              "internalType": "bytes",
              "name": "data",
              "type": "bytes"
            }
          ],
          "name": "upgradeToAndCall",
          "outputs": [],
          "stateMutability": "payable",
          "type": "function"
        }
      ]
    },
    "TaskDraftsRepo": {
      "address": "0xC03376EfcD0FB634682cff660A227877cc30F32D",
      "abi": [
        {
          "inputs": [],
          "stateMutability": "nonpayable",
          "type": "constructor"
        },
        {
          "inputs": [],
          "name": "AnyAddressDisallowedForWhoAndWhere",
          "type": "error"
        },
        {
          "inputs": [
            {
              "internalType": "contract IPermissionCondition",
              "name": "condition",
              "type": "address"
            }
          ],
          "name": "ConditionInterfacNotSupported",
          "type": "error"
        },
        {
          "inputs": [
            {
              "internalType": "contract IPermissionCondition",
              "name": "condition",
              "type": "address"
            }
          ],
          "name": "ConditionNotAContract",
          "type": "error"
        },
        {
          "inputs": [],
          "name": "EmptyReleaseMetadata",
          "type": "error"
        },
        {
          "inputs": [],
          "name": "GrantWithConditionNotSupported",
          "type": "error"
        },
        {
          "inputs": [],
          "name": "InvalidPluginSetupInterface",
          "type": "error"
        },
        {
          "inputs": [
            {
              "internalType": "uint8",
              "name": "latestRelease",
              "type": "uint8"
            },
            {
              "internalType": "uint8",
              "name": "newRelease",
              "type": "uint8"
            }
          ],
          "name": "InvalidReleaseIncrement",
          "type": "error"
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "where",
              "type": "address"
            },
            {
              "internalType": "address",
              "name": "who",
              "type": "address"
            },
            {
              "internalType": "bytes32",
              "name": "permissionId",
              "type": "bytes32"
            },
            {
              "internalType": "address",
              "name": "currentCondition",
              "type": "address"
            },
            {
              "internalType": "address",
              "name": "newCondition",
              "type": "address"
            }
          ],
          "name": "PermissionAlreadyGrantedForDifferentCondition",
          "type": "error"
        },
        {
          "inputs": [],
          "name": "PermissionsForAnyAddressDisallowed",
          "type": "error"
        },
        {
          "inputs": [
            {
              "internalType": "uint8",
              "name": "release",
              "type": "uint8"
            },
            {
              "internalType": "uint16",
              "name": "build",
              "type": "uint16"
            },
            {
              "internalType": "address",
              "name": "pluginSetup",
              "type": "address"
            }
          ],
          "name": "PluginSetupAlreadyInPreviousRelease",
          "type": "error"
        },
        {
          "inputs": [],
          "name": "ReleaseDoesNotExist",
          "type": "error"
        },
        {
          "inputs": [],
          "name": "ReleaseZeroNotAllowed",
          "type": "error"
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "where",
              "type": "address"
            },
            {
              "internalType": "address",
              "name": "who",
              "type": "address"
            },
            {
              "internalType": "bytes32",
              "name": "permissionId",
              "type": "bytes32"
            }
          ],
          "name": "Unauthorized",
          "type": "error"
        },
        {
          "inputs": [
            {
              "internalType": "bytes32",
              "name": "versionHash",
              "type": "bytes32"
            }
          ],
          "name": "VersionHashDoesNotExist",
          "type": "error"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": false,
              "internalType": "address",
              "name": "previousAdmin",
              "type": "address"
            },
            {
              "indexed": false,
              "internalType": "address",
              "name": "newAdmin",
              "type": "address"
            }
          ],
          "name": "AdminChanged",
          "type": "event"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": true,
              "internalType": "address",
              "name": "beacon",
              "type": "address"
            }
          ],
          "name": "BeaconUpgraded",
          "type": "event"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": true,
              "internalType": "bytes32",
              "name": "permissionId",
              "type": "bytes32"
            },
            {
              "indexed": true,
              "internalType": "address",
              "name": "here",
              "type": "address"
            },
            {
              "indexed": false,
              "internalType": "address",
              "name": "where",
              "type": "address"
            },
            {
              "indexed": true,
              "internalType": "address",
              "name": "who",
              "type": "address"
            },
            {
              "indexed": false,
              "internalType": "address",
              "name": "condition",
              "type": "address"
            }
          ],
          "name": "Granted",
          "type": "event"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": false,
              "internalType": "uint8",
              "name": "version",
              "type": "uint8"
            }
          ],
          "name": "Initialized",
          "type": "event"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": false,
              "internalType": "uint8",
              "name": "release",
              "type": "uint8"
            },
            {
              "indexed": false,
              "internalType": "bytes",
              "name": "releaseMetadata",
              "type": "bytes"
            }
          ],
          "name": "ReleaseMetadataUpdated",
          "type": "event"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": true,
              "internalType": "bytes32",
              "name": "permissionId",
              "type": "bytes32"
            },
            {
              "indexed": true,
              "internalType": "address",
              "name": "here",
              "type": "address"
            },
            {
              "indexed": false,
              "internalType": "address",
              "name": "where",
              "type": "address"
            },
            {
              "indexed": true,
              "internalType": "address",
              "name": "who",
              "type": "address"
            }
          ],
          "name": "Revoked",
          "type": "event"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": true,
              "internalType": "address",
              "name": "implementation",
              "type": "address"
            }
          ],
          "name": "Upgraded",
          "type": "event"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": false,
              "internalType": "uint8",
              "name": "release",
              "type": "uint8"
            },
            {
              "indexed": false,
              "internalType": "uint16",
              "name": "build",
              "type": "uint16"
            },
            {
              "indexed": true,
              "internalType": "address",
              "name": "pluginSetup",
              "type": "address"
            },
            {
              "indexed": false,
              "internalType": "bytes",
              "name": "buildMetadata",
              "type": "bytes"
            }
          ],
          "name": "VersionCreated",
          "type": "event"
        },
        {
          "inputs": [],
          "name": "MAINTAINER_PERMISSION_ID",
          "outputs": [
            {
              "internalType": "bytes32",
              "name": "",
              "type": "bytes32"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "ROOT_PERMISSION_ID",
          "outputs": [
            {
              "internalType": "bytes32",
              "name": "",
              "type": "bytes32"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "UPGRADE_REPO_PERMISSION_ID",
          "outputs": [
            {
              "internalType": "bytes32",
              "name": "",
              "type": "bytes32"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "components": [
                {
                  "internalType": "enum PermissionLib.Operation",
                  "name": "operation",
                  "type": "uint8"
                },
                {
                  "internalType": "address",
                  "name": "where",
                  "type": "address"
                },
                {
                  "internalType": "address",
                  "name": "who",
                  "type": "address"
                },
                {
                  "internalType": "address",
                  "name": "condition",
                  "type": "address"
                },
                {
                  "internalType": "bytes32",
                  "name": "permissionId",
                  "type": "bytes32"
                }
              ],
              "internalType": "struct PermissionLib.MultiTargetPermission[]",
              "name": "_items",
              "type": "tuple[]"
            }
          ],
          "name": "applyMultiTargetPermissions",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "_where",
              "type": "address"
            },
            {
              "components": [
                {
                  "internalType": "enum PermissionLib.Operation",
                  "name": "operation",
                  "type": "uint8"
                },
                {
                  "internalType": "address",
                  "name": "who",
                  "type": "address"
                },
                {
                  "internalType": "bytes32",
                  "name": "permissionId",
                  "type": "bytes32"
                }
              ],
              "internalType": "struct PermissionLib.SingleTargetPermission[]",
              "name": "items",
              "type": "tuple[]"
            }
          ],
          "name": "applySingleTargetPermissions",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "uint8",
              "name": "_release",
              "type": "uint8"
            }
          ],
          "name": "buildCount",
          "outputs": [
            {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "uint8",
              "name": "_release",
              "type": "uint8"
            },
            {
              "internalType": "address",
              "name": "_pluginSetup",
              "type": "address"
            },
            {
              "internalType": "bytes",
              "name": "_buildMetadata",
              "type": "bytes"
            },
            {
              "internalType": "bytes",
              "name": "_releaseMetadata",
              "type": "bytes"
            }
          ],
          "name": "createVersion",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "_pluginSetup",
              "type": "address"
            }
          ],
          "name": "getLatestVersion",
          "outputs": [
            {
              "components": [
                {
                  "components": [
                    {
                      "internalType": "uint8",
                      "name": "release",
                      "type": "uint8"
                    },
                    {
                      "internalType": "uint16",
                      "name": "build",
                      "type": "uint16"
                    }
                  ],
                  "internalType": "struct PluginRepo.Tag",
                  "name": "tag",
                  "type": "tuple"
                },
                {
                  "internalType": "address",
                  "name": "pluginSetup",
                  "type": "address"
                },
                {
                  "internalType": "bytes",
                  "name": "buildMetadata",
                  "type": "bytes"
                }
              ],
              "internalType": "struct PluginRepo.Version",
              "name": "",
              "type": "tuple"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "uint8",
              "name": "_release",
              "type": "uint8"
            }
          ],
          "name": "getLatestVersion",
          "outputs": [
            {
              "components": [
                {
                  "components": [
                    {
                      "internalType": "uint8",
                      "name": "release",
                      "type": "uint8"
                    },
                    {
                      "internalType": "uint16",
                      "name": "build",
                      "type": "uint16"
                    }
                  ],
                  "internalType": "struct PluginRepo.Tag",
                  "name": "tag",
                  "type": "tuple"
                },
                {
                  "internalType": "address",
                  "name": "pluginSetup",
                  "type": "address"
                },
                {
                  "internalType": "bytes",
                  "name": "buildMetadata",
                  "type": "bytes"
                }
              ],
              "internalType": "struct PluginRepo.Version",
              "name": "",
              "type": "tuple"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "bytes32",
              "name": "_tagHash",
              "type": "bytes32"
            }
          ],
          "name": "getVersion",
          "outputs": [
            {
              "components": [
                {
                  "components": [
                    {
                      "internalType": "uint8",
                      "name": "release",
                      "type": "uint8"
                    },
                    {
                      "internalType": "uint16",
                      "name": "build",
                      "type": "uint16"
                    }
                  ],
                  "internalType": "struct PluginRepo.Tag",
                  "name": "tag",
                  "type": "tuple"
                },
                {
                  "internalType": "address",
                  "name": "pluginSetup",
                  "type": "address"
                },
                {
                  "internalType": "bytes",
                  "name": "buildMetadata",
                  "type": "bytes"
                }
              ],
              "internalType": "struct PluginRepo.Version",
              "name": "",
              "type": "tuple"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "components": [
                {
                  "internalType": "uint8",
                  "name": "release",
                  "type": "uint8"
                },
                {
                  "internalType": "uint16",
                  "name": "build",
                  "type": "uint16"
                }
              ],
              "internalType": "struct PluginRepo.Tag",
              "name": "_tag",
              "type": "tuple"
            }
          ],
          "name": "getVersion",
          "outputs": [
            {
              "components": [
                {
                  "components": [
                    {
                      "internalType": "uint8",
                      "name": "release",
                      "type": "uint8"
                    },
                    {
                      "internalType": "uint16",
                      "name": "build",
                      "type": "uint16"
                    }
                  ],
                  "internalType": "struct PluginRepo.Tag",
                  "name": "tag",
                  "type": "tuple"
                },
                {
                  "internalType": "address",
                  "name": "pluginSetup",
                  "type": "address"
                },
                {
                  "internalType": "bytes",
                  "name": "buildMetadata",
                  "type": "bytes"
                }
              ],
              "internalType": "struct PluginRepo.Version",
              "name": "",
              "type": "tuple"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "_where",
              "type": "address"
            },
            {
              "internalType": "address",
              "name": "_who",
              "type": "address"
            },
            {
              "internalType": "bytes32",
              "name": "_permissionId",
              "type": "bytes32"
            }
          ],
          "name": "grant",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "_where",
              "type": "address"
            },
            {
              "internalType": "address",
              "name": "_who",
              "type": "address"
            },
            {
              "internalType": "bytes32",
              "name": "_permissionId",
              "type": "bytes32"
            },
            {
              "internalType": "contract IPermissionCondition",
              "name": "_condition",
              "type": "address"
            }
          ],
          "name": "grantWithCondition",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "initialOwner",
              "type": "address"
            }
          ],
          "name": "initialize",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "_where",
              "type": "address"
            },
            {
              "internalType": "address",
              "name": "_who",
              "type": "address"
            },
            {
              "internalType": "bytes32",
              "name": "_permissionId",
              "type": "bytes32"
            },
            {
              "internalType": "bytes",
              "name": "_data",
              "type": "bytes"
            }
          ],
          "name": "isGranted",
          "outputs": [
            {
              "internalType": "bool",
              "name": "",
              "type": "bool"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "latestRelease",
          "outputs": [
            {
              "internalType": "uint8",
              "name": "",
              "type": "uint8"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "protocolVersion",
          "outputs": [
            {
              "internalType": "uint8[3]",
              "name": "",
              "type": "uint8[3]"
            }
          ],
          "stateMutability": "pure",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "proxiableUUID",
          "outputs": [
            {
              "internalType": "bytes32",
              "name": "",
              "type": "bytes32"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "_where",
              "type": "address"
            },
            {
              "internalType": "address",
              "name": "_who",
              "type": "address"
            },
            {
              "internalType": "bytes32",
              "name": "_permissionId",
              "type": "bytes32"
            }
          ],
          "name": "revoke",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "bytes4",
              "name": "_interfaceId",
              "type": "bytes4"
            }
          ],
          "name": "supportsInterface",
          "outputs": [
            {
              "internalType": "bool",
              "name": "",
              "type": "bool"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "uint8",
              "name": "_release",
              "type": "uint8"
            },
            {
              "internalType": "bytes",
              "name": "_releaseMetadata",
              "type": "bytes"
            }
          ],
          "name": "updateReleaseMetadata",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "newImplementation",
              "type": "address"
            }
          ],
          "name": "upgradeTo",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "newImplementation",
              "type": "address"
            },
            {
              "internalType": "bytes",
              "name": "data",
              "type": "bytes"
            }
          ],
          "name": "upgradeToAndCall",
          "outputs": [],
          "stateMutability": "payable",
          "type": "function"
        }
      ]
    },
    "TaskDraftsSetup": {
      "address": "0x26588F88888b7E7BCBF771b1c5db6665b52ac578",
      "abi": [
        {
          "inputs": [],
          "stateMutability": "nonpayable",
          "type": "constructor"
        },
        {
          "inputs": [],
          "name": "implementation",
          "outputs": [
            {
              "internalType": "address",
              "name": "",
              "type": "address"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "_dao",
              "type": "address"
            },
            {
              "internalType": "bytes",
              "name": "_data",
              "type": "bytes"
            }
          ],
          "name": "prepareInstallation",
          "outputs": [
            {
              "internalType": "address",
              "name": "plugin",
              "type": "address"
            },
            {
              "components": [
                {
                  "internalType": "address[]",
                  "name": "helpers",
                  "type": "address[]"
                },
                {
                  "components": [
                    {
                      "internalType": "enum PermissionLib.Operation",
                      "name": "operation",
                      "type": "uint8"
                    },
                    {
                      "internalType": "address",
                      "name": "where",
                      "type": "address"
                    },
                    {
                      "internalType": "address",
                      "name": "who",
                      "type": "address"
                    },
                    {
                      "internalType": "address",
                      "name": "condition",
                      "type": "address"
                    },
                    {
                      "internalType": "bytes32",
                      "name": "permissionId",
                      "type": "bytes32"
                    }
                  ],
                  "internalType": "struct PermissionLib.MultiTargetPermission[]",
                  "name": "permissions",
                  "type": "tuple[]"
                }
              ],
              "internalType": "struct IPluginSetup.PreparedSetupData",
              "name": "preparedSetupData",
              "type": "tuple"
            }
          ],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "_dao",
              "type": "address"
            },
            {
              "components": [
                {
                  "internalType": "address",
                  "name": "plugin",
                  "type": "address"
                },
                {
                  "internalType": "address[]",
                  "name": "currentHelpers",
                  "type": "address[]"
                },
                {
                  "internalType": "bytes",
                  "name": "data",
                  "type": "bytes"
                }
              ],
              "internalType": "struct IPluginSetup.SetupPayload",
              "name": "_payload",
              "type": "tuple"
            }
          ],
          "name": "prepareUninstallation",
          "outputs": [
            {
              "components": [
                {
                  "internalType": "enum PermissionLib.Operation",
                  "name": "operation",
                  "type": "uint8"
                },
                {
                  "internalType": "address",
                  "name": "where",
                  "type": "address"
                },
                {
                  "internalType": "address",
                  "name": "who",
                  "type": "address"
                },
                {
                  "internalType": "address",
                  "name": "condition",
                  "type": "address"
                },
                {
                  "internalType": "bytes32",
                  "name": "permissionId",
                  "type": "bytes32"
                }
              ],
              "internalType": "struct PermissionLib.MultiTargetPermission[]",
              "name": "permissions",
              "type": "tuple[]"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "_dao",
              "type": "address"
            },
            {
              "internalType": "uint16",
              "name": "_currentBuild",
              "type": "uint16"
            },
            {
              "components": [
                {
                  "internalType": "address",
                  "name": "plugin",
                  "type": "address"
                },
                {
                  "internalType": "address[]",
                  "name": "currentHelpers",
                  "type": "address[]"
                },
                {
                  "internalType": "bytes",
                  "name": "data",
                  "type": "bytes"
                }
              ],
              "internalType": "struct IPluginSetup.SetupPayload",
              "name": "_payload",
              "type": "tuple"
            }
          ],
          "name": "prepareUpdate",
          "outputs": [
            {
              "internalType": "bytes",
              "name": "initData",
              "type": "bytes"
            },
            {
              "components": [
                {
                  "internalType": "address[]",
                  "name": "helpers",
                  "type": "address[]"
                },
                {
                  "components": [
                    {
                      "internalType": "enum PermissionLib.Operation",
                      "name": "operation",
                      "type": "uint8"
                    },
                    {
                      "internalType": "address",
                      "name": "where",
                      "type": "address"
                    },
                    {
                      "internalType": "address",
                      "name": "who",
                      "type": "address"
                    },
                    {
                      "internalType": "address",
                      "name": "condition",
                      "type": "address"
                    },
                    {
                      "internalType": "bytes32",
                      "name": "permissionId",
                      "type": "bytes32"
                    }
                  ],
                  "internalType": "struct PermissionLib.MultiTargetPermission[]",
                  "name": "permissions",
                  "type": "tuple[]"
                }
              ],
              "internalType": "struct IPluginSetup.PreparedSetupData",
              "name": "preparedSetupData",
              "type": "tuple"
            }
          ],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "bytes4",
              "name": "_interfaceId",
              "type": "bytes4"
            }
          ],
          "name": "supportsInterface",
          "outputs": [
            {
              "internalType": "bool",
              "name": "",
              "type": "bool"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        }
      ]
    },
    "Tasks": {
      "address": "0xf171b0dc07a3ffcAC4Ad6284431809305bDbDB98",
      "abi": [
        {
          "inputs": [],
          "stateMutability": "nonpayable",
          "type": "constructor"
        },
        {
          "inputs": [],
          "name": "ApplicationDoesNotExist",
          "type": "error"
        },
        {
          "inputs": [],
          "name": "ApplicationNotAccepted",
          "type": "error"
        },
        {
          "inputs": [],
          "name": "ArrayLargerThanSupported",
          "type": "error"
        },
        {
          "inputs": [],
          "name": "Disabled",
          "type": "error"
        },
        {
          "inputs": [],
          "name": "InvalidAddress",
          "type": "error"
        },
        {
          "inputs": [],
          "name": "InvalidTimestamp",
          "type": "error"
        },
        {
          "inputs": [],
          "name": "JudgementNone",
          "type": "error"
        },
        {
          "inputs": [],
          "name": "ManualBudgetIncreaseRequired",
          "type": "error"
        },
        {
          "inputs": [],
          "name": "NotDisabled",
          "type": "error"
        },
        {
          "inputs": [],
          "name": "NotDisabler",
          "type": "error"
        },
        {
          "inputs": [],
          "name": "NotExecutor",
          "type": "error"
        },
        {
          "inputs": [],
          "name": "NotManager",
          "type": "error"
        },
        {
          "inputs": [],
          "name": "NotYourApplication",
          "type": "error"
        },
        {
          "inputs": [],
          "name": "PointlessOperation",
          "type": "error"
        },
        {
          "inputs": [],
          "name": "RequestAlreadyAccepted",
          "type": "error"
        },
        {
          "inputs": [],
          "name": "RequestAlreadyExecuted",
          "type": "error"
        },
        {
          "inputs": [],
          "name": "RequestDoesNotExist",
          "type": "error"
        },
        {
          "inputs": [],
          "name": "RequestNotAccepted",
          "type": "error"
        },
        {
          "inputs": [],
          "name": "RewardAboveBudget",
          "type": "error"
        },
        {
          "inputs": [],
          "name": "RewardDoesntEndWithNewToken",
          "type": "error"
        },
        {
          "inputs": [],
          "name": "SubmissionAlreadyJudged",
          "type": "error"
        },
        {
          "inputs": [],
          "name": "SubmissionDoesNotExist",
          "type": "error"
        },
        {
          "inputs": [],
          "name": "TaskClosed",
          "type": "error"
        },
        {
          "inputs": [],
          "name": "TaskDoesNotExist",
          "type": "error"
        },
        {
          "inputs": [],
          "name": "TaskNotClosed",
          "type": "error"
        },
        {
          "inputs": [],
          "name": "TaskNotOpen",
          "type": "error"
        },
        {
          "inputs": [],
          "name": "TaskNotTaken",
          "type": "error"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": true,
              "internalType": "uint256",
              "name": "taskId",
              "type": "uint256"
            },
            {
              "indexed": false,
              "internalType": "uint16",
              "name": "applicationId",
              "type": "uint16"
            },
            {
              "indexed": false,
              "internalType": "address",
              "name": "manager",
              "type": "address"
            },
            {
              "indexed": false,
              "internalType": "address",
              "name": "applicant",
              "type": "address"
            }
          ],
          "name": "ApplicationAccepted",
          "type": "event"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": true,
              "internalType": "uint256",
              "name": "taskId",
              "type": "uint256"
            },
            {
              "indexed": false,
              "internalType": "uint16",
              "name": "applicationId",
              "type": "uint16"
            },
            {
              "indexed": false,
              "internalType": "string",
              "name": "metadata",
              "type": "string"
            },
            {
              "components": [
                {
                  "internalType": "bool",
                  "name": "nextToken",
                  "type": "bool"
                },
                {
                  "internalType": "address",
                  "name": "to",
                  "type": "address"
                },
                {
                  "internalType": "uint88",
                  "name": "amount",
                  "type": "uint88"
                }
              ],
              "indexed": false,
              "internalType": "struct ITasks.Reward[]",
              "name": "reward",
              "type": "tuple[]"
            },
            {
              "indexed": false,
              "internalType": "address",
              "name": "manager",
              "type": "address"
            },
            {
              "indexed": false,
              "internalType": "address",
              "name": "applicant",
              "type": "address"
            }
          ],
          "name": "ApplicationCreated",
          "type": "event"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": true,
              "internalType": "uint256",
              "name": "taskId",
              "type": "uint256"
            },
            {
              "indexed": false,
              "internalType": "uint96[]",
              "name": "increase",
              "type": "uint96[]"
            },
            {
              "indexed": false,
              "internalType": "address",
              "name": "manager",
              "type": "address"
            }
          ],
          "name": "BudgetIncreased",
          "type": "event"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": true,
              "internalType": "uint256",
              "name": "taskId",
              "type": "uint256"
            },
            {
              "indexed": false,
              "internalType": "uint8",
              "name": "requestId",
              "type": "uint8"
            },
            {
              "indexed": false,
              "internalType": "string",
              "name": "explanation",
              "type": "string"
            },
            {
              "indexed": false,
              "internalType": "address",
              "name": "manager",
              "type": "address"
            },
            {
              "indexed": false,
              "internalType": "address",
              "name": "executor",
              "type": "address"
            }
          ],
          "name": "CancelTaskRequested",
          "type": "event"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": true,
              "internalType": "uint256",
              "name": "taskId",
              "type": "uint256"
            },
            {
              "indexed": false,
              "internalType": "uint64",
              "name": "extension",
              "type": "uint64"
            },
            {
              "indexed": false,
              "internalType": "address",
              "name": "manager",
              "type": "address"
            },
            {
              "indexed": false,
              "internalType": "address",
              "name": "executor",
              "type": "address"
            }
          ],
          "name": "DeadlineExtended",
          "type": "event"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": true,
              "internalType": "uint256",
              "name": "taskId",
              "type": "uint256"
            },
            {
              "indexed": false,
              "internalType": "string",
              "name": "newMetadata",
              "type": "string"
            },
            {
              "indexed": false,
              "internalType": "address",
              "name": "manager",
              "type": "address"
            }
          ],
          "name": "MetadataEditted",
          "type": "event"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": true,
              "internalType": "uint256",
              "name": "taskId",
              "type": "uint256"
            },
            {
              "indexed": false,
              "internalType": "enum ITasks.RequestType",
              "name": "requestType",
              "type": "uint8"
            },
            {
              "indexed": false,
              "internalType": "uint8",
              "name": "requestId",
              "type": "uint8"
            },
            {
              "indexed": false,
              "internalType": "address",
              "name": "manager",
              "type": "address"
            },
            {
              "indexed": false,
              "internalType": "address",
              "name": "executor",
              "type": "address"
            }
          ],
          "name": "RequestAccepted",
          "type": "event"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": true,
              "internalType": "uint256",
              "name": "taskId",
              "type": "uint256"
            },
            {
              "indexed": false,
              "internalType": "enum ITasks.RequestType",
              "name": "requestType",
              "type": "uint8"
            },
            {
              "indexed": false,
              "internalType": "uint8",
              "name": "requestId",
              "type": "uint8"
            },
            {
              "indexed": false,
              "internalType": "address",
              "name": "by",
              "type": "address"
            },
            {
              "indexed": false,
              "internalType": "address",
              "name": "manager",
              "type": "address"
            },
            {
              "indexed": false,
              "internalType": "address",
              "name": "executor",
              "type": "address"
            }
          ],
          "name": "RequestExecuted",
          "type": "event"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": true,
              "internalType": "uint256",
              "name": "taskId",
              "type": "uint256"
            },
            {
              "indexed": false,
              "internalType": "uint8",
              "name": "submissionId",
              "type": "uint8"
            },
            {
              "indexed": false,
              "internalType": "string",
              "name": "metadata",
              "type": "string"
            },
            {
              "indexed": false,
              "internalType": "address",
              "name": "manager",
              "type": "address"
            },
            {
              "indexed": false,
              "internalType": "address",
              "name": "executor",
              "type": "address"
            }
          ],
          "name": "SubmissionCreated",
          "type": "event"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": true,
              "internalType": "uint256",
              "name": "taskId",
              "type": "uint256"
            },
            {
              "indexed": false,
              "internalType": "uint8",
              "name": "submissionId",
              "type": "uint8"
            },
            {
              "indexed": false,
              "internalType": "enum ITasks.SubmissionJudgement",
              "name": "judgement",
              "type": "uint8"
            },
            {
              "indexed": false,
              "internalType": "string",
              "name": "feedback",
              "type": "string"
            },
            {
              "indexed": false,
              "internalType": "address",
              "name": "manager",
              "type": "address"
            },
            {
              "indexed": false,
              "internalType": "address",
              "name": "executor",
              "type": "address"
            }
          ],
          "name": "SubmissionReviewed",
          "type": "event"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": true,
              "internalType": "uint256",
              "name": "taskId",
              "type": "uint256"
            },
            {
              "indexed": false,
              "internalType": "address",
              "name": "manager",
              "type": "address"
            },
            {
              "indexed": false,
              "internalType": "address",
              "name": "executor",
              "type": "address"
            }
          ],
          "name": "TaskCancelled",
          "type": "event"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": true,
              "internalType": "uint256",
              "name": "taskId",
              "type": "uint256"
            },
            {
              "indexed": false,
              "internalType": "address",
              "name": "manager",
              "type": "address"
            },
            {
              "indexed": false,
              "internalType": "address",
              "name": "executor",
              "type": "address"
            }
          ],
          "name": "TaskCompleted",
          "type": "event"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": true,
              "internalType": "uint256",
              "name": "taskId",
              "type": "uint256"
            },
            {
              "indexed": false,
              "internalType": "string",
              "name": "metadata",
              "type": "string"
            },
            {
              "indexed": false,
              "internalType": "uint64",
              "name": "deadline",
              "type": "uint64"
            },
            {
              "components": [
                {
                  "internalType": "contract IERC20",
                  "name": "tokenContract",
                  "type": "address"
                },
                {
                  "internalType": "uint96",
                  "name": "amount",
                  "type": "uint96"
                }
              ],
              "indexed": false,
              "internalType": "struct ITasks.ERC20Transfer[]",
              "name": "budget",
              "type": "tuple[]"
            },
            {
              "indexed": false,
              "internalType": "address",
              "name": "creator",
              "type": "address"
            },
            {
              "indexed": false,
              "internalType": "address",
              "name": "manager",
              "type": "address"
            }
          ],
          "name": "TaskCreated",
          "type": "event"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": true,
              "internalType": "uint256",
              "name": "taskId",
              "type": "uint256"
            },
            {
              "indexed": false,
              "internalType": "uint16",
              "name": "applicationId",
              "type": "uint16"
            },
            {
              "indexed": false,
              "internalType": "address",
              "name": "manager",
              "type": "address"
            },
            {
              "indexed": false,
              "internalType": "address",
              "name": "executor",
              "type": "address"
            }
          ],
          "name": "TaskTaken",
          "type": "event"
        },
        {
          "inputs": [
            {
              "internalType": "uint256",
              "name": "_taskId",
              "type": "uint256"
            },
            {
              "internalType": "uint16[]",
              "name": "_applicationIds",
              "type": "uint16[]"
            }
          ],
          "name": "acceptApplications",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "uint256",
              "name": "_taskId",
              "type": "uint256"
            },
            {
              "internalType": "enum ITasks.RequestType",
              "name": "_requestType",
              "type": "uint8"
            },
            {
              "internalType": "uint8",
              "name": "_requestId",
              "type": "uint8"
            },
            {
              "internalType": "bool",
              "name": "_execute",
              "type": "bool"
            }
          ],
          "name": "acceptRequest",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "uint256",
              "name": "_taskId",
              "type": "uint256"
            },
            {
              "internalType": "string",
              "name": "_metadata",
              "type": "string"
            },
            {
              "components": [
                {
                  "internalType": "bool",
                  "name": "nextToken",
                  "type": "bool"
                },
                {
                  "internalType": "address",
                  "name": "to",
                  "type": "address"
                },
                {
                  "internalType": "uint88",
                  "name": "amount",
                  "type": "uint88"
                }
              ],
              "internalType": "struct ITasks.Reward[]",
              "name": "_reward",
              "type": "tuple[]"
            }
          ],
          "name": "applyForTask",
          "outputs": [
            {
              "internalType": "uint16",
              "name": "applicationId",
              "type": "uint16"
            }
          ],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "uint256",
              "name": "_taskId",
              "type": "uint256"
            },
            {
              "internalType": "string",
              "name": "_explanation",
              "type": "string"
            }
          ],
          "name": "cancelTask",
          "outputs": [
            {
              "internalType": "uint8",
              "name": "cancelTaskRequestId",
              "type": "uint8"
            }
          ],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "uint256",
              "name": "_taskId",
              "type": "uint256"
            },
            {
              "internalType": "string",
              "name": "_metadata",
              "type": "string"
            }
          ],
          "name": "createSubmission",
          "outputs": [
            {
              "internalType": "uint8",
              "name": "submissionId",
              "type": "uint8"
            }
          ],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "string",
              "name": "_metadata",
              "type": "string"
            },
            {
              "internalType": "uint64",
              "name": "_deadline",
              "type": "uint64"
            },
            {
              "components": [
                {
                  "internalType": "contract IERC20",
                  "name": "tokenContract",
                  "type": "address"
                },
                {
                  "internalType": "uint96",
                  "name": "amount",
                  "type": "uint96"
                }
              ],
              "internalType": "struct ITasks.ERC20Transfer[]",
              "name": "_budget",
              "type": "tuple[]"
            },
            {
              "internalType": "address",
              "name": "_manager",
              "type": "address"
            },
            {
              "components": [
                {
                  "internalType": "address",
                  "name": "applicant",
                  "type": "address"
                },
                {
                  "components": [
                    {
                      "internalType": "bool",
                      "name": "nextToken",
                      "type": "bool"
                    },
                    {
                      "internalType": "address",
                      "name": "to",
                      "type": "address"
                    },
                    {
                      "internalType": "uint88",
                      "name": "amount",
                      "type": "uint88"
                    }
                  ],
                  "internalType": "struct ITasks.Reward[]",
                  "name": "reward",
                  "type": "tuple[]"
                }
              ],
              "internalType": "struct ITasks.PreapprovedApplication[]",
              "name": "_preapprove",
              "type": "tuple[]"
            }
          ],
          "name": "createTask",
          "outputs": [
            {
              "internalType": "uint256",
              "name": "taskId",
              "type": "uint256"
            }
          ],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "disable",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "uint256",
              "name": "_taskId",
              "type": "uint256"
            },
            {
              "internalType": "string",
              "name": "_newMetadata",
              "type": "string"
            }
          ],
          "name": "editMetadata",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "uint256",
              "name": "_taskId",
              "type": "uint256"
            },
            {
              "internalType": "enum ITasks.RequestType",
              "name": "_requestType",
              "type": "uint8"
            },
            {
              "internalType": "uint8",
              "name": "_requestId",
              "type": "uint8"
            }
          ],
          "name": "executeRequest",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "uint256",
              "name": "_taskId",
              "type": "uint256"
            },
            {
              "internalType": "uint64",
              "name": "_extension",
              "type": "uint64"
            }
          ],
          "name": "extendDeadline",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "_executor",
              "type": "address"
            },
            {
              "internalType": "uint256",
              "name": "_fromTaskId",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "_max",
              "type": "uint256"
            }
          ],
          "name": "getExecutingTasks",
          "outputs": [
            {
              "components": [
                {
                  "internalType": "string",
                  "name": "metadata",
                  "type": "string"
                },
                {
                  "internalType": "uint64",
                  "name": "deadline",
                  "type": "uint64"
                },
                {
                  "internalType": "uint16",
                  "name": "executorApplication",
                  "type": "uint16"
                },
                {
                  "internalType": "address",
                  "name": "creator",
                  "type": "address"
                },
                {
                  "internalType": "address",
                  "name": "manager",
                  "type": "address"
                },
                {
                  "internalType": "enum ITasks.TaskState",
                  "name": "state",
                  "type": "uint8"
                },
                {
                  "internalType": "contract Escrow",
                  "name": "escrow",
                  "type": "address"
                },
                {
                  "components": [
                    {
                      "internalType": "contract IERC20",
                      "name": "tokenContract",
                      "type": "address"
                    },
                    {
                      "internalType": "uint96",
                      "name": "amount",
                      "type": "uint96"
                    }
                  ],
                  "internalType": "struct ITasks.ERC20Transfer[]",
                  "name": "budget",
                  "type": "tuple[]"
                },
                {
                  "components": [
                    {
                      "internalType": "string",
                      "name": "metadata",
                      "type": "string"
                    },
                    {
                      "internalType": "address",
                      "name": "applicant",
                      "type": "address"
                    },
                    {
                      "internalType": "bool",
                      "name": "accepted",
                      "type": "bool"
                    },
                    {
                      "components": [
                        {
                          "internalType": "bool",
                          "name": "nextToken",
                          "type": "bool"
                        },
                        {
                          "internalType": "address",
                          "name": "to",
                          "type": "address"
                        },
                        {
                          "internalType": "uint88",
                          "name": "amount",
                          "type": "uint88"
                        }
                      ],
                      "internalType": "struct ITasks.Reward[]",
                      "name": "reward",
                      "type": "tuple[]"
                    }
                  ],
                  "internalType": "struct ITasks.OffChainApplication[]",
                  "name": "applications",
                  "type": "tuple[]"
                },
                {
                  "components": [
                    {
                      "internalType": "string",
                      "name": "metadata",
                      "type": "string"
                    },
                    {
                      "internalType": "string",
                      "name": "feedback",
                      "type": "string"
                    },
                    {
                      "internalType": "enum ITasks.SubmissionJudgement",
                      "name": "judgement",
                      "type": "uint8"
                    }
                  ],
                  "internalType": "struct ITasks.Submission[]",
                  "name": "submissions",
                  "type": "tuple[]"
                },
                {
                  "components": [
                    {
                      "components": [
                        {
                          "internalType": "bool",
                          "name": "accepted",
                          "type": "bool"
                        },
                        {
                          "internalType": "bool",
                          "name": "executed",
                          "type": "bool"
                        }
                      ],
                      "internalType": "struct ITasks.Request",
                      "name": "request",
                      "type": "tuple"
                    },
                    {
                      "internalType": "string",
                      "name": "explanation",
                      "type": "string"
                    }
                  ],
                  "internalType": "struct ITasks.CancelTaskRequest[]",
                  "name": "cancelTaskRequests",
                  "type": "tuple[]"
                }
              ],
              "internalType": "struct ITasks.OffChainTask[]",
              "name": "",
              "type": "tuple[]"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "_manager",
              "type": "address"
            },
            {
              "internalType": "uint256",
              "name": "_fromTaskId",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "_max",
              "type": "uint256"
            }
          ],
          "name": "getManagingTasks",
          "outputs": [
            {
              "components": [
                {
                  "internalType": "string",
                  "name": "metadata",
                  "type": "string"
                },
                {
                  "internalType": "uint64",
                  "name": "deadline",
                  "type": "uint64"
                },
                {
                  "internalType": "uint16",
                  "name": "executorApplication",
                  "type": "uint16"
                },
                {
                  "internalType": "address",
                  "name": "creator",
                  "type": "address"
                },
                {
                  "internalType": "address",
                  "name": "manager",
                  "type": "address"
                },
                {
                  "internalType": "enum ITasks.TaskState",
                  "name": "state",
                  "type": "uint8"
                },
                {
                  "internalType": "contract Escrow",
                  "name": "escrow",
                  "type": "address"
                },
                {
                  "components": [
                    {
                      "internalType": "contract IERC20",
                      "name": "tokenContract",
                      "type": "address"
                    },
                    {
                      "internalType": "uint96",
                      "name": "amount",
                      "type": "uint96"
                    }
                  ],
                  "internalType": "struct ITasks.ERC20Transfer[]",
                  "name": "budget",
                  "type": "tuple[]"
                },
                {
                  "components": [
                    {
                      "internalType": "string",
                      "name": "metadata",
                      "type": "string"
                    },
                    {
                      "internalType": "address",
                      "name": "applicant",
                      "type": "address"
                    },
                    {
                      "internalType": "bool",
                      "name": "accepted",
                      "type": "bool"
                    },
                    {
                      "components": [
                        {
                          "internalType": "bool",
                          "name": "nextToken",
                          "type": "bool"
                        },
                        {
                          "internalType": "address",
                          "name": "to",
                          "type": "address"
                        },
                        {
                          "internalType": "uint88",
                          "name": "amount",
                          "type": "uint88"
                        }
                      ],
                      "internalType": "struct ITasks.Reward[]",
                      "name": "reward",
                      "type": "tuple[]"
                    }
                  ],
                  "internalType": "struct ITasks.OffChainApplication[]",
                  "name": "applications",
                  "type": "tuple[]"
                },
                {
                  "components": [
                    {
                      "internalType": "string",
                      "name": "metadata",
                      "type": "string"
                    },
                    {
                      "internalType": "string",
                      "name": "feedback",
                      "type": "string"
                    },
                    {
                      "internalType": "enum ITasks.SubmissionJudgement",
                      "name": "judgement",
                      "type": "uint8"
                    }
                  ],
                  "internalType": "struct ITasks.Submission[]",
                  "name": "submissions",
                  "type": "tuple[]"
                },
                {
                  "components": [
                    {
                      "components": [
                        {
                          "internalType": "bool",
                          "name": "accepted",
                          "type": "bool"
                        },
                        {
                          "internalType": "bool",
                          "name": "executed",
                          "type": "bool"
                        }
                      ],
                      "internalType": "struct ITasks.Request",
                      "name": "request",
                      "type": "tuple"
                    },
                    {
                      "internalType": "string",
                      "name": "explanation",
                      "type": "string"
                    }
                  ],
                  "internalType": "struct ITasks.CancelTaskRequest[]",
                  "name": "cancelTaskRequests",
                  "type": "tuple[]"
                }
              ],
              "internalType": "struct ITasks.OffChainTask[]",
              "name": "",
              "type": "tuple[]"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "uint256",
              "name": "_taskId",
              "type": "uint256"
            }
          ],
          "name": "getTask",
          "outputs": [
            {
              "components": [
                {
                  "internalType": "string",
                  "name": "metadata",
                  "type": "string"
                },
                {
                  "internalType": "uint64",
                  "name": "deadline",
                  "type": "uint64"
                },
                {
                  "internalType": "uint16",
                  "name": "executorApplication",
                  "type": "uint16"
                },
                {
                  "internalType": "address",
                  "name": "creator",
                  "type": "address"
                },
                {
                  "internalType": "address",
                  "name": "manager",
                  "type": "address"
                },
                {
                  "internalType": "enum ITasks.TaskState",
                  "name": "state",
                  "type": "uint8"
                },
                {
                  "internalType": "contract Escrow",
                  "name": "escrow",
                  "type": "address"
                },
                {
                  "components": [
                    {
                      "internalType": "contract IERC20",
                      "name": "tokenContract",
                      "type": "address"
                    },
                    {
                      "internalType": "uint96",
                      "name": "amount",
                      "type": "uint96"
                    }
                  ],
                  "internalType": "struct ITasks.ERC20Transfer[]",
                  "name": "budget",
                  "type": "tuple[]"
                },
                {
                  "components": [
                    {
                      "internalType": "string",
                      "name": "metadata",
                      "type": "string"
                    },
                    {
                      "internalType": "address",
                      "name": "applicant",
                      "type": "address"
                    },
                    {
                      "internalType": "bool",
                      "name": "accepted",
                      "type": "bool"
                    },
                    {
                      "components": [
                        {
                          "internalType": "bool",
                          "name": "nextToken",
                          "type": "bool"
                        },
                        {
                          "internalType": "address",
                          "name": "to",
                          "type": "address"
                        },
                        {
                          "internalType": "uint88",
                          "name": "amount",
                          "type": "uint88"
                        }
                      ],
                      "internalType": "struct ITasks.Reward[]",
                      "name": "reward",
                      "type": "tuple[]"
                    }
                  ],
                  "internalType": "struct ITasks.OffChainApplication[]",
                  "name": "applications",
                  "type": "tuple[]"
                },
                {
                  "components": [
                    {
                      "internalType": "string",
                      "name": "metadata",
                      "type": "string"
                    },
                    {
                      "internalType": "string",
                      "name": "feedback",
                      "type": "string"
                    },
                    {
                      "internalType": "enum ITasks.SubmissionJudgement",
                      "name": "judgement",
                      "type": "uint8"
                    }
                  ],
                  "internalType": "struct ITasks.Submission[]",
                  "name": "submissions",
                  "type": "tuple[]"
                },
                {
                  "components": [
                    {
                      "components": [
                        {
                          "internalType": "bool",
                          "name": "accepted",
                          "type": "bool"
                        },
                        {
                          "internalType": "bool",
                          "name": "executed",
                          "type": "bool"
                        }
                      ],
                      "internalType": "struct ITasks.Request",
                      "name": "request",
                      "type": "tuple"
                    },
                    {
                      "internalType": "string",
                      "name": "explanation",
                      "type": "string"
                    }
                  ],
                  "internalType": "struct ITasks.CancelTaskRequest[]",
                  "name": "cancelTaskRequests",
                  "type": "tuple[]"
                }
              ],
              "internalType": "struct ITasks.OffChainTask",
              "name": "offchainTask",
              "type": "tuple"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "uint256[]",
              "name": "_taskIds",
              "type": "uint256[]"
            }
          ],
          "name": "getTasks",
          "outputs": [
            {
              "components": [
                {
                  "internalType": "string",
                  "name": "metadata",
                  "type": "string"
                },
                {
                  "internalType": "uint64",
                  "name": "deadline",
                  "type": "uint64"
                },
                {
                  "internalType": "uint16",
                  "name": "executorApplication",
                  "type": "uint16"
                },
                {
                  "internalType": "address",
                  "name": "creator",
                  "type": "address"
                },
                {
                  "internalType": "address",
                  "name": "manager",
                  "type": "address"
                },
                {
                  "internalType": "enum ITasks.TaskState",
                  "name": "state",
                  "type": "uint8"
                },
                {
                  "internalType": "contract Escrow",
                  "name": "escrow",
                  "type": "address"
                },
                {
                  "components": [
                    {
                      "internalType": "contract IERC20",
                      "name": "tokenContract",
                      "type": "address"
                    },
                    {
                      "internalType": "uint96",
                      "name": "amount",
                      "type": "uint96"
                    }
                  ],
                  "internalType": "struct ITasks.ERC20Transfer[]",
                  "name": "budget",
                  "type": "tuple[]"
                },
                {
                  "components": [
                    {
                      "internalType": "string",
                      "name": "metadata",
                      "type": "string"
                    },
                    {
                      "internalType": "address",
                      "name": "applicant",
                      "type": "address"
                    },
                    {
                      "internalType": "bool",
                      "name": "accepted",
                      "type": "bool"
                    },
                    {
                      "components": [
                        {
                          "internalType": "bool",
                          "name": "nextToken",
                          "type": "bool"
                        },
                        {
                          "internalType": "address",
                          "name": "to",
                          "type": "address"
                        },
                        {
                          "internalType": "uint88",
                          "name": "amount",
                          "type": "uint88"
                        }
                      ],
                      "internalType": "struct ITasks.Reward[]",
                      "name": "reward",
                      "type": "tuple[]"
                    }
                  ],
                  "internalType": "struct ITasks.OffChainApplication[]",
                  "name": "applications",
                  "type": "tuple[]"
                },
                {
                  "components": [
                    {
                      "internalType": "string",
                      "name": "metadata",
                      "type": "string"
                    },
                    {
                      "internalType": "string",
                      "name": "feedback",
                      "type": "string"
                    },
                    {
                      "internalType": "enum ITasks.SubmissionJudgement",
                      "name": "judgement",
                      "type": "uint8"
                    }
                  ],
                  "internalType": "struct ITasks.Submission[]",
                  "name": "submissions",
                  "type": "tuple[]"
                },
                {
                  "components": [
                    {
                      "components": [
                        {
                          "internalType": "bool",
                          "name": "accepted",
                          "type": "bool"
                        },
                        {
                          "internalType": "bool",
                          "name": "executed",
                          "type": "bool"
                        }
                      ],
                      "internalType": "struct ITasks.Request",
                      "name": "request",
                      "type": "tuple"
                    },
                    {
                      "internalType": "string",
                      "name": "explanation",
                      "type": "string"
                    }
                  ],
                  "internalType": "struct ITasks.CancelTaskRequest[]",
                  "name": "cancelTaskRequests",
                  "type": "tuple[]"
                }
              ],
              "internalType": "struct ITasks.OffChainTask[]",
              "name": "",
              "type": "tuple[]"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "uint256",
              "name": "_taskId",
              "type": "uint256"
            },
            {
              "internalType": "uint96[]",
              "name": "_increase",
              "type": "uint96[]"
            }
          ],
          "name": "increaseBudget",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "uint256",
              "name": "_taskId",
              "type": "uint256"
            }
          ],
          "name": "refund",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "uint256",
              "name": "_taskId",
              "type": "uint256"
            },
            {
              "internalType": "uint8",
              "name": "_submissionId",
              "type": "uint8"
            },
            {
              "internalType": "enum ITasks.SubmissionJudgement",
              "name": "_judgement",
              "type": "uint8"
            },
            {
              "internalType": "string",
              "name": "_feedback",
              "type": "string"
            }
          ],
          "name": "reviewSubmission",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "uint256",
              "name": "_taskId",
              "type": "uint256"
            },
            {
              "internalType": "uint16",
              "name": "_applicationId",
              "type": "uint16"
            }
          ],
          "name": "takeTask",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "taskCount",
          "outputs": [
            {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "taskStatistics",
          "outputs": [
            {
              "internalType": "uint256",
              "name": "open",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "taken",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "successful",
              "type": "uint256"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        }
      ]
    },
    "TokenListGovernanceImplementation": {
      "address": "0xB9d082E33CCF113f38722E4988D213115FE98df0",
      "abi": [
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "dao",
              "type": "address"
            },
            {
              "internalType": "address",
              "name": "where",
              "type": "address"
            },
            {
              "internalType": "address",
              "name": "who",
              "type": "address"
            },
            {
              "internalType": "bytes32",
              "name": "permissionId",
              "type": "bytes32"
            }
          ],
          "name": "DaoUnauthorized",
          "type": "error"
        },
        {
          "inputs": [
            {
              "internalType": "uint64",
              "name": "limit",
              "type": "uint64"
            },
            {
              "internalType": "uint64",
              "name": "actual",
              "type": "uint64"
            }
          ],
          "name": "DateOutOfBounds",
          "type": "error"
        },
        {
          "inputs": [
            {
              "internalType": "uint256",
              "name": "tokenId",
              "type": "uint256"
            }
          ],
          "name": "InvalidTokenlistUpdate",
          "type": "error"
        },
        {
          "inputs": [
            {
              "internalType": "uint64",
              "name": "limit",
              "type": "uint64"
            },
            {
              "internalType": "uint64",
              "name": "actual",
              "type": "uint64"
            }
          ],
          "name": "MinDurationOutOfBounds",
          "type": "error"
        },
        {
          "inputs": [
            {
              "internalType": "uint256",
              "name": "sender",
              "type": "uint256"
            }
          ],
          "name": "ProposalCreationForbidden",
          "type": "error"
        },
        {
          "inputs": [
            {
              "internalType": "uint256",
              "name": "proposalId",
              "type": "uint256"
            }
          ],
          "name": "ProposalExecutionForbidden",
          "type": "error"
        },
        {
          "inputs": [
            {
              "internalType": "uint256",
              "name": "limit",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "actual",
              "type": "uint256"
            }
          ],
          "name": "RatioOutOfBounds",
          "type": "error"
        },
        {
          "inputs": [
            {
              "internalType": "uint256",
              "name": "tokenId",
              "type": "uint256"
            },
            {
              "internalType": "address",
              "name": "sender",
              "type": "address"
            }
          ],
          "name": "TokenNotOwnedBySender",
          "type": "error"
        },
        {
          "inputs": [
            {
              "internalType": "uint256",
              "name": "proposalId",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "account",
              "type": "uint256"
            },
            {
              "internalType": "enum ITokenMajorityVoting.VoteOption",
              "name": "voteOption",
              "type": "uint8"
            }
          ],
          "name": "VoteCastForbidden",
          "type": "error"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": false,
              "internalType": "address",
              "name": "previousAdmin",
              "type": "address"
            },
            {
              "indexed": false,
              "internalType": "address",
              "name": "newAdmin",
              "type": "address"
            }
          ],
          "name": "AdminChanged",
          "type": "event"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": true,
              "internalType": "address",
              "name": "beacon",
              "type": "address"
            }
          ],
          "name": "BeaconUpgraded",
          "type": "event"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": false,
              "internalType": "uint8",
              "name": "version",
              "type": "uint8"
            }
          ],
          "name": "Initialized",
          "type": "event"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": false,
              "internalType": "uint256[]",
              "name": "members",
              "type": "uint256[]"
            }
          ],
          "name": "MembersAdded",
          "type": "event"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": false,
              "internalType": "uint256[]",
              "name": "members",
              "type": "uint256[]"
            }
          ],
          "name": "MembersRemoved",
          "type": "event"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": true,
              "internalType": "address",
              "name": "definingContract",
              "type": "address"
            }
          ],
          "name": "MembershipContractAnnounced",
          "type": "event"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": true,
              "internalType": "uint256",
              "name": "proposalId",
              "type": "uint256"
            },
            {
              "indexed": true,
              "internalType": "address",
              "name": "creator",
              "type": "address"
            },
            {
              "indexed": false,
              "internalType": "uint64",
              "name": "startDate",
              "type": "uint64"
            },
            {
              "indexed": false,
              "internalType": "uint64",
              "name": "endDate",
              "type": "uint64"
            },
            {
              "indexed": false,
              "internalType": "bytes",
              "name": "metadata",
              "type": "bytes"
            },
            {
              "components": [
                {
                  "internalType": "address",
                  "name": "to",
                  "type": "address"
                },
                {
                  "internalType": "uint256",
                  "name": "value",
                  "type": "uint256"
                },
                {
                  "internalType": "bytes",
                  "name": "data",
                  "type": "bytes"
                }
              ],
              "indexed": false,
              "internalType": "struct IDAO.Action[]",
              "name": "actions",
              "type": "tuple[]"
            },
            {
              "indexed": false,
              "internalType": "uint256",
              "name": "allowFailureMap",
              "type": "uint256"
            }
          ],
          "name": "ProposalCreated",
          "type": "event"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": true,
              "internalType": "uint256",
              "name": "proposalId",
              "type": "uint256"
            }
          ],
          "name": "ProposalExecuted",
          "type": "event"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": false,
              "internalType": "uint256[]",
              "name": "tokens",
              "type": "uint256[]"
            }
          ],
          "name": "TokensAdded",
          "type": "event"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": false,
              "internalType": "uint256[]",
              "name": "tokens",
              "type": "uint256[]"
            }
          ],
          "name": "TokensRemoved",
          "type": "event"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": true,
              "internalType": "address",
              "name": "implementation",
              "type": "address"
            }
          ],
          "name": "Upgraded",
          "type": "event"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": true,
              "internalType": "uint256",
              "name": "proposalId",
              "type": "uint256"
            },
            {
              "indexed": true,
              "internalType": "uint256",
              "name": "voter",
              "type": "uint256"
            },
            {
              "indexed": false,
              "internalType": "enum ITokenMajorityVoting.VoteOption",
              "name": "voteOption",
              "type": "uint8"
            },
            {
              "indexed": false,
              "internalType": "uint256",
              "name": "votingPower",
              "type": "uint256"
            }
          ],
          "name": "VoteCast",
          "type": "event"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": false,
              "internalType": "enum TokenMajorityVotingBase.VotingMode",
              "name": "votingMode",
              "type": "uint8"
            },
            {
              "indexed": false,
              "internalType": "uint32",
              "name": "supportThreshold",
              "type": "uint32"
            },
            {
              "indexed": false,
              "internalType": "uint32",
              "name": "minParticipation",
              "type": "uint32"
            },
            {
              "indexed": false,
              "internalType": "uint64",
              "name": "minDuration",
              "type": "uint64"
            },
            {
              "indexed": false,
              "internalType": "uint256",
              "name": "minProposerVotingPower",
              "type": "uint256"
            }
          ],
          "name": "VotingSettingsUpdated",
          "type": "event"
        },
        {
          "inputs": [],
          "name": "UPDATE_MEMBERS_PERMISSION_ID",
          "outputs": [
            {
              "internalType": "bytes32",
              "name": "",
              "type": "bytes32"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "UPDATE_VOTING_SETTINGS_PERMISSION_ID",
          "outputs": [
            {
              "internalType": "bytes32",
              "name": "",
              "type": "bytes32"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "UPGRADE_PLUGIN_PERMISSION_ID",
          "outputs": [
            {
              "internalType": "bytes32",
              "name": "",
              "type": "bytes32"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "uint256[]",
              "name": "_members",
              "type": "uint256[]"
            }
          ],
          "name": "addMembers",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "uint256",
              "name": "_proposalId",
              "type": "uint256"
            }
          ],
          "name": "canExecute",
          "outputs": [
            {
              "internalType": "bool",
              "name": "",
              "type": "bool"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "uint256",
              "name": "_proposalId",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "_account",
              "type": "uint256"
            },
            {
              "internalType": "enum ITokenMajorityVoting.VoteOption",
              "name": "_voteOption",
              "type": "uint8"
            }
          ],
          "name": "canVote",
          "outputs": [
            {
              "internalType": "bool",
              "name": "",
              "type": "bool"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "bytes",
              "name": "_metadata",
              "type": "bytes"
            },
            {
              "components": [
                {
                  "internalType": "address",
                  "name": "to",
                  "type": "address"
                },
                {
                  "internalType": "uint256",
                  "name": "value",
                  "type": "uint256"
                },
                {
                  "internalType": "bytes",
                  "name": "data",
                  "type": "bytes"
                }
              ],
              "internalType": "struct IDAO.Action[]",
              "name": "_actions",
              "type": "tuple[]"
            },
            {
              "internalType": "uint256",
              "name": "_allowFailureMap",
              "type": "uint256"
            },
            {
              "internalType": "uint64",
              "name": "_startDate",
              "type": "uint64"
            },
            {
              "internalType": "uint64",
              "name": "_endDate",
              "type": "uint64"
            }
          ],
          "name": "createPluginProposal",
          "outputs": [
            {
              "internalType": "uint256",
              "name": "proposalId",
              "type": "uint256"
            }
          ],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "bytes",
              "name": "_metadata",
              "type": "bytes"
            },
            {
              "components": [
                {
                  "internalType": "address",
                  "name": "to",
                  "type": "address"
                },
                {
                  "internalType": "uint256",
                  "name": "value",
                  "type": "uint256"
                },
                {
                  "internalType": "bytes",
                  "name": "data",
                  "type": "bytes"
                }
              ],
              "internalType": "struct IDAO.Action[]",
              "name": "_actions",
              "type": "tuple[]"
            },
            {
              "internalType": "uint256",
              "name": "_allowFailureMap",
              "type": "uint256"
            },
            {
              "internalType": "uint64",
              "name": "_startDate",
              "type": "uint64"
            },
            {
              "internalType": "uint64",
              "name": "_endDate",
              "type": "uint64"
            },
            {
              "internalType": "enum ITokenMajorityVoting.VoteOption",
              "name": "_voteOption",
              "type": "uint8"
            },
            {
              "internalType": "bool",
              "name": "_tryEarlyExecution",
              "type": "bool"
            },
            {
              "internalType": "uint256",
              "name": "_tokenId",
              "type": "uint256"
            }
          ],
          "name": "createProposal",
          "outputs": [
            {
              "internalType": "uint256",
              "name": "proposalId",
              "type": "uint256"
            }
          ],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "dao",
          "outputs": [
            {
              "internalType": "contract IDAO",
              "name": "",
              "type": "address"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "uint256",
              "name": "_proposalId",
              "type": "uint256"
            }
          ],
          "name": "execute",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "uint256",
              "name": "_proposalId",
              "type": "uint256"
            }
          ],
          "name": "getProposal",
          "outputs": [
            {
              "internalType": "bool",
              "name": "open",
              "type": "bool"
            },
            {
              "internalType": "bool",
              "name": "executed",
              "type": "bool"
            },
            {
              "components": [
                {
                  "internalType": "enum TokenMajorityVotingBase.VotingMode",
                  "name": "votingMode",
                  "type": "uint8"
                },
                {
                  "internalType": "uint32",
                  "name": "supportThreshold",
                  "type": "uint32"
                },
                {
                  "internalType": "uint64",
                  "name": "startDate",
                  "type": "uint64"
                },
                {
                  "internalType": "uint64",
                  "name": "endDate",
                  "type": "uint64"
                },
                {
                  "internalType": "uint64",
                  "name": "snapshotBlock",
                  "type": "uint64"
                },
                {
                  "internalType": "uint256",
                  "name": "minVotingPower",
                  "type": "uint256"
                }
              ],
              "internalType": "struct TokenMajorityVotingBase.ProposalParameters",
              "name": "parameters",
              "type": "tuple"
            },
            {
              "components": [
                {
                  "internalType": "uint256",
                  "name": "abstain",
                  "type": "uint256"
                },
                {
                  "internalType": "uint256",
                  "name": "yes",
                  "type": "uint256"
                },
                {
                  "internalType": "uint256",
                  "name": "no",
                  "type": "uint256"
                }
              ],
              "internalType": "struct TokenMajorityVotingBase.Tally",
              "name": "tally",
              "type": "tuple"
            },
            {
              "components": [
                {
                  "internalType": "address",
                  "name": "to",
                  "type": "address"
                },
                {
                  "internalType": "uint256",
                  "name": "value",
                  "type": "uint256"
                },
                {
                  "internalType": "bytes",
                  "name": "data",
                  "type": "bytes"
                }
              ],
              "internalType": "struct IDAO.Action[]",
              "name": "actions",
              "type": "tuple[]"
            },
            {
              "internalType": "uint256",
              "name": "allowFailureMap",
              "type": "uint256"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "uint256",
              "name": "_proposalId",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "_account",
              "type": "uint256"
            }
          ],
          "name": "getVoteOption",
          "outputs": [
            {
              "internalType": "enum ITokenMajorityVoting.VoteOption",
              "name": "",
              "type": "uint8"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "implementation",
          "outputs": [
            {
              "internalType": "address",
              "name": "",
              "type": "address"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "contract IDAO",
              "name": "_dao",
              "type": "address"
            },
            {
              "components": [
                {
                  "internalType": "enum TokenMajorityVotingBase.VotingMode",
                  "name": "votingMode",
                  "type": "uint8"
                },
                {
                  "internalType": "uint32",
                  "name": "supportThreshold",
                  "type": "uint32"
                },
                {
                  "internalType": "uint32",
                  "name": "minParticipation",
                  "type": "uint32"
                },
                {
                  "internalType": "uint64",
                  "name": "minDuration",
                  "type": "uint64"
                },
                {
                  "internalType": "uint256",
                  "name": "minProposerVotingPower",
                  "type": "uint256"
                }
              ],
              "internalType": "struct TokenMajorityVotingBase.VotingSettings",
              "name": "_votingSettings",
              "type": "tuple"
            },
            {
              "internalType": "contract IERC721",
              "name": "_tokenCollection",
              "type": "address"
            },
            {
              "internalType": "uint256[]",
              "name": "_members",
              "type": "uint256[]"
            }
          ],
          "name": "initialize",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "uint256",
              "name": "_tokenId",
              "type": "uint256"
            }
          ],
          "name": "isListed",
          "outputs": [
            {
              "internalType": "bool",
              "name": "",
              "type": "bool"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "uint256",
              "name": "_tokenId",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "_blockNumber",
              "type": "uint256"
            }
          ],
          "name": "isListedAtBlock",
          "outputs": [
            {
              "internalType": "bool",
              "name": "",
              "type": "bool"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "uint256",
              "name": "_account",
              "type": "uint256"
            }
          ],
          "name": "isMember",
          "outputs": [
            {
              "internalType": "bool",
              "name": "",
              "type": "bool"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "uint256",
              "name": "_proposalId",
              "type": "uint256"
            }
          ],
          "name": "isMinParticipationReached",
          "outputs": [
            {
              "internalType": "bool",
              "name": "",
              "type": "bool"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "uint256",
              "name": "_proposalId",
              "type": "uint256"
            }
          ],
          "name": "isSupportThresholdReached",
          "outputs": [
            {
              "internalType": "bool",
              "name": "",
              "type": "bool"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "uint256",
              "name": "_proposalId",
              "type": "uint256"
            }
          ],
          "name": "isSupportThresholdReachedEarly",
          "outputs": [
            {
              "internalType": "bool",
              "name": "",
              "type": "bool"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "minDuration",
          "outputs": [
            {
              "internalType": "uint64",
              "name": "",
              "type": "uint64"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "minParticipation",
          "outputs": [
            {
              "internalType": "uint32",
              "name": "",
              "type": "uint32"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "minProposerVotingPower",
          "outputs": [
            {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "pluginType",
          "outputs": [
            {
              "internalType": "enum IPlugin.PluginType",
              "name": "",
              "type": "uint8"
            }
          ],
          "stateMutability": "pure",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "proposalCount",
          "outputs": [
            {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "proxiableUUID",
          "outputs": [
            {
              "internalType": "bytes32",
              "name": "",
              "type": "bytes32"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "uint256[]",
              "name": "_members",
              "type": "uint256[]"
            }
          ],
          "name": "removeMembers",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "supportThreshold",
          "outputs": [
            {
              "internalType": "uint32",
              "name": "",
              "type": "uint32"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "bytes4",
              "name": "_interfaceId",
              "type": "bytes4"
            }
          ],
          "name": "supportsInterface",
          "outputs": [
            {
              "internalType": "bool",
              "name": "",
              "type": "bool"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "tokenlistLength",
          "outputs": [
            {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "uint256",
              "name": "_blockNumber",
              "type": "uint256"
            }
          ],
          "name": "tokenlistLengthAtBlock",
          "outputs": [
            {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "uint256",
              "name": "_blockNumber",
              "type": "uint256"
            }
          ],
          "name": "totalVotingPower",
          "outputs": [
            {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "components": [
                {
                  "internalType": "enum TokenMajorityVotingBase.VotingMode",
                  "name": "votingMode",
                  "type": "uint8"
                },
                {
                  "internalType": "uint32",
                  "name": "supportThreshold",
                  "type": "uint32"
                },
                {
                  "internalType": "uint32",
                  "name": "minParticipation",
                  "type": "uint32"
                },
                {
                  "internalType": "uint64",
                  "name": "minDuration",
                  "type": "uint64"
                },
                {
                  "internalType": "uint256",
                  "name": "minProposerVotingPower",
                  "type": "uint256"
                }
              ],
              "internalType": "struct TokenMajorityVotingBase.VotingSettings",
              "name": "_votingSettings",
              "type": "tuple"
            }
          ],
          "name": "updateVotingSettings",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "newImplementation",
              "type": "address"
            }
          ],
          "name": "upgradeTo",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "newImplementation",
              "type": "address"
            },
            {
              "internalType": "bytes",
              "name": "data",
              "type": "bytes"
            }
          ],
          "name": "upgradeToAndCall",
          "outputs": [],
          "stateMutability": "payable",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "uint256",
              "name": "_proposalId",
              "type": "uint256"
            },
            {
              "internalType": "enum ITokenMajorityVoting.VoteOption",
              "name": "_voteOption",
              "type": "uint8"
            },
            {
              "internalType": "bool",
              "name": "_tryEarlyExecution",
              "type": "bool"
            },
            {
              "internalType": "uint256",
              "name": "_tokenId",
              "type": "uint256"
            }
          ],
          "name": "vote",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "votingMode",
          "outputs": [
            {
              "internalType": "enum TokenMajorityVotingBase.VotingMode",
              "name": "",
              "type": "uint8"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        }
      ]
    },
    "TokenListGovernanceRepo": {
      "address": "0xE70A88f0688522E0d3003399Db6881158546C689",
      "abi": [
        {
          "inputs": [],
          "stateMutability": "nonpayable",
          "type": "constructor"
        },
        {
          "inputs": [],
          "name": "AnyAddressDisallowedForWhoAndWhere",
          "type": "error"
        },
        {
          "inputs": [
            {
              "internalType": "contract IPermissionCondition",
              "name": "condition",
              "type": "address"
            }
          ],
          "name": "ConditionInterfacNotSupported",
          "type": "error"
        },
        {
          "inputs": [
            {
              "internalType": "contract IPermissionCondition",
              "name": "condition",
              "type": "address"
            }
          ],
          "name": "ConditionNotAContract",
          "type": "error"
        },
        {
          "inputs": [],
          "name": "EmptyReleaseMetadata",
          "type": "error"
        },
        {
          "inputs": [],
          "name": "GrantWithConditionNotSupported",
          "type": "error"
        },
        {
          "inputs": [],
          "name": "InvalidPluginSetupInterface",
          "type": "error"
        },
        {
          "inputs": [
            {
              "internalType": "uint8",
              "name": "latestRelease",
              "type": "uint8"
            },
            {
              "internalType": "uint8",
              "name": "newRelease",
              "type": "uint8"
            }
          ],
          "name": "InvalidReleaseIncrement",
          "type": "error"
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "where",
              "type": "address"
            },
            {
              "internalType": "address",
              "name": "who",
              "type": "address"
            },
            {
              "internalType": "bytes32",
              "name": "permissionId",
              "type": "bytes32"
            },
            {
              "internalType": "address",
              "name": "currentCondition",
              "type": "address"
            },
            {
              "internalType": "address",
              "name": "newCondition",
              "type": "address"
            }
          ],
          "name": "PermissionAlreadyGrantedForDifferentCondition",
          "type": "error"
        },
        {
          "inputs": [],
          "name": "PermissionsForAnyAddressDisallowed",
          "type": "error"
        },
        {
          "inputs": [
            {
              "internalType": "uint8",
              "name": "release",
              "type": "uint8"
            },
            {
              "internalType": "uint16",
              "name": "build",
              "type": "uint16"
            },
            {
              "internalType": "address",
              "name": "pluginSetup",
              "type": "address"
            }
          ],
          "name": "PluginSetupAlreadyInPreviousRelease",
          "type": "error"
        },
        {
          "inputs": [],
          "name": "ReleaseDoesNotExist",
          "type": "error"
        },
        {
          "inputs": [],
          "name": "ReleaseZeroNotAllowed",
          "type": "error"
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "where",
              "type": "address"
            },
            {
              "internalType": "address",
              "name": "who",
              "type": "address"
            },
            {
              "internalType": "bytes32",
              "name": "permissionId",
              "type": "bytes32"
            }
          ],
          "name": "Unauthorized",
          "type": "error"
        },
        {
          "inputs": [
            {
              "internalType": "bytes32",
              "name": "versionHash",
              "type": "bytes32"
            }
          ],
          "name": "VersionHashDoesNotExist",
          "type": "error"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": false,
              "internalType": "address",
              "name": "previousAdmin",
              "type": "address"
            },
            {
              "indexed": false,
              "internalType": "address",
              "name": "newAdmin",
              "type": "address"
            }
          ],
          "name": "AdminChanged",
          "type": "event"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": true,
              "internalType": "address",
              "name": "beacon",
              "type": "address"
            }
          ],
          "name": "BeaconUpgraded",
          "type": "event"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": true,
              "internalType": "bytes32",
              "name": "permissionId",
              "type": "bytes32"
            },
            {
              "indexed": true,
              "internalType": "address",
              "name": "here",
              "type": "address"
            },
            {
              "indexed": false,
              "internalType": "address",
              "name": "where",
              "type": "address"
            },
            {
              "indexed": true,
              "internalType": "address",
              "name": "who",
              "type": "address"
            },
            {
              "indexed": false,
              "internalType": "address",
              "name": "condition",
              "type": "address"
            }
          ],
          "name": "Granted",
          "type": "event"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": false,
              "internalType": "uint8",
              "name": "version",
              "type": "uint8"
            }
          ],
          "name": "Initialized",
          "type": "event"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": false,
              "internalType": "uint8",
              "name": "release",
              "type": "uint8"
            },
            {
              "indexed": false,
              "internalType": "bytes",
              "name": "releaseMetadata",
              "type": "bytes"
            }
          ],
          "name": "ReleaseMetadataUpdated",
          "type": "event"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": true,
              "internalType": "bytes32",
              "name": "permissionId",
              "type": "bytes32"
            },
            {
              "indexed": true,
              "internalType": "address",
              "name": "here",
              "type": "address"
            },
            {
              "indexed": false,
              "internalType": "address",
              "name": "where",
              "type": "address"
            },
            {
              "indexed": true,
              "internalType": "address",
              "name": "who",
              "type": "address"
            }
          ],
          "name": "Revoked",
          "type": "event"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": true,
              "internalType": "address",
              "name": "implementation",
              "type": "address"
            }
          ],
          "name": "Upgraded",
          "type": "event"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": false,
              "internalType": "uint8",
              "name": "release",
              "type": "uint8"
            },
            {
              "indexed": false,
              "internalType": "uint16",
              "name": "build",
              "type": "uint16"
            },
            {
              "indexed": true,
              "internalType": "address",
              "name": "pluginSetup",
              "type": "address"
            },
            {
              "indexed": false,
              "internalType": "bytes",
              "name": "buildMetadata",
              "type": "bytes"
            }
          ],
          "name": "VersionCreated",
          "type": "event"
        },
        {
          "inputs": [],
          "name": "MAINTAINER_PERMISSION_ID",
          "outputs": [
            {
              "internalType": "bytes32",
              "name": "",
              "type": "bytes32"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "ROOT_PERMISSION_ID",
          "outputs": [
            {
              "internalType": "bytes32",
              "name": "",
              "type": "bytes32"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "UPGRADE_REPO_PERMISSION_ID",
          "outputs": [
            {
              "internalType": "bytes32",
              "name": "",
              "type": "bytes32"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "components": [
                {
                  "internalType": "enum PermissionLib.Operation",
                  "name": "operation",
                  "type": "uint8"
                },
                {
                  "internalType": "address",
                  "name": "where",
                  "type": "address"
                },
                {
                  "internalType": "address",
                  "name": "who",
                  "type": "address"
                },
                {
                  "internalType": "address",
                  "name": "condition",
                  "type": "address"
                },
                {
                  "internalType": "bytes32",
                  "name": "permissionId",
                  "type": "bytes32"
                }
              ],
              "internalType": "struct PermissionLib.MultiTargetPermission[]",
              "name": "_items",
              "type": "tuple[]"
            }
          ],
          "name": "applyMultiTargetPermissions",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "_where",
              "type": "address"
            },
            {
              "components": [
                {
                  "internalType": "enum PermissionLib.Operation",
                  "name": "operation",
                  "type": "uint8"
                },
                {
                  "internalType": "address",
                  "name": "who",
                  "type": "address"
                },
                {
                  "internalType": "bytes32",
                  "name": "permissionId",
                  "type": "bytes32"
                }
              ],
              "internalType": "struct PermissionLib.SingleTargetPermission[]",
              "name": "items",
              "type": "tuple[]"
            }
          ],
          "name": "applySingleTargetPermissions",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "uint8",
              "name": "_release",
              "type": "uint8"
            }
          ],
          "name": "buildCount",
          "outputs": [
            {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "uint8",
              "name": "_release",
              "type": "uint8"
            },
            {
              "internalType": "address",
              "name": "_pluginSetup",
              "type": "address"
            },
            {
              "internalType": "bytes",
              "name": "_buildMetadata",
              "type": "bytes"
            },
            {
              "internalType": "bytes",
              "name": "_releaseMetadata",
              "type": "bytes"
            }
          ],
          "name": "createVersion",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "_pluginSetup",
              "type": "address"
            }
          ],
          "name": "getLatestVersion",
          "outputs": [
            {
              "components": [
                {
                  "components": [
                    {
                      "internalType": "uint8",
                      "name": "release",
                      "type": "uint8"
                    },
                    {
                      "internalType": "uint16",
                      "name": "build",
                      "type": "uint16"
                    }
                  ],
                  "internalType": "struct PluginRepo.Tag",
                  "name": "tag",
                  "type": "tuple"
                },
                {
                  "internalType": "address",
                  "name": "pluginSetup",
                  "type": "address"
                },
                {
                  "internalType": "bytes",
                  "name": "buildMetadata",
                  "type": "bytes"
                }
              ],
              "internalType": "struct PluginRepo.Version",
              "name": "",
              "type": "tuple"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "uint8",
              "name": "_release",
              "type": "uint8"
            }
          ],
          "name": "getLatestVersion",
          "outputs": [
            {
              "components": [
                {
                  "components": [
                    {
                      "internalType": "uint8",
                      "name": "release",
                      "type": "uint8"
                    },
                    {
                      "internalType": "uint16",
                      "name": "build",
                      "type": "uint16"
                    }
                  ],
                  "internalType": "struct PluginRepo.Tag",
                  "name": "tag",
                  "type": "tuple"
                },
                {
                  "internalType": "address",
                  "name": "pluginSetup",
                  "type": "address"
                },
                {
                  "internalType": "bytes",
                  "name": "buildMetadata",
                  "type": "bytes"
                }
              ],
              "internalType": "struct PluginRepo.Version",
              "name": "",
              "type": "tuple"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "bytes32",
              "name": "_tagHash",
              "type": "bytes32"
            }
          ],
          "name": "getVersion",
          "outputs": [
            {
              "components": [
                {
                  "components": [
                    {
                      "internalType": "uint8",
                      "name": "release",
                      "type": "uint8"
                    },
                    {
                      "internalType": "uint16",
                      "name": "build",
                      "type": "uint16"
                    }
                  ],
                  "internalType": "struct PluginRepo.Tag",
                  "name": "tag",
                  "type": "tuple"
                },
                {
                  "internalType": "address",
                  "name": "pluginSetup",
                  "type": "address"
                },
                {
                  "internalType": "bytes",
                  "name": "buildMetadata",
                  "type": "bytes"
                }
              ],
              "internalType": "struct PluginRepo.Version",
              "name": "",
              "type": "tuple"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "components": [
                {
                  "internalType": "uint8",
                  "name": "release",
                  "type": "uint8"
                },
                {
                  "internalType": "uint16",
                  "name": "build",
                  "type": "uint16"
                }
              ],
              "internalType": "struct PluginRepo.Tag",
              "name": "_tag",
              "type": "tuple"
            }
          ],
          "name": "getVersion",
          "outputs": [
            {
              "components": [
                {
                  "components": [
                    {
                      "internalType": "uint8",
                      "name": "release",
                      "type": "uint8"
                    },
                    {
                      "internalType": "uint16",
                      "name": "build",
                      "type": "uint16"
                    }
                  ],
                  "internalType": "struct PluginRepo.Tag",
                  "name": "tag",
                  "type": "tuple"
                },
                {
                  "internalType": "address",
                  "name": "pluginSetup",
                  "type": "address"
                },
                {
                  "internalType": "bytes",
                  "name": "buildMetadata",
                  "type": "bytes"
                }
              ],
              "internalType": "struct PluginRepo.Version",
              "name": "",
              "type": "tuple"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "_where",
              "type": "address"
            },
            {
              "internalType": "address",
              "name": "_who",
              "type": "address"
            },
            {
              "internalType": "bytes32",
              "name": "_permissionId",
              "type": "bytes32"
            }
          ],
          "name": "grant",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "_where",
              "type": "address"
            },
            {
              "internalType": "address",
              "name": "_who",
              "type": "address"
            },
            {
              "internalType": "bytes32",
              "name": "_permissionId",
              "type": "bytes32"
            },
            {
              "internalType": "contract IPermissionCondition",
              "name": "_condition",
              "type": "address"
            }
          ],
          "name": "grantWithCondition",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "initialOwner",
              "type": "address"
            }
          ],
          "name": "initialize",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "_where",
              "type": "address"
            },
            {
              "internalType": "address",
              "name": "_who",
              "type": "address"
            },
            {
              "internalType": "bytes32",
              "name": "_permissionId",
              "type": "bytes32"
            },
            {
              "internalType": "bytes",
              "name": "_data",
              "type": "bytes"
            }
          ],
          "name": "isGranted",
          "outputs": [
            {
              "internalType": "bool",
              "name": "",
              "type": "bool"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "latestRelease",
          "outputs": [
            {
              "internalType": "uint8",
              "name": "",
              "type": "uint8"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "protocolVersion",
          "outputs": [
            {
              "internalType": "uint8[3]",
              "name": "",
              "type": "uint8[3]"
            }
          ],
          "stateMutability": "pure",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "proxiableUUID",
          "outputs": [
            {
              "internalType": "bytes32",
              "name": "",
              "type": "bytes32"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "_where",
              "type": "address"
            },
            {
              "internalType": "address",
              "name": "_who",
              "type": "address"
            },
            {
              "internalType": "bytes32",
              "name": "_permissionId",
              "type": "bytes32"
            }
          ],
          "name": "revoke",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "bytes4",
              "name": "_interfaceId",
              "type": "bytes4"
            }
          ],
          "name": "supportsInterface",
          "outputs": [
            {
              "internalType": "bool",
              "name": "",
              "type": "bool"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "uint8",
              "name": "_release",
              "type": "uint8"
            },
            {
              "internalType": "bytes",
              "name": "_releaseMetadata",
              "type": "bytes"
            }
          ],
          "name": "updateReleaseMetadata",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "newImplementation",
              "type": "address"
            }
          ],
          "name": "upgradeTo",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "newImplementation",
              "type": "address"
            },
            {
              "internalType": "bytes",
              "name": "data",
              "type": "bytes"
            }
          ],
          "name": "upgradeToAndCall",
          "outputs": [],
          "stateMutability": "payable",
          "type": "function"
        }
      ]
    },
    "TokenListGovernanceSetup": {
      "address": "0xaC286A39972CF8572e9a4D00fcfF4A479B1ADb90",
      "abi": [
        {
          "inputs": [],
          "stateMutability": "nonpayable",
          "type": "constructor"
        },
        {
          "inputs": [],
          "name": "implementation",
          "outputs": [
            {
              "internalType": "address",
              "name": "",
              "type": "address"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "_dao",
              "type": "address"
            },
            {
              "internalType": "bytes",
              "name": "_data",
              "type": "bytes"
            }
          ],
          "name": "prepareInstallation",
          "outputs": [
            {
              "internalType": "address",
              "name": "plugin",
              "type": "address"
            },
            {
              "components": [
                {
                  "internalType": "address[]",
                  "name": "helpers",
                  "type": "address[]"
                },
                {
                  "components": [
                    {
                      "internalType": "enum PermissionLib.Operation",
                      "name": "operation",
                      "type": "uint8"
                    },
                    {
                      "internalType": "address",
                      "name": "where",
                      "type": "address"
                    },
                    {
                      "internalType": "address",
                      "name": "who",
                      "type": "address"
                    },
                    {
                      "internalType": "address",
                      "name": "condition",
                      "type": "address"
                    },
                    {
                      "internalType": "bytes32",
                      "name": "permissionId",
                      "type": "bytes32"
                    }
                  ],
                  "internalType": "struct PermissionLib.MultiTargetPermission[]",
                  "name": "permissions",
                  "type": "tuple[]"
                }
              ],
              "internalType": "struct IPluginSetup.PreparedSetupData",
              "name": "preparedSetupData",
              "type": "tuple"
            }
          ],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "_dao",
              "type": "address"
            },
            {
              "components": [
                {
                  "internalType": "address",
                  "name": "plugin",
                  "type": "address"
                },
                {
                  "internalType": "address[]",
                  "name": "currentHelpers",
                  "type": "address[]"
                },
                {
                  "internalType": "bytes",
                  "name": "data",
                  "type": "bytes"
                }
              ],
              "internalType": "struct IPluginSetup.SetupPayload",
              "name": "_payload",
              "type": "tuple"
            }
          ],
          "name": "prepareUninstallation",
          "outputs": [
            {
              "components": [
                {
                  "internalType": "enum PermissionLib.Operation",
                  "name": "operation",
                  "type": "uint8"
                },
                {
                  "internalType": "address",
                  "name": "where",
                  "type": "address"
                },
                {
                  "internalType": "address",
                  "name": "who",
                  "type": "address"
                },
                {
                  "internalType": "address",
                  "name": "condition",
                  "type": "address"
                },
                {
                  "internalType": "bytes32",
                  "name": "permissionId",
                  "type": "bytes32"
                }
              ],
              "internalType": "struct PermissionLib.MultiTargetPermission[]",
              "name": "permissions",
              "type": "tuple[]"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "_dao",
              "type": "address"
            },
            {
              "internalType": "uint16",
              "name": "_currentBuild",
              "type": "uint16"
            },
            {
              "components": [
                {
                  "internalType": "address",
                  "name": "plugin",
                  "type": "address"
                },
                {
                  "internalType": "address[]",
                  "name": "currentHelpers",
                  "type": "address[]"
                },
                {
                  "internalType": "bytes",
                  "name": "data",
                  "type": "bytes"
                }
              ],
              "internalType": "struct IPluginSetup.SetupPayload",
              "name": "_payload",
              "type": "tuple"
            }
          ],
          "name": "prepareUpdate",
          "outputs": [
            {
              "internalType": "bytes",
              "name": "initData",
              "type": "bytes"
            },
            {
              "components": [
                {
                  "internalType": "address[]",
                  "name": "helpers",
                  "type": "address[]"
                },
                {
                  "components": [
                    {
                      "internalType": "enum PermissionLib.Operation",
                      "name": "operation",
                      "type": "uint8"
                    },
                    {
                      "internalType": "address",
                      "name": "where",
                      "type": "address"
                    },
                    {
                      "internalType": "address",
                      "name": "who",
                      "type": "address"
                    },
                    {
                      "internalType": "address",
                      "name": "condition",
                      "type": "address"
                    },
                    {
                      "internalType": "bytes32",
                      "name": "permissionId",
                      "type": "bytes32"
                    }
                  ],
                  "internalType": "struct PermissionLib.MultiTargetPermission[]",
                  "name": "permissions",
                  "type": "tuple[]"
                }
              ],
              "internalType": "struct IPluginSetup.PreparedSetupData",
              "name": "preparedSetupData",
              "type": "tuple"
            }
          ],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "bytes4",
              "name": "_interfaceId",
              "type": "bytes4"
            }
          ],
          "name": "supportsInterface",
          "outputs": [
            {
              "internalType": "bool",
              "name": "",
              "type": "bool"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        }
      ]
    },
    "blockchain_dao": {
      "address": "0x22909D2EEE19B5Edf36B41f585cD19a16EAa6Fb7",
      "abi": [
        {
          "inputs": [],
          "stateMutability": "nonpayable",
          "type": "constructor"
        },
        {
          "inputs": [
            {
              "internalType": "uint256",
              "name": "index",
              "type": "uint256"
            }
          ],
          "name": "ActionFailed",
          "type": "error"
        },
        {
          "inputs": [],
          "name": "AnyAddressDisallowedForWhoAndWhere",
          "type": "error"
        },
        {
          "inputs": [
            {
              "internalType": "contract IPermissionCondition",
              "name": "condition",
              "type": "address"
            }
          ],
          "name": "ConditionInterfacNotSupported",
          "type": "error"
        },
        {
          "inputs": [
            {
              "internalType": "contract IPermissionCondition",
              "name": "condition",
              "type": "address"
            }
          ],
          "name": "ConditionNotAContract",
          "type": "error"
        },
        {
          "inputs": [],
          "name": "GrantWithConditionNotSupported",
          "type": "error"
        },
        {
          "inputs": [],
          "name": "InsufficientGas",
          "type": "error"
        },
        {
          "inputs": [
            {
              "internalType": "uint256",
              "name": "expected",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "actual",
              "type": "uint256"
            }
          ],
          "name": "NativeTokenDepositAmountMismatch",
          "type": "error"
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "where",
              "type": "address"
            },
            {
              "internalType": "address",
              "name": "who",
              "type": "address"
            },
            {
              "internalType": "bytes32",
              "name": "permissionId",
              "type": "bytes32"
            },
            {
              "internalType": "address",
              "name": "currentCondition",
              "type": "address"
            },
            {
              "internalType": "address",
              "name": "newCondition",
              "type": "address"
            }
          ],
          "name": "PermissionAlreadyGrantedForDifferentCondition",
          "type": "error"
        },
        {
          "inputs": [],
          "name": "PermissionsForAnyAddressDisallowed",
          "type": "error"
        },
        {
          "inputs": [
            {
              "internalType": "uint8[3]",
              "name": "protocolVersion",
              "type": "uint8[3]"
            }
          ],
          "name": "ProtocolVersionUpgradeNotSupported",
          "type": "error"
        },
        {
          "inputs": [],
          "name": "ReentrantCall",
          "type": "error"
        },
        {
          "inputs": [],
          "name": "TooManyActions",
          "type": "error"
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "where",
              "type": "address"
            },
            {
              "internalType": "address",
              "name": "who",
              "type": "address"
            },
            {
              "internalType": "bytes32",
              "name": "permissionId",
              "type": "bytes32"
            }
          ],
          "name": "Unauthorized",
          "type": "error"
        },
        {
          "inputs": [
            {
              "internalType": "bytes4",
              "name": "callbackSelector",
              "type": "bytes4"
            },
            {
              "internalType": "bytes4",
              "name": "magicNumber",
              "type": "bytes4"
            }
          ],
          "name": "UnkownCallback",
          "type": "error"
        },
        {
          "inputs": [],
          "name": "ZeroAmount",
          "type": "error"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": false,
              "internalType": "address",
              "name": "previousAdmin",
              "type": "address"
            },
            {
              "indexed": false,
              "internalType": "address",
              "name": "newAdmin",
              "type": "address"
            }
          ],
          "name": "AdminChanged",
          "type": "event"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": true,
              "internalType": "address",
              "name": "beacon",
              "type": "address"
            }
          ],
          "name": "BeaconUpgraded",
          "type": "event"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": false,
              "internalType": "address",
              "name": "sender",
              "type": "address"
            },
            {
              "indexed": true,
              "internalType": "bytes4",
              "name": "sig",
              "type": "bytes4"
            },
            {
              "indexed": false,
              "internalType": "bytes",
              "name": "data",
              "type": "bytes"
            }
          ],
          "name": "CallbackReceived",
          "type": "event"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": true,
              "internalType": "address",
              "name": "sender",
              "type": "address"
            },
            {
              "indexed": true,
              "internalType": "address",
              "name": "token",
              "type": "address"
            },
            {
              "indexed": false,
              "internalType": "uint256",
              "name": "amount",
              "type": "uint256"
            },
            {
              "indexed": false,
              "internalType": "string",
              "name": "_reference",
              "type": "string"
            }
          ],
          "name": "Deposited",
          "type": "event"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": true,
              "internalType": "address",
              "name": "actor",
              "type": "address"
            },
            {
              "indexed": false,
              "internalType": "bytes32",
              "name": "callId",
              "type": "bytes32"
            },
            {
              "components": [
                {
                  "internalType": "address",
                  "name": "to",
                  "type": "address"
                },
                {
                  "internalType": "uint256",
                  "name": "value",
                  "type": "uint256"
                },
                {
                  "internalType": "bytes",
                  "name": "data",
                  "type": "bytes"
                }
              ],
              "indexed": false,
              "internalType": "struct IDAO.Action[]",
              "name": "actions",
              "type": "tuple[]"
            },
            {
              "indexed": false,
              "internalType": "uint256",
              "name": "allowFailureMap",
              "type": "uint256"
            },
            {
              "indexed": false,
              "internalType": "uint256",
              "name": "failureMap",
              "type": "uint256"
            },
            {
              "indexed": false,
              "internalType": "bytes[]",
              "name": "execResults",
              "type": "bytes[]"
            }
          ],
          "name": "Executed",
          "type": "event"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": true,
              "internalType": "bytes32",
              "name": "permissionId",
              "type": "bytes32"
            },
            {
              "indexed": true,
              "internalType": "address",
              "name": "here",
              "type": "address"
            },
            {
              "indexed": false,
              "internalType": "address",
              "name": "where",
              "type": "address"
            },
            {
              "indexed": true,
              "internalType": "address",
              "name": "who",
              "type": "address"
            },
            {
              "indexed": false,
              "internalType": "address",
              "name": "condition",
              "type": "address"
            }
          ],
          "name": "Granted",
          "type": "event"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": false,
              "internalType": "uint8",
              "name": "version",
              "type": "uint8"
            }
          ],
          "name": "Initialized",
          "type": "event"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": false,
              "internalType": "bytes",
              "name": "metadata",
              "type": "bytes"
            }
          ],
          "name": "MetadataSet",
          "type": "event"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": false,
              "internalType": "address",
              "name": "sender",
              "type": "address"
            },
            {
              "indexed": false,
              "internalType": "uint256",
              "name": "amount",
              "type": "uint256"
            }
          ],
          "name": "NativeTokenDeposited",
          "type": "event"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": false,
              "internalType": "string",
              "name": "daoURI",
              "type": "string"
            }
          ],
          "name": "NewURI",
          "type": "event"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": true,
              "internalType": "bytes32",
              "name": "permissionId",
              "type": "bytes32"
            },
            {
              "indexed": true,
              "internalType": "address",
              "name": "here",
              "type": "address"
            },
            {
              "indexed": false,
              "internalType": "address",
              "name": "where",
              "type": "address"
            },
            {
              "indexed": true,
              "internalType": "address",
              "name": "who",
              "type": "address"
            }
          ],
          "name": "Revoked",
          "type": "event"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": false,
              "internalType": "address",
              "name": "signatureValidator",
              "type": "address"
            }
          ],
          "name": "SignatureValidatorSet",
          "type": "event"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": false,
              "internalType": "bytes4",
              "name": "interfaceId",
              "type": "bytes4"
            },
            {
              "indexed": false,
              "internalType": "bytes4",
              "name": "callbackSelector",
              "type": "bytes4"
            },
            {
              "indexed": false,
              "internalType": "bytes4",
              "name": "magicNumber",
              "type": "bytes4"
            }
          ],
          "name": "StandardCallbackRegistered",
          "type": "event"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": false,
              "internalType": "address",
              "name": "forwarder",
              "type": "address"
            }
          ],
          "name": "TrustedForwarderSet",
          "type": "event"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": true,
              "internalType": "address",
              "name": "implementation",
              "type": "address"
            }
          ],
          "name": "Upgraded",
          "type": "event"
        },
        {
          "stateMutability": "nonpayable",
          "type": "fallback"
        },
        {
          "inputs": [],
          "name": "EXECUTE_PERMISSION_ID",
          "outputs": [
            {
              "internalType": "bytes32",
              "name": "",
              "type": "bytes32"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "REGISTER_STANDARD_CALLBACK_PERMISSION_ID",
          "outputs": [
            {
              "internalType": "bytes32",
              "name": "",
              "type": "bytes32"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "ROOT_PERMISSION_ID",
          "outputs": [
            {
              "internalType": "bytes32",
              "name": "",
              "type": "bytes32"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "SET_METADATA_PERMISSION_ID",
          "outputs": [
            {
              "internalType": "bytes32",
              "name": "",
              "type": "bytes32"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "SET_SIGNATURE_VALIDATOR_PERMISSION_ID",
          "outputs": [
            {
              "internalType": "bytes32",
              "name": "",
              "type": "bytes32"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "SET_TRUSTED_FORWARDER_PERMISSION_ID",
          "outputs": [
            {
              "internalType": "bytes32",
              "name": "",
              "type": "bytes32"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "UPGRADE_DAO_PERMISSION_ID",
          "outputs": [
            {
              "internalType": "bytes32",
              "name": "",
              "type": "bytes32"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "components": [
                {
                  "internalType": "enum PermissionLib.Operation",
                  "name": "operation",
                  "type": "uint8"
                },
                {
                  "internalType": "address",
                  "name": "where",
                  "type": "address"
                },
                {
                  "internalType": "address",
                  "name": "who",
                  "type": "address"
                },
                {
                  "internalType": "address",
                  "name": "condition",
                  "type": "address"
                },
                {
                  "internalType": "bytes32",
                  "name": "permissionId",
                  "type": "bytes32"
                }
              ],
              "internalType": "struct PermissionLib.MultiTargetPermission[]",
              "name": "_items",
              "type": "tuple[]"
            }
          ],
          "name": "applyMultiTargetPermissions",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "_where",
              "type": "address"
            },
            {
              "components": [
                {
                  "internalType": "enum PermissionLib.Operation",
                  "name": "operation",
                  "type": "uint8"
                },
                {
                  "internalType": "address",
                  "name": "who",
                  "type": "address"
                },
                {
                  "internalType": "bytes32",
                  "name": "permissionId",
                  "type": "bytes32"
                }
              ],
              "internalType": "struct PermissionLib.SingleTargetPermission[]",
              "name": "items",
              "type": "tuple[]"
            }
          ],
          "name": "applySingleTargetPermissions",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "daoURI",
          "outputs": [
            {
              "internalType": "string",
              "name": "",
              "type": "string"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "_token",
              "type": "address"
            },
            {
              "internalType": "uint256",
              "name": "_amount",
              "type": "uint256"
            },
            {
              "internalType": "string",
              "name": "_reference",
              "type": "string"
            }
          ],
          "name": "deposit",
          "outputs": [],
          "stateMutability": "payable",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "bytes32",
              "name": "_callId",
              "type": "bytes32"
            },
            {
              "components": [
                {
                  "internalType": "address",
                  "name": "to",
                  "type": "address"
                },
                {
                  "internalType": "uint256",
                  "name": "value",
                  "type": "uint256"
                },
                {
                  "internalType": "bytes",
                  "name": "data",
                  "type": "bytes"
                }
              ],
              "internalType": "struct IDAO.Action[]",
              "name": "_actions",
              "type": "tuple[]"
            },
            {
              "internalType": "uint256",
              "name": "_allowFailureMap",
              "type": "uint256"
            }
          ],
          "name": "execute",
          "outputs": [
            {
              "internalType": "bytes[]",
              "name": "execResults",
              "type": "bytes[]"
            },
            {
              "internalType": "uint256",
              "name": "failureMap",
              "type": "uint256"
            }
          ],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "getTrustedForwarder",
          "outputs": [
            {
              "internalType": "address",
              "name": "",
              "type": "address"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "_where",
              "type": "address"
            },
            {
              "internalType": "address",
              "name": "_who",
              "type": "address"
            },
            {
              "internalType": "bytes32",
              "name": "_permissionId",
              "type": "bytes32"
            }
          ],
          "name": "grant",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "_where",
              "type": "address"
            },
            {
              "internalType": "address",
              "name": "_who",
              "type": "address"
            },
            {
              "internalType": "bytes32",
              "name": "_permissionId",
              "type": "bytes32"
            },
            {
              "internalType": "contract IPermissionCondition",
              "name": "_condition",
              "type": "address"
            }
          ],
          "name": "grantWithCondition",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "_where",
              "type": "address"
            },
            {
              "internalType": "address",
              "name": "_who",
              "type": "address"
            },
            {
              "internalType": "bytes32",
              "name": "_permissionId",
              "type": "bytes32"
            },
            {
              "internalType": "bytes",
              "name": "_data",
              "type": "bytes"
            }
          ],
          "name": "hasPermission",
          "outputs": [
            {
              "internalType": "bool",
              "name": "",
              "type": "bool"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "bytes",
              "name": "_metadata",
              "type": "bytes"
            },
            {
              "internalType": "address",
              "name": "_initialOwner",
              "type": "address"
            },
            {
              "internalType": "address",
              "name": "_trustedForwarder",
              "type": "address"
            },
            {
              "internalType": "string",
              "name": "daoURI_",
              "type": "string"
            }
          ],
          "name": "initialize",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "uint8[3]",
              "name": "_previousProtocolVersion",
              "type": "uint8[3]"
            },
            {
              "internalType": "bytes",
              "name": "_initData",
              "type": "bytes"
            }
          ],
          "name": "initializeFrom",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "_where",
              "type": "address"
            },
            {
              "internalType": "address",
              "name": "_who",
              "type": "address"
            },
            {
              "internalType": "bytes32",
              "name": "_permissionId",
              "type": "bytes32"
            },
            {
              "internalType": "bytes",
              "name": "_data",
              "type": "bytes"
            }
          ],
          "name": "isGranted",
          "outputs": [
            {
              "internalType": "bool",
              "name": "",
              "type": "bool"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "bytes32",
              "name": "_hash",
              "type": "bytes32"
            },
            {
              "internalType": "bytes",
              "name": "_signature",
              "type": "bytes"
            }
          ],
          "name": "isValidSignature",
          "outputs": [
            {
              "internalType": "bytes4",
              "name": "",
              "type": "bytes4"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "protocolVersion",
          "outputs": [
            {
              "internalType": "uint8[3]",
              "name": "",
              "type": "uint8[3]"
            }
          ],
          "stateMutability": "pure",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "proxiableUUID",
          "outputs": [
            {
              "internalType": "bytes32",
              "name": "",
              "type": "bytes32"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "bytes4",
              "name": "_interfaceId",
              "type": "bytes4"
            },
            {
              "internalType": "bytes4",
              "name": "_callbackSelector",
              "type": "bytes4"
            },
            {
              "internalType": "bytes4",
              "name": "_magicNumber",
              "type": "bytes4"
            }
          ],
          "name": "registerStandardCallback",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "_where",
              "type": "address"
            },
            {
              "internalType": "address",
              "name": "_who",
              "type": "address"
            },
            {
              "internalType": "bytes32",
              "name": "_permissionId",
              "type": "bytes32"
            }
          ],
          "name": "revoke",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "string",
              "name": "newDaoURI",
              "type": "string"
            }
          ],
          "name": "setDaoURI",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "bytes",
              "name": "_metadata",
              "type": "bytes"
            }
          ],
          "name": "setMetadata",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "_signatureValidator",
              "type": "address"
            }
          ],
          "name": "setSignatureValidator",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "_newTrustedForwarder",
              "type": "address"
            }
          ],
          "name": "setTrustedForwarder",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "signatureValidator",
          "outputs": [
            {
              "internalType": "contract IERC1271",
              "name": "",
              "type": "address"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "bytes4",
              "name": "interfaceId",
              "type": "bytes4"
            }
          ],
          "name": "supportsInterface",
          "outputs": [
            {
              "internalType": "bool",
              "name": "",
              "type": "bool"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "newImplementation",
              "type": "address"
            }
          ],
          "name": "upgradeTo",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "newImplementation",
              "type": "address"
            },
            {
              "internalType": "bytes",
              "name": "data",
              "type": "bytes"
            }
          ],
          "name": "upgradeToAndCall",
          "outputs": [],
          "stateMutability": "payable",
          "type": "function"
        },
        {
          "stateMutability": "payable",
          "type": "receive"
        }
      ]
    },
    "blockchain_taskDrafts": {
      "address": "0x0Fb10949eA766156Fe378Da5eDF89d3C7A1E3a6B",
      "abi": [
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "dao",
              "type": "address"
            },
            {
              "internalType": "address",
              "name": "where",
              "type": "address"
            },
            {
              "internalType": "address",
              "name": "who",
              "type": "address"
            },
            {
              "internalType": "bytes32",
              "name": "permissionId",
              "type": "bytes32"
            }
          ],
          "name": "DaoUnauthorized",
          "type": "error"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": false,
              "internalType": "address",
              "name": "previousAdmin",
              "type": "address"
            },
            {
              "indexed": false,
              "internalType": "address",
              "name": "newAdmin",
              "type": "address"
            }
          ],
          "name": "AdminChanged",
          "type": "event"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": true,
              "internalType": "address",
              "name": "beacon",
              "type": "address"
            }
          ],
          "name": "BeaconUpgraded",
          "type": "event"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": false,
              "internalType": "uint8",
              "name": "version",
              "type": "uint8"
            }
          ],
          "name": "Initialized",
          "type": "event"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": false,
              "internalType": "uint256",
              "name": "proposalId",
              "type": "uint256"
            },
            {
              "indexed": false,
              "internalType": "bytes",
              "name": "metadata",
              "type": "bytes"
            },
            {
              "indexed": false,
              "internalType": "uint64",
              "name": "startDate",
              "type": "uint64"
            },
            {
              "indexed": false,
              "internalType": "uint64",
              "name": "endDate",
              "type": "uint64"
            },
            {
              "components": [
                {
                  "internalType": "string",
                  "name": "metadata",
                  "type": "string"
                },
                {
                  "internalType": "uint64",
                  "name": "deadline",
                  "type": "uint64"
                },
                {
                  "components": [
                    {
                      "internalType": "contract IERC20",
                      "name": "tokenContract",
                      "type": "address"
                    },
                    {
                      "internalType": "uint96",
                      "name": "amount",
                      "type": "uint96"
                    }
                  ],
                  "internalType": "struct ITasks.ERC20Transfer[]",
                  "name": "budget",
                  "type": "tuple[]"
                },
                {
                  "internalType": "address",
                  "name": "manager",
                  "type": "address"
                },
                {
                  "components": [
                    {
                      "internalType": "address",
                      "name": "applicant",
                      "type": "address"
                    },
                    {
                      "components": [
                        {
                          "internalType": "bool",
                          "name": "nextToken",
                          "type": "bool"
                        },
                        {
                          "internalType": "address",
                          "name": "to",
                          "type": "address"
                        },
                        {
                          "internalType": "uint88",
                          "name": "amount",
                          "type": "uint88"
                        }
                      ],
                      "internalType": "struct ITasks.Reward[]",
                      "name": "reward",
                      "type": "tuple[]"
                    }
                  ],
                  "internalType": "struct ITasks.PreapprovedApplication[]",
                  "name": "preapproved",
                  "type": "tuple[]"
                }
              ],
              "indexed": false,
              "internalType": "struct ITaskDrafts.CreateTaskInfo",
              "name": "taskInfo",
              "type": "tuple"
            }
          ],
          "name": "TaskDraftCreated",
          "type": "event"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": true,
              "internalType": "address",
              "name": "implementation",
              "type": "address"
            }
          ],
          "name": "Upgraded",
          "type": "event"
        },
        {
          "inputs": [],
          "name": "UPGRADE_PLUGIN_PERMISSION_ID",
          "outputs": [
            {
              "internalType": "bytes32",
              "name": "",
              "type": "bytes32"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "bytes",
              "name": "_metadata",
              "type": "bytes"
            },
            {
              "internalType": "uint64",
              "name": "_startDate",
              "type": "uint64"
            },
            {
              "internalType": "uint64",
              "name": "_endDate",
              "type": "uint64"
            },
            {
              "components": [
                {
                  "internalType": "string",
                  "name": "metadata",
                  "type": "string"
                },
                {
                  "internalType": "uint64",
                  "name": "deadline",
                  "type": "uint64"
                },
                {
                  "components": [
                    {
                      "internalType": "contract IERC20",
                      "name": "tokenContract",
                      "type": "address"
                    },
                    {
                      "internalType": "uint96",
                      "name": "amount",
                      "type": "uint96"
                    }
                  ],
                  "internalType": "struct ITasks.ERC20Transfer[]",
                  "name": "budget",
                  "type": "tuple[]"
                },
                {
                  "internalType": "address",
                  "name": "manager",
                  "type": "address"
                },
                {
                  "components": [
                    {
                      "internalType": "address",
                      "name": "applicant",
                      "type": "address"
                    },
                    {
                      "components": [
                        {
                          "internalType": "bool",
                          "name": "nextToken",
                          "type": "bool"
                        },
                        {
                          "internalType": "address",
                          "name": "to",
                          "type": "address"
                        },
                        {
                          "internalType": "uint88",
                          "name": "amount",
                          "type": "uint88"
                        }
                      ],
                      "internalType": "struct ITasks.Reward[]",
                      "name": "reward",
                      "type": "tuple[]"
                    }
                  ],
                  "internalType": "struct ITasks.PreapprovedApplication[]",
                  "name": "preapproved",
                  "type": "tuple[]"
                }
              ],
              "internalType": "struct ITaskDrafts.CreateTaskInfo",
              "name": "_taskInfo",
              "type": "tuple"
            }
          ],
          "name": "createDraftTask",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "dao",
          "outputs": [
            {
              "internalType": "contract IDAO",
              "name": "",
              "type": "address"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "getGovernanceContract",
          "outputs": [
            {
              "internalType": "contract IPluginProposals",
              "name": "",
              "type": "address"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "getTasksContract",
          "outputs": [
            {
              "internalType": "contract ITasks",
              "name": "",
              "type": "address"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "implementation",
          "outputs": [
            {
              "internalType": "address",
              "name": "",
              "type": "address"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "contract IDAO",
              "name": "_dao",
              "type": "address"
            },
            {
              "internalType": "contract ITasks",
              "name": "_tasks",
              "type": "address"
            },
            {
              "internalType": "contract IPluginProposals",
              "name": "_governancePlugin",
              "type": "address"
            }
          ],
          "name": "initialize",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "pluginType",
          "outputs": [
            {
              "internalType": "enum IPlugin.PluginType",
              "name": "",
              "type": "uint8"
            }
          ],
          "stateMutability": "pure",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "proxiableUUID",
          "outputs": [
            {
              "internalType": "bytes32",
              "name": "",
              "type": "bytes32"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "bytes4",
              "name": "_interfaceId",
              "type": "bytes4"
            }
          ],
          "name": "supportsInterface",
          "outputs": [
            {
              "internalType": "bool",
              "name": "",
              "type": "bool"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "contract ITasks",
              "name": "_tasks",
              "type": "address"
            },
            {
              "internalType": "contract IPluginProposals",
              "name": "_governancePlugin",
              "type": "address"
            }
          ],
          "name": "updateAddresses",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "newImplementation",
              "type": "address"
            }
          ],
          "name": "upgradeTo",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "newImplementation",
              "type": "address"
            },
            {
              "internalType": "bytes",
              "name": "data",
              "type": "bytes"
            }
          ],
          "name": "upgradeToAndCall",
          "outputs": [],
          "stateMutability": "payable",
          "type": "function"
        }
      ]
    },
    "blockchain_tokenListGovernance": {
      "address": "0xe1Beaa6b743752B89e2596960462f0698baD24a9",
      "abi": [
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "dao",
              "type": "address"
            },
            {
              "internalType": "address",
              "name": "where",
              "type": "address"
            },
            {
              "internalType": "address",
              "name": "who",
              "type": "address"
            },
            {
              "internalType": "bytes32",
              "name": "permissionId",
              "type": "bytes32"
            }
          ],
          "name": "DaoUnauthorized",
          "type": "error"
        },
        {
          "inputs": [
            {
              "internalType": "uint64",
              "name": "limit",
              "type": "uint64"
            },
            {
              "internalType": "uint64",
              "name": "actual",
              "type": "uint64"
            }
          ],
          "name": "DateOutOfBounds",
          "type": "error"
        },
        {
          "inputs": [
            {
              "internalType": "uint256",
              "name": "tokenId",
              "type": "uint256"
            }
          ],
          "name": "InvalidTokenlistUpdate",
          "type": "error"
        },
        {
          "inputs": [
            {
              "internalType": "uint64",
              "name": "limit",
              "type": "uint64"
            },
            {
              "internalType": "uint64",
              "name": "actual",
              "type": "uint64"
            }
          ],
          "name": "MinDurationOutOfBounds",
          "type": "error"
        },
        {
          "inputs": [
            {
              "internalType": "uint256",
              "name": "sender",
              "type": "uint256"
            }
          ],
          "name": "ProposalCreationForbidden",
          "type": "error"
        },
        {
          "inputs": [
            {
              "internalType": "uint256",
              "name": "proposalId",
              "type": "uint256"
            }
          ],
          "name": "ProposalExecutionForbidden",
          "type": "error"
        },
        {
          "inputs": [
            {
              "internalType": "uint256",
              "name": "limit",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "actual",
              "type": "uint256"
            }
          ],
          "name": "RatioOutOfBounds",
          "type": "error"
        },
        {
          "inputs": [
            {
              "internalType": "uint256",
              "name": "tokenId",
              "type": "uint256"
            },
            {
              "internalType": "address",
              "name": "sender",
              "type": "address"
            }
          ],
          "name": "TokenNotOwnedBySender",
          "type": "error"
        },
        {
          "inputs": [
            {
              "internalType": "uint256",
              "name": "proposalId",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "account",
              "type": "uint256"
            },
            {
              "internalType": "enum ITokenMajorityVoting.VoteOption",
              "name": "voteOption",
              "type": "uint8"
            }
          ],
          "name": "VoteCastForbidden",
          "type": "error"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": false,
              "internalType": "address",
              "name": "previousAdmin",
              "type": "address"
            },
            {
              "indexed": false,
              "internalType": "address",
              "name": "newAdmin",
              "type": "address"
            }
          ],
          "name": "AdminChanged",
          "type": "event"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": true,
              "internalType": "address",
              "name": "beacon",
              "type": "address"
            }
          ],
          "name": "BeaconUpgraded",
          "type": "event"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": false,
              "internalType": "uint8",
              "name": "version",
              "type": "uint8"
            }
          ],
          "name": "Initialized",
          "type": "event"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": false,
              "internalType": "uint256[]",
              "name": "members",
              "type": "uint256[]"
            }
          ],
          "name": "MembersAdded",
          "type": "event"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": false,
              "internalType": "uint256[]",
              "name": "members",
              "type": "uint256[]"
            }
          ],
          "name": "MembersRemoved",
          "type": "event"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": true,
              "internalType": "address",
              "name": "definingContract",
              "type": "address"
            }
          ],
          "name": "MembershipContractAnnounced",
          "type": "event"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": true,
              "internalType": "uint256",
              "name": "proposalId",
              "type": "uint256"
            },
            {
              "indexed": true,
              "internalType": "address",
              "name": "creator",
              "type": "address"
            },
            {
              "indexed": false,
              "internalType": "uint64",
              "name": "startDate",
              "type": "uint64"
            },
            {
              "indexed": false,
              "internalType": "uint64",
              "name": "endDate",
              "type": "uint64"
            },
            {
              "indexed": false,
              "internalType": "bytes",
              "name": "metadata",
              "type": "bytes"
            },
            {
              "components": [
                {
                  "internalType": "address",
                  "name": "to",
                  "type": "address"
                },
                {
                  "internalType": "uint256",
                  "name": "value",
                  "type": "uint256"
                },
                {
                  "internalType": "bytes",
                  "name": "data",
                  "type": "bytes"
                }
              ],
              "indexed": false,
              "internalType": "struct IDAO.Action[]",
              "name": "actions",
              "type": "tuple[]"
            },
            {
              "indexed": false,
              "internalType": "uint256",
              "name": "allowFailureMap",
              "type": "uint256"
            }
          ],
          "name": "ProposalCreated",
          "type": "event"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": true,
              "internalType": "uint256",
              "name": "proposalId",
              "type": "uint256"
            }
          ],
          "name": "ProposalExecuted",
          "type": "event"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": false,
              "internalType": "uint256[]",
              "name": "tokens",
              "type": "uint256[]"
            }
          ],
          "name": "TokensAdded",
          "type": "event"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": false,
              "internalType": "uint256[]",
              "name": "tokens",
              "type": "uint256[]"
            }
          ],
          "name": "TokensRemoved",
          "type": "event"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": true,
              "internalType": "address",
              "name": "implementation",
              "type": "address"
            }
          ],
          "name": "Upgraded",
          "type": "event"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": true,
              "internalType": "uint256",
              "name": "proposalId",
              "type": "uint256"
            },
            {
              "indexed": true,
              "internalType": "uint256",
              "name": "voter",
              "type": "uint256"
            },
            {
              "indexed": false,
              "internalType": "enum ITokenMajorityVoting.VoteOption",
              "name": "voteOption",
              "type": "uint8"
            },
            {
              "indexed": false,
              "internalType": "uint256",
              "name": "votingPower",
              "type": "uint256"
            }
          ],
          "name": "VoteCast",
          "type": "event"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": false,
              "internalType": "enum TokenMajorityVotingBase.VotingMode",
              "name": "votingMode",
              "type": "uint8"
            },
            {
              "indexed": false,
              "internalType": "uint32",
              "name": "supportThreshold",
              "type": "uint32"
            },
            {
              "indexed": false,
              "internalType": "uint32",
              "name": "minParticipation",
              "type": "uint32"
            },
            {
              "indexed": false,
              "internalType": "uint64",
              "name": "minDuration",
              "type": "uint64"
            },
            {
              "indexed": false,
              "internalType": "uint256",
              "name": "minProposerVotingPower",
              "type": "uint256"
            }
          ],
          "name": "VotingSettingsUpdated",
          "type": "event"
        },
        {
          "inputs": [],
          "name": "UPDATE_MEMBERS_PERMISSION_ID",
          "outputs": [
            {
              "internalType": "bytes32",
              "name": "",
              "type": "bytes32"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "UPDATE_VOTING_SETTINGS_PERMISSION_ID",
          "outputs": [
            {
              "internalType": "bytes32",
              "name": "",
              "type": "bytes32"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "UPGRADE_PLUGIN_PERMISSION_ID",
          "outputs": [
            {
              "internalType": "bytes32",
              "name": "",
              "type": "bytes32"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "uint256[]",
              "name": "_members",
              "type": "uint256[]"
            }
          ],
          "name": "addMembers",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "uint256",
              "name": "_proposalId",
              "type": "uint256"
            }
          ],
          "name": "canExecute",
          "outputs": [
            {
              "internalType": "bool",
              "name": "",
              "type": "bool"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "uint256",
              "name": "_proposalId",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "_account",
              "type": "uint256"
            },
            {
              "internalType": "enum ITokenMajorityVoting.VoteOption",
              "name": "_voteOption",
              "type": "uint8"
            }
          ],
          "name": "canVote",
          "outputs": [
            {
              "internalType": "bool",
              "name": "",
              "type": "bool"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "bytes",
              "name": "_metadata",
              "type": "bytes"
            },
            {
              "components": [
                {
                  "internalType": "address",
                  "name": "to",
                  "type": "address"
                },
                {
                  "internalType": "uint256",
                  "name": "value",
                  "type": "uint256"
                },
                {
                  "internalType": "bytes",
                  "name": "data",
                  "type": "bytes"
                }
              ],
              "internalType": "struct IDAO.Action[]",
              "name": "_actions",
              "type": "tuple[]"
            },
            {
              "internalType": "uint256",
              "name": "_allowFailureMap",
              "type": "uint256"
            },
            {
              "internalType": "uint64",
              "name": "_startDate",
              "type": "uint64"
            },
            {
              "internalType": "uint64",
              "name": "_endDate",
              "type": "uint64"
            }
          ],
          "name": "createPluginProposal",
          "outputs": [
            {
              "internalType": "uint256",
              "name": "proposalId",
              "type": "uint256"
            }
          ],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "bytes",
              "name": "_metadata",
              "type": "bytes"
            },
            {
              "components": [
                {
                  "internalType": "address",
                  "name": "to",
                  "type": "address"
                },
                {
                  "internalType": "uint256",
                  "name": "value",
                  "type": "uint256"
                },
                {
                  "internalType": "bytes",
                  "name": "data",
                  "type": "bytes"
                }
              ],
              "internalType": "struct IDAO.Action[]",
              "name": "_actions",
              "type": "tuple[]"
            },
            {
              "internalType": "uint256",
              "name": "_allowFailureMap",
              "type": "uint256"
            },
            {
              "internalType": "uint64",
              "name": "_startDate",
              "type": "uint64"
            },
            {
              "internalType": "uint64",
              "name": "_endDate",
              "type": "uint64"
            },
            {
              "internalType": "enum ITokenMajorityVoting.VoteOption",
              "name": "_voteOption",
              "type": "uint8"
            },
            {
              "internalType": "bool",
              "name": "_tryEarlyExecution",
              "type": "bool"
            },
            {
              "internalType": "uint256",
              "name": "_tokenId",
              "type": "uint256"
            }
          ],
          "name": "createProposal",
          "outputs": [
            {
              "internalType": "uint256",
              "name": "proposalId",
              "type": "uint256"
            }
          ],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "dao",
          "outputs": [
            {
              "internalType": "contract IDAO",
              "name": "",
              "type": "address"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "uint256",
              "name": "_proposalId",
              "type": "uint256"
            }
          ],
          "name": "execute",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "uint256",
              "name": "_proposalId",
              "type": "uint256"
            }
          ],
          "name": "getProposal",
          "outputs": [
            {
              "internalType": "bool",
              "name": "open",
              "type": "bool"
            },
            {
              "internalType": "bool",
              "name": "executed",
              "type": "bool"
            },
            {
              "components": [
                {
                  "internalType": "enum TokenMajorityVotingBase.VotingMode",
                  "name": "votingMode",
                  "type": "uint8"
                },
                {
                  "internalType": "uint32",
                  "name": "supportThreshold",
                  "type": "uint32"
                },
                {
                  "internalType": "uint64",
                  "name": "startDate",
                  "type": "uint64"
                },
                {
                  "internalType": "uint64",
                  "name": "endDate",
                  "type": "uint64"
                },
                {
                  "internalType": "uint64",
                  "name": "snapshotBlock",
                  "type": "uint64"
                },
                {
                  "internalType": "uint256",
                  "name": "minVotingPower",
                  "type": "uint256"
                }
              ],
              "internalType": "struct TokenMajorityVotingBase.ProposalParameters",
              "name": "parameters",
              "type": "tuple"
            },
            {
              "components": [
                {
                  "internalType": "uint256",
                  "name": "abstain",
                  "type": "uint256"
                },
                {
                  "internalType": "uint256",
                  "name": "yes",
                  "type": "uint256"
                },
                {
                  "internalType": "uint256",
                  "name": "no",
                  "type": "uint256"
                }
              ],
              "internalType": "struct TokenMajorityVotingBase.Tally",
              "name": "tally",
              "type": "tuple"
            },
            {
              "components": [
                {
                  "internalType": "address",
                  "name": "to",
                  "type": "address"
                },
                {
                  "internalType": "uint256",
                  "name": "value",
                  "type": "uint256"
                },
                {
                  "internalType": "bytes",
                  "name": "data",
                  "type": "bytes"
                }
              ],
              "internalType": "struct IDAO.Action[]",
              "name": "actions",
              "type": "tuple[]"
            },
            {
              "internalType": "uint256",
              "name": "allowFailureMap",
              "type": "uint256"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "uint256",
              "name": "_proposalId",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "_account",
              "type": "uint256"
            }
          ],
          "name": "getVoteOption",
          "outputs": [
            {
              "internalType": "enum ITokenMajorityVoting.VoteOption",
              "name": "",
              "type": "uint8"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "implementation",
          "outputs": [
            {
              "internalType": "address",
              "name": "",
              "type": "address"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "contract IDAO",
              "name": "_dao",
              "type": "address"
            },
            {
              "components": [
                {
                  "internalType": "enum TokenMajorityVotingBase.VotingMode",
                  "name": "votingMode",
                  "type": "uint8"
                },
                {
                  "internalType": "uint32",
                  "name": "supportThreshold",
                  "type": "uint32"
                },
                {
                  "internalType": "uint32",
                  "name": "minParticipation",
                  "type": "uint32"
                },
                {
                  "internalType": "uint64",
                  "name": "minDuration",
                  "type": "uint64"
                },
                {
                  "internalType": "uint256",
                  "name": "minProposerVotingPower",
                  "type": "uint256"
                }
              ],
              "internalType": "struct TokenMajorityVotingBase.VotingSettings",
              "name": "_votingSettings",
              "type": "tuple"
            },
            {
              "internalType": "contract IERC721",
              "name": "_tokenCollection",
              "type": "address"
            },
            {
              "internalType": "uint256[]",
              "name": "_members",
              "type": "uint256[]"
            }
          ],
          "name": "initialize",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "uint256",
              "name": "_tokenId",
              "type": "uint256"
            }
          ],
          "name": "isListed",
          "outputs": [
            {
              "internalType": "bool",
              "name": "",
              "type": "bool"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "uint256",
              "name": "_tokenId",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "_blockNumber",
              "type": "uint256"
            }
          ],
          "name": "isListedAtBlock",
          "outputs": [
            {
              "internalType": "bool",
              "name": "",
              "type": "bool"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "uint256",
              "name": "_account",
              "type": "uint256"
            }
          ],
          "name": "isMember",
          "outputs": [
            {
              "internalType": "bool",
              "name": "",
              "type": "bool"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "uint256",
              "name": "_proposalId",
              "type": "uint256"
            }
          ],
          "name": "isMinParticipationReached",
          "outputs": [
            {
              "internalType": "bool",
              "name": "",
              "type": "bool"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "uint256",
              "name": "_proposalId",
              "type": "uint256"
            }
          ],
          "name": "isSupportThresholdReached",
          "outputs": [
            {
              "internalType": "bool",
              "name": "",
              "type": "bool"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "uint256",
              "name": "_proposalId",
              "type": "uint256"
            }
          ],
          "name": "isSupportThresholdReachedEarly",
          "outputs": [
            {
              "internalType": "bool",
              "name": "",
              "type": "bool"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "minDuration",
          "outputs": [
            {
              "internalType": "uint64",
              "name": "",
              "type": "uint64"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "minParticipation",
          "outputs": [
            {
              "internalType": "uint32",
              "name": "",
              "type": "uint32"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "minProposerVotingPower",
          "outputs": [
            {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "pluginType",
          "outputs": [
            {
              "internalType": "enum IPlugin.PluginType",
              "name": "",
              "type": "uint8"
            }
          ],
          "stateMutability": "pure",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "proposalCount",
          "outputs": [
            {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "proxiableUUID",
          "outputs": [
            {
              "internalType": "bytes32",
              "name": "",
              "type": "bytes32"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "uint256[]",
              "name": "_members",
              "type": "uint256[]"
            }
          ],
          "name": "removeMembers",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "supportThreshold",
          "outputs": [
            {
              "internalType": "uint32",
              "name": "",
              "type": "uint32"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "bytes4",
              "name": "_interfaceId",
              "type": "bytes4"
            }
          ],
          "name": "supportsInterface",
          "outputs": [
            {
              "internalType": "bool",
              "name": "",
              "type": "bool"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "tokenlistLength",
          "outputs": [
            {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "uint256",
              "name": "_blockNumber",
              "type": "uint256"
            }
          ],
          "name": "tokenlistLengthAtBlock",
          "outputs": [
            {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "uint256",
              "name": "_blockNumber",
              "type": "uint256"
            }
          ],
          "name": "totalVotingPower",
          "outputs": [
            {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "components": [
                {
                  "internalType": "enum TokenMajorityVotingBase.VotingMode",
                  "name": "votingMode",
                  "type": "uint8"
                },
                {
                  "internalType": "uint32",
                  "name": "supportThreshold",
                  "type": "uint32"
                },
                {
                  "internalType": "uint32",
                  "name": "minParticipation",
                  "type": "uint32"
                },
                {
                  "internalType": "uint64",
                  "name": "minDuration",
                  "type": "uint64"
                },
                {
                  "internalType": "uint256",
                  "name": "minProposerVotingPower",
                  "type": "uint256"
                }
              ],
              "internalType": "struct TokenMajorityVotingBase.VotingSettings",
              "name": "_votingSettings",
              "type": "tuple"
            }
          ],
          "name": "updateVotingSettings",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "newImplementation",
              "type": "address"
            }
          ],
          "name": "upgradeTo",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "newImplementation",
              "type": "address"
            },
            {
              "internalType": "bytes",
              "name": "data",
              "type": "bytes"
            }
          ],
          "name": "upgradeToAndCall",
          "outputs": [],
          "stateMutability": "payable",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "uint256",
              "name": "_proposalId",
              "type": "uint256"
            },
            {
              "internalType": "enum ITokenMajorityVoting.VoteOption",
              "name": "_voteOption",
              "type": "uint8"
            },
            {
              "internalType": "bool",
              "name": "_tryEarlyExecution",
              "type": "bool"
            },
            {
              "internalType": "uint256",
              "name": "_tokenId",
              "type": "uint256"
            }
          ],
          "name": "vote",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "votingMode",
          "outputs": [
            {
              "internalType": "enum TokenMajorityVotingBase.VotingMode",
              "name": "",
              "type": "uint8"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        }
      ]
    },
    "cloud_dao": {
      "address": "0xE3E882C39724dcFE36a420E688E406c12B0CCc5e",
      "abi": [
        {
          "inputs": [],
          "stateMutability": "nonpayable",
          "type": "constructor"
        },
        {
          "inputs": [
            {
              "internalType": "uint256",
              "name": "index",
              "type": "uint256"
            }
          ],
          "name": "ActionFailed",
          "type": "error"
        },
        {
          "inputs": [],
          "name": "AnyAddressDisallowedForWhoAndWhere",
          "type": "error"
        },
        {
          "inputs": [
            {
              "internalType": "contract IPermissionCondition",
              "name": "condition",
              "type": "address"
            }
          ],
          "name": "ConditionInterfacNotSupported",
          "type": "error"
        },
        {
          "inputs": [
            {
              "internalType": "contract IPermissionCondition",
              "name": "condition",
              "type": "address"
            }
          ],
          "name": "ConditionNotAContract",
          "type": "error"
        },
        {
          "inputs": [],
          "name": "GrantWithConditionNotSupported",
          "type": "error"
        },
        {
          "inputs": [],
          "name": "InsufficientGas",
          "type": "error"
        },
        {
          "inputs": [
            {
              "internalType": "uint256",
              "name": "expected",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "actual",
              "type": "uint256"
            }
          ],
          "name": "NativeTokenDepositAmountMismatch",
          "type": "error"
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "where",
              "type": "address"
            },
            {
              "internalType": "address",
              "name": "who",
              "type": "address"
            },
            {
              "internalType": "bytes32",
              "name": "permissionId",
              "type": "bytes32"
            },
            {
              "internalType": "address",
              "name": "currentCondition",
              "type": "address"
            },
            {
              "internalType": "address",
              "name": "newCondition",
              "type": "address"
            }
          ],
          "name": "PermissionAlreadyGrantedForDifferentCondition",
          "type": "error"
        },
        {
          "inputs": [],
          "name": "PermissionsForAnyAddressDisallowed",
          "type": "error"
        },
        {
          "inputs": [
            {
              "internalType": "uint8[3]",
              "name": "protocolVersion",
              "type": "uint8[3]"
            }
          ],
          "name": "ProtocolVersionUpgradeNotSupported",
          "type": "error"
        },
        {
          "inputs": [],
          "name": "ReentrantCall",
          "type": "error"
        },
        {
          "inputs": [],
          "name": "TooManyActions",
          "type": "error"
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "where",
              "type": "address"
            },
            {
              "internalType": "address",
              "name": "who",
              "type": "address"
            },
            {
              "internalType": "bytes32",
              "name": "permissionId",
              "type": "bytes32"
            }
          ],
          "name": "Unauthorized",
          "type": "error"
        },
        {
          "inputs": [
            {
              "internalType": "bytes4",
              "name": "callbackSelector",
              "type": "bytes4"
            },
            {
              "internalType": "bytes4",
              "name": "magicNumber",
              "type": "bytes4"
            }
          ],
          "name": "UnkownCallback",
          "type": "error"
        },
        {
          "inputs": [],
          "name": "ZeroAmount",
          "type": "error"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": false,
              "internalType": "address",
              "name": "previousAdmin",
              "type": "address"
            },
            {
              "indexed": false,
              "internalType": "address",
              "name": "newAdmin",
              "type": "address"
            }
          ],
          "name": "AdminChanged",
          "type": "event"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": true,
              "internalType": "address",
              "name": "beacon",
              "type": "address"
            }
          ],
          "name": "BeaconUpgraded",
          "type": "event"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": false,
              "internalType": "address",
              "name": "sender",
              "type": "address"
            },
            {
              "indexed": true,
              "internalType": "bytes4",
              "name": "sig",
              "type": "bytes4"
            },
            {
              "indexed": false,
              "internalType": "bytes",
              "name": "data",
              "type": "bytes"
            }
          ],
          "name": "CallbackReceived",
          "type": "event"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": true,
              "internalType": "address",
              "name": "sender",
              "type": "address"
            },
            {
              "indexed": true,
              "internalType": "address",
              "name": "token",
              "type": "address"
            },
            {
              "indexed": false,
              "internalType": "uint256",
              "name": "amount",
              "type": "uint256"
            },
            {
              "indexed": false,
              "internalType": "string",
              "name": "_reference",
              "type": "string"
            }
          ],
          "name": "Deposited",
          "type": "event"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": true,
              "internalType": "address",
              "name": "actor",
              "type": "address"
            },
            {
              "indexed": false,
              "internalType": "bytes32",
              "name": "callId",
              "type": "bytes32"
            },
            {
              "components": [
                {
                  "internalType": "address",
                  "name": "to",
                  "type": "address"
                },
                {
                  "internalType": "uint256",
                  "name": "value",
                  "type": "uint256"
                },
                {
                  "internalType": "bytes",
                  "name": "data",
                  "type": "bytes"
                }
              ],
              "indexed": false,
              "internalType": "struct IDAO.Action[]",
              "name": "actions",
              "type": "tuple[]"
            },
            {
              "indexed": false,
              "internalType": "uint256",
              "name": "allowFailureMap",
              "type": "uint256"
            },
            {
              "indexed": false,
              "internalType": "uint256",
              "name": "failureMap",
              "type": "uint256"
            },
            {
              "indexed": false,
              "internalType": "bytes[]",
              "name": "execResults",
              "type": "bytes[]"
            }
          ],
          "name": "Executed",
          "type": "event"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": true,
              "internalType": "bytes32",
              "name": "permissionId",
              "type": "bytes32"
            },
            {
              "indexed": true,
              "internalType": "address",
              "name": "here",
              "type": "address"
            },
            {
              "indexed": false,
              "internalType": "address",
              "name": "where",
              "type": "address"
            },
            {
              "indexed": true,
              "internalType": "address",
              "name": "who",
              "type": "address"
            },
            {
              "indexed": false,
              "internalType": "address",
              "name": "condition",
              "type": "address"
            }
          ],
          "name": "Granted",
          "type": "event"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": false,
              "internalType": "uint8",
              "name": "version",
              "type": "uint8"
            }
          ],
          "name": "Initialized",
          "type": "event"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": false,
              "internalType": "bytes",
              "name": "metadata",
              "type": "bytes"
            }
          ],
          "name": "MetadataSet",
          "type": "event"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": false,
              "internalType": "address",
              "name": "sender",
              "type": "address"
            },
            {
              "indexed": false,
              "internalType": "uint256",
              "name": "amount",
              "type": "uint256"
            }
          ],
          "name": "NativeTokenDeposited",
          "type": "event"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": false,
              "internalType": "string",
              "name": "daoURI",
              "type": "string"
            }
          ],
          "name": "NewURI",
          "type": "event"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": true,
              "internalType": "bytes32",
              "name": "permissionId",
              "type": "bytes32"
            },
            {
              "indexed": true,
              "internalType": "address",
              "name": "here",
              "type": "address"
            },
            {
              "indexed": false,
              "internalType": "address",
              "name": "where",
              "type": "address"
            },
            {
              "indexed": true,
              "internalType": "address",
              "name": "who",
              "type": "address"
            }
          ],
          "name": "Revoked",
          "type": "event"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": false,
              "internalType": "address",
              "name": "signatureValidator",
              "type": "address"
            }
          ],
          "name": "SignatureValidatorSet",
          "type": "event"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": false,
              "internalType": "bytes4",
              "name": "interfaceId",
              "type": "bytes4"
            },
            {
              "indexed": false,
              "internalType": "bytes4",
              "name": "callbackSelector",
              "type": "bytes4"
            },
            {
              "indexed": false,
              "internalType": "bytes4",
              "name": "magicNumber",
              "type": "bytes4"
            }
          ],
          "name": "StandardCallbackRegistered",
          "type": "event"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": false,
              "internalType": "address",
              "name": "forwarder",
              "type": "address"
            }
          ],
          "name": "TrustedForwarderSet",
          "type": "event"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": true,
              "internalType": "address",
              "name": "implementation",
              "type": "address"
            }
          ],
          "name": "Upgraded",
          "type": "event"
        },
        {
          "stateMutability": "nonpayable",
          "type": "fallback"
        },
        {
          "inputs": [],
          "name": "EXECUTE_PERMISSION_ID",
          "outputs": [
            {
              "internalType": "bytes32",
              "name": "",
              "type": "bytes32"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "REGISTER_STANDARD_CALLBACK_PERMISSION_ID",
          "outputs": [
            {
              "internalType": "bytes32",
              "name": "",
              "type": "bytes32"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "ROOT_PERMISSION_ID",
          "outputs": [
            {
              "internalType": "bytes32",
              "name": "",
              "type": "bytes32"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "SET_METADATA_PERMISSION_ID",
          "outputs": [
            {
              "internalType": "bytes32",
              "name": "",
              "type": "bytes32"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "SET_SIGNATURE_VALIDATOR_PERMISSION_ID",
          "outputs": [
            {
              "internalType": "bytes32",
              "name": "",
              "type": "bytes32"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "SET_TRUSTED_FORWARDER_PERMISSION_ID",
          "outputs": [
            {
              "internalType": "bytes32",
              "name": "",
              "type": "bytes32"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "UPGRADE_DAO_PERMISSION_ID",
          "outputs": [
            {
              "internalType": "bytes32",
              "name": "",
              "type": "bytes32"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "components": [
                {
                  "internalType": "enum PermissionLib.Operation",
                  "name": "operation",
                  "type": "uint8"
                },
                {
                  "internalType": "address",
                  "name": "where",
                  "type": "address"
                },
                {
                  "internalType": "address",
                  "name": "who",
                  "type": "address"
                },
                {
                  "internalType": "address",
                  "name": "condition",
                  "type": "address"
                },
                {
                  "internalType": "bytes32",
                  "name": "permissionId",
                  "type": "bytes32"
                }
              ],
              "internalType": "struct PermissionLib.MultiTargetPermission[]",
              "name": "_items",
              "type": "tuple[]"
            }
          ],
          "name": "applyMultiTargetPermissions",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "_where",
              "type": "address"
            },
            {
              "components": [
                {
                  "internalType": "enum PermissionLib.Operation",
                  "name": "operation",
                  "type": "uint8"
                },
                {
                  "internalType": "address",
                  "name": "who",
                  "type": "address"
                },
                {
                  "internalType": "bytes32",
                  "name": "permissionId",
                  "type": "bytes32"
                }
              ],
              "internalType": "struct PermissionLib.SingleTargetPermission[]",
              "name": "items",
              "type": "tuple[]"
            }
          ],
          "name": "applySingleTargetPermissions",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "daoURI",
          "outputs": [
            {
              "internalType": "string",
              "name": "",
              "type": "string"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "_token",
              "type": "address"
            },
            {
              "internalType": "uint256",
              "name": "_amount",
              "type": "uint256"
            },
            {
              "internalType": "string",
              "name": "_reference",
              "type": "string"
            }
          ],
          "name": "deposit",
          "outputs": [],
          "stateMutability": "payable",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "bytes32",
              "name": "_callId",
              "type": "bytes32"
            },
            {
              "components": [
                {
                  "internalType": "address",
                  "name": "to",
                  "type": "address"
                },
                {
                  "internalType": "uint256",
                  "name": "value",
                  "type": "uint256"
                },
                {
                  "internalType": "bytes",
                  "name": "data",
                  "type": "bytes"
                }
              ],
              "internalType": "struct IDAO.Action[]",
              "name": "_actions",
              "type": "tuple[]"
            },
            {
              "internalType": "uint256",
              "name": "_allowFailureMap",
              "type": "uint256"
            }
          ],
          "name": "execute",
          "outputs": [
            {
              "internalType": "bytes[]",
              "name": "execResults",
              "type": "bytes[]"
            },
            {
              "internalType": "uint256",
              "name": "failureMap",
              "type": "uint256"
            }
          ],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "getTrustedForwarder",
          "outputs": [
            {
              "internalType": "address",
              "name": "",
              "type": "address"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "_where",
              "type": "address"
            },
            {
              "internalType": "address",
              "name": "_who",
              "type": "address"
            },
            {
              "internalType": "bytes32",
              "name": "_permissionId",
              "type": "bytes32"
            }
          ],
          "name": "grant",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "_where",
              "type": "address"
            },
            {
              "internalType": "address",
              "name": "_who",
              "type": "address"
            },
            {
              "internalType": "bytes32",
              "name": "_permissionId",
              "type": "bytes32"
            },
            {
              "internalType": "contract IPermissionCondition",
              "name": "_condition",
              "type": "address"
            }
          ],
          "name": "grantWithCondition",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "_where",
              "type": "address"
            },
            {
              "internalType": "address",
              "name": "_who",
              "type": "address"
            },
            {
              "internalType": "bytes32",
              "name": "_permissionId",
              "type": "bytes32"
            },
            {
              "internalType": "bytes",
              "name": "_data",
              "type": "bytes"
            }
          ],
          "name": "hasPermission",
          "outputs": [
            {
              "internalType": "bool",
              "name": "",
              "type": "bool"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "bytes",
              "name": "_metadata",
              "type": "bytes"
            },
            {
              "internalType": "address",
              "name": "_initialOwner",
              "type": "address"
            },
            {
              "internalType": "address",
              "name": "_trustedForwarder",
              "type": "address"
            },
            {
              "internalType": "string",
              "name": "daoURI_",
              "type": "string"
            }
          ],
          "name": "initialize",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "uint8[3]",
              "name": "_previousProtocolVersion",
              "type": "uint8[3]"
            },
            {
              "internalType": "bytes",
              "name": "_initData",
              "type": "bytes"
            }
          ],
          "name": "initializeFrom",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "_where",
              "type": "address"
            },
            {
              "internalType": "address",
              "name": "_who",
              "type": "address"
            },
            {
              "internalType": "bytes32",
              "name": "_permissionId",
              "type": "bytes32"
            },
            {
              "internalType": "bytes",
              "name": "_data",
              "type": "bytes"
            }
          ],
          "name": "isGranted",
          "outputs": [
            {
              "internalType": "bool",
              "name": "",
              "type": "bool"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "bytes32",
              "name": "_hash",
              "type": "bytes32"
            },
            {
              "internalType": "bytes",
              "name": "_signature",
              "type": "bytes"
            }
          ],
          "name": "isValidSignature",
          "outputs": [
            {
              "internalType": "bytes4",
              "name": "",
              "type": "bytes4"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "protocolVersion",
          "outputs": [
            {
              "internalType": "uint8[3]",
              "name": "",
              "type": "uint8[3]"
            }
          ],
          "stateMutability": "pure",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "proxiableUUID",
          "outputs": [
            {
              "internalType": "bytes32",
              "name": "",
              "type": "bytes32"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "bytes4",
              "name": "_interfaceId",
              "type": "bytes4"
            },
            {
              "internalType": "bytes4",
              "name": "_callbackSelector",
              "type": "bytes4"
            },
            {
              "internalType": "bytes4",
              "name": "_magicNumber",
              "type": "bytes4"
            }
          ],
          "name": "registerStandardCallback",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "_where",
              "type": "address"
            },
            {
              "internalType": "address",
              "name": "_who",
              "type": "address"
            },
            {
              "internalType": "bytes32",
              "name": "_permissionId",
              "type": "bytes32"
            }
          ],
          "name": "revoke",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "string",
              "name": "newDaoURI",
              "type": "string"
            }
          ],
          "name": "setDaoURI",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "bytes",
              "name": "_metadata",
              "type": "bytes"
            }
          ],
          "name": "setMetadata",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "_signatureValidator",
              "type": "address"
            }
          ],
          "name": "setSignatureValidator",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "_newTrustedForwarder",
              "type": "address"
            }
          ],
          "name": "setTrustedForwarder",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "signatureValidator",
          "outputs": [
            {
              "internalType": "contract IERC1271",
              "name": "",
              "type": "address"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "bytes4",
              "name": "interfaceId",
              "type": "bytes4"
            }
          ],
          "name": "supportsInterface",
          "outputs": [
            {
              "internalType": "bool",
              "name": "",
              "type": "bool"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "newImplementation",
              "type": "address"
            }
          ],
          "name": "upgradeTo",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "newImplementation",
              "type": "address"
            },
            {
              "internalType": "bytes",
              "name": "data",
              "type": "bytes"
            }
          ],
          "name": "upgradeToAndCall",
          "outputs": [],
          "stateMutability": "payable",
          "type": "function"
        },
        {
          "stateMutability": "payable",
          "type": "receive"
        }
      ]
    },
    "cloud_taskDrafts": {
      "address": "0x181D35dD3931a0bCacf9941605d26166610bd1d3",
      "abi": [
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "dao",
              "type": "address"
            },
            {
              "internalType": "address",
              "name": "where",
              "type": "address"
            },
            {
              "internalType": "address",
              "name": "who",
              "type": "address"
            },
            {
              "internalType": "bytes32",
              "name": "permissionId",
              "type": "bytes32"
            }
          ],
          "name": "DaoUnauthorized",
          "type": "error"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": false,
              "internalType": "address",
              "name": "previousAdmin",
              "type": "address"
            },
            {
              "indexed": false,
              "internalType": "address",
              "name": "newAdmin",
              "type": "address"
            }
          ],
          "name": "AdminChanged",
          "type": "event"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": true,
              "internalType": "address",
              "name": "beacon",
              "type": "address"
            }
          ],
          "name": "BeaconUpgraded",
          "type": "event"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": false,
              "internalType": "uint8",
              "name": "version",
              "type": "uint8"
            }
          ],
          "name": "Initialized",
          "type": "event"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": false,
              "internalType": "uint256",
              "name": "proposalId",
              "type": "uint256"
            },
            {
              "indexed": false,
              "internalType": "bytes",
              "name": "metadata",
              "type": "bytes"
            },
            {
              "indexed": false,
              "internalType": "uint64",
              "name": "startDate",
              "type": "uint64"
            },
            {
              "indexed": false,
              "internalType": "uint64",
              "name": "endDate",
              "type": "uint64"
            },
            {
              "components": [
                {
                  "internalType": "string",
                  "name": "metadata",
                  "type": "string"
                },
                {
                  "internalType": "uint64",
                  "name": "deadline",
                  "type": "uint64"
                },
                {
                  "components": [
                    {
                      "internalType": "contract IERC20",
                      "name": "tokenContract",
                      "type": "address"
                    },
                    {
                      "internalType": "uint96",
                      "name": "amount",
                      "type": "uint96"
                    }
                  ],
                  "internalType": "struct ITasks.ERC20Transfer[]",
                  "name": "budget",
                  "type": "tuple[]"
                },
                {
                  "internalType": "address",
                  "name": "manager",
                  "type": "address"
                },
                {
                  "components": [
                    {
                      "internalType": "address",
                      "name": "applicant",
                      "type": "address"
                    },
                    {
                      "components": [
                        {
                          "internalType": "bool",
                          "name": "nextToken",
                          "type": "bool"
                        },
                        {
                          "internalType": "address",
                          "name": "to",
                          "type": "address"
                        },
                        {
                          "internalType": "uint88",
                          "name": "amount",
                          "type": "uint88"
                        }
                      ],
                      "internalType": "struct ITasks.Reward[]",
                      "name": "reward",
                      "type": "tuple[]"
                    }
                  ],
                  "internalType": "struct ITasks.PreapprovedApplication[]",
                  "name": "preapproved",
                  "type": "tuple[]"
                }
              ],
              "indexed": false,
              "internalType": "struct ITaskDrafts.CreateTaskInfo",
              "name": "taskInfo",
              "type": "tuple"
            }
          ],
          "name": "TaskDraftCreated",
          "type": "event"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": true,
              "internalType": "address",
              "name": "implementation",
              "type": "address"
            }
          ],
          "name": "Upgraded",
          "type": "event"
        },
        {
          "inputs": [],
          "name": "UPGRADE_PLUGIN_PERMISSION_ID",
          "outputs": [
            {
              "internalType": "bytes32",
              "name": "",
              "type": "bytes32"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "bytes",
              "name": "_metadata",
              "type": "bytes"
            },
            {
              "internalType": "uint64",
              "name": "_startDate",
              "type": "uint64"
            },
            {
              "internalType": "uint64",
              "name": "_endDate",
              "type": "uint64"
            },
            {
              "components": [
                {
                  "internalType": "string",
                  "name": "metadata",
                  "type": "string"
                },
                {
                  "internalType": "uint64",
                  "name": "deadline",
                  "type": "uint64"
                },
                {
                  "components": [
                    {
                      "internalType": "contract IERC20",
                      "name": "tokenContract",
                      "type": "address"
                    },
                    {
                      "internalType": "uint96",
                      "name": "amount",
                      "type": "uint96"
                    }
                  ],
                  "internalType": "struct ITasks.ERC20Transfer[]",
                  "name": "budget",
                  "type": "tuple[]"
                },
                {
                  "internalType": "address",
                  "name": "manager",
                  "type": "address"
                },
                {
                  "components": [
                    {
                      "internalType": "address",
                      "name": "applicant",
                      "type": "address"
                    },
                    {
                      "components": [
                        {
                          "internalType": "bool",
                          "name": "nextToken",
                          "type": "bool"
                        },
                        {
                          "internalType": "address",
                          "name": "to",
                          "type": "address"
                        },
                        {
                          "internalType": "uint88",
                          "name": "amount",
                          "type": "uint88"
                        }
                      ],
                      "internalType": "struct ITasks.Reward[]",
                      "name": "reward",
                      "type": "tuple[]"
                    }
                  ],
                  "internalType": "struct ITasks.PreapprovedApplication[]",
                  "name": "preapproved",
                  "type": "tuple[]"
                }
              ],
              "internalType": "struct ITaskDrafts.CreateTaskInfo",
              "name": "_taskInfo",
              "type": "tuple"
            }
          ],
          "name": "createDraftTask",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "dao",
          "outputs": [
            {
              "internalType": "contract IDAO",
              "name": "",
              "type": "address"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "getGovernanceContract",
          "outputs": [
            {
              "internalType": "contract IPluginProposals",
              "name": "",
              "type": "address"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "getTasksContract",
          "outputs": [
            {
              "internalType": "contract ITasks",
              "name": "",
              "type": "address"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "implementation",
          "outputs": [
            {
              "internalType": "address",
              "name": "",
              "type": "address"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "contract IDAO",
              "name": "_dao",
              "type": "address"
            },
            {
              "internalType": "contract ITasks",
              "name": "_tasks",
              "type": "address"
            },
            {
              "internalType": "contract IPluginProposals",
              "name": "_governancePlugin",
              "type": "address"
            }
          ],
          "name": "initialize",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "pluginType",
          "outputs": [
            {
              "internalType": "enum IPlugin.PluginType",
              "name": "",
              "type": "uint8"
            }
          ],
          "stateMutability": "pure",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "proxiableUUID",
          "outputs": [
            {
              "internalType": "bytes32",
              "name": "",
              "type": "bytes32"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "bytes4",
              "name": "_interfaceId",
              "type": "bytes4"
            }
          ],
          "name": "supportsInterface",
          "outputs": [
            {
              "internalType": "bool",
              "name": "",
              "type": "bool"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "contract ITasks",
              "name": "_tasks",
              "type": "address"
            },
            {
              "internalType": "contract IPluginProposals",
              "name": "_governancePlugin",
              "type": "address"
            }
          ],
          "name": "updateAddresses",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "newImplementation",
              "type": "address"
            }
          ],
          "name": "upgradeTo",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "newImplementation",
              "type": "address"
            },
            {
              "internalType": "bytes",
              "name": "data",
              "type": "bytes"
            }
          ],
          "name": "upgradeToAndCall",
          "outputs": [],
          "stateMutability": "payable",
          "type": "function"
        }
      ]
    },
    "cloud_tokenListGovernance": {
      "address": "0x3cBc60BFEfA40563f1D3AEB830229012975725A5",
      "abi": [
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "dao",
              "type": "address"
            },
            {
              "internalType": "address",
              "name": "where",
              "type": "address"
            },
            {
              "internalType": "address",
              "name": "who",
              "type": "address"
            },
            {
              "internalType": "bytes32",
              "name": "permissionId",
              "type": "bytes32"
            }
          ],
          "name": "DaoUnauthorized",
          "type": "error"
        },
        {
          "inputs": [
            {
              "internalType": "uint64",
              "name": "limit",
              "type": "uint64"
            },
            {
              "internalType": "uint64",
              "name": "actual",
              "type": "uint64"
            }
          ],
          "name": "DateOutOfBounds",
          "type": "error"
        },
        {
          "inputs": [
            {
              "internalType": "uint256",
              "name": "tokenId",
              "type": "uint256"
            }
          ],
          "name": "InvalidTokenlistUpdate",
          "type": "error"
        },
        {
          "inputs": [
            {
              "internalType": "uint64",
              "name": "limit",
              "type": "uint64"
            },
            {
              "internalType": "uint64",
              "name": "actual",
              "type": "uint64"
            }
          ],
          "name": "MinDurationOutOfBounds",
          "type": "error"
        },
        {
          "inputs": [
            {
              "internalType": "uint256",
              "name": "sender",
              "type": "uint256"
            }
          ],
          "name": "ProposalCreationForbidden",
          "type": "error"
        },
        {
          "inputs": [
            {
              "internalType": "uint256",
              "name": "proposalId",
              "type": "uint256"
            }
          ],
          "name": "ProposalExecutionForbidden",
          "type": "error"
        },
        {
          "inputs": [
            {
              "internalType": "uint256",
              "name": "limit",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "actual",
              "type": "uint256"
            }
          ],
          "name": "RatioOutOfBounds",
          "type": "error"
        },
        {
          "inputs": [
            {
              "internalType": "uint256",
              "name": "tokenId",
              "type": "uint256"
            },
            {
              "internalType": "address",
              "name": "sender",
              "type": "address"
            }
          ],
          "name": "TokenNotOwnedBySender",
          "type": "error"
        },
        {
          "inputs": [
            {
              "internalType": "uint256",
              "name": "proposalId",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "account",
              "type": "uint256"
            },
            {
              "internalType": "enum ITokenMajorityVoting.VoteOption",
              "name": "voteOption",
              "type": "uint8"
            }
          ],
          "name": "VoteCastForbidden",
          "type": "error"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": false,
              "internalType": "address",
              "name": "previousAdmin",
              "type": "address"
            },
            {
              "indexed": false,
              "internalType": "address",
              "name": "newAdmin",
              "type": "address"
            }
          ],
          "name": "AdminChanged",
          "type": "event"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": true,
              "internalType": "address",
              "name": "beacon",
              "type": "address"
            }
          ],
          "name": "BeaconUpgraded",
          "type": "event"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": false,
              "internalType": "uint8",
              "name": "version",
              "type": "uint8"
            }
          ],
          "name": "Initialized",
          "type": "event"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": false,
              "internalType": "uint256[]",
              "name": "members",
              "type": "uint256[]"
            }
          ],
          "name": "MembersAdded",
          "type": "event"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": false,
              "internalType": "uint256[]",
              "name": "members",
              "type": "uint256[]"
            }
          ],
          "name": "MembersRemoved",
          "type": "event"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": true,
              "internalType": "address",
              "name": "definingContract",
              "type": "address"
            }
          ],
          "name": "MembershipContractAnnounced",
          "type": "event"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": true,
              "internalType": "uint256",
              "name": "proposalId",
              "type": "uint256"
            },
            {
              "indexed": true,
              "internalType": "address",
              "name": "creator",
              "type": "address"
            },
            {
              "indexed": false,
              "internalType": "uint64",
              "name": "startDate",
              "type": "uint64"
            },
            {
              "indexed": false,
              "internalType": "uint64",
              "name": "endDate",
              "type": "uint64"
            },
            {
              "indexed": false,
              "internalType": "bytes",
              "name": "metadata",
              "type": "bytes"
            },
            {
              "components": [
                {
                  "internalType": "address",
                  "name": "to",
                  "type": "address"
                },
                {
                  "internalType": "uint256",
                  "name": "value",
                  "type": "uint256"
                },
                {
                  "internalType": "bytes",
                  "name": "data",
                  "type": "bytes"
                }
              ],
              "indexed": false,
              "internalType": "struct IDAO.Action[]",
              "name": "actions",
              "type": "tuple[]"
            },
            {
              "indexed": false,
              "internalType": "uint256",
              "name": "allowFailureMap",
              "type": "uint256"
            }
          ],
          "name": "ProposalCreated",
          "type": "event"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": true,
              "internalType": "uint256",
              "name": "proposalId",
              "type": "uint256"
            }
          ],
          "name": "ProposalExecuted",
          "type": "event"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": false,
              "internalType": "uint256[]",
              "name": "tokens",
              "type": "uint256[]"
            }
          ],
          "name": "TokensAdded",
          "type": "event"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": false,
              "internalType": "uint256[]",
              "name": "tokens",
              "type": "uint256[]"
            }
          ],
          "name": "TokensRemoved",
          "type": "event"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": true,
              "internalType": "address",
              "name": "implementation",
              "type": "address"
            }
          ],
          "name": "Upgraded",
          "type": "event"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": true,
              "internalType": "uint256",
              "name": "proposalId",
              "type": "uint256"
            },
            {
              "indexed": true,
              "internalType": "uint256",
              "name": "voter",
              "type": "uint256"
            },
            {
              "indexed": false,
              "internalType": "enum ITokenMajorityVoting.VoteOption",
              "name": "voteOption",
              "type": "uint8"
            },
            {
              "indexed": false,
              "internalType": "uint256",
              "name": "votingPower",
              "type": "uint256"
            }
          ],
          "name": "VoteCast",
          "type": "event"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": false,
              "internalType": "enum TokenMajorityVotingBase.VotingMode",
              "name": "votingMode",
              "type": "uint8"
            },
            {
              "indexed": false,
              "internalType": "uint32",
              "name": "supportThreshold",
              "type": "uint32"
            },
            {
              "indexed": false,
              "internalType": "uint32",
              "name": "minParticipation",
              "type": "uint32"
            },
            {
              "indexed": false,
              "internalType": "uint64",
              "name": "minDuration",
              "type": "uint64"
            },
            {
              "indexed": false,
              "internalType": "uint256",
              "name": "minProposerVotingPower",
              "type": "uint256"
            }
          ],
          "name": "VotingSettingsUpdated",
          "type": "event"
        },
        {
          "inputs": [],
          "name": "UPDATE_MEMBERS_PERMISSION_ID",
          "outputs": [
            {
              "internalType": "bytes32",
              "name": "",
              "type": "bytes32"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "UPDATE_VOTING_SETTINGS_PERMISSION_ID",
          "outputs": [
            {
              "internalType": "bytes32",
              "name": "",
              "type": "bytes32"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "UPGRADE_PLUGIN_PERMISSION_ID",
          "outputs": [
            {
              "internalType": "bytes32",
              "name": "",
              "type": "bytes32"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "uint256[]",
              "name": "_members",
              "type": "uint256[]"
            }
          ],
          "name": "addMembers",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "uint256",
              "name": "_proposalId",
              "type": "uint256"
            }
          ],
          "name": "canExecute",
          "outputs": [
            {
              "internalType": "bool",
              "name": "",
              "type": "bool"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "uint256",
              "name": "_proposalId",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "_account",
              "type": "uint256"
            },
            {
              "internalType": "enum ITokenMajorityVoting.VoteOption",
              "name": "_voteOption",
              "type": "uint8"
            }
          ],
          "name": "canVote",
          "outputs": [
            {
              "internalType": "bool",
              "name": "",
              "type": "bool"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "bytes",
              "name": "_metadata",
              "type": "bytes"
            },
            {
              "components": [
                {
                  "internalType": "address",
                  "name": "to",
                  "type": "address"
                },
                {
                  "internalType": "uint256",
                  "name": "value",
                  "type": "uint256"
                },
                {
                  "internalType": "bytes",
                  "name": "data",
                  "type": "bytes"
                }
              ],
              "internalType": "struct IDAO.Action[]",
              "name": "_actions",
              "type": "tuple[]"
            },
            {
              "internalType": "uint256",
              "name": "_allowFailureMap",
              "type": "uint256"
            },
            {
              "internalType": "uint64",
              "name": "_startDate",
              "type": "uint64"
            },
            {
              "internalType": "uint64",
              "name": "_endDate",
              "type": "uint64"
            }
          ],
          "name": "createPluginProposal",
          "outputs": [
            {
              "internalType": "uint256",
              "name": "proposalId",
              "type": "uint256"
            }
          ],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "bytes",
              "name": "_metadata",
              "type": "bytes"
            },
            {
              "components": [
                {
                  "internalType": "address",
                  "name": "to",
                  "type": "address"
                },
                {
                  "internalType": "uint256",
                  "name": "value",
                  "type": "uint256"
                },
                {
                  "internalType": "bytes",
                  "name": "data",
                  "type": "bytes"
                }
              ],
              "internalType": "struct IDAO.Action[]",
              "name": "_actions",
              "type": "tuple[]"
            },
            {
              "internalType": "uint256",
              "name": "_allowFailureMap",
              "type": "uint256"
            },
            {
              "internalType": "uint64",
              "name": "_startDate",
              "type": "uint64"
            },
            {
              "internalType": "uint64",
              "name": "_endDate",
              "type": "uint64"
            },
            {
              "internalType": "enum ITokenMajorityVoting.VoteOption",
              "name": "_voteOption",
              "type": "uint8"
            },
            {
              "internalType": "bool",
              "name": "_tryEarlyExecution",
              "type": "bool"
            },
            {
              "internalType": "uint256",
              "name": "_tokenId",
              "type": "uint256"
            }
          ],
          "name": "createProposal",
          "outputs": [
            {
              "internalType": "uint256",
              "name": "proposalId",
              "type": "uint256"
            }
          ],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "dao",
          "outputs": [
            {
              "internalType": "contract IDAO",
              "name": "",
              "type": "address"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "uint256",
              "name": "_proposalId",
              "type": "uint256"
            }
          ],
          "name": "execute",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "uint256",
              "name": "_proposalId",
              "type": "uint256"
            }
          ],
          "name": "getProposal",
          "outputs": [
            {
              "internalType": "bool",
              "name": "open",
              "type": "bool"
            },
            {
              "internalType": "bool",
              "name": "executed",
              "type": "bool"
            },
            {
              "components": [
                {
                  "internalType": "enum TokenMajorityVotingBase.VotingMode",
                  "name": "votingMode",
                  "type": "uint8"
                },
                {
                  "internalType": "uint32",
                  "name": "supportThreshold",
                  "type": "uint32"
                },
                {
                  "internalType": "uint64",
                  "name": "startDate",
                  "type": "uint64"
                },
                {
                  "internalType": "uint64",
                  "name": "endDate",
                  "type": "uint64"
                },
                {
                  "internalType": "uint64",
                  "name": "snapshotBlock",
                  "type": "uint64"
                },
                {
                  "internalType": "uint256",
                  "name": "minVotingPower",
                  "type": "uint256"
                }
              ],
              "internalType": "struct TokenMajorityVotingBase.ProposalParameters",
              "name": "parameters",
              "type": "tuple"
            },
            {
              "components": [
                {
                  "internalType": "uint256",
                  "name": "abstain",
                  "type": "uint256"
                },
                {
                  "internalType": "uint256",
                  "name": "yes",
                  "type": "uint256"
                },
                {
                  "internalType": "uint256",
                  "name": "no",
                  "type": "uint256"
                }
              ],
              "internalType": "struct TokenMajorityVotingBase.Tally",
              "name": "tally",
              "type": "tuple"
            },
            {
              "components": [
                {
                  "internalType": "address",
                  "name": "to",
                  "type": "address"
                },
                {
                  "internalType": "uint256",
                  "name": "value",
                  "type": "uint256"
                },
                {
                  "internalType": "bytes",
                  "name": "data",
                  "type": "bytes"
                }
              ],
              "internalType": "struct IDAO.Action[]",
              "name": "actions",
              "type": "tuple[]"
            },
            {
              "internalType": "uint256",
              "name": "allowFailureMap",
              "type": "uint256"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "uint256",
              "name": "_proposalId",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "_account",
              "type": "uint256"
            }
          ],
          "name": "getVoteOption",
          "outputs": [
            {
              "internalType": "enum ITokenMajorityVoting.VoteOption",
              "name": "",
              "type": "uint8"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "implementation",
          "outputs": [
            {
              "internalType": "address",
              "name": "",
              "type": "address"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "contract IDAO",
              "name": "_dao",
              "type": "address"
            },
            {
              "components": [
                {
                  "internalType": "enum TokenMajorityVotingBase.VotingMode",
                  "name": "votingMode",
                  "type": "uint8"
                },
                {
                  "internalType": "uint32",
                  "name": "supportThreshold",
                  "type": "uint32"
                },
                {
                  "internalType": "uint32",
                  "name": "minParticipation",
                  "type": "uint32"
                },
                {
                  "internalType": "uint64",
                  "name": "minDuration",
                  "type": "uint64"
                },
                {
                  "internalType": "uint256",
                  "name": "minProposerVotingPower",
                  "type": "uint256"
                }
              ],
              "internalType": "struct TokenMajorityVotingBase.VotingSettings",
              "name": "_votingSettings",
              "type": "tuple"
            },
            {
              "internalType": "contract IERC721",
              "name": "_tokenCollection",
              "type": "address"
            },
            {
              "internalType": "uint256[]",
              "name": "_members",
              "type": "uint256[]"
            }
          ],
          "name": "initialize",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "uint256",
              "name": "_tokenId",
              "type": "uint256"
            }
          ],
          "name": "isListed",
          "outputs": [
            {
              "internalType": "bool",
              "name": "",
              "type": "bool"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "uint256",
              "name": "_tokenId",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "_blockNumber",
              "type": "uint256"
            }
          ],
          "name": "isListedAtBlock",
          "outputs": [
            {
              "internalType": "bool",
              "name": "",
              "type": "bool"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "uint256",
              "name": "_account",
              "type": "uint256"
            }
          ],
          "name": "isMember",
          "outputs": [
            {
              "internalType": "bool",
              "name": "",
              "type": "bool"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "uint256",
              "name": "_proposalId",
              "type": "uint256"
            }
          ],
          "name": "isMinParticipationReached",
          "outputs": [
            {
              "internalType": "bool",
              "name": "",
              "type": "bool"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "uint256",
              "name": "_proposalId",
              "type": "uint256"
            }
          ],
          "name": "isSupportThresholdReached",
          "outputs": [
            {
              "internalType": "bool",
              "name": "",
              "type": "bool"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "uint256",
              "name": "_proposalId",
              "type": "uint256"
            }
          ],
          "name": "isSupportThresholdReachedEarly",
          "outputs": [
            {
              "internalType": "bool",
              "name": "",
              "type": "bool"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "minDuration",
          "outputs": [
            {
              "internalType": "uint64",
              "name": "",
              "type": "uint64"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "minParticipation",
          "outputs": [
            {
              "internalType": "uint32",
              "name": "",
              "type": "uint32"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "minProposerVotingPower",
          "outputs": [
            {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "pluginType",
          "outputs": [
            {
              "internalType": "enum IPlugin.PluginType",
              "name": "",
              "type": "uint8"
            }
          ],
          "stateMutability": "pure",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "proposalCount",
          "outputs": [
            {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "proxiableUUID",
          "outputs": [
            {
              "internalType": "bytes32",
              "name": "",
              "type": "bytes32"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "uint256[]",
              "name": "_members",
              "type": "uint256[]"
            }
          ],
          "name": "removeMembers",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "supportThreshold",
          "outputs": [
            {
              "internalType": "uint32",
              "name": "",
              "type": "uint32"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "bytes4",
              "name": "_interfaceId",
              "type": "bytes4"
            }
          ],
          "name": "supportsInterface",
          "outputs": [
            {
              "internalType": "bool",
              "name": "",
              "type": "bool"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "tokenlistLength",
          "outputs": [
            {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "uint256",
              "name": "_blockNumber",
              "type": "uint256"
            }
          ],
          "name": "tokenlistLengthAtBlock",
          "outputs": [
            {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "uint256",
              "name": "_blockNumber",
              "type": "uint256"
            }
          ],
          "name": "totalVotingPower",
          "outputs": [
            {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "components": [
                {
                  "internalType": "enum TokenMajorityVotingBase.VotingMode",
                  "name": "votingMode",
                  "type": "uint8"
                },
                {
                  "internalType": "uint32",
                  "name": "supportThreshold",
                  "type": "uint32"
                },
                {
                  "internalType": "uint32",
                  "name": "minParticipation",
                  "type": "uint32"
                },
                {
                  "internalType": "uint64",
                  "name": "minDuration",
                  "type": "uint64"
                },
                {
                  "internalType": "uint256",
                  "name": "minProposerVotingPower",
                  "type": "uint256"
                }
              ],
              "internalType": "struct TokenMajorityVotingBase.VotingSettings",
              "name": "_votingSettings",
              "type": "tuple"
            }
          ],
          "name": "updateVotingSettings",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "newImplementation",
              "type": "address"
            }
          ],
          "name": "upgradeTo",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "newImplementation",
              "type": "address"
            },
            {
              "internalType": "bytes",
              "name": "data",
              "type": "bytes"
            }
          ],
          "name": "upgradeToAndCall",
          "outputs": [],
          "stateMutability": "payable",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "uint256",
              "name": "_proposalId",
              "type": "uint256"
            },
            {
              "internalType": "enum ITokenMajorityVoting.VoteOption",
              "name": "_voteOption",
              "type": "uint8"
            },
            {
              "internalType": "bool",
              "name": "_tryEarlyExecution",
              "type": "bool"
            },
            {
              "internalType": "uint256",
              "name": "_tokenId",
              "type": "uint256"
            }
          ],
          "name": "vote",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "votingMode",
          "outputs": [
            {
              "internalType": "enum TokenMajorityVotingBase.VotingMode",
              "name": "",
              "type": "uint8"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        }
      ]
    },
    "community_dao": {
      "address": "0xf41E67AE497A3F25a57EaE5190E06a045B5A67c0",
      "abi": [
        {
          "inputs": [],
          "stateMutability": "nonpayable",
          "type": "constructor"
        },
        {
          "inputs": [
            {
              "internalType": "uint256",
              "name": "index",
              "type": "uint256"
            }
          ],
          "name": "ActionFailed",
          "type": "error"
        },
        {
          "inputs": [],
          "name": "AnyAddressDisallowedForWhoAndWhere",
          "type": "error"
        },
        {
          "inputs": [
            {
              "internalType": "contract IPermissionCondition",
              "name": "condition",
              "type": "address"
            }
          ],
          "name": "ConditionInterfacNotSupported",
          "type": "error"
        },
        {
          "inputs": [
            {
              "internalType": "contract IPermissionCondition",
              "name": "condition",
              "type": "address"
            }
          ],
          "name": "ConditionNotAContract",
          "type": "error"
        },
        {
          "inputs": [],
          "name": "GrantWithConditionNotSupported",
          "type": "error"
        },
        {
          "inputs": [],
          "name": "InsufficientGas",
          "type": "error"
        },
        {
          "inputs": [
            {
              "internalType": "uint256",
              "name": "expected",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "actual",
              "type": "uint256"
            }
          ],
          "name": "NativeTokenDepositAmountMismatch",
          "type": "error"
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "where",
              "type": "address"
            },
            {
              "internalType": "address",
              "name": "who",
              "type": "address"
            },
            {
              "internalType": "bytes32",
              "name": "permissionId",
              "type": "bytes32"
            },
            {
              "internalType": "address",
              "name": "currentCondition",
              "type": "address"
            },
            {
              "internalType": "address",
              "name": "newCondition",
              "type": "address"
            }
          ],
          "name": "PermissionAlreadyGrantedForDifferentCondition",
          "type": "error"
        },
        {
          "inputs": [],
          "name": "PermissionsForAnyAddressDisallowed",
          "type": "error"
        },
        {
          "inputs": [
            {
              "internalType": "uint8[3]",
              "name": "protocolVersion",
              "type": "uint8[3]"
            }
          ],
          "name": "ProtocolVersionUpgradeNotSupported",
          "type": "error"
        },
        {
          "inputs": [],
          "name": "ReentrantCall",
          "type": "error"
        },
        {
          "inputs": [],
          "name": "TooManyActions",
          "type": "error"
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "where",
              "type": "address"
            },
            {
              "internalType": "address",
              "name": "who",
              "type": "address"
            },
            {
              "internalType": "bytes32",
              "name": "permissionId",
              "type": "bytes32"
            }
          ],
          "name": "Unauthorized",
          "type": "error"
        },
        {
          "inputs": [
            {
              "internalType": "bytes4",
              "name": "callbackSelector",
              "type": "bytes4"
            },
            {
              "internalType": "bytes4",
              "name": "magicNumber",
              "type": "bytes4"
            }
          ],
          "name": "UnkownCallback",
          "type": "error"
        },
        {
          "inputs": [],
          "name": "ZeroAmount",
          "type": "error"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": false,
              "internalType": "address",
              "name": "previousAdmin",
              "type": "address"
            },
            {
              "indexed": false,
              "internalType": "address",
              "name": "newAdmin",
              "type": "address"
            }
          ],
          "name": "AdminChanged",
          "type": "event"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": true,
              "internalType": "address",
              "name": "beacon",
              "type": "address"
            }
          ],
          "name": "BeaconUpgraded",
          "type": "event"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": false,
              "internalType": "address",
              "name": "sender",
              "type": "address"
            },
            {
              "indexed": true,
              "internalType": "bytes4",
              "name": "sig",
              "type": "bytes4"
            },
            {
              "indexed": false,
              "internalType": "bytes",
              "name": "data",
              "type": "bytes"
            }
          ],
          "name": "CallbackReceived",
          "type": "event"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": true,
              "internalType": "address",
              "name": "sender",
              "type": "address"
            },
            {
              "indexed": true,
              "internalType": "address",
              "name": "token",
              "type": "address"
            },
            {
              "indexed": false,
              "internalType": "uint256",
              "name": "amount",
              "type": "uint256"
            },
            {
              "indexed": false,
              "internalType": "string",
              "name": "_reference",
              "type": "string"
            }
          ],
          "name": "Deposited",
          "type": "event"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": true,
              "internalType": "address",
              "name": "actor",
              "type": "address"
            },
            {
              "indexed": false,
              "internalType": "bytes32",
              "name": "callId",
              "type": "bytes32"
            },
            {
              "components": [
                {
                  "internalType": "address",
                  "name": "to",
                  "type": "address"
                },
                {
                  "internalType": "uint256",
                  "name": "value",
                  "type": "uint256"
                },
                {
                  "internalType": "bytes",
                  "name": "data",
                  "type": "bytes"
                }
              ],
              "indexed": false,
              "internalType": "struct IDAO.Action[]",
              "name": "actions",
              "type": "tuple[]"
            },
            {
              "indexed": false,
              "internalType": "uint256",
              "name": "allowFailureMap",
              "type": "uint256"
            },
            {
              "indexed": false,
              "internalType": "uint256",
              "name": "failureMap",
              "type": "uint256"
            },
            {
              "indexed": false,
              "internalType": "bytes[]",
              "name": "execResults",
              "type": "bytes[]"
            }
          ],
          "name": "Executed",
          "type": "event"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": true,
              "internalType": "bytes32",
              "name": "permissionId",
              "type": "bytes32"
            },
            {
              "indexed": true,
              "internalType": "address",
              "name": "here",
              "type": "address"
            },
            {
              "indexed": false,
              "internalType": "address",
              "name": "where",
              "type": "address"
            },
            {
              "indexed": true,
              "internalType": "address",
              "name": "who",
              "type": "address"
            },
            {
              "indexed": false,
              "internalType": "address",
              "name": "condition",
              "type": "address"
            }
          ],
          "name": "Granted",
          "type": "event"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": false,
              "internalType": "uint8",
              "name": "version",
              "type": "uint8"
            }
          ],
          "name": "Initialized",
          "type": "event"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": false,
              "internalType": "bytes",
              "name": "metadata",
              "type": "bytes"
            }
          ],
          "name": "MetadataSet",
          "type": "event"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": false,
              "internalType": "address",
              "name": "sender",
              "type": "address"
            },
            {
              "indexed": false,
              "internalType": "uint256",
              "name": "amount",
              "type": "uint256"
            }
          ],
          "name": "NativeTokenDeposited",
          "type": "event"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": false,
              "internalType": "string",
              "name": "daoURI",
              "type": "string"
            }
          ],
          "name": "NewURI",
          "type": "event"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": true,
              "internalType": "bytes32",
              "name": "permissionId",
              "type": "bytes32"
            },
            {
              "indexed": true,
              "internalType": "address",
              "name": "here",
              "type": "address"
            },
            {
              "indexed": false,
              "internalType": "address",
              "name": "where",
              "type": "address"
            },
            {
              "indexed": true,
              "internalType": "address",
              "name": "who",
              "type": "address"
            }
          ],
          "name": "Revoked",
          "type": "event"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": false,
              "internalType": "address",
              "name": "signatureValidator",
              "type": "address"
            }
          ],
          "name": "SignatureValidatorSet",
          "type": "event"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": false,
              "internalType": "bytes4",
              "name": "interfaceId",
              "type": "bytes4"
            },
            {
              "indexed": false,
              "internalType": "bytes4",
              "name": "callbackSelector",
              "type": "bytes4"
            },
            {
              "indexed": false,
              "internalType": "bytes4",
              "name": "magicNumber",
              "type": "bytes4"
            }
          ],
          "name": "StandardCallbackRegistered",
          "type": "event"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": false,
              "internalType": "address",
              "name": "forwarder",
              "type": "address"
            }
          ],
          "name": "TrustedForwarderSet",
          "type": "event"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": true,
              "internalType": "address",
              "name": "implementation",
              "type": "address"
            }
          ],
          "name": "Upgraded",
          "type": "event"
        },
        {
          "stateMutability": "nonpayable",
          "type": "fallback"
        },
        {
          "inputs": [],
          "name": "EXECUTE_PERMISSION_ID",
          "outputs": [
            {
              "internalType": "bytes32",
              "name": "",
              "type": "bytes32"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "REGISTER_STANDARD_CALLBACK_PERMISSION_ID",
          "outputs": [
            {
              "internalType": "bytes32",
              "name": "",
              "type": "bytes32"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "ROOT_PERMISSION_ID",
          "outputs": [
            {
              "internalType": "bytes32",
              "name": "",
              "type": "bytes32"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "SET_METADATA_PERMISSION_ID",
          "outputs": [
            {
              "internalType": "bytes32",
              "name": "",
              "type": "bytes32"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "SET_SIGNATURE_VALIDATOR_PERMISSION_ID",
          "outputs": [
            {
              "internalType": "bytes32",
              "name": "",
              "type": "bytes32"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "SET_TRUSTED_FORWARDER_PERMISSION_ID",
          "outputs": [
            {
              "internalType": "bytes32",
              "name": "",
              "type": "bytes32"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "UPGRADE_DAO_PERMISSION_ID",
          "outputs": [
            {
              "internalType": "bytes32",
              "name": "",
              "type": "bytes32"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "components": [
                {
                  "internalType": "enum PermissionLib.Operation",
                  "name": "operation",
                  "type": "uint8"
                },
                {
                  "internalType": "address",
                  "name": "where",
                  "type": "address"
                },
                {
                  "internalType": "address",
                  "name": "who",
                  "type": "address"
                },
                {
                  "internalType": "address",
                  "name": "condition",
                  "type": "address"
                },
                {
                  "internalType": "bytes32",
                  "name": "permissionId",
                  "type": "bytes32"
                }
              ],
              "internalType": "struct PermissionLib.MultiTargetPermission[]",
              "name": "_items",
              "type": "tuple[]"
            }
          ],
          "name": "applyMultiTargetPermissions",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "_where",
              "type": "address"
            },
            {
              "components": [
                {
                  "internalType": "enum PermissionLib.Operation",
                  "name": "operation",
                  "type": "uint8"
                },
                {
                  "internalType": "address",
                  "name": "who",
                  "type": "address"
                },
                {
                  "internalType": "bytes32",
                  "name": "permissionId",
                  "type": "bytes32"
                }
              ],
              "internalType": "struct PermissionLib.SingleTargetPermission[]",
              "name": "items",
              "type": "tuple[]"
            }
          ],
          "name": "applySingleTargetPermissions",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "daoURI",
          "outputs": [
            {
              "internalType": "string",
              "name": "",
              "type": "string"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "_token",
              "type": "address"
            },
            {
              "internalType": "uint256",
              "name": "_amount",
              "type": "uint256"
            },
            {
              "internalType": "string",
              "name": "_reference",
              "type": "string"
            }
          ],
          "name": "deposit",
          "outputs": [],
          "stateMutability": "payable",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "bytes32",
              "name": "_callId",
              "type": "bytes32"
            },
            {
              "components": [
                {
                  "internalType": "address",
                  "name": "to",
                  "type": "address"
                },
                {
                  "internalType": "uint256",
                  "name": "value",
                  "type": "uint256"
                },
                {
                  "internalType": "bytes",
                  "name": "data",
                  "type": "bytes"
                }
              ],
              "internalType": "struct IDAO.Action[]",
              "name": "_actions",
              "type": "tuple[]"
            },
            {
              "internalType": "uint256",
              "name": "_allowFailureMap",
              "type": "uint256"
            }
          ],
          "name": "execute",
          "outputs": [
            {
              "internalType": "bytes[]",
              "name": "execResults",
              "type": "bytes[]"
            },
            {
              "internalType": "uint256",
              "name": "failureMap",
              "type": "uint256"
            }
          ],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "getTrustedForwarder",
          "outputs": [
            {
              "internalType": "address",
              "name": "",
              "type": "address"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "_where",
              "type": "address"
            },
            {
              "internalType": "address",
              "name": "_who",
              "type": "address"
            },
            {
              "internalType": "bytes32",
              "name": "_permissionId",
              "type": "bytes32"
            }
          ],
          "name": "grant",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "_where",
              "type": "address"
            },
            {
              "internalType": "address",
              "name": "_who",
              "type": "address"
            },
            {
              "internalType": "bytes32",
              "name": "_permissionId",
              "type": "bytes32"
            },
            {
              "internalType": "contract IPermissionCondition",
              "name": "_condition",
              "type": "address"
            }
          ],
          "name": "grantWithCondition",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "_where",
              "type": "address"
            },
            {
              "internalType": "address",
              "name": "_who",
              "type": "address"
            },
            {
              "internalType": "bytes32",
              "name": "_permissionId",
              "type": "bytes32"
            },
            {
              "internalType": "bytes",
              "name": "_data",
              "type": "bytes"
            }
          ],
          "name": "hasPermission",
          "outputs": [
            {
              "internalType": "bool",
              "name": "",
              "type": "bool"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "bytes",
              "name": "_metadata",
              "type": "bytes"
            },
            {
              "internalType": "address",
              "name": "_initialOwner",
              "type": "address"
            },
            {
              "internalType": "address",
              "name": "_trustedForwarder",
              "type": "address"
            },
            {
              "internalType": "string",
              "name": "daoURI_",
              "type": "string"
            }
          ],
          "name": "initialize",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "uint8[3]",
              "name": "_previousProtocolVersion",
              "type": "uint8[3]"
            },
            {
              "internalType": "bytes",
              "name": "_initData",
              "type": "bytes"
            }
          ],
          "name": "initializeFrom",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "_where",
              "type": "address"
            },
            {
              "internalType": "address",
              "name": "_who",
              "type": "address"
            },
            {
              "internalType": "bytes32",
              "name": "_permissionId",
              "type": "bytes32"
            },
            {
              "internalType": "bytes",
              "name": "_data",
              "type": "bytes"
            }
          ],
          "name": "isGranted",
          "outputs": [
            {
              "internalType": "bool",
              "name": "",
              "type": "bool"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "bytes32",
              "name": "_hash",
              "type": "bytes32"
            },
            {
              "internalType": "bytes",
              "name": "_signature",
              "type": "bytes"
            }
          ],
          "name": "isValidSignature",
          "outputs": [
            {
              "internalType": "bytes4",
              "name": "",
              "type": "bytes4"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "protocolVersion",
          "outputs": [
            {
              "internalType": "uint8[3]",
              "name": "",
              "type": "uint8[3]"
            }
          ],
          "stateMutability": "pure",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "proxiableUUID",
          "outputs": [
            {
              "internalType": "bytes32",
              "name": "",
              "type": "bytes32"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "bytes4",
              "name": "_interfaceId",
              "type": "bytes4"
            },
            {
              "internalType": "bytes4",
              "name": "_callbackSelector",
              "type": "bytes4"
            },
            {
              "internalType": "bytes4",
              "name": "_magicNumber",
              "type": "bytes4"
            }
          ],
          "name": "registerStandardCallback",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "_where",
              "type": "address"
            },
            {
              "internalType": "address",
              "name": "_who",
              "type": "address"
            },
            {
              "internalType": "bytes32",
              "name": "_permissionId",
              "type": "bytes32"
            }
          ],
          "name": "revoke",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "string",
              "name": "newDaoURI",
              "type": "string"
            }
          ],
          "name": "setDaoURI",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "bytes",
              "name": "_metadata",
              "type": "bytes"
            }
          ],
          "name": "setMetadata",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "_signatureValidator",
              "type": "address"
            }
          ],
          "name": "setSignatureValidator",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "_newTrustedForwarder",
              "type": "address"
            }
          ],
          "name": "setTrustedForwarder",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "signatureValidator",
          "outputs": [
            {
              "internalType": "contract IERC1271",
              "name": "",
              "type": "address"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "bytes4",
              "name": "interfaceId",
              "type": "bytes4"
            }
          ],
          "name": "supportsInterface",
          "outputs": [
            {
              "internalType": "bool",
              "name": "",
              "type": "bool"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "newImplementation",
              "type": "address"
            }
          ],
          "name": "upgradeTo",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "newImplementation",
              "type": "address"
            },
            {
              "internalType": "bytes",
              "name": "data",
              "type": "bytes"
            }
          ],
          "name": "upgradeToAndCall",
          "outputs": [],
          "stateMutability": "payable",
          "type": "function"
        },
        {
          "stateMutability": "payable",
          "type": "receive"
        }
      ]
    },
    "community_tokenListGovernance": {
      "address": "0x45cBeB05577770E9a686B3DB1b91db54839267bc",
      "abi": [
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "dao",
              "type": "address"
            },
            {
              "internalType": "address",
              "name": "where",
              "type": "address"
            },
            {
              "internalType": "address",
              "name": "who",
              "type": "address"
            },
            {
              "internalType": "bytes32",
              "name": "permissionId",
              "type": "bytes32"
            }
          ],
          "name": "DaoUnauthorized",
          "type": "error"
        },
        {
          "inputs": [
            {
              "internalType": "uint64",
              "name": "limit",
              "type": "uint64"
            },
            {
              "internalType": "uint64",
              "name": "actual",
              "type": "uint64"
            }
          ],
          "name": "DateOutOfBounds",
          "type": "error"
        },
        {
          "inputs": [
            {
              "internalType": "uint256",
              "name": "tokenId",
              "type": "uint256"
            }
          ],
          "name": "InvalidTokenlistUpdate",
          "type": "error"
        },
        {
          "inputs": [
            {
              "internalType": "uint64",
              "name": "limit",
              "type": "uint64"
            },
            {
              "internalType": "uint64",
              "name": "actual",
              "type": "uint64"
            }
          ],
          "name": "MinDurationOutOfBounds",
          "type": "error"
        },
        {
          "inputs": [
            {
              "internalType": "uint256",
              "name": "sender",
              "type": "uint256"
            }
          ],
          "name": "ProposalCreationForbidden",
          "type": "error"
        },
        {
          "inputs": [
            {
              "internalType": "uint256",
              "name": "proposalId",
              "type": "uint256"
            }
          ],
          "name": "ProposalExecutionForbidden",
          "type": "error"
        },
        {
          "inputs": [
            {
              "internalType": "uint256",
              "name": "limit",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "actual",
              "type": "uint256"
            }
          ],
          "name": "RatioOutOfBounds",
          "type": "error"
        },
        {
          "inputs": [
            {
              "internalType": "uint256",
              "name": "tokenId",
              "type": "uint256"
            },
            {
              "internalType": "address",
              "name": "sender",
              "type": "address"
            }
          ],
          "name": "TokenNotOwnedBySender",
          "type": "error"
        },
        {
          "inputs": [
            {
              "internalType": "uint256",
              "name": "proposalId",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "account",
              "type": "uint256"
            },
            {
              "internalType": "enum ITokenMajorityVoting.VoteOption",
              "name": "voteOption",
              "type": "uint8"
            }
          ],
          "name": "VoteCastForbidden",
          "type": "error"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": false,
              "internalType": "address",
              "name": "previousAdmin",
              "type": "address"
            },
            {
              "indexed": false,
              "internalType": "address",
              "name": "newAdmin",
              "type": "address"
            }
          ],
          "name": "AdminChanged",
          "type": "event"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": true,
              "internalType": "address",
              "name": "beacon",
              "type": "address"
            }
          ],
          "name": "BeaconUpgraded",
          "type": "event"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": false,
              "internalType": "uint8",
              "name": "version",
              "type": "uint8"
            }
          ],
          "name": "Initialized",
          "type": "event"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": false,
              "internalType": "uint256[]",
              "name": "members",
              "type": "uint256[]"
            }
          ],
          "name": "MembersAdded",
          "type": "event"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": false,
              "internalType": "uint256[]",
              "name": "members",
              "type": "uint256[]"
            }
          ],
          "name": "MembersRemoved",
          "type": "event"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": true,
              "internalType": "address",
              "name": "definingContract",
              "type": "address"
            }
          ],
          "name": "MembershipContractAnnounced",
          "type": "event"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": true,
              "internalType": "uint256",
              "name": "proposalId",
              "type": "uint256"
            },
            {
              "indexed": true,
              "internalType": "address",
              "name": "creator",
              "type": "address"
            },
            {
              "indexed": false,
              "internalType": "uint64",
              "name": "startDate",
              "type": "uint64"
            },
            {
              "indexed": false,
              "internalType": "uint64",
              "name": "endDate",
              "type": "uint64"
            },
            {
              "indexed": false,
              "internalType": "bytes",
              "name": "metadata",
              "type": "bytes"
            },
            {
              "components": [
                {
                  "internalType": "address",
                  "name": "to",
                  "type": "address"
                },
                {
                  "internalType": "uint256",
                  "name": "value",
                  "type": "uint256"
                },
                {
                  "internalType": "bytes",
                  "name": "data",
                  "type": "bytes"
                }
              ],
              "indexed": false,
              "internalType": "struct IDAO.Action[]",
              "name": "actions",
              "type": "tuple[]"
            },
            {
              "indexed": false,
              "internalType": "uint256",
              "name": "allowFailureMap",
              "type": "uint256"
            }
          ],
          "name": "ProposalCreated",
          "type": "event"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": true,
              "internalType": "uint256",
              "name": "proposalId",
              "type": "uint256"
            }
          ],
          "name": "ProposalExecuted",
          "type": "event"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": false,
              "internalType": "uint256[]",
              "name": "tokens",
              "type": "uint256[]"
            }
          ],
          "name": "TokensAdded",
          "type": "event"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": false,
              "internalType": "uint256[]",
              "name": "tokens",
              "type": "uint256[]"
            }
          ],
          "name": "TokensRemoved",
          "type": "event"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": true,
              "internalType": "address",
              "name": "implementation",
              "type": "address"
            }
          ],
          "name": "Upgraded",
          "type": "event"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": true,
              "internalType": "uint256",
              "name": "proposalId",
              "type": "uint256"
            },
            {
              "indexed": true,
              "internalType": "uint256",
              "name": "voter",
              "type": "uint256"
            },
            {
              "indexed": false,
              "internalType": "enum ITokenMajorityVoting.VoteOption",
              "name": "voteOption",
              "type": "uint8"
            },
            {
              "indexed": false,
              "internalType": "uint256",
              "name": "votingPower",
              "type": "uint256"
            }
          ],
          "name": "VoteCast",
          "type": "event"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": false,
              "internalType": "enum TokenMajorityVotingBase.VotingMode",
              "name": "votingMode",
              "type": "uint8"
            },
            {
              "indexed": false,
              "internalType": "uint32",
              "name": "supportThreshold",
              "type": "uint32"
            },
            {
              "indexed": false,
              "internalType": "uint32",
              "name": "minParticipation",
              "type": "uint32"
            },
            {
              "indexed": false,
              "internalType": "uint64",
              "name": "minDuration",
              "type": "uint64"
            },
            {
              "indexed": false,
              "internalType": "uint256",
              "name": "minProposerVotingPower",
              "type": "uint256"
            }
          ],
          "name": "VotingSettingsUpdated",
          "type": "event"
        },
        {
          "inputs": [],
          "name": "UPDATE_MEMBERS_PERMISSION_ID",
          "outputs": [
            {
              "internalType": "bytes32",
              "name": "",
              "type": "bytes32"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "UPDATE_VOTING_SETTINGS_PERMISSION_ID",
          "outputs": [
            {
              "internalType": "bytes32",
              "name": "",
              "type": "bytes32"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "UPGRADE_PLUGIN_PERMISSION_ID",
          "outputs": [
            {
              "internalType": "bytes32",
              "name": "",
              "type": "bytes32"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "uint256[]",
              "name": "_members",
              "type": "uint256[]"
            }
          ],
          "name": "addMembers",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "uint256",
              "name": "_proposalId",
              "type": "uint256"
            }
          ],
          "name": "canExecute",
          "outputs": [
            {
              "internalType": "bool",
              "name": "",
              "type": "bool"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "uint256",
              "name": "_proposalId",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "_account",
              "type": "uint256"
            },
            {
              "internalType": "enum ITokenMajorityVoting.VoteOption",
              "name": "_voteOption",
              "type": "uint8"
            }
          ],
          "name": "canVote",
          "outputs": [
            {
              "internalType": "bool",
              "name": "",
              "type": "bool"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "bytes",
              "name": "_metadata",
              "type": "bytes"
            },
            {
              "components": [
                {
                  "internalType": "address",
                  "name": "to",
                  "type": "address"
                },
                {
                  "internalType": "uint256",
                  "name": "value",
                  "type": "uint256"
                },
                {
                  "internalType": "bytes",
                  "name": "data",
                  "type": "bytes"
                }
              ],
              "internalType": "struct IDAO.Action[]",
              "name": "_actions",
              "type": "tuple[]"
            },
            {
              "internalType": "uint256",
              "name": "_allowFailureMap",
              "type": "uint256"
            },
            {
              "internalType": "uint64",
              "name": "_startDate",
              "type": "uint64"
            },
            {
              "internalType": "uint64",
              "name": "_endDate",
              "type": "uint64"
            }
          ],
          "name": "createPluginProposal",
          "outputs": [
            {
              "internalType": "uint256",
              "name": "proposalId",
              "type": "uint256"
            }
          ],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "bytes",
              "name": "_metadata",
              "type": "bytes"
            },
            {
              "components": [
                {
                  "internalType": "address",
                  "name": "to",
                  "type": "address"
                },
                {
                  "internalType": "uint256",
                  "name": "value",
                  "type": "uint256"
                },
                {
                  "internalType": "bytes",
                  "name": "data",
                  "type": "bytes"
                }
              ],
              "internalType": "struct IDAO.Action[]",
              "name": "_actions",
              "type": "tuple[]"
            },
            {
              "internalType": "uint256",
              "name": "_allowFailureMap",
              "type": "uint256"
            },
            {
              "internalType": "uint64",
              "name": "_startDate",
              "type": "uint64"
            },
            {
              "internalType": "uint64",
              "name": "_endDate",
              "type": "uint64"
            },
            {
              "internalType": "enum ITokenMajorityVoting.VoteOption",
              "name": "_voteOption",
              "type": "uint8"
            },
            {
              "internalType": "bool",
              "name": "_tryEarlyExecution",
              "type": "bool"
            },
            {
              "internalType": "uint256",
              "name": "_tokenId",
              "type": "uint256"
            }
          ],
          "name": "createProposal",
          "outputs": [
            {
              "internalType": "uint256",
              "name": "proposalId",
              "type": "uint256"
            }
          ],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "dao",
          "outputs": [
            {
              "internalType": "contract IDAO",
              "name": "",
              "type": "address"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "uint256",
              "name": "_proposalId",
              "type": "uint256"
            }
          ],
          "name": "execute",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "uint256",
              "name": "_proposalId",
              "type": "uint256"
            }
          ],
          "name": "getProposal",
          "outputs": [
            {
              "internalType": "bool",
              "name": "open",
              "type": "bool"
            },
            {
              "internalType": "bool",
              "name": "executed",
              "type": "bool"
            },
            {
              "components": [
                {
                  "internalType": "enum TokenMajorityVotingBase.VotingMode",
                  "name": "votingMode",
                  "type": "uint8"
                },
                {
                  "internalType": "uint32",
                  "name": "supportThreshold",
                  "type": "uint32"
                },
                {
                  "internalType": "uint64",
                  "name": "startDate",
                  "type": "uint64"
                },
                {
                  "internalType": "uint64",
                  "name": "endDate",
                  "type": "uint64"
                },
                {
                  "internalType": "uint64",
                  "name": "snapshotBlock",
                  "type": "uint64"
                },
                {
                  "internalType": "uint256",
                  "name": "minVotingPower",
                  "type": "uint256"
                }
              ],
              "internalType": "struct TokenMajorityVotingBase.ProposalParameters",
              "name": "parameters",
              "type": "tuple"
            },
            {
              "components": [
                {
                  "internalType": "uint256",
                  "name": "abstain",
                  "type": "uint256"
                },
                {
                  "internalType": "uint256",
                  "name": "yes",
                  "type": "uint256"
                },
                {
                  "internalType": "uint256",
                  "name": "no",
                  "type": "uint256"
                }
              ],
              "internalType": "struct TokenMajorityVotingBase.Tally",
              "name": "tally",
              "type": "tuple"
            },
            {
              "components": [
                {
                  "internalType": "address",
                  "name": "to",
                  "type": "address"
                },
                {
                  "internalType": "uint256",
                  "name": "value",
                  "type": "uint256"
                },
                {
                  "internalType": "bytes",
                  "name": "data",
                  "type": "bytes"
                }
              ],
              "internalType": "struct IDAO.Action[]",
              "name": "actions",
              "type": "tuple[]"
            },
            {
              "internalType": "uint256",
              "name": "allowFailureMap",
              "type": "uint256"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "uint256",
              "name": "_proposalId",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "_account",
              "type": "uint256"
            }
          ],
          "name": "getVoteOption",
          "outputs": [
            {
              "internalType": "enum ITokenMajorityVoting.VoteOption",
              "name": "",
              "type": "uint8"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "implementation",
          "outputs": [
            {
              "internalType": "address",
              "name": "",
              "type": "address"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "contract IDAO",
              "name": "_dao",
              "type": "address"
            },
            {
              "components": [
                {
                  "internalType": "enum TokenMajorityVotingBase.VotingMode",
                  "name": "votingMode",
                  "type": "uint8"
                },
                {
                  "internalType": "uint32",
                  "name": "supportThreshold",
                  "type": "uint32"
                },
                {
                  "internalType": "uint32",
                  "name": "minParticipation",
                  "type": "uint32"
                },
                {
                  "internalType": "uint64",
                  "name": "minDuration",
                  "type": "uint64"
                },
                {
                  "internalType": "uint256",
                  "name": "minProposerVotingPower",
                  "type": "uint256"
                }
              ],
              "internalType": "struct TokenMajorityVotingBase.VotingSettings",
              "name": "_votingSettings",
              "type": "tuple"
            },
            {
              "internalType": "contract IERC721",
              "name": "_tokenCollection",
              "type": "address"
            },
            {
              "internalType": "uint256[]",
              "name": "_members",
              "type": "uint256[]"
            }
          ],
          "name": "initialize",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "uint256",
              "name": "_tokenId",
              "type": "uint256"
            }
          ],
          "name": "isListed",
          "outputs": [
            {
              "internalType": "bool",
              "name": "",
              "type": "bool"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "uint256",
              "name": "_tokenId",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "_blockNumber",
              "type": "uint256"
            }
          ],
          "name": "isListedAtBlock",
          "outputs": [
            {
              "internalType": "bool",
              "name": "",
              "type": "bool"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "uint256",
              "name": "_account",
              "type": "uint256"
            }
          ],
          "name": "isMember",
          "outputs": [
            {
              "internalType": "bool",
              "name": "",
              "type": "bool"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "uint256",
              "name": "_proposalId",
              "type": "uint256"
            }
          ],
          "name": "isMinParticipationReached",
          "outputs": [
            {
              "internalType": "bool",
              "name": "",
              "type": "bool"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "uint256",
              "name": "_proposalId",
              "type": "uint256"
            }
          ],
          "name": "isSupportThresholdReached",
          "outputs": [
            {
              "internalType": "bool",
              "name": "",
              "type": "bool"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "uint256",
              "name": "_proposalId",
              "type": "uint256"
            }
          ],
          "name": "isSupportThresholdReachedEarly",
          "outputs": [
            {
              "internalType": "bool",
              "name": "",
              "type": "bool"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "minDuration",
          "outputs": [
            {
              "internalType": "uint64",
              "name": "",
              "type": "uint64"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "minParticipation",
          "outputs": [
            {
              "internalType": "uint32",
              "name": "",
              "type": "uint32"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "minProposerVotingPower",
          "outputs": [
            {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "pluginType",
          "outputs": [
            {
              "internalType": "enum IPlugin.PluginType",
              "name": "",
              "type": "uint8"
            }
          ],
          "stateMutability": "pure",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "proposalCount",
          "outputs": [
            {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "proxiableUUID",
          "outputs": [
            {
              "internalType": "bytes32",
              "name": "",
              "type": "bytes32"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "uint256[]",
              "name": "_members",
              "type": "uint256[]"
            }
          ],
          "name": "removeMembers",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "supportThreshold",
          "outputs": [
            {
              "internalType": "uint32",
              "name": "",
              "type": "uint32"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "bytes4",
              "name": "_interfaceId",
              "type": "bytes4"
            }
          ],
          "name": "supportsInterface",
          "outputs": [
            {
              "internalType": "bool",
              "name": "",
              "type": "bool"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "tokenlistLength",
          "outputs": [
            {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "uint256",
              "name": "_blockNumber",
              "type": "uint256"
            }
          ],
          "name": "tokenlistLengthAtBlock",
          "outputs": [
            {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "uint256",
              "name": "_blockNumber",
              "type": "uint256"
            }
          ],
          "name": "totalVotingPower",
          "outputs": [
            {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "components": [
                {
                  "internalType": "enum TokenMajorityVotingBase.VotingMode",
                  "name": "votingMode",
                  "type": "uint8"
                },
                {
                  "internalType": "uint32",
                  "name": "supportThreshold",
                  "type": "uint32"
                },
                {
                  "internalType": "uint32",
                  "name": "minParticipation",
                  "type": "uint32"
                },
                {
                  "internalType": "uint64",
                  "name": "minDuration",
                  "type": "uint64"
                },
                {
                  "internalType": "uint256",
                  "name": "minProposerVotingPower",
                  "type": "uint256"
                }
              ],
              "internalType": "struct TokenMajorityVotingBase.VotingSettings",
              "name": "_votingSettings",
              "type": "tuple"
            }
          ],
          "name": "updateVotingSettings",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "newImplementation",
              "type": "address"
            }
          ],
          "name": "upgradeTo",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "newImplementation",
              "type": "address"
            },
            {
              "internalType": "bytes",
              "name": "data",
              "type": "bytes"
            }
          ],
          "name": "upgradeToAndCall",
          "outputs": [],
          "stateMutability": "payable",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "uint256",
              "name": "_proposalId",
              "type": "uint256"
            },
            {
              "internalType": "enum ITokenMajorityVoting.VoteOption",
              "name": "_voteOption",
              "type": "uint8"
            },
            {
              "internalType": "bool",
              "name": "_tryEarlyExecution",
              "type": "bool"
            },
            {
              "internalType": "uint256",
              "name": "_tokenId",
              "type": "uint256"
            }
          ],
          "name": "vote",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "votingMode",
          "outputs": [
            {
              "internalType": "enum TokenMajorityVotingBase.VotingMode",
              "name": "",
              "type": "uint8"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        }
      ]
    },
    "data_dao": {
      "address": "0x91858aA5cCEe48Bb62EeB401D9180C565d63A0d5",
      "abi": [
        {
          "inputs": [],
          "stateMutability": "nonpayable",
          "type": "constructor"
        },
        {
          "inputs": [
            {
              "internalType": "uint256",
              "name": "index",
              "type": "uint256"
            }
          ],
          "name": "ActionFailed",
          "type": "error"
        },
        {
          "inputs": [],
          "name": "AnyAddressDisallowedForWhoAndWhere",
          "type": "error"
        },
        {
          "inputs": [
            {
              "internalType": "contract IPermissionCondition",
              "name": "condition",
              "type": "address"
            }
          ],
          "name": "ConditionInterfacNotSupported",
          "type": "error"
        },
        {
          "inputs": [
            {
              "internalType": "contract IPermissionCondition",
              "name": "condition",
              "type": "address"
            }
          ],
          "name": "ConditionNotAContract",
          "type": "error"
        },
        {
          "inputs": [],
          "name": "GrantWithConditionNotSupported",
          "type": "error"
        },
        {
          "inputs": [],
          "name": "InsufficientGas",
          "type": "error"
        },
        {
          "inputs": [
            {
              "internalType": "uint256",
              "name": "expected",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "actual",
              "type": "uint256"
            }
          ],
          "name": "NativeTokenDepositAmountMismatch",
          "type": "error"
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "where",
              "type": "address"
            },
            {
              "internalType": "address",
              "name": "who",
              "type": "address"
            },
            {
              "internalType": "bytes32",
              "name": "permissionId",
              "type": "bytes32"
            },
            {
              "internalType": "address",
              "name": "currentCondition",
              "type": "address"
            },
            {
              "internalType": "address",
              "name": "newCondition",
              "type": "address"
            }
          ],
          "name": "PermissionAlreadyGrantedForDifferentCondition",
          "type": "error"
        },
        {
          "inputs": [],
          "name": "PermissionsForAnyAddressDisallowed",
          "type": "error"
        },
        {
          "inputs": [
            {
              "internalType": "uint8[3]",
              "name": "protocolVersion",
              "type": "uint8[3]"
            }
          ],
          "name": "ProtocolVersionUpgradeNotSupported",
          "type": "error"
        },
        {
          "inputs": [],
          "name": "ReentrantCall",
          "type": "error"
        },
        {
          "inputs": [],
          "name": "TooManyActions",
          "type": "error"
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "where",
              "type": "address"
            },
            {
              "internalType": "address",
              "name": "who",
              "type": "address"
            },
            {
              "internalType": "bytes32",
              "name": "permissionId",
              "type": "bytes32"
            }
          ],
          "name": "Unauthorized",
          "type": "error"
        },
        {
          "inputs": [
            {
              "internalType": "bytes4",
              "name": "callbackSelector",
              "type": "bytes4"
            },
            {
              "internalType": "bytes4",
              "name": "magicNumber",
              "type": "bytes4"
            }
          ],
          "name": "UnkownCallback",
          "type": "error"
        },
        {
          "inputs": [],
          "name": "ZeroAmount",
          "type": "error"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": false,
              "internalType": "address",
              "name": "previousAdmin",
              "type": "address"
            },
            {
              "indexed": false,
              "internalType": "address",
              "name": "newAdmin",
              "type": "address"
            }
          ],
          "name": "AdminChanged",
          "type": "event"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": true,
              "internalType": "address",
              "name": "beacon",
              "type": "address"
            }
          ],
          "name": "BeaconUpgraded",
          "type": "event"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": false,
              "internalType": "address",
              "name": "sender",
              "type": "address"
            },
            {
              "indexed": true,
              "internalType": "bytes4",
              "name": "sig",
              "type": "bytes4"
            },
            {
              "indexed": false,
              "internalType": "bytes",
              "name": "data",
              "type": "bytes"
            }
          ],
          "name": "CallbackReceived",
          "type": "event"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": true,
              "internalType": "address",
              "name": "sender",
              "type": "address"
            },
            {
              "indexed": true,
              "internalType": "address",
              "name": "token",
              "type": "address"
            },
            {
              "indexed": false,
              "internalType": "uint256",
              "name": "amount",
              "type": "uint256"
            },
            {
              "indexed": false,
              "internalType": "string",
              "name": "_reference",
              "type": "string"
            }
          ],
          "name": "Deposited",
          "type": "event"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": true,
              "internalType": "address",
              "name": "actor",
              "type": "address"
            },
            {
              "indexed": false,
              "internalType": "bytes32",
              "name": "callId",
              "type": "bytes32"
            },
            {
              "components": [
                {
                  "internalType": "address",
                  "name": "to",
                  "type": "address"
                },
                {
                  "internalType": "uint256",
                  "name": "value",
                  "type": "uint256"
                },
                {
                  "internalType": "bytes",
                  "name": "data",
                  "type": "bytes"
                }
              ],
              "indexed": false,
              "internalType": "struct IDAO.Action[]",
              "name": "actions",
              "type": "tuple[]"
            },
            {
              "indexed": false,
              "internalType": "uint256",
              "name": "allowFailureMap",
              "type": "uint256"
            },
            {
              "indexed": false,
              "internalType": "uint256",
              "name": "failureMap",
              "type": "uint256"
            },
            {
              "indexed": false,
              "internalType": "bytes[]",
              "name": "execResults",
              "type": "bytes[]"
            }
          ],
          "name": "Executed",
          "type": "event"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": true,
              "internalType": "bytes32",
              "name": "permissionId",
              "type": "bytes32"
            },
            {
              "indexed": true,
              "internalType": "address",
              "name": "here",
              "type": "address"
            },
            {
              "indexed": false,
              "internalType": "address",
              "name": "where",
              "type": "address"
            },
            {
              "indexed": true,
              "internalType": "address",
              "name": "who",
              "type": "address"
            },
            {
              "indexed": false,
              "internalType": "address",
              "name": "condition",
              "type": "address"
            }
          ],
          "name": "Granted",
          "type": "event"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": false,
              "internalType": "uint8",
              "name": "version",
              "type": "uint8"
            }
          ],
          "name": "Initialized",
          "type": "event"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": false,
              "internalType": "bytes",
              "name": "metadata",
              "type": "bytes"
            }
          ],
          "name": "MetadataSet",
          "type": "event"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": false,
              "internalType": "address",
              "name": "sender",
              "type": "address"
            },
            {
              "indexed": false,
              "internalType": "uint256",
              "name": "amount",
              "type": "uint256"
            }
          ],
          "name": "NativeTokenDeposited",
          "type": "event"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": false,
              "internalType": "string",
              "name": "daoURI",
              "type": "string"
            }
          ],
          "name": "NewURI",
          "type": "event"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": true,
              "internalType": "bytes32",
              "name": "permissionId",
              "type": "bytes32"
            },
            {
              "indexed": true,
              "internalType": "address",
              "name": "here",
              "type": "address"
            },
            {
              "indexed": false,
              "internalType": "address",
              "name": "where",
              "type": "address"
            },
            {
              "indexed": true,
              "internalType": "address",
              "name": "who",
              "type": "address"
            }
          ],
          "name": "Revoked",
          "type": "event"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": false,
              "internalType": "address",
              "name": "signatureValidator",
              "type": "address"
            }
          ],
          "name": "SignatureValidatorSet",
          "type": "event"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": false,
              "internalType": "bytes4",
              "name": "interfaceId",
              "type": "bytes4"
            },
            {
              "indexed": false,
              "internalType": "bytes4",
              "name": "callbackSelector",
              "type": "bytes4"
            },
            {
              "indexed": false,
              "internalType": "bytes4",
              "name": "magicNumber",
              "type": "bytes4"
            }
          ],
          "name": "StandardCallbackRegistered",
          "type": "event"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": false,
              "internalType": "address",
              "name": "forwarder",
              "type": "address"
            }
          ],
          "name": "TrustedForwarderSet",
          "type": "event"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": true,
              "internalType": "address",
              "name": "implementation",
              "type": "address"
            }
          ],
          "name": "Upgraded",
          "type": "event"
        },
        {
          "stateMutability": "nonpayable",
          "type": "fallback"
        },
        {
          "inputs": [],
          "name": "EXECUTE_PERMISSION_ID",
          "outputs": [
            {
              "internalType": "bytes32",
              "name": "",
              "type": "bytes32"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "REGISTER_STANDARD_CALLBACK_PERMISSION_ID",
          "outputs": [
            {
              "internalType": "bytes32",
              "name": "",
              "type": "bytes32"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "ROOT_PERMISSION_ID",
          "outputs": [
            {
              "internalType": "bytes32",
              "name": "",
              "type": "bytes32"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "SET_METADATA_PERMISSION_ID",
          "outputs": [
            {
              "internalType": "bytes32",
              "name": "",
              "type": "bytes32"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "SET_SIGNATURE_VALIDATOR_PERMISSION_ID",
          "outputs": [
            {
              "internalType": "bytes32",
              "name": "",
              "type": "bytes32"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "SET_TRUSTED_FORWARDER_PERMISSION_ID",
          "outputs": [
            {
              "internalType": "bytes32",
              "name": "",
              "type": "bytes32"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "UPGRADE_DAO_PERMISSION_ID",
          "outputs": [
            {
              "internalType": "bytes32",
              "name": "",
              "type": "bytes32"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "components": [
                {
                  "internalType": "enum PermissionLib.Operation",
                  "name": "operation",
                  "type": "uint8"
                },
                {
                  "internalType": "address",
                  "name": "where",
                  "type": "address"
                },
                {
                  "internalType": "address",
                  "name": "who",
                  "type": "address"
                },
                {
                  "internalType": "address",
                  "name": "condition",
                  "type": "address"
                },
                {
                  "internalType": "bytes32",
                  "name": "permissionId",
                  "type": "bytes32"
                }
              ],
              "internalType": "struct PermissionLib.MultiTargetPermission[]",
              "name": "_items",
              "type": "tuple[]"
            }
          ],
          "name": "applyMultiTargetPermissions",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "_where",
              "type": "address"
            },
            {
              "components": [
                {
                  "internalType": "enum PermissionLib.Operation",
                  "name": "operation",
                  "type": "uint8"
                },
                {
                  "internalType": "address",
                  "name": "who",
                  "type": "address"
                },
                {
                  "internalType": "bytes32",
                  "name": "permissionId",
                  "type": "bytes32"
                }
              ],
              "internalType": "struct PermissionLib.SingleTargetPermission[]",
              "name": "items",
              "type": "tuple[]"
            }
          ],
          "name": "applySingleTargetPermissions",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "daoURI",
          "outputs": [
            {
              "internalType": "string",
              "name": "",
              "type": "string"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "_token",
              "type": "address"
            },
            {
              "internalType": "uint256",
              "name": "_amount",
              "type": "uint256"
            },
            {
              "internalType": "string",
              "name": "_reference",
              "type": "string"
            }
          ],
          "name": "deposit",
          "outputs": [],
          "stateMutability": "payable",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "bytes32",
              "name": "_callId",
              "type": "bytes32"
            },
            {
              "components": [
                {
                  "internalType": "address",
                  "name": "to",
                  "type": "address"
                },
                {
                  "internalType": "uint256",
                  "name": "value",
                  "type": "uint256"
                },
                {
                  "internalType": "bytes",
                  "name": "data",
                  "type": "bytes"
                }
              ],
              "internalType": "struct IDAO.Action[]",
              "name": "_actions",
              "type": "tuple[]"
            },
            {
              "internalType": "uint256",
              "name": "_allowFailureMap",
              "type": "uint256"
            }
          ],
          "name": "execute",
          "outputs": [
            {
              "internalType": "bytes[]",
              "name": "execResults",
              "type": "bytes[]"
            },
            {
              "internalType": "uint256",
              "name": "failureMap",
              "type": "uint256"
            }
          ],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "getTrustedForwarder",
          "outputs": [
            {
              "internalType": "address",
              "name": "",
              "type": "address"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "_where",
              "type": "address"
            },
            {
              "internalType": "address",
              "name": "_who",
              "type": "address"
            },
            {
              "internalType": "bytes32",
              "name": "_permissionId",
              "type": "bytes32"
            }
          ],
          "name": "grant",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "_where",
              "type": "address"
            },
            {
              "internalType": "address",
              "name": "_who",
              "type": "address"
            },
            {
              "internalType": "bytes32",
              "name": "_permissionId",
              "type": "bytes32"
            },
            {
              "internalType": "contract IPermissionCondition",
              "name": "_condition",
              "type": "address"
            }
          ],
          "name": "grantWithCondition",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "_where",
              "type": "address"
            },
            {
              "internalType": "address",
              "name": "_who",
              "type": "address"
            },
            {
              "internalType": "bytes32",
              "name": "_permissionId",
              "type": "bytes32"
            },
            {
              "internalType": "bytes",
              "name": "_data",
              "type": "bytes"
            }
          ],
          "name": "hasPermission",
          "outputs": [
            {
              "internalType": "bool",
              "name": "",
              "type": "bool"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "bytes",
              "name": "_metadata",
              "type": "bytes"
            },
            {
              "internalType": "address",
              "name": "_initialOwner",
              "type": "address"
            },
            {
              "internalType": "address",
              "name": "_trustedForwarder",
              "type": "address"
            },
            {
              "internalType": "string",
              "name": "daoURI_",
              "type": "string"
            }
          ],
          "name": "initialize",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "uint8[3]",
              "name": "_previousProtocolVersion",
              "type": "uint8[3]"
            },
            {
              "internalType": "bytes",
              "name": "_initData",
              "type": "bytes"
            }
          ],
          "name": "initializeFrom",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "_where",
              "type": "address"
            },
            {
              "internalType": "address",
              "name": "_who",
              "type": "address"
            },
            {
              "internalType": "bytes32",
              "name": "_permissionId",
              "type": "bytes32"
            },
            {
              "internalType": "bytes",
              "name": "_data",
              "type": "bytes"
            }
          ],
          "name": "isGranted",
          "outputs": [
            {
              "internalType": "bool",
              "name": "",
              "type": "bool"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "bytes32",
              "name": "_hash",
              "type": "bytes32"
            },
            {
              "internalType": "bytes",
              "name": "_signature",
              "type": "bytes"
            }
          ],
          "name": "isValidSignature",
          "outputs": [
            {
              "internalType": "bytes4",
              "name": "",
              "type": "bytes4"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "protocolVersion",
          "outputs": [
            {
              "internalType": "uint8[3]",
              "name": "",
              "type": "uint8[3]"
            }
          ],
          "stateMutability": "pure",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "proxiableUUID",
          "outputs": [
            {
              "internalType": "bytes32",
              "name": "",
              "type": "bytes32"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "bytes4",
              "name": "_interfaceId",
              "type": "bytes4"
            },
            {
              "internalType": "bytes4",
              "name": "_callbackSelector",
              "type": "bytes4"
            },
            {
              "internalType": "bytes4",
              "name": "_magicNumber",
              "type": "bytes4"
            }
          ],
          "name": "registerStandardCallback",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "_where",
              "type": "address"
            },
            {
              "internalType": "address",
              "name": "_who",
              "type": "address"
            },
            {
              "internalType": "bytes32",
              "name": "_permissionId",
              "type": "bytes32"
            }
          ],
          "name": "revoke",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "string",
              "name": "newDaoURI",
              "type": "string"
            }
          ],
          "name": "setDaoURI",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "bytes",
              "name": "_metadata",
              "type": "bytes"
            }
          ],
          "name": "setMetadata",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "_signatureValidator",
              "type": "address"
            }
          ],
          "name": "setSignatureValidator",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "_newTrustedForwarder",
              "type": "address"
            }
          ],
          "name": "setTrustedForwarder",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "signatureValidator",
          "outputs": [
            {
              "internalType": "contract IERC1271",
              "name": "",
              "type": "address"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "bytes4",
              "name": "interfaceId",
              "type": "bytes4"
            }
          ],
          "name": "supportsInterface",
          "outputs": [
            {
              "internalType": "bool",
              "name": "",
              "type": "bool"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "newImplementation",
              "type": "address"
            }
          ],
          "name": "upgradeTo",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "newImplementation",
              "type": "address"
            },
            {
              "internalType": "bytes",
              "name": "data",
              "type": "bytes"
            }
          ],
          "name": "upgradeToAndCall",
          "outputs": [],
          "stateMutability": "payable",
          "type": "function"
        },
        {
          "stateMutability": "payable",
          "type": "receive"
        }
      ]
    },
    "data_taskDrafts": {
      "address": "0xfe8eb544e5be7823a90865EbB83ffF1DeB939c98",
      "abi": [
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "dao",
              "type": "address"
            },
            {
              "internalType": "address",
              "name": "where",
              "type": "address"
            },
            {
              "internalType": "address",
              "name": "who",
              "type": "address"
            },
            {
              "internalType": "bytes32",
              "name": "permissionId",
              "type": "bytes32"
            }
          ],
          "name": "DaoUnauthorized",
          "type": "error"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": false,
              "internalType": "address",
              "name": "previousAdmin",
              "type": "address"
            },
            {
              "indexed": false,
              "internalType": "address",
              "name": "newAdmin",
              "type": "address"
            }
          ],
          "name": "AdminChanged",
          "type": "event"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": true,
              "internalType": "address",
              "name": "beacon",
              "type": "address"
            }
          ],
          "name": "BeaconUpgraded",
          "type": "event"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": false,
              "internalType": "uint8",
              "name": "version",
              "type": "uint8"
            }
          ],
          "name": "Initialized",
          "type": "event"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": false,
              "internalType": "uint256",
              "name": "proposalId",
              "type": "uint256"
            },
            {
              "indexed": false,
              "internalType": "bytes",
              "name": "metadata",
              "type": "bytes"
            },
            {
              "indexed": false,
              "internalType": "uint64",
              "name": "startDate",
              "type": "uint64"
            },
            {
              "indexed": false,
              "internalType": "uint64",
              "name": "endDate",
              "type": "uint64"
            },
            {
              "components": [
                {
                  "internalType": "string",
                  "name": "metadata",
                  "type": "string"
                },
                {
                  "internalType": "uint64",
                  "name": "deadline",
                  "type": "uint64"
                },
                {
                  "components": [
                    {
                      "internalType": "contract IERC20",
                      "name": "tokenContract",
                      "type": "address"
                    },
                    {
                      "internalType": "uint96",
                      "name": "amount",
                      "type": "uint96"
                    }
                  ],
                  "internalType": "struct ITasks.ERC20Transfer[]",
                  "name": "budget",
                  "type": "tuple[]"
                },
                {
                  "internalType": "address",
                  "name": "manager",
                  "type": "address"
                },
                {
                  "components": [
                    {
                      "internalType": "address",
                      "name": "applicant",
                      "type": "address"
                    },
                    {
                      "components": [
                        {
                          "internalType": "bool",
                          "name": "nextToken",
                          "type": "bool"
                        },
                        {
                          "internalType": "address",
                          "name": "to",
                          "type": "address"
                        },
                        {
                          "internalType": "uint88",
                          "name": "amount",
                          "type": "uint88"
                        }
                      ],
                      "internalType": "struct ITasks.Reward[]",
                      "name": "reward",
                      "type": "tuple[]"
                    }
                  ],
                  "internalType": "struct ITasks.PreapprovedApplication[]",
                  "name": "preapproved",
                  "type": "tuple[]"
                }
              ],
              "indexed": false,
              "internalType": "struct ITaskDrafts.CreateTaskInfo",
              "name": "taskInfo",
              "type": "tuple"
            }
          ],
          "name": "TaskDraftCreated",
          "type": "event"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": true,
              "internalType": "address",
              "name": "implementation",
              "type": "address"
            }
          ],
          "name": "Upgraded",
          "type": "event"
        },
        {
          "inputs": [],
          "name": "UPGRADE_PLUGIN_PERMISSION_ID",
          "outputs": [
            {
              "internalType": "bytes32",
              "name": "",
              "type": "bytes32"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "bytes",
              "name": "_metadata",
              "type": "bytes"
            },
            {
              "internalType": "uint64",
              "name": "_startDate",
              "type": "uint64"
            },
            {
              "internalType": "uint64",
              "name": "_endDate",
              "type": "uint64"
            },
            {
              "components": [
                {
                  "internalType": "string",
                  "name": "metadata",
                  "type": "string"
                },
                {
                  "internalType": "uint64",
                  "name": "deadline",
                  "type": "uint64"
                },
                {
                  "components": [
                    {
                      "internalType": "contract IERC20",
                      "name": "tokenContract",
                      "type": "address"
                    },
                    {
                      "internalType": "uint96",
                      "name": "amount",
                      "type": "uint96"
                    }
                  ],
                  "internalType": "struct ITasks.ERC20Transfer[]",
                  "name": "budget",
                  "type": "tuple[]"
                },
                {
                  "internalType": "address",
                  "name": "manager",
                  "type": "address"
                },
                {
                  "components": [
                    {
                      "internalType": "address",
                      "name": "applicant",
                      "type": "address"
                    },
                    {
                      "components": [
                        {
                          "internalType": "bool",
                          "name": "nextToken",
                          "type": "bool"
                        },
                        {
                          "internalType": "address",
                          "name": "to",
                          "type": "address"
                        },
                        {
                          "internalType": "uint88",
                          "name": "amount",
                          "type": "uint88"
                        }
                      ],
                      "internalType": "struct ITasks.Reward[]",
                      "name": "reward",
                      "type": "tuple[]"
                    }
                  ],
                  "internalType": "struct ITasks.PreapprovedApplication[]",
                  "name": "preapproved",
                  "type": "tuple[]"
                }
              ],
              "internalType": "struct ITaskDrafts.CreateTaskInfo",
              "name": "_taskInfo",
              "type": "tuple"
            }
          ],
          "name": "createDraftTask",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "dao",
          "outputs": [
            {
              "internalType": "contract IDAO",
              "name": "",
              "type": "address"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "getGovernanceContract",
          "outputs": [
            {
              "internalType": "contract IPluginProposals",
              "name": "",
              "type": "address"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "getTasksContract",
          "outputs": [
            {
              "internalType": "contract ITasks",
              "name": "",
              "type": "address"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "implementation",
          "outputs": [
            {
              "internalType": "address",
              "name": "",
              "type": "address"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "contract IDAO",
              "name": "_dao",
              "type": "address"
            },
            {
              "internalType": "contract ITasks",
              "name": "_tasks",
              "type": "address"
            },
            {
              "internalType": "contract IPluginProposals",
              "name": "_governancePlugin",
              "type": "address"
            }
          ],
          "name": "initialize",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "pluginType",
          "outputs": [
            {
              "internalType": "enum IPlugin.PluginType",
              "name": "",
              "type": "uint8"
            }
          ],
          "stateMutability": "pure",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "proxiableUUID",
          "outputs": [
            {
              "internalType": "bytes32",
              "name": "",
              "type": "bytes32"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "bytes4",
              "name": "_interfaceId",
              "type": "bytes4"
            }
          ],
          "name": "supportsInterface",
          "outputs": [
            {
              "internalType": "bool",
              "name": "",
              "type": "bool"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "contract ITasks",
              "name": "_tasks",
              "type": "address"
            },
            {
              "internalType": "contract IPluginProposals",
              "name": "_governancePlugin",
              "type": "address"
            }
          ],
          "name": "updateAddresses",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "newImplementation",
              "type": "address"
            }
          ],
          "name": "upgradeTo",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "newImplementation",
              "type": "address"
            },
            {
              "internalType": "bytes",
              "name": "data",
              "type": "bytes"
            }
          ],
          "name": "upgradeToAndCall",
          "outputs": [],
          "stateMutability": "payable",
          "type": "function"
        }
      ]
    },
    "data_tokenListGovernance": {
      "address": "0x2Ae8094C84cCD2BB7EF2001f92c4D7A740B9d163",
      "abi": [
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "dao",
              "type": "address"
            },
            {
              "internalType": "address",
              "name": "where",
              "type": "address"
            },
            {
              "internalType": "address",
              "name": "who",
              "type": "address"
            },
            {
              "internalType": "bytes32",
              "name": "permissionId",
              "type": "bytes32"
            }
          ],
          "name": "DaoUnauthorized",
          "type": "error"
        },
        {
          "inputs": [
            {
              "internalType": "uint64",
              "name": "limit",
              "type": "uint64"
            },
            {
              "internalType": "uint64",
              "name": "actual",
              "type": "uint64"
            }
          ],
          "name": "DateOutOfBounds",
          "type": "error"
        },
        {
          "inputs": [
            {
              "internalType": "uint256",
              "name": "tokenId",
              "type": "uint256"
            }
          ],
          "name": "InvalidTokenlistUpdate",
          "type": "error"
        },
        {
          "inputs": [
            {
              "internalType": "uint64",
              "name": "limit",
              "type": "uint64"
            },
            {
              "internalType": "uint64",
              "name": "actual",
              "type": "uint64"
            }
          ],
          "name": "MinDurationOutOfBounds",
          "type": "error"
        },
        {
          "inputs": [
            {
              "internalType": "uint256",
              "name": "sender",
              "type": "uint256"
            }
          ],
          "name": "ProposalCreationForbidden",
          "type": "error"
        },
        {
          "inputs": [
            {
              "internalType": "uint256",
              "name": "proposalId",
              "type": "uint256"
            }
          ],
          "name": "ProposalExecutionForbidden",
          "type": "error"
        },
        {
          "inputs": [
            {
              "internalType": "uint256",
              "name": "limit",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "actual",
              "type": "uint256"
            }
          ],
          "name": "RatioOutOfBounds",
          "type": "error"
        },
        {
          "inputs": [
            {
              "internalType": "uint256",
              "name": "tokenId",
              "type": "uint256"
            },
            {
              "internalType": "address",
              "name": "sender",
              "type": "address"
            }
          ],
          "name": "TokenNotOwnedBySender",
          "type": "error"
        },
        {
          "inputs": [
            {
              "internalType": "uint256",
              "name": "proposalId",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "account",
              "type": "uint256"
            },
            {
              "internalType": "enum ITokenMajorityVoting.VoteOption",
              "name": "voteOption",
              "type": "uint8"
            }
          ],
          "name": "VoteCastForbidden",
          "type": "error"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": false,
              "internalType": "address",
              "name": "previousAdmin",
              "type": "address"
            },
            {
              "indexed": false,
              "internalType": "address",
              "name": "newAdmin",
              "type": "address"
            }
          ],
          "name": "AdminChanged",
          "type": "event"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": true,
              "internalType": "address",
              "name": "beacon",
              "type": "address"
            }
          ],
          "name": "BeaconUpgraded",
          "type": "event"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": false,
              "internalType": "uint8",
              "name": "version",
              "type": "uint8"
            }
          ],
          "name": "Initialized",
          "type": "event"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": false,
              "internalType": "uint256[]",
              "name": "members",
              "type": "uint256[]"
            }
          ],
          "name": "MembersAdded",
          "type": "event"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": false,
              "internalType": "uint256[]",
              "name": "members",
              "type": "uint256[]"
            }
          ],
          "name": "MembersRemoved",
          "type": "event"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": true,
              "internalType": "address",
              "name": "definingContract",
              "type": "address"
            }
          ],
          "name": "MembershipContractAnnounced",
          "type": "event"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": true,
              "internalType": "uint256",
              "name": "proposalId",
              "type": "uint256"
            },
            {
              "indexed": true,
              "internalType": "address",
              "name": "creator",
              "type": "address"
            },
            {
              "indexed": false,
              "internalType": "uint64",
              "name": "startDate",
              "type": "uint64"
            },
            {
              "indexed": false,
              "internalType": "uint64",
              "name": "endDate",
              "type": "uint64"
            },
            {
              "indexed": false,
              "internalType": "bytes",
              "name": "metadata",
              "type": "bytes"
            },
            {
              "components": [
                {
                  "internalType": "address",
                  "name": "to",
                  "type": "address"
                },
                {
                  "internalType": "uint256",
                  "name": "value",
                  "type": "uint256"
                },
                {
                  "internalType": "bytes",
                  "name": "data",
                  "type": "bytes"
                }
              ],
              "indexed": false,
              "internalType": "struct IDAO.Action[]",
              "name": "actions",
              "type": "tuple[]"
            },
            {
              "indexed": false,
              "internalType": "uint256",
              "name": "allowFailureMap",
              "type": "uint256"
            }
          ],
          "name": "ProposalCreated",
          "type": "event"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": true,
              "internalType": "uint256",
              "name": "proposalId",
              "type": "uint256"
            }
          ],
          "name": "ProposalExecuted",
          "type": "event"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": false,
              "internalType": "uint256[]",
              "name": "tokens",
              "type": "uint256[]"
            }
          ],
          "name": "TokensAdded",
          "type": "event"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": false,
              "internalType": "uint256[]",
              "name": "tokens",
              "type": "uint256[]"
            }
          ],
          "name": "TokensRemoved",
          "type": "event"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": true,
              "internalType": "address",
              "name": "implementation",
              "type": "address"
            }
          ],
          "name": "Upgraded",
          "type": "event"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": true,
              "internalType": "uint256",
              "name": "proposalId",
              "type": "uint256"
            },
            {
              "indexed": true,
              "internalType": "uint256",
              "name": "voter",
              "type": "uint256"
            },
            {
              "indexed": false,
              "internalType": "enum ITokenMajorityVoting.VoteOption",
              "name": "voteOption",
              "type": "uint8"
            },
            {
              "indexed": false,
              "internalType": "uint256",
              "name": "votingPower",
              "type": "uint256"
            }
          ],
          "name": "VoteCast",
          "type": "event"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": false,
              "internalType": "enum TokenMajorityVotingBase.VotingMode",
              "name": "votingMode",
              "type": "uint8"
            },
            {
              "indexed": false,
              "internalType": "uint32",
              "name": "supportThreshold",
              "type": "uint32"
            },
            {
              "indexed": false,
              "internalType": "uint32",
              "name": "minParticipation",
              "type": "uint32"
            },
            {
              "indexed": false,
              "internalType": "uint64",
              "name": "minDuration",
              "type": "uint64"
            },
            {
              "indexed": false,
              "internalType": "uint256",
              "name": "minProposerVotingPower",
              "type": "uint256"
            }
          ],
          "name": "VotingSettingsUpdated",
          "type": "event"
        },
        {
          "inputs": [],
          "name": "UPDATE_MEMBERS_PERMISSION_ID",
          "outputs": [
            {
              "internalType": "bytes32",
              "name": "",
              "type": "bytes32"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "UPDATE_VOTING_SETTINGS_PERMISSION_ID",
          "outputs": [
            {
              "internalType": "bytes32",
              "name": "",
              "type": "bytes32"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "UPGRADE_PLUGIN_PERMISSION_ID",
          "outputs": [
            {
              "internalType": "bytes32",
              "name": "",
              "type": "bytes32"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "uint256[]",
              "name": "_members",
              "type": "uint256[]"
            }
          ],
          "name": "addMembers",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "uint256",
              "name": "_proposalId",
              "type": "uint256"
            }
          ],
          "name": "canExecute",
          "outputs": [
            {
              "internalType": "bool",
              "name": "",
              "type": "bool"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "uint256",
              "name": "_proposalId",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "_account",
              "type": "uint256"
            },
            {
              "internalType": "enum ITokenMajorityVoting.VoteOption",
              "name": "_voteOption",
              "type": "uint8"
            }
          ],
          "name": "canVote",
          "outputs": [
            {
              "internalType": "bool",
              "name": "",
              "type": "bool"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "bytes",
              "name": "_metadata",
              "type": "bytes"
            },
            {
              "components": [
                {
                  "internalType": "address",
                  "name": "to",
                  "type": "address"
                },
                {
                  "internalType": "uint256",
                  "name": "value",
                  "type": "uint256"
                },
                {
                  "internalType": "bytes",
                  "name": "data",
                  "type": "bytes"
                }
              ],
              "internalType": "struct IDAO.Action[]",
              "name": "_actions",
              "type": "tuple[]"
            },
            {
              "internalType": "uint256",
              "name": "_allowFailureMap",
              "type": "uint256"
            },
            {
              "internalType": "uint64",
              "name": "_startDate",
              "type": "uint64"
            },
            {
              "internalType": "uint64",
              "name": "_endDate",
              "type": "uint64"
            }
          ],
          "name": "createPluginProposal",
          "outputs": [
            {
              "internalType": "uint256",
              "name": "proposalId",
              "type": "uint256"
            }
          ],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "bytes",
              "name": "_metadata",
              "type": "bytes"
            },
            {
              "components": [
                {
                  "internalType": "address",
                  "name": "to",
                  "type": "address"
                },
                {
                  "internalType": "uint256",
                  "name": "value",
                  "type": "uint256"
                },
                {
                  "internalType": "bytes",
                  "name": "data",
                  "type": "bytes"
                }
              ],
              "internalType": "struct IDAO.Action[]",
              "name": "_actions",
              "type": "tuple[]"
            },
            {
              "internalType": "uint256",
              "name": "_allowFailureMap",
              "type": "uint256"
            },
            {
              "internalType": "uint64",
              "name": "_startDate",
              "type": "uint64"
            },
            {
              "internalType": "uint64",
              "name": "_endDate",
              "type": "uint64"
            },
            {
              "internalType": "enum ITokenMajorityVoting.VoteOption",
              "name": "_voteOption",
              "type": "uint8"
            },
            {
              "internalType": "bool",
              "name": "_tryEarlyExecution",
              "type": "bool"
            },
            {
              "internalType": "uint256",
              "name": "_tokenId",
              "type": "uint256"
            }
          ],
          "name": "createProposal",
          "outputs": [
            {
              "internalType": "uint256",
              "name": "proposalId",
              "type": "uint256"
            }
          ],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "dao",
          "outputs": [
            {
              "internalType": "contract IDAO",
              "name": "",
              "type": "address"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "uint256",
              "name": "_proposalId",
              "type": "uint256"
            }
          ],
          "name": "execute",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "uint256",
              "name": "_proposalId",
              "type": "uint256"
            }
          ],
          "name": "getProposal",
          "outputs": [
            {
              "internalType": "bool",
              "name": "open",
              "type": "bool"
            },
            {
              "internalType": "bool",
              "name": "executed",
              "type": "bool"
            },
            {
              "components": [
                {
                  "internalType": "enum TokenMajorityVotingBase.VotingMode",
                  "name": "votingMode",
                  "type": "uint8"
                },
                {
                  "internalType": "uint32",
                  "name": "supportThreshold",
                  "type": "uint32"
                },
                {
                  "internalType": "uint64",
                  "name": "startDate",
                  "type": "uint64"
                },
                {
                  "internalType": "uint64",
                  "name": "endDate",
                  "type": "uint64"
                },
                {
                  "internalType": "uint64",
                  "name": "snapshotBlock",
                  "type": "uint64"
                },
                {
                  "internalType": "uint256",
                  "name": "minVotingPower",
                  "type": "uint256"
                }
              ],
              "internalType": "struct TokenMajorityVotingBase.ProposalParameters",
              "name": "parameters",
              "type": "tuple"
            },
            {
              "components": [
                {
                  "internalType": "uint256",
                  "name": "abstain",
                  "type": "uint256"
                },
                {
                  "internalType": "uint256",
                  "name": "yes",
                  "type": "uint256"
                },
                {
                  "internalType": "uint256",
                  "name": "no",
                  "type": "uint256"
                }
              ],
              "internalType": "struct TokenMajorityVotingBase.Tally",
              "name": "tally",
              "type": "tuple"
            },
            {
              "components": [
                {
                  "internalType": "address",
                  "name": "to",
                  "type": "address"
                },
                {
                  "internalType": "uint256",
                  "name": "value",
                  "type": "uint256"
                },
                {
                  "internalType": "bytes",
                  "name": "data",
                  "type": "bytes"
                }
              ],
              "internalType": "struct IDAO.Action[]",
              "name": "actions",
              "type": "tuple[]"
            },
            {
              "internalType": "uint256",
              "name": "allowFailureMap",
              "type": "uint256"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "uint256",
              "name": "_proposalId",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "_account",
              "type": "uint256"
            }
          ],
          "name": "getVoteOption",
          "outputs": [
            {
              "internalType": "enum ITokenMajorityVoting.VoteOption",
              "name": "",
              "type": "uint8"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "implementation",
          "outputs": [
            {
              "internalType": "address",
              "name": "",
              "type": "address"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "contract IDAO",
              "name": "_dao",
              "type": "address"
            },
            {
              "components": [
                {
                  "internalType": "enum TokenMajorityVotingBase.VotingMode",
                  "name": "votingMode",
                  "type": "uint8"
                },
                {
                  "internalType": "uint32",
                  "name": "supportThreshold",
                  "type": "uint32"
                },
                {
                  "internalType": "uint32",
                  "name": "minParticipation",
                  "type": "uint32"
                },
                {
                  "internalType": "uint64",
                  "name": "minDuration",
                  "type": "uint64"
                },
                {
                  "internalType": "uint256",
                  "name": "minProposerVotingPower",
                  "type": "uint256"
                }
              ],
              "internalType": "struct TokenMajorityVotingBase.VotingSettings",
              "name": "_votingSettings",
              "type": "tuple"
            },
            {
              "internalType": "contract IERC721",
              "name": "_tokenCollection",
              "type": "address"
            },
            {
              "internalType": "uint256[]",
              "name": "_members",
              "type": "uint256[]"
            }
          ],
          "name": "initialize",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "uint256",
              "name": "_tokenId",
              "type": "uint256"
            }
          ],
          "name": "isListed",
          "outputs": [
            {
              "internalType": "bool",
              "name": "",
              "type": "bool"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "uint256",
              "name": "_tokenId",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "_blockNumber",
              "type": "uint256"
            }
          ],
          "name": "isListedAtBlock",
          "outputs": [
            {
              "internalType": "bool",
              "name": "",
              "type": "bool"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "uint256",
              "name": "_account",
              "type": "uint256"
            }
          ],
          "name": "isMember",
          "outputs": [
            {
              "internalType": "bool",
              "name": "",
              "type": "bool"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "uint256",
              "name": "_proposalId",
              "type": "uint256"
            }
          ],
          "name": "isMinParticipationReached",
          "outputs": [
            {
              "internalType": "bool",
              "name": "",
              "type": "bool"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "uint256",
              "name": "_proposalId",
              "type": "uint256"
            }
          ],
          "name": "isSupportThresholdReached",
          "outputs": [
            {
              "internalType": "bool",
              "name": "",
              "type": "bool"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "uint256",
              "name": "_proposalId",
              "type": "uint256"
            }
          ],
          "name": "isSupportThresholdReachedEarly",
          "outputs": [
            {
              "internalType": "bool",
              "name": "",
              "type": "bool"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "minDuration",
          "outputs": [
            {
              "internalType": "uint64",
              "name": "",
              "type": "uint64"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "minParticipation",
          "outputs": [
            {
              "internalType": "uint32",
              "name": "",
              "type": "uint32"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "minProposerVotingPower",
          "outputs": [
            {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "pluginType",
          "outputs": [
            {
              "internalType": "enum IPlugin.PluginType",
              "name": "",
              "type": "uint8"
            }
          ],
          "stateMutability": "pure",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "proposalCount",
          "outputs": [
            {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "proxiableUUID",
          "outputs": [
            {
              "internalType": "bytes32",
              "name": "",
              "type": "bytes32"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "uint256[]",
              "name": "_members",
              "type": "uint256[]"
            }
          ],
          "name": "removeMembers",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "supportThreshold",
          "outputs": [
            {
              "internalType": "uint32",
              "name": "",
              "type": "uint32"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "bytes4",
              "name": "_interfaceId",
              "type": "bytes4"
            }
          ],
          "name": "supportsInterface",
          "outputs": [
            {
              "internalType": "bool",
              "name": "",
              "type": "bool"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "tokenlistLength",
          "outputs": [
            {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "uint256",
              "name": "_blockNumber",
              "type": "uint256"
            }
          ],
          "name": "tokenlistLengthAtBlock",
          "outputs": [
            {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "uint256",
              "name": "_blockNumber",
              "type": "uint256"
            }
          ],
          "name": "totalVotingPower",
          "outputs": [
            {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "components": [
                {
                  "internalType": "enum TokenMajorityVotingBase.VotingMode",
                  "name": "votingMode",
                  "type": "uint8"
                },
                {
                  "internalType": "uint32",
                  "name": "supportThreshold",
                  "type": "uint32"
                },
                {
                  "internalType": "uint32",
                  "name": "minParticipation",
                  "type": "uint32"
                },
                {
                  "internalType": "uint64",
                  "name": "minDuration",
                  "type": "uint64"
                },
                {
                  "internalType": "uint256",
                  "name": "minProposerVotingPower",
                  "type": "uint256"
                }
              ],
              "internalType": "struct TokenMajorityVotingBase.VotingSettings",
              "name": "_votingSettings",
              "type": "tuple"
            }
          ],
          "name": "updateVotingSettings",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "newImplementation",
              "type": "address"
            }
          ],
          "name": "upgradeTo",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "newImplementation",
              "type": "address"
            },
            {
              "internalType": "bytes",
              "name": "data",
              "type": "bytes"
            }
          ],
          "name": "upgradeToAndCall",
          "outputs": [],
          "stateMutability": "payable",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "uint256",
              "name": "_proposalId",
              "type": "uint256"
            },
            {
              "internalType": "enum ITokenMajorityVoting.VoteOption",
              "name": "_voteOption",
              "type": "uint8"
            },
            {
              "internalType": "bool",
              "name": "_tryEarlyExecution",
              "type": "bool"
            },
            {
              "internalType": "uint256",
              "name": "_tokenId",
              "type": "uint256"
            }
          ],
          "name": "vote",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "votingMode",
          "outputs": [
            {
              "internalType": "enum TokenMajorityVotingBase.VotingMode",
              "name": "",
              "type": "uint8"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        }
      ]
    },
    "frontend_dao": {
      "address": "0xB6C6c781a0092488FAe61b3159558a680B844514",
      "abi": [
        {
          "inputs": [],
          "stateMutability": "nonpayable",
          "type": "constructor"
        },
        {
          "inputs": [
            {
              "internalType": "uint256",
              "name": "index",
              "type": "uint256"
            }
          ],
          "name": "ActionFailed",
          "type": "error"
        },
        {
          "inputs": [],
          "name": "AnyAddressDisallowedForWhoAndWhere",
          "type": "error"
        },
        {
          "inputs": [
            {
              "internalType": "contract IPermissionCondition",
              "name": "condition",
              "type": "address"
            }
          ],
          "name": "ConditionInterfacNotSupported",
          "type": "error"
        },
        {
          "inputs": [
            {
              "internalType": "contract IPermissionCondition",
              "name": "condition",
              "type": "address"
            }
          ],
          "name": "ConditionNotAContract",
          "type": "error"
        },
        {
          "inputs": [],
          "name": "GrantWithConditionNotSupported",
          "type": "error"
        },
        {
          "inputs": [],
          "name": "InsufficientGas",
          "type": "error"
        },
        {
          "inputs": [
            {
              "internalType": "uint256",
              "name": "expected",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "actual",
              "type": "uint256"
            }
          ],
          "name": "NativeTokenDepositAmountMismatch",
          "type": "error"
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "where",
              "type": "address"
            },
            {
              "internalType": "address",
              "name": "who",
              "type": "address"
            },
            {
              "internalType": "bytes32",
              "name": "permissionId",
              "type": "bytes32"
            },
            {
              "internalType": "address",
              "name": "currentCondition",
              "type": "address"
            },
            {
              "internalType": "address",
              "name": "newCondition",
              "type": "address"
            }
          ],
          "name": "PermissionAlreadyGrantedForDifferentCondition",
          "type": "error"
        },
        {
          "inputs": [],
          "name": "PermissionsForAnyAddressDisallowed",
          "type": "error"
        },
        {
          "inputs": [
            {
              "internalType": "uint8[3]",
              "name": "protocolVersion",
              "type": "uint8[3]"
            }
          ],
          "name": "ProtocolVersionUpgradeNotSupported",
          "type": "error"
        },
        {
          "inputs": [],
          "name": "ReentrantCall",
          "type": "error"
        },
        {
          "inputs": [],
          "name": "TooManyActions",
          "type": "error"
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "where",
              "type": "address"
            },
            {
              "internalType": "address",
              "name": "who",
              "type": "address"
            },
            {
              "internalType": "bytes32",
              "name": "permissionId",
              "type": "bytes32"
            }
          ],
          "name": "Unauthorized",
          "type": "error"
        },
        {
          "inputs": [
            {
              "internalType": "bytes4",
              "name": "callbackSelector",
              "type": "bytes4"
            },
            {
              "internalType": "bytes4",
              "name": "magicNumber",
              "type": "bytes4"
            }
          ],
          "name": "UnkownCallback",
          "type": "error"
        },
        {
          "inputs": [],
          "name": "ZeroAmount",
          "type": "error"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": false,
              "internalType": "address",
              "name": "previousAdmin",
              "type": "address"
            },
            {
              "indexed": false,
              "internalType": "address",
              "name": "newAdmin",
              "type": "address"
            }
          ],
          "name": "AdminChanged",
          "type": "event"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": true,
              "internalType": "address",
              "name": "beacon",
              "type": "address"
            }
          ],
          "name": "BeaconUpgraded",
          "type": "event"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": false,
              "internalType": "address",
              "name": "sender",
              "type": "address"
            },
            {
              "indexed": true,
              "internalType": "bytes4",
              "name": "sig",
              "type": "bytes4"
            },
            {
              "indexed": false,
              "internalType": "bytes",
              "name": "data",
              "type": "bytes"
            }
          ],
          "name": "CallbackReceived",
          "type": "event"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": true,
              "internalType": "address",
              "name": "sender",
              "type": "address"
            },
            {
              "indexed": true,
              "internalType": "address",
              "name": "token",
              "type": "address"
            },
            {
              "indexed": false,
              "internalType": "uint256",
              "name": "amount",
              "type": "uint256"
            },
            {
              "indexed": false,
              "internalType": "string",
              "name": "_reference",
              "type": "string"
            }
          ],
          "name": "Deposited",
          "type": "event"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": true,
              "internalType": "address",
              "name": "actor",
              "type": "address"
            },
            {
              "indexed": false,
              "internalType": "bytes32",
              "name": "callId",
              "type": "bytes32"
            },
            {
              "components": [
                {
                  "internalType": "address",
                  "name": "to",
                  "type": "address"
                },
                {
                  "internalType": "uint256",
                  "name": "value",
                  "type": "uint256"
                },
                {
                  "internalType": "bytes",
                  "name": "data",
                  "type": "bytes"
                }
              ],
              "indexed": false,
              "internalType": "struct IDAO.Action[]",
              "name": "actions",
              "type": "tuple[]"
            },
            {
              "indexed": false,
              "internalType": "uint256",
              "name": "allowFailureMap",
              "type": "uint256"
            },
            {
              "indexed": false,
              "internalType": "uint256",
              "name": "failureMap",
              "type": "uint256"
            },
            {
              "indexed": false,
              "internalType": "bytes[]",
              "name": "execResults",
              "type": "bytes[]"
            }
          ],
          "name": "Executed",
          "type": "event"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": true,
              "internalType": "bytes32",
              "name": "permissionId",
              "type": "bytes32"
            },
            {
              "indexed": true,
              "internalType": "address",
              "name": "here",
              "type": "address"
            },
            {
              "indexed": false,
              "internalType": "address",
              "name": "where",
              "type": "address"
            },
            {
              "indexed": true,
              "internalType": "address",
              "name": "who",
              "type": "address"
            },
            {
              "indexed": false,
              "internalType": "address",
              "name": "condition",
              "type": "address"
            }
          ],
          "name": "Granted",
          "type": "event"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": false,
              "internalType": "uint8",
              "name": "version",
              "type": "uint8"
            }
          ],
          "name": "Initialized",
          "type": "event"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": false,
              "internalType": "bytes",
              "name": "metadata",
              "type": "bytes"
            }
          ],
          "name": "MetadataSet",
          "type": "event"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": false,
              "internalType": "address",
              "name": "sender",
              "type": "address"
            },
            {
              "indexed": false,
              "internalType": "uint256",
              "name": "amount",
              "type": "uint256"
            }
          ],
          "name": "NativeTokenDeposited",
          "type": "event"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": false,
              "internalType": "string",
              "name": "daoURI",
              "type": "string"
            }
          ],
          "name": "NewURI",
          "type": "event"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": true,
              "internalType": "bytes32",
              "name": "permissionId",
              "type": "bytes32"
            },
            {
              "indexed": true,
              "internalType": "address",
              "name": "here",
              "type": "address"
            },
            {
              "indexed": false,
              "internalType": "address",
              "name": "where",
              "type": "address"
            },
            {
              "indexed": true,
              "internalType": "address",
              "name": "who",
              "type": "address"
            }
          ],
          "name": "Revoked",
          "type": "event"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": false,
              "internalType": "address",
              "name": "signatureValidator",
              "type": "address"
            }
          ],
          "name": "SignatureValidatorSet",
          "type": "event"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": false,
              "internalType": "bytes4",
              "name": "interfaceId",
              "type": "bytes4"
            },
            {
              "indexed": false,
              "internalType": "bytes4",
              "name": "callbackSelector",
              "type": "bytes4"
            },
            {
              "indexed": false,
              "internalType": "bytes4",
              "name": "magicNumber",
              "type": "bytes4"
            }
          ],
          "name": "StandardCallbackRegistered",
          "type": "event"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": false,
              "internalType": "address",
              "name": "forwarder",
              "type": "address"
            }
          ],
          "name": "TrustedForwarderSet",
          "type": "event"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": true,
              "internalType": "address",
              "name": "implementation",
              "type": "address"
            }
          ],
          "name": "Upgraded",
          "type": "event"
        },
        {
          "stateMutability": "nonpayable",
          "type": "fallback"
        },
        {
          "inputs": [],
          "name": "EXECUTE_PERMISSION_ID",
          "outputs": [
            {
              "internalType": "bytes32",
              "name": "",
              "type": "bytes32"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "REGISTER_STANDARD_CALLBACK_PERMISSION_ID",
          "outputs": [
            {
              "internalType": "bytes32",
              "name": "",
              "type": "bytes32"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "ROOT_PERMISSION_ID",
          "outputs": [
            {
              "internalType": "bytes32",
              "name": "",
              "type": "bytes32"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "SET_METADATA_PERMISSION_ID",
          "outputs": [
            {
              "internalType": "bytes32",
              "name": "",
              "type": "bytes32"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "SET_SIGNATURE_VALIDATOR_PERMISSION_ID",
          "outputs": [
            {
              "internalType": "bytes32",
              "name": "",
              "type": "bytes32"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "SET_TRUSTED_FORWARDER_PERMISSION_ID",
          "outputs": [
            {
              "internalType": "bytes32",
              "name": "",
              "type": "bytes32"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "UPGRADE_DAO_PERMISSION_ID",
          "outputs": [
            {
              "internalType": "bytes32",
              "name": "",
              "type": "bytes32"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "components": [
                {
                  "internalType": "enum PermissionLib.Operation",
                  "name": "operation",
                  "type": "uint8"
                },
                {
                  "internalType": "address",
                  "name": "where",
                  "type": "address"
                },
                {
                  "internalType": "address",
                  "name": "who",
                  "type": "address"
                },
                {
                  "internalType": "address",
                  "name": "condition",
                  "type": "address"
                },
                {
                  "internalType": "bytes32",
                  "name": "permissionId",
                  "type": "bytes32"
                }
              ],
              "internalType": "struct PermissionLib.MultiTargetPermission[]",
              "name": "_items",
              "type": "tuple[]"
            }
          ],
          "name": "applyMultiTargetPermissions",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "_where",
              "type": "address"
            },
            {
              "components": [
                {
                  "internalType": "enum PermissionLib.Operation",
                  "name": "operation",
                  "type": "uint8"
                },
                {
                  "internalType": "address",
                  "name": "who",
                  "type": "address"
                },
                {
                  "internalType": "bytes32",
                  "name": "permissionId",
                  "type": "bytes32"
                }
              ],
              "internalType": "struct PermissionLib.SingleTargetPermission[]",
              "name": "items",
              "type": "tuple[]"
            }
          ],
          "name": "applySingleTargetPermissions",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "daoURI",
          "outputs": [
            {
              "internalType": "string",
              "name": "",
              "type": "string"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "_token",
              "type": "address"
            },
            {
              "internalType": "uint256",
              "name": "_amount",
              "type": "uint256"
            },
            {
              "internalType": "string",
              "name": "_reference",
              "type": "string"
            }
          ],
          "name": "deposit",
          "outputs": [],
          "stateMutability": "payable",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "bytes32",
              "name": "_callId",
              "type": "bytes32"
            },
            {
              "components": [
                {
                  "internalType": "address",
                  "name": "to",
                  "type": "address"
                },
                {
                  "internalType": "uint256",
                  "name": "value",
                  "type": "uint256"
                },
                {
                  "internalType": "bytes",
                  "name": "data",
                  "type": "bytes"
                }
              ],
              "internalType": "struct IDAO.Action[]",
              "name": "_actions",
              "type": "tuple[]"
            },
            {
              "internalType": "uint256",
              "name": "_allowFailureMap",
              "type": "uint256"
            }
          ],
          "name": "execute",
          "outputs": [
            {
              "internalType": "bytes[]",
              "name": "execResults",
              "type": "bytes[]"
            },
            {
              "internalType": "uint256",
              "name": "failureMap",
              "type": "uint256"
            }
          ],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "getTrustedForwarder",
          "outputs": [
            {
              "internalType": "address",
              "name": "",
              "type": "address"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "_where",
              "type": "address"
            },
            {
              "internalType": "address",
              "name": "_who",
              "type": "address"
            },
            {
              "internalType": "bytes32",
              "name": "_permissionId",
              "type": "bytes32"
            }
          ],
          "name": "grant",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "_where",
              "type": "address"
            },
            {
              "internalType": "address",
              "name": "_who",
              "type": "address"
            },
            {
              "internalType": "bytes32",
              "name": "_permissionId",
              "type": "bytes32"
            },
            {
              "internalType": "contract IPermissionCondition",
              "name": "_condition",
              "type": "address"
            }
          ],
          "name": "grantWithCondition",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "_where",
              "type": "address"
            },
            {
              "internalType": "address",
              "name": "_who",
              "type": "address"
            },
            {
              "internalType": "bytes32",
              "name": "_permissionId",
              "type": "bytes32"
            },
            {
              "internalType": "bytes",
              "name": "_data",
              "type": "bytes"
            }
          ],
          "name": "hasPermission",
          "outputs": [
            {
              "internalType": "bool",
              "name": "",
              "type": "bool"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "bytes",
              "name": "_metadata",
              "type": "bytes"
            },
            {
              "internalType": "address",
              "name": "_initialOwner",
              "type": "address"
            },
            {
              "internalType": "address",
              "name": "_trustedForwarder",
              "type": "address"
            },
            {
              "internalType": "string",
              "name": "daoURI_",
              "type": "string"
            }
          ],
          "name": "initialize",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "uint8[3]",
              "name": "_previousProtocolVersion",
              "type": "uint8[3]"
            },
            {
              "internalType": "bytes",
              "name": "_initData",
              "type": "bytes"
            }
          ],
          "name": "initializeFrom",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "_where",
              "type": "address"
            },
            {
              "internalType": "address",
              "name": "_who",
              "type": "address"
            },
            {
              "internalType": "bytes32",
              "name": "_permissionId",
              "type": "bytes32"
            },
            {
              "internalType": "bytes",
              "name": "_data",
              "type": "bytes"
            }
          ],
          "name": "isGranted",
          "outputs": [
            {
              "internalType": "bool",
              "name": "",
              "type": "bool"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "bytes32",
              "name": "_hash",
              "type": "bytes32"
            },
            {
              "internalType": "bytes",
              "name": "_signature",
              "type": "bytes"
            }
          ],
          "name": "isValidSignature",
          "outputs": [
            {
              "internalType": "bytes4",
              "name": "",
              "type": "bytes4"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "protocolVersion",
          "outputs": [
            {
              "internalType": "uint8[3]",
              "name": "",
              "type": "uint8[3]"
            }
          ],
          "stateMutability": "pure",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "proxiableUUID",
          "outputs": [
            {
              "internalType": "bytes32",
              "name": "",
              "type": "bytes32"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "bytes4",
              "name": "_interfaceId",
              "type": "bytes4"
            },
            {
              "internalType": "bytes4",
              "name": "_callbackSelector",
              "type": "bytes4"
            },
            {
              "internalType": "bytes4",
              "name": "_magicNumber",
              "type": "bytes4"
            }
          ],
          "name": "registerStandardCallback",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "_where",
              "type": "address"
            },
            {
              "internalType": "address",
              "name": "_who",
              "type": "address"
            },
            {
              "internalType": "bytes32",
              "name": "_permissionId",
              "type": "bytes32"
            }
          ],
          "name": "revoke",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "string",
              "name": "newDaoURI",
              "type": "string"
            }
          ],
          "name": "setDaoURI",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "bytes",
              "name": "_metadata",
              "type": "bytes"
            }
          ],
          "name": "setMetadata",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "_signatureValidator",
              "type": "address"
            }
          ],
          "name": "setSignatureValidator",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "_newTrustedForwarder",
              "type": "address"
            }
          ],
          "name": "setTrustedForwarder",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "signatureValidator",
          "outputs": [
            {
              "internalType": "contract IERC1271",
              "name": "",
              "type": "address"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "bytes4",
              "name": "interfaceId",
              "type": "bytes4"
            }
          ],
          "name": "supportsInterface",
          "outputs": [
            {
              "internalType": "bool",
              "name": "",
              "type": "bool"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "newImplementation",
              "type": "address"
            }
          ],
          "name": "upgradeTo",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "newImplementation",
              "type": "address"
            },
            {
              "internalType": "bytes",
              "name": "data",
              "type": "bytes"
            }
          ],
          "name": "upgradeToAndCall",
          "outputs": [],
          "stateMutability": "payable",
          "type": "function"
        },
        {
          "stateMutability": "payable",
          "type": "receive"
        }
      ]
    },
    "frontend_taskDrafts": {
      "address": "0x2d42916E47212bE927A15A7B32477d128e901BB2",
      "abi": [
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "dao",
              "type": "address"
            },
            {
              "internalType": "address",
              "name": "where",
              "type": "address"
            },
            {
              "internalType": "address",
              "name": "who",
              "type": "address"
            },
            {
              "internalType": "bytes32",
              "name": "permissionId",
              "type": "bytes32"
            }
          ],
          "name": "DaoUnauthorized",
          "type": "error"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": false,
              "internalType": "address",
              "name": "previousAdmin",
              "type": "address"
            },
            {
              "indexed": false,
              "internalType": "address",
              "name": "newAdmin",
              "type": "address"
            }
          ],
          "name": "AdminChanged",
          "type": "event"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": true,
              "internalType": "address",
              "name": "beacon",
              "type": "address"
            }
          ],
          "name": "BeaconUpgraded",
          "type": "event"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": false,
              "internalType": "uint8",
              "name": "version",
              "type": "uint8"
            }
          ],
          "name": "Initialized",
          "type": "event"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": false,
              "internalType": "uint256",
              "name": "proposalId",
              "type": "uint256"
            },
            {
              "indexed": false,
              "internalType": "bytes",
              "name": "metadata",
              "type": "bytes"
            },
            {
              "indexed": false,
              "internalType": "uint64",
              "name": "startDate",
              "type": "uint64"
            },
            {
              "indexed": false,
              "internalType": "uint64",
              "name": "endDate",
              "type": "uint64"
            },
            {
              "components": [
                {
                  "internalType": "string",
                  "name": "metadata",
                  "type": "string"
                },
                {
                  "internalType": "uint64",
                  "name": "deadline",
                  "type": "uint64"
                },
                {
                  "components": [
                    {
                      "internalType": "contract IERC20",
                      "name": "tokenContract",
                      "type": "address"
                    },
                    {
                      "internalType": "uint96",
                      "name": "amount",
                      "type": "uint96"
                    }
                  ],
                  "internalType": "struct ITasks.ERC20Transfer[]",
                  "name": "budget",
                  "type": "tuple[]"
                },
                {
                  "internalType": "address",
                  "name": "manager",
                  "type": "address"
                },
                {
                  "components": [
                    {
                      "internalType": "address",
                      "name": "applicant",
                      "type": "address"
                    },
                    {
                      "components": [
                        {
                          "internalType": "bool",
                          "name": "nextToken",
                          "type": "bool"
                        },
                        {
                          "internalType": "address",
                          "name": "to",
                          "type": "address"
                        },
                        {
                          "internalType": "uint88",
                          "name": "amount",
                          "type": "uint88"
                        }
                      ],
                      "internalType": "struct ITasks.Reward[]",
                      "name": "reward",
                      "type": "tuple[]"
                    }
                  ],
                  "internalType": "struct ITasks.PreapprovedApplication[]",
                  "name": "preapproved",
                  "type": "tuple[]"
                }
              ],
              "indexed": false,
              "internalType": "struct ITaskDrafts.CreateTaskInfo",
              "name": "taskInfo",
              "type": "tuple"
            }
          ],
          "name": "TaskDraftCreated",
          "type": "event"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": true,
              "internalType": "address",
              "name": "implementation",
              "type": "address"
            }
          ],
          "name": "Upgraded",
          "type": "event"
        },
        {
          "inputs": [],
          "name": "UPGRADE_PLUGIN_PERMISSION_ID",
          "outputs": [
            {
              "internalType": "bytes32",
              "name": "",
              "type": "bytes32"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "bytes",
              "name": "_metadata",
              "type": "bytes"
            },
            {
              "internalType": "uint64",
              "name": "_startDate",
              "type": "uint64"
            },
            {
              "internalType": "uint64",
              "name": "_endDate",
              "type": "uint64"
            },
            {
              "components": [
                {
                  "internalType": "string",
                  "name": "metadata",
                  "type": "string"
                },
                {
                  "internalType": "uint64",
                  "name": "deadline",
                  "type": "uint64"
                },
                {
                  "components": [
                    {
                      "internalType": "contract IERC20",
                      "name": "tokenContract",
                      "type": "address"
                    },
                    {
                      "internalType": "uint96",
                      "name": "amount",
                      "type": "uint96"
                    }
                  ],
                  "internalType": "struct ITasks.ERC20Transfer[]",
                  "name": "budget",
                  "type": "tuple[]"
                },
                {
                  "internalType": "address",
                  "name": "manager",
                  "type": "address"
                },
                {
                  "components": [
                    {
                      "internalType": "address",
                      "name": "applicant",
                      "type": "address"
                    },
                    {
                      "components": [
                        {
                          "internalType": "bool",
                          "name": "nextToken",
                          "type": "bool"
                        },
                        {
                          "internalType": "address",
                          "name": "to",
                          "type": "address"
                        },
                        {
                          "internalType": "uint88",
                          "name": "amount",
                          "type": "uint88"
                        }
                      ],
                      "internalType": "struct ITasks.Reward[]",
                      "name": "reward",
                      "type": "tuple[]"
                    }
                  ],
                  "internalType": "struct ITasks.PreapprovedApplication[]",
                  "name": "preapproved",
                  "type": "tuple[]"
                }
              ],
              "internalType": "struct ITaskDrafts.CreateTaskInfo",
              "name": "_taskInfo",
              "type": "tuple"
            }
          ],
          "name": "createDraftTask",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "dao",
          "outputs": [
            {
              "internalType": "contract IDAO",
              "name": "",
              "type": "address"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "getGovernanceContract",
          "outputs": [
            {
              "internalType": "contract IPluginProposals",
              "name": "",
              "type": "address"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "getTasksContract",
          "outputs": [
            {
              "internalType": "contract ITasks",
              "name": "",
              "type": "address"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "implementation",
          "outputs": [
            {
              "internalType": "address",
              "name": "",
              "type": "address"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "contract IDAO",
              "name": "_dao",
              "type": "address"
            },
            {
              "internalType": "contract ITasks",
              "name": "_tasks",
              "type": "address"
            },
            {
              "internalType": "contract IPluginProposals",
              "name": "_governancePlugin",
              "type": "address"
            }
          ],
          "name": "initialize",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "pluginType",
          "outputs": [
            {
              "internalType": "enum IPlugin.PluginType",
              "name": "",
              "type": "uint8"
            }
          ],
          "stateMutability": "pure",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "proxiableUUID",
          "outputs": [
            {
              "internalType": "bytes32",
              "name": "",
              "type": "bytes32"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "bytes4",
              "name": "_interfaceId",
              "type": "bytes4"
            }
          ],
          "name": "supportsInterface",
          "outputs": [
            {
              "internalType": "bool",
              "name": "",
              "type": "bool"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "contract ITasks",
              "name": "_tasks",
              "type": "address"
            },
            {
              "internalType": "contract IPluginProposals",
              "name": "_governancePlugin",
              "type": "address"
            }
          ],
          "name": "updateAddresses",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "newImplementation",
              "type": "address"
            }
          ],
          "name": "upgradeTo",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "newImplementation",
              "type": "address"
            },
            {
              "internalType": "bytes",
              "name": "data",
              "type": "bytes"
            }
          ],
          "name": "upgradeToAndCall",
          "outputs": [],
          "stateMutability": "payable",
          "type": "function"
        }
      ]
    },
    "frontend_tokenListGovernance": {
      "address": "0x23D4542e857eBa83503E4d0c60B2DF179Ae13E97",
      "abi": [
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "dao",
              "type": "address"
            },
            {
              "internalType": "address",
              "name": "where",
              "type": "address"
            },
            {
              "internalType": "address",
              "name": "who",
              "type": "address"
            },
            {
              "internalType": "bytes32",
              "name": "permissionId",
              "type": "bytes32"
            }
          ],
          "name": "DaoUnauthorized",
          "type": "error"
        },
        {
          "inputs": [
            {
              "internalType": "uint64",
              "name": "limit",
              "type": "uint64"
            },
            {
              "internalType": "uint64",
              "name": "actual",
              "type": "uint64"
            }
          ],
          "name": "DateOutOfBounds",
          "type": "error"
        },
        {
          "inputs": [
            {
              "internalType": "uint256",
              "name": "tokenId",
              "type": "uint256"
            }
          ],
          "name": "InvalidTokenlistUpdate",
          "type": "error"
        },
        {
          "inputs": [
            {
              "internalType": "uint64",
              "name": "limit",
              "type": "uint64"
            },
            {
              "internalType": "uint64",
              "name": "actual",
              "type": "uint64"
            }
          ],
          "name": "MinDurationOutOfBounds",
          "type": "error"
        },
        {
          "inputs": [
            {
              "internalType": "uint256",
              "name": "sender",
              "type": "uint256"
            }
          ],
          "name": "ProposalCreationForbidden",
          "type": "error"
        },
        {
          "inputs": [
            {
              "internalType": "uint256",
              "name": "proposalId",
              "type": "uint256"
            }
          ],
          "name": "ProposalExecutionForbidden",
          "type": "error"
        },
        {
          "inputs": [
            {
              "internalType": "uint256",
              "name": "limit",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "actual",
              "type": "uint256"
            }
          ],
          "name": "RatioOutOfBounds",
          "type": "error"
        },
        {
          "inputs": [
            {
              "internalType": "uint256",
              "name": "tokenId",
              "type": "uint256"
            },
            {
              "internalType": "address",
              "name": "sender",
              "type": "address"
            }
          ],
          "name": "TokenNotOwnedBySender",
          "type": "error"
        },
        {
          "inputs": [
            {
              "internalType": "uint256",
              "name": "proposalId",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "account",
              "type": "uint256"
            },
            {
              "internalType": "enum ITokenMajorityVoting.VoteOption",
              "name": "voteOption",
              "type": "uint8"
            }
          ],
          "name": "VoteCastForbidden",
          "type": "error"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": false,
              "internalType": "address",
              "name": "previousAdmin",
              "type": "address"
            },
            {
              "indexed": false,
              "internalType": "address",
              "name": "newAdmin",
              "type": "address"
            }
          ],
          "name": "AdminChanged",
          "type": "event"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": true,
              "internalType": "address",
              "name": "beacon",
              "type": "address"
            }
          ],
          "name": "BeaconUpgraded",
          "type": "event"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": false,
              "internalType": "uint8",
              "name": "version",
              "type": "uint8"
            }
          ],
          "name": "Initialized",
          "type": "event"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": false,
              "internalType": "uint256[]",
              "name": "members",
              "type": "uint256[]"
            }
          ],
          "name": "MembersAdded",
          "type": "event"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": false,
              "internalType": "uint256[]",
              "name": "members",
              "type": "uint256[]"
            }
          ],
          "name": "MembersRemoved",
          "type": "event"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": true,
              "internalType": "address",
              "name": "definingContract",
              "type": "address"
            }
          ],
          "name": "MembershipContractAnnounced",
          "type": "event"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": true,
              "internalType": "uint256",
              "name": "proposalId",
              "type": "uint256"
            },
            {
              "indexed": true,
              "internalType": "address",
              "name": "creator",
              "type": "address"
            },
            {
              "indexed": false,
              "internalType": "uint64",
              "name": "startDate",
              "type": "uint64"
            },
            {
              "indexed": false,
              "internalType": "uint64",
              "name": "endDate",
              "type": "uint64"
            },
            {
              "indexed": false,
              "internalType": "bytes",
              "name": "metadata",
              "type": "bytes"
            },
            {
              "components": [
                {
                  "internalType": "address",
                  "name": "to",
                  "type": "address"
                },
                {
                  "internalType": "uint256",
                  "name": "value",
                  "type": "uint256"
                },
                {
                  "internalType": "bytes",
                  "name": "data",
                  "type": "bytes"
                }
              ],
              "indexed": false,
              "internalType": "struct IDAO.Action[]",
              "name": "actions",
              "type": "tuple[]"
            },
            {
              "indexed": false,
              "internalType": "uint256",
              "name": "allowFailureMap",
              "type": "uint256"
            }
          ],
          "name": "ProposalCreated",
          "type": "event"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": true,
              "internalType": "uint256",
              "name": "proposalId",
              "type": "uint256"
            }
          ],
          "name": "ProposalExecuted",
          "type": "event"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": false,
              "internalType": "uint256[]",
              "name": "tokens",
              "type": "uint256[]"
            }
          ],
          "name": "TokensAdded",
          "type": "event"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": false,
              "internalType": "uint256[]",
              "name": "tokens",
              "type": "uint256[]"
            }
          ],
          "name": "TokensRemoved",
          "type": "event"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": true,
              "internalType": "address",
              "name": "implementation",
              "type": "address"
            }
          ],
          "name": "Upgraded",
          "type": "event"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": true,
              "internalType": "uint256",
              "name": "proposalId",
              "type": "uint256"
            },
            {
              "indexed": true,
              "internalType": "uint256",
              "name": "voter",
              "type": "uint256"
            },
            {
              "indexed": false,
              "internalType": "enum ITokenMajorityVoting.VoteOption",
              "name": "voteOption",
              "type": "uint8"
            },
            {
              "indexed": false,
              "internalType": "uint256",
              "name": "votingPower",
              "type": "uint256"
            }
          ],
          "name": "VoteCast",
          "type": "event"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": false,
              "internalType": "enum TokenMajorityVotingBase.VotingMode",
              "name": "votingMode",
              "type": "uint8"
            },
            {
              "indexed": false,
              "internalType": "uint32",
              "name": "supportThreshold",
              "type": "uint32"
            },
            {
              "indexed": false,
              "internalType": "uint32",
              "name": "minParticipation",
              "type": "uint32"
            },
            {
              "indexed": false,
              "internalType": "uint64",
              "name": "minDuration",
              "type": "uint64"
            },
            {
              "indexed": false,
              "internalType": "uint256",
              "name": "minProposerVotingPower",
              "type": "uint256"
            }
          ],
          "name": "VotingSettingsUpdated",
          "type": "event"
        },
        {
          "inputs": [],
          "name": "UPDATE_MEMBERS_PERMISSION_ID",
          "outputs": [
            {
              "internalType": "bytes32",
              "name": "",
              "type": "bytes32"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "UPDATE_VOTING_SETTINGS_PERMISSION_ID",
          "outputs": [
            {
              "internalType": "bytes32",
              "name": "",
              "type": "bytes32"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "UPGRADE_PLUGIN_PERMISSION_ID",
          "outputs": [
            {
              "internalType": "bytes32",
              "name": "",
              "type": "bytes32"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "uint256[]",
              "name": "_members",
              "type": "uint256[]"
            }
          ],
          "name": "addMembers",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "uint256",
              "name": "_proposalId",
              "type": "uint256"
            }
          ],
          "name": "canExecute",
          "outputs": [
            {
              "internalType": "bool",
              "name": "",
              "type": "bool"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "uint256",
              "name": "_proposalId",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "_account",
              "type": "uint256"
            },
            {
              "internalType": "enum ITokenMajorityVoting.VoteOption",
              "name": "_voteOption",
              "type": "uint8"
            }
          ],
          "name": "canVote",
          "outputs": [
            {
              "internalType": "bool",
              "name": "",
              "type": "bool"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "bytes",
              "name": "_metadata",
              "type": "bytes"
            },
            {
              "components": [
                {
                  "internalType": "address",
                  "name": "to",
                  "type": "address"
                },
                {
                  "internalType": "uint256",
                  "name": "value",
                  "type": "uint256"
                },
                {
                  "internalType": "bytes",
                  "name": "data",
                  "type": "bytes"
                }
              ],
              "internalType": "struct IDAO.Action[]",
              "name": "_actions",
              "type": "tuple[]"
            },
            {
              "internalType": "uint256",
              "name": "_allowFailureMap",
              "type": "uint256"
            },
            {
              "internalType": "uint64",
              "name": "_startDate",
              "type": "uint64"
            },
            {
              "internalType": "uint64",
              "name": "_endDate",
              "type": "uint64"
            }
          ],
          "name": "createPluginProposal",
          "outputs": [
            {
              "internalType": "uint256",
              "name": "proposalId",
              "type": "uint256"
            }
          ],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "bytes",
              "name": "_metadata",
              "type": "bytes"
            },
            {
              "components": [
                {
                  "internalType": "address",
                  "name": "to",
                  "type": "address"
                },
                {
                  "internalType": "uint256",
                  "name": "value",
                  "type": "uint256"
                },
                {
                  "internalType": "bytes",
                  "name": "data",
                  "type": "bytes"
                }
              ],
              "internalType": "struct IDAO.Action[]",
              "name": "_actions",
              "type": "tuple[]"
            },
            {
              "internalType": "uint256",
              "name": "_allowFailureMap",
              "type": "uint256"
            },
            {
              "internalType": "uint64",
              "name": "_startDate",
              "type": "uint64"
            },
            {
              "internalType": "uint64",
              "name": "_endDate",
              "type": "uint64"
            },
            {
              "internalType": "enum ITokenMajorityVoting.VoteOption",
              "name": "_voteOption",
              "type": "uint8"
            },
            {
              "internalType": "bool",
              "name": "_tryEarlyExecution",
              "type": "bool"
            },
            {
              "internalType": "uint256",
              "name": "_tokenId",
              "type": "uint256"
            }
          ],
          "name": "createProposal",
          "outputs": [
            {
              "internalType": "uint256",
              "name": "proposalId",
              "type": "uint256"
            }
          ],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "dao",
          "outputs": [
            {
              "internalType": "contract IDAO",
              "name": "",
              "type": "address"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "uint256",
              "name": "_proposalId",
              "type": "uint256"
            }
          ],
          "name": "execute",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "uint256",
              "name": "_proposalId",
              "type": "uint256"
            }
          ],
          "name": "getProposal",
          "outputs": [
            {
              "internalType": "bool",
              "name": "open",
              "type": "bool"
            },
            {
              "internalType": "bool",
              "name": "executed",
              "type": "bool"
            },
            {
              "components": [
                {
                  "internalType": "enum TokenMajorityVotingBase.VotingMode",
                  "name": "votingMode",
                  "type": "uint8"
                },
                {
                  "internalType": "uint32",
                  "name": "supportThreshold",
                  "type": "uint32"
                },
                {
                  "internalType": "uint64",
                  "name": "startDate",
                  "type": "uint64"
                },
                {
                  "internalType": "uint64",
                  "name": "endDate",
                  "type": "uint64"
                },
                {
                  "internalType": "uint64",
                  "name": "snapshotBlock",
                  "type": "uint64"
                },
                {
                  "internalType": "uint256",
                  "name": "minVotingPower",
                  "type": "uint256"
                }
              ],
              "internalType": "struct TokenMajorityVotingBase.ProposalParameters",
              "name": "parameters",
              "type": "tuple"
            },
            {
              "components": [
                {
                  "internalType": "uint256",
                  "name": "abstain",
                  "type": "uint256"
                },
                {
                  "internalType": "uint256",
                  "name": "yes",
                  "type": "uint256"
                },
                {
                  "internalType": "uint256",
                  "name": "no",
                  "type": "uint256"
                }
              ],
              "internalType": "struct TokenMajorityVotingBase.Tally",
              "name": "tally",
              "type": "tuple"
            },
            {
              "components": [
                {
                  "internalType": "address",
                  "name": "to",
                  "type": "address"
                },
                {
                  "internalType": "uint256",
                  "name": "value",
                  "type": "uint256"
                },
                {
                  "internalType": "bytes",
                  "name": "data",
                  "type": "bytes"
                }
              ],
              "internalType": "struct IDAO.Action[]",
              "name": "actions",
              "type": "tuple[]"
            },
            {
              "internalType": "uint256",
              "name": "allowFailureMap",
              "type": "uint256"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "uint256",
              "name": "_proposalId",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "_account",
              "type": "uint256"
            }
          ],
          "name": "getVoteOption",
          "outputs": [
            {
              "internalType": "enum ITokenMajorityVoting.VoteOption",
              "name": "",
              "type": "uint8"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "implementation",
          "outputs": [
            {
              "internalType": "address",
              "name": "",
              "type": "address"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "contract IDAO",
              "name": "_dao",
              "type": "address"
            },
            {
              "components": [
                {
                  "internalType": "enum TokenMajorityVotingBase.VotingMode",
                  "name": "votingMode",
                  "type": "uint8"
                },
                {
                  "internalType": "uint32",
                  "name": "supportThreshold",
                  "type": "uint32"
                },
                {
                  "internalType": "uint32",
                  "name": "minParticipation",
                  "type": "uint32"
                },
                {
                  "internalType": "uint64",
                  "name": "minDuration",
                  "type": "uint64"
                },
                {
                  "internalType": "uint256",
                  "name": "minProposerVotingPower",
                  "type": "uint256"
                }
              ],
              "internalType": "struct TokenMajorityVotingBase.VotingSettings",
              "name": "_votingSettings",
              "type": "tuple"
            },
            {
              "internalType": "contract IERC721",
              "name": "_tokenCollection",
              "type": "address"
            },
            {
              "internalType": "uint256[]",
              "name": "_members",
              "type": "uint256[]"
            }
          ],
          "name": "initialize",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "uint256",
              "name": "_tokenId",
              "type": "uint256"
            }
          ],
          "name": "isListed",
          "outputs": [
            {
              "internalType": "bool",
              "name": "",
              "type": "bool"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "uint256",
              "name": "_tokenId",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "_blockNumber",
              "type": "uint256"
            }
          ],
          "name": "isListedAtBlock",
          "outputs": [
            {
              "internalType": "bool",
              "name": "",
              "type": "bool"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "uint256",
              "name": "_account",
              "type": "uint256"
            }
          ],
          "name": "isMember",
          "outputs": [
            {
              "internalType": "bool",
              "name": "",
              "type": "bool"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "uint256",
              "name": "_proposalId",
              "type": "uint256"
            }
          ],
          "name": "isMinParticipationReached",
          "outputs": [
            {
              "internalType": "bool",
              "name": "",
              "type": "bool"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "uint256",
              "name": "_proposalId",
              "type": "uint256"
            }
          ],
          "name": "isSupportThresholdReached",
          "outputs": [
            {
              "internalType": "bool",
              "name": "",
              "type": "bool"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "uint256",
              "name": "_proposalId",
              "type": "uint256"
            }
          ],
          "name": "isSupportThresholdReachedEarly",
          "outputs": [
            {
              "internalType": "bool",
              "name": "",
              "type": "bool"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "minDuration",
          "outputs": [
            {
              "internalType": "uint64",
              "name": "",
              "type": "uint64"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "minParticipation",
          "outputs": [
            {
              "internalType": "uint32",
              "name": "",
              "type": "uint32"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "minProposerVotingPower",
          "outputs": [
            {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "pluginType",
          "outputs": [
            {
              "internalType": "enum IPlugin.PluginType",
              "name": "",
              "type": "uint8"
            }
          ],
          "stateMutability": "pure",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "proposalCount",
          "outputs": [
            {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "proxiableUUID",
          "outputs": [
            {
              "internalType": "bytes32",
              "name": "",
              "type": "bytes32"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "uint256[]",
              "name": "_members",
              "type": "uint256[]"
            }
          ],
          "name": "removeMembers",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "supportThreshold",
          "outputs": [
            {
              "internalType": "uint32",
              "name": "",
              "type": "uint32"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "bytes4",
              "name": "_interfaceId",
              "type": "bytes4"
            }
          ],
          "name": "supportsInterface",
          "outputs": [
            {
              "internalType": "bool",
              "name": "",
              "type": "bool"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "tokenlistLength",
          "outputs": [
            {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "uint256",
              "name": "_blockNumber",
              "type": "uint256"
            }
          ],
          "name": "tokenlistLengthAtBlock",
          "outputs": [
            {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "uint256",
              "name": "_blockNumber",
              "type": "uint256"
            }
          ],
          "name": "totalVotingPower",
          "outputs": [
            {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "components": [
                {
                  "internalType": "enum TokenMajorityVotingBase.VotingMode",
                  "name": "votingMode",
                  "type": "uint8"
                },
                {
                  "internalType": "uint32",
                  "name": "supportThreshold",
                  "type": "uint32"
                },
                {
                  "internalType": "uint32",
                  "name": "minParticipation",
                  "type": "uint32"
                },
                {
                  "internalType": "uint64",
                  "name": "minDuration",
                  "type": "uint64"
                },
                {
                  "internalType": "uint256",
                  "name": "minProposerVotingPower",
                  "type": "uint256"
                }
              ],
              "internalType": "struct TokenMajorityVotingBase.VotingSettings",
              "name": "_votingSettings",
              "type": "tuple"
            }
          ],
          "name": "updateVotingSettings",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "newImplementation",
              "type": "address"
            }
          ],
          "name": "upgradeTo",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "newImplementation",
              "type": "address"
            },
            {
              "internalType": "bytes",
              "name": "data",
              "type": "bytes"
            }
          ],
          "name": "upgradeToAndCall",
          "outputs": [],
          "stateMutability": "payable",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "uint256",
              "name": "_proposalId",
              "type": "uint256"
            },
            {
              "internalType": "enum ITokenMajorityVoting.VoteOption",
              "name": "_voteOption",
              "type": "uint8"
            },
            {
              "internalType": "bool",
              "name": "_tryEarlyExecution",
              "type": "bool"
            },
            {
              "internalType": "uint256",
              "name": "_tokenId",
              "type": "uint256"
            }
          ],
          "name": "vote",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "votingMode",
          "outputs": [
            {
              "internalType": "enum TokenMajorityVotingBase.VotingMode",
              "name": "",
              "type": "uint8"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        }
      ]
    },
    "management_dao": {
      "address": "0x9067F2F45ddb99ee5C4F3165eDCaC65EDa08b181",
      "abi": [
        {
          "inputs": [],
          "stateMutability": "nonpayable",
          "type": "constructor"
        },
        {
          "inputs": [
            {
              "internalType": "uint256",
              "name": "index",
              "type": "uint256"
            }
          ],
          "name": "ActionFailed",
          "type": "error"
        },
        {
          "inputs": [],
          "name": "AnyAddressDisallowedForWhoAndWhere",
          "type": "error"
        },
        {
          "inputs": [
            {
              "internalType": "contract IPermissionCondition",
              "name": "condition",
              "type": "address"
            }
          ],
          "name": "ConditionInterfacNotSupported",
          "type": "error"
        },
        {
          "inputs": [
            {
              "internalType": "contract IPermissionCondition",
              "name": "condition",
              "type": "address"
            }
          ],
          "name": "ConditionNotAContract",
          "type": "error"
        },
        {
          "inputs": [],
          "name": "GrantWithConditionNotSupported",
          "type": "error"
        },
        {
          "inputs": [],
          "name": "InsufficientGas",
          "type": "error"
        },
        {
          "inputs": [
            {
              "internalType": "uint256",
              "name": "expected",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "actual",
              "type": "uint256"
            }
          ],
          "name": "NativeTokenDepositAmountMismatch",
          "type": "error"
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "where",
              "type": "address"
            },
            {
              "internalType": "address",
              "name": "who",
              "type": "address"
            },
            {
              "internalType": "bytes32",
              "name": "permissionId",
              "type": "bytes32"
            },
            {
              "internalType": "address",
              "name": "currentCondition",
              "type": "address"
            },
            {
              "internalType": "address",
              "name": "newCondition",
              "type": "address"
            }
          ],
          "name": "PermissionAlreadyGrantedForDifferentCondition",
          "type": "error"
        },
        {
          "inputs": [],
          "name": "PermissionsForAnyAddressDisallowed",
          "type": "error"
        },
        {
          "inputs": [
            {
              "internalType": "uint8[3]",
              "name": "protocolVersion",
              "type": "uint8[3]"
            }
          ],
          "name": "ProtocolVersionUpgradeNotSupported",
          "type": "error"
        },
        {
          "inputs": [],
          "name": "ReentrantCall",
          "type": "error"
        },
        {
          "inputs": [],
          "name": "TooManyActions",
          "type": "error"
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "where",
              "type": "address"
            },
            {
              "internalType": "address",
              "name": "who",
              "type": "address"
            },
            {
              "internalType": "bytes32",
              "name": "permissionId",
              "type": "bytes32"
            }
          ],
          "name": "Unauthorized",
          "type": "error"
        },
        {
          "inputs": [
            {
              "internalType": "bytes4",
              "name": "callbackSelector",
              "type": "bytes4"
            },
            {
              "internalType": "bytes4",
              "name": "magicNumber",
              "type": "bytes4"
            }
          ],
          "name": "UnkownCallback",
          "type": "error"
        },
        {
          "inputs": [],
          "name": "ZeroAmount",
          "type": "error"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": false,
              "internalType": "address",
              "name": "previousAdmin",
              "type": "address"
            },
            {
              "indexed": false,
              "internalType": "address",
              "name": "newAdmin",
              "type": "address"
            }
          ],
          "name": "AdminChanged",
          "type": "event"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": true,
              "internalType": "address",
              "name": "beacon",
              "type": "address"
            }
          ],
          "name": "BeaconUpgraded",
          "type": "event"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": false,
              "internalType": "address",
              "name": "sender",
              "type": "address"
            },
            {
              "indexed": true,
              "internalType": "bytes4",
              "name": "sig",
              "type": "bytes4"
            },
            {
              "indexed": false,
              "internalType": "bytes",
              "name": "data",
              "type": "bytes"
            }
          ],
          "name": "CallbackReceived",
          "type": "event"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": true,
              "internalType": "address",
              "name": "sender",
              "type": "address"
            },
            {
              "indexed": true,
              "internalType": "address",
              "name": "token",
              "type": "address"
            },
            {
              "indexed": false,
              "internalType": "uint256",
              "name": "amount",
              "type": "uint256"
            },
            {
              "indexed": false,
              "internalType": "string",
              "name": "_reference",
              "type": "string"
            }
          ],
          "name": "Deposited",
          "type": "event"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": true,
              "internalType": "address",
              "name": "actor",
              "type": "address"
            },
            {
              "indexed": false,
              "internalType": "bytes32",
              "name": "callId",
              "type": "bytes32"
            },
            {
              "components": [
                {
                  "internalType": "address",
                  "name": "to",
                  "type": "address"
                },
                {
                  "internalType": "uint256",
                  "name": "value",
                  "type": "uint256"
                },
                {
                  "internalType": "bytes",
                  "name": "data",
                  "type": "bytes"
                }
              ],
              "indexed": false,
              "internalType": "struct IDAO.Action[]",
              "name": "actions",
              "type": "tuple[]"
            },
            {
              "indexed": false,
              "internalType": "uint256",
              "name": "allowFailureMap",
              "type": "uint256"
            },
            {
              "indexed": false,
              "internalType": "uint256",
              "name": "failureMap",
              "type": "uint256"
            },
            {
              "indexed": false,
              "internalType": "bytes[]",
              "name": "execResults",
              "type": "bytes[]"
            }
          ],
          "name": "Executed",
          "type": "event"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": true,
              "internalType": "bytes32",
              "name": "permissionId",
              "type": "bytes32"
            },
            {
              "indexed": true,
              "internalType": "address",
              "name": "here",
              "type": "address"
            },
            {
              "indexed": false,
              "internalType": "address",
              "name": "where",
              "type": "address"
            },
            {
              "indexed": true,
              "internalType": "address",
              "name": "who",
              "type": "address"
            },
            {
              "indexed": false,
              "internalType": "address",
              "name": "condition",
              "type": "address"
            }
          ],
          "name": "Granted",
          "type": "event"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": false,
              "internalType": "uint8",
              "name": "version",
              "type": "uint8"
            }
          ],
          "name": "Initialized",
          "type": "event"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": false,
              "internalType": "bytes",
              "name": "metadata",
              "type": "bytes"
            }
          ],
          "name": "MetadataSet",
          "type": "event"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": false,
              "internalType": "address",
              "name": "sender",
              "type": "address"
            },
            {
              "indexed": false,
              "internalType": "uint256",
              "name": "amount",
              "type": "uint256"
            }
          ],
          "name": "NativeTokenDeposited",
          "type": "event"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": false,
              "internalType": "string",
              "name": "daoURI",
              "type": "string"
            }
          ],
          "name": "NewURI",
          "type": "event"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": true,
              "internalType": "bytes32",
              "name": "permissionId",
              "type": "bytes32"
            },
            {
              "indexed": true,
              "internalType": "address",
              "name": "here",
              "type": "address"
            },
            {
              "indexed": false,
              "internalType": "address",
              "name": "where",
              "type": "address"
            },
            {
              "indexed": true,
              "internalType": "address",
              "name": "who",
              "type": "address"
            }
          ],
          "name": "Revoked",
          "type": "event"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": false,
              "internalType": "address",
              "name": "signatureValidator",
              "type": "address"
            }
          ],
          "name": "SignatureValidatorSet",
          "type": "event"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": false,
              "internalType": "bytes4",
              "name": "interfaceId",
              "type": "bytes4"
            },
            {
              "indexed": false,
              "internalType": "bytes4",
              "name": "callbackSelector",
              "type": "bytes4"
            },
            {
              "indexed": false,
              "internalType": "bytes4",
              "name": "magicNumber",
              "type": "bytes4"
            }
          ],
          "name": "StandardCallbackRegistered",
          "type": "event"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": false,
              "internalType": "address",
              "name": "forwarder",
              "type": "address"
            }
          ],
          "name": "TrustedForwarderSet",
          "type": "event"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": true,
              "internalType": "address",
              "name": "implementation",
              "type": "address"
            }
          ],
          "name": "Upgraded",
          "type": "event"
        },
        {
          "stateMutability": "nonpayable",
          "type": "fallback"
        },
        {
          "inputs": [],
          "name": "EXECUTE_PERMISSION_ID",
          "outputs": [
            {
              "internalType": "bytes32",
              "name": "",
              "type": "bytes32"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "REGISTER_STANDARD_CALLBACK_PERMISSION_ID",
          "outputs": [
            {
              "internalType": "bytes32",
              "name": "",
              "type": "bytes32"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "ROOT_PERMISSION_ID",
          "outputs": [
            {
              "internalType": "bytes32",
              "name": "",
              "type": "bytes32"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "SET_METADATA_PERMISSION_ID",
          "outputs": [
            {
              "internalType": "bytes32",
              "name": "",
              "type": "bytes32"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "SET_SIGNATURE_VALIDATOR_PERMISSION_ID",
          "outputs": [
            {
              "internalType": "bytes32",
              "name": "",
              "type": "bytes32"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "SET_TRUSTED_FORWARDER_PERMISSION_ID",
          "outputs": [
            {
              "internalType": "bytes32",
              "name": "",
              "type": "bytes32"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "UPGRADE_DAO_PERMISSION_ID",
          "outputs": [
            {
              "internalType": "bytes32",
              "name": "",
              "type": "bytes32"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "components": [
                {
                  "internalType": "enum PermissionLib.Operation",
                  "name": "operation",
                  "type": "uint8"
                },
                {
                  "internalType": "address",
                  "name": "where",
                  "type": "address"
                },
                {
                  "internalType": "address",
                  "name": "who",
                  "type": "address"
                },
                {
                  "internalType": "address",
                  "name": "condition",
                  "type": "address"
                },
                {
                  "internalType": "bytes32",
                  "name": "permissionId",
                  "type": "bytes32"
                }
              ],
              "internalType": "struct PermissionLib.MultiTargetPermission[]",
              "name": "_items",
              "type": "tuple[]"
            }
          ],
          "name": "applyMultiTargetPermissions",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "_where",
              "type": "address"
            },
            {
              "components": [
                {
                  "internalType": "enum PermissionLib.Operation",
                  "name": "operation",
                  "type": "uint8"
                },
                {
                  "internalType": "address",
                  "name": "who",
                  "type": "address"
                },
                {
                  "internalType": "bytes32",
                  "name": "permissionId",
                  "type": "bytes32"
                }
              ],
              "internalType": "struct PermissionLib.SingleTargetPermission[]",
              "name": "items",
              "type": "tuple[]"
            }
          ],
          "name": "applySingleTargetPermissions",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "daoURI",
          "outputs": [
            {
              "internalType": "string",
              "name": "",
              "type": "string"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "_token",
              "type": "address"
            },
            {
              "internalType": "uint256",
              "name": "_amount",
              "type": "uint256"
            },
            {
              "internalType": "string",
              "name": "_reference",
              "type": "string"
            }
          ],
          "name": "deposit",
          "outputs": [],
          "stateMutability": "payable",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "bytes32",
              "name": "_callId",
              "type": "bytes32"
            },
            {
              "components": [
                {
                  "internalType": "address",
                  "name": "to",
                  "type": "address"
                },
                {
                  "internalType": "uint256",
                  "name": "value",
                  "type": "uint256"
                },
                {
                  "internalType": "bytes",
                  "name": "data",
                  "type": "bytes"
                }
              ],
              "internalType": "struct IDAO.Action[]",
              "name": "_actions",
              "type": "tuple[]"
            },
            {
              "internalType": "uint256",
              "name": "_allowFailureMap",
              "type": "uint256"
            }
          ],
          "name": "execute",
          "outputs": [
            {
              "internalType": "bytes[]",
              "name": "execResults",
              "type": "bytes[]"
            },
            {
              "internalType": "uint256",
              "name": "failureMap",
              "type": "uint256"
            }
          ],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "getTrustedForwarder",
          "outputs": [
            {
              "internalType": "address",
              "name": "",
              "type": "address"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "_where",
              "type": "address"
            },
            {
              "internalType": "address",
              "name": "_who",
              "type": "address"
            },
            {
              "internalType": "bytes32",
              "name": "_permissionId",
              "type": "bytes32"
            }
          ],
          "name": "grant",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "_where",
              "type": "address"
            },
            {
              "internalType": "address",
              "name": "_who",
              "type": "address"
            },
            {
              "internalType": "bytes32",
              "name": "_permissionId",
              "type": "bytes32"
            },
            {
              "internalType": "contract IPermissionCondition",
              "name": "_condition",
              "type": "address"
            }
          ],
          "name": "grantWithCondition",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "_where",
              "type": "address"
            },
            {
              "internalType": "address",
              "name": "_who",
              "type": "address"
            },
            {
              "internalType": "bytes32",
              "name": "_permissionId",
              "type": "bytes32"
            },
            {
              "internalType": "bytes",
              "name": "_data",
              "type": "bytes"
            }
          ],
          "name": "hasPermission",
          "outputs": [
            {
              "internalType": "bool",
              "name": "",
              "type": "bool"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "bytes",
              "name": "_metadata",
              "type": "bytes"
            },
            {
              "internalType": "address",
              "name": "_initialOwner",
              "type": "address"
            },
            {
              "internalType": "address",
              "name": "_trustedForwarder",
              "type": "address"
            },
            {
              "internalType": "string",
              "name": "daoURI_",
              "type": "string"
            }
          ],
          "name": "initialize",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "uint8[3]",
              "name": "_previousProtocolVersion",
              "type": "uint8[3]"
            },
            {
              "internalType": "bytes",
              "name": "_initData",
              "type": "bytes"
            }
          ],
          "name": "initializeFrom",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "_where",
              "type": "address"
            },
            {
              "internalType": "address",
              "name": "_who",
              "type": "address"
            },
            {
              "internalType": "bytes32",
              "name": "_permissionId",
              "type": "bytes32"
            },
            {
              "internalType": "bytes",
              "name": "_data",
              "type": "bytes"
            }
          ],
          "name": "isGranted",
          "outputs": [
            {
              "internalType": "bool",
              "name": "",
              "type": "bool"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "bytes32",
              "name": "_hash",
              "type": "bytes32"
            },
            {
              "internalType": "bytes",
              "name": "_signature",
              "type": "bytes"
            }
          ],
          "name": "isValidSignature",
          "outputs": [
            {
              "internalType": "bytes4",
              "name": "",
              "type": "bytes4"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "protocolVersion",
          "outputs": [
            {
              "internalType": "uint8[3]",
              "name": "",
              "type": "uint8[3]"
            }
          ],
          "stateMutability": "pure",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "proxiableUUID",
          "outputs": [
            {
              "internalType": "bytes32",
              "name": "",
              "type": "bytes32"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "bytes4",
              "name": "_interfaceId",
              "type": "bytes4"
            },
            {
              "internalType": "bytes4",
              "name": "_callbackSelector",
              "type": "bytes4"
            },
            {
              "internalType": "bytes4",
              "name": "_magicNumber",
              "type": "bytes4"
            }
          ],
          "name": "registerStandardCallback",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "_where",
              "type": "address"
            },
            {
              "internalType": "address",
              "name": "_who",
              "type": "address"
            },
            {
              "internalType": "bytes32",
              "name": "_permissionId",
              "type": "bytes32"
            }
          ],
          "name": "revoke",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "string",
              "name": "newDaoURI",
              "type": "string"
            }
          ],
          "name": "setDaoURI",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "bytes",
              "name": "_metadata",
              "type": "bytes"
            }
          ],
          "name": "setMetadata",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "_signatureValidator",
              "type": "address"
            }
          ],
          "name": "setSignatureValidator",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "_newTrustedForwarder",
              "type": "address"
            }
          ],
          "name": "setTrustedForwarder",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "signatureValidator",
          "outputs": [
            {
              "internalType": "contract IERC1271",
              "name": "",
              "type": "address"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "bytes4",
              "name": "interfaceId",
              "type": "bytes4"
            }
          ],
          "name": "supportsInterface",
          "outputs": [
            {
              "internalType": "bool",
              "name": "",
              "type": "bool"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "newImplementation",
              "type": "address"
            }
          ],
          "name": "upgradeTo",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "newImplementation",
              "type": "address"
            },
            {
              "internalType": "bytes",
              "name": "data",
              "type": "bytes"
            }
          ],
          "name": "upgradeToAndCall",
          "outputs": [],
          "stateMutability": "payable",
          "type": "function"
        },
        {
          "stateMutability": "payable",
          "type": "receive"
        }
      ]
    },
    "management_tokenListGovernance": {
      "address": "0xbF480cFCd5d46Fee0AdA5ddedc4649C90a2Db209",
      "abi": [
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "dao",
              "type": "address"
            },
            {
              "internalType": "address",
              "name": "where",
              "type": "address"
            },
            {
              "internalType": "address",
              "name": "who",
              "type": "address"
            },
            {
              "internalType": "bytes32",
              "name": "permissionId",
              "type": "bytes32"
            }
          ],
          "name": "DaoUnauthorized",
          "type": "error"
        },
        {
          "inputs": [
            {
              "internalType": "uint64",
              "name": "limit",
              "type": "uint64"
            },
            {
              "internalType": "uint64",
              "name": "actual",
              "type": "uint64"
            }
          ],
          "name": "DateOutOfBounds",
          "type": "error"
        },
        {
          "inputs": [
            {
              "internalType": "uint256",
              "name": "tokenId",
              "type": "uint256"
            }
          ],
          "name": "InvalidTokenlistUpdate",
          "type": "error"
        },
        {
          "inputs": [
            {
              "internalType": "uint64",
              "name": "limit",
              "type": "uint64"
            },
            {
              "internalType": "uint64",
              "name": "actual",
              "type": "uint64"
            }
          ],
          "name": "MinDurationOutOfBounds",
          "type": "error"
        },
        {
          "inputs": [
            {
              "internalType": "uint256",
              "name": "sender",
              "type": "uint256"
            }
          ],
          "name": "ProposalCreationForbidden",
          "type": "error"
        },
        {
          "inputs": [
            {
              "internalType": "uint256",
              "name": "proposalId",
              "type": "uint256"
            }
          ],
          "name": "ProposalExecutionForbidden",
          "type": "error"
        },
        {
          "inputs": [
            {
              "internalType": "uint256",
              "name": "limit",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "actual",
              "type": "uint256"
            }
          ],
          "name": "RatioOutOfBounds",
          "type": "error"
        },
        {
          "inputs": [
            {
              "internalType": "uint256",
              "name": "tokenId",
              "type": "uint256"
            },
            {
              "internalType": "address",
              "name": "sender",
              "type": "address"
            }
          ],
          "name": "TokenNotOwnedBySender",
          "type": "error"
        },
        {
          "inputs": [
            {
              "internalType": "uint256",
              "name": "proposalId",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "account",
              "type": "uint256"
            },
            {
              "internalType": "enum ITokenMajorityVoting.VoteOption",
              "name": "voteOption",
              "type": "uint8"
            }
          ],
          "name": "VoteCastForbidden",
          "type": "error"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": false,
              "internalType": "address",
              "name": "previousAdmin",
              "type": "address"
            },
            {
              "indexed": false,
              "internalType": "address",
              "name": "newAdmin",
              "type": "address"
            }
          ],
          "name": "AdminChanged",
          "type": "event"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": true,
              "internalType": "address",
              "name": "beacon",
              "type": "address"
            }
          ],
          "name": "BeaconUpgraded",
          "type": "event"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": false,
              "internalType": "uint8",
              "name": "version",
              "type": "uint8"
            }
          ],
          "name": "Initialized",
          "type": "event"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": false,
              "internalType": "uint256[]",
              "name": "members",
              "type": "uint256[]"
            }
          ],
          "name": "MembersAdded",
          "type": "event"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": false,
              "internalType": "uint256[]",
              "name": "members",
              "type": "uint256[]"
            }
          ],
          "name": "MembersRemoved",
          "type": "event"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": true,
              "internalType": "address",
              "name": "definingContract",
              "type": "address"
            }
          ],
          "name": "MembershipContractAnnounced",
          "type": "event"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": true,
              "internalType": "uint256",
              "name": "proposalId",
              "type": "uint256"
            },
            {
              "indexed": true,
              "internalType": "address",
              "name": "creator",
              "type": "address"
            },
            {
              "indexed": false,
              "internalType": "uint64",
              "name": "startDate",
              "type": "uint64"
            },
            {
              "indexed": false,
              "internalType": "uint64",
              "name": "endDate",
              "type": "uint64"
            },
            {
              "indexed": false,
              "internalType": "bytes",
              "name": "metadata",
              "type": "bytes"
            },
            {
              "components": [
                {
                  "internalType": "address",
                  "name": "to",
                  "type": "address"
                },
                {
                  "internalType": "uint256",
                  "name": "value",
                  "type": "uint256"
                },
                {
                  "internalType": "bytes",
                  "name": "data",
                  "type": "bytes"
                }
              ],
              "indexed": false,
              "internalType": "struct IDAO.Action[]",
              "name": "actions",
              "type": "tuple[]"
            },
            {
              "indexed": false,
              "internalType": "uint256",
              "name": "allowFailureMap",
              "type": "uint256"
            }
          ],
          "name": "ProposalCreated",
          "type": "event"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": true,
              "internalType": "uint256",
              "name": "proposalId",
              "type": "uint256"
            }
          ],
          "name": "ProposalExecuted",
          "type": "event"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": false,
              "internalType": "uint256[]",
              "name": "tokens",
              "type": "uint256[]"
            }
          ],
          "name": "TokensAdded",
          "type": "event"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": false,
              "internalType": "uint256[]",
              "name": "tokens",
              "type": "uint256[]"
            }
          ],
          "name": "TokensRemoved",
          "type": "event"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": true,
              "internalType": "address",
              "name": "implementation",
              "type": "address"
            }
          ],
          "name": "Upgraded",
          "type": "event"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": true,
              "internalType": "uint256",
              "name": "proposalId",
              "type": "uint256"
            },
            {
              "indexed": true,
              "internalType": "uint256",
              "name": "voter",
              "type": "uint256"
            },
            {
              "indexed": false,
              "internalType": "enum ITokenMajorityVoting.VoteOption",
              "name": "voteOption",
              "type": "uint8"
            },
            {
              "indexed": false,
              "internalType": "uint256",
              "name": "votingPower",
              "type": "uint256"
            }
          ],
          "name": "VoteCast",
          "type": "event"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": false,
              "internalType": "enum TokenMajorityVotingBase.VotingMode",
              "name": "votingMode",
              "type": "uint8"
            },
            {
              "indexed": false,
              "internalType": "uint32",
              "name": "supportThreshold",
              "type": "uint32"
            },
            {
              "indexed": false,
              "internalType": "uint32",
              "name": "minParticipation",
              "type": "uint32"
            },
            {
              "indexed": false,
              "internalType": "uint64",
              "name": "minDuration",
              "type": "uint64"
            },
            {
              "indexed": false,
              "internalType": "uint256",
              "name": "minProposerVotingPower",
              "type": "uint256"
            }
          ],
          "name": "VotingSettingsUpdated",
          "type": "event"
        },
        {
          "inputs": [],
          "name": "UPDATE_MEMBERS_PERMISSION_ID",
          "outputs": [
            {
              "internalType": "bytes32",
              "name": "",
              "type": "bytes32"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "UPDATE_VOTING_SETTINGS_PERMISSION_ID",
          "outputs": [
            {
              "internalType": "bytes32",
              "name": "",
              "type": "bytes32"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "UPGRADE_PLUGIN_PERMISSION_ID",
          "outputs": [
            {
              "internalType": "bytes32",
              "name": "",
              "type": "bytes32"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "uint256[]",
              "name": "_members",
              "type": "uint256[]"
            }
          ],
          "name": "addMembers",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "uint256",
              "name": "_proposalId",
              "type": "uint256"
            }
          ],
          "name": "canExecute",
          "outputs": [
            {
              "internalType": "bool",
              "name": "",
              "type": "bool"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "uint256",
              "name": "_proposalId",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "_account",
              "type": "uint256"
            },
            {
              "internalType": "enum ITokenMajorityVoting.VoteOption",
              "name": "_voteOption",
              "type": "uint8"
            }
          ],
          "name": "canVote",
          "outputs": [
            {
              "internalType": "bool",
              "name": "",
              "type": "bool"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "bytes",
              "name": "_metadata",
              "type": "bytes"
            },
            {
              "components": [
                {
                  "internalType": "address",
                  "name": "to",
                  "type": "address"
                },
                {
                  "internalType": "uint256",
                  "name": "value",
                  "type": "uint256"
                },
                {
                  "internalType": "bytes",
                  "name": "data",
                  "type": "bytes"
                }
              ],
              "internalType": "struct IDAO.Action[]",
              "name": "_actions",
              "type": "tuple[]"
            },
            {
              "internalType": "uint256",
              "name": "_allowFailureMap",
              "type": "uint256"
            },
            {
              "internalType": "uint64",
              "name": "_startDate",
              "type": "uint64"
            },
            {
              "internalType": "uint64",
              "name": "_endDate",
              "type": "uint64"
            }
          ],
          "name": "createPluginProposal",
          "outputs": [
            {
              "internalType": "uint256",
              "name": "proposalId",
              "type": "uint256"
            }
          ],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "bytes",
              "name": "_metadata",
              "type": "bytes"
            },
            {
              "components": [
                {
                  "internalType": "address",
                  "name": "to",
                  "type": "address"
                },
                {
                  "internalType": "uint256",
                  "name": "value",
                  "type": "uint256"
                },
                {
                  "internalType": "bytes",
                  "name": "data",
                  "type": "bytes"
                }
              ],
              "internalType": "struct IDAO.Action[]",
              "name": "_actions",
              "type": "tuple[]"
            },
            {
              "internalType": "uint256",
              "name": "_allowFailureMap",
              "type": "uint256"
            },
            {
              "internalType": "uint64",
              "name": "_startDate",
              "type": "uint64"
            },
            {
              "internalType": "uint64",
              "name": "_endDate",
              "type": "uint64"
            },
            {
              "internalType": "enum ITokenMajorityVoting.VoteOption",
              "name": "_voteOption",
              "type": "uint8"
            },
            {
              "internalType": "bool",
              "name": "_tryEarlyExecution",
              "type": "bool"
            },
            {
              "internalType": "uint256",
              "name": "_tokenId",
              "type": "uint256"
            }
          ],
          "name": "createProposal",
          "outputs": [
            {
              "internalType": "uint256",
              "name": "proposalId",
              "type": "uint256"
            }
          ],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "dao",
          "outputs": [
            {
              "internalType": "contract IDAO",
              "name": "",
              "type": "address"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "uint256",
              "name": "_proposalId",
              "type": "uint256"
            }
          ],
          "name": "execute",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "uint256",
              "name": "_proposalId",
              "type": "uint256"
            }
          ],
          "name": "getProposal",
          "outputs": [
            {
              "internalType": "bool",
              "name": "open",
              "type": "bool"
            },
            {
              "internalType": "bool",
              "name": "executed",
              "type": "bool"
            },
            {
              "components": [
                {
                  "internalType": "enum TokenMajorityVotingBase.VotingMode",
                  "name": "votingMode",
                  "type": "uint8"
                },
                {
                  "internalType": "uint32",
                  "name": "supportThreshold",
                  "type": "uint32"
                },
                {
                  "internalType": "uint64",
                  "name": "startDate",
                  "type": "uint64"
                },
                {
                  "internalType": "uint64",
                  "name": "endDate",
                  "type": "uint64"
                },
                {
                  "internalType": "uint64",
                  "name": "snapshotBlock",
                  "type": "uint64"
                },
                {
                  "internalType": "uint256",
                  "name": "minVotingPower",
                  "type": "uint256"
                }
              ],
              "internalType": "struct TokenMajorityVotingBase.ProposalParameters",
              "name": "parameters",
              "type": "tuple"
            },
            {
              "components": [
                {
                  "internalType": "uint256",
                  "name": "abstain",
                  "type": "uint256"
                },
                {
                  "internalType": "uint256",
                  "name": "yes",
                  "type": "uint256"
                },
                {
                  "internalType": "uint256",
                  "name": "no",
                  "type": "uint256"
                }
              ],
              "internalType": "struct TokenMajorityVotingBase.Tally",
              "name": "tally",
              "type": "tuple"
            },
            {
              "components": [
                {
                  "internalType": "address",
                  "name": "to",
                  "type": "address"
                },
                {
                  "internalType": "uint256",
                  "name": "value",
                  "type": "uint256"
                },
                {
                  "internalType": "bytes",
                  "name": "data",
                  "type": "bytes"
                }
              ],
              "internalType": "struct IDAO.Action[]",
              "name": "actions",
              "type": "tuple[]"
            },
            {
              "internalType": "uint256",
              "name": "allowFailureMap",
              "type": "uint256"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "uint256",
              "name": "_proposalId",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "_account",
              "type": "uint256"
            }
          ],
          "name": "getVoteOption",
          "outputs": [
            {
              "internalType": "enum ITokenMajorityVoting.VoteOption",
              "name": "",
              "type": "uint8"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "implementation",
          "outputs": [
            {
              "internalType": "address",
              "name": "",
              "type": "address"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "contract IDAO",
              "name": "_dao",
              "type": "address"
            },
            {
              "components": [
                {
                  "internalType": "enum TokenMajorityVotingBase.VotingMode",
                  "name": "votingMode",
                  "type": "uint8"
                },
                {
                  "internalType": "uint32",
                  "name": "supportThreshold",
                  "type": "uint32"
                },
                {
                  "internalType": "uint32",
                  "name": "minParticipation",
                  "type": "uint32"
                },
                {
                  "internalType": "uint64",
                  "name": "minDuration",
                  "type": "uint64"
                },
                {
                  "internalType": "uint256",
                  "name": "minProposerVotingPower",
                  "type": "uint256"
                }
              ],
              "internalType": "struct TokenMajorityVotingBase.VotingSettings",
              "name": "_votingSettings",
              "type": "tuple"
            },
            {
              "internalType": "contract IERC721",
              "name": "_tokenCollection",
              "type": "address"
            },
            {
              "internalType": "uint256[]",
              "name": "_members",
              "type": "uint256[]"
            }
          ],
          "name": "initialize",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "uint256",
              "name": "_tokenId",
              "type": "uint256"
            }
          ],
          "name": "isListed",
          "outputs": [
            {
              "internalType": "bool",
              "name": "",
              "type": "bool"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "uint256",
              "name": "_tokenId",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "_blockNumber",
              "type": "uint256"
            }
          ],
          "name": "isListedAtBlock",
          "outputs": [
            {
              "internalType": "bool",
              "name": "",
              "type": "bool"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "uint256",
              "name": "_account",
              "type": "uint256"
            }
          ],
          "name": "isMember",
          "outputs": [
            {
              "internalType": "bool",
              "name": "",
              "type": "bool"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "uint256",
              "name": "_proposalId",
              "type": "uint256"
            }
          ],
          "name": "isMinParticipationReached",
          "outputs": [
            {
              "internalType": "bool",
              "name": "",
              "type": "bool"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "uint256",
              "name": "_proposalId",
              "type": "uint256"
            }
          ],
          "name": "isSupportThresholdReached",
          "outputs": [
            {
              "internalType": "bool",
              "name": "",
              "type": "bool"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "uint256",
              "name": "_proposalId",
              "type": "uint256"
            }
          ],
          "name": "isSupportThresholdReachedEarly",
          "outputs": [
            {
              "internalType": "bool",
              "name": "",
              "type": "bool"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "minDuration",
          "outputs": [
            {
              "internalType": "uint64",
              "name": "",
              "type": "uint64"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "minParticipation",
          "outputs": [
            {
              "internalType": "uint32",
              "name": "",
              "type": "uint32"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "minProposerVotingPower",
          "outputs": [
            {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "pluginType",
          "outputs": [
            {
              "internalType": "enum IPlugin.PluginType",
              "name": "",
              "type": "uint8"
            }
          ],
          "stateMutability": "pure",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "proposalCount",
          "outputs": [
            {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "proxiableUUID",
          "outputs": [
            {
              "internalType": "bytes32",
              "name": "",
              "type": "bytes32"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "uint256[]",
              "name": "_members",
              "type": "uint256[]"
            }
          ],
          "name": "removeMembers",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "supportThreshold",
          "outputs": [
            {
              "internalType": "uint32",
              "name": "",
              "type": "uint32"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "bytes4",
              "name": "_interfaceId",
              "type": "bytes4"
            }
          ],
          "name": "supportsInterface",
          "outputs": [
            {
              "internalType": "bool",
              "name": "",
              "type": "bool"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "tokenlistLength",
          "outputs": [
            {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "uint256",
              "name": "_blockNumber",
              "type": "uint256"
            }
          ],
          "name": "tokenlistLengthAtBlock",
          "outputs": [
            {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "uint256",
              "name": "_blockNumber",
              "type": "uint256"
            }
          ],
          "name": "totalVotingPower",
          "outputs": [
            {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "components": [
                {
                  "internalType": "enum TokenMajorityVotingBase.VotingMode",
                  "name": "votingMode",
                  "type": "uint8"
                },
                {
                  "internalType": "uint32",
                  "name": "supportThreshold",
                  "type": "uint32"
                },
                {
                  "internalType": "uint32",
                  "name": "minParticipation",
                  "type": "uint32"
                },
                {
                  "internalType": "uint64",
                  "name": "minDuration",
                  "type": "uint64"
                },
                {
                  "internalType": "uint256",
                  "name": "minProposerVotingPower",
                  "type": "uint256"
                }
              ],
              "internalType": "struct TokenMajorityVotingBase.VotingSettings",
              "name": "_votingSettings",
              "type": "tuple"
            }
          ],
          "name": "updateVotingSettings",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "newImplementation",
              "type": "address"
            }
          ],
          "name": "upgradeTo",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "newImplementation",
              "type": "address"
            },
            {
              "internalType": "bytes",
              "name": "data",
              "type": "bytes"
            }
          ],
          "name": "upgradeToAndCall",
          "outputs": [],
          "stateMutability": "payable",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "uint256",
              "name": "_proposalId",
              "type": "uint256"
            },
            {
              "internalType": "enum ITokenMajorityVoting.VoteOption",
              "name": "_voteOption",
              "type": "uint8"
            },
            {
              "internalType": "bool",
              "name": "_tryEarlyExecution",
              "type": "bool"
            },
            {
              "internalType": "uint256",
              "name": "_tokenId",
              "type": "uint256"
            }
          ],
          "name": "vote",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "votingMode",
          "outputs": [
            {
              "internalType": "enum TokenMajorityVotingBase.VotingMode",
              "name": "",
              "type": "uint8"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        }
      ]
    }
  }
} as const;