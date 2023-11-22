import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
import { getBool } from "../../../utils/globalVars";
import { ethers } from "hardhat";

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  if (!(await getBool("NewCommunityDAO"))) {
    return;
  }

  const { deployments, getNamedAccounts } = hre;
  const { deployer } = await getNamedAccounts();

  const communityDAO = await deployments.get("community_dao");

  await deployments.execute(
    "ERC20",
    {
      from: deployer,
    },
    "grantRole",
    ethers.ZeroHash, //Admin Role
    communityDAO.address
  );

  await deployments.execute(
    "ERC20",
    {
      from: deployer,
    },
    "revokeRole",
    ethers.ZeroHash, //Admin Role
    deployer
  );
};
export default func;
func.tags = ["CommunityDAO"];
func.dependencies = ["CommunityDAOCreation", "ERC20"];
