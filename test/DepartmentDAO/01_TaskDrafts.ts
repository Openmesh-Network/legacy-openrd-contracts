import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { days, now } from "../../utils/timeUnits";
import { getDAO } from "./00_Governance";
import { ethers, getUnnamedAccounts } from "hardhat";
import { expect } from "chai";
import { TaskMetadata } from "../../utils/taskTypes";
import { addToIpfs } from "../../utils/ipfsHelper";
import { getTask } from "../../utils/taskHelper";
import { asyncMap, getInferfaceId } from "../../utils/utils";
import { ether } from "../../utils/ethersUnits";

describe("Department DAO Task Drafts", function () {
  it("should allow creation of draft task proposals by anyone", async function () {
    const dao = await loadFixture(getDAO);
    const accounts = await getUnnamedAccounts();
    const tx = dao.TaskDrafts.connect(await ethers.getSigner(accounts[0])).createDraftTask("0x", 0, now() + 2 * days, {
      metadata: "",
      deadline: now() + 10 * days,
      budget: [],
      manager: dao.deployer,
      preapproved: [],
    });
    await expect(tx).to.not.be.reverted;
  });

  it("should have the right metadata on the task after the proposal passes", async function () {
    const dao = await loadFixture(getDAO);
    const NFTs = [0, 1, 2].map(BigInt);
    await asyncMap(NFTs, async (n) => await dao.NFT.mint(dao.deployer, n));
    const metadata: TaskMetadata = {
      title: "Draft Task",
      description: "Draft Description",
      resources: [],
    };
    await dao.TaskDrafts.createDraftTask("0x", 0, now() + 2 * days, {
      metadata: await addToIpfs(JSON.stringify(metadata)),
      deadline: now() + 10 * days,
      budget: [],
      manager: dao.deployer,
      preapproved: [],
    });
    enum VoteOption {
      None,
      Abstain,
      Yes,
      No,
    }
    await asyncMap(NFTs, async (n) => await dao.TokenListGovernance.vote(BigInt(0), VoteOption.Yes, true, n));
    const taskInfo = await getTask({ tasks: dao.Tasks, taskId: BigInt(0) });
    expect(taskInfo.metadata).to.be.deep.equal(metadata);
  });

  it("should have the right addresses", async function () {
    const dao = await loadFixture(getDAO);
    expect(await dao.TaskDrafts.getGovernanceContract()).to.be.equal(await dao.TokenListGovernance.getAddress());
    expect(await dao.TaskDrafts.getTasksContract()).to.be.equal(await dao.Tasks.getAddress());
  });

  it("should allow the DAO to update the addresses", async function () {
    const dao = await loadFixture(getDAO);
    const newGovernance = ethers.ZeroAddress.substring(0, ethers.ZeroAddress.length - 1) + "1";
    const newTasks = ethers.ZeroAddress.substring(0, ethers.ZeroAddress.length - 1) + "2";

    const DAO = await dao.DAO.getAddress();
    (await ethers.getSigners())[0].sendTransaction({
      to: DAO,
      value: ether,
    });
    await dao.TaskDrafts.connect(await ethers.getImpersonatedSigner(DAO)).updateAddresses(newTasks, newGovernance);
    expect(await dao.TaskDrafts.getGovernanceContract()).to.be.equal(newGovernance);
    expect(await dao.TaskDrafts.getTasksContract()).to.be.equal(newTasks);
  });

  it("should not allow other addresses to update the addresses", async function () {
    const dao = await loadFixture(getDAO);
    const newGovernance = ethers.ZeroAddress.substring(0, ethers.ZeroAddress.length - 1) + "1";
    const newTasks = ethers.ZeroAddress.substring(0, ethers.ZeroAddress.length - 1) + "2";

    const tx = dao.TaskDrafts.updateAddresses(newTasks, newGovernance);
    await expect(tx).to.be.reverted;
  });

  it("should not allow second init", async function () {
    const dao = await loadFixture(getDAO);
    const tx = dao.TaskDrafts.initialize(dao.DAO, await dao.Tasks.getAddress(), await dao.TokenListGovernance.getAddress());
    await expect(tx).to.be.revertedWith("Initializable: contract is already initialized");
  });

  it("should support the correct interfaces", async function () {
    const dao = await loadFixture(getDAO);
    expect(await dao.TaskDrafts.supportsInterface("0xffffffff")).to.be.false;
    const ITaskDrafts = await ethers.getContractAt("ITaskDrafts", ethers.ZeroAddress);
    expect(await dao.TaskDrafts.supportsInterface(getInferfaceId(ITaskDrafts.interface))).to.be.true;
    const IPlugin = await ethers.getContractAt("IPlugin", ethers.ZeroAddress);
    expect(await dao.TaskDrafts.supportsInterface(getInferfaceId(IPlugin.interface))).to.be.true;
    const IERC165 = await ethers.getContractAt("IERC165", ethers.ZeroAddress);
    expect(await dao.TaskDrafts.supportsInterface(getInferfaceId(IERC165.interface))).to.be.true;
  });
});
