import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployments, getNamedAccounts } = hre;
  const { deployer } = await getNamedAccounts();

  const managementDao = await deployments.get("management_dao");

  await deployments.execute("NFT", { from: deployer }, "mint", deployer, 0);
  await deployments.execute("NFT", { from: deployer }, "transferOwnership", managementDao.address);
};
export default func;
func.tags = ["Final"];
func.dependencies = ["NFT", "ManagementDAO"];
