import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
import { setBool } from "../../utils/globalVars";
import { Ether } from "../../utils/ethersUnits";

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployments, getNamedAccounts } = hre;
  const { deployer } = await getNamedAccounts();

  const deployResult = await deployments.deploy("ERC20", {
    from: deployer,
    contract: "OPEN",
    args: ["Openmesh", "OPEN", Ether(1_000_000_000), deployer],
  });

  await setBool("NewERC20", deployResult.newlyDeployed);
};
export default func;
func.tags = ["ERC20"];
