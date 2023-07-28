import { expect } from "chai";
import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { ethers, getNamedAccounts } from "hardhat";
import { Tasks } from "../../typechain-types";
import { createTask } from "../../utils/taskHelper";
import { TestSetup } from "../Helpers/TestSetup";

describe("Get Proposer Tasks", function () {
  it("should return 1 task successfully", async function () {
    await loadFixture(TestSetup);
    const { proposer } = await getNamedAccounts();
    const TasksProposer = await ethers.getContract("Tasks", proposer) as Tasks;
    const { taskId } = await createTask({
        tasks: TasksProposer,
    });
    const expected = await TasksProposer.getTasks([taskId]);
    const proposerTasks = await TasksProposer.getProposingTasks(proposer, 0, 0);
    expect(proposerTasks).to.be.deep.equal(expected);
  });  

  it("should return 2 task successfully", async function () {
    await loadFixture(TestSetup);
    const { proposer } = await getNamedAccounts();
    const TasksProposer = await ethers.getContract("Tasks", proposer) as Tasks;
    const { taskId } = await createTask({
        tasks: TasksProposer,
    });
    const { taskId: taskId2 } = await createTask({
        tasks: TasksProposer,
    });
    const expected = await TasksProposer.getTasks([taskId2, taskId]);
    const proposerTasks = await TasksProposer.getProposingTasks(proposer, 0, 0);
    expect(proposerTasks).to.be.deep.equal(expected);
  });  

  it("should not return tasks with other proposers", async function () {
    await loadFixture(TestSetup);
    const { proposer, executor } = await getNamedAccounts();
    const TasksExecutor = await ethers.getContract("Tasks", executor) as Tasks;
    const TasksProposer = await ethers.getContract("Tasks", proposer) as Tasks;
    const { taskId } = await createTask({
        tasks: TasksExecutor,
    });
    const { taskId: taskId2 } = await createTask({
        tasks: TasksProposer,
    });
    const expected = await TasksProposer.getTasks([taskId2]);
    const proposerTasks = await TasksProposer.getProposingTasks(proposer, 0, 0);
    expect(proposerTasks).to.be.deep.equal(expected);
  });  

  it("should not return more than max tasks", async function () {
    await loadFixture(TestSetup);
    const { proposer } = await getNamedAccounts();
    const TasksProposer = await ethers.getContract("Tasks", proposer) as Tasks;
    const { taskId } = await createTask({
        tasks: TasksProposer,
    });
    const { taskId: taskId2 } = await createTask({
        tasks: TasksProposer,
    });
    const expected = await TasksProposer.getTasks([taskId2]);
    const proposerTasks = await TasksProposer.getProposingTasks(proposer, 0, 1);
    expect(proposerTasks).to.be.deep.equal(expected);
  });  
});