import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
import { setBool } from "../../utils/globalVars";

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployments, getNamedAccounts } = hre;
  const { deployer } = await getNamedAccounts();

  const deployResult = await deployments.deploy("ERC20", {
    from: deployer,
    contract: "OwnableERC20Votes",
    args: ["Open Governance", "gOPEN"],
  });

  await setBool("NewERC20", deployResult.newlyDeployed);
};
export default func;
func.tags = ["ERC20"];
