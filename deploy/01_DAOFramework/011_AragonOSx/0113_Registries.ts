import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction, DeploymentsExtension } from "hardhat-deploy/types";

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployments, getNamedAccounts } = hre;
  const { deployer } = await getNamedAccounts();

  const managementDAO = await deployments.get("managementDAO");
  const daoRegistrar = await deployments.get("daoSubdomainRegistrar");
  const pluginRegistrar = await deployments.get("pluginSubdomainRegistrar");

  await deployments.deploy("DAORegistry", {
    from: deployer,
    proxy: {
      owner: deployer,
      proxyContract: "PreferredProxy",
      proxyArgs: ["{implementation}", "{data}"],
      execute: {
        init: {
          methodName: "initialize",
          args: [managementDAO.address, daoRegistrar.address],
        },
      },
    },
  });

  await deployments.deploy("PluginRepoRegistry", {
    from: deployer,
    proxy: {
      owner: deployer,
      proxyContract: "PreferredProxy",
      proxyArgs: ["{implementation}", "{data}"],
      execute: {
        init: {
          methodName: "initialize",
          args: [managementDAO.address, pluginRegistrar.address],
        },
      },
    },
  });
};
export default func;
func.tags = ["AragonRegistry"];
func.dependencies = ["AragonSubdomainRegistrar"];
