import { BaseContract } from "ethers";
import { deployments, ethers } from "hardhat";
import { ether } from "../../utils/ethersUnits";

export async function asDAO<T extends BaseContract>(contract: BaseContract, department: string): Promise<T> {
  const dao = await deployments.get(department + "_dao");
  const [funder] = await ethers.getSigners();
  await funder.sendTransaction({
    to: dao.address,
    value: ether,
  });
  return contract.connect(await ethers.getImpersonatedSigner(dao.address)) as T;
}
