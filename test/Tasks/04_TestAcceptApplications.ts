import { expect } from "chai";
import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { acceptApplications, applyForTask, getTask } from "../../utils/taskHelper";
import { ToBlockchainDate } from "../../utils/timeUnits";
import {
  createApplicationsTaskFixture,
  createBudgetTaskFixture,
  createTakenTaskFixture,
  createTakenTaskWithAcceptedSubmissionFixture,
} from "./00_TestTasksFixtures";
import { TaskState } from "../../utils/taskTypes";
import { ethers, getUnnamedAccounts } from "hardhat";
import { MockERC20 } from "../../typechain-types";
import { Wei } from "../../utils/ethersUnits";

describe("Accept Applications", function () {
  // Check if variables are set
  it("should have accepted the applications", async function () {
    const task = await loadFixture(createApplicationsTaskFixture);
    const acceptedApplications = task.applicants.map((_, i) => i).filter((_, i) => i % 2 == 0);
    await acceptApplications({
      tasks: task.TasksManager,
      taskId: task.taskId,
      applications: acceptedApplications.map(BigInt),
    });
    const taskInfo = await getTask({ tasks: task.TasksManager, taskId: task.taskId });
    for (let i = 0; i < acceptedApplications.length; i++) {
      expect(taskInfo.applications[acceptedApplications[i]].accepted).to.be.true;
    }
  });

  it("should be in open state", async function () {
    const task = await loadFixture(createApplicationsTaskFixture);
    const acceptedApplications = task.applicants.map((_, i) => i).filter((_, i) => i % 2 == 0);
    await acceptApplications({
      tasks: task.TasksManager,
      taskId: task.taskId,
      applications: acceptedApplications.map(BigInt),
    });
    const taskInfo = await getTask({ tasks: task.TasksExecutor, taskId: task.taskId });
    expect(taskInfo.state).to.be.equal(TaskState.Open);
  });

  //Check if variables are unset
  it("should not have accepted other applications", async function () {
    const task = await loadFixture(createApplicationsTaskFixture);
    const acceptedApplications = task.applicants.map((_, i) => i).filter((_, i) => i % 2 == 0);
    const rejectedApplications = task.applicants.map((_, i) => i).filter((_, i) => i % 2 == 1);
    await acceptApplications({
      tasks: task.TasksManager,
      taskId: task.taskId,
      applications: acceptedApplications.map(BigInt),
    });
    const taskInfo = await getTask({ tasks: task.TasksManager, taskId: task.taskId });
    for (let i = 0; i < rejectedApplications.length; i++) {
      expect(taskInfo.applications[rejectedApplications[i]].accepted).to.be.false;
    }
  });

  it("should not have changed the task", async function () {
    const task = await loadFixture(createApplicationsTaskFixture);
    const taskInfoBefore = await getTask({ tasks: task.TasksExecutor, taskId: task.taskId });
    const acceptedApplications = task.applicants.map((_, i) => i).filter((_, i) => i % 2 == 0);
    await acceptApplications({
      tasks: task.TasksManager,
      taskId: task.taskId,
      applications: acceptedApplications.map(BigInt),
    });
    const taskInfo = await getTask({ tasks: task.TasksExecutor, taskId: task.taskId });
    expect(taskInfo.metadata).to.be.deep.equal(taskInfoBefore.metadata);
    expect(ToBlockchainDate(taskInfo.deadline)).to.be.equal(ToBlockchainDate(taskInfoBefore.deadline));
    expect(taskInfo.budget).to.be.deep.equal(taskInfoBefore.budget);
    expect(taskInfo.escrow).to.be.equal(taskInfoBefore.escrow);
    expect(taskInfo.manager).to.be.equal(taskInfoBefore.manager);
  });

  it("should not have changed applications", async function () {
    const task = await loadFixture(createApplicationsTaskFixture);
    const taskInfoBefore = await getTask({ tasks: task.TasksManager, taskId: task.taskId });
    const acceptedApplications = task.applicants.map((_, i) => i).filter((_, i) => i % 2 == 0);
    await acceptApplications({
      tasks: task.TasksManager,
      taskId: task.taskId,
      applications: acceptedApplications.map(BigInt),
    });
    const taskInfo = await getTask({ tasks: task.TasksManager, taskId: task.taskId });
    expect(taskInfo.applications.length).to.be.equal(taskInfoBefore.applications.length);
    for (let i = 0; i < taskInfo.applications.length; i++) {
      expect(taskInfo.applications[i].metadata).to.be.deep.equal(taskInfoBefore.applications[i].metadata);
      expect(taskInfo.applications[i].applicant).to.be.equal(taskInfoBefore.applications[i].applicant);
      expect(taskInfo.applications[i].reward).to.be.deep.equal(taskInfoBefore.applications[i].reward);
    }
  });

  it("should have no executor", async function () {
    const task = await loadFixture(createApplicationsTaskFixture);
    const acceptedApplications = task.applicants.map((_, i) => i).filter((_, i) => i % 2 == 0);
    await acceptApplications({
      tasks: task.TasksManager,
      taskId: task.taskId,
      applications: acceptedApplications.map(BigInt),
    });
    const taskInfo = await getTask({ tasks: task.TasksExecutor, taskId: task.taskId });
    expect(taskInfo.executorApplication).to.be.equal(0);
  });

  it("should have no submissions", async function () {
    const task = await loadFixture(createApplicationsTaskFixture);
    const acceptedApplications = task.applicants.map((_, i) => i).filter((_, i) => i % 2 == 0);
    await acceptApplications({
      tasks: task.TasksManager,
      taskId: task.taskId,
      applications: acceptedApplications.map(BigInt),
    });
    const taskInfo = await getTask({ tasks: task.TasksExecutor, taskId: task.taskId });
    expect(taskInfo.submissions).to.have.lengthOf(0);
  });

  //Check for exploits
  it("should not be allowed on a task id that does not exist", async function () {
    const task = await loadFixture(createApplicationsTaskFixture);
    const acceptedApplications = task.applicants.map((_, i) => i).filter((_, i) => i % 2 == 0);
    const tx = acceptApplications({
      tasks: task.TasksManager,
      taskId: task.taskId + BigInt(1),
      applications: acceptedApplications.map(BigInt),
    });
    await expect(tx).to.be.revertedWithCustomError(task.TasksManager, "TaskDoesNotExist");
  });

  it("should not be allowed on a application that does not exist", async function () {
    const task = await loadFixture(createApplicationsTaskFixture);
    const tx = acceptApplications({
      tasks: task.TasksManager,
      taskId: task.taskId,
      applications: [BigInt(task.applicants.length)],
    });
    await expect(tx).to.be.revertedWithCustomError(task.TasksManager, "ApplicationDoesNotExist");
  });

  it("should not be allowed on a taken task", async function () {
    const task = await loadFixture(createTakenTaskFixture);
    const tx = acceptApplications({
      tasks: task.TasksManager,
      taskId: task.taskId,
      applications: [BigInt(0)],
    });
    await expect(tx).to.be.revertedWithCustomError(task.TasksManager, "TaskNotOpen");
  });

  it("should not be allowed on a closed task", async function () {
    const task = await loadFixture(createTakenTaskWithAcceptedSubmissionFixture);
    const tx = acceptApplications({
      tasks: task.TasksManager,
      taskId: task.taskId,
      applications: [BigInt(0)],
    });
    await expect(tx).to.be.revertedWithCustomError(task.TasksManager, "TaskNotOpen");
  });

  it("should not be allowed by executor", async function () {
    const task = await loadFixture(createApplicationsTaskFixture);
    const acceptedApplications = task.applicants.map((_, i) => i).filter((_, i) => i % 2 == 0);
    const tx = acceptApplications({
      tasks: task.TasksExecutor,
      taskId: task.taskId,
      applications: acceptedApplications.map(BigInt),
    });
    await expect(tx).to.be.revertedWithCustomError(task.TasksExecutor, "NotManager");
  });

  it("should not be allowed by anyone else", async function () {
    const task = await loadFixture(createApplicationsTaskFixture);
    const acceptedApplications = task.applicants.map((_, i) => i).filter((_, i) => i % 2 == 0);
    const accounts = await getUnnamedAccounts();
    const tasks = task.TasksExecutor.connect(await ethers.getSigner(accounts[0]));
    const tx = acceptApplications({
      tasks: tasks,
      taskId: task.taskId,
      applications: acceptedApplications.map(BigInt),
    });
    await expect(tx).to.be.revertedWithCustomError(tasks, "NotManager");
  });

  it("should increase if reward more than budget", async function () {
    const task = await loadFixture(createBudgetTaskFixture);
    const taskInfoBefore = await getTask({ tasks: task.TasksExecutor, taskId: task.taskId });
    const increase = Wei(1);
    let reward = task.budget.map((b) => {
      return { nextToken: true, to: task.executor, amount: b.amount };
    });
    reward[0].amount += increase;
    const nativeReward = [{ to: task.executor, amount: task.nativeBudget + increase }];
    const ERC20 = (await ethers.getContractAt("MockERC20", task.budget[0].tokenContract, await ethers.getSigner(task.manager))) as any as MockERC20;
    await ERC20.increaseBalance(task.manager, increase);
    await ERC20.approve(await task.TasksManager.getAddress(), increase);
    await applyForTask({
      tasks: task.TasksExecutor,
      taskId: task.taskId,
      reward: reward,
      nativeReward: nativeReward,
    });
    await acceptApplications({
      tasks: task.TasksManager,
      taskId: task.taskId,
      applications: [BigInt(0)],
      value: increase,
    });
    const taskInfo = await getTask({ tasks: task.TasksExecutor, taskId: task.taskId });
    expect(taskInfo.budget[0].amount).to.be.equal(taskInfoBefore.budget[0].amount + increase);
    expect(taskInfo.nativeBudget).to.be.equal(taskInfoBefore.nativeBudget + increase);
    expect(await ERC20.balanceOf(task.manager)).to.be.be.equal(BigInt(0));
  });

  it("should revert with not enough native currency attached", async function () {
    const task = await loadFixture(createBudgetTaskFixture);
    const increase = Wei(1);
    const nativeReward = [{ to: task.executor, amount: task.nativeBudget + increase }];
    await applyForTask({
      tasks: task.TasksExecutor,
      taskId: task.taskId,
      nativeReward: nativeReward,
    });
    const tx = acceptApplications({
      tasks: task.TasksManager,
      taskId: task.taskId,
      applications: [BigInt(0)],
      value: increase - Wei(1),
    });
    await expect(tx).to.be.revertedWithCustomError(task.TasksManager, "IncorrectAmountOfNativeCurrencyAttached");
  });
});
