import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
import { getBool } from "../../../utils/globalVars";
import { Wei } from "../../../utils/ethersUnits";

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  if (!(await getBool("NewCommunityDAO"))) {
    return;
  }

  const { deployments, getNamedAccounts } = hre;
  const { deployer } = await getNamedAccounts();

  const disputeDAO = await deployments.get("community_dao");

  // Mint 1 wei, otherwise the token has no holders and thus the DAO does not have any members to vote to mint tokens
  await deployments.execute(
    "ERC20",
    {
      from: deployer,
    },
    "mint",
    deployer,
    Wei(1)
  );

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
func.dependencies = ["CommunityDAOCreation", "ERC20"];
