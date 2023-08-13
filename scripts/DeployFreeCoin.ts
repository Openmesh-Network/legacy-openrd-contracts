import { ethers } from "hardhat";

async function main() {
    const MockERC20Contract = await ethers.getContractFactory("MockERC20");
    const MockERC20 = await MockERC20Contract.deploy("FREEthereum", "FREE");
    await MockERC20.waitForDeployment();
    console.log(await MockERC20.getAddress());
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
