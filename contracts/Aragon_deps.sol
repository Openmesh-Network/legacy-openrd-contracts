// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

// Include Aragon contract here that you want to be compiled by hardhat (so you can use hardhat helper functions to retrieve them with types)
import { DAOFactory } from "@aragon/osx/framework/dao/DAOFactory.sol";
import { DAORegistry } from "@aragon/osx/framework/dao/DAORegistry.sol";

import { PluginRepoFactory } from "@aragon/osx/framework/plugin/repo/PluginRepoFactory.sol";
import { PluginRepoRegistry } from "@aragon/osx/framework/plugin/repo/PluginRepoRegistry.sol";

import { PluginSetupProcessor } from "@aragon/osx/framework/plugin/setup/PluginSetupProcessor.sol";