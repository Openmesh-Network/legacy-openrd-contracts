import { ethers } from "hardhat";
import { DAOFactory } from "../../../typechain-types";
import { getEventsFromLogs } from "../../../utils/utils";
import { DeploymentsExtension } from "hardhat-deploy/types";

export async function createDAO(deployer : string, subdomain : string, pluginSettings : any[], deployments : DeploymentsExtension) {
    const daoSettings : DAOFactory.DAOSettingsStruct = {
        trustedForwarder: ethers.ZeroAddress,
        daoURI: "https://plopmenz.com",
        subdomain: subdomain,
        metadata: "0x",
    }
    const receipt = await deployments.execute("DAOFactory",
        {
            from: deployer,
        },
        "createDao",
        daoSettings,
        pluginSettings,
    );

    const daoRegistry = await ethers.getContract("DAORegistry");
    const pluginSetupProcessor = await ethers.getContract("PluginSetupProcessor");
    const daoAddress = getEventsFromLogs(receipt.logs, daoRegistry.interface, "DAORegistered")[0].args.dao;
    const pluginAddresses = getEventsFromLogs(receipt.logs, pluginSetupProcessor.interface, "InstallationApplied").map(log => log.args.plugin);

    return { daoAddress, pluginAddresses };
}