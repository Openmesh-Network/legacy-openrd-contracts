import { BaseContract } from "ethers";
import { deployments, ethers } from "hardhat";
import { ether } from "../../utils/ethersUnits";
import { DAO } from "../../typechain-types";

export async function asDepartment<T extends BaseContract>(contract: BaseContract, department: string): Promise<T> {
  const dao = await deployments.get(department + "_dao");
  const [funder] = await ethers.getSigners();
  await funder.sendTransaction({
    to: dao.address,
    value: ether,
  });
  return contract.connect(await ethers.getImpersonatedSigner(dao.address)) as T;
}

export async function asDAO<T extends BaseContract>(contract: BaseContract, dao: DAO): Promise<T> {
  const [funder] = await ethers.getSigners();
  const daoAddress = await dao.getAddress();
  await funder.sendTransaction({
    to: daoAddress,
    value: ether,
  });
  return contract.connect(await ethers.getImpersonatedSigner(daoAddress)) as T;
}
