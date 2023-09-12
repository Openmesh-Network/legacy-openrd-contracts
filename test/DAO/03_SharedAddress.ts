import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { deployments, ethers, getNamedAccounts, getUnnamedAccounts } from "hardhat";
import { DAO, IDAO, SharedAddress } from "../../typechain-types";
import { TestSetup } from "../Helpers/TestSetup";
import { expect } from "chai";
import { getSharedAddressSettings } from "../../deploy/04_DAO/utils/PluginSettings";
import { createDAO } from "../../deploy/04_DAO/utils/DAODeployer";
import { DeployMockERC20 } from "../Helpers/MockERC20Helper";
import { Ether } from "../../utils/ethersUnits";

export async function getDAO() {
  await loadFixture(TestSetup);

  const { deployer } = await getNamedAccounts();

  const subdomain = "sharedaddressdao";
  const sharedAddressSettings = await getSharedAddressSettings(deployer);

  const dao = await createDAO(deployer, subdomain, [sharedAddressSettings], deployments);
  const DAO = (await ethers.getContractAt("DAO", dao.daoAddress)) as any as DAO;
  const SharedAddress = (await ethers.getContractAt("SharedAddress", dao.pluginAddresses[0])) as any as SharedAddress;

  const ERC20 = await DeployMockERC20();
  const ERC20Balance = Ether(100);
  await ERC20.increaseBalance(await DAO.getAddress(), ERC20Balance);

  return { DAO, SharedAddress, deployer, ERC20, ERC20Balance };
}

describe("Shared Address", function () {
  it("should allow the DAO to be created", async function () {
    await loadFixture(getDAO);
  });

  it("should allow the admin to do any action", async function () {
    const dao = await loadFixture(getDAO);
    const action: IDAO.ActionStruct = {
      to: await dao.ERC20.getAddress(),
      value: 0,
      data: dao.ERC20.interface.encodeFunctionData("transfer", [dao.deployer, dao.ERC20Balance]),
    };
    const tx = dao.SharedAddress.asDAO([action], 0);
    await expect(tx).to.not.be.reverted;
  });

  it("should not allow anyone else to do any action", async function () {
    const dao = await loadFixture(getDAO);
    const accounts = await getUnnamedAccounts();
    const SharedAddress = dao.SharedAddress.connect(await ethers.getSigner(accounts[0]));
    const action: IDAO.ActionStruct = {
      to: await dao.ERC20.getAddress(),
      value: 0,
      data: dao.ERC20.interface.encodeFunctionData("transfer", [dao.deployer, dao.ERC20Balance]),
    };
    const tx = SharedAddress.asDAO([action], 0);
    await expect(tx).to.be.revertedWithCustomError(SharedAddress, "AccessDenied");
  });
});
