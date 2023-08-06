import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
import { getTokenListGovernanceSettings } from "../utils/PluginSettings";
import { ethers } from "hardhat";
import { createDAO } from "../utils/DAODeployer";
import { getBool, getVar } from "../../../utils/globalVars";

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  if (!(await getBool("NewTokenListGovernance")) && !(await getBool("NewDraftsSetup")) && !(await getBool("NewNFT"))) {
    return;
  }

  const { deployments, getNamedAccounts } = hre;
  const { deployer } = await getNamedAccounts();
  const subdomain = "community-test-" + (await getVar("ENSCounter"));

  const nftCollection = await deployments.get("NFT");
  const maxSupply = 50;
  // This is not the final governance model of the community DAO, so for now the TokenListGovernance is used
  // This will have it's own plugin in the future
  const tokenListGovernanceSettings = await getTokenListGovernanceSettings(nftCollection.address, [...Array(maxSupply).keys()], ethers.ZeroAddress);

  const dao = await createDAO(deployer, subdomain, [tokenListGovernanceSettings], deployments);

  await deployments.save("community_dao", { address: dao.daoAddress, ...(await deployments.getArtifact("DAO")) });
  await deployments.save("community_tokenListGovernance", { address: dao.pluginAddresses[0], ...(await deployments.getArtifact("TokenListGovernance")) });
};
export default func;
func.tags = ["CommunityDAO"];
func.dependencies = ["TokenListGovernance", "NFT"];
