import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { ethers, getNamedAccounts, getUnnamedAccounts } from "hardhat";
import { DAO, VerifiedContributor, TaskDrafts, Tasks, TokenListGovernance, TokenVoting, OPEN } from "../../typechain-types";
import { TestSetup } from "../Helpers/TestSetup";
import { expect } from "chai";
import { asDepartment } from "../Helpers/ImpersonatedDAO";

export async function getDAO() {
  await loadFixture(TestSetup);
  const { deployer } = await getNamedAccounts();
  const department = "community";

  const DAO = (await ethers.getContract(department + "_dao", deployer)) as DAO;
  const TokenVoting = (await ethers.getContract(department + "_tokenVoting", deployer)) as TokenVoting;

  const accounts = await getUnnamedAccounts();
  const member = accounts[0];
  const notMember = accounts[1];

  const token = await asDepartment<OPEN>(await ethers.getContract("ERC20"), "community");
  await token.grantRole(ethers.keccak256(ethers.toUtf8Bytes("MINT")), await DAO.getAddress());
  await token.mint(member, 1);

  return { DAO, TokenVoting, member, notMember, token };
}

describe("Community DAO Voting", function () {
  it("should not require wrapping", async function () {
    const dao = await loadFixture(getDAO);
    expect(await dao.TokenVoting.isMember(dao.member)).to.be.true;
    expect(await dao.TokenVoting.isMember(dao.notMember)).to.be.false;
  });
});
