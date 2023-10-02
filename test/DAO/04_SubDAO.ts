import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { deployments, ethers, getNamedAccounts } from "hardhat";
import { DAO, DAOFactory, SubDAO } from "../../typechain-types";
import { TestSetup } from "../Helpers/TestSetup";
import { expect } from "chai";
import { getSubDAOSettings } from "../../deploy/80_DAO/utils/PluginSettings";
import { createDAO } from "../../deploy/80_DAO/utils/DAODeployer";
import { asDAO } from "../Helpers/ImpersonatedDAO";
import { getEventsFromLogs, getInferfaceId } from "../../utils/utils";

export async function getDAO() {
  await loadFixture(TestSetup);

  const { deployer } = await getNamedAccounts();

  const subdomain = "subdaoparent";
  const subDAOSettings = await getSubDAOSettings();

  const dao = await createDAO(deployer, subdomain, [subDAOSettings], deployments);
  const DAO = (await ethers.getContractAt("DAO", dao.daoAddress)) as any as DAO;
  const SubDAO = (await ethers.getContractAt("SubDAO", dao.pluginAddresses[0])) as any as SubDAO;

  return { DAO, SubDAO };
}

describe("Sub DAO", function () {
  it("should allow the DAO to be created", async function () {
    await loadFixture(getDAO);
  });

  it("should start empty", async function () {
    const dao = await loadFixture(getDAO);
    expect(await dao.SubDAO.getSubDAOs()).to.be.eql([]);
  });

  it("should allow the DAO to add addresses", async function () {
    const dao = await loadFixture(getDAO);
    const ImpersonatedSubDAO = await asDAO<SubDAO>(dao.SubDAO, dao.DAO);
    const [signer1, signer2, signer3] = await ethers.getSigners();
    const addresses = [signer1, signer2, signer3].map((s) => s.address);

    for (let i = 0; i < addresses.length; i++) {
      await ImpersonatedSubDAO.addSubDAO(addresses[i]);
      expect(await dao.SubDAO.getSubDAOCount()).to.be.equal(i + 1);
      const subDAOs = await dao.SubDAO.getSubDAOs();
      for (let j = 0; j < subDAOs.length; j++) {
        expect(subDAOs[j]).to.be.equal(addresses[j]);
      }
    }
  });

  it("should allow the DAO to remove addresses", async function () {
    const dao = await loadFixture(getDAO);
    const ImpersonatedSubDAO = await asDAO<SubDAO>(dao.SubDAO, dao.DAO);
    const [signer1, signer2, signer3] = await ethers.getSigners();
    let addresses = [signer1, signer2, signer3].map((s) => s.address);

    for (let i = 0; i < addresses.length; i++) {
      await ImpersonatedSubDAO.addSubDAO(addresses[i]);
    }

    expect(await dao.SubDAO.getSubDAOCount()).to.be.equal(3);
    const subDAOs = await dao.SubDAO.getSubDAOs();
    expect(subDAOs).to.be.lengthOf(3);
    for (let i = 0; i < addresses.length; i++) {
      expect(subDAOs).to.include(addresses[i]);
    }

    await ImpersonatedSubDAO.removeSubDAO(2);
    addresses = addresses.filter((_, i) => i != 2);
    expect(await dao.SubDAO.getSubDAOCount()).to.be.equal(2);
    const subDAOs2 = await dao.SubDAO.getSubDAOs();
    expect(subDAOs2).to.be.lengthOf(2);
    for (let i = 0; i < addresses.length; i++) {
      expect(subDAOs2).to.include(addresses[i]);
    }

    await ImpersonatedSubDAO.removeSubDAO(0);
    addresses = addresses.filter((_, i) => i != 0);
    expect(await dao.SubDAO.getSubDAOCount()).to.be.equal(1);
    const subDAOs3 = await dao.SubDAO.getSubDAOs();
    expect(subDAOs3).to.be.lengthOf(1);
    for (let i = 0; i < addresses.length; i++) {
      expect(subDAOs3).to.include(addresses[i]);
    }

    await ImpersonatedSubDAO.removeSubDAO(0);
    addresses = addresses.filter((_, i) => i != 0);
    expect(await dao.SubDAO.getSubDAOCount()).to.be.equal(0);
    const subDAOs4 = await dao.SubDAO.getSubDAOs();
    expect(subDAOs4).to.be.lengthOf(0);
  });

  it("should allow the DAO to create a new sub DAO", async function () {
    const dao = await loadFixture(getDAO);
    const ImpersonatedSubDAO = await asDAO<SubDAO>(dao.SubDAO, dao.DAO);
    const subDAOSettings = await getSubDAOSettings();
    const DAOFactory = await deployments.get("DAOFactory");
    const DAOSettings: DAOFactory.DAOSettingsStruct = {
      trustedForwarder: ethers.ZeroAddress,
      daoURI: "https://plopmenz.com",
      subdomain: "subdao",
      metadata: "0x",
    };

    const tx = await ImpersonatedSubDAO.createSubDAO(DAOFactory.address, DAOSettings, [subDAOSettings]);
    const receipt = await tx.wait();

    const daoRegistry = await ethers.getContract("DAORegistry");
    const daoAddress = getEventsFromLogs(receipt?.logs, daoRegistry.interface, "DAORegistered")[0].args.dao;

    expect(await dao.SubDAO.getSubDAOCount()).to.be.equal(1);
    const subDAOs = await dao.SubDAO.getSubDAOs();
    expect(subDAOs[0]).to.be.equal(daoAddress);
  });

  it("should not allow others to add addresses", async function () {
    const dao = await loadFixture(getDAO);
    const [signer1] = await ethers.getSigners();
    const tx = dao.SubDAO.addSubDAO(signer1.address);
    await expect(tx).to.be.reverted;
  });

  it("should not allow others to remove addresses", async function () {
    const dao = await loadFixture(getDAO);
    const ImpersonatedSubDAO = await asDAO<SubDAO>(dao.SubDAO, dao.DAO);
    const [signer1] = await ethers.getSigners();
    await ImpersonatedSubDAO.addSubDAO(signer1.address);
    const tx = dao.SubDAO.removeSubDAO(0);
    await expect(tx).to.be.reverted;
  });

  it("should not allow others to create sub DAOs", async function () {
    const dao = await loadFixture(getDAO);
    const subDAOSettings = await getSubDAOSettings();
    const DAOFactory = await deployments.get("DAOFactory");
    const DAOSettings: DAOFactory.DAOSettingsStruct = {
      trustedForwarder: ethers.ZeroAddress,
      daoURI: "https://plopmenz.com",
      subdomain: "subdao",
      metadata: "0x",
    };
    const tx = dao.SubDAO.createSubDAO(DAOFactory.address, DAOSettings, [subDAOSettings]);
    await expect(tx).to.be.reverted;
  });

  it("should not allow the DAO to remove on non-existing index", async function () {
    const dao = await loadFixture(getDAO);
    const ImpersonatedSubDAO = await asDAO<SubDAO>(dao.SubDAO, dao.DAO);
    const [signer1, signer2, signer3] = await ethers.getSigners();
    let addresses = [signer1, signer2, signer3].map((s) => s.address);

    for (let i = 0; i < addresses.length; i++) {
      await ImpersonatedSubDAO.addSubDAO(addresses[i]);
    }

    const tx = ImpersonatedSubDAO.removeSubDAO(3);
    await expect(tx).to.be.revertedWithCustomError(ImpersonatedSubDAO, "IndexOutOfBound");
  });

  it("should return the correct address on single get", async function () {
    const dao = await loadFixture(getDAO);
    const ImpersonatedSubDAO = await asDAO<SubDAO>(dao.SubDAO, dao.DAO);
    const [signer1, signer2, signer3] = await ethers.getSigners();
    const addresses = [signer1, signer2, signer3].map((s) => s.address);

    for (let i = 0; i < addresses.length; i++) {
      await ImpersonatedSubDAO.addSubDAO(addresses[i]);
    }

    for (let i = 0; i < addresses.length; i++) {
      expect(await ImpersonatedSubDAO.getSubDAO(i)).to.be.equal(addresses[i]);
    }
  });

  it("should revert on invalid index get", async function () {
    const dao = await loadFixture(getDAO);
    const ImpersonatedSubDAO = await asDAO<SubDAO>(dao.SubDAO, dao.DAO);
    const [signer1, signer2, signer3] = await ethers.getSigners();
    const addresses = [signer1, signer2, signer3].map((s) => s.address);

    for (let i = 0; i < addresses.length; i++) {
      await ImpersonatedSubDAO.addSubDAO(addresses[i]);
    }

    const tx = ImpersonatedSubDAO.getSubDAO(3);
    await expect(tx).to.be.revertedWithCustomError(ImpersonatedSubDAO, "IndexOutOfBound");
  });

  it("should not allow second init", async function () {
    const dao = await loadFixture(getDAO);
    const tx = dao.SubDAO.initialize(dao.DAO);
    await expect(tx).to.be.revertedWith("Initializable: contract is already initialized");
  });

  it("should support the correct interfaces", async function () {
    const dao = await loadFixture(getDAO);
    expect(await dao.SubDAO.supportsInterface("0xffffffff")).to.be.false;
    const ITaskDrafts = await ethers.getContractAt("ISubDAO", ethers.ZeroAddress);
    expect(await dao.SubDAO.supportsInterface(getInferfaceId(ITaskDrafts.interface))).to.be.true;
    const IPlugin = await ethers.getContractAt("IPlugin", ethers.ZeroAddress);
    expect(await dao.SubDAO.supportsInterface(getInferfaceId(IPlugin.interface))).to.be.true;
    const IERC165 = await ethers.getContractAt("IERC165", ethers.ZeroAddress);
    expect(await dao.SubDAO.supportsInterface(getInferfaceId(IERC165.interface))).to.be.true;
  });
});
