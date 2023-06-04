import { ethers } from "hardhat";
import { findEventsTopicLog } from "../utils/helpers";

// Addresses of mumbai deployment https://github.com/aragon/osx/blob/develop/active_contracts.json
const pluginRepoFactoryAddress = "0xDcC5933bc3567E7798Ff00Ab3413cF5f5801BD41";
const daoFactoryAddress = "0x5bdbaafd90b908058567080513635f560f896918";

// Cached addresses, set to undefined to redeploy
const deployedNFTMultisigRepo = "0x801C085b0fE742f302AEe313BfbfBcB49D09B74B";
const deployedTasksRepo = "0xA97f9C5c337Dae99E0d58773Cde41C0E3Fb43868";

const deployedNFTMultisigSetup = "0x3082e9d4EEd526f95A8c59f4080e9cF587249133";
const deployedTasksSetup = "0x3A8A9cab937060dE8725CeAB633F8A7F05933E2E";

// Settings
const ERC721Name = "Plopmenz NFTs";
const ERC721Symbol = "PLOP"
const additionalMintAddresses : string[] = [];

const getRandomInt = () => Math.round(Math.random() * 1000000);
const NFTMultisigRepoENS = "plugin" + getRandomInt();
const TasksRepoENS = "plugin" + getRandomInt();
const DAOENS = "dao" + getRandomInt();

const DAOUri = "https://plopmenz.com";
// Structure of DAO metadata as used in the Aragon App, make a json of this file retrievable by quering the DAOMetadataUri
export interface DAOMetadata {
  name: string;
  description: string;
  links : { name: string, url: string }[]
  avatar: string; // Can be another IPFS hash or centralised url
}
const DAOMetadataUri = "ipfs://"; // Upload the metadata to IPFS and put the hash here, or provide a centralised url if that's preffered

async function main() {
  // Deploy NFTMultisigSetup contract and register it as aragon plugin
  const NFTMultisigRepo = deployedNFTMultisigRepo ?? await DeployNFTMultisig();
  console.log("NFTMultisigRepo:", NFTMultisigRepo);
  
  // Deploy TasksSetup contract and register it as aragon plugin
  const TasksRepo = deployedTasksRepo ?? await DeployTasks();
  console.log("TasksRepo:", TasksRepo);

  // Deploy ERC721 contract and mint one NFT to deployers wallet
  const ERC721 = await DeployERC721OwnerMintable();
  console.log("ERC721:", ERC721);

  // Create DAO with the plugin
  await DeployDAO(ERC721, NFTMultisigRepo, TasksRepo);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

async function DeployERC721OwnerMintable() {
  const [owner] = await ethers.getSigners();
  const ERC721OwnerMintableContract = await ethers.getContractFactory("ERC721OwnerMintable");
  const ERC721OwnerMintable = await ERC721OwnerMintableContract.deploy(ERC721Name, ERC721Symbol);
  await ERC721OwnerMintable.deployed();

  const mintTx = await ERC721OwnerMintable.mint(owner.address);
  await mintTx.wait();
  for (let i = 0; i < additionalMintAddresses.length; i++) {
    const additionalMintTx = await ERC721OwnerMintable.mint(additionalMintAddresses[i]);
    await additionalMintTx.wait();
  }
  return ERC721OwnerMintable.address;
}

async function DeployNFTMultisig() {
  const NFTMultisigSetupContract = await ethers.getContractFactory("NFTMultisigSetup");
  let NFTMultisigSetup = deployedNFTMultisigSetup;
  if (NFTMultisigSetup == undefined) {
    const contract = await NFTMultisigSetupContract.deploy();
    await contract.deployed();
    NFTMultisigSetup = contract.address;
  }
  console.log("NFTMultisigSetup:", NFTMultisigSetup);
  return await CreateRepo(NFTMultisigRepoENS, NFTMultisigSetup, "Not used yet", "Not used yet");
}

async function DeployTasks() {
  const TasksSetupContract = await ethers.getContractFactory("TasksSetup");
  let TasksSetup = deployedTasksSetup;
  if (TasksSetup == undefined) {
    const contract = await TasksSetupContract.deploy();
    await contract.deployed();
    TasksSetup = contract.address;
  }
  console.log("TasksSetup:", TasksSetup);
  return await CreateRepo(TasksRepoENS, TasksSetup, "Not used yet", "Not used yet");
}

async function DeployDAO(ERC721 : string, NFTMultisigRepo : string, TasksRepo : string) {
  const DAOFactory = await ethers.getContractAt("DAOFactory", daoFactoryAddress);
  const DAORegistry = await ethers.getContractAt("DAORegistry", ethers.constants.AddressZero);
  const PluginSetupProcessor = await ethers.getContractAt("PluginSetupProcessor", ethers.constants.AddressZero);

  const NFTMultisig = await CreatePluginSettings(NFTMultisigRepo, ["tuple(uint32)", "address"], [[0.33 * 10**6], ERC721]);
  const Tasks = await CreatePluginSettings(TasksRepo, [], []);

  const DAOFactorySettings = {
    trustedForwarder: ethers.constants.AddressZero,
    daoURI: DAOUri,
    subdomain: DAOENS,
    metadata: ethers.utils.toUtf8Bytes(DAOMetadataUri),
  };

  const tx = await DAOFactory.createDao(DAOFactorySettings, [NFTMultisig, Tasks]);
  const receipt = await tx.wait();

  const DAOAddress = findEventsTopicLog(receipt, DAORegistry.interface, "DAORegistered")[0].args.dao;
  const pluginAddresses = findEventsTopicLog(receipt, PluginSetupProcessor.interface, "InstallationApplied").map((log : any) => log.args.plugin);

  const ERC721OwnerMintable = await ethers.getContractAt("ERC721OwnerMintable", ERC721);
  await ERC721OwnerMintable.transferOwnership(DAOAddress);

  console.log("DAO:", DAOAddress);
  console.log("ERC721:", ERC721);
  console.log("NFTMultisig plugin:", pluginAddresses[0]);
  console.log("Tasks plugin:", pluginAddresses[1]);
}

async function CreateRepo(subdomain : string, setupContract : string, releaseMetadata : string, buildMetadata : string) {
  const [owner] = await ethers.getSigners();
  const PluginRepoFactory = await ethers.getContractAt("PluginRepoFactory", pluginRepoFactoryAddress);
  const PluginRepoRegistry = await ethers.getContractAt("PluginRepoRegistry", ethers.constants.AddressZero);

  const tx = await PluginRepoFactory.createPluginRepoWithFirstVersion(
    subdomain,
    setupContract,
    owner.address,
    ethers.utils.toUtf8Bytes(releaseMetadata),
    ethers.utils.toUtf8Bytes(buildMetadata)
  );
  const receipt = await tx.wait();
  const log = findEventsTopicLog(
    receipt,
    PluginRepoRegistry.interface,
    'PluginRepoRegistered'
  );
  return log[0].args.pluginRepo;
}

function CreatePluginSettings(repo : string, installationAbi : string[], installationArgs : any[]) {
  const pluginConstructionBytes = ethers.utils.defaultAbiCoder.encode(installationAbi, installationArgs);
  const tag = {
      release: 1, //uint8
      build: 1, //uint16
  };
  const pluginSetupRef = {
      versionTag: tag, //PluginRepo.Tag
      pluginSetupRepo: repo, //PluginRepo
  };
  const pluginSettings = {
      pluginSetupRef: pluginSetupRef, //PluginSetupRef
      data: pluginConstructionBytes, //bytes
  };
  return pluginSettings;
}