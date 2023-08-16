import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { ethers, getNamedAccounts } from "hardhat";
import { DAO, IDAO, OwnableERC721Enumerable, TaskDrafts, Tasks, TokenListGovernance } from "../../typechain-types";
import { TestSetup } from "../Helpers/TestSetup";
import { expect } from "chai";
import { days, minutes, now } from "../../utils/timeUnits";
import { asDAO } from "../Helpers/ImpersonatedDAO";

export async function getDAO() {
  await loadFixture(TestSetup);
  const { deployer } = await getNamedAccounts();
  const department = "blockchain";

  const DAO = (await ethers.getContract(department + "_dao", deployer)) as DAO;
  const TokenListGovernance = (await ethers.getContract(department + "_tokenListGovernance", deployer)) as TokenListGovernance;
  const TaskDrafts = (await ethers.getContract(department + "_taskDrafts", deployer)) as TaskDrafts;
  const NFT = await asDAO<OwnableERC721Enumerable>(await ethers.getContract("NFT", deployer), "management");
  const Tasks = (await ethers.getContract("Tasks", deployer)) as Tasks;

  return { DAO, TokenListGovernance, TaskDrafts, NFT, deployer, Tasks, department };
}

describe("Department DAO Governance", function () {
  it("has members", async function () {
    const dao = await loadFixture(getDAO);
    expect(await dao.TokenListGovernance.isMember(0)).to.be.true;
  });

  it("reverts when no NFT", async function () {
    const dao = await loadFixture(getDAO);
    const metadata = ethers.toUtf8Bytes("0x");
    const actions: IDAO.ActionStruct[] = [];
    const start = now() + 30 * minutes;
    const end = now() + 2 * days;
    await expect(dao.TokenListGovernance.createProposal(metadata, actions, 0, start, end, 0, false, 0)).to.be.reverted;
  });

  it("allow when NFT", async function () {
    const dao = await loadFixture(getDAO);
    await dao.NFT.mint(dao.deployer, 0);
    const metadata = ethers.toUtf8Bytes("0x");
    const actions: IDAO.ActionStruct[] = [];
    const start = now() + 30 * minutes;
    const end = now() + 2 * days;
    await expect(dao.TokenListGovernance.createProposal(metadata, actions, 0, start, end, 0, false, 0)).to.not.be.reverted;
  });

  it("reverts when wrong NFT", async function () {
    const dao = await loadFixture(getDAO);
    await dao.NFT.mint(dao.deployer, 0);
    const metadata = ethers.toUtf8Bytes("0x");
    const actions: IDAO.ActionStruct[] = [];
    const start = now() + 30 * minutes;
    const end = now() + 2 * days;
    await expect(dao.TokenListGovernance.createProposal(metadata, actions, 0, start, end, 0, false, 1)).to.be.reverted;
  });

  it("reverts when not accepted NFT", async function () {
    const dao = await loadFixture(getDAO);
    await dao.NFT.mint(dao.deployer, 5);
    const metadata = ethers.toUtf8Bytes("0x");
    const actions: IDAO.ActionStruct[] = [];
    const start = now() + 30 * minutes;
    const end = now() + 2 * days;
    await expect(dao.TokenListGovernance.createProposal(metadata, actions, 0, start, end, 0, false, 5)).to.be.reverted;
  });

  it("allow when NFT accepted", async function () {
    const dao = await loadFixture(getDAO);
    await dao.NFT.mint(dao.deployer, 5);
    const TokenListGovernanceManagement = await asDAO<TokenListGovernance>(dao.TokenListGovernance, "management");
    await TokenListGovernanceManagement.addMembers([5]);
    const metadata = ethers.toUtf8Bytes("0x");
    const actions: IDAO.ActionStruct[] = [];
    const start = now() + 30 * minutes;
    const end = now() + 2 * days;
    await expect(dao.TokenListGovernance.createProposal(metadata, actions, 0, start, end, 0, false, 5)).to.not.be.reverted;
  });
});
