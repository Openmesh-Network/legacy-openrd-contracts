import { expect } from "chai";
import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { acceptRequest, cancelTask, executeRequest, getTask } from "../../utils/taskHelper";
import { createBudgetTaskFixture, createTakenTaskFixture, createTaskFixture } from "./00_TestTasksFixtures";
import { CancelTaskRequestMetadata, RequestType, TaskState } from "../../utils/taskTypes";

describe("Cancel task", function () {
  // Check if variables are set
  it("should have the correct metadata", async function () {
    const task = await loadFixture(createTakenTaskFixture);
    const metadata : CancelTaskRequestMetadata = {
        explanation: "Juse because",
    };
    await cancelTask({
        tasks: task.TasksProposer,
        taskId: task.taskId,
        explanation: metadata,
    });
    const taskInfo = await getTask({ tasks: task.TasksExecutor, taskId: task.taskId });
    expect(taskInfo.cancelTaskRequests).to.be.lengthOf(1);
    expect(taskInfo.cancelTaskRequests[0].explanation).to.be.deep.equal(metadata);
    expect(taskInfo.cancelTaskRequests[0].accepted).to.be.false;
    expect(taskInfo.state).to.be.equal(TaskState.Taken);
    await acceptRequest({
        tasks: task.TasksExecutor,
        taskId: task.taskId,
        requestType: RequestType.CancelTask,
        requestId: BigInt(0),
    });
    const taskInfo2 = await getTask({ tasks: task.TasksExecutor, taskId: task.taskId });
    expect(taskInfo2.state).to.be.equal(TaskState.Closed);
    expect(taskInfo2.cancelTaskRequests[0].accepted).to.be.true;
  });

  it("should not need request on open task", async function () {
    const task = await loadFixture(createTaskFixture);
    await cancelTask({
        tasks: task.TasksProposer,
        taskId: task.taskId,
    });
    const taskInfo = await getTask({ tasks: task.TasksExecutor, taskId: task.taskId });
    expect(taskInfo.state).to.be.equal(TaskState.Closed);
  });
  
  it("budget", async function () {
    const task = await loadFixture(createBudgetTaskFixture);
    await cancelTask({
        tasks: task.TasksProposer,
        taskId: task.taskId,
    });
    const taskInfo = await getTask({ tasks: task.TasksExecutor, taskId: task.taskId });
    expect(taskInfo.state).to.be.equal(TaskState.Closed);
  });

  it("should be able to execute later", async function () {
    const task = await loadFixture(createTakenTaskFixture);
    const metadata : CancelTaskRequestMetadata = {
        explanation: "Juse because",
    };
    await cancelTask({
        tasks: task.TasksProposer,
        taskId: task.taskId,
        explanation: metadata,
    });
    const taskInfo = await getTask({ tasks: task.TasksExecutor, taskId: task.taskId });
    expect(taskInfo.cancelTaskRequests).to.be.lengthOf(1);
    expect(taskInfo.cancelTaskRequests[0].executed).to.be.false;
    expect(taskInfo.state).to.be.equal(TaskState.Taken);
    await acceptRequest({
        tasks: task.TasksExecutor,
        taskId: task.taskId,
        requestType: RequestType.CancelTask,
        requestId: BigInt(0),
        execute: false,
    });
    const taskInfo2 = await getTask({ tasks: task.TasksExecutor, taskId: task.taskId });
    expect(taskInfo2.cancelTaskRequests[0].executed).to.be.false;
    expect(taskInfo2.state).to.be.equal(TaskState.Taken);
    await executeRequest({
      tasks: task.TasksExecutor,
      taskId: task.taskId,
      requestType: RequestType.CancelTask,
      requestId: BigInt(0),
    });
    const taskInfo3 = await getTask({ tasks: task.TasksExecutor, taskId: task.taskId });
    expect(taskInfo3.cancelTaskRequests[0].executed).to.be.true;
    expect(taskInfo3.state).to.be.equal(TaskState.Closed);
  });
});