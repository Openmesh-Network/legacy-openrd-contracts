import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
import { setBool } from "../../utils/globalVars";
import { Gwei } from "../../utils/ethersUnits";

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployments, getNamedAccounts } = hre;
  const { deployer } = await getNamedAccounts();

  const rewardToken = await deployments.get("ERC20");
  const stakeNFT = await deployments.get("NFT");
  const tokensPerSecond = Gwei(3858024); // ~10_000 OPEN every 30 days (9999.998208)

  const deployResult = await deployments.deploy("Staking", {
    from: deployer,
    contract: "VerifiedContributorStaking",
    args: [rewardToken.address, stakeNFT.address, tokensPerSecond],
  });

  await setBool("NewStaking", deployResult.newlyDeployed);
};
export default func;
func.tags = ["StakingDeploy"];
func.dependencies = ["NFT", "ERC20"];
