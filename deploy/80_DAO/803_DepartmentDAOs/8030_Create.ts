import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction, DeploymentsExtension } from "hardhat-deploy/types";
import { ethers } from "hardhat";
import { getVar, setBool } from "../../../utils/globalVars";
import { createDAO } from "../utils/DAODeployer";
import { getTaskDraftsSettings, getTokenListGovernanceSettings } from "../utils/PluginSettings";
import { redeployedDependencies } from "../../utils";

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const run = await redeployedDependencies(func.dependencies);
  if (!run) {
    return;
  }

  const { deployments, getNamedAccounts } = hre;
  const { deployer } = await getNamedAccounts();

  await createDepartment(deployer, "data", [], deployments);
  await createDepartment(deployer, "frontend", [], deployments);
  await createDepartment(deployer, "blockchain", [], deployments);
  await createDepartment(deployer, "cloud", [], deployments);

  await setBool("NewDepartments", true);
};
export default func;
func.tags = ["DepartmentDAO"];
func.dependencies = ["TokenListGovernance", "TaskDrafts", "NFT", "Tasks", "ManagementDAO"];

async function createDepartment(deployer: string, departmentName: string, members: number[], deployments: DeploymentsExtension) {
  const subdomain = "department-test-" + (await getVar("ENSCounter")) + "-" + departmentName;

  const tasks = await deployments.get("Tasks");
  const nftCollection = await deployments.get("NFT");
  const tokenListGovernanceSetup = await deployments.get("TokenListGovernanceSetup");
  const managementDao = await deployments.get("management_dao");
  const tokenListGovernanceSettings = await getTokenListGovernanceSettings(nftCollection.address, members, managementDao.address);
  // In case there is a transaction in progress, either this one or that will get the wrong address, based on which one gets confirmed earlier
  // This is because the nonce has then increased by 1, however there is currently no other way to get the address as far as I know
  const expectedGovernanceAddress = await ethers.getCreateAddress({
    from: tokenListGovernanceSetup.address,
    nonce: await ethers.provider.getTransactionCount(tokenListGovernanceSetup.address),
  });
  const taskDraftsSettings = await getTaskDraftsSettings(tasks.address, expectedGovernanceAddress);
  // If wanted could add the SharedAddress plugin and remove the execute permission from TokenListGovernance
  // Grant TokenListGoverance a hat to only be able to interact with OpenR&D (and management DAO to interact with SharedAddress)

  const dao = await createDAO(deployer, subdomain, [tokenListGovernanceSettings, taskDraftsSettings], deployments);

  await deployments.save(departmentName + "_dao", { address: dao.daoAddress, ...(await deployments.getArtifact("DAO")) });
  await deployments.save(departmentName + "_tokenListGovernance", {
    address: dao.pluginAddresses[0],
    ...(await deployments.getArtifact("TokenListGovernance")),
  });
  await deployments.save(departmentName + "_taskDrafts", { address: dao.pluginAddresses[1], ...(await deployments.getArtifact("TaskDrafts")) });
}
