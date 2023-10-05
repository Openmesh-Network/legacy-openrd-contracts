import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
import { setBool } from "../../utils/globalVars";
import { ethers } from "hardhat";
import { RFPs } from "../../typechain-types";

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployments, getNamedAccounts } = hre;
  const { deployer } = await getNamedAccounts();

  const tasks = await deployments.get("Tasks");

  const deployResult = await deployments.deploy("RFPs", {
    from: deployer,
    args: [tasks.address],
  });

  const RFPs = (await ethers.getContractAt("RFPs", deployResult.address)) as any as RFPs;
  await deployments.save("EscrowImplementation", {
    address: await RFPs.escrowImplementation(),
    ...(await deployments.getExtendedArtifact("Escrow")),
    args: [],
  });

  await setBool("NewRFPs", deployResult.newlyDeployed);
};
export default func;
func.tags = ["RFPs"];
