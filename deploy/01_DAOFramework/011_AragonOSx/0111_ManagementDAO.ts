import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
import { ethers } from "hardhat";

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployments, getNamedAccounts } = hre;
  const { deployer } = await getNamedAccounts();

  await deployments.deploy("managementDAO", {
    from: deployer,
    contract: "DAO",
    proxy: {
      owner: deployer,
      proxyContract: "PreferredProxy",
      proxyArgs: ["{implementation}", "{data}"],
      execute: {
        init: {
          methodName: "initialize",
          args: ["0x", deployer, ethers.ZeroAddress, "0x"],
        },
      },
    },
  });
};
export default func;
func.tags = ["AragonManagementDAO"];
func.dependencies = ["AragonENS"];
