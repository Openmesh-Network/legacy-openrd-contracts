import { expect } from "chai";
import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { getTask, takeTask } from "../../utils/taskHelper";
import { ToBlockchainDate } from "../../utils/timeUnits";
import { createApprovedApplicationsTaskFixture, createPreapprovedBudgetTaskFixture, createTakenTaskFixture, createTakenTaskWithAcceptedSubmissionFixture } from "./00_TestTasksFixtures";
import { TaskState } from "../../utils/taskTypes";

describe("Take Task", function () {
  // Check if variables are set
  it("should have an executor", async function () {
    const task = await loadFixture(createApprovedApplicationsTaskFixture);
    const application = task.acceptedApplications[0];
    await takeTask({
      tasks: task.TasksExecutor.connect(task.applicants[Number(application)]),
      taskId: task.taskId,
      application: application,
    });
    const taskInfo = await getTask({ tasks: task.TasksExecutor, taskId: task.taskId });
    expect(taskInfo.executorApplication).to.be.equal(task.acceptedApplications[0]);
  });

  it("should allow any accepted applicant", async function () {
    for (let i = 0; true; i++) {
      const task = await loadFixture(createApprovedApplicationsTaskFixture);
      if (i >= task.acceptedApplications.length) {
        break;
      }
      const application = task.acceptedApplications[i];
      const tx = takeTask({
        tasks: task.TasksExecutor.connect(task.applicants[Number(application)]),
        taskId: task.taskId,
        application: application,
      });
      await expect(tx).to.not.be.reverted;
    }
  });

  it("should allow preapproved applicant", async function () {
      const task = await loadFixture(createPreapprovedBudgetTaskFixture);
      const application = BigInt(0);
      const tx = await takeTask({
        tasks: task.TasksExecutor,
        taskId: task.taskId,
        application: application,
      });
      await expect(tx).to.be.not.reverted;
  });

  it("should be in taken state", async function () {
    const task = await loadFixture(createApprovedApplicationsTaskFixture);
    const application = task.acceptedApplications[0];
    await takeTask({
      tasks: task.TasksExecutor.connect(task.applicants[Number(application)]),
      taskId: task.taskId,
      application: application,
    });
    const taskInfo = await getTask({ tasks: task.TasksExecutor, taskId: task.taskId });
    expect(taskInfo.state).to.be.equal(TaskState.Taken);
  });

  //Check if variables are unset
  it("should not have changed the task", async function () {
    const task = await loadFixture(createApprovedApplicationsTaskFixture);
    const taskInfoBefore = await getTask({ tasks: task.TasksExecutor, taskId: task.taskId });
    const application = task.acceptedApplications[0];
    await takeTask({
      tasks: task.TasksExecutor.connect(task.applicants[Number(application)]),
      taskId: task.taskId,
      application: application,
    });
    const taskInfo = await getTask({ tasks: task.TasksExecutor, taskId: task.taskId });
    expect(taskInfo.metadata).to.be.deep.equal(taskInfoBefore.metadata);
    expect(ToBlockchainDate(taskInfo.deadline)).to.be.equal(ToBlockchainDate(taskInfoBefore.deadline));
    expect(taskInfo.budget).to.be.deep.equal(taskInfoBefore.budget);
    expect(taskInfo.escrow).to.be.equal(taskInfoBefore.escrow);
    expect(taskInfo.manager).to.be.equal(taskInfoBefore.manager);
  });
  
  it("should not have changed applications", async function () {
    const task = await loadFixture(createApprovedApplicationsTaskFixture);
    const taskInfoBefore = await getTask({ tasks: task.TasksExecutor, taskId: task.taskId });
    const application = task.acceptedApplications[0];
    await takeTask({
      tasks: task.TasksExecutor.connect(task.applicants[Number(application)]),
      taskId: task.taskId,
      application: application,
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
    const task = await loadFixture(createApprovedApplicationsTaskFixture);
    const taskInfoBefore = await getTask({ tasks: task.TasksExecutor, taskId: task.taskId });
    const application = task.acceptedApplications[0];
    await takeTask({
      tasks: task.TasksExecutor.connect(task.applicants[Number(application)]),
      taskId: task.taskId,
      application: application,
    });
    const taskInfo = await getTask({ tasks: task.TasksExecutor, taskId: task.taskId });
    for (let i = 0; i < taskInfo.applications.length; i++) {
      expect(taskInfo.applications[i].accepted).to.be.equal(taskInfoBefore.applications[i].accepted);
    }
  });

  it("should have no submissions", async function () {
    const task = await loadFixture(createApprovedApplicationsTaskFixture);
    const application = task.acceptedApplications[0];
    await takeTask({
      tasks: task.TasksExecutor.connect(task.applicants[Number(application)]),
      taskId: task.taskId,
      application: application,
    });
    const taskInfo = await getTask({ tasks: task.TasksExecutor, taskId: task.taskId });
    expect(taskInfo.submissions).to.have.lengthOf(0);
  });
  
  //Check for exploits
  it("should not be allowed on a task id that does not exist", async function () {
    const task = await loadFixture(createApprovedApplicationsTaskFixture);
    const application = task.acceptedApplications[0];
    const tx = takeTask({
      tasks: task.TasksExecutor.connect(task.applicants[Number(application)]),
      taskId: task.taskId + BigInt(1),
      application: application,
    });
    await expect(tx).to.be.revertedWithCustomError(task.TasksExecutor, "TaskDoesNotExist");
  });

  it("should not be allowed on a taken task", async function () {
    const task = await loadFixture(createTakenTaskFixture);
    const tx = takeTask({
      tasks: task.TasksExecutor,
      taskId: task.taskId,
      application: BigInt(0),
    });
    await expect(tx).to.be.revertedWithCustomError(task.TasksExecutor, "TaskNotOpen");
  });

  it("should not be allowed on a closed task", async function () {
    const task = await loadFixture(createTakenTaskWithAcceptedSubmissionFixture);
    const tx = takeTask({
      tasks: task.TasksExecutor,
      taskId: task.taskId,
      application: BigInt(0),
    });
    await expect(tx).to.be.revertedWithCustomError(task.TasksExecutor, "TaskNotOpen");
  });
  
  it("should not allow non-accepted applicants", async function () {
    for (let i = BigInt(0); true; i++) {
      const task = await loadFixture(createApprovedApplicationsTaskFixture);
      if (i >= task.applicants.length) {
        break;
      }
      if (task.acceptedApplications.includes(i)) {
        continue;
      }
      const tx = takeTask({
        tasks: task.TasksExecutor.connect(task.applicants[Number(i)]),
        taskId: task.taskId,
        application: i,
      });
      await expect(tx).to.be.revertedWithCustomError(task.TasksExecutor, "ApplicationNotAccepted");
    }
  });

  it("should not allow the manager to confirm", async function () {
    const task = await loadFixture(createApprovedApplicationsTaskFixture);
    const application = task.acceptedApplications[0];
    const confirmer = task.TasksManager;
    const tx = takeTask({
      tasks: confirmer,
      taskId: task.taskId,
      application: application,
    });
    await expect(tx).to.be.revertedWithCustomError(confirmer, "NotYourApplication");
  });
  
  it("should not allow other people to confirm", async function () {
    const task = await loadFixture(createApprovedApplicationsTaskFixture);
    const application = task.acceptedApplications[0];
    const confirmer = task.TasksExecutor.connect(task.applicants[Number(task.acceptedApplications[1])])
    const tx = takeTask({
      tasks: confirmer,
      taskId: task.taskId,
      application: application,
    });
    await expect(tx).to.be.revertedWithCustomError(confirmer, "NotYourApplication");
  });
  

  it("should not be allowed on a non-existing application", async function () {
    const task = await loadFixture(createApprovedApplicationsTaskFixture);
    const application = BigInt(task.applicants.length);
    const tx = takeTask({
      tasks: task.TasksExecutor,
      taskId: task.taskId,
      application: application,
    });
    await expect(tx).to.be.revertedWithCustomError(task.TasksExecutor, "ApplicationDoesNotExist");
  });
});
