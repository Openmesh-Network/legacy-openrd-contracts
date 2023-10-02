import { deployments, network } from "hardhat";

/// Scripts to create hardhat-deploy deployment of HatsProtocol
/// https://github.com/Hats-Protocol/hats-protocol/releases

async function main() {
  const supportedNetworks = ["goerli", "mainnet", "polygon", "gnosis", "arbitrum", "optimism"];
  if (!supportedNetworks.includes(network.name)) {
    throw new Error(`Network ${network.name} not supported by Hats`);
  }

  const address = "0x3bc1A0Ad72417f2d411118085256fC53CBdDd137";
  deployments.save("Hats", { address: address, ...(await deployments.getExtendedArtifact("Hats")) });
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
