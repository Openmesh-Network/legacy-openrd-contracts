import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
import { setBool } from "../../utils/globalVars";

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployments, getNamedAccounts } = hre;
  const { deployer } = await getNamedAccounts();

  const name = "Hats Protocol v1";
  const baseImageURI = "ipfs://bafkreiflezpk3kjz6zsv23pbvowtatnd5hmqfkdro33x5mh2azlhne3ah4";
  const deployResult = await deployments.deploy("Hats", {
    from: deployer,
    args: [name, baseImageURI],
  });

  await setBool("NewHats", deployResult.newlyDeployed);
};
export default func;
func.tags = ["Hats"];
