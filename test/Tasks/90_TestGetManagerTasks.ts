import { expect } from "chai";
import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { ethers, getNamedAccounts } from "hardhat";
import { Tasks } from "../../typechain-types";
import { createTask } from "../../utils/taskHelper";
import { TestSetup } from "../Helpers/TestSetup";

describe("Get Manager Tasks", function () {
  it("should return 1 task successfully", async function () {
    await loadFixture(TestSetup);
    const { manager } = await getNamedAccounts();
    const TasksManager = (await ethers.getContract("Tasks", manager)) as Tasks;
    const { taskId } = await createTask({
      tasks: TasksManager,
    });
    const expected = await TasksManager.getTasks([taskId]);
    const managerTasks = await TasksManager.getManagingTasks(manager, 0, 0);
    expect(managerTasks).to.be.deep.equal(expected);
  });

  it("should return 2 task successfully", async function () {
    await loadFixture(TestSetup);
    const { manager } = await getNamedAccounts();
    const TasksManager = (await ethers.getContract("Tasks", manager)) as Tasks;
    const { taskId } = await createTask({
      tasks: TasksManager,
    });
    const { taskId: taskId2 } = await createTask({
      tasks: TasksManager,
    });
    const expected = await TasksManager.getTasks([taskId2, taskId]);
    const managerTasks = await TasksManager.getManagingTasks(manager, 0, 0);
    expect(managerTasks).to.be.deep.equal(expected);
  });

  it("should not return tasks with other managers", async function () {
    await loadFixture(TestSetup);
    const { manager, executor } = await getNamedAccounts();
    const TasksExecutor = (await ethers.getContract("Tasks", executor)) as Tasks;
    const TasksManager = (await ethers.getContract("Tasks", manager)) as Tasks;
    const { taskId } = await createTask({
      tasks: TasksExecutor,
    });
    const { taskId: taskId2 } = await createTask({
      tasks: TasksManager,
    });
    const expected = await TasksManager.getTasks([taskId2]);
    const managerTasks = await TasksManager.getManagingTasks(manager, 0, 0);
    expect(managerTasks).to.be.deep.equal(expected);
  });

  it("should not return more than max tasks", async function () {
    await loadFixture(TestSetup);
    const { manager } = await getNamedAccounts();
    const TasksManager = (await ethers.getContract("Tasks", manager)) as Tasks;
    const { taskId } = await createTask({
      tasks: TasksManager,
    });
    const { taskId: taskId2 } = await createTask({
      tasks: TasksManager,
    });
    const expected = await TasksManager.getTasks([taskId2]);
    const managerTasks = await TasksManager.getManagingTasks(manager, 0, 1);
    expect(managerTasks).to.be.deep.equal(expected);
  });

  it("should start at from task id", async function () {
    await loadFixture(TestSetup);
    const { manager } = await getNamedAccounts();
    const TasksManager = (await ethers.getContract("Tasks", manager)) as Tasks;
    const { taskId } = await createTask({
      tasks: TasksManager,
    });
    const { taskId: taskId2 } = await createTask({
      tasks: TasksManager,
    });
    const { taskId: taskId3 } = await createTask({
      tasks: TasksManager,
    });
    const expected = await TasksManager.getTasks([taskId2, taskId]);
    const managerTasks = await TasksManager.getManagingTasks(manager, taskId2, 0);
    expect(managerTasks).to.be.deep.equal(expected);
  });
});
