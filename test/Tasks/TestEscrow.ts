import { expect } from "chai";
import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { ethers, getNamedAccounts, getUnnamedAccounts } from "hardhat";
import { Escrow, Tasks } from "../../typechain-types";
import { CreateTaskSettings, createTask, createTaskTransaction, getTask } from "../../utils/taskHelper";
import { DeployMockERC20, GetBudgetItem } from "../Helpers/MockERC20Helper";
import { Ether, Gwei, Wei } from "../../utils/ethersUnits";
import { asyncMap } from "../../utils/utils";
import { ToBlockchainDate } from "../../utils/timeUnits";
import { TaskState } from "../../utils/taskTypes";
import { TestSetup } from "../Helpers/TestSetup";

export async function deployEscrow() {
    await loadFixture(TestSetup);
    const { deployer } = await getNamedAccounts();
    const Escrow = await ethers.deployContract("Escrow", await ethers.getImpersonatedSigner(deployer)) as any as Escrow;
    return Escrow;
}

export async function deployInitedEscrow() {
    const Escrow = await loadFixture(deployEscrow);
    const accounts = await getUnnamedAccounts();
    const EscrowOwner = Escrow.connect(await ethers.getImpersonatedSigner(accounts[0]));
    await EscrowOwner.__Escrow_init();
    return EscrowOwner;
}

describe("Escrow", function () {
  it("should not allow double init", async function () {
    const EscrowOwner = await loadFixture(deployInitedEscrow);
    expect(EscrowOwner.__Escrow_init()).to.be.revertedWithCustomError(EscrowOwner, "AlreadyInitialized"); 
  });

  it("should not allow anyone else to take funds", async function () {
    const EscrowOwner = await loadFixture(deployInitedEscrow);
    const accounts = await getUnnamedAccounts();
    const EscrowEve = EscrowOwner.connect(await ethers.getImpersonatedSigner(accounts[1]));
    expect(EscrowEve.transfer(ethers.ZeroAddress, ethers.ZeroAddress, BigInt(0))).to.be.revertedWithCustomError(EscrowOwner, "NotOwner"); 
  });
});
