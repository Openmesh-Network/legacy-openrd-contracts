import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
import { getSubDAOSettings, getTokenVotingSettings } from "../utils/PluginSettings";
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
  const subDAOSettings = await getSubDAOSettings();

  const dao = await createDAO(deployer, subdomain, [tokenVotingSettings, subDAOSettings], deployments);

  await deployments.save("community_dao", {
    address: dao.daoAddress,
    ...(await deployments.getArtifact("DAO")),
  });
  await deployments.save("community_tokenVoting", {
    address: dao.pluginAddresses[0],
    ...(await deployments.getArtifact("TokenVoting")),
  });
  await deployments.save("community_subDAO", {
    address: dao.pluginAddresses[1],
    ...(await deployments.getArtifact("SubDAO")),
  });

  await setBool("NewCommunityDAO", true);
};
export default func;
func.tags = ["CommunityDAOCreation"];
func.dependencies = ["TokenVoting", "ERC20", "SubDAO"];
