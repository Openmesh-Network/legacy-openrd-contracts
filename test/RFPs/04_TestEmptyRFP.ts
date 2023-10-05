import { expect } from "chai";
import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { deployments, ethers, getNamedAccounts, getUnnamedAccounts } from "hardhat";
import { TestSetup } from "../Helpers/TestSetup";
import { ITasks } from "../../typechain-types";
import { createRFP } from "./00_TestCreateRFP";
import { DeployMockERC20 } from "../Helpers/MockERC20Helper";
import { Ether } from "../../utils/ethersUnits";
import { submitProject } from "./02_TestSubmitProject";

describe("Empty RFP", function () {
  it("should have emptied the budget", async function () {
    await loadFixture(TestSetup);
    const USDT = await DeployMockERC20();
    const WETH = await DeployMockERC20();
    const { manager } = await getNamedAccounts();
    const funder = manager;
    await USDT.increaseBalance(funder, Ether(5000));
    await WETH.increaseBalance(funder, Ether(3));
    const RFPsContract = await deployments.get("RFPs");
    await USDT.connect(await ethers.getSigner(funder)).approve(RFPsContract.address, Ether(5000));
    await WETH.connect(await ethers.getSigner(funder)).approve(RFPsContract.address, Ether(3));
    const budget: ITasks.ERC20TransferStruct[] = [
      { tokenContract: await USDT.getAddress(), amount: Ether(5000) },
      { tokenContract: await WETH.getAddress(), amount: Ether(3) },
    ];
    const RFP = await createRFP({ creator: funder, budget: budget });
    await RFP.RFPsManager.emptyRFP(RFP.rfpId);
    const RFPInfo = await RFP.RFPsManager.getRFP(RFP.rfpId);
    expect(await USDT.balanceOf(RFPInfo.escrow)).to.be.equal(0);
    expect(await WETH.balanceOf(RFPInfo.escrow)).to.be.equal(0);
  });

  it("should have emptied the native budget", async function () {
    await loadFixture(TestSetup);
    const nativeBudget = Ether(100);
    const RFP = await createRFP({ nativeBudget: nativeBudget });
    await RFP.RFPsManager.emptyRFP(RFP.rfpId);
    const RFPInfo = await RFP.RFPsManager.getRFP(RFP.rfpId);
    expect(await ethers.provider.getBalance(RFPInfo.escrow)).to.be.equal(0);
  });

  it("should have emptied the budget after one payout", async function () {
    await loadFixture(TestSetup);
    const USDT = await DeployMockERC20();
    const WETH = await DeployMockERC20();
    const { manager } = await getNamedAccounts();
    const funder = manager;
    await USDT.increaseBalance(funder, Ether(5000));
    await WETH.increaseBalance(funder, Ether(3));
    const RFPsContract = await deployments.get("RFPs");
    await USDT.connect(await ethers.getSigner(funder)).approve(RFPsContract.address, Ether(5000));
    await WETH.connect(await ethers.getSigner(funder)).approve(RFPsContract.address, Ether(3));
    const budget: ITasks.ERC20TransferStruct[] = [
      { tokenContract: await USDT.getAddress(), amount: Ether(5000) },
      { tokenContract: await WETH.getAddress(), amount: Ether(3) },
    ];
    const RFP = await createRFP({ creator: funder, budget: budget });
    const accounts = await getUnnamedAccounts();
    const reward: ITasks.RewardStruct[] = [
      {
        nextToken: false,
        to: accounts[0],
        amount: Ether(3000),
      },
      {
        nextToken: true,
        to: accounts[1],
        amount: Ether(500),
      },
      {
        nextToken: true,
        to: accounts[1],
        amount: Ether(1),
      },
    ];
    const projectId = await submitProject({ RFP: RFP.RFPsProject, rfpId: RFP.rfpId, reward: reward });
    await RFP.RFPsManager.acceptProject(RFP.rfpId, projectId);
    await RFP.RFPsManager.emptyRFP(RFP.rfpId);
    const RFPInfo = await RFP.RFPsManager.getRFP(RFP.rfpId);
    expect(await USDT.balanceOf(RFPInfo.escrow)).to.be.equal(0);
    expect(await WETH.balanceOf(RFPInfo.escrow)).to.be.equal(0);
  });

  it("should have the correct native reward", async function () {
    await loadFixture(TestSetup);
    const nativeBudget = Ether(100);
    const RFP = await createRFP({ nativeBudget: nativeBudget });
    const accounts = await getUnnamedAccounts();
    const nativeReward: ITasks.NativeRewardStruct[] = [
      {
        to: accounts[0],
        amount: Ether(50),
      },
      {
        to: accounts[1],
        amount: Ether(7),
      },
    ];
    const projectId = await submitProject({ RFP: RFP.RFPsProject, rfpId: RFP.rfpId, nativeReward: nativeReward });
    await RFP.RFPsManager.acceptProject(RFP.rfpId, projectId);
    await RFP.RFPsManager.emptyRFP(RFP.rfpId);
    const RFPInfo = await RFP.RFPsManager.getRFP(RFP.rfpId);
    expect(await ethers.provider.getBalance(RFPInfo.escrow)).to.be.equal(0);
  });

  it("should not be allowed by non-manager", async function () {
    await loadFixture(TestSetup);
    const RFP = await createRFP({});
    const tx = RFP.RFPsProject.emptyRFP(RFP.rfpId);
    await expect(tx).to.be.revertedWithCustomError(RFP.RFPsProject, "NotManager");
  });
});
