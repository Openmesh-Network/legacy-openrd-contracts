import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
import { setBool } from "../../../utils/globalVars";
import { ethers } from "hardhat";
import { SubDAOSetup } from "../../../typechain-types";

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployments, getNamedAccounts } = hre;
  const { deployer } = await getNamedAccounts();

  const deployResult = await deployments.deploy("SubDAOSetup", {
    from: deployer,
  });

  const SubDAOSetup = (await ethers.getContractAt("SubDAOSetup", deployResult.address)) as any as SubDAOSetup;
  await deployments.save("SubDAOImplementation", {
    address: await SubDAOSetup.implementation(),
    ...(await deployments.getExtendedArtifact("SubDAO")),
    args: [],
  });

  await setBool("NewSubDAOSetup", deployResult.newlyDeployed);
};
export default func;
func.tags = ["SubDAOSetup"];
func.dependencies = ["AragonOSx"];
