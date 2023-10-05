import { expect } from "chai";
import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { deployments, ethers, getNamedAccounts, getUnnamedAccounts } from "hardhat";
import { TestSetup } from "../Helpers/TestSetup";
import { ITasks, RFPs } from "../../typechain-types";
import { days, minutes, now } from "../../utils/timeUnits";
import { asyncMap, getEventsFromLogs } from "../../utils/utils";
import { DeployMockERC20 } from "../Helpers/MockERC20Helper";
import { Ether, Gwei, Wei } from "../../utils/ethersUnits";

interface CreateRFPSettings {
  metadata?: string;
  deadline?: number;
  budget?: ITasks.ERC20TransferStruct[];
  nativeBudget?: bigint;
  creator?: string;
  tasksManager?: string;
  manager?: string;
  projectRepresentative?: string;
}
export async function createRFP(settings: CreateRFPSettings) {
  const { manager, executor } = await getNamedAccounts();
  const metadata = settings.metadata ?? "";
  const deadline = settings.deadline ?? now() + 10 * minutes;
  const budget = settings.budget ?? [];
  const nativeBudget = settings.nativeBudget ?? Wei(0);
  const creator = settings.creator ?? manager;
  const tasksManager = settings.tasksManager ?? manager;
  const rfpsManager = settings.manager ?? manager;
  const projectRepresentative = settings.projectRepresentative ?? executor;
  const RFPsCreator = (await ethers.getContract("RFPs", creator)) as RFPs;
  const RFPsManager = (await ethers.getContract("RFPs", rfpsManager)) as RFPs;
  const RFPsProject = (await ethers.getContract("RFPs", projectRepresentative)) as RFPs;
  const tx = await RFPsCreator.createRFP(metadata, deadline, budget, tasksManager, rfpsManager, { value: nativeBudget });
  const receipt = await tx.wait();
  const RFPCreationEvents = getEventsFromLogs(receipt?.logs, RFPsManager.interface, "RFPCreated");
  const rfpId = RFPCreationEvents[0].args.rfpId;
  return { RFPsManager, RFPsProject, rfpId };
}

describe("Create RFP", function () {
  it("should have increased the counter", async function () {
    await loadFixture(TestSetup);
    const RFP = await createRFP({});
    expect(await RFP.RFPsManager.rfpCount()).to.be.equal(1);
  });

  it("should have the correct metadata", async function () {
    await loadFixture(TestSetup);
    const metadata = "ipfs://bafybeifbgwvye7fkuqwhecpl4stnmnxizz4uhvwzd4wifpawwvfjc3b34a";
    const RFP = await createRFP({ metadata: metadata });
    const RFPInfo = await RFP.RFPsManager.getRFP(RFP.rfpId);
    expect(RFPInfo.metadata).to.be.equal(metadata);
  });

  it("should have the correct deadline", async function () {
    await loadFixture(TestSetup);
    const deadline = now() + 2 * days;
    const RFP = await createRFP({ deadline: deadline });
    const RFPInfo = await RFP.RFPsManager.getRFP(RFP.rfpId);
    expect(RFPInfo.deadline).to.be.equal(deadline);
  });

  it("should have the correct budget", async function () {
    await loadFixture(TestSetup);
    const { manager } = await getNamedAccounts();
    const funder = manager;
    const amounts = [Wei(1), Wei(100), Gwei(25), Ether(3)];
    const tokens = await asyncMap(amounts, async () => await DeployMockERC20());
    const RFPsContract = await deployments.get("RFPs");
    const budget: ITasks.ERC20TransferStruct[] = [];
    for (let i = 0; i < tokens.length; i++) {
      await tokens[i].increaseBalance(funder, amounts[i]);
      await tokens[i].connect(await ethers.getSigner(funder)).approve(RFPsContract.address, amounts[i]);
      budget.push({ tokenContract: await tokens[i].getAddress(), amount: amounts[i] });
    }
    const RFP = await createRFP({ creator: funder, budget: budget });
    const RFPInfo = await RFP.RFPsManager.getRFP(RFP.rfpId);
    for (let i = 0; i < tokens.length; i++) {
      expect(RFPInfo.budget[i]).to.be.equal(await tokens[i].getAddress());
      expect(await tokens[i].balanceOf(RFPInfo.escrow)).to.be.equal(amounts[i]);
      expect(await tokens[i].balanceOf(funder)).to.be.equal(0);
    }
  });

  it("should have the correct native budget", async function () {
    await loadFixture(TestSetup);
    const accounts = await getUnnamedAccounts();
    const creator = accounts[0];
    const nativeBudget = Ether(2);
    const RFP = await createRFP({ creator: creator, nativeBudget: nativeBudget });
    const RFPInfo = await RFP.RFPsManager.getRFP(RFP.rfpId);
    expect(RFPInfo.nativeBudget).to.be.equal(nativeBudget);
    expect(await ethers.provider.getBalance(RFPInfo.escrow)).to.be.equal(nativeBudget);
  });

  it("should have the correct creator", async function () {
    await loadFixture(TestSetup);
    const accounts = await getUnnamedAccounts();
    const creator = accounts[0];
    const RFP = await createRFP({ creator: creator });
    const RFPInfo = await RFP.RFPsManager.getRFP(RFP.rfpId);
    expect(RFPInfo.creator).to.be.equal(creator);
  });

  it("should have the correct manager", async function () {
    await loadFixture(TestSetup);
    const accounts = await getUnnamedAccounts();
    const manager = accounts[0];
    const RFP = await createRFP({ manager: manager });
    const RFPInfo = await RFP.RFPsManager.getRFP(RFP.rfpId);
    expect(RFPInfo.manager).to.be.equal(manager);
  });
});
