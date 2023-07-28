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
    const { proposer } = await getNamedAccounts();
    const TasksProposer = await ethers.getContract("Tasks", proposer) as Tasks;
    const { taskId } = await createTask({
        tasks: TasksProposer,
    });
    const taskIds = [taskId];
    const expected = await asyncMap(taskIds, id => TasksProposer.getTask(id));
    const multiTask = await TasksProposer.getTasks(taskIds);
    expect(multiTask).to.be.deep.equal(expected);
  });  

  it("should return 2 tasks successfully", async function () {
    await loadFixture(TestSetup);
    const { proposer } = await getNamedAccounts();
    const TasksProposer = await ethers.getContract("Tasks", proposer) as Tasks;
    const { taskId } = await createTask({
        tasks: TasksProposer,
    });
    const { taskId: taskId2 } = await createTask({
        tasks: TasksProposer,
    });
    const taskIds = [taskId, taskId2];
    const expected = await asyncMap(taskIds, id => TasksProposer.getTask(id));
    const multiTask = await TasksProposer.getTasks(taskIds);
    expect(multiTask).to.be.deep.equal(expected);
  });
});