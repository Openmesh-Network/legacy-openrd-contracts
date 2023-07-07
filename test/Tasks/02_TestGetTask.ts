import { expect } from "chai";
import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { ethers } from "hardhat";
import { applyForTask, getTask } from "../../utils/taskHelper";
import { ToBlockchainDate } from "../../utils/timeUnits";
import { createBudgetTaskFixture, createTakenTaskFixture, createTakenTaskWithAcceptedSubmissionFixture, createTaskFixture } from "./00_TestTasksFixtures";
import { TaskState } from "../../utils/taskTypes";

describe("Get Task", function () {
  it("should not be allowed on a task id that does not exist", async function () {
    const task = await loadFixture(createTaskFixture);
    const tx = getTask({
      tasks: task.TasksProposer,
      taskId: task.taskId + BigInt(1),
    });
    await expect(tx).to.be.revertedWithCustomError(task.TasksProposer, "TaskDoesNotExist");
  });
});
