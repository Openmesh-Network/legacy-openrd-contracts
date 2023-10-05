import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
import { getTaskDisputesSettings, getTokenListGovernanceSettings } from "../utils/PluginSettings";
import { createDAO } from "../utils/DAODeployer";
import { getVar, setBool } from "../../../utils/globalVars";
import { ethers } from "hardhat";
import { Ether } from "../../../utils/ethersUnits";
import { redeployedDependencies } from "../../utils";

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const run = await redeployedDependencies(func.dependencies);
  if (!run) {
    return;
  }

  const { deployments, getNamedAccounts } = hre;
  const { deployer } = await getNamedAccounts();
  const subdomain = "dispute-test-" + (await getVar("ENSCounter"));

  const tasks = await deployments.get("Tasks");
  const nftCollection = await deployments.get("NFT");
  const tokenListGovernanceSetup = await deployments.get("TokenListGovernanceSetup");
  const communityDao = await deployments.get("community_dao");
  const tokenListGovernanceSettings = await getTokenListGovernanceSettings(nftCollection.address, [], communityDao.address);
  // In case there is a transaction in progress, either this one or that will get the wrong address, based on which one gets confirmed earlier
  // This is because the nonce has then increased by 1, however there is currently no other way to get the address as far as I know
  const expectedGovernanceAddress = await ethers.getCreateAddress({
    from: tokenListGovernanceSetup.address,
    nonce: await ethers.provider.getTransactionCount(tokenListGovernanceSetup.address),
  });
  const taskDisputesSettings = await getTaskDisputesSettings(tasks.address, expectedGovernanceAddress, Ether(1));

  const dao = await createDAO(deployer, subdomain, [tokenListGovernanceSettings, taskDisputesSettings], deployments);

  await deployments.save("dispute_dao", { address: dao.daoAddress, ...(await deployments.getArtifact("DAO")) });
  await deployments.save("dispute_tokenListGovernance", { address: dao.pluginAddresses[0], ...(await deployments.getArtifact("TokenListGovernance")) });
  await deployments.save("dispute_taskDisputes", { address: dao.pluginAddresses[1], ...(await deployments.getArtifact("TaskDisputes")) });

  await setBool("NewDisputeDAO", true);
};
export default func;
func.tags = ["DisputeDAOCreation"];
func.dependencies = ["TokenListGovernance", "TaskDisputes", "NFT", "Tasks", "CommunityDAO"];
