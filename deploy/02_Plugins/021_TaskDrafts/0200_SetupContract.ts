import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
import { setBool } from "../../../utils/globalVars";
import { ethers } from "hardhat";
import { TaskDraftsSetup } from "../../../typechain-types";

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployments, getNamedAccounts } = hre;
  const { deployer } = await getNamedAccounts();

  const deployResult = await deployments.deploy("TaskDraftsSetup", {
    from: deployer,
  });

  const TaskDraftsSetup = (await ethers.getContractAt("TaskDraftsSetup", deployResult.address)) as any as TaskDraftsSetup;
  await deployments.save("TaskDraftsImplementation", {
    address: await TaskDraftsSetup.implementation(),
    ...(await deployments.getExtendedArtifact("TaskDrafts")),
    args: [],
  });

  await setBool("NewDraftsSetup", deployResult.newlyDeployed);
};
export default func;
func.tags = ["TaskDraftsSetup"];
func.dependencies = ["AragonOSx"];
