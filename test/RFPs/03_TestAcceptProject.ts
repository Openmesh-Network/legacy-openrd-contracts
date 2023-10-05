import { expect } from "chai";
import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { deployments, ethers, getNamedAccounts, getUnnamedAccounts } from "hardhat";
import { TestSetup } from "../Helpers/TestSetup";
import { ITasks, RFPs, Tasks } from "../../typechain-types";
import { days, now } from "../../utils/timeUnits";
import { getEventsFromLogs } from "../../utils/utils";
import { createRFP } from "./00_TestCreateRFP";
import { DeployMockERC20 } from "../Helpers/MockERC20Helper";
import { Ether } from "../../utils/ethersUnits";
import { submitProject } from "./02_TestSubmitProject";

async function RFPFixture() {
  await loadFixture(TestSetup);
  const RFP = await createRFP({});
  return RFP;
}

async function AcceptProject(RFP: RFPs, rfpId: bigint, projectId: bigint) {
  const tx = await RFP.acceptProject(rfpId, projectId);
  const receipt = await tx.wait();
  const AcceptProjectEvents = getEventsFromLogs(receipt?.logs, RFP.interface, "ProjectAccepted");
  const taskId = AcceptProjectEvents[0].args.taskId;
  const Tasks = (await ethers.getContract("Tasks")) as Tasks;
  return Tasks.getTask(taskId);
}

describe("Accept Project", function () {
  it("should have changed it to accepted", async function () {
    const RFP = await loadFixture(RFPFixture);
    const projectId = await submitProject({ RFP: RFP.RFPsProject, rfpId: RFP.rfpId });
    await RFP.RFPsManager.acceptProject(RFP.rfpId, projectId);
    const RFPInfo = await RFP.RFPsManager.getRFP(RFP.rfpId);
    expect(RFPInfo.projects[Number(projectId)].accepted).to.be.true;
  });

  it("should not be allowed on already accepted", async function () {
    const RFP = await loadFixture(RFPFixture);
    const projectId = await submitProject({ RFP: RFP.RFPsProject, rfpId: RFP.rfpId });
    await RFP.RFPsManager.acceptProject(RFP.rfpId, projectId);
    const tx = RFP.RFPsManager.acceptProject(RFP.rfpId, projectId);
    await expect(tx).to.be.revertedWithCustomError(RFP.RFPsManager, "ProjectAlreadyAccepted");
  });

  it("should have the correct metadata", async function () {
    const RFP = await loadFixture(RFPFixture);
    const metadata = "ipfs://bafybeifbgwvye7fkuqwhecpl4stnmnxizz4uhvwzd4wifpawwvfjc3b34a";
    const projectId = await submitProject({ RFP: RFP.RFPsProject, rfpId: RFP.rfpId, metadata: metadata });
    const task = await AcceptProject(RFP.RFPsManager, RFP.rfpId, projectId);
    expect(task.metadata).to.be.equal(metadata);
  });

  it("should have the correct deadline", async function () {
    const RFP = await loadFixture(RFPFixture);
    const deadline = now() + 2 * days;
    const projectId = await submitProject({ RFP: RFP.RFPsProject, rfpId: RFP.rfpId, deadline: deadline });
    const task = await AcceptProject(RFP.RFPsManager, RFP.rfpId, projectId);
    expect(task.deadline).to.be.equal(deadline);
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
    const task = await AcceptProject(RFP.RFPsManager, RFP.rfpId, projectId);
    for (let i = 0; i < reward.length; i++) {
      expect(task.applications[0].reward[i].nextToken).to.be.equal(reward[i].nextToken);
      expect(task.applications[0].reward[i].to).to.be.equal(reward[i].to);
      expect(task.applications[0].reward[i].amount).to.be.equal(reward[i].amount);
    }
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
    const task = await AcceptProject(RFP.RFPsManager, RFP.rfpId, projectId);
    for (let i = 0; i < nativeReward.length; i++) {
      expect(task.applications[0].nativeReward[i].to).to.be.equal(nativeReward[i].to);
      expect(task.applications[0].nativeReward[i].amount).to.be.equal(nativeReward[i].amount);
    }
  });

  it("should have the correct admin", async function () {
    await loadFixture(TestSetup);
    const accounts = await getUnnamedAccounts();
    const tasksManager = accounts[0];
    const RFP = await createRFP({ tasksManager: tasksManager });
    const projectId = await submitProject({ RFP: RFP.RFPsProject, rfpId: RFP.rfpId });
    const task = await AcceptProject(RFP.RFPsManager, RFP.rfpId, projectId);
    expect(task.manager).to.be.equal(tasksManager);
  });

  it("should have the correct applicant", async function () {
    await loadFixture(TestSetup);
    const RFP = await loadFixture(RFPFixture);
    const accounts = await getUnnamedAccounts();
    const applicant = accounts[0];
    const projectId = await submitProject({ RFP: RFP.RFPsProject.connect(await ethers.getSigner(applicant)), rfpId: RFP.rfpId });
    const task = await AcceptProject(RFP.RFPsManager, RFP.rfpId, projectId);
    expect(task.applications[0].applicant).to.be.equal(applicant);
  });

  it("should not be allowed by non-admin", async function () {
    const RFP = await loadFixture(RFPFixture);
    const projectId = await submitProject({ RFP: RFP.RFPsProject, rfpId: RFP.rfpId });
    const tx = RFP.RFPsProject.acceptProject(RFP.rfpId, projectId);
    await expect(tx).to.be.revertedWithCustomError(RFP.RFPsProject, "NotManager");
  });

  it("should not be allowed on non-existing project", async function () {
    const RFP = await loadFixture(RFPFixture);
    const projectId = await submitProject({ RFP: RFP.RFPsProject, rfpId: RFP.rfpId });
    const tx = RFP.RFPsManager.acceptProject(RFP.rfpId, projectId + BigInt(1));
    await expect(tx).to.be.revertedWithCustomError(RFP.RFPsProject, "ProjectDoesNotExist");
  });
});
