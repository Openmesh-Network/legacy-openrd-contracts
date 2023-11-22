import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { ethers, getUnnamedAccounts } from "hardhat";
import { VerifiedContributor } from "../../typechain-types";
import { TestSetup } from "../Helpers/TestSetup";
import { expect } from "chai";
import { asDepartment } from "../Helpers/ImpersonatedDAO";

export async function getVerifiedContributor() {
  await loadFixture(TestSetup);

  const NFT = await asDepartment<VerifiedContributor>(await ethers.getContract("NFT"), "management");

  return { NFT };
}

describe("Verified Contributor", function () {
  it("should be mintable by the management dao", async function () {
    const { NFT } = await loadFixture(getVerifiedContributor);

    const to = (await getUnnamedAccounts())[0];
    const id = 123;

    await NFT.mint(to, id);
    expect(await NFT.ownerOf(123)).to.be.equal(to);
  });

  it("should be burnable by the management dao", async function () {
    const { NFT } = await loadFixture(getVerifiedContributor);

    const to = (await getUnnamedAccounts())[0];
    const id = 123;

    await NFT.mint(to, id);
    await NFT.burn(id);
    await expect(NFT.ownerOf(123)).to.be.revertedWith("ERC721: invalid token ID");
  });

  it("should not be transferable by the management dao", async function () {
    // Although it can be achieved by burning the NFT and minting it to a new wallet
    const { NFT } = await loadFixture(getVerifiedContributor);

    const from = (await getUnnamedAccounts())[0];
    const to = (await getUnnamedAccounts())[1];
    const id = 123;

    await NFT.mint(from, id);
    const tx = NFT.transferFrom(from, to, id);
    await expect(tx).to.be.revertedWithCustomError(NFT, "NotTransferable");
  });

  it("should not be mintable by any wallet", async function () {
    const { NFT } = await loadFixture(getVerifiedContributor);

    const to = (await getUnnamedAccounts())[0];
    const id = 123;

    const tx = NFT.connect(await ethers.getSigner(to)).mint(to, id);
    await expect(tx).to.be.revertedWith(
      `AccessControl: account ${to.toLocaleLowerCase()} is missing role 0xfdf81848136595c31bb5f76217767372bc4bf906663038eb38381131ea27ecba`
    );
  });

  it("should be burnable by the any wallet", async function () {
    const { NFT } = await loadFixture(getVerifiedContributor);

    const to = (await getUnnamedAccounts())[0];
    const id = 123;

    await NFT.mint(to, id);
    const tx = NFT.connect(await ethers.getSigner(to)).burn(id);
    await expect(tx).to.be.revertedWith(
      `AccessControl: account ${to.toLowerCase()} is missing role 0x04c6a47ae7910ef8b295215a97e8495a9eaf57b7b05bfd8bf951edb3fd4a16a3`
    );
  });

  it("should not be transferable by the owner", async function () {
    const { NFT } = await loadFixture(getVerifiedContributor);

    const from = (await getUnnamedAccounts())[0];
    const to = (await getUnnamedAccounts())[1];
    const id = 123;

    await NFT.mint(from, id);
    const tx = NFT.connect(await ethers.getSigner(from)).transferFrom(from, to, id);
    await expect(tx).to.be.revertedWithCustomError(NFT, "NotTransferable");
  });
});
