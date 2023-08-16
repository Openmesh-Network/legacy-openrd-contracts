import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
import { setBool } from "../../../utils/globalVars";
import { ethers } from "hardhat";
import { TaskDisputesSetup } from "../../../typechain-types";

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployments, getNamedAccounts } = hre;
  const { deployer } = await getNamedAccounts();

  const deployResult = await deployments.deploy("TaskDisputesSetup", {
    from: deployer,
  });

  const TaskDisputesSetup = (await ethers.getContractAt("TaskDisputesSetup", deployResult.address)) as any as TaskDisputesSetup;
  await deployments.save("TaskDisputesImplementation", {
    address: await TaskDisputesSetup.implementation(),
    ...(await deployments.getExtendedArtifact("TaskDisputes")),
    args: [],
  });

  await setBool("NewTaskDisputesSetup", deployResult.newlyDeployed);
};
export default func;
func.tags = ["TaskDisputesSetup"];
func.dependencies = ["AragonOSx"];
