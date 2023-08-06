import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction, DeploymentsExtension } from "hardhat-deploy/types";
import { ethers } from "hardhat";

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployments, getNamedAccounts } = hre;
  const { deployer } = await getNamedAccounts();

  const managementDAO = (await deployments.get("managementDAO")).address;
  const daoRegistrar = (await deployments.get("daoSubdomainRegistrar")).address;
  const pluginRegistrar = (await deployments.get("pluginSubdomainRegistrar")).address;
  const pluginRegistry = (await deployments.get("PluginRepoRegistry")).address;
  const daoRegistry = (await deployments.get("DAORegistry")).address;
  const pluginFactory = (await deployments.get("PluginRepoFactory")).address;
  const daoFactory = (await deployments.get("DAOFactory")).address;

  await grant(deployer, managementDAO, managementDAO, "ROOT_PERMISSION", deployments);
  await grant(deployer, managementDAO, managementDAO, "UPGRADE_DAO_PERMISSION", deployments);
  await grant(deployer, managementDAO, managementDAO, "SET_SIGNATURE_VALIDATOR_PERMISSION", deployments);
  await grant(deployer, managementDAO, managementDAO, "SET_TRUSTED_FORWARDER_PERMISSION", deployments);
  await grant(deployer, managementDAO, managementDAO, "SET_METADATA_PERMISSION", deployments);
  await grant(deployer, managementDAO, managementDAO, "REGISTER_STANDARD_CALLBACK_PERMISSION", deployments);

  await grant(deployer, daoRegistrar, daoRegistry, "REGISTER_ENS_SUBDOMAIN_PERMISSION", deployments);
  await grant(deployer, pluginRegistrar, pluginRegistry, "REGISTER_ENS_SUBDOMAIN_PERMISSION", deployments);
  await grant(deployer, daoRegistrar, managementDAO, "UPGRADE_REGISTRAR_PERMISSION", deployments);
  await grant(deployer, pluginRegistrar, managementDAO, "UPGRADE_REGISTRAR_PERMISSION", deployments);

  await grant(deployer, daoRegistry, daoFactory, "REGISTER_DAO_PERMISSION", deployments);
  await grant(deployer, daoRegistry, managementDAO, "UPGRADE_REGISTRY_PERMISSION", deployments);

  await grant(deployer, pluginRegistry, pluginFactory, "REGISTER_PLUGIN_REPO_PERMISSION", deployments);
  await grant(deployer, pluginRegistry, managementDAO, "UPGRADE_REGISTRY_PERMISSION", deployments);
};
export default func;
func.tags = ["AragonOSx"];
func.dependencies = ["AragonFactory"];

async function grant(deployer: string, where: string, who: string, permission: string, deployments: DeploymentsExtension) {
  await deployments.execute(
    "managementDAO",
    {
      from: deployer,
    },
    "grant",
    where,
    who,
    ethers.keccak256(ethers.toUtf8Bytes(permission))
  );
}
