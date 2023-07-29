import { expect } from "chai";
import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { createBudgetTaskFixture, createTakenTaskFixture, createTakenTaskWithSubmissionFixture, createTaskFixture, createTaskWithAcceptedApplicationFixture, createTaskWithApplicationFixture } from "./00_TestTasksFixtures";
import { acceptApplications, applyForTask, cancelTask, createSubmission, createTaskTransaction, reviewSubmission, takeTask } from "../../utils/taskHelper";
import { ethers, getNamedAccounts } from "hardhat";
import { ERC20, Tasks } from "../../typechain-types";
import { TestSetup } from "../Helpers/TestSetup";
import { SubmissionJudgement } from "../../utils/taskTypes";

async function Disable() {
  const { deployer } = await getNamedAccounts();
  const TasksDeployer = await ethers.getContract("Tasks", deployer) as Tasks;
  await TasksDeployer.disable();
}

describe("Disable", function () {
  it("should not be possible to disable by others", async function () {
    const task = await loadFixture(createTaskFixture);
    const tx = task.TasksManager.disable();
    await expect(tx).to.be.revertedWithCustomError(task.TasksManager, "NotDisabler");
  });
  
  it("should not be possible to refuned when not disabled", async function () {
    const task = await loadFixture(createTaskFixture);
    const tx = task.TasksManager.refund(task.taskId);
    await expect(tx).to.be.revertedWithCustomError(task.TasksManager, "NotDisabled");
  });
  
  it("should refund when disabled", async function () {
    const task = await loadFixture(createBudgetTaskFixture);
    await Disable();
    await task.TasksManager.refund(task.taskId);
    for (let i = 0; i < task.budget.length; i++) {
      const ERC20 = await ethers.getContractAt("ERC20", task.budget[i].tokenContract) as any as ERC20;
      expect(await ERC20.balanceOf(task.manager)).to.be.equal(task.budget[i].amount);
    }
  });
  
  it("should not be possible to create a task", async function () {
    await loadFixture(TestSetup);
    await Disable();
    const { manager } = await getNamedAccounts();
    const TasksManager = await ethers.getContract("Tasks", manager) as Tasks;
    const tx = createTaskTransaction({
      tasks: TasksManager,
    });
    await expect(tx).to.be.revertedWithCustomError(TasksManager, "Disabled");
  });
  
  it("should not be possible to apply for a task", async function () {
    const task = await loadFixture(createTaskFixture);
    await Disable();
    const tx = applyForTask({
      tasks: task.TasksExecutor,
      taskId: task.taskId,
    });
    await expect(tx).to.be.revertedWithCustomError(task.TasksExecutor, "Disabled");
  });
  
  it("should not be possible to accept applications", async function () {
    const task = await loadFixture(createTaskWithApplicationFixture);
    await Disable();
    const tx = acceptApplications({
      tasks: task.TasksManager,
      taskId: task.taskId,
      applications: [BigInt(0)],
    });
    await expect(tx).to.be.revertedWithCustomError(task.TasksManager, "Disabled");
  });
  
  it("should not be possible to take a task", async function () {
    const task = await loadFixture(createTaskWithAcceptedApplicationFixture);
    await Disable();
    const tx = takeTask({
      tasks: task.TasksExecutor,
      taskId: task.taskId,
      application: BigInt(0),
    });
    await expect(tx).to.be.revertedWithCustomError(task.TasksExecutor, "Disabled");
  });
  
  it("should not be possible to create a submission", async function () {
    const task = await loadFixture(createTakenTaskFixture);
    await Disable();
    const tx = createSubmission({
      tasks: task.TasksExecutor,
      taskId: task.taskId,
    });
    await expect(tx).to.be.revertedWithCustomError(task.TasksExecutor, "Disabled");
  });
  
  it("should not be possible to review a submission", async function () {
    const task = await loadFixture(createTakenTaskWithSubmissionFixture);
    await Disable();
    const tx = reviewSubmission({
      tasks: task.TasksManager,
      taskId: task.taskId,
      submissionId: BigInt(0),
      judgement: SubmissionJudgement.Accepted,
    });
    await expect(tx).to.be.revertedWithCustomError(task.TasksManager, "Disabled");
  });

  it("should not be possible to cancel a task", async function () {
    const task = await loadFixture(createTaskFixture);
    await Disable();
    const tx = cancelTask({
      tasks: task.TasksManager,
      taskId: task.taskId,
    });
    await expect(tx).to.be.revertedWithCustomError(task.TasksManager, "Disabled");
  });

  it("should not be possible to extend the deadline of a task", async function () {
    const task = await loadFixture(createTaskFixture);
    await Disable();
    const tx = task.TasksManager.extendDeadline(task.taskId, BigInt(1));
    await expect(tx).to.be.revertedWithCustomError(task.TasksManager, "Disabled");
  });
  
  it("should not be possible to increase the budget of a task", async function () {
    const task = await loadFixture(createTaskFixture);
    await Disable();
    const tx = task.TasksManager.increaseBudget(task.taskId, []);
    await expect(tx).to.be.revertedWithCustomError(task.TasksManager, "Disabled");
  });
  
  it("should not be possible to edit the metadata of a task", async function () {
    const task = await loadFixture(createTaskFixture);
    await Disable();
    const tx = task.TasksManager.editMetadata(task.taskId, "");
    await expect(tx).to.be.revertedWithCustomError(task.TasksManager, "Disabled");
  });
});
