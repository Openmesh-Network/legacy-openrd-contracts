import { getBool } from "../utils/globalVars";
import { asyncFilter } from "../utils/utils";

export async function redeployedDependencies(dependencies: string[] | undefined): Promise<boolean> {
  return (await asyncFilter(dependencies ?? [], async (d) => await getBool("New" + d))).length > 0;
}

// exports dummy function for hardhat-deploy. Otherwise we would have to move this file
export default function () {}
