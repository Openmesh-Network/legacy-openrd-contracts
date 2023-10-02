import { expect } from "chai";
import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { ethers, getUnnamedAccounts } from "hardhat";
import { getTask } from "../../utils/taskHelper";
import { createTakenTaskFixture, createTakenTaskWithAcceptedSubmissionFixture, createTaskFixture } from "./00_TestTasksFixtures";

describe("Transfer Management", function () {
  it("should have updated the management", async function () {
    const task = await loadFixture(createTaskFixture);
    const accounts = await getUnnamedAccounts();
    await task.TasksManager.transferManagement(task.taskId, accounts[0]);
    const taskInfo = await getTask({ tasks: task.TasksManager, taskId: task.taskId });
    expect(taskInfo.manager).to.be.equal(accounts[0]);
  });

  it("should have updated the management on taken task", async function () {
    const task = await loadFixture(createTakenTaskFixture);
    const accounts = await getUnnamedAccounts();
    await task.TasksManager.transferManagement(task.taskId, accounts[0]);
    const taskInfo = await getTask({ tasks: task.TasksManager, taskId: task.taskId });
    expect(taskInfo.manager).to.be.equal(accounts[0]);
  });

  //Check for exploits
  it("should not be allowed by non manager", async function () {
    const task = await loadFixture(createTaskFixture);
    const accounts = await getUnnamedAccounts();
    const tx = task.TasksManager.connect(await ethers.getSigner(accounts[0])).transferManagement(task.taskId, accounts[0]);
    await expect(tx).to.be.revertedWithCustomError(task.TasksManager, "NotManager");
  });

  it("should not be allowed on closed tasks", async function () {
    const task = await loadFixture(createTakenTaskWithAcceptedSubmissionFixture);
    const accounts = await getUnnamedAccounts();
    const tx = task.TasksManager.transferManagement(task.taskId, accounts[0]);
    await expect(tx).to.be.revertedWithCustomError(task.TasksManager, "TaskClosed");
  });
});
