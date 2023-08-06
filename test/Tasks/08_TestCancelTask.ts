import { expect } from "chai";
import { loadFixture, time } from "@nomicfoundation/hardhat-network-helpers";
import { acceptRequest, cancelTask, executeRequest, getTask } from "../../utils/taskHelper";
import { createBudgetTaskFixture, createTakenTaskFixture, createTakenTaskWithAcceptedSubmissionFixture, createTaskFixture } from "./00_TestTasksFixtures";
import { CancelTaskRequestMetadata, RequestType, TaskState } from "../../utils/taskTypes";
import { ToBlockchainDate } from "../../utils/timeUnits";

describe("Cancel task", function () {
  // Check if variables are set
  it("should have the correct metadata", async function () {
    const task = await loadFixture(createTakenTaskFixture);
    const metadata: CancelTaskRequestMetadata = {
      explanation: "Juse because",
    };
    await cancelTask({
      tasks: task.TasksManager,
      taskId: task.taskId,
      explanation: metadata,
    });
    const taskInfo = await getTask({ tasks: task.TasksExecutor, taskId: task.taskId });
    expect(taskInfo.cancelTaskRequests).to.be.lengthOf(1);
    expect(taskInfo.cancelTaskRequests[0].explanation).to.be.deep.equal(metadata);
    expect(taskInfo.cancelTaskRequests[0].request.accepted).to.be.false;
    expect(taskInfo.state).to.be.equal(TaskState.Taken);
    await acceptRequest({
      tasks: task.TasksExecutor,
      taskId: task.taskId,
      requestType: RequestType.CancelTask,
      requestId: BigInt(0),
    });
    const taskInfo2 = await getTask({ tasks: task.TasksExecutor, taskId: task.taskId });
    expect(taskInfo2.state).to.be.equal(TaskState.Closed);
    expect(taskInfo2.cancelTaskRequests[0].request.accepted).to.be.true;
  });

  it("should not need request on open task", async function () {
    const task = await loadFixture(createTaskFixture);
    await cancelTask({
      tasks: task.TasksManager,
      taskId: task.taskId,
    });
    const taskInfo = await getTask({ tasks: task.TasksExecutor, taskId: task.taskId });
    expect(taskInfo.state).to.be.equal(TaskState.Closed);
  });

  it("should not need request on taken task past deadline", async function () {
    const task = await loadFixture(createTakenTaskFixture);
    const taskInfoBefore = await getTask({ tasks: task.TasksExecutor, taskId: task.taskId });
    await time.increaseTo(ToBlockchainDate(taskInfoBefore.deadline));
    await cancelTask({
      tasks: task.TasksManager,
      taskId: task.taskId,
    });
    const taskInfo = await getTask({ tasks: task.TasksExecutor, taskId: task.taskId });
    expect(taskInfo.state).to.be.equal(TaskState.Closed);
  });

  it("budget", async function () {
    const task = await loadFixture(createBudgetTaskFixture);
    await cancelTask({
      tasks: task.TasksManager,
      taskId: task.taskId,
    });
    const taskInfo = await getTask({ tasks: task.TasksExecutor, taskId: task.taskId });
    expect(taskInfo.state).to.be.equal(TaskState.Closed);
  });

  it("should be able to execute later", async function () {
    const task = await loadFixture(createTakenTaskFixture);
    await cancelTask({
      tasks: task.TasksManager,
      taskId: task.taskId,
    });
    const taskInfo = await getTask({ tasks: task.TasksExecutor, taskId: task.taskId });
    expect(taskInfo.cancelTaskRequests).to.be.lengthOf(1);
    expect(taskInfo.cancelTaskRequests[0].request.executed).to.be.false;
    expect(taskInfo.state).to.be.equal(TaskState.Taken);
    await acceptRequest({
      tasks: task.TasksExecutor,
      taskId: task.taskId,
      requestType: RequestType.CancelTask,
      requestId: BigInt(0),
      execute: false,
    });
    const taskInfo2 = await getTask({ tasks: task.TasksExecutor, taskId: task.taskId });
    expect(taskInfo2.cancelTaskRequests[0].request.executed).to.be.false;
    expect(taskInfo2.state).to.be.equal(TaskState.Taken);
    await executeRequest({
      tasks: task.TasksExecutor,
      taskId: task.taskId,
      requestType: RequestType.CancelTask,
      requestId: BigInt(0),
    });
    const taskInfo3 = await getTask({ tasks: task.TasksExecutor, taskId: task.taskId });
    expect(taskInfo3.cancelTaskRequests[0].request.executed).to.be.true;
    expect(taskInfo3.state).to.be.equal(TaskState.Closed);
  });

  it("should not be able to acceot non-existant request", async function () {
    const task = await loadFixture(createTakenTaskFixture);
    await cancelTask({
      tasks: task.TasksManager,
      taskId: task.taskId,
    });
    const tx = acceptRequest({
      tasks: task.TasksExecutor,
      taskId: task.taskId,
      requestType: RequestType.CancelTask,
      requestId: BigInt(1),
      execute: false,
    });
    await expect(tx).to.be.revertedWithCustomError(task.TasksExecutor, "RequestDoesNotExist");
  });

  it("should not be able to acceot request twice", async function () {
    const task = await loadFixture(createTakenTaskFixture);
    await cancelTask({
      tasks: task.TasksManager,
      taskId: task.taskId,
    });
    await acceptRequest({
      tasks: task.TasksExecutor,
      taskId: task.taskId,
      requestType: RequestType.CancelTask,
      requestId: BigInt(0),
      execute: false,
    });
    const tx = acceptRequest({
      tasks: task.TasksExecutor,
      taskId: task.taskId,
      requestType: RequestType.CancelTask,
      requestId: BigInt(0),
      execute: false,
    });
    await expect(tx).to.be.revertedWithCustomError(task.TasksExecutor, "RequestAlreadyAccepted");
  });

  it("should not be able to execute not accepted request", async function () {
    const task = await loadFixture(createTakenTaskFixture);
    await cancelTask({
      tasks: task.TasksManager,
      taskId: task.taskId,
    });
    const tx = executeRequest({
      tasks: task.TasksExecutor,
      taskId: task.taskId,
      requestType: RequestType.CancelTask,
      requestId: BigInt(0),
    });
    await expect(tx).to.be.revertedWithCustomError(task.TasksExecutor, "RequestNotAccepted");
  });

  it("should not be able to execute request twice", async function () {
    const task = await loadFixture(createTakenTaskFixture);
    await cancelTask({
      tasks: task.TasksManager,
      taskId: task.taskId,
    });
    await acceptRequest({
      tasks: task.TasksExecutor,
      taskId: task.taskId,
      requestType: RequestType.CancelTask,
      requestId: BigInt(0),
      execute: false,
    });
    await executeRequest({
      tasks: task.TasksExecutor,
      taskId: task.taskId,
      requestType: RequestType.CancelTask,
      requestId: BigInt(0),
    });
    const tx = executeRequest({
      tasks: task.TasksExecutor,
      taskId: task.taskId,
      requestType: RequestType.CancelTask,
      requestId: BigInt(0),
    });
    // await expect(tx).to.be.revertedWithCustomError(task.TasksExecutor, "RequestAlreadyExecuted");
    await expect(tx).to.be.revertedWithCustomError(task.TasksExecutor, "TaskNotTaken");
  });

  it("should revert on closed task", async function () {
    const task = await loadFixture(createTakenTaskWithAcceptedSubmissionFixture);
    const tx = cancelTask({
      tasks: task.TasksManager,
      taskId: task.taskId,
    });
    await expect(tx).to.be.revertedWithCustomError(task.TasksExecutor, "TaskClosed");
  });
});
