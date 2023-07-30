import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "solidity-coverage";
import "hardhat-gas-reporter";
import "hardhat-deploy";
import "hardhat-deploy-ethers";
import "@typechain/hardhat";
import "@nomicfoundation/hardhat-ethers";

import { config as dotEnvConfig } from "dotenv";
dotEnvConfig();

const fakePrivKey = "0000000000000000000000000000000000000000000000000000000000000000";

const config: HardhatUserConfig = {
  solidity: {
    version: "0.8.17",
    settings: {
      optimizer: {
        enabled: true,
        runs: 1_000_000, // Higher is not allowed by Etherscan verification
      }
    }
  },
  networks: {
    mumbai: {
      accounts: [process.env.PRIV_KEY ?? fakePrivKey],
      url: "https://rpc.ankr.com/polygon_mumbai",
      deploy: ["00_Tasks", "02_Plugins", "03_NFT", "04_DAO"].map(d => `deploy/${d}`),
      verify: {
        etherscan: {
          apiKey: process.env.X_POLYGONSCAN_API_KEY ?? "",
        },
      },
    },
  },
  namedAccounts: {
    deployer: {
        default: 0, // here this will by default take the first account as deployer
    },
    creator: {
        default: 1,
    },
    manager: {
        default: 2,
    },
    executor: {
        default: 3,
    },
  },
  gasReporter: {
    enabled: true,
    coinmarketcap: process.env.COINMARKETCAP_API_KEY,
    excludeContracts: ["mocks/", "ERC20", "ERC721", "DAO", "DAOFactory", "ENSRegistry", "PluginRepoFactory", "ENSSubdomainRegistrar", "PluginRepoRegistry", "PluginSetupProcessor", "PublicResolver", "PreferredProxy", "PluginRepo"],
    // token: "MATIC",
    // gasPriceApi: "https://api.polygonscan.com/api?module=proxy&action=eth_gasPrice"
  },
  etherscan: {
    apiKey: {
      mainnet: process.env.X_ETHERSCAN_API_KEY ?? "",
      polygonMumbai: process.env.X_POLYGONSCAN_API_KEY ?? "",
    }
  }
};

export default config;
