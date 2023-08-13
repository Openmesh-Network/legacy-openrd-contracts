import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
import { ethers } from "hardhat";

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployments, getNamedAccounts } = hre;
  const { deployer } = await getNamedAccounts();

  const goveranceERC20 = await deployments.deploy("GovernanceERC20", {
    from: deployer,
    args: [
      ethers.ZeroAddress,
      "",
      "",
      {
        receivers: [],
        amounts: [],
      },
    ],
  });

  const goveranceWrappedERC20 = await deployments.deploy("GovernanceWrappedERC20", {
    from: deployer,
    args: [ethers.ZeroAddress, "", ""],
  });

  await deployments.deploy("TokenVotingSetup", {
    from: deployer,
    args: [goveranceERC20.address, goveranceWrappedERC20.address],
  });
};
export default func;
func.tags = ["TokenVotingSetup"];
func.dependencies = ["AragonOSx"];
