import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
import { createDAO } from "../utils/DAODeployer";
import { getTokenListGovernanceSettings } from "../utils/PluginSettings";
import { ethers } from "hardhat";
import { getBool, getVar } from "../../../utils/globalVars";

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
    if (!await getBool("NewTokenListGovernance") && !await getBool("NewDraftsSetup") && !await getBool("NewNFT")) {
        return;
    }

	const { deployments, getNamedAccounts } = hre;
    const { deployer } = await getNamedAccounts();
    const subdomain = "parent-test-" + await getVar("ENSCounter");

    const nftCollection = await deployments.get("NFT");
    const tokenListGovernanceSettings = await getTokenListGovernanceSettings(nftCollection.address, [0], ethers.ZeroAddress); // Change to normal address list voting?

    const dao = await createDAO(deployer, subdomain, [tokenListGovernanceSettings], deployments);

    await deployments.save("parent_dao", { address : dao.daoAddress, abi: (await deployments.getArtifact("DAO")).abi });
    await deployments.save("parent_tokenListGovernance", { address : dao.pluginAddresses[0], abi: (await deployments.getArtifact("TokenListGovernance")).abi });
};
export default func;
func.tags = ["ParentDAO"];