import { loadFixture } from "@nomicfoundation/hardhat-network-helpers"
import { expect } from "chai"
import { ethers, getNamedAccounts, getUnnamedAccounts } from "hardhat"

import { Tasks, TetherToken } from "../../typechain-types"
import {
  acceptApplications,
  applyForTask,
  createSubmission,
  createTask,
  reviewSubmission,
  takeTask,
} from "../../utils/taskHelper"
import { BudgetItem, Reward, SubmissionJudgement } from "../../utils/taskTypes"
import { days } from "../../utils/timeUnits"
import { TestSetup } from "../Helpers/TestSetup"

describe("USDT test", function () {
  it("Full base task flow", async function () {
    await loadFixture(TestSetup)
    const { manager, executor, deployer } = await getNamedAccounts()
    const funder = deployer

    const TasksManager = (await ethers.getContract("Tasks", manager)) as Tasks
    const TasksExecutor = (await ethers.getContract("Tasks", executor)) as Tasks

    const supply = BigInt("100000000000")
    const USDT = (await ethers.deployContract(
      "TetherToken",
      [supply, "Tether USD", "USDT", 6],
      await ethers.getSigner(deployer)
    )) as any as TetherToken

    const budget: BudgetItem[] = [
      {
        tokenContract: await USDT.getAddress(),
        amount: supply,
      },
    ]
    const funderSigner = await ethers.getSigner(funder)
    await USDT.connect(funderSigner).approve(
      await TasksManager.getAddress(),
      supply
    )

    const deadline = new Date()
    deadline.setTime(deadline.getTime() + 10 * days * 1000)

    const taskCreation = await createTask({
      tasks: TasksManager.connect(funderSigner),
      deadline: deadline,
      budget: budget,
      manager: manager,
    })
    const taskId = taskCreation.taskId

    const reward: Reward[] = [
      {
        nextToken: true,
        to: executor,
        amount: supply,
      },
    ]
    await applyForTask({
      tasks: TasksExecutor,
      taskId: taskId,
      reward: reward,
    })

    await acceptApplications({
      tasks: TasksManager,
      taskId: taskId,
      applications: [BigInt(0)],
    })

    await takeTask({
      tasks: TasksExecutor,
      taskId: taskId,
      application: BigInt(0),
    })

    await createSubmission({
      tasks: TasksExecutor,
      taskId: taskId,
    })

    await createSubmission({
      tasks: TasksExecutor,
      taskId: taskId,
    })

    await reviewSubmission({
      tasks: TasksManager,
      taskId: taskId,
      submissionId: BigInt(0),
      judgement: SubmissionJudgement.Accepted,
    })

    expect(await USDT.balanceOf(funder)).to.be.equal(0)
    expect(await USDT.balanceOf(executor)).to.be.equal(supply)
  })
})
