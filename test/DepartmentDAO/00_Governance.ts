import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { deployments, ethers, getNamedAccounts } from "hardhat";
import { IDAO, MockERC721, TokenListGovernance } from "../../typechain-types";
import { TestSetup } from "../Helpers/TestSetup";
import { getVar } from "../../utils/globalVars";
import { expect } from "chai";
import { days, minutes, now } from "../../utils/timeUnits";

export async function getDAO() {
  await loadFixture(TestSetup);
  const { deployer } = await getNamedAccounts();
  const signer = await ethers.getImpersonatedSigner(deployer);
  const daoInfo = JSON.parse(await getVar("department-test-0-test"));
  const TokenListGovernance = await ethers.getContractAt("TokenListGovernance", daoInfo.tokenListGovernance, signer) as any as TokenListGovernance;

  const nftInfo = deployments.get("NFT");
  const NFT = await ethers.getContractAt("MockERC721", (await nftInfo).address, signer) as any as MockERC721;

  return { TokenListGovernance, NFT, deployer };
}

describe("Department DAO Governance", function () {
  it("has members", async function () {
    const dao = await loadFixture(getDAO);
    expect(await dao.TokenListGovernance.isMember(0)).to.be.true;
  });
  
  it("reverts when no NFT", async function () {
    const dao = await loadFixture(getDAO);
    const metadata = ethers.toUtf8Bytes("0x");
    const actions : IDAO.ActionStruct[] = [];
    const start = now() + 30 * minutes;
    const end = now() + 2 * days;
    await expect(dao.TokenListGovernance.createProposal(metadata, actions, 0, start, end, 0, false, 0)).to.be.reverted;
  });
  
  it("allow when NFT", async function () {
    const dao = await loadFixture(getDAO);
    await dao.NFT.grantToken(dao.deployer, 0);
    const metadata = ethers.toUtf8Bytes("0x");
    const actions : IDAO.ActionStruct[] = [];
    const start = now() + 30 * minutes;
    const end = now() + 2 * days;
    await expect(dao.TokenListGovernance.createProposal(metadata, actions, 0, start, end, 0, false, 0)).to.not.be.reverted;
  });
  
  it("reverts when wrong NFT", async function () {
    const dao = await loadFixture(getDAO);
    await dao.NFT.grantToken(dao.deployer, 0);
    const metadata = ethers.toUtf8Bytes("0x");
    const actions : IDAO.ActionStruct[] = [];
    const start = now() + 30 * minutes;
    const end = now() + 2 * days;
    await expect(dao.TokenListGovernance.createProposal(metadata, actions, 0, start, end, 0, false, 1)).to.be.reverted;
  });
  
  it("reverts when not accepted NFT", async function () {
    const dao = await loadFixture(getDAO);
    await dao.NFT.grantToken(dao.deployer, 5);
    const metadata = ethers.toUtf8Bytes("0x");
    const actions : IDAO.ActionStruct[] = [];
    const start = now() + 30 * minutes;
    const end = now() + 2 * days;
    await expect(dao.TokenListGovernance.createProposal(metadata, actions, 0, start, end, 0, false, 5)).to.be.reverted;
  });
  
  it("allow when NFT accepted", async function () {
    const dao = await loadFixture(getDAO);
    await dao.NFT.grantToken(dao.deployer, 5);
    await dao.TokenListGovernance.addMembers([5]);
    const metadata = ethers.toUtf8Bytes("0x");
    const actions : IDAO.ActionStruct[] = [];
    const start = now() + 30 * minutes;
    const end = now() + 2 * days;
    await expect(dao.TokenListGovernance.createProposal(metadata, actions, 0, start, end, 0, false, 5)).to.not.be.reverted;
  });
});
