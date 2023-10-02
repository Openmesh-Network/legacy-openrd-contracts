import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
import { getBool } from "../../../utils/globalVars";

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  if (!(await getBool("NewCommunityDAO"))) {
    return;
  }

  const { deployments, getNamedAccounts } = hre;
  const { deployer } = await getNamedAccounts();

  const disputeDAO = await deployments.get("community_dao");

  await deployments.execute(
    "ERC20",
    {
      from: deployer,
    },
    "transferOwnership",
    disputeDAO.address
  );
};
export default func;
func.tags = ["CommunityDAO"];
func.dependencies = ["CommunityDAOCreation"];
