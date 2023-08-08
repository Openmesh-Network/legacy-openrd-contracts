import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployments, getNamedAccounts } = hre;
  const { deployer } = await getNamedAccounts();

  await deployments.deploy("Tasks", {
    from: deployer,
    args: [(await deployments.get("dispute_dao")).address],
  });
};
export default func;
func.tags = ["Tasks"];
func.dependencies = ["DisputeDAO"];
