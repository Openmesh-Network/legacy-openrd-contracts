import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { ethers, getNamedAccounts } from "hardhat";
import { Tasks } from "../../typechain-types";
import { acceptApplications, applyForTask, createSubmission, createTask, reviewSubmission, takeTask } from "../../utils/taskHelper";
import { GetBudgetItem } from "../Helpers/MockERC20Helper";
import { Ether, Gwei, Wei } from "../../utils/ethersUnits";
import { SubmissionJudgement } from "../../utils/taskTypes";
import { asyncMap } from "../../utils/utils";
import { TestSetup } from "../Helpers/TestSetup";

// Base cases
export async function createTaskFixture() {
  await loadFixture(TestSetup);
  const { manager, executor } = await getNamedAccounts();
  const TasksManager = (await ethers.getContract("Tasks", manager)) as Tasks;
  const TasksExecutor = (await ethers.getContract("Tasks", executor)) as Tasks;
  const { taskId } = await createTask({
    tasks: TasksManager,
  });
  return { manager, executor, TasksManager, TasksExecutor, taskId };
}

export async function createTaskWithApplicationFixture() {
  const task = await loadFixture(createTaskFixture);
  await applyForTask({
    tasks: task.TasksExecutor,
    taskId: task.taskId,
  });
  return task;
}

export async function createTaskWithAcceptedApplicationFixture() {
  const task = await loadFixture(createTaskWithApplicationFixture);
  await acceptApplications({
    tasks: task.TasksManager,
    taskId: task.taskId,
    applications: [BigInt(0)],
  });
  return task;
}

export async function createTakenTaskFixture() {
  const task = await loadFixture(createTaskWithAcceptedApplicationFixture);
  await takeTask({
    tasks: task.TasksExecutor,
    taskId: task.taskId,
    application: BigInt(0),
  });
  return task;
}

export async function createTakenTaskWithSubmissionFixture() {
  const task = await loadFixture(createTakenTaskFixture);
  await createSubmission({
    tasks: task.TasksExecutor,
    taskId: task.taskId,
  });
  return task;
}

export async function createTakenTaskWithAcceptedSubmissionFixture() {
  const task = await loadFixture(createTakenTaskWithSubmissionFixture);
  await reviewSubmission({
    tasks: task.TasksManager,
    taskId: task.taskId,
    submissionId: BigInt(0),
    judgement: SubmissionJudgement.Accepted,
  });
  return task;
}

// Special cases
export async function createBudgetTaskFixture() {
  await loadFixture(TestSetup);
  const { manager, executor } = await getNamedAccounts();
  const TasksManager = (await ethers.getContract("Tasks", manager)) as Tasks;
  const TasksExecutor = (await ethers.getContract("Tasks", executor)) as Tasks;
  const amounts = [Wei(1), Wei(10), Gwei(1), Gwei(5), Ether(1), Ether(20), Ether(100), Ether(1337), Ether(1_000_000)];
  const budget = await asyncMap(amounts, (a) => GetBudgetItem(TasksManager, a, manager));
  const nativeBudget = Ether(1_000);
  const { taskId } = await createTask({
    tasks: TasksManager,
    budget: budget,
    nativeBudget: nativeBudget,
  });
  return { manager, executor, TasksManager, TasksExecutor, taskId, budget, nativeBudget };
}

export async function createApplicationsTaskFixture() {
  const task = await loadFixture(createTaskFixture);
  const accounts = await ethers.getUnnamedSigners();
  const applications = 10;
  for (let i = 0; i < applications; i++) {
    await applyForTask({
      tasks: task.TasksExecutor.connect(accounts[i]),
      taskId: task.taskId,
    });
  }
  return { ...task, applicants: accounts.slice(0, applications) };
}

export async function createApprovedApplicationsTaskFixture() {
  const task = await loadFixture(createApplicationsTaskFixture);
  const acceptedApplications = task.applicants
    .map((_, i) => i)
    .filter((_, i) => i % 2 == 0)
    .map(BigInt);
  await acceptApplications({
    tasks: task.TasksManager,
    taskId: task.taskId,
    applications: acceptedApplications,
  });
  return { ...task, acceptedApplications: acceptedApplications };
}

export async function createBudgetTaskWithExecutorAndSubmissionFixture() {
  const task = await loadFixture(createBudgetTaskFixture);
  const reward = task.budget.map((_, i) => {
    return { nextToken: true, to: ethers.Wallet.createRandom().address, amount: BigInt(i) };
  });
  const nativeReward = Array(5)
    .fill(0)
    .map((_, i) => {
      return { to: ethers.Wallet.createRandom().address, amount: task.nativeBudget / BigInt(2 ** (i + 1)) };
    });
  await applyForTask({
    tasks: task.TasksExecutor,
    taskId: task.taskId,
    reward: reward,
    nativeReward: nativeReward,
  });
  await acceptApplications({
    tasks: task.TasksManager,
    taskId: task.taskId,
    applications: [BigInt(0)],
  });
  await takeTask({
    tasks: task.TasksExecutor,
    taskId: task.taskId,
    application: BigInt(0),
  });
  await createSubmission({
    tasks: task.TasksExecutor,
    taskId: task.taskId,
  });
  return { ...task, reward, nativeReward };
}

export async function createBudgetTaskWithExecutorAndSubmissionFullRewardFixture() {
  const task = await loadFixture(createBudgetTaskFixture);
  await applyForTask({
    tasks: task.TasksExecutor,
    taskId: task.taskId,
    reward: task.budget.map((b) => {
      return { nextToken: true, to: task.executor, amount: b.amount };
    }),
    nativeReward: Array(5)
      .fill(0)
      .map((_, i) => {
        return { to: task.executor, amount: task.nativeBudget / BigInt(2 ** (i + 1)) };
      }),
  });
  await acceptApplications({
    tasks: task.TasksManager,
    taskId: task.taskId,
    applications: [BigInt(0)],
  });
  await takeTask({
    tasks: task.TasksExecutor,
    taskId: task.taskId,
    application: BigInt(0),
  });
  await createSubmission({
    tasks: task.TasksExecutor,
    taskId: task.taskId,
  });
  return task;
}

export async function createBudgetTaskWithExecutorAndSubmissionIncompleteRewardFixture() {
  const task = await loadFixture(createBudgetTaskFixture);
  const reward = task.budget.map((b) => {
    return { nextToken: true, to: ethers.Wallet.createRandom().address, amount: b.amount };
  });
  reward.pop();
  await applyForTask({
    tasks: task.TasksExecutor,
    taskId: task.taskId,
    reward: reward,
  });
  await acceptApplications({
    tasks: task.TasksManager,
    taskId: task.taskId,
    applications: [BigInt(0)],
  });
  await takeTask({
    tasks: task.TasksExecutor,
    taskId: task.taskId,
    application: BigInt(0),
  });
  await createSubmission({
    tasks: task.TasksExecutor,
    taskId: task.taskId,
  });
  return { ...task, reward };
}

export async function createPreapprovedBudgetTaskFixture() {
  await loadFixture(TestSetup);
  const { manager, executor } = await getNamedAccounts();
  const TasksManager = (await ethers.getContract("Tasks", manager)) as Tasks;
  const TasksExecutor = (await ethers.getContract("Tasks", executor)) as Tasks;
  const amounts = [Wei(1), Wei(10), Gwei(1), Gwei(5), Ether(1), Ether(20), Ether(100), Ether(1337), Ether(1_000_000)];
  const budget = await asyncMap(amounts, (a) => GetBudgetItem(TasksManager, a, manager));
  const nativeBudget = Ether(1_000);
  const { taskId } = await createTask({
    tasks: TasksManager,
    budget: budget,
    nativeBudget: nativeBudget,
    preapproved: [
      {
        applicant: executor,
        reward: amounts.map((b) => {
          return { nextToken: true, to: ethers.Wallet.createRandom().address, amount: b };
        }),
        nativeReward: Array(5)
          .fill(0)
          .map((_, i) => {
            return { to: ethers.Wallet.createRandom().address, amount: nativeBudget / BigInt(2 ** (i + 1)) };
          }),
      },
    ],
  });
  return { manager, executor, TasksManager, TasksExecutor, taskId, budget };
}

describe("Tasks Fixtures", function () {
  describe("Base", function () {
    it("create task", async function () {
      await loadFixture(createTaskFixture);
    });

    it("apply for task", async function () {
      await loadFixture(createTaskWithApplicationFixture);
    });

    it("accept applications", async function () {
      await loadFixture(createTaskWithAcceptedApplicationFixture);
    });

    it("take task", async function () {
      await loadFixture(createTakenTaskFixture);
    });

    it("create submission", async function () {
      await loadFixture(createTakenTaskWithSubmissionFixture);
    });

    it("review submission", async function () {
      await loadFixture(createTakenTaskWithAcceptedSubmissionFixture);
    });
  });

  describe("Special", function () {
    it("create budget task", async function () {
      await loadFixture(createBudgetTaskFixture);
    });

    it("create applications task", async function () {
      await loadFixture(createApplicationsTaskFixture);
    });

    it("create approved applications task", async function () {
      await loadFixture(createApprovedApplicationsTaskFixture);
    });

    it("create budget task with executor and submission", async function () {
      await loadFixture(createBudgetTaskWithExecutorAndSubmissionFixture);
    });

    it("create budget task with executor and submission full reward", async function () {
      await loadFixture(createBudgetTaskWithExecutorAndSubmissionFullRewardFixture);
    });

    it("create budget task with executor and submission incomplete reward", async function () {
      await loadFixture(createBudgetTaskWithExecutorAndSubmissionIncompleteRewardFixture);
    });

    it("create preapproved budget task", async function () {
      await loadFixture(createPreapprovedBudgetTaskFixture);
    });
  });
});
