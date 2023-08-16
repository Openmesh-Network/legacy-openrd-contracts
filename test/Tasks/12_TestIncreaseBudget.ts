import { expect } from "chai";
import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { createBudgetTaskFixture, createBudgetTaskWithExecutorAndSubmissionFixture } from "./00_TestTasksFixtures";
import { getTask } from "../../utils/taskHelper";
import { ethers } from "hardhat";
import { MockERC20 } from "../../typechain-types";
import { asyncMap } from "../../utils/utils";
import { Gwei } from "../../utils/ethersUnits";

describe("Increase Budget", function () {
  it("should increase the budget", async function () {
    const task = await loadFixture(createBudgetTaskFixture);
    const taskInfoBefore = await getTask({ tasks: task.TasksManager, taskId: task.taskId });
    const increase = task.budget.map((b) => b.amount * BigInt(5));
    const ERC20s = await asyncMap(
      task.budget,
      async (b) => (await ethers.getContractAt("MockERC20", b.tokenContract, await ethers.getSigner(task.manager))) as any as MockERC20
    );
    for (let i = 0; i < task.budget.length; i++) {
      await ERC20s[i].increaseBalance(task.manager, increase[i]);
      await ERC20s[i].approve(await task.TasksManager.getAddress(), increase[i]);
    }
    await task.TasksManager.increaseBudget(task.taskId, increase);
    const taskInfo = await getTask({ tasks: task.TasksManager, taskId: task.taskId });
    for (let i = 0; i < taskInfo.budget.length; i++) {
      expect(taskInfo.budget[i].amount).to.be.equal(taskInfoBefore.budget[i].amount + increase[i]);
    }
  });

  it("should increase the native budget", async function () {
    const task = await loadFixture(createBudgetTaskFixture);
    const taskInfoBefore = await getTask({ tasks: task.TasksManager, taskId: task.taskId });
    const increase = Gwei(250);
    await task.TasksManager.increaseBudget(task.taskId, [], { value: increase });
    const taskInfo = await getTask({ tasks: task.TasksManager, taskId: task.taskId });
    expect(taskInfo.nativeBudget).to.be.equal(taskInfoBefore.nativeBudget + increase);
  });

  it("should take the funds", async function () {
    const task = await loadFixture(createBudgetTaskFixture);
    const increase = task.budget.map((b) => b.amount * BigInt(5));
    const ERC20s = await asyncMap(
      task.budget,
      async (b) => (await ethers.getContractAt("MockERC20", b.tokenContract, await ethers.getSigner(task.manager))) as any as MockERC20
    );
    for (let i = 0; i < task.budget.length; i++) {
      await ERC20s[i].increaseBalance(task.manager, increase[i]);
      await ERC20s[i].approve(await task.TasksManager.getAddress(), increase[i]);
    }
    await task.TasksManager.increaseBudget(task.taskId, increase);
    for (let i = 0; i < ERC20s.length; i++) {
      expect(await ERC20s[i].balanceOf(task.manager)).to.be.equal(BigInt(0));
    }
  });

  it("should not change token contract", async function () {
    const task = await loadFixture(createBudgetTaskFixture);
    const taskInfoBefore = await getTask({ tasks: task.TasksManager, taskId: task.taskId });
    const increase = task.budget.map((b) => b.amount * BigInt(5));
    const ERC20s = await asyncMap(
      task.budget,
      async (b) => (await ethers.getContractAt("MockERC20", b.tokenContract, await ethers.getSigner(task.manager))) as any as MockERC20
    );
    for (let i = 0; i < task.budget.length; i++) {
      await ERC20s[i].increaseBalance(task.manager, increase[i]);
      await ERC20s[i].approve(await task.TasksManager.getAddress(), increase[i]);
    }
    await task.TasksManager.increaseBudget(task.taskId, increase);
    const taskInfo = await getTask({ tasks: task.TasksManager, taskId: task.taskId });
    for (let i = 0; i < taskInfo.budget.length; i++) {
      expect(taskInfo.budget[i].tokenContract).to.be.equal(taskInfoBefore.budget[i].tokenContract);
    }
  });

  it("not be allowed on not open task", async function () {
    const task = await loadFixture(createBudgetTaskWithExecutorAndSubmissionFixture);
    const increase = task.budget.map((b) => b.amount * BigInt(5));
    const ERC20s = await asyncMap(
      task.budget,
      async (b) => (await ethers.getContractAt("MockERC20", b.tokenContract, await ethers.getSigner(task.manager))) as any as MockERC20
    );
    for (let i = 0; i < task.budget.length; i++) {
      await ERC20s[i].increaseBalance(task.manager, increase[i]);
      await ERC20s[i].approve(await task.TasksManager.getAddress(), increase[i]);
    }
    const tx = task.TasksManager.increaseBudget(task.taskId, increase);
    await expect(tx).to.be.revertedWithCustomError(task.TasksManager, "TaskNotOpen");
  });

  it("not be allowed by not manager", async function () {
    const task = await loadFixture(createBudgetTaskFixture);
    const increase = task.budget.map((b) => b.amount * BigInt(5));
    const ERC20s = await asyncMap(
      task.budget,
      async (b) => (await ethers.getContractAt("MockERC20", b.tokenContract, await ethers.getSigner(task.executor))) as any as MockERC20
    );
    for (let i = 0; i < task.budget.length; i++) {
      await ERC20s[i].increaseBalance(task.executor, increase[i]);
      await ERC20s[i].approve(await task.TasksExecutor.getAddress(), increase[i]);
    }
    const tx = task.TasksExecutor.increaseBudget(task.taskId, increase);
    await expect(tx).to.be.revertedWithCustomError(task.TasksExecutor, "NotManager");
  });
});
