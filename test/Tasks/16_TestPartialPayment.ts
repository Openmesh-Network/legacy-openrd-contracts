import { expect } from "chai";
import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { ethers, getUnnamedAccounts } from "hardhat";
import { getTask } from "../../utils/taskHelper";
import {
  createBudgetTaskWithExecutorAndSubmissionFixture,
  createTakenTaskWithAcceptedSubmissionFixture,
  createTakenTaskWithSubmissionFixture,
  createTaskFixture,
} from "./00_TestTasksFixtures";
import { TaskState } from "../../utils/taskTypes";

describe("Partial Payment", function () {
  it("should have transfered the partial reward from the escrow", async function () {
    const task = await loadFixture(createBudgetTaskWithExecutorAndSubmissionFixture);
    const partialPayment = task.reward.map((r) => r.amount / BigInt(2));
    const nativePartialPayment = task.nativeReward.map((r) => r.amount / BigInt(2));
    await task.TasksManager.partialPayment(task.taskId, partialPayment, nativePartialPayment);
    const taskInfo = await getTask({ tasks: task.TasksManager, taskId: task.taskId });
    let j = 0;
    let paid = BigInt(0);
    for (let i = 0; i < task.reward.length; i++) {
      const ERC20 = await ethers.getContractAt("ERC20", task.budget[j].tokenContract);
      expect(await ERC20.balanceOf(task.reward[i].to)).to.be.equal(partialPayment[i]);
      expect(taskInfo.applications[taskInfo.executorApplication].reward[i].amount).to.be.equal(task.reward[i].amount - partialPayment[i]);
      paid += partialPayment[i];
      if (task.reward[i].nextToken) {
        expect(await ERC20.balanceOf(taskInfo.escrow)).to.be.equal(task.budget[j].amount - paid);
        j++;
        paid = BigInt(0);
      }
    }
    let nativeLeft = task.nativeBudget;
    for (let i = 0; i < task.nativeReward.length; i++) {
      // Watch out for starting balance
      expect(await ethers.provider.getBalance(task.nativeReward[i].to)).to.be.equal(nativePartialPayment[i]);
      expect(taskInfo.applications[taskInfo.executorApplication].nativeReward[i].amount).to.be.equal(task.nativeReward[i].amount - nativePartialPayment[i]);
      nativeLeft -= nativePartialPayment[i];
    }
    expect(await ethers.provider.getBalance(taskInfo.escrow)).to.be.equal(nativeLeft);
  });

  it("should remain in taken state after", async function () {
    const task = await loadFixture(createTakenTaskWithSubmissionFixture);
    await task.TasksManager.partialPayment(task.taskId, [], []);
    const taskInfo = await getTask({ tasks: task.TasksManager, taskId: task.taskId });
    expect(taskInfo.state).to.be.equal(TaskState.Taken);
  });

  //Check for exploits
  it("should not be allowed on a task id that does not exist", async function () {
    const task = await loadFixture(createTakenTaskWithSubmissionFixture);
    const tx = task.TasksManager.partialPayment(task.taskId + BigInt(1), [], []);
    await expect(tx).to.be.revertedWithCustomError(task.TasksManager, "TaskDoesNotExist");
  });

  it("should not be allowed on an open task", async function () {
    const task = await loadFixture(createTaskFixture);
    const tx = task.TasksManager.partialPayment(task.taskId, [], []);
    await expect(tx).to.be.revertedWithCustomError(task.TasksManager, "TaskNotTaken");
  });

  it("should not be allowed on a closed task", async function () {
    const task = await loadFixture(createTakenTaskWithAcceptedSubmissionFixture);
    const tx = task.TasksManager.partialPayment(task.taskId, [], []);
    await expect(tx).to.be.revertedWithCustomError(task.TasksManager, "TaskNotTaken");
  });

  it("should revert if executor tries to review", async function () {
    const task = await loadFixture(createTakenTaskWithSubmissionFixture);
    const tx = task.TasksExecutor.partialPayment(task.taskId, [], []);
    await expect(tx).to.be.revertedWithCustomError(task.TasksExecutor, "NotManager");
  });

  it("should revert if anyone else tries to review", async function () {
    const task = await loadFixture(createTakenTaskWithSubmissionFixture);
    const accounts = await getUnnamedAccounts();
    const tasks = task.TasksExecutor.connect(await ethers.getSigner(accounts[0]));
    const tx = tasks.partialPayment(task.taskId, [], []);
    await expect(tx).to.be.revertedWithCustomError(tasks, "NotManager");
  });
});
