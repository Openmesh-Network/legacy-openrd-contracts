import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
import { getEventsFromLogs } from "../../../utils/utils";
import { ethers } from "hardhat";
import { getBool, setVar } from "../../../utils/globalVars";

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
    if (!await getBool("NewDraftsSetup")) {
        return;
    }

	const { deployments, getNamedAccounts } = hre;
    const { deployer } = await getNamedAccounts();

    const taskDrafts = await deployments.get("TaskDraftsSetup");
    const subdomain = "taskdraft-test-3";
    
    const receipt = await deployments.execute("PluginRepoFactory",
        {
            from: deployer,
        },
        "createPluginRepoWithFirstVersion",
        subdomain,
        taskDrafts.address,
        deployer,
        "0x01", //build metadata
        "0x01", //release metadata
    );

    const pluginRepoRegistry = await ethers.getContract("PluginRepoRegistry");
    const repo = getEventsFromLogs(receipt.logs, pluginRepoRegistry.interface, "PluginRepoRegistered")[0].args.pluginRepo;
    await setVar("TaskDraftsRepo", repo, true);
};
export default func;
func.tags = ["TaskDrafts"]
func.dependencies = ["TaskDraftsSetup"];