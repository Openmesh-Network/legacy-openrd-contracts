import { ethers } from "hardhat";
import { DAOFactory, SubDAO } from "../../../typechain-types";
import { getEventsFromLogs } from "../../../utils/utils";
import { DeploymentsExtension } from "hardhat-deploy/types";

export async function createDAO(deployer: string, subdomain: string, pluginSettings: any[], deployments: DeploymentsExtension) {
  const daoSettings: DAOFactory.DAOSettingsStruct = {
    trustedForwarder: ethers.ZeroAddress,
    daoURI: "https://plopmenz.com",
    subdomain: subdomain,
    metadata: "0x",
  };
  const receipt = await deployments.execute(
    "DAOFactory",
    {
      from: deployer,
    },
    "createDao",
    daoSettings,
    pluginSettings
  );

  const daoRegistry = await ethers.getContract("DAORegistry");
  const pluginSetupProcessor = await ethers.getContract("PluginSetupProcessor");
  const daoAddress = getEventsFromLogs(receipt.logs, daoRegistry.interface, "DAORegistered")[0].args.dao;
  const pluginAddresses = getEventsFromLogs(receipt.logs, pluginSetupProcessor.interface, "InstallationApplied").map((log) => log.args.plugin);

  return { daoAddress, pluginAddresses };
}

export async function createSubDAO(parent: string, deployer: string, subdomain: string, pluginSettings: any[], deployments: DeploymentsExtension) {
  const daoSettings: DAOFactory.DAOSettingsStruct = {
    trustedForwarder: ethers.ZeroAddress,
    daoURI: "https://plopmenz.com",
    subdomain: subdomain,
    metadata: "0x",
  };
  const DAOFactory = await deployments.get("DAOFactory");
  const receipt = await deployments.execute(
    parent + "_subDAO",
    {
      from: deployer,
    },
    "createSubDAO",
    DAOFactory.address,
    daoSettings,
    pluginSettings
  );

  const daoRegistry = await ethers.getContract("DAORegistry");
  const pluginSetupProcessor = await ethers.getContract("PluginSetupProcessor");
  const daoAddress = getEventsFromLogs(receipt.logs, daoRegistry.interface, "DAORegistered")[0].args.dao;
  const pluginAddresses = getEventsFromLogs(receipt.logs, pluginSetupProcessor.interface, "InstallationApplied").map((log) => log.args.plugin);

  return { daoAddress, pluginAddresses };
}

// exports dummy function for hardhat-deploy. Otherwise we would have to move this file
export default function () {}
