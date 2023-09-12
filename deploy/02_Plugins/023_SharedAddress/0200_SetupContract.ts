import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
import { setBool } from "../../../utils/globalVars";
import { ethers } from "hardhat";
import { SharedAddressSetup } from "../../../typechain-types";

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployments, getNamedAccounts } = hre;
  const { deployer } = await getNamedAccounts();

  const deployResult = await deployments.deploy("SharedAddressSetup", {
    from: deployer,
  });

  const SharedAddressSetup = (await ethers.getContractAt("SharedAddressSetup", deployResult.address)) as any as SharedAddressSetup;
  await deployments.save("SharedAddressImplementation", {
    address: await SharedAddressSetup.implementation(),
    ...(await deployments.getExtendedArtifact("SharedAddress")),
    args: [],
  });

  await setBool("NewSharedAddressSetup", deployResult.newlyDeployed);
};
export default func;
func.tags = ["SharedAddressSetup"];
func.dependencies = ["AragonOSx"];
