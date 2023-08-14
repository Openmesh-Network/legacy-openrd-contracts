import { expect } from "chai";
import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { ethers, getUnnamedAccounts } from "hardhat";
import { reviewSubmission, getTask } from "../../utils/taskHelper";
import {
  createBudgetTaskWithExecutorAndSubmissionFixture,
  createBudgetTaskWithExecutorAndSubmissionFullRewardFixture,
  createBudgetTaskWithExecutorAndSubmissionIncompleteRewardFixture,
  createTakenTaskWithAcceptedSubmissionFixture,
  createTakenTaskWithSubmissionFixture,
  createTaskFixture,
} from "./00_TestTasksFixtures";
import { SubmissionJudgement, TaskState } from "../../utils/taskTypes";
import { asDAO } from "../Helpers/ImpersonatedDAO";
import { Tasks } from "../../typechain-types";

describe("Disputes", function () {
  it("should have transfered the reward after accept", async function () {
    const task = await loadFixture(createBudgetTaskWithExecutorAndSubmissionFixture);
    const TasksDipsuteDAO = await asDAO<Tasks>(task.TasksManager, "dispute");
    await TasksDipsuteDAO.completeByDispute(task.taskId);
    for (let i = 0; i < task.budget.length; i++) {
      const ERC20 = await ethers.getContractAt("ERC20", task.budget[i].tokenContract);
      expect(await ERC20.balanceOf(task.executor)).to.be.equal(task.reward[i].amount);
    }
  });

  it("should have refunded left over budget after accept", async function () {
    const task = await loadFixture(createBudgetTaskWithExecutorAndSubmissionFixture);
    const TasksDipsuteDAO = await asDAO<Tasks>(task.TasksManager, "dispute");
    await TasksDipsuteDAO.completeByDispute(task.taskId);
    for (let i = 0; i < task.budget.length; i++) {
      const ERC20 = await ethers.getContractAt("ERC20", task.budget[i].tokenContract);
      expect(await ERC20.balanceOf(task.manager)).to.be.equal(task.budget[i].amount - task.reward[i].amount);
    }
  });

  it("should have refunded left over budget after accept, when not all tokens are used as reward", async function () {
    const task = await loadFixture(createBudgetTaskWithExecutorAndSubmissionIncompleteRewardFixture);
    const TasksDipsuteDAO = await asDAO<Tasks>(task.TasksManager, "dispute");
    await TasksDipsuteDAO.completeByDispute(task.taskId);
    for (let i = 0; i < task.budget.length; i++) {
      const ERC20 = await ethers.getContractAt("ERC20", task.budget[i].tokenContract);
      const sub = i >= task.reward.length ? BigInt(0) : task.reward[i].amount;
      expect(await ERC20.balanceOf(task.manager)).to.be.equal(task.budget[i].amount - sub);
    }
  });

  it("should not refund anything if reward equals budget after accept", async function () {
    const task = await loadFixture(createBudgetTaskWithExecutorAndSubmissionFullRewardFixture);
    const TasksDipsuteDAO = await asDAO<Tasks>(task.TasksManager, "dispute");
    await TasksDipsuteDAO.completeByDispute(task.taskId);
    for (let i = 0; i < task.budget.length; i++) {
      const ERC20 = await ethers.getContractAt("ERC20", task.budget[i].tokenContract);
      expect(await ERC20.balanceOf(task.executor)).to.be.equal(task.budget[i].amount);
      expect(await ERC20.balanceOf(task.manager)).to.be.equal(BigInt(0));
    }
  });

  it("should be in closed state after", async function () {
    const task = await loadFixture(createTakenTaskWithSubmissionFixture);
    const TasksDipsuteDAO = await asDAO<Tasks>(task.TasksManager, "dispute");
    await TasksDipsuteDAO.completeByDispute(task.taskId);
    const taskInfo = await getTask({ tasks: TasksDipsuteDAO, taskId: task.taskId });
    expect(taskInfo.state).to.be.equal(TaskState.Closed);
  });

  //Check for exploits
  it("should not be allowed on a task id that does not exist", async function () {
    const task = await loadFixture(createTakenTaskWithSubmissionFixture);
    const TasksDipsuteDAO = await asDAO<Tasks>(task.TasksManager, "dispute");
    const tx = TasksDipsuteDAO.completeByDispute(task.taskId + BigInt(1));
    await expect(tx).to.be.revertedWithCustomError(task.TasksManager, "TaskDoesNotExist");
  });

  it("should not be allowed on an open task", async function () {
    const task = await loadFixture(createTaskFixture);
    const TasksDipsuteDAO = await asDAO<Tasks>(task.TasksManager, "dispute");
    const tx = TasksDipsuteDAO.completeByDispute(task.taskId);
    await expect(tx).to.be.revertedWithCustomError(task.TasksManager, "TaskNotTaken");
  });

  it("should not be allowed on a closed task", async function () {
    const task = await loadFixture(createTakenTaskWithAcceptedSubmissionFixture);
    const TasksDipsuteDAO = await asDAO<Tasks>(task.TasksManager, "dispute");
    const tx = TasksDipsuteDAO.completeByDispute(task.taskId);
    await expect(tx).to.be.revertedWithCustomError(task.TasksManager, "TaskNotTaken");
  });

  it("should revert if executor tries to review", async function () {
    const task = await loadFixture(createTakenTaskWithSubmissionFixture);
    const tx = task.TasksExecutor.completeByDispute(task.taskId);
    await expect(tx).to.be.revertedWithCustomError(task.TasksExecutor, "NotDisputeManager");
  });

  it("should revert if anyone else tries to review", async function () {
    const task = await loadFixture(createTakenTaskWithSubmissionFixture);
    const accounts = await getUnnamedAccounts();
    const tasks = task.TasksExecutor.connect(await ethers.getSigner(accounts[0]));
    const tx = tasks.completeByDispute(task.taskId);
    await expect(tx).to.be.revertedWithCustomError(tasks, "NotDisputeManager");
  });
});
