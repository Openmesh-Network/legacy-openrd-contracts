import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
import { getEventsFromLogs } from "../../../utils/utils";
import { ethers } from "hardhat";
import { getBool, getVar, setBool } from "../../../utils/globalVars";

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  if (!(await getBool("NewSharedAddressSetup"))) {
    return;
  }

  const { deployments, getNamedAccounts } = hre;
  const { deployer } = await getNamedAccounts();

  const taskDrafts = await deployments.get("SharedAddressSetup");
  const subdomain = "sharedaddress-test-" + (await getVar("ENSCounter"));

  const receipt = await deployments.execute(
    "PluginRepoFactory",
    {
      from: deployer,
    },
    "createPluginRepoWithFirstVersion",
    subdomain,
    taskDrafts.address,
    deployer,
    "0x01", //build metadata
    "0x01" //release metadata
  );

  const pluginRepoRegistry = await ethers.getContract("PluginRepoRegistry");
  const repo = getEventsFromLogs(receipt.logs, pluginRepoRegistry.interface, "PluginRepoRegistered")[0].args.pluginRepo;
  await deployments.save("SharedAddressRepo", { address: repo, ...(await deployments.getArtifact("PluginRepo")) });

  await setBool("NewSharedAddress", true);
};
export default func;
func.tags = ["SharedAddress"];
func.dependencies = ["SharedAddressSetup"];
