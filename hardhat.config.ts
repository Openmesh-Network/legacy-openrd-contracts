import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "solidity-coverage";
import "hardhat-gas-reporter";
import "hardhat-deploy";
import "hardhat-deploy-ethers";
import "@typechain/hardhat";
import "@nomicfoundation/hardhat-ethers";
import "@primitivefi/hardhat-dodoc";

import { config as dotEnvConfig } from "dotenv";
dotEnvConfig();

const fakePrivKey = "0000000000000000000000000000000000000000000000000000000000000000";

const config: HardhatUserConfig = {
  solidity: {
    compilers: [
      {
        // Aragon OSx contracts
        version: "0.8.17",
        settings: {
          optimizer: {
            enabled: true,
          },
        },
      },
      {
        // Other contracts
        version: "0.8.23",
        settings: {
          optimizer: {
            enabled: true,
            //runs: 1_000_000, // Higher is not allowed by Etherscan verification
          },
        },
      },
    ],
  },
  networks: {
    mumbai: {
      accounts: [process.env.PRIV_KEY ?? fakePrivKey],
      url: process.env.RPC_MUMBAI ?? "https://rpc.ankr.com/polygon_mumbai",
      deploy: ["00_Tasks", "02_Hats", "10_Plugins", "20_TokenCollections", "50_RFPs", "80_DAO"].map((d) => `deploy/${d}`), // Hats is not on Polygon Mumbai
      verify: {
        etherscan: {
          apiKey: process.env.X_POLYGONSCAN_API_KEY ?? "",
        },
      },
    },
    polygon: {
      accounts: [process.env.PRIV_KEY ?? fakePrivKey],
      url: process.env.RPC_POLYGON ?? "https://rpc.ankr.com/polygon",
      deploy: ["00_Tasks", "10_Plugins", "20_TokenCollections", "50_RFPs", "80_DAO"].map((d) => `deploy/${d}`),
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
    enabled: false,
    coinmarketcap: process.env.COINMARKETCAP_API_KEY,
    excludeContracts: [
      "mocks/",
      "ERC20",
      "ERC721",
      "DAO.sol", // name clash with DAO folder
      "DAOFactory",
      "ENSRegistry",
      "PluginRepoFactory",
      "ENSSubdomainRegistrar",
      "PluginRepoRegistry",
      "PluginSetupProcessor",
      "PublicResolver",
      "PreferredProxy",
      "PluginRepo",
    ],
    // token: "MATIC",
    // gasPriceApi: "https://api.polygonscan.com/api?module=proxy&action=eth_gasPrice"
  },
  etherscan: {
    apiKey: {
      mainnet: process.env.X_ETHERSCAN_API_KEY ?? "",
      polygonMumbai: process.env.X_POLYGONSCAN_API_KEY ?? "",
    },
  },
  dodoc: {
    runOnCompile: true,
    freshOutput: true,
    include: ["TokenListGovernance", "TaskDrafts", "Tasks", "Escrow", "TaskDisputes", "SharedAddress", "SubDAO", "RFPs"],
  },
};

export default config;
