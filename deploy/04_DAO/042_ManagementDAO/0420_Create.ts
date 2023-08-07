import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
import { getTokenListGovernanceSettings } from "../utils/PluginSettings";
import { createDAO } from "../utils/DAODeployer";
import { getBool, getVar } from "../../../utils/globalVars";

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  if (!(await getBool("NewTokenListGovernance")) && !(await getBool("NewNFT"))) {
    return;
  }

  const { deployments, getNamedAccounts } = hre;
  const { deployer } = await getNamedAccounts();
  const subdomain = "management-test-" + (await getVar("ENSCounter"));

  const nftCollection = await deployments.get("NFT");
  const communityDao = await deployments.get("community_dao");
  const tokenListGovernanceSettings = await getTokenListGovernanceSettings(nftCollection.address, [0], communityDao.address);

  const dao = await createDAO(deployer, subdomain, [tokenListGovernanceSettings], deployments);

  await deployments.save("management_dao", { address: dao.daoAddress, ...(await deployments.getArtifact("DAO")) });
  await deployments.save("management_tokenListGovernance", { address: dao.pluginAddresses[0], ...(await deployments.getArtifact("TokenListGovernance")) });
};
export default func;
func.tags = ["ManagementDAO"];
func.dependencies = ["TokenListGovernance", "NFT", "CommunityDAO"];
