import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
import { setBool } from "../../../utils/globalVars";

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
	const { deployments, getNamedAccounts } = hre;
    const { deployer } = await getNamedAccounts();

    const deployResult = await deployments.deploy("TokenListGovernanceSetup", {
        from: deployer,
    });

    await setBool("NewTokenListGovernance", deployResult.newlyDeployed);
};
export default func;
func.tags = ["TokenListGovernanceSetup"];
func.dependencies = ["AragonOSx"];