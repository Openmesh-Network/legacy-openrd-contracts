import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
import { getTokenListGovernanceSettings } from "../utils/PluginSettings";
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
  const subdomain = "management-test-" + (await getVar("ENSCounter"));

  const nftCollection = await deployments.get("NFT");
  const communityDao = await deployments.get("community_dao");
  const tokenListGovernanceSettings = await getTokenListGovernanceSettings(nftCollection.address, [0], communityDao.address);

  const dao = await createDAO(deployer, subdomain, [tokenListGovernanceSettings], deployments);

  await deployments.save("management_dao", {
    address: dao.daoAddress,
    ...(await deployments.getArtifact("DAO")),
  });
  await deployments.save("management_tokenListGovernance", {
    address: dao.pluginAddresses[0],
    ...(await deployments.getArtifact("TokenListGovernance")),
  });

  await setBool("NewManagementDAO", true);
};
export default func;
func.tags = ["ManagementDAOCreation"];
func.dependencies = ["TokenListGovernance", "NFT", "CommunityDAO"];
