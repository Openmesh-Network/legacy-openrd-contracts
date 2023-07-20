import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
	const { deployments, getNamedAccounts } = hre;
    const { deployer } = await getNamedAccounts();

    await deployments.deploy("NFT", {
        from: deployer,
        contract: "MockERC721",
        args: ["Plopmenz NFTs", "PLOP"]
    });
};
export default func;
func.tags = ["NFT"];