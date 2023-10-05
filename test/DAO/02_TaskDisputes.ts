import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { days, now } from "../../utils/timeUnits";
import { ethers, getNamedAccounts, getUnnamedAccounts } from "hardhat";
import { expect } from "chai";
import { TaskState } from "../../utils/taskTypes";
import { getTask } from "../../utils/taskHelper";
import { asyncMap, getInferfaceId } from "../../utils/utils";
import { asDepartment } from "../Helpers/ImpersonatedDAO";
import { DAO, OwnableERC721Enumerable, TaskDisputes, TokenListGovernance } from "../../typechain-types";
import { createTakenTaskFixture } from "../Tasks/00_TestTasksFixtures";
import { Gwei, Wei } from "../../utils/ethersUnits";

async function getDAO() {
  const task = await loadFixture(createTakenTaskFixture);
  const { deployer } = await getNamedAccounts();

  const DAO = (await ethers.getContract("dispute_dao", deployer)) as DAO;
  const TokenListGovernance = (await ethers.getContract("dispute_tokenListGovernance", deployer)) as TokenListGovernance;
  const TaskDisputes = (await ethers.getContract("dispute_taskDisputes", deployer)) as TaskDisputes;
  const NFT = await asDepartment<OwnableERC721Enumerable>(await ethers.getContract("NFT", deployer), "management");

  return { task, DAO, TokenListGovernance, TaskDisputes, NFT, deployer };
}

describe("Dispute DAO Task Disputes", function () {
  it("should allow creation of dispute proposals by anyone", async function () {
    const dao = await loadFixture(getDAO);
    const accounts = await getUnnamedAccounts();
    const tx = dao.TaskDisputes.connect(await ethers.getSigner(accounts[0])).createDispute("0x", 0, now() + 1 * days, dao.task.taskId, [], [], {
      value: await dao.TaskDisputes.getDisputeCost(),
    });
    await expect(tx).to.not.be.reverted;
  });

  it("should have closed the task after the proposal passes", async function () {
    const dao = await loadFixture(getDAO);
    const NFTs = [0].map(BigInt);
    await asyncMap(NFTs, async (n) => await dao.NFT.mint(dao.deployer, n));
    await dao.TaskDisputes.createDispute("0x", 0, now() + 1 * days, dao.task.taskId, [], [], {
      value: await dao.TaskDisputes.getDisputeCost(),
    });
    enum VoteOption {
      None,
      Abstain,
      Yes,
      No,
    }
    await asyncMap(NFTs, async (n) => await dao.TokenListGovernance.vote(BigInt(0), VoteOption.Yes, true, n));
    const taskInfo = await getTask({ tasks: dao.task.TasksManager, taskId: dao.task.taskId });
    expect(taskInfo.state).to.be.deep.equal(TaskState.Closed);
  });

  it("should have the right addresses", async function () {
    const dao = await loadFixture(getDAO);
    expect(await dao.TaskDisputes.getGovernanceContract()).to.be.equal(await dao.TokenListGovernance.getAddress());
    expect(await dao.TaskDisputes.getTasksContract()).to.be.equal(await dao.task.TasksManager.getAddress());
  });

  it("should allow the DAO to perform updates", async function () {
    const dao = await loadFixture(getDAO);
    const newGovernance = ethers.Wallet.createRandom().address;
    const newTasks = ethers.Wallet.createRandom().address;
    const newCost = Gwei(2700);

    const TasksDAO = await asDepartment<TaskDisputes>(dao.TaskDisputes, "dispute");
    await TasksDAO.updateGovernanceContract(newGovernance);
    await TasksDAO.updateTasksContract(newTasks);
    await TasksDAO.updateDisputeCost(newCost);

    expect(await dao.TaskDisputes.getGovernanceContract()).to.be.equal(newGovernance);
    expect(await dao.TaskDisputes.getTasksContract()).to.be.equal(newTasks);
    expect(await dao.TaskDisputes.getDisputeCost()).to.be.equal(newCost);
  });

  it("should not allow other addresses to perform updates", async function () {
    const dao = await loadFixture(getDAO);
    const newGovernance = ethers.Wallet.createRandom().address;
    const newTasks = ethers.Wallet.createRandom().address;
    const newCost = Gwei(2700);

    const tx1 = dao.TaskDisputes.updateGovernanceContract(newGovernance);
    const tx2 = dao.TaskDisputes.updateTasksContract(newTasks);
    const tx3 = dao.TaskDisputes.updateDisputeCost(newCost);

    await expect(tx1).to.be.reverted;
    await expect(tx2).to.be.reverted;
    await expect(tx3).to.be.reverted;
  });

  it("should not allow creation of dispute proposals without paying", async function () {
    const dao = await loadFixture(getDAO);
    const accounts = await getUnnamedAccounts();
    const tx = dao.TaskDisputes.connect(await ethers.getSigner(accounts[0])).createDispute("0x", 0, now() + 1 * days, dao.task.taskId, [], [], {
      value: (await dao.TaskDisputes.getDisputeCost()) - Wei(1),
    });
    await expect(tx).to.be.revertedWithCustomError(dao.TaskDisputes, "Underpaying");
  });

  it("should not allow second init", async function () {
    const dao = await loadFixture(getDAO);
    const tx = dao.TaskDisputes.initialize(dao.DAO, await dao.task.TasksManager.getAddress(), await dao.TokenListGovernance.getAddress(), 0);
    await expect(tx).to.be.revertedWith("Initializable: contract is already initialized");
  });

  it("should support the correct interfaces", async function () {
    const dao = await loadFixture(getDAO);
    expect(await dao.TaskDisputes.supportsInterface("0xffffffff")).to.be.false;
    const ITaskDrafts = await ethers.getContractAt("ITaskDisputes", ethers.ZeroAddress);
    expect(await dao.TaskDisputes.supportsInterface(getInferfaceId(ITaskDrafts.interface))).to.be.true;
    const IPlugin = await ethers.getContractAt("IPlugin", ethers.ZeroAddress);
    expect(await dao.TaskDisputes.supportsInterface(getInferfaceId(IPlugin.interface))).to.be.true;
    const IERC165 = await ethers.getContractAt("IERC165", ethers.ZeroAddress);
    expect(await dao.TaskDisputes.supportsInterface(getInferfaceId(IERC165.interface))).to.be.true;
  });
});
