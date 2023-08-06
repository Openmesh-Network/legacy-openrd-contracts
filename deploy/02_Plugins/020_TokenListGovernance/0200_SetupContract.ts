import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
import { setBool } from "../../../utils/globalVars";
import { ethers } from "hardhat";
import { TokenListGovernanceSetup } from "../../../typechain-types";

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployments, getNamedAccounts } = hre;
  const { deployer } = await getNamedAccounts();

  const deployResult = await deployments.deploy("TokenListGovernanceSetup", {
    from: deployer,
  });

  const TokenListGovernanceSetup = (await ethers.getContractAt("TokenListGovernanceSetup", deployResult.address)) as any as TokenListGovernanceSetup;
  await deployments.save("TokenListGovernanceImplementation", {
    address: await TokenListGovernanceSetup.implementation(),
    ...(await deployments.getExtendedArtifact("TokenListGovernance")),
    args: [],
  });

  await setBool("NewTokenListGovernance", deployResult.newlyDeployed);
};
export default func;
func.tags = ["TokenListGovernanceSetup"];
func.dependencies = ["AragonOSx"];
