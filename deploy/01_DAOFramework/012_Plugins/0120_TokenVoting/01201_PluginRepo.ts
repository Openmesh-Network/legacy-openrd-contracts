import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
import { getEventsFromLogs } from "../../../../utils/utils";
import { ethers } from "hardhat";

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployments, getNamedAccounts } = hre;
  const { deployer } = await getNamedAccounts();

  const tokenListGovernance = await deployments.get("TokenVotingSetup");
  const subdomain = "token-voting";

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
  await deployments.save("token-voting-repo", { address: repo, ...(await deployments.getArtifact("PluginRepo")) });
};
export default func;
func.tags = ["TokenVoting"];
func.dependencies = ["TokenVotingSetup"];
