import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction, DeploymentsExtension } from "hardhat-deploy/types";
import { ethers } from "hardhat";
import { DAOFactory } from "../../../typechain-types";
import { getBool, getVar, setVar } from "../../../utils/globalVars";
import { getEventsFromLogs } from "../../../utils/utils";

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
    if (!await getBool("NewTokenListGovernance") && !await getBool("NewNFT")) {
        return;
    }

	const { deployments, getNamedAccounts } = hre;
    const { deployer } = await getNamedAccounts();

    const nftCollection = (await deployments.get("NFT")).address;

    await createDepartment(deployer, "devops", nftCollection, deployments);
    await createDepartment(deployer, "engineering", nftCollection, deployments);
};
export default func;
func.tags = ["DepartmentDAO"];
func.dependencies = ["TokenListGovernance", "NFT"];

async function createDepartment(deployer : string, departmentName : string, nftCollection : string, deployments : DeploymentsExtension) {
    const subdomain = "department-test-0-" + departmentName;

    const constructionFormat = [
        "tuple(uint8 votingMode, uint64 supportThreshold, uint64 minParticipation, uint64 minDuration, uint256 minProposerVotingPower) votingSettings",
        "address tokenCollection",
        "uint256[] members",
        "address manager",
    ];
    const constructionValues : any[] = [
        {
            votingMode: 1, // Early execution
            supportThreshold: 50 * 10**4, // % * 10**4 (ppm)
            minParticipation: 20 * 10**4, // % * 10**4 (ppm)
            minDuration: 3600, // seconds
            minProposerVotingPower: 1, // require people to be a member to create proposals (this is a boolean in disguise)
        },
        nftCollection,
        [0, 1, 2, 3],
        deployer,
    ];
    const pluginConstructionBytes = ethers.AbiCoder.defaultAbiCoder().encode(
        constructionFormat,
        constructionValues
    );

    const pluginSettings = {
        pluginSetupRef: {
            versionTag: {
                release: 1,
                build: 1,
            },
            pluginSetupRepo: await getVar("TokenListGovernanceRepo"),
        },
        data: pluginConstructionBytes,
    };
    const daoSettings : DAOFactory.DAOSettingsStruct = {
        trustedForwarder: ethers.ZeroAddress,
        daoURI: "https://plopmenz.com",
        subdomain: subdomain,
        metadata: "0x",
    }
    const receipt = await deployments.execute("DAOFactory",
        {
            from: deployer,
        },
        "createDao",
        daoSettings,
        [pluginSettings],
    );

    const daoRegistry = await ethers.getContract("DAORegistry");
    const pluginSetupProcessor = await ethers.getContract("PluginSetupProcessor");
    const daoAddress = getEventsFromLogs(receipt.logs, daoRegistry.interface, "DAORegistered")[0].args.dao;
    const pluginAddresses = getEventsFromLogs(receipt.logs, pluginSetupProcessor.interface, "InstallationApplied").map(log => log.args.plugin);
    const daoData = {
        dao: daoAddress,
        tokenListGovernance: pluginAddresses[0],
    };
    await setVar(subdomain, JSON.stringify(daoData), true);
}