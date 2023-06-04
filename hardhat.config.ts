import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

import { config as dotEnvConfig } from "dotenv";
dotEnvConfig();

const config: HardhatUserConfig = {
  solidity: "0.8.17",
  networks: {
    "mumbai": {
      accounts: [process.env.PRIV_KEY],
      url: "https://rpc.ankr.com/polygon_mumbai"
    }
  }
};

export default config;
