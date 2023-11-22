import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
import { redeployedDependencies } from "../utils";
import { ethers, network } from "hardhat";

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const run = await redeployedDependencies(func.dependencies);
  // In a live network, the deployer should not be the admin of the OPEN token
  if (!run || network.live) {
    return;
  }

  const { deployments, getNamedAccounts } = hre;
  const { deployer } = await getNamedAccounts();

  const staking = await deployments.get("Staking");

  await deployments.execute(
    "ERC20",
    {
      from: deployer,
    },
    "grantRole",
    ethers.keccak256(ethers.toUtf8Bytes("MINT")),
    staking.address
  );
};
export default func;
func.tags = ["Staking"];
func.dependencies = ["StakingDeploy", "ERC20"];
