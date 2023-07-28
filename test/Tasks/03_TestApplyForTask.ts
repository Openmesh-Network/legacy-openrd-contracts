import { expect } from "chai";
import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { applyForTask, getTask } from "../../utils/taskHelper";
import { ToBlockchainDate } from "../../utils/timeUnits";
import { createBudgetTaskFixture, createTakenTaskFixture, createTakenTaskWithAcceptedSubmissionFixture, createTaskFixture } from "./00_TestTasksFixtures";
import { TaskState } from "../../utils/taskTypes";

describe("Apply For Task", function () {
  // Check if variables are set
  it("should have the correct metadata", async function () {
    const task = await loadFixture(createTaskFixture);
    const metadata = {
      title: "title",
      description: "description",
      resources: [{
          name: "Google",
          url: "https://www.google.com" //Normal website
      }, {
          name: "IPFS item",
          url: "ipfs://bafybeih6dsywniag6kub6ceeywcl2shxlzj5xtxndb5tsg3jvupy65654a" //ipfs.tech website
      }],
  };
    await applyForTask({
      tasks: task.TasksExecutor,
      taskId: task.taskId,
      metadata: metadata,
    });
    const taskInfo = await getTask({ tasks: task.TasksExecutor, taskId: task.taskId });
    expect(taskInfo.applications).to.be.lengthOf(1);
    expect(taskInfo.applications[0].metadata).to.be.deep.equal(metadata);
  });

  it("should have the correct applicant", async function () {
    const task = await loadFixture(createTaskFixture);
    await applyForTask({
      tasks: task.TasksExecutor,
      taskId: task.taskId,
    });
    const taskInfo = await getTask({ tasks: task.TasksExecutor, taskId: task.taskId });
    expect(taskInfo.applications).to.be.lengthOf(1);
    expect(taskInfo.applications[0].applicant).to.be.equal(task.executor);
  });
  
  it("should be not accepted", async function () {
    const task = await loadFixture(createTaskFixture);
    await applyForTask({
      tasks: task.TasksExecutor,
      taskId: task.taskId,
    });
    const taskInfo = await getTask({ tasks: task.TasksExecutor, taskId: task.taskId });
    expect(taskInfo.applications).to.be.lengthOf(1);
    expect(taskInfo.applications[0].accepted).to.be.false;
  });

  it("should have the correct reward", async function () {
    const task = await loadFixture(createBudgetTaskFixture);
    const reward = task.budget.map(b => { return { nextToken: true, to: task.executor, amount: b.amount }; });
    await applyForTask({
      tasks: task.TasksExecutor,
      taskId: task.taskId,
      reward: reward,
    });
    const taskInfo = await getTask({ tasks: task.TasksExecutor, taskId: task.taskId });
    expect(taskInfo.applications).to.be.lengthOf(1);
    for (let i = 0; i < reward.length; i++) {
      expect(taskInfo.applications[0].reward[i].nextToken).to.be.equal(reward[i].nextToken);
      expect(taskInfo.applications[0].reward[i].to).to.be.equal(reward[i].to);
      expect(taskInfo.applications[0].reward[i].amount).to.be.equal(reward[i].amount);
    }
  });

  it("should be in open state", async function () {
    const task = await loadFixture(createBudgetTaskFixture);
    await applyForTask({
      tasks: task.TasksExecutor,
      taskId: task.taskId,
    });
    const taskInfo = await getTask({ tasks: task.TasksExecutor, taskId: task.taskId });
    expect(taskInfo.state).to.be.equal(TaskState.Open);
  });

  //Check if variables are unset
  it("should not have changed the task", async function () {
    const task = await loadFixture(createTaskFixture);
    const taskInfoBefore = await getTask({ tasks: task.TasksExecutor, taskId: task.taskId });
    await applyForTask({
      tasks: task.TasksExecutor,
      taskId: task.taskId,
    });
    const taskInfo = await getTask({ tasks: task.TasksExecutor, taskId: task.taskId });
    expect(taskInfo.metadata).to.be.deep.equal(taskInfoBefore.metadata);
    expect(ToBlockchainDate(taskInfo.deadline)).to.be.equal(ToBlockchainDate(taskInfoBefore.deadline));
    expect(taskInfo.budget).to.be.deep.equal(taskInfoBefore.budget);
    expect(taskInfo.escrow).to.be.equal(taskInfoBefore.escrow);
    expect(taskInfo.manager).to.be.equal(taskInfoBefore.manager);
  });

  it("should have no executor", async function () {
    const task = await loadFixture(createTaskFixture);
    await applyForTask({
      tasks: task.TasksExecutor,
      taskId: task.taskId,
    });
    const taskInfo = await getTask({ tasks: task.TasksExecutor, taskId: task.taskId });
    expect(taskInfo.executorApplication).to.be.equal(0);
  });

  it("should have no submissions", async function () {
    const task = await loadFixture(createTaskFixture);
    await applyForTask({
      tasks: task.TasksExecutor,
      taskId: task.taskId,
    });
    const taskInfo = await getTask({ tasks: task.TasksExecutor, taskId: task.taskId });
    expect(taskInfo.submissions).to.have.lengthOf(0);
  });
  
  //Check for exploits
  it("should not be allowed on a task id that does not exist", async function () {
    const task = await loadFixture(createTaskFixture);
    const tx = applyForTask({
      tasks: task.TasksExecutor,
      taskId: task.taskId + BigInt(1),
    });
    await expect(tx).to.be.revertedWithCustomError(task.TasksExecutor, "TaskDoesNotExist");
  });

  it("should not be allowed on a taken task", async function () {
    const task = await loadFixture(createTakenTaskFixture);
    const tx = applyForTask({
      tasks: task.TasksExecutor,
      taskId: task.taskId,
    });
    await expect(tx).to.be.revertedWithCustomError(task.TasksExecutor, "TaskNotOpen");
  });

  it("should not be allowed on a closed task", async function () {
    const task = await loadFixture(createTakenTaskWithAcceptedSubmissionFixture);
    const tx = applyForTask({
      tasks: task.TasksExecutor,
      taskId: task.taskId,
    });
    await expect(tx).to.be.revertedWithCustomError(task.TasksExecutor, "TaskNotOpen");
  });
});
