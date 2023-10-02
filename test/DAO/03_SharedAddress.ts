import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { deployments, ethers, getNamedAccounts, getUnnamedAccounts } from "hardhat";
import { DAO, Hats, IDAO, SharedAddress } from "../../typechain-types";
import { TestSetup } from "../Helpers/TestSetup";
import { expect } from "chai";
import { getSharedAddressSettings } from "../../deploy/80_DAO/utils/PluginSettings";
import { createDAO } from "../../deploy/80_DAO/utils/DAODeployer";
import { DeployMockERC20 } from "../Helpers/MockERC20Helper";
import { Ether } from "../../utils/ethersUnits";
import { createHat, createTopHat } from "../Helpers/HatsHelper";
import { asDAO } from "../Helpers/ImpersonatedDAO";
import { getInferfaceId } from "../../utils/utils";

export async function getDAO() {
  await loadFixture(TestSetup);

  const { deployer } = await getNamedAccounts();

  const subdomain = "sharedaddressdao";
  const sharedAddressSettings = await getSharedAddressSettings();

  const dao = await createDAO(deployer, subdomain, [sharedAddressSettings], deployments);
  const DAO = (await ethers.getContractAt("DAO", dao.daoAddress)) as any as DAO;
  const SharedAddress = (await ethers.getContractAt("SharedAddress", dao.pluginAddresses[0])) as any as SharedAddress;

  const ERC20 = await DeployMockERC20();
  const ERC20Balance = Ether(100);
  await ERC20.increaseBalance(await DAO.getAddress(), ERC20Balance);

  const Hats = (await ethers.getContract("Hats")) as Hats;
  const hatId = await createTopHat(Hats, deployer);
  const ImpersonatedSharedAddress = await asDAO<SharedAddress>(SharedAddress, DAO);
  await ImpersonatedSharedAddress.grantFullAccess(hatId);

  return { DAO, SharedAddress, Hats, hatId, deployer, ERC20, ERC20Balance };
}

describe("Shared Address", function () {
  describe("Full access", function () {
    it("should allow the DAO to be created", async function () {
      await loadFixture(getDAO);
    });

    it("should allow the admin to do an ERC20 transfer", async function () {
      const dao = await loadFixture(getDAO);
      const action: IDAO.ActionStruct = {
        to: await dao.ERC20.getAddress(),
        value: 0,
        data: dao.ERC20.interface.encodeFunctionData("transfer", [dao.deployer, dao.ERC20Balance]),
      };
      const tx = dao.SharedAddress.asDAO(dao.hatId, [action], 0);
      await expect(tx).to.not.be.reverted;
    });

    it("should not allow the admin to do an ERC20 transfer after revoke", async function () {
      const dao = await loadFixture(getDAO);
      const ImpersonatedSharedAddress = await asDAO<SharedAddress>(dao.SharedAddress, dao.DAO);
      await ImpersonatedSharedAddress.revokeFullAccess(dao.hatId);
      const action: IDAO.ActionStruct = {
        to: await dao.ERC20.getAddress(),
        value: 0,
        data: dao.ERC20.interface.encodeFunctionData("transfer", [dao.deployer, dao.ERC20Balance]),
      };
      const tx = dao.SharedAddress.asDAO(dao.hatId, [action], 0);
      await expect(tx).to.be.reverted;
    });

    it("should allow the admin to do an ERC20 approve", async function () {
      const dao = await loadFixture(getDAO);
      const action: IDAO.ActionStruct = {
        to: await dao.ERC20.getAddress(),
        value: 0,
        data: dao.ERC20.interface.encodeFunctionData("approve", [dao.deployer, dao.ERC20Balance]),
      };
      const tx = dao.SharedAddress.asDAO(dao.hatId, [action], 0);
      await expect(tx).to.not.be.reverted;
    });

    it("should allow the admin to do a different ERC20 transfer", async function () {
      const dao = await loadFixture(getDAO);
      const differentZone = await DeployMockERC20();
      await differentZone.increaseBalance(await dao.DAO.getAddress(), dao.ERC20Balance);
      const action: IDAO.ActionStruct = {
        to: await differentZone.getAddress(),
        value: 0,
        data: dao.ERC20.interface.encodeFunctionData("transfer", [dao.deployer, dao.ERC20Balance]),
      };
      const tx = dao.SharedAddress.asDAO(dao.hatId, [action], 0);
      await expect(tx).to.not.be.reverted;
    });

    it("should not allow other hats to do an ERC20 transfer", async function () {
      const dao = await loadFixture(getDAO);
      const accounts = await getUnnamedAccounts();
      const SharedAddress = dao.SharedAddress.connect(await ethers.getSigner(accounts[0]));
      const action: IDAO.ActionStruct = {
        to: await dao.ERC20.getAddress(),
        value: 0,
        data: dao.ERC20.interface.encodeFunctionData("transfer", [dao.deployer, dao.ERC20Balance]),
      };
      const hatId = await createTopHat(dao.Hats, accounts[0]);

      const tx = SharedAddress.asDAO(hatId, [action], 0);
      await expect(tx).to.be.revertedWithCustomError(SharedAddress, "AccessDenied");
    });

    it("should not allow non hat wearers to do an ERC20 transfer", async function () {
      const dao = await loadFixture(getDAO);
      const accounts = await getUnnamedAccounts();
      const SharedAddress = dao.SharedAddress.connect(await ethers.getSigner(accounts[0]));
      const action: IDAO.ActionStruct = {
        to: await dao.ERC20.getAddress(),
        value: 0,
        data: dao.ERC20.interface.encodeFunctionData("transfer", [dao.deployer, dao.ERC20Balance]),
      };
      const tx = SharedAddress.asDAO(dao.hatId, [action], 0);
      await expect(tx).to.be.revertedWithCustomError(SharedAddress, "NotWearingHat");
    });
  });

  describe("Full zone access", function () {
    it("should allow the hat to do an ERC20 transfer", async function () {
      const dao = await loadFixture(getDAO);
      const accounts = await getUnnamedAccounts();
      const SharedAddress = dao.SharedAddress.connect(await ethers.getSigner(accounts[0]));
      const zoneHat = await createHat(dao.Hats, dao.hatId, BigInt(1), [accounts[0]]);
      const zone = await dao.ERC20.getAddress();
      const ImpersonatedSharedAddress = await asDAO<SharedAddress>(dao.SharedAddress, dao.DAO);
      await ImpersonatedSharedAddress.grantFullZoneAccess(zoneHat, zone);
      const action: IDAO.ActionStruct = {
        to: zone,
        value: 0,
        data: dao.ERC20.interface.encodeFunctionData("transfer", [dao.deployer, dao.ERC20Balance]),
      };
      const tx = SharedAddress.asDAO(zoneHat, [action], 0);
      await expect(tx).to.not.be.reverted;
    });

    it("should not allow the hat to do an ERC20 transfer after revoke", async function () {
      const dao = await loadFixture(getDAO);
      const accounts = await getUnnamedAccounts();
      const SharedAddress = dao.SharedAddress.connect(await ethers.getSigner(accounts[0]));
      const zoneHat = await createHat(dao.Hats, dao.hatId, BigInt(1), [accounts[0]]);
      const zone = await dao.ERC20.getAddress();
      const ImpersonatedSharedAddress = await asDAO<SharedAddress>(dao.SharedAddress, dao.DAO);
      await ImpersonatedSharedAddress.grantFullZoneAccess(zoneHat, zone);
      await ImpersonatedSharedAddress.revokeFullZoneAccess(zoneHat, zone);
      const action: IDAO.ActionStruct = {
        to: zone,
        value: 0,
        data: dao.ERC20.interface.encodeFunctionData("transfer", [dao.deployer, dao.ERC20Balance]),
      };
      const tx = SharedAddress.asDAO(zoneHat, [action], 0);
      await expect(tx).to.be.reverted;
    });

    it("should allow the hat to do an ERC20 approve", async function () {
      const dao = await loadFixture(getDAO);
      const accounts = await getUnnamedAccounts();
      const SharedAddress = dao.SharedAddress.connect(await ethers.getSigner(accounts[0]));
      const zoneHat = await createHat(dao.Hats, dao.hatId, BigInt(1), [accounts[0]]);
      const zone = await dao.ERC20.getAddress();
      const ImpersonatedSharedAddress = await asDAO<SharedAddress>(dao.SharedAddress, dao.DAO);
      await ImpersonatedSharedAddress.grantFullZoneAccess(zoneHat, zone);
      const action: IDAO.ActionStruct = {
        to: zone,
        value: 0,
        data: dao.ERC20.interface.encodeFunctionData("approve", [dao.deployer, dao.ERC20Balance]),
      };
      const tx = SharedAddress.asDAO(zoneHat, [action], 0);
      await expect(tx).to.not.be.reverted;
    });

    it("should not allow the hat to do a different ERC20 transfer", async function () {
      const dao = await loadFixture(getDAO);
      const accounts = await getUnnamedAccounts();
      const SharedAddress = dao.SharedAddress.connect(await ethers.getSigner(accounts[0]));
      const zoneHat = await createHat(dao.Hats, dao.hatId, BigInt(1), [accounts[0]]);
      const zone = await dao.ERC20.getAddress();
      const ImpersonatedSharedAddress = await asDAO<SharedAddress>(dao.SharedAddress, dao.DAO);
      await ImpersonatedSharedAddress.grantFullZoneAccess(zoneHat, zone);
      const differentZone = await DeployMockERC20();
      await differentZone.increaseBalance(await dao.DAO.getAddress(), dao.ERC20Balance);
      const action: IDAO.ActionStruct = {
        to: await differentZone.getAddress(),
        value: 0,
        data: dao.ERC20.interface.encodeFunctionData("transfer", [dao.deployer, dao.ERC20Balance]),
      };
      const tx = SharedAddress.asDAO(zoneHat, [action], 0);
      await expect(tx).to.be.revertedWithCustomError(SharedAddress, "AccessDenied");
    });
  });

  describe("Full function access", function () {
    it("should allow the hat to do an ERC20 transfer", async function () {
      const dao = await loadFixture(getDAO);
      const accounts = await getUnnamedAccounts();
      const SharedAddress = dao.SharedAddress.connect(await ethers.getSigner(accounts[0]));
      const zoneHat = await createHat(dao.Hats, dao.hatId, BigInt(1), [accounts[0]]);
      const zone = await dao.ERC20.getAddress();
      const ImpersonatedSharedAddress = await asDAO<SharedAddress>(dao.SharedAddress, dao.DAO);
      await ImpersonatedSharedAddress.grantFullFunctionAccess(zoneHat, zone, dao.ERC20.interface.getFunction("transfer").selector);
      const action: IDAO.ActionStruct = {
        to: zone,
        value: 0,
        data: dao.ERC20.interface.encodeFunctionData("transfer", [dao.deployer, dao.ERC20Balance]),
      };
      const tx = SharedAddress.asDAO(zoneHat, [action], 0);
      await expect(tx).to.not.be.reverted;
    });

    it("should not allow the hat to do an ERC20 transfer after revoke", async function () {
      const dao = await loadFixture(getDAO);
      const accounts = await getUnnamedAccounts();
      const SharedAddress = dao.SharedAddress.connect(await ethers.getSigner(accounts[0]));
      const zoneHat = await createHat(dao.Hats, dao.hatId, BigInt(1), [accounts[0]]);
      const zone = await dao.ERC20.getAddress();
      const ImpersonatedSharedAddress = await asDAO<SharedAddress>(dao.SharedAddress, dao.DAO);
      await ImpersonatedSharedAddress.grantFullFunctionAccess(zoneHat, zone, dao.ERC20.interface.getFunction("transfer").selector);
      await ImpersonatedSharedAddress.revokeFullFunctionAccess(zoneHat, zone, dao.ERC20.interface.getFunction("transfer").selector);
      const action: IDAO.ActionStruct = {
        to: zone,
        value: 0,
        data: dao.ERC20.interface.encodeFunctionData("transfer", [dao.deployer, dao.ERC20Balance]),
      };
      const tx = SharedAddress.asDAO(zoneHat, [action], 0);
      await expect(tx).to.be.reverted;
    });

    it("should not allow the hat to do an ERC20 approve", async function () {
      const dao = await loadFixture(getDAO);
      const accounts = await getUnnamedAccounts();
      const SharedAddress = dao.SharedAddress.connect(await ethers.getSigner(accounts[0]));
      const zoneHat = await createHat(dao.Hats, dao.hatId, BigInt(1), [accounts[0]]);
      const zone = await dao.ERC20.getAddress();
      const ImpersonatedSharedAddress = await asDAO<SharedAddress>(dao.SharedAddress, dao.DAO);
      await ImpersonatedSharedAddress.grantFullFunctionAccess(zoneHat, zone, dao.ERC20.interface.getFunction("transfer").selector);
      const action: IDAO.ActionStruct = {
        to: zone,
        value: 0,
        data: dao.ERC20.interface.encodeFunctionData("approve", [dao.deployer, dao.ERC20Balance]),
      };
      const tx = SharedAddress.asDAO(zoneHat, [action], 0);
      await expect(tx).to.be.revertedWithCustomError(SharedAddress, "AccessDenied");
    });

    it("should not allow the hat to do a different ERC20 transfer", async function () {
      const dao = await loadFixture(getDAO);
      const accounts = await getUnnamedAccounts();
      const SharedAddress = dao.SharedAddress.connect(await ethers.getSigner(accounts[0]));
      const zoneHat = await createHat(dao.Hats, dao.hatId, BigInt(1), [accounts[0]]);
      const zone = await dao.ERC20.getAddress();
      const ImpersonatedSharedAddress = await asDAO<SharedAddress>(dao.SharedAddress, dao.DAO);
      await ImpersonatedSharedAddress.grantFullFunctionAccess(zoneHat, zone, dao.ERC20.interface.getFunction("transfer").selector);
      const differentZone = await DeployMockERC20();
      await differentZone.increaseBalance(await dao.DAO.getAddress(), dao.ERC20Balance);
      const action: IDAO.ActionStruct = {
        to: await differentZone.getAddress(),
        value: 0,
        data: dao.ERC20.interface.encodeFunctionData("transfer", [dao.deployer, dao.ERC20Balance]),
      };
      const tx = SharedAddress.asDAO(zoneHat, [action], 0);
      await expect(tx).to.be.revertedWithCustomError(SharedAddress, "AccessDenied");
    });
  });

  describe("Granting/Revoking", async function () {
    it("should not allow others to grant permissions", async function () {
      const dao = await loadFixture(getDAO);
      const accounts = await getUnnamedAccounts();
      const zone = await dao.ERC20.getAddress();
      const func = dao.ERC20.interface.getFunction("transfer").selector;

      const tx = dao.SharedAddress.grantFullAccess(accounts[0]);
      await expect(tx).to.be.reverted;

      const tx2 = dao.SharedAddress.grantFullZoneAccess(accounts[0], zone);
      await expect(tx2).to.be.reverted;

      const tx3 = dao.SharedAddress.grantFullFunctionAccess(accounts[0], zone, func);
      await expect(tx3).to.be.reverted;
    });

    it("should not allow others to grant permissions", async function () {
      const dao = await loadFixture(getDAO);
      const accounts = await getUnnamedAccounts();
      const zone = await dao.ERC20.getAddress();
      const func = dao.ERC20.interface.getFunction("transfer").selector;

      const tx = dao.SharedAddress.revokeFullAccess(accounts[0]);
      await expect(tx).to.be.reverted;

      const tx2 = dao.SharedAddress.revokeFullZoneAccess(accounts[0], zone);
      await expect(tx2).to.be.reverted;

      const tx3 = dao.SharedAddress.revokeFullFunctionAccess(accounts[0], zone, func);
      await expect(tx3).to.be.reverted;
    });
  });

  it("should not allow second init", async function () {
    const dao = await loadFixture(getDAO);
    const tx = dao.SharedAddress.initialize(dao.DAO, (await deployments.get("Hats")).address);
    await expect(tx).to.be.revertedWith("Initializable: contract is already initialized");
  });

  it("should support the correct interfaces", async function () {
    const dao = await loadFixture(getDAO);
    expect(await dao.SharedAddress.supportsInterface("0xffffffff")).to.be.false;
    const ITaskDrafts = await ethers.getContractAt("ISharedAddress", ethers.ZeroAddress);
    expect(await dao.SharedAddress.supportsInterface(getInferfaceId(ITaskDrafts.interface))).to.be.true;
    const IPlugin = await ethers.getContractAt("IPlugin", ethers.ZeroAddress);
    expect(await dao.SharedAddress.supportsInterface(getInferfaceId(IPlugin.interface))).to.be.true;
    const IERC165 = await ethers.getContractAt("IERC165", ethers.ZeroAddress);
    expect(await dao.SharedAddress.supportsInterface(getInferfaceId(IERC165.interface))).to.be.true;
  });
});
