import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
import { getBool } from "../../../utils/globalVars";

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  if (!(await getBool("NewDisputeDAO"))) {
    return;
  }

  const { deployments, getNamedAccounts } = hre;
  const { deployer } = await getNamedAccounts();

  const disputeDAO = await deployments.get("dispute_dao");

  await deployments.execute(
    "Tasks",
    {
      from: deployer,
    },
    "transferDisputeManagement",
    disputeDAO.address
  );
};
export default func;
func.tags = ["DisputeDAO"];
func.dependencies = ["DisputeDAOCreation"];
