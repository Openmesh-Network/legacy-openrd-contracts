import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { minutes } from "../utils/timeUnits";
import { TestSetup } from "./Helpers/TestSetup";

/// This class check if deployment itself does not throw any errors and allows you to customize the timeout for deployment.

describe("Deployment", function () {
  it("should deploy", async function () {
    await loadFixture(TestSetup);
  }).timeout(2 * minutes * 1000);
});
