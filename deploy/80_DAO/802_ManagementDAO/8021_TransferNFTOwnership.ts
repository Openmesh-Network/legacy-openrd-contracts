import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
import { getBool } from "../../../utils/globalVars";
import { ethers } from "hardhat";

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  if (!(await getBool("NewManagementDAO"))) {
    return;
  }

  const { deployments, getNamedAccounts } = hre;
  const { deployer } = await getNamedAccounts();

  const communityDAO = await deployments.get("community_dao");
  const managementDAO = await deployments.get("management_dao");

  await deployments.execute(
    "NFT",
    {
      from: deployer,
    },
    "grantRole",
    ethers.ZeroHash, //Admin Role
    communityDAO.address
  );

  await deployments.execute(
    "NFT",
    {
      from: deployer,
    },
    "grantRole",
    ethers.keccak256(ethers.toUtf8Bytes("MINT")),
    managementDAO.address
  );

  await deployments.execute(
    "NFT",
    {
      from: deployer,
    },
    "grantRole",
    ethers.keccak256(ethers.toUtf8Bytes("BURN")),
    managementDAO.address
  );

  await deployments.execute(
    "NFT",
    {
      from: deployer,
    },
    "revokeRole",
    ethers.ZeroHash, //Admin Role
    deployer
  );
};
export default func;
func.tags = ["ManagementDAO"];
func.dependencies = ["ManagementDAOCreation", "NFT", "CommunityDAO"];
