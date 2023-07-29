import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
import { getTokenListGovernanceSettings } from "../utils/PluginSettings";
import { ethers } from "hardhat";
import { createDAO } from "../utils/DAODeployer";
import { getBool, getVar } from "../../../utils/globalVars";

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
    if (!await getBool("NewTokenListGovernance") && !await getBool("NewDraftsSetup") && !await getBool("NewNFT")) {
        return;
    }

	const { deployments, getNamedAccounts } = hre;
    const { deployer } = await getNamedAccounts();
    const subdomain = "community-test-" + await getVar("ENSCounter");

    const nftCollection = await deployments.get("NFT");
    const maxSupply = 10; // Change to all token voting?
    const tokenListGovernanceSettings = await getTokenListGovernanceSettings(nftCollection.address, [...Array(maxSupply).keys()], ethers.ZeroAddress);

    const dao = await createDAO(deployer, subdomain, [tokenListGovernanceSettings], deployments);

    await deployments.save("community_dao", { address : dao.daoAddress, abi: (await deployments.getArtifact("DAO")).abi });
    await deployments.save("community_tokenListGovernance", { address : dao.pluginAddresses[0], abi: (await deployments.getArtifact("TokenListGovernance")).abi });
};
export default func;
func.tags = ["CommunityDAO"];
func.dependencies = ["TokenListGovernance", "NFT"];