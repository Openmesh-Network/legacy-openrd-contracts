import { expect } from "chai";
import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { getTask } from "../../utils/taskHelper";
import { createTaskFixture } from "./00_TestTasksFixtures";

describe("Get Task", function () {
  // Most functionality is already tested in CreateTask
  it("should not be allowed on a task id that does not exist", async function () {
    const task = await loadFixture(createTaskFixture);
    const tx = getTask({
      tasks: task.TasksManager,
      taskId: task.taskId + BigInt(1),
    });
    await expect(tx).to.be.revertedWithCustomError(task.TasksManager, "TaskDoesNotExist");
  });
});
