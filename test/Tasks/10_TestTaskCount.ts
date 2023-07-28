import { expect } from "chai";
import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { createTaskFixture } from "./00_TestTasksFixtures";
import { TestSetup } from "../Helpers/TestSetup";
import { ethers } from "hardhat";
import { Tasks } from "../../typechain-types";

describe("Task Count", function () {
  it("should be zero with no tasks", async function () {
    await loadFixture(TestSetup);
    const Tasks = await ethers.getContract("Tasks") as Tasks;
    const taskCount = await Tasks.taskCount();
    expect(taskCount).to.be.equal(BigInt(0));
  });

  it("should be one after creating one task", async function () {
    const task = await loadFixture(createTaskFixture);
    const taskCount = await task.TasksManager.taskCount();
    expect(taskCount).to.be.equal(BigInt(1));
  });

  // taken tasks

  // closed tasks

  // cancelled tasks

  // other functions should have no change
});
