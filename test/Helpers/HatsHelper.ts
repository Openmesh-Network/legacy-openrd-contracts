import { Hats } from "../../typechain-types";
import { getEventsFromLogs } from "../../utils/utils";

export async function createTopHat(hats: Hats, mintTo: string): Promise<bigint> {
  const tx = await hats.mintTopHat(mintTo, "", "");
  const receipt = await tx.wait();
  const hatCreationEvent = getEventsFromLogs(receipt?.logs, hats.interface, "HatCreated");
  const hatId = hatCreationEvent[0].args.id as bigint;
  return hatId;
}

export async function createHat(hats: Hats, adminHat: bigint, maxSupply: bigint, mintTo?: string[]): Promise<bigint> {
  const mockAddress = "0x0000000000000000000000000000000000004a75"; // I don't know why this is chosen, but this is what Hats uses in their own dApp
  const tx = await hats.createHat(adminHat, "", maxSupply, mockAddress, mockAddress, true, "");
  const receipt = await tx.wait();
  const hatCreationEvent = getEventsFromLogs(receipt?.logs, hats.interface, "HatCreated");
  const hatId = hatCreationEvent[0].args.id as bigint;
  if (mintTo) {
    for (let i = 0; i < mintTo.length; i++) {
      await hats.mintHat(hatId, mintTo[i]);
    }
  }
  return hatId;
}
