import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
import { setBool } from "../../utils/globalVars";
import { ethers } from "hardhat";
import { Tasks } from "../../typechain-types";

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployments, getNamedAccounts } = hre;
  const { deployer } = await getNamedAccounts();

  const deployResult = await deployments.deploy("Tasks", {
    from: deployer,
    args: [deployer, deployer],
  });

  const Tasks = (await ethers.getContractAt("Tasks", deployResult.address)) as any as Tasks;
  await deployments.save("EscrowImplementation", {
    address: await Tasks.escrowImplementation(),
    ...(await deployments.getExtendedArtifact("Escrow")),
    args: [],
  });

  await setBool("NewTasks", deployResult.newlyDeployed);
};
export default func;
func.tags = ["Tasks"];
