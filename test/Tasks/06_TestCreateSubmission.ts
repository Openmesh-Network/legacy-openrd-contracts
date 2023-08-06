import { expect } from "chai";
import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { ethers, getUnnamedAccounts } from "hardhat";
import { createSubmission, getTask } from "../../utils/taskHelper";
import { ToBlockchainDate } from "../../utils/timeUnits";
import { createTakenTaskFixture, createTakenTaskWithAcceptedSubmissionFixture, createTaskFixture } from "./00_TestTasksFixtures";
import { SubmissionMetadata, TaskState } from "../../utils/taskTypes";

describe("Create Submission", function () {
  // Check if variables are set
  it("should have the correct metadata", async function () {
    const task = await loadFixture(createTakenTaskFixture);
    const metadata: SubmissionMetadata = {
      fileName: "submission.zip",
      fileFormat: "application/zip",
      fileContent:
        "01000001011011010110000101111010011010010110111001100111001000000111001101101111011101010111001001100011011001010010000001100011011011110110010001100101",
    };
    await createSubmission({
      tasks: task.TasksExecutor,
      taskId: task.taskId,
      metadata: metadata,
    });
    const taskInfo = await getTask({ tasks: task.TasksExecutor, taskId: task.taskId });
    expect(taskInfo.submissions).to.be.lengthOf(1);
    expect(taskInfo.submissions[0].metadata).to.be.deep.equal(metadata);
  });

  it("should have be in taken state", async function () {
    const task = await loadFixture(createTakenTaskFixture);
    await createSubmission({
      tasks: task.TasksExecutor,
      taskId: task.taskId,
    });
    const taskInfo = await getTask({ tasks: task.TasksExecutor, taskId: task.taskId });
    expect(taskInfo.state).to.be.equal(TaskState.Taken);
  });

  //Check if variables are unset
  it("should not have changed the task", async function () {
    const task = await loadFixture(createTakenTaskFixture);
    const taskInfoBefore = await getTask({ tasks: task.TasksExecutor, taskId: task.taskId });
    await createSubmission({
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

  it("should not have changed applications", async function () {
    const task = await loadFixture(createTakenTaskFixture);
    const taskInfoBefore = await getTask({ tasks: task.TasksExecutor, taskId: task.taskId });
    await createSubmission({
      tasks: task.TasksExecutor,
      taskId: task.taskId,
    });
    const taskInfo = await getTask({ tasks: task.TasksExecutor, taskId: task.taskId });
    expect(taskInfo.applications.length).to.be.equal(taskInfoBefore.applications.length);
    for (let i = 0; i < taskInfo.applications.length; i++) {
      expect(taskInfo.applications[i].metadata).to.be.deep.equal(taskInfoBefore.applications[i].metadata);
      expect(taskInfo.applications[i].applicant).to.be.equal(taskInfoBefore.applications[i].applicant);
      expect(taskInfo.applications[i].reward).to.be.deep.equal(taskInfoBefore.applications[i].reward);
    }
  });

  it("should not have changed accepted applications", async function () {
    const task = await loadFixture(createTakenTaskFixture);
    const taskInfoBefore = await getTask({ tasks: task.TasksExecutor, taskId: task.taskId });
    await createSubmission({
      tasks: task.TasksExecutor,
      taskId: task.taskId,
    });
    const taskInfo = await getTask({ tasks: task.TasksExecutor, taskId: task.taskId });
    for (let i = 0; i < taskInfo.applications.length; i++) {
      expect(taskInfo.applications[i].accepted).to.be.equal(taskInfoBefore.applications[i].accepted);
    }
  });

  //Check for exploits
  it("should not be allowed on a task id that does not exist", async function () {
    const task = await loadFixture(createTakenTaskFixture);
    const tx = createSubmission({
      tasks: task.TasksExecutor,
      taskId: task.taskId + BigInt(1),
    });
    await expect(tx).to.be.revertedWithCustomError(task.TasksExecutor, "TaskDoesNotExist");
  });

  it("should not be allowed on an open task", async function () {
    const task = await loadFixture(createTaskFixture);
    const tx = createSubmission({
      tasks: task.TasksExecutor,
      taskId: task.taskId,
    });
    await expect(tx).to.be.revertedWithCustomError(task.TasksExecutor, "TaskNotTaken");
  });

  it("should not be allowed on a closed task", async function () {
    const task = await loadFixture(createTakenTaskWithAcceptedSubmissionFixture);
    const tx = createSubmission({
      tasks: task.TasksExecutor,
      taskId: task.taskId,
    });
    await expect(tx).to.be.revertedWithCustomError(task.TasksExecutor, "TaskNotTaken");
  });

  it("should not be allowed by manager", async function () {
    const task = await loadFixture(createTakenTaskFixture);
    const tx = createSubmission({
      tasks: task.TasksManager,
      taskId: task.taskId,
    });
    await expect(tx).to.be.revertedWithCustomError(task.TasksManager, "NotExecutor");
  });

  it("should not be allowed by anyone else", async function () {
    const task = await loadFixture(createTakenTaskFixture);
    const accounts = await getUnnamedAccounts();
    const tasks = task.TasksExecutor.connect(await ethers.getSigner(accounts[0]));
    const tx = createSubmission({
      tasks: tasks,
      taskId: task.taskId,
    });
    await expect(tx).to.be.revertedWithCustomError(tasks, "NotExecutor");
  });
});
