import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
import { setBool } from "../../utils/globalVars";
import { Gwei } from "../../utils/ethersUnits";

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployments, getNamedAccounts } = hre;
  const { deployer } = await getNamedAccounts();

  const rewardToken = await deployments.get("OPEN");
  const stakeNFT = await deployments.get("NFT");
  const tokensPerSecond = Gwei(386); // ~1 OPEN a month (1.000512)

  const deployResult = await deployments.deploy("Staking", {
    from: deployer,
    contract: "VerifiedContributorStaking",
    args: [rewardToken.address, stakeNFT.address, tokensPerSecond],
  });

  await setBool("NewStaking", deployResult.newlyDeployed);
};
export default func;
func.tags = ["StakingDeploy"];
func.dependencies = ["NFT", "OPEN"];
