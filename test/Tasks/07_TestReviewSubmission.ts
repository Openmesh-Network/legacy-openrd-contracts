import { expect } from "chai";
import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { ethers, getUnnamedAccounts } from "hardhat";
import { reviewSubmission, getTask } from "../../utils/taskHelper";
import { ToBlockchainDate } from "../../utils/timeUnits";
import {
  createBudgetTaskWithExecutorAndSubmissionFixture,
  createBudgetTaskWithExecutorAndSubmissionFullRewardFixture,
  createBudgetTaskWithExecutorAndSubmissionIncompleteRewardFixture,
  createTakenTaskWithAcceptedSubmissionFixture,
  createTakenTaskWithSubmissionFixture,
  createTaskFixture,
} from "./00_TestTasksFixtures";
import { SubmissionJudgement, SubmissionJudgementMetadata, TaskState } from "../../utils/taskTypes";

describe("Review Submission", function () {
  // Check if variables are set
  it("should have the correct feedback", async function () {
    const task = await loadFixture(createTakenTaskWithSubmissionFixture);
    const feedback: SubmissionJudgementMetadata = {
      feedback: "LGTM!",
    };
    await reviewSubmission({
      tasks: task.TasksManager,
      taskId: task.taskId,
      submissionId: BigInt(0),
      judgement: SubmissionJudgement.Accepted,
      judgementMetadata: feedback,
    });
    const taskInfo = await getTask({ tasks: task.TasksManager, taskId: task.taskId });
    expect(taskInfo.submissions).to.be.lengthOf(1);
    expect(taskInfo.submissions[0].feedback).to.be.deep.equal(feedback);
  });

  it("should have transfered the reward after accept", async function () {
    const task = await loadFixture(createBudgetTaskWithExecutorAndSubmissionFixture);
    await reviewSubmission({
      tasks: task.TasksManager,
      taskId: task.taskId,
      submissionId: BigInt(0),
      judgement: SubmissionJudgement.Accepted,
    });
    for (let i = 0; i < task.budget.length; i++) {
      const ERC20 = await ethers.getContractAt("ERC20", task.budget[i].tokenContract);
      expect(await ERC20.balanceOf(task.executor)).to.be.equal(task.reward[i].amount);
    }
  });

  it("should have refunded left over budget after accept", async function () {
    const task = await loadFixture(createBudgetTaskWithExecutorAndSubmissionFixture);
    await reviewSubmission({
      tasks: task.TasksManager,
      taskId: task.taskId,
      submissionId: BigInt(0),
      judgement: SubmissionJudgement.Accepted,
    });
    for (let i = 0; i < task.budget.length; i++) {
      const ERC20 = await ethers.getContractAt("ERC20", task.budget[i].tokenContract);
      expect(await ERC20.balanceOf(task.manager)).to.be.equal(task.budget[i].amount - task.reward[i].amount);
    }
  });

  it("should have refunded left over budget after accept, when not all tokens are used as reward", async function () {
    const task = await loadFixture(createBudgetTaskWithExecutorAndSubmissionIncompleteRewardFixture);
    await reviewSubmission({
      tasks: task.TasksManager,
      taskId: task.taskId,
      submissionId: BigInt(0),
      judgement: SubmissionJudgement.Accepted,
    });
    for (let i = 0; i < task.budget.length; i++) {
      const ERC20 = await ethers.getContractAt("ERC20", task.budget[i].tokenContract);
      const sub = i >= task.reward.length ? BigInt(0) : task.reward[i].amount;
      expect(await ERC20.balanceOf(task.manager)).to.be.equal(task.budget[i].amount - sub);
    }
  });

  it("should not refund anything if reward equals budget after accept", async function () {
    const task = await loadFixture(createBudgetTaskWithExecutorAndSubmissionFullRewardFixture);
    await reviewSubmission({
      tasks: task.TasksManager,
      taskId: task.taskId,
      submissionId: BigInt(0),
      judgement: SubmissionJudgement.Accepted,
    });
    for (let i = 0; i < task.budget.length; i++) {
      const ERC20 = await ethers.getContractAt("ERC20", task.budget[i].tokenContract);
      expect(await ERC20.balanceOf(task.executor)).to.be.equal(task.budget[i].amount);
      expect(await ERC20.balanceOf(task.manager)).to.be.equal(BigInt(0));
    }
  });

  it("should have be in closed state after accept", async function () {
    const task = await loadFixture(createTakenTaskWithSubmissionFixture);
    await reviewSubmission({
      tasks: task.TasksManager,
      taskId: task.taskId,
      submissionId: BigInt(0),
      judgement: SubmissionJudgement.Accepted,
    });
    const taskInfo = await getTask({ tasks: task.TasksManager, taskId: task.taskId });
    expect(taskInfo.state).to.be.equal(TaskState.Closed);
  });

  it("should not have touched the escrow funds after reject", async function () {
    const task = await loadFixture(createBudgetTaskWithExecutorAndSubmissionFixture);
    await reviewSubmission({
      tasks: task.TasksManager,
      taskId: task.taskId,
      submissionId: BigInt(0),
      judgement: SubmissionJudgement.Rejected,
    });
    const taskInfo = await getTask({ tasks: task.TasksManager, taskId: task.taskId });
    for (let i = 0; i < task.budget.length; i++) {
      const ERC20 = await ethers.getContractAt("ERC20", task.budget[i].tokenContract);
      expect(await ERC20.balanceOf(taskInfo.escrow)).to.be.equal(task.budget[i].amount);
    }
  });

  it("should have be in taken state after reject", async function () {
    const task = await loadFixture(createTakenTaskWithSubmissionFixture);
    await reviewSubmission({
      tasks: task.TasksManager,
      taskId: task.taskId,
      submissionId: BigInt(0),
      judgement: SubmissionJudgement.Rejected,
    });
    const taskInfo = await getTask({ tasks: task.TasksManager, taskId: task.taskId });
    expect(taskInfo.state).to.be.equal(TaskState.Taken);
  });

  //Check if variables are unset
  it("should not have changed the task", async function () {
    const task = await loadFixture(createTakenTaskWithSubmissionFixture);
    const taskInfoBefore = await getTask({ tasks: task.TasksManager, taskId: task.taskId });
    await reviewSubmission({
      tasks: task.TasksManager,
      taskId: task.taskId,
      submissionId: BigInt(0),
      judgement: SubmissionJudgement.Accepted,
    });
    const taskInfo = await getTask({ tasks: task.TasksManager, taskId: task.taskId });
    expect(taskInfo.metadata).to.be.deep.equal(taskInfoBefore.metadata);
    expect(ToBlockchainDate(taskInfo.deadline)).to.be.equal(ToBlockchainDate(taskInfoBefore.deadline));
    expect(taskInfo.budget).to.be.deep.equal(taskInfoBefore.budget);
    expect(taskInfo.escrow).to.be.equal(taskInfoBefore.escrow);
    expect(taskInfo.manager).to.be.equal(taskInfoBefore.manager);
  });

  it("should not have changed applications", async function () {
    const task = await loadFixture(createTakenTaskWithSubmissionFixture);
    const taskInfoBefore = await getTask({ tasks: task.TasksManager, taskId: task.taskId });
    await reviewSubmission({
      tasks: task.TasksManager,
      taskId: task.taskId,
      submissionId: BigInt(0),
      judgement: SubmissionJudgement.Accepted,
    });
    const taskInfo = await getTask({ tasks: task.TasksManager, taskId: task.taskId });
    expect(taskInfo.applications.length).to.be.equal(taskInfoBefore.applications.length);
    for (let i = 0; i < taskInfo.applications.length; i++) {
      expect(taskInfo.applications[i].metadata).to.be.deep.equal(taskInfoBefore.applications[i].metadata);
      expect(taskInfo.applications[i].applicant).to.be.equal(taskInfoBefore.applications[i].applicant);
      expect(taskInfo.applications[i].reward).to.be.deep.equal(taskInfoBefore.applications[i].reward);
    }
  });

  it("should not have changed accepted applications", async function () {
    const task = await loadFixture(createTakenTaskWithSubmissionFixture);
    const taskInfoBefore = await getTask({ tasks: task.TasksManager, taskId: task.taskId });
    await reviewSubmission({
      tasks: task.TasksManager,
      taskId: task.taskId,
      submissionId: BigInt(0),
      judgement: SubmissionJudgement.Accepted,
    });
    const taskInfo = await getTask({ tasks: task.TasksManager, taskId: task.taskId });
    for (let i = 0; i < taskInfo.applications.length; i++) {
      expect(taskInfo.applications[i].accepted).to.be.equal(taskInfoBefore.applications[i].accepted);
    }
  });

  it("should not have changed submissions", async function () {
    const task = await loadFixture(createTakenTaskWithSubmissionFixture);
    const taskInfoBefore = await getTask({ tasks: task.TasksManager, taskId: task.taskId });
    await reviewSubmission({
      tasks: task.TasksManager,
      taskId: task.taskId,
      submissionId: BigInt(0),
      judgement: SubmissionJudgement.Accepted,
    });
    const taskInfo = await getTask({ tasks: task.TasksManager, taskId: task.taskId });
    for (let i = 0; i < taskInfo.submissions.length; i++) {
      expect(taskInfo.submissions[i].metadata).to.be.deep.equal(taskInfoBefore.submissions[i].metadata);
    }
  });

  //Check for exploits
  it("should not be allowed on a task id that does not exist", async function () {
    const task = await loadFixture(createTakenTaskWithSubmissionFixture);
    const tx = reviewSubmission({
      tasks: task.TasksManager,
      taskId: task.taskId + BigInt(1),
      submissionId: BigInt(0),
      judgement: SubmissionJudgement.Accepted,
    });
    await expect(tx).to.be.revertedWithCustomError(task.TasksManager, "TaskDoesNotExist");
  });

  it("should not be allowed on an open task", async function () {
    const task = await loadFixture(createTaskFixture);
    const tx = reviewSubmission({
      tasks: task.TasksManager,
      taskId: task.taskId,
      submissionId: BigInt(0),
      judgement: SubmissionJudgement.Accepted,
    });
    await expect(tx).to.be.revertedWithCustomError(task.TasksManager, "TaskNotTaken");
  });

  it("should not be allowed on a closed task", async function () {
    const task = await loadFixture(createTakenTaskWithAcceptedSubmissionFixture);
    const tx = reviewSubmission({
      tasks: task.TasksManager,
      taskId: task.taskId,
      submissionId: BigInt(0),
      judgement: SubmissionJudgement.Accepted,
    });
    await expect(tx).to.be.revertedWithCustomError(task.TasksManager, "TaskNotTaken");
  });

  it("should revert if executor tries to review", async function () {
    const task = await loadFixture(createTakenTaskWithSubmissionFixture);
    const tx = reviewSubmission({
      tasks: task.TasksExecutor,
      taskId: task.taskId,
      submissionId: BigInt(0),
      judgement: SubmissionJudgement.Accepted,
    });
    await expect(tx).to.be.revertedWithCustomError(task.TasksExecutor, "NotManager");
  });

  it("should revert if anyone else tries to review", async function () {
    const task = await loadFixture(createTakenTaskWithSubmissionFixture);
    const accounts = await getUnnamedAccounts();
    const tasks = task.TasksExecutor.connect(await ethers.getSigner(accounts[0]));
    const tx = reviewSubmission({
      tasks: tasks,
      taskId: task.taskId,
      submissionId: BigInt(0),
      judgement: SubmissionJudgement.Accepted,
    });
    await expect(tx).to.be.revertedWithCustomError(tasks, "NotManager");
  });

  it("should not be allowed on already judged submission", async function () {
    const task = await loadFixture(createTakenTaskWithSubmissionFixture);
    await reviewSubmission({
      tasks: task.TasksManager,
      taskId: task.taskId,
      submissionId: BigInt(0),
      judgement: SubmissionJudgement.Rejected,
    });
    const tx = reviewSubmission({
      tasks: task.TasksManager,
      taskId: task.taskId,
      submissionId: BigInt(0),
      judgement: SubmissionJudgement.Rejected,
    });
    await expect(tx).to.be.revertedWithCustomError(task.TasksManager, "SubmissionAlreadyJudged");
  });

  it("should not be allowed on a non-existing submission", async function () {
    const task = await loadFixture(createTakenTaskWithSubmissionFixture);
    const tx = reviewSubmission({
      tasks: task.TasksManager,
      taskId: task.taskId,
      submissionId: BigInt(1),
      judgement: SubmissionJudgement.Accepted,
    });
    await expect(tx).to.be.revertedWithCustomError(task.TasksManager, "SubmissionDoesNotExist");
  });

  it("should revert if judgement is none", async function () {
    const task = await loadFixture(createTakenTaskWithSubmissionFixture);
    const tx = reviewSubmission({
      tasks: task.TasksManager,
      taskId: task.taskId,
      submissionId: BigInt(0),
      judgement: SubmissionJudgement.None,
    });
    await expect(tx).to.be.revertedWithCustomError(task.TasksManager, "JudgementNone");
  });
});
