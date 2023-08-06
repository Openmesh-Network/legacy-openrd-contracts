import { expect } from "chai";
import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { ethers, getNamedAccounts } from "hardhat";
import { Tasks } from "../../typechain-types";
import { createTask } from "../../utils/taskHelper";
import { FastForwardTakeTask, TestSetup } from "../Helpers/TestSetup";

describe("Get Executor Tasks", function () {
  it("should return 1 task successfully", async function () {
    await loadFixture(TestSetup);
    const { proposer, executor } = await getNamedAccounts();
    const TasksProposer = (await ethers.getContract("Tasks", proposer)) as Tasks;
    const TasksExecutor = (await ethers.getContract("Tasks", executor)) as Tasks;
    const { taskId } = await createTask({
      tasks: TasksProposer,
    });
    await FastForwardTakeTask({
      tasksProposer: TasksProposer,
      tasksExecutor: TasksExecutor,
      taskId: taskId,
    });
    const expected = await TasksProposer.getTasks([taskId]);
    const executorTasks = await TasksProposer.getExecutingTasks(executor, 0, 0);
    expect(executorTasks).to.be.deep.equal(expected);
  });

  it("should return 2 tasks successfully", async function () {
    await loadFixture(TestSetup);
    const { proposer, executor } = await getNamedAccounts();
    const TasksProposer = (await ethers.getContract("Tasks", proposer)) as Tasks;
    const TasksExecutor = (await ethers.getContract("Tasks", executor)) as Tasks;
    const { taskId } = await createTask({
      tasks: TasksProposer,
    });
    await FastForwardTakeTask({
      tasksProposer: TasksProposer,
      tasksExecutor: TasksExecutor,
      taskId: taskId,
    });
    const { taskId: taskId2 } = await createTask({
      tasks: TasksProposer,
    });
    await FastForwardTakeTask({
      tasksProposer: TasksProposer,
      tasksExecutor: TasksExecutor,
      taskId: taskId2,
    });
    const expected = await TasksProposer.getTasks([taskId2, taskId]);
    const executorTasks = await TasksProposer.getExecutingTasks(executor, 0, 0);
    expect(executorTasks).to.be.deep.equal(expected);
  });

  it("should not return tasks with a different executor", async function () {
    await loadFixture(TestSetup);
    const { proposer, executor } = await getNamedAccounts();
    const TasksProposer = (await ethers.getContract("Tasks", proposer)) as Tasks;
    const TasksExecutor = (await ethers.getContract("Tasks", executor)) as Tasks;
    const { taskId } = await createTask({
      tasks: TasksExecutor,
    });
    await FastForwardTakeTask({
      tasksProposer: TasksExecutor,
      tasksExecutor: TasksProposer,
      taskId: taskId,
    });
    const { taskId: taskId2 } = await createTask({
      tasks: TasksProposer,
    });
    await FastForwardTakeTask({
      tasksProposer: TasksProposer,
      tasksExecutor: TasksExecutor,
      taskId: taskId2,
    });
    const expected = await TasksProposer.getTasks([taskId2]);
    const executorTasks = await TasksProposer.getExecutingTasks(executor, 0, 0);
    expect(executorTasks).to.be.deep.equal(expected);
  });

  it("should not return more than max tasks", async function () {
    await loadFixture(TestSetup);
    const { proposer, executor } = await getNamedAccounts();
    const TasksProposer = (await ethers.getContract("Tasks", proposer)) as Tasks;
    const TasksExecutor = (await ethers.getContract("Tasks", executor)) as Tasks;
    const { taskId } = await createTask({
      tasks: TasksProposer,
    });
    await FastForwardTakeTask({
      tasksProposer: TasksProposer,
      tasksExecutor: TasksExecutor,
      taskId: taskId,
    });
    const { taskId: taskId2 } = await createTask({
      tasks: TasksProposer,
    });
    await FastForwardTakeTask({
      tasksProposer: TasksProposer,
      tasksExecutor: TasksExecutor,
      taskId: taskId2,
    });
    const expected = await TasksProposer.getTasks([taskId2]);
    const executorTasks = await TasksProposer.getExecutingTasks(executor, 0, 1);
    expect(executorTasks).to.be.deep.equal(expected);
  });

  it("should start at from task id", async function () {
    await loadFixture(TestSetup);
    const { proposer, executor } = await getNamedAccounts();
    const TasksProposer = (await ethers.getContract("Tasks", proposer)) as Tasks;
    const TasksExecutor = (await ethers.getContract("Tasks", executor)) as Tasks;
    const { taskId } = await createTask({
      tasks: TasksProposer,
    });
    await FastForwardTakeTask({
      tasksProposer: TasksProposer,
      tasksExecutor: TasksExecutor,
      taskId: taskId,
    });
    const { taskId: taskId2 } = await createTask({
      tasks: TasksProposer,
    });
    await FastForwardTakeTask({
      tasksProposer: TasksProposer,
      tasksExecutor: TasksExecutor,
      taskId: taskId2,
    });
    const { taskId: taskId3 } = await createTask({
      tasks: TasksProposer,
    });
    await FastForwardTakeTask({
      tasksProposer: TasksProposer,
      tasksExecutor: TasksExecutor,
      taskId: taskId3,
    });
    const expected = await TasksProposer.getTasks([taskId2, taskId]);
    const executorTasks = await TasksProposer.getExecutingTasks(executor, taskId2, 0);
    expect(executorTasks).to.be.deep.equal(expected);
  });
});
