import { expect } from "chai";
import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { createTaskFixture } from "./00_TestTasksFixtures";
import { getTask } from "../../utils/taskHelper";
import { ToBlockchainDate, days } from "../../utils/timeUnits";

describe("Extend Deadline", function () {
  it("should extend the deadline", async function () {
    const task = await loadFixture(createTaskFixture);
    const taskInfoBefore = await getTask({ tasks: task.TasksManager, taskId: task.taskId });
    const extension = 1 * days;
    await task.TasksManager.extendDeadline(task.taskId, extension);
    const taskInfo = await getTask({ tasks: task.TasksManager, taskId: task.taskId });
    expect(ToBlockchainDate(taskInfo.deadline)).to.be.equal(ToBlockchainDate(taskInfoBefore.deadline) + extension);
  });

  it("should not be allowed by not manager", async function () {
    const task = await loadFixture(createTaskFixture);
    const extension = 1 * days;
    const tx = task.TasksExecutor.extendDeadline(task.taskId, extension);
    await expect(tx).to.be.revertedWithCustomError(task.TasksExecutor, "NotManager");
  });
});
