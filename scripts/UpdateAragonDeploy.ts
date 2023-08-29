import { deployments, network, artifacts } from "hardhat";
import activeContractsJson from "./active_contract.json";

/// Scripts to read AragonOSx active_contracts.json and converts them to hardhat-deploy deployments
/// https://github.com/aragon/osx/blob/develop/active_contracts.json

async function main() {
  const activeContracts = activeContractsJson as { [networkName: string]: { [contractName: string]: string } };
  const contractInfo = activeContracts[network.name];
  const contracts = ["DAORegistry", "PluginRepoRegistry", "PluginRepoFactory", "PluginSetupProcessor", "DAOFactory"];
  for (let i = 0; i < contracts.length; i++) {
    const artifact = await artifacts.readArtifact(contracts[i]);
    deployments.save(contracts[i], { address: contractInfo[contracts[i]], ...artifact });
  }
  
  const repos = ["token-voting-repo"];
  const repoContract = await deployments.getArtifact("PluginRepo");
  for (let i = 0; i < repos.length; i++) {
    deployments.save(repos[i], { address: contractInfo[repos[i]], ...repoContract });
  }
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
