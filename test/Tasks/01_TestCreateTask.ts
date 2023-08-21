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
    const { manager } = await getNamedAccounts();
    const TasksManager = (await ethers.getContract("Tasks", manager)) as Tasks;
    const metadata = {
      title: "title",
      description: "description",
      resources: [
        {
          name: "Google",
          url: "https://www.google.com", //Normal website
        },
        {
          name: "IPFS item",
          url: "ipfs://bafybeih6dsywniag6kub6ceeywcl2shxlzj5xtxndb5tsg3jvupy65654a", //ipfs.tech website
        },
      ],
    };
    const createTaskSettings: CreateTaskSettings = {
      tasks: TasksManager,
      metadata: metadata,
    };
    const { taskId } = await createTask(createTaskSettings);
    const task = await getTask({ tasks: TasksManager, taskId: taskId });
    expect(task.metadata.title).to.be.equal(metadata.title);
    expect(task.metadata.description).to.be.equal(metadata.description);
    expect(task.metadata.resources).to.be.deep.equal(metadata.resources);
  });

  it("should have the correct deadline", async function () {
    await loadFixture(TestSetup);
    const { manager } = await getNamedAccounts();
    const TasksManager = (await ethers.getContract("Tasks", manager)) as Tasks;
    const deadline = new Date();
    const createTaskSettings: CreateTaskSettings = {
      tasks: TasksManager,
      deadline: deadline,
    };
    const { taskId } = await createTask(createTaskSettings);
    const task = await getTask({ tasks: TasksManager, taskId: taskId });
    expect(ToBlockchainDate(task.deadline)).to.be.equal(ToBlockchainDate(deadline));
  });

  it("should have the correct budget", async function () {
    await loadFixture(TestSetup);
    const { manager } = await getNamedAccounts();
    const TasksManager = (await ethers.getContract("Tasks", manager)) as Tasks;
    const amounts = [Wei(1), Wei(10), Gwei(1), Gwei(5), Ether(1), Ether(20), Ether(100), Ether(1337), Ether(1_000_000)];
    const budget = await asyncMap(amounts, (a) => GetBudgetItem(TasksManager, a, manager));
    const createTaskSettings: CreateTaskSettings = {
      tasks: TasksManager,
      budget: budget,
    };
    const { taskId } = await createTask(createTaskSettings);
    const task = await getTask({ tasks: TasksManager, taskId: taskId });
    for (let i = 0; i < budget.length; i++) {
      expect(task.budget[i].tokenContract).to.be.equal(budget[i].tokenContract);
      expect(task.budget[i].amount).to.be.equal(budget[i].amount);
    }
  });

  it("should have an escrow", async function () {
    await loadFixture(TestSetup);
    const { manager } = await getNamedAccounts();
    const TasksManager = (await ethers.getContract("Tasks", manager)) as Tasks;
    const amounts = [Wei(1), Wei(10), Gwei(1), Gwei(5), Ether(1), Ether(20), Ether(100), Ether(1337), Ether(1_000_000)];
    const budget = await asyncMap(amounts, (a) => GetBudgetItem(TasksManager, a, manager));
    const createTaskSettings: CreateTaskSettings = {
      tasks: TasksManager,
      budget: budget,
    };
    const { taskId } = await createTask(createTaskSettings);
    const task = await getTask({ tasks: TasksManager, taskId: taskId });
    expect(task.escrow).to.not.be.equal(ethers.ZeroAddress);
  });

  it("should have transfered the budget funds to escrow", async function () {
    await loadFixture(TestSetup);
    const { manager } = await getNamedAccounts();
    const TasksManager = (await ethers.getContract("Tasks", manager)) as Tasks;
    const amounts = [Wei(1), Wei(10), Gwei(1), Gwei(5), Ether(1), Ether(20), Ether(100), Ether(1337), Ether(1_000_000)];
    const budget = await asyncMap(amounts, (a) => GetBudgetItem(TasksManager, a, manager));
    const createTaskSettings: CreateTaskSettings = {
      tasks: TasksManager,
      budget: budget,
    };
    const { taskId } = await createTask(createTaskSettings);
    const task = await getTask({ tasks: TasksManager, taskId: taskId });
    for (let i = 0; i < budget.length; i++) {
      const ERC20 = await ethers.getContractAt("ERC20", budget[i].tokenContract);
      expect(await ERC20.balanceOf(task.escrow)).to.be.equal(budget[i].amount);
    }
  });

  it("should have the correct manager", async function () {
    await loadFixture(TestSetup);
    const { manager } = await getNamedAccounts();
    const TasksManager = (await ethers.getContract("Tasks", manager)) as Tasks;
    const createTaskSettings: CreateTaskSettings = {
      tasks: TasksManager,
    };
    const { taskId } = await createTask(createTaskSettings);
    const task = await getTask({ tasks: TasksManager, taskId: taskId });
    expect(task.manager).to.be.equal(manager);
  });

  it("should be open", async function () {
    await loadFixture(TestSetup);
    const { manager } = await getNamedAccounts();
    const TasksManager = (await ethers.getContract("Tasks", manager)) as Tasks;
    const createTaskSettings: CreateTaskSettings = {
      tasks: TasksManager,
    };
    const { taskId } = await createTask(createTaskSettings);
    const task = await getTask({ tasks: TasksManager, taskId: taskId });
    expect(task.state).to.be.equal(TaskState.Open);
  });

  it("should have the correct preapproved", async function () {
    await loadFixture(TestSetup);
    const { manager, executor } = await getNamedAccounts();
    const TasksManager = (await ethers.getContract("Tasks", manager)) as Tasks;
    const createTaskSettings: CreateTaskSettings = {
      tasks: TasksManager,
      preapproved: [
        {
          applicant: executor,
        },
      ],
    };
    const { taskId } = await createTask(createTaskSettings);
    const task = await getTask({ tasks: TasksManager, taskId: taskId });
    expect(task.state).to.be.equal(TaskState.Open);
    expect(task.applications).to.be.lengthOf(1);
    expect(task.applications[0].accepted).to.be.true;
    expect(task.applications[0].applicant).to.be.equal(executor);
  });

  //Check if variables are unset
  it("should have no applications", async function () {
    await loadFixture(TestSetup);
    const { manager } = await getNamedAccounts();
    const TasksManager = (await ethers.getContract("Tasks", manager)) as Tasks;
    const createTaskSettings: CreateTaskSettings = {
      tasks: TasksManager,
    };
    const { taskId } = await createTask(createTaskSettings);
    const task = await getTask({ tasks: TasksManager, taskId: taskId });
    expect(task.applications).to.have.lengthOf(0);
  });

  it("should have no executor", async function () {
    await loadFixture(TestSetup);
    const { manager } = await getNamedAccounts();
    const TasksManager = (await ethers.getContract("Tasks", manager)) as Tasks;
    const createTaskSettings: CreateTaskSettings = {
      tasks: TasksManager,
    };
    const { taskId } = await createTask(createTaskSettings);
    const task = await getTask({ tasks: TasksManager, taskId: taskId });
    expect(task.executorApplication).to.be.equal(0);
  });

  it("should have no submissions", async function () {
    await loadFixture(TestSetup);
    const { manager } = await getNamedAccounts();
    const TasksManager = (await ethers.getContract("Tasks", manager)) as Tasks;
    const createTaskSettings: CreateTaskSettings = {
      tasks: TasksManager,
    };
    const { taskId } = await createTask(createTaskSettings);
    const task = await getTask({ tasks: TasksManager, taskId: taskId });
    expect(task.submissions).to.have.lengthOf(0);
  });

  //Check for exploits
  it("should revert if budget not approved", async function () {
    await loadFixture(TestSetup);
    const { manager } = await getNamedAccounts();
    const TasksManager = (await ethers.getContract("Tasks", manager)) as Tasks;
    const ERC20 = await DeployMockERC20(manager);
    const amount = Ether(100);
    await ERC20.increaseBalance(manager, amount);
    // No approve
    const createTaskSettings: CreateTaskSettings = {
      tasks: TasksManager,
      budget: [
        {
          tokenContract: await ERC20.getAddress(),
          amount: amount,
        },
      ],
    };
    const tx = createTaskTransaction(createTaskSettings);
    await expect(tx).to.be.revertedWith("ERC20: insufficient allowance");
  });

  it("should revert if balance lower than budget", async function () {
    await loadFixture(TestSetup);
    const { manager } = await getNamedAccounts();
    const TasksManager = (await ethers.getContract("Tasks", manager)) as Tasks;
    const ERC20 = await DeployMockERC20(manager);
    const amount = Ether(100);
    await ERC20.increaseBalance(manager, amount - BigInt(1));
    await ERC20.approve(await TasksManager.getAddress(), amount);
    const createTaskSettings: CreateTaskSettings = {
      tasks: TasksManager,
      budget: [
        {
          tokenContract: await ERC20.getAddress(),
          amount: amount,
        },
      ],
    };
    const tx = createTaskTransaction(createTaskSettings);
    await expect(tx).to.be.revertedWith("ERC20: transfer amount exceeds balance");
  });

  it("should revert if preapproved higher than budget", async function () {
    await loadFixture(TestSetup);
    const { manager, executor } = await getNamedAccounts();
    const TasksManager = (await ethers.getContract("Tasks", manager)) as Tasks;
    const ERC20 = await DeployMockERC20(manager);
    const amount = Ether(100);
    await ERC20.increaseBalance(manager, amount);
    await ERC20.approve(await TasksManager.getAddress(), amount);
    const createTaskSettings: CreateTaskSettings = {
      tasks: TasksManager,
      budget: [
        {
          tokenContract: await ERC20.getAddress(),
          amount: amount,
        },
      ],
      preapproved: [
        {
          applicant: executor,
          reward: [
            {
              nextToken: true,
              to: executor,
              amount: amount + BigInt(1),
            },
          ],
        },
      ],
    };
    const tx = createTaskTransaction(createTaskSettings);
    await expect(tx).to.be.revertedWithCustomError(TasksManager, "RewardAboveBudget");
  });

  it("should revert if preapproved higher than native budget", async function () {
    await loadFixture(TestSetup);
    const { manager, executor } = await getNamedAccounts();
    const TasksManager = (await ethers.getContract("Tasks", manager)) as Tasks;
    const amount = Ether(100);
    const createTaskSettings: CreateTaskSettings = {
      tasks: TasksManager,
      nativeBudget: amount,
      preapproved: [
        {
          applicant: executor,
          nativeReward: [
            {
              to: executor,
              amount: amount + BigInt(1),
            },
          ],
        },
      ],
    };
    const tx = createTaskTransaction(createTaskSettings);
    await expect(tx).to.be.revertedWithCustomError(TasksManager, "RewardAboveBudget");
  });
});
