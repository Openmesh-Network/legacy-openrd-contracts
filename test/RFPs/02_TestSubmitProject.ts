import { expect } from "chai";
import { loadFixture, time } from "@nomicfoundation/hardhat-network-helpers";
import { deployments, ethers, getNamedAccounts, getUnnamedAccounts } from "hardhat";
import { TestSetup } from "../Helpers/TestSetup";
import { ITasks, RFPs } from "../../typechain-types";
import { days, minutes, now } from "../../utils/timeUnits";
import { getEventsFromLogs } from "../../utils/utils";
import { createRFP } from "./00_TestCreateRFP";
import { DeployMockERC20 } from "../Helpers/MockERC20Helper";
import { Ether } from "../../utils/ethersUnits";

async function RFPFixture() {
  await loadFixture(TestSetup);
  const RFP = await createRFP({});
  return RFP;
}

interface SubmitProjectSettings {
  RFP: RFPs;
  rfpId: bigint;
  metadata?: string;
  deadline?: number;
  reward?: ITasks.RewardStruct[];
  nativeReward?: ITasks.NativeRewardStruct[];
}
export async function submitProject(settings: SubmitProjectSettings): Promise<bigint> {
  const metadata = settings.metadata ?? "";
  const deadline = settings.deadline ?? now() + 30 * minutes;
  const reward = settings.reward ?? [];
  const nativeReward = settings.nativeReward ?? [];
  const tx = await settings.RFP.submitProject(settings.rfpId, metadata, deadline, reward, nativeReward);
  const receipt = await tx.wait();
  const RFPCreationEvents = getEventsFromLogs(receipt?.logs, settings.RFP.interface, "ProjectSubmitted");
  const projectId = RFPCreationEvents[0].args.projectId;
  return projectId;
}

describe("Submit Project", function () {
  it("should have added 1 project", async function () {
    const RFP = await loadFixture(RFPFixture);
    await submitProject({ RFP: RFP.RFPsProject, rfpId: RFP.rfpId });
    const RFPInfo = await RFP.RFPsManager.getRFP(RFP.rfpId);
    expect(RFPInfo.projects).to.be.lengthOf(1);
  });

  it("should start not accepted", async function () {
    const RFP = await loadFixture(RFPFixture);
    const projectId = await submitProject({ RFP: RFP.RFPsProject, rfpId: RFP.rfpId });
    const RFPInfo = await RFP.RFPsManager.getRFP(RFP.rfpId);
    expect(RFPInfo.projects[Number(projectId)].accepted).to.be.false;
  });

  it("should have the correct metadata", async function () {
    const RFP = await loadFixture(RFPFixture);
    const metadata = "ipfs://bafybeifbgwvye7fkuqwhecpl4stnmnxizz4uhvwzd4wifpawwvfjc3b34a";
    const projectId = await submitProject({ RFP: RFP.RFPsProject, rfpId: RFP.rfpId, metadata: metadata });
    const RFPInfo = await RFP.RFPsManager.getRFP(RFP.rfpId);
    expect(RFPInfo.projects[Number(projectId)].metadata).to.be.equal(metadata);
  });

  it("should have the correct deadline", async function () {
    const RFP = await loadFixture(RFPFixture);
    const deadline = now() + 2 * days;
    const projectId = await submitProject({ RFP: RFP.RFPsProject, rfpId: RFP.rfpId, deadline: deadline });
    const RFPInfo = await RFP.RFPsManager.getRFP(RFP.rfpId);
    expect(RFPInfo.projects[Number(projectId)].deadline).to.be.equal(deadline);
  });

  it("should have the correct reward", async function () {
    await loadFixture(TestSetup);
    const USDT = await DeployMockERC20();
    const WETH = await DeployMockERC20();
    const { manager } = await getNamedAccounts();
    const funder = manager;
    await USDT.increaseBalance(funder, Ether(5000));
    await WETH.increaseBalance(funder, Ether(3));
    const RFPsContract = await deployments.get("RFPs");
    await USDT.connect(await ethers.getSigner(funder)).approve(RFPsContract.address, Ether(5000));
    await WETH.connect(await ethers.getSigner(funder)).approve(RFPsContract.address, Ether(3));
    const budget: ITasks.ERC20TransferStruct[] = [
      { tokenContract: await USDT.getAddress(), amount: Ether(5000) },
      { tokenContract: await WETH.getAddress(), amount: Ether(3) },
    ];
    const RFP = await createRFP({ creator: funder, budget: budget });
    const accounts = await getUnnamedAccounts();
    const reward: ITasks.RewardStruct[] = [
      {
        nextToken: false,
        to: accounts[0],
        amount: Ether(3000),
      },
      {
        nextToken: true,
        to: accounts[1],
        amount: Ether(500),
      },
      {
        nextToken: true,
        to: accounts[1],
        amount: Ether(1),
      },
    ];
    const projectId = await submitProject({ RFP: RFP.RFPsProject, rfpId: RFP.rfpId, reward: reward });
    const RFPInfo = await RFP.RFPsProject.getRFP(RFP.rfpId);
    for (let i = 0; i < reward.length; i++) {
      expect(RFPInfo.projects[Number(projectId)].reward[i].nextToken).to.be.equal(reward[i].nextToken);
      expect(RFPInfo.projects[Number(projectId)].reward[i].to).to.be.equal(reward[i].to);
      expect(RFPInfo.projects[Number(projectId)].reward[i].amount).to.be.equal(reward[i].amount);
    }
  });

  it("should be rejected if reward not ending on true", async function () {
    await loadFixture(TestSetup);
    const USDT = await DeployMockERC20();
    const WETH = await DeployMockERC20();
    const { manager } = await getNamedAccounts();
    const funder = manager;
    await USDT.increaseBalance(funder, Ether(5000));
    await WETH.increaseBalance(funder, Ether(3));
    const RFPsContract = await deployments.get("RFPs");
    await USDT.connect(await ethers.getSigner(funder)).approve(RFPsContract.address, Ether(5000));
    await WETH.connect(await ethers.getSigner(funder)).approve(RFPsContract.address, Ether(3));
    const budget: ITasks.ERC20TransferStruct[] = [
      { tokenContract: await USDT.getAddress(), amount: Ether(5000) },
      { tokenContract: await WETH.getAddress(), amount: Ether(3) },
    ];
    const RFP = await createRFP({ creator: funder, budget: budget });
    const accounts = await getUnnamedAccounts();
    const reward: ITasks.RewardStruct[] = [
      {
        nextToken: false,
        to: accounts[0],
        amount: Ether(3000),
      },
    ];
    const tx = submitProject({ RFP: RFP.RFPsProject, rfpId: RFP.rfpId, reward: reward });
    await expect(tx).to.be.revertedWithCustomError(RFP.RFPsProject, "RewardDoesntEndWithNextToken");
  });

  it("should have the correct native reward", async function () {
    await loadFixture(TestSetup);
    const nativeBudget = Ether(100);
    const RFP = await createRFP({ nativeBudget: nativeBudget });
    const accounts = await getUnnamedAccounts();
    const nativeReward: ITasks.NativeRewardStruct[] = [
      {
        to: accounts[0],
        amount: Ether(50),
      },
      {
        to: accounts[1],
        amount: Ether(7),
      },
    ];
    const projectId = await submitProject({ RFP: RFP.RFPsProject, rfpId: RFP.rfpId, nativeReward: nativeReward });
    const RFPInfo = await RFP.RFPsProject.getRFP(RFP.rfpId);
    for (let i = 0; i < nativeReward.length; i++) {
      expect(RFPInfo.projects[Number(projectId)].nativeReward[i].to).to.be.equal(nativeReward[i].to);
      expect(RFPInfo.projects[Number(projectId)].nativeReward[i].amount).to.be.equal(nativeReward[i].amount);
    }
  });

  it("should have the correct representative", async function () {
    const RFP = await loadFixture(RFPFixture);
    const accounts = await getUnnamedAccounts();
    const representative = accounts[0];
    const projectId = await submitProject({ RFP: RFP.RFPsProject.connect(await ethers.getSigner(representative)), rfpId: RFP.rfpId });
    const RFPInfo = await RFP.RFPsManager.getRFP(RFP.rfpId);
    expect(RFPInfo.projects[Number(projectId)].representative).to.be.equal(representative);
  });

  it("should not be allowed after the deadline", async function () {
    await loadFixture(TestSetup);
    const deadline = now() + 20 * minutes;
    const RFP = await createRFP({ deadline: deadline });
    await time.increaseTo(deadline);
    const tx = submitProject({ RFP: RFP.RFPsProject, rfpId: RFP.rfpId });
    await expect(tx).to.be.revertedWithCustomError(RFP.RFPsProject, "RFPClosed");
  });
});
