import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction, DeploymentsExtension } from "hardhat-deploy/types";
import { ethers } from "hardhat";
import { toEnsLabel } from "../../../utils/ensHelper";

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployments, getNamedAccounts } = hre;

  const { deployer } = await getNamedAccounts();

  await deployResolver(deployer, "dao", deployments);
  await deployResolver(deployer, "plugin", deployments);
};
export default func;
func.tags = ["AragonENS"];
func.dependencies = ["ENS"];

/**
 * Deployes a PublicResolver for the given subdomain
 * @param ens The ENSRegistry to register the subdomain with
 * @param owner The address of the owner of the subdomain
 * @param subdomain The subdomain in string form
 * @returns The newly deployed PublicResolver contract
 */
async function deployResolver(deployer: string, subdomain: string, deployments: DeploymentsExtension) {
  const resolverNode = ethers.ZeroHash;
  const resolverLabel = toEnsLabel(subdomain);
  const ens = await deployments.get("ENSRegistry");
  const publicResolver = await deployments.deploy(subdomain + "Resolver", {
    from: deployer,
    contract: "PublicResolver",
    args: [ens.address, ethers.ZeroAddress, deployer, deployer],
  });

  await deployments.execute("ENSRegistry", { from: deployer }, "setSubnodeRecord", resolverNode, resolverLabel, deployer, publicResolver.address, 0);
}
