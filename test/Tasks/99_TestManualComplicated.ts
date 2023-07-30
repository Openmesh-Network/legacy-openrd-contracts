import { expect } from "chai";
import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { acceptApplications, acceptRequest, applyForTask, cancelTask, createSubmission, createTask, executeRequest, reviewSubmission, takeTask } from "../../utils/taskHelper";
import { ApplicationMetadata, BudgetItem, CancelTaskRequestMetadata, PreapprovedApplication, RequestType, Reward, SubmissionJudgement, SubmissionJudgementMetadata, SubmissionMetadata, TaskMetadata } from "../../utils/taskTypes";
import { TestSetup } from "../Helpers/TestSetup";
import { ethers, getNamedAccounts, getUnnamedAccounts } from "hardhat";
import { Tasks } from "../../typechain-types";
import { DeployMockERC20 } from "../Helpers/MockERC20Helper";
import { Ether } from "../../utils/ethersUnits";
import { ToBlockchainDate, days } from "../../utils/timeUnits";
import { getEventsFromReceipt } from "../../utils/utils";
import { getFromIpfs } from "../../utils/ipfsHelper";

describe("Manual complicated", function () {
  it("Budget", async function () {
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

  it("Events", async function () {
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

    const metadata : TaskMetadata = {
      title: "Metadata",
      description: "Description",
      resources: [{
        name: "One to test",
        url: "https://one.test"
      }]
    };

    const taskCreation = await createTask({
      tasks: TasksManager.connect(funderSigner),
      deadline: deadline,
      budget: budget,
      manager: manager,
      preapproved: preapproved,
      metadata: metadata,
    });
    const taskId = taskCreation.taskId;
    const taskCreationEvents = getEventsFromReceipt(taskCreation.receipt, TasksManager.interface, "TaskCreated");
    expect(taskCreationEvents).to.be.lengthOf(1);
    expect(taskCreationEvents[0].args.taskId).to.be.equal(taskId);
    expect(await getFromIpfs(taskCreationEvents[0].args.metadata)).to.be.deep.equal(metadata);
    expect(taskCreationEvents[0].args.deadline).to.be.equal(ToBlockchainDate(deadline));
    for (let i = 0; i < budget.length; i++) {
      expect(taskCreationEvents[0].args.budget[i].tokenContract).to.be.equal(budget[i].tokenContract);
      expect(taskCreationEvents[0].args.budget[i].amount).to.be.equal(budget[i].amount);
    }
    expect(taskCreationEvents[0].args.creator).to.be.equal(funder);
    expect(taskCreationEvents[0].args.manager).to.be.equal(manager);
    for (let i = 0; i < preapproved.length; i++) {
      expect(taskCreationEvents[0].args.preapproved[i].applicant).to.be.equal(preapproved[i].applicant);
      for (let j = 0; j < preapproved[i].reward.length; j++) {
        expect(taskCreationEvents[0].args.preapproved[i].reward[j].nextToken).to.be.equal(preapproved[i].reward[j].nextToken);
        expect(taskCreationEvents[0].args.preapproved[i].reward[j].to).to.be.equal(preapproved[i].reward[j].to);
        expect(taskCreationEvents[0].args.preapproved[i].reward[j].amount).to.be.equal(preapproved[i].reward[j].amount);
      }
    }

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
    const applicationMetadata : ApplicationMetadata = {
      title: "Application",
      description: "I am the best",
      resources: [],
    };

    const taskApplication = await applyForTask({
      tasks: TasksExecutor,
      taskId: taskId,
      reward: reward,
      metadata: applicationMetadata,
    });
    const taskApplicationReceipt = await taskApplication.wait();
    if (!taskApplicationReceipt) {
      throw new Error();
    }
    const taskApplicationEvents = getEventsFromReceipt(taskApplicationReceipt, TasksManager.interface, "ApplicationCreated");
    expect(taskApplicationEvents).to.be.lengthOf(1);
    expect(taskApplicationEvents[0].args.taskId).to.be.equal(taskId);
    expect(taskApplicationEvents[0].args.applicationId).to.be.equal(BigInt(1));
    expect(await getFromIpfs(taskApplicationEvents[0].args.metadata)).to.be.deep.equal(applicationMetadata);
    for (let i = 0; i < reward.length; i++) {
      expect(taskApplicationEvents[0].args.reward[i].nextToken).to.be.equal(reward[i].nextToken);
      expect(taskApplicationEvents[0].args.reward[i].to).to.be.equal(reward[i].to);
      expect(taskApplicationEvents[0].args.reward[i].amount).to.be.equal(reward[i].amount);
    }
    expect(taskApplicationEvents[0].args.manager).to.be.equal(manager);
    expect(taskApplicationEvents[0].args.applicant).to.be.equal(executor);

    const applicationAcceptance = await acceptApplications({
      tasks: TasksManager,
      taskId: taskId,
      applications: [0, 1].map(BigInt),
    });
    const applicationAcceptanceReceipt = await applicationAcceptance.wait();
    if (!applicationAcceptanceReceipt) {
      throw new Error();
    }
    const applicationAcceptanceEvents = getEventsFromReceipt(applicationAcceptanceReceipt, TasksManager.interface, "ApplicationAccepted");
    expect(applicationAcceptanceEvents).to.be.lengthOf(2);
    expect(applicationAcceptanceEvents[0].args.taskId).to.be.equal(taskId);
    expect(applicationAcceptanceEvents[0].args.applicationId).to.be.equal(BigInt(0));
    expect(applicationAcceptanceEvents[0].args.manager).to.be.equal(manager);
    expect(applicationAcceptanceEvents[0].args.applicant).to.be.equal(preapprovedGuy);
    expect(applicationAcceptanceEvents[1].args.taskId).to.be.equal(taskId);
    expect(applicationAcceptanceEvents[1].args.applicationId).to.be.equal(BigInt(1));
    expect(applicationAcceptanceEvents[1].args.manager).to.be.equal(manager);
    expect(applicationAcceptanceEvents[1].args.applicant).to.be.equal(executor);

    const taskTake = await takeTask({
      tasks: TasksExecutor,
      taskId: taskId,
      application: BigInt(1),
    });
    const taskTakeReceipt = await taskTake.wait();
    if (!taskTakeReceipt) {
      throw new Error();
    }
    const taskTakeEvents = getEventsFromReceipt(taskTakeReceipt, TasksManager.interface, "TaskTaken");
    expect(taskTakeEvents).to.be.lengthOf(1);
    expect(taskTakeEvents[0].args.taskId).to.be.equal(taskId);
    expect(taskTakeEvents[0].args.applicationId).to.be.equal(BigInt(1));
    expect(taskTakeEvents[0].args.manager).to.be.equal(manager);
    expect(taskTakeEvents[0].args.executor).to.be.equal(executor);

    const submission : SubmissionMetadata = {
      fileName: "submision",
      fileFormat: ".sub",
      fileContent: "SUBMISSION",
    };
    const taskSubmisission = await createSubmission({
      tasks: TasksExecutor,
      taskId: taskId,
      metadata: submission,
    });
    const taskSubmisissionReceipt = await taskSubmisission.wait();
    if (!taskSubmisissionReceipt) {
      throw new Error();
    }
    const taskSubmisissionEvents = getEventsFromReceipt(taskSubmisissionReceipt, TasksManager.interface, "SubmissionCreated");
    expect(taskSubmisissionEvents).to.be.lengthOf(1);
    expect(taskSubmisissionEvents[0].args.taskId).to.be.equal(taskId);
    expect(taskSubmisissionEvents[0].args.submissionId).to.be.equal(BigInt(0));
    expect(await getFromIpfs(taskSubmisissionEvents[0].args.metadata)).to.be.deep.equal(submission);
    expect(taskSubmisissionEvents[0].args.manager).to.be.equal(manager);
    expect(taskSubmisissionEvents[0].args.executor).to.be.equal(executor);

    const judgementMetadata : SubmissionJudgementMetadata = {
      feedback: "Do better lol",
    };
    const submissionReview = await reviewSubmission({
      tasks: TasksManager,
      taskId: taskId,
      submissionId: BigInt(0),
      judgement: SubmissionJudgement.Rejected,
      judgementMetadata: judgementMetadata,
    });
    const submissionReviewReceipt = await submissionReview.wait();
    if (!submissionReviewReceipt) {
      throw new Error();
    }
    const submissionReviewEvents = getEventsFromReceipt(submissionReviewReceipt, TasksManager.interface, "SubmissionReviewed");
    expect(submissionReviewEvents).to.be.lengthOf(1);
    expect(submissionReviewEvents[0].args.taskId).to.be.equal(taskId);
    expect(submissionReviewEvents[0].args.submissionId).to.be.equal(BigInt(0));
    expect(submissionReviewEvents[0].args.judgement).to.be.equal(BigInt(SubmissionJudgement.Rejected));
    expect(await getFromIpfs(submissionReviewEvents[0].args.feedback)).to.be.deep.equal(judgementMetadata);
    expect(submissionReviewEvents[0].args.manager).to.be.equal(manager);
    expect(submissionReviewEvents[0].args.executor).to.be.equal(executor);

    const cancelReason : CancelTaskRequestMetadata = {
      explanation: "No faith",
    };
    const taskCancel = await cancelTask({
      tasks: TasksManager,
      taskId: taskId,
      explanation: cancelReason,
    });
    const taskCancelReceipt = await taskCancel.wait();
    if (!taskCancelReceipt) {
      throw new Error();
    }
    const taskCancelEvents = getEventsFromReceipt(taskCancelReceipt, TasksManager.interface, "CancelTaskRequested");
    expect(taskCancelEvents).to.be.lengthOf(1);
    expect(taskCancelEvents[0].args.taskId).to.be.equal(taskId);
    expect(taskCancelEvents[0].args.requestId).to.be.equal(BigInt(0));
    expect(await getFromIpfs(taskCancelEvents[0].args.explanation)).to.be.deep.equal(cancelReason);
    expect(taskCancelEvents[0].args.manager).to.be.equal(manager);
    expect(taskCancelEvents[0].args.executor).to.be.equal(executor);

    const requestAccept = await acceptRequest({
      tasks: TasksExecutor,
      taskId: taskId,
      requestType: RequestType.CancelTask,
      requestId: BigInt(0),
      execute: false,
    });
    const requestAcceptReceipt = await requestAccept.wait();
    if (!requestAcceptReceipt) {
      throw new Error();
    }
    const requestAcceptEvents = getEventsFromReceipt(requestAcceptReceipt, TasksManager.interface, "RequestAccepted");
    expect(requestAcceptEvents).to.be.lengthOf(1);
    expect(requestAcceptEvents[0].args.taskId).to.be.equal(taskId);
    expect(requestAcceptEvents[0].args.requestType).to.be.equal(BigInt(RequestType.CancelTask));
    expect(requestAcceptEvents[0].args.requestId).to.be.equal(BigInt(0));
    expect(requestAcceptEvents[0].args.manager).to.be.equal(manager);
    expect(requestAcceptEvents[0].args.executor).to.be.equal(executor);

    const requestExecute = await executeRequest({
      tasks: TasksManager.connect(funderSigner),
      taskId: taskId,
      requestType: RequestType.CancelTask,
      requestId: BigInt(0),
    });
    const requestExecuteReceipt = await requestExecute.wait();
    if (!requestExecuteReceipt) {
      throw new Error();
    }
    const requestExecuteEvents = getEventsFromReceipt(requestExecuteReceipt, TasksManager.interface, "RequestExecuted");
    expect(requestExecuteEvents).to.be.lengthOf(1);
    expect(requestExecuteEvents[0].args.taskId).to.be.equal(taskId);
    expect(requestExecuteEvents[0].args.requestType).to.be.equal(BigInt(RequestType.CancelTask));
    expect(requestExecuteEvents[0].args.requestId).to.be.equal(BigInt(0));
    expect(requestExecuteEvents[0].args.by).to.be.equal(funder);
    expect(requestExecuteEvents[0].args.manager).to.be.equal(manager);
    expect(requestExecuteEvents[0].args.executor).to.be.equal(executor);
    const taskCancelledEvents = getEventsFromReceipt(requestExecuteReceipt, TasksManager.interface, "TaskCancelled");
    expect(taskCancelledEvents).to.be.lengthOf(1);
    expect(taskCancelledEvents[0].args.taskId).to.be.equal(taskId);
    expect(taskCancelledEvents[0].args.manager).to.be.equal(manager);
    expect(taskCancelledEvents[0].args.executor).to.be.equal(executor);
  });
});
