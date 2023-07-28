import { expect } from "chai";
import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { ethers, getNamedAccounts } from "hardhat";
import { Tasks } from "../../typechain-types";
import { createTask } from "../../utils/taskHelper";
import { TestSetup } from "../Helpers/TestSetup";
import { asyncMap } from "../../utils/utils";

describe("Get Tasks", function () {
  it("should return 1 task successfully", async function () {
    await loadFixture(TestSetup);
    const { manager } = await getNamedAccounts();
    const TasksManager = await ethers.getContract("Tasks", manager) as Tasks;
    const { taskId } = await createTask({
        tasks: TasksManager,
    });
    const taskIds = [taskId];
    const expected = await asyncMap(taskIds, id => TasksManager.getTask(id));
    const multiTask = await TasksManager.getTasks(taskIds);
    expect(multiTask).to.be.deep.equal(expected);
  });  

  it("should return 2 tasks successfully", async function () {
    await loadFixture(TestSetup);
    const { manager } = await getNamedAccounts();
    const TasksManager = await ethers.getContract("Tasks", manager) as Tasks;
    const { taskId } = await createTask({
        tasks: TasksManager,
    });
    const { taskId: taskId2 } = await createTask({
        tasks: TasksManager,
    });
    const taskIds = [taskId, taskId2];
    const expected = await asyncMap(taskIds, id => TasksManager.getTask(id));
    const multiTask = await TasksManager.getTasks(taskIds);
    expect(multiTask).to.be.deep.equal(expected);
  });
});