import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
import { getBool } from "../../../utils/globalVars";

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  if (!(await getBool("NewManagementDAO"))) {
    return;
  }

  const { deployments, getNamedAccounts } = hre;
  const { deployer } = await getNamedAccounts();

  const managementDAO = await deployments.get("management_dao");

  await deployments.execute(
    "NFT",
    {
      from: deployer,
    },
    "transferOwnership",
    managementDAO.address
  );
};
export default func;
func.tags = ["ManagementDAO"];
func.dependencies = ["ManagementDAOCreation", "NFT"];
