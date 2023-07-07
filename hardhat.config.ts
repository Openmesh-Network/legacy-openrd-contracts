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
    version: "0.8.19",
    settings: {
      optimizer: {
        enabled: true,
        runs: 1_000_000,
      }
    }
  },
  networks: {
    "mumbai": {
      accounts: [process.env.PRIV_KEY ?? fakePrivKey],
      url: "https://rpc.ankr.com/polygon_mumbai"
    }
  },
  namedAccounts: {
    deployer: {
        default: 0, // here this will by default take the first account as deployer
    },
    proposer: {
        default: 1,
    },
    executor: {
        default: 2,
    },
  },
  gasReporter: {
    enabled: false,
    coinmarketcap: process.env.COINMARKETCAP_API_KEY,
    excludeContracts: ["mocks/", "ERC20"],
    // token: "MATIC",
    // gasPriceApi: "https://api.polygonscan.com/api?module=proxy&action=eth_gasPrice"
  },
  etherscan: {
    apiKey: {
      //ethereum
      mainnet: process.env.ETHERSCAN_API_KEY ?? "",
      polygonMumbai: process.env.POLYGONSCAN_API_KEY ?? "",
    }
  },
};

export default config;
