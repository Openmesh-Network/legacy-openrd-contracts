import { expect } from "chai";
import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { TestSetup } from "../Helpers/TestSetup";
import { createRFP } from "./00_TestCreateRFP";

describe("Get RFP", function () {
  it("should not allow an invalid RFP ID", async function () {
    await loadFixture(TestSetup);
    const RFP = await createRFP({});
    const tx = RFP.RFPsManager.getRFP(RFP.rfpId + BigInt(1));
    await expect(tx).to.be.revertedWithCustomError(RFP.RFPsManager, "RFPDoesNotExist");
  });

  it("should work for multiple RFPs in the right order", async function () {
    await loadFixture(TestSetup);
    const RFP1 = await createRFP({});
    const RFP2 = await createRFP({});
    const RFPInfos = await RFP1.RFPsManager.getRFPs([RFP1, RFP2].map((rfp) => rfp.rfpId));
    expect(RFPInfos).to.be.lengthOf(2);
    expect(await RFP1.RFPsManager.getRFP(RFP1.rfpId)).to.be.deep.equal(RFPInfos[0]);
    expect(await RFP1.RFPsManager.getRFP(RFP2.rfpId)).to.be.deep.equal(RFPInfos[1]);
  });

  it("should work for multiple RFPs in an alternate order", async function () {
    await loadFixture(TestSetup);
    const RFP1 = await createRFP({});
    const RFP2 = await createRFP({});
    const RFPInfos = await RFP1.RFPsManager.getRFPs([RFP2, RFP1].map((rfp) => rfp.rfpId));
    expect(RFPInfos).to.be.lengthOf(2);
    expect(await RFP1.RFPsManager.getRFP(RFP2.rfpId)).to.be.deep.equal(RFPInfos[0]);
    expect(await RFP1.RFPsManager.getRFP(RFP1.rfpId)).to.be.deep.equal(RFPInfos[1]);
  });
});
