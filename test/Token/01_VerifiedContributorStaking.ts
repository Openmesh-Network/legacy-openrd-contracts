import { loadFixture, time } from "@nomicfoundation/hardhat-network-helpers";
import { ethers, getNamedAccounts, getUnnamedAccounts } from "hardhat";
import { ERC20, VerifiedContributorStaking } from "../../typechain-types";
import { expect } from "chai";
import { getVerifiedContributor } from "./00_VerifiedContributor";
import { days } from "../../utils/timeUnits";

export async function getStaking() {
  const { NFT } = await loadFixture(getVerifiedContributor);

  const contributor = (await getUnnamedAccounts())[0];
  const tokenId = 123;
  await NFT.mint(contributor, tokenId);

  const Staking = (await ethers.getContract("Staking", contributor)) as any as VerifiedContributorStaking;
  const RewardToken = (await ethers.getContractAt("ERC20", await Staking.rewardToken())) as any as ERC20;

  return { NFT, Staking, RewardToken, contributor, tokenId };
}

describe("Verified Contributor Staking", function () {
  it("should be stakable by the owner", async function () {
    const staking = await loadFixture(getStaking);

    const tx = staking.Staking.stake(staking.tokenId);
    await expect(tx).to.not.be.reverted;
  });

  it("should generate the right amount of reward after 1 second", async function () {
    const staking = await loadFixture(getStaking);
    const rewardRate = await staking.Staking.tokensPerSecond();
    const seconds = 1;
    const expectedReward = BigInt(seconds) * rewardRate;

    const tx = await staking.Staking.stake(staking.tokenId);
    const receipt = await tx.wait();
    // if (!receipt) throw new Error("Receipt null");
    // await time.increaseTo((await receipt.getBlock()).timestamp + seconds - 1); // 1 second will be added by the transaction itself
    await staking.Staking.claim(staking.tokenId);

    expect(await staking.RewardToken.balanceOf(staking.contributor)).to.be.equal(expectedReward);
  });

  it("should generate the right amount of reward after 1 day", async function () {
    const staking = await loadFixture(getStaking);
    const rewardRate = await staking.Staking.tokensPerSecond();
    const seconds = 1 * days;
    const expectedReward = BigInt(seconds) * rewardRate;

    const tx = await staking.Staking.stake(staking.tokenId);
    const receipt = await tx.wait();
    if (!receipt) throw new Error("Receipt null");
    await time.increaseTo((await receipt.getBlock()).timestamp + seconds - 1); // 1 second will be added by the transaction itself
    await staking.Staking.claim(staking.tokenId);

    expect(await staking.RewardToken.balanceOf(staking.contributor)).to.be.equal(expectedReward);
  });

  it("should generate the right amount of reward after 1 year", async function () {
    const staking = await loadFixture(getStaking);
    const rewardRate = await staking.Staking.tokensPerSecond();
    const seconds = 365 * days;
    const expectedReward = BigInt(seconds) * rewardRate;

    const tx = await staking.Staking.stake(staking.tokenId);
    const receipt = await tx.wait();
    if (!receipt) throw new Error("Receipt null");
    await time.increaseTo((await receipt.getBlock()).timestamp + seconds - 1); // 1 second will be added by the transaction itself
    await staking.Staking.claim(staking.tokenId);

    expect(await staking.RewardToken.balanceOf(staking.contributor)).to.be.equal(expectedReward);
  });

  it("should generate the right amount of reward after 100 year", async function () {
    const staking = await loadFixture(getStaking);
    const rewardRate = await staking.Staking.tokensPerSecond();
    const seconds = 100 * 365 * days;
    const expectedReward = BigInt(seconds) * rewardRate;

    const tx = await staking.Staking.stake(staking.tokenId);
    const receipt = await tx.wait();
    if (!receipt) throw new Error("Receipt null");
    await time.increaseTo((await receipt.getBlock()).timestamp + seconds - 1); // 1 second will be added by the transaction itself
    await staking.Staking.claim(staking.tokenId);

    expect(await staking.RewardToken.balanceOf(staking.contributor)).to.be.equal(expectedReward);
  });

  it("should generate the right amount of reward after 1 year and 1 month in 2 claims", async function () {
    const staking = await loadFixture(getStaking);
    const rewardRate = await staking.Staking.tokensPerSecond();
    const firstClaimSeconds = 365 * days;
    const secondClaimSeconds = 30 * days;
    const expectedReward = BigInt(firstClaimSeconds + secondClaimSeconds) * rewardRate;

    const tx = await staking.Staking.stake(staking.tokenId);
    const receipt = await tx.wait();
    if (!receipt) throw new Error("Receipt null");
    await time.increaseTo((await receipt.getBlock()).timestamp + firstClaimSeconds - 1); // 1 second will be added by the transaction itself
    await staking.Staking.claim(staking.tokenId);
    await time.increaseTo((await receipt.getBlock()).timestamp + firstClaimSeconds + secondClaimSeconds - 1); // 1 second will be added by the transaction itself
    await staking.Staking.claim(staking.tokenId);

    expect(await staking.RewardToken.balanceOf(staking.contributor)).to.be.equal(expectedReward);
  });

  it("should generate the right amount of reward after ending staking after 1 year and claiming 1 month later", async function () {
    const staking = await loadFixture(getStaking);
    const { deployer } = await getNamedAccounts();
    const rewardRate = await staking.Staking.tokensPerSecond();
    const rewardSeconds = 365 * days;
    const claimSeconds = rewardSeconds + 30 * days;
    const expectedReward = BigInt(rewardSeconds) * rewardRate;

    const tx = await staking.Staking.stake(staking.tokenId);
    const receipt = await tx.wait();
    if (!receipt) throw new Error("Receipt null");
    await staking.Staking.connect(await ethers.getSigner(deployer)).setStakingEnd((await receipt.getBlock()).timestamp + rewardSeconds);
    await time.increaseTo((await receipt.getBlock()).timestamp + claimSeconds - 1); // 1 second will be added by the transaction itself
    await staking.Staking.claim(staking.tokenId);

    expect(await staking.RewardToken.balanceOf(staking.contributor)).to.be.equal(expectedReward);
  });

  it("should not allow staking twice", async function () {
    const staking = await loadFixture(getStaking);

    await staking.Staking.stake(staking.tokenId);
    const tx = staking.Staking.stake(staking.tokenId);

    await expect(tx).to.be.revertedWithCustomError(staking.Staking, "NFTAlreadyStaked");
  });

  it("should not allow staking by non-owner", async function () {
    const staking = await loadFixture(getStaking);
    const notOwner = (await getUnnamedAccounts())[1];

    const tx = staking.Staking.connect(await ethers.getSigner(notOwner)).stake(staking.tokenId);

    await expect(tx).to.be.revertedWithCustomError(staking.Staking, "NotYourNFT");
  });

  it("should not allow claiming without staking", async function () {
    const staking = await loadFixture(getStaking);

    const tx = staking.Staking.claim(staking.tokenId);

    await expect(tx).to.be.revertedWithCustomError(staking.Staking, "NFTNotStaked");
  });

  it("should not allow unstaking without staking", async function () {
    const staking = await loadFixture(getStaking);

    const tx = staking.Staking.unstake(staking.tokenId);

    await expect(tx).to.be.revertedWithCustomError(staking.Staking, "NFTNotStaked");
  });

  it("should not allow unstaking by non-owner", async function () {
    const staking = await loadFixture(getStaking);
    const notOwner = (await getUnnamedAccounts())[1];

    await staking.Staking.stake(staking.tokenId);
    const tx = staking.Staking.connect(await ethers.getSigner(notOwner)).unstake(staking.tokenId);

    await expect(tx).to.be.revertedWithCustomError(staking.Staking, "NotYourNFT");
  });

  it("should not allow ending the staking in the past", async function () {
    const staking = await loadFixture(getStaking);
    const { deployer } = await getNamedAccounts();

    const tx = staking.Staking.connect(await ethers.getSigner(deployer)).setStakingEnd(await time.latest());

    await expect(tx).to.be.revertedWithCustomError(staking.Staking, "StakingEndMustBeInTheFuture");
  });
});
