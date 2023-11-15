import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
import { setBool } from "../../utils/globalVars";
import { Ether } from "../../utils/ethersUnits";

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployments, getNamedAccounts } = hre;
  const { deployer } = await getNamedAccounts();

  // This contract is likely already deployed by a different repository, this is only for deployment on testnet
  const deployResult = await deployments.deploy("OPEN", {
    from: deployer,
    contract: "OPEN",
    args: ["OPEN", "OPEN", Ether(1_000_000_000), deployer],
  });

  await setBool("NewOPEN", deployResult.newlyDeployed);
};
export default func;
func.tags = ["OPEN"];
