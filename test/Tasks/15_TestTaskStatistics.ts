import { expect } from "chai";
import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { getTask } from "../../utils/taskHelper";
import { createTaskFixture } from "./00_TestTasksFixtures";
import { TestSetup } from "../Helpers/TestSetup";
import { ethers } from "hardhat";
import { Tasks } from "../../typechain-types";

describe("Task Statistics", function () {
  it("all should be zero with no tasks", async function () {
    await loadFixture(TestSetup);
    const Tasks = await ethers.getContract("Tasks") as Tasks;
    const stats = await Tasks.taskStatistics();
    expect(stats.open).to.be.equal(BigInt(0));
    expect(stats.taken).to.be.equal(BigInt(0));
    expect(stats.successful).to.be.equal(BigInt(0));
  });

  it("should be correct for 1 open task", async function () {
    const task = await loadFixture(createTaskFixture);
    const stats = await task.TasksProposer.taskStatistics();
    expect(stats.open).to.be.equal(BigInt(1));
    expect(stats.taken).to.be.equal(BigInt(0));
    expect(stats.successful).to.be.equal(BigInt(0));
  });

  // taken tasks

  // closed tasks

  // cancelled tasks

  // take task

  // other functions should have no change
});
