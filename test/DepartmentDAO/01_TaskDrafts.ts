import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { days, now } from "../../utils/timeUnits";
import { getDAO } from "./00_Governance";

describe("Department DAO Task Drafts", function () {
  it("should allow creation of draft task proposals", async function () {
    const dao = await loadFixture(getDAO);
    await dao.TaskDrafts.createDraftTask("0x", 0, now() + 2 * days, {
      metadata: "",
      deadline: now() + 10 * days,
      budget: [],
      manager: dao.deployer,
      preapproved: [],
    });
  });
});
