import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
import { getTokenVotingSettings } from "../utils/PluginSettings";
import { createDAO } from "../utils/DAODeployer";
import { getVar, setBool } from "../../../utils/globalVars";
import { redeployedDependencies } from "../../utils";

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const run = await redeployedDependencies(func.dependencies);
  if (!run) {
    return;
  }

  const { deployments, getNamedAccounts } = hre;
  const { deployer } = await getNamedAccounts();
  const subdomain = "community-test-" + (await getVar("ENSCounter"));

  const erc20Collection = await deployments.get("ERC20");
  const tokenVotingSettings = await getTokenVotingSettings(erc20Collection.address);

  const dao = await createDAO(deployer, subdomain, [tokenVotingSettings], deployments);

  await deployments.save("community_dao", {
    address: dao.daoAddress,
    ...(await deployments.getArtifact("DAO")),
  });
  await deployments.save("community_tokenVoting", {
    address: dao.pluginAddresses[0],
    ...(await deployments.getArtifact("TokenVoting")),
  });

  await setBool("NewCommunityDAO", true);
};
export default func;
func.tags = ["CommunityDAO"];
func.dependencies = ["TokenVoting", "ERC20"];
