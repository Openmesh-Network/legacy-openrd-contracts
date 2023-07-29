import { expect } from "chai";
import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { createTakenTaskFixture, createTaskFixture } from "./00_TestTasksFixtures";
import { getTask } from "../../utils/taskHelper";
import { TaskMetadata } from "../../utils/taskTypes";
import { addToIpfs } from "../../utils/ipfsHelper";

describe("Edit Metadata", function () {
  it("should edit the metadata", async function () {
    const task = await loadFixture(createTaskFixture);
    const metadata : TaskMetadata = {
      title: "NewMetadata",
      description: "NewDescription",
      resources: [{
        name: "New first resource",
        url: "first.resource",
      }],
    };
    await task.TasksManager.editMetadata(task.taskId, await addToIpfs(JSON.stringify(metadata)));
    const taskInfo = await getTask({ tasks: task.TasksManager, taskId: task.taskId });
    expect(taskInfo.metadata).to.be.deep.equal(metadata);
  });

  it("not be allowed on not open task", async function () {
    const task = await loadFixture(createTakenTaskFixture);
    const metadata : TaskMetadata = {
      title: "NewMetadata",
      description: "NewDescription",
      resources: [{
        name: "New first resource",
        url: "first.resource",
      }],
    };
    const tx = task.TasksManager.editMetadata(task.taskId, await addToIpfs(JSON.stringify(metadata)));
    await expect(tx).to.be.revertedWithCustomError(task.TasksExecutor, "TaskNotOpen");
  });

  it("should not be allowed by not manager", async function () {
    const task = await loadFixture(createTaskFixture);
    const metadata : TaskMetadata = {
      title: "NewMetadata",
      description: "NewDescription",
      resources: [{
        name: "New first resource",
        url: "first.resource",
      }],
    };
    const tx = task.TasksExecutor.editMetadata(task.taskId, await addToIpfs(JSON.stringify(metadata)));
    await expect(tx).to.be.revertedWithCustomError(task.TasksExecutor, "NotManager");
  });
});
