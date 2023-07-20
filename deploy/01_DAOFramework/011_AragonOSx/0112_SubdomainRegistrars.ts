import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction, DeploymentsExtension } from "hardhat-deploy/types";
import { toEnsNode } from "../../../utils/ensHelper";

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
	const { deployments, getNamedAccounts } = hre;
    const { deployer } = await getNamedAccounts();

    await deploySubdomainRegistrar(deployer, "dao", deployments);
    await deploySubdomainRegistrar(deployer, "plugin", deployments);
};
export default func;
func.tags = ["AragonSubdomainRegistrar"];
func.dependencies = ["AragonManagementDAO"];

/**
 * Deployes a PublicResolver for the given subdomain
 * @param ens The ENSRegistry to register the subdomain with
 * @param owner The address of the owner of the subdomain
 * @param subdomain The subdomain in string form
 * @returns The newly deployed PublicResolver contract
 */
async function deploySubdomainRegistrar(deployer : string, node : string, deployments : DeploymentsExtension) {
    const resolverNode = toEnsNode(node);
    const ens = await deployments.get("ENSRegistry");
    const managementDAO = await deployments.get("managementDAO");
    const subdomainRegistrar = await deployments.deploy(node + "SubdomainRegistrar", {
        from: deployer,
        contract: "ENSSubdomainRegistrar",
        proxy: {
            owner: deployer,
            proxyContract: "ERC1967Proxy",
            proxyArgs: ['{implementation}', '{data}'],
            execute: {
                init: {
                    methodName: "initialize",
                    args: [managementDAO.address, ens.address, resolverNode],
                },
            },
        },
    });

    await deployments.execute(
        "ENSRegistry",
        { from: deployer },
        "setApprovalForAll",
        subdomainRegistrar.address,
        true,
    );
}