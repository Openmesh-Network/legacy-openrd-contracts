import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
import { getEventsFromLogs } from "../../../utils/utils";
import { ethers } from "hardhat";
import { getBool, getVar } from "../../../utils/globalVars";

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  if (!(await getBool("NewTokenListGovernance"))) {
    return;
  }

  const { deployments, getNamedAccounts } = hre;
  const { deployer } = await getNamedAccounts();

  const tokenListGovernance = await deployments.get("TokenListGovernanceSetup");
  const subdomain = "tokenlistgovernance-beta"; //"tokenlist-test-" + (await getVar("ENSCounter"));

  const receipt = await deployments.execute(
    "PluginRepoFactory",
    {
      from: deployer,
    },
    "createPluginRepoWithFirstVersion",
    subdomain,
    tokenListGovernance.address,
    deployer,
    "0x01", //build metadata
    "0x01" //release metadata
  );

  const pluginRepoRegistry = await ethers.getContract("PluginRepoRegistry");
  const repo = getEventsFromLogs(receipt.logs, pluginRepoRegistry.interface, "PluginRepoRegistered")[0].args.pluginRepo;
  await deployments.save("TokenListGovernanceRepo", { address: repo, ...(await deployments.getArtifact("PluginRepo")) });
};
export default func;
func.tags = ["TokenListGovernance"];
func.dependencies = ["TokenListGovernanceSetup"];
