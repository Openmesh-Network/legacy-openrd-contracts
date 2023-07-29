import { expect } from "chai";
import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { acceptApplications, applyForTask, cancelTask, createSubmission, createTask, reviewSubmission, takeTask } from "../../utils/taskHelper";
import { BudgetItem, PreapprovedApplication, Reward, SubmissionJudgement } from "../../utils/taskTypes";
import { TestSetup } from "../Helpers/TestSetup";
import { ethers, getNamedAccounts, getUnnamedAccounts } from "hardhat";
import { Tasks } from "../../typechain-types";
import { DeployMockERC20 } from "../Helpers/MockERC20Helper";
import { Ether } from "../../utils/ethersUnits";
import { days } from "../../utils/timeUnits";

describe("Manual complicated", function () {
  it("#1", async function () {
    await loadFixture(TestSetup);
    const { manager, executor } = await getNamedAccounts();
    const [ funder, teamMember, preapprovedGuy ] = await getUnnamedAccounts();

    const TasksManager = await ethers.getContract("Tasks", manager) as Tasks;
    const TasksExecutor = await ethers.getContract("Tasks", executor) as Tasks;

    const USDT = await DeployMockERC20();
    const WETH = await DeployMockERC20();
  
    await USDT.increaseBalance(funder, Ether(500));
    await USDT.increaseBalance(manager, Ether(20_000));
    await USDT.increaseBalance(executor, Ether(100));

    await WETH.increaseBalance(funder, Ether(3));
    await WETH.increaseBalance(manager, Ether(100));
    await WETH.increaseBalance(teamMember, Ether(500));

    const budget : BudgetItem[] = [{
      tokenContract: await USDT.getAddress(),
      amount: Ether(200),
    }, {
      tokenContract: await WETH.getAddress(),
      amount: Ether(1),
    }];
    const funderSigner = await ethers.getSigner(funder);
    await USDT.connect(funderSigner).approve(await TasksManager.getAddress(), Ether(200));
    await WETH.connect(funderSigner).approve(await TasksManager.getAddress(), Ether(1));

    const deadline = new Date();
    deadline.setTime(deadline.getTime() + 10 * days * 1000);

    const preapproved : PreapprovedApplication[] = [{
      applicant: preapprovedGuy,
      reward: [{
        nextToken: false,
        to: preapprovedGuy,
        amount: Ether(50),
      }, {
        nextToken: true,
        to: funder,
        amount: Ether(150),
      }, {
        nextToken: true,
        to: manager,
        amount: Ether(1),
      }]
    }];

    const taskCreation = await createTask({
      tasks: TasksManager.connect(funderSigner),
      deadline: deadline,
      budget: budget,
      manager: manager,
      preapproved: preapproved,
    });
    const taskId = taskCreation.taskId;

    const reward : Reward[] = [{
      nextToken: false,
      to: executor,
      amount: Ether(100),
    }, {
      nextToken: true,
      to: teamMember,
      amount: Ether(50),
    }, {
      nextToken: false,
      to: teamMember,
      amount: Ether(1) / BigInt(2),
    }, {
      nextToken: true,
      to: executor,
      amount: Ether(1) / BigInt(4),
    }];
    await applyForTask({
      tasks: TasksExecutor,
      taskId: taskId,
      reward: reward,
    });

    await acceptApplications({
      tasks: TasksManager,
      taskId: taskId,
      applications: [0, 1].map(BigInt),
    });

    await takeTask({
      tasks: TasksExecutor,
      taskId: taskId,
      application: BigInt(1),
    });

    await createSubmission({
      tasks: TasksExecutor,
      taskId: taskId,
    });

    await reviewSubmission({
      tasks: TasksManager,
      taskId: taskId,
      submissionId: BigInt(0),
      judgement: SubmissionJudgement.Rejected,
    });

    await cancelTask({
      tasks: TasksManager,
      taskId: taskId,
    });

    await createSubmission({
      tasks: TasksExecutor,
      taskId: taskId,
    });

    await reviewSubmission({
      tasks: TasksManager,
      taskId: taskId,
      submissionId: BigInt(1),
      judgement: SubmissionJudgement.Accepted,
    });

    expect(await USDT.balanceOf(manager)).to.be.equal(Ether(20_000));
    expect(await WETH.balanceOf(manager)).to.be.equal(Ether(100));
    expect(await USDT.balanceOf(funder)).to.be.equal(Ether(500)-Ether(200)+Ether(50));
    expect(await WETH.balanceOf(funder)).to.be.equal(Ether(3)-Ether(1)+Ether(1)/BigInt(4));
    expect(await USDT.balanceOf(executor)).to.be.equal(Ether(100)+Ether(100));
    expect(await WETH.balanceOf(executor)).to.be.equal(Ether(0)+Ether(1)/BigInt(4));
    expect(await USDT.balanceOf(teamMember)).to.be.equal(Ether(0)+Ether(50));
    expect(await WETH.balanceOf(teamMember)).to.be.equal(Ether(500)+Ether(1)/BigInt(2));
  });
});
