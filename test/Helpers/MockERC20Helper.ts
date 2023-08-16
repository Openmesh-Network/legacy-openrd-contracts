import { ethers, getNamedAccounts } from "hardhat";
import { MockERC20, Tasks } from "../../typechain-types";
import { BudgetItem } from "../../utils/taskTypes";
import { Signer } from "ethers";

export async function DeployMockERC20(namedAccount?: string): Promise<MockERC20> {
  const { deployer } = await getNamedAccounts();
  let ERC20 = (await ethers.deployContract("MockERC20", ["Mock ERC20", "MOCK"], await ethers.getSigner(deployer))) as any as MockERC20;
  if (namedAccount) {
    ERC20 = ERC20.connect(await ethers.getSigner(namedAccount));
  }
  return ERC20;
}

export async function GetBudgetItem(tasks: Tasks, amount: bigint, approveFor: string): Promise<BudgetItem> {
  const ERC20 = await DeployMockERC20(approveFor);
  await ERC20.increaseBalance(approveFor, amount);
  await ERC20.approve(await tasks.getAddress(), amount);
  return {
    tokenContract: await ERC20.getAddress(),
    amount: amount,
  };
}
