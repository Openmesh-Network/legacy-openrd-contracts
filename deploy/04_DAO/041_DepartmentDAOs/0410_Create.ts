import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction, DeploymentsExtension } from "hardhat-deploy/types";
import { ethers } from "hardhat";
import { DAOFactory } from "../../../typechain-types";
import { getBool, getVar, setVar } from "../../../utils/globalVars";
import { getEventsFromLogs } from "../../../utils/utils";

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
    if (!await getBool("NewTokenListGovernance") && !await getBool("NewDraftsSetup") && !await getBool("NewNFT")) {
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
func.dependencies = ["TokenListGovernance", "TaskDrafts", "NFT", "Tasks"];

async function createDepartment(deployer : string, departmentName : string, nftCollection : string, deployments : DeploymentsExtension) {
    const subdomain = "department-test-4-" + departmentName;

    const tasks = await deployments.get("Tasks");
    const tokenListGovernanceSetup = await deployments.get("TokenListGovernanceSetup");
    const tokenListGovernanceSettings = await getTokenListGovernanceSettings(deployer, nftCollection);
    // In case there is a transaction in progress, either this one or that will get the wrong address, based on which one gets confirmed earlier
    // This is because the nonce has then increased by 1, however there is currently no other way to get the address as far as I know
    const expectedGovernanceAddress = await ethers.getCreateAddress({
        from: tokenListGovernanceSetup.address,
        nonce: await ethers.provider.getTransactionCount(tokenListGovernanceSetup.address),
    });
    const taskDraftsSettings = await geTaskDraftsSettings(tasks.address, expectedGovernanceAddress);

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
        [tokenListGovernanceSettings, taskDraftsSettings],
    );

    const daoRegistry = await ethers.getContract("DAORegistry");
    const pluginSetupProcessor = await ethers.getContract("PluginSetupProcessor");
    const daoAddress = getEventsFromLogs(receipt.logs, daoRegistry.interface, "DAORegistered")[0].args.dao;
    const pluginAddresses = getEventsFromLogs(receipt.logs, pluginSetupProcessor.interface, "InstallationApplied").map(log => log.args.plugin);
    const daoData = {
        dao: daoAddress,
        tokenListGovernance: pluginAddresses[0],
        taskDrafts: pluginAddresses[1],
    };
    await setVar(subdomain, JSON.stringify(daoData), true);
}

async function getTokenListGovernanceSettings(deployer : string, nftCollection : string) {
    const tokenListGovernanceFormat = [
        "tuple(uint8 votingMode, uint64 supportThreshold, uint64 minParticipation, uint64 minDuration, uint256 minProposerVotingPower) votingSettings",
        "address tokenCollection",
        "uint256[] members",
        "address manager",
    ];
    const tokenListGovernanceValues : any[] = [
        {
            votingMode: 1, // Early execution
            supportThreshold: 50 * 10**4, // % * 10**4 (ppm)
            minParticipation: 20 * 10**4, // % * 10**4 (ppm)
            minDuration: 3600, // seconds
            minProposerVotingPower: 1, // require people to be a member to create proposals (this is a boolean in disguise)
        },
        nftCollection,
        [0, 1, 2, 3],
        deployer, // change to parent DAO
    ];
    const tokenListGovernanceBytes = ethers.AbiCoder.defaultAbiCoder().encode(
        tokenListGovernanceFormat,
        tokenListGovernanceValues
    );
    const tokenListGovernanceSettings = {
        pluginSetupRef: {
            versionTag: {
                release: 1,
                build: 1,
            },
            pluginSetupRepo: await getVar("TokenListGovernanceRepo"),
        },
        data: tokenListGovernanceBytes,
    };
    return tokenListGovernanceSettings;
}

async function geTaskDraftsSettings(tasks : string, governancePlugin : string) {
    const taskDraftsFormat = [
        "address tasks",
        "address governancePlugin",
    ];
    const taskDraftsValues : any[] = [
        tasks,
        governancePlugin,
    ];
    const taskDraftsBytes = ethers.AbiCoder.defaultAbiCoder().encode(
        taskDraftsFormat,
        taskDraftsValues
    );
    const taskDraftsSettings = {
        pluginSetupRef: {
            versionTag: {
                release: 1,
                build: 1,
            },
            pluginSetupRepo: await getVar("TaskDraftsRepo"),
        },
        data: taskDraftsBytes,
    };
    return taskDraftsSettings;
}