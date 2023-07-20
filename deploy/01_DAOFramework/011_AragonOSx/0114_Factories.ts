import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction, DeploymentsExtension } from "hardhat-deploy/types";

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
	const { deployments, getNamedAccounts } = hre;
    const { deployer } = await getNamedAccounts();

    const pluginRegistry = await deployments.get("PluginRepoRegistry");
    const daoRegistry = await deployments.get("DAORegistry");

    await deployments.deploy("PluginRepoFactory", {
        from: deployer,
        args: [pluginRegistry.address],
    });
    
    const pluginSetupProcessor = await deployments.deploy("PluginSetupProcessor", {
        from: deployer,
        args: [pluginRegistry.address],
    });
    
    await deployments.deploy("DAOFactory", {
        from: deployer,
        args: [daoRegistry.address, pluginSetupProcessor.address],
    });
};
export default func;
func.tags = ["AragonFactory"];
func.dependencies = ["AragonRegistry"];