import { expect } from "chai";
import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { ethers, getNamedAccounts } from "hardhat";
import { Tasks } from "../../typechain-types";
import { CreateTaskSettings, createTask, createTaskTransaction, getTask } from "../../utils/taskHelper";
import { DeployMockERC20, GetBudgetItem } from "../Helpers/MockERC20Helper";
import { Ether, Gwei, Wei } from "../../utils/ethersUnits";
import { asyncMap } from "../../utils/utils";
import { ToBlockchainDate } from "../../utils/timeUnits";
import { TaskState } from "../../utils/taskTypes";
import { TestSetup } from "../Helpers/TestSetup";

describe("Create Task", function () {
  // Check if variables are set
  it("should have the correct metadata", async function () {
    await loadFixture(TestSetup);
    const { proposer } = await getNamedAccounts();
    const TasksProposer = await ethers.getContract("Tasks", proposer) as Tasks;
    const metadata = {
        title: "title",
        description: "description",
        resources: [{
            name: "Google",
            url: "https://www.google.com" //Normal website
        }, {
            name: "IPFS item",
            url: "ipfs://bafybeih6dsywniag6kub6ceeywcl2shxlzj5xtxndb5tsg3jvupy65654a" //ipfs.tech website
        }],
    };
    const createTaskSettings : CreateTaskSettings = {
        tasks: TasksProposer,
        metadata: metadata,
    };
    const { taskId } = await createTask(createTaskSettings);
    const task = await getTask({ tasks: TasksProposer, taskId: taskId });
    expect(task.metadata.title).to.be.equal(metadata.title);
    expect(task.metadata.description).to.be.equal(metadata.description);
    expect(task.metadata.resources).to.be.deep.equal(metadata.resources);
  });

  it("should have the correct deadline", async function () {
    await loadFixture(TestSetup);
    const { proposer } = await getNamedAccounts();
    const TasksProposer = await ethers.getContract("Tasks", proposer) as Tasks;
    const deadline = new Date();
    const createTaskSettings : CreateTaskSettings = {
        tasks: TasksProposer,
        deadline: deadline,
    };
    const { taskId } = await createTask(createTaskSettings);
    const task = await getTask({ tasks: TasksProposer, taskId: taskId });
    expect(ToBlockchainDate(task.deadline)).to.be.equal(ToBlockchainDate(deadline));
  });

  it("should have the correct budget", async function () {
    await loadFixture(TestSetup);
    const { proposer } = await getNamedAccounts();
    const TasksProposer = await ethers.getContract("Tasks", proposer) as Tasks;
    const amounts = [Wei(1), Wei(10), Gwei(1), Gwei(5), Ether(1), Ether(20), Ether(100), Ether(1337), Ether(1_000_000)];
    const budget = await asyncMap(amounts, a => GetBudgetItem(TasksProposer, a, proposer));
    const createTaskSettings : CreateTaskSettings = {
        tasks: TasksProposer,
        budget: budget,
    };
    const { taskId } = await createTask(createTaskSettings);
    const task = await getTask({ tasks: TasksProposer, taskId: taskId });
    for (let i = 0; i < budget.length; i++) {
        expect(task.budget[i].tokenContract).to.be.equal(budget[i].tokenContract);
        expect(task.budget[i].amount).to.be.equal(budget[i].amount);
    }
  });

  it("should have an escrow", async function () {
    await loadFixture(TestSetup);
    const { proposer } = await getNamedAccounts();
    const TasksProposer = await ethers.getContract("Tasks", proposer) as Tasks;
    const amounts = [Wei(1), Wei(10), Gwei(1), Gwei(5), Ether(1), Ether(20), Ether(100), Ether(1337), Ether(1_000_000)];
    const budget = await asyncMap(amounts, a => GetBudgetItem(TasksProposer, a, proposer));
    const createTaskSettings : CreateTaskSettings = {
        tasks: TasksProposer,
        budget: budget,
    };
    const { taskId } = await createTask(createTaskSettings);
    const task = await getTask({ tasks: TasksProposer, taskId: taskId });
    expect(task.escrow).to.not.be.equal(ethers.ZeroAddress);
  });

  it("should have transfered the budget funds to escrow", async function () {
    await loadFixture(TestSetup);
    const { proposer } = await getNamedAccounts();
    const TasksProposer = await ethers.getContract("Tasks", proposer) as Tasks;
    const amounts = [Wei(1), Wei(10), Gwei(1), Gwei(5), Ether(1), Ether(20), Ether(100), Ether(1337), Ether(1_000_000)];
    const budget = await asyncMap(amounts, a => GetBudgetItem(TasksProposer, a, proposer));
    const createTaskSettings : CreateTaskSettings = {
        tasks: TasksProposer,
        budget: budget,
    };
    const { taskId } = await createTask(createTaskSettings);
    const task = await getTask({ tasks: TasksProposer, taskId: taskId });
    for (let i = 0; i < budget.length; i++) {
        const ERC20 = await ethers.getContractAt("ERC20", budget[i].tokenContract);
        expect(await ERC20.balanceOf(task.escrow)).to.be.equal(budget[i].amount);
    }
  });

  it("should have the correct proposer", async function () {
    await loadFixture(TestSetup);
    const { proposer } = await getNamedAccounts();
    const TasksProposer = await ethers.getContract("Tasks", proposer) as Tasks;
    const createTaskSettings : CreateTaskSettings = {
        tasks: TasksProposer,
    };
    const { taskId } = await createTask(createTaskSettings);
    const task = await getTask({ tasks: TasksProposer, taskId: taskId });
    expect(task.proposer).to.be.equal(proposer);
  });

  it("should have the correct creation date", async function () {
    await loadFixture(TestSetup);
    const { proposer } = await getNamedAccounts();
    const TasksProposer = await ethers.getContract("Tasks", proposer) as Tasks;
    const createTaskSettings : CreateTaskSettings = {
        tasks: TasksProposer,
    };
    const { taskId, receipt } = await createTask(createTaskSettings);
    const task = await getTask({ tasks: TasksProposer, taskId: taskId });
    const creationBlock = await ethers.provider.getBlock(receipt.blockNumber);
    if (!creationBlock) {
        throw new Error();
    }
    expect(ToBlockchainDate(task.creationTimestamp)).to.be.equal(creationBlock.timestamp);
  });

  it("should be open", async function () {
    await loadFixture(TestSetup);
    const { proposer } = await getNamedAccounts();
    const TasksProposer = await ethers.getContract("Tasks", proposer) as Tasks;
    const createTaskSettings : CreateTaskSettings = {
        tasks: TasksProposer,
    };
    const { taskId } = await createTask(createTaskSettings);
    const task = await getTask({ tasks: TasksProposer, taskId: taskId });
    expect(task.state).to.be.equal(TaskState.Open);
  });
  
  //Check if variables are unset
  it("should have no applications", async function () {
    await loadFixture(TestSetup);
    const { proposer } = await getNamedAccounts();
    const TasksProposer = await ethers.getContract("Tasks", proposer) as Tasks;
    const createTaskSettings : CreateTaskSettings = {
        tasks: TasksProposer,
    };
    const { taskId } = await createTask(createTaskSettings);
    const task = await getTask({ tasks: TasksProposer, taskId: taskId });
    expect(task.applications).to.have.lengthOf(0);
  });

  it("should have no executor", async function () {
    await loadFixture(TestSetup);
    const { proposer } = await getNamedAccounts();
    const TasksProposer = await ethers.getContract("Tasks", proposer) as Tasks;
    const createTaskSettings : CreateTaskSettings = {
        tasks: TasksProposer,
    };
    const { taskId } = await createTask(createTaskSettings);
    const task = await getTask({ tasks: TasksProposer, taskId: taskId });
    expect(task.executorApplication).to.be.equal(0);
  });

  it("should have no executor confirmation", async function () {
    await loadFixture(TestSetup);
    const { proposer } = await getNamedAccounts();
    const TasksProposer = await ethers.getContract("Tasks", proposer) as Tasks;
    const createTaskSettings : CreateTaskSettings = {
        tasks: TasksProposer,
    };
    const { taskId } = await createTask(createTaskSettings);
    const task = await getTask({ tasks: TasksProposer, taskId: taskId });
    expect(ToBlockchainDate(task.executorConfirmationTimestamp)).to.be.equal(0);
  });

  it("should have no submissions", async function () {
    await loadFixture(TestSetup);
    const { proposer } = await getNamedAccounts();
    const TasksProposer = await ethers.getContract("Tasks", proposer) as Tasks;
    const createTaskSettings : CreateTaskSettings = {
        tasks: TasksProposer,
    };
    const { taskId } = await createTask(createTaskSettings);
    const task = await getTask({ tasks: TasksProposer, taskId: taskId });
    expect(task.submissions).to.have.lengthOf(0);
  });

  //Check for exploits
  it("should revert if budget not approved", async function () {
    await loadFixture(TestSetup);
    const { proposer } = await getNamedAccounts();
    const TasksProposer = await ethers.getContract("Tasks", proposer) as Tasks;
    const ERC20 = await DeployMockERC20(proposer);
    const amount = Ether(100);
    await ERC20.increaseBalance(proposer, amount);
    // No approve
    const createTaskSettings : CreateTaskSettings = {
        tasks: TasksProposer,
        budget: [{
            tokenContract: await ERC20.getAddress(),
            amount: amount,
        }]
    };
    const tx = createTaskTransaction(createTaskSettings);
    await expect(tx).to.be.revertedWith("ERC20: insufficient allowance")
  });
  
  it("should revert if balance lower than budget", async function () {
    await loadFixture(TestSetup);
    const { proposer } = await getNamedAccounts();
    const TasksProposer = await ethers.getContract("Tasks", proposer) as Tasks;
    const ERC20 = await DeployMockERC20(proposer);
    const amount = Ether(100);
    await ERC20.increaseBalance(proposer, amount-BigInt(1));
    await ERC20.approve(await TasksProposer.getAddress(), amount);
    const createTaskSettings : CreateTaskSettings = {
        tasks: TasksProposer,
        budget: [{
            tokenContract: await ERC20.getAddress(),
            amount: amount,
        }]
    };
    const tx = createTaskTransaction(createTaskSettings);
    await expect(tx).to.be.revertedWith("ERC20: transfer amount exceeds balance")
  });
});
