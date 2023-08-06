import { TransactionReceipt, Interface, LogDescription } from "ethers";
import { ethers } from "hardhat";

// Various utility functions

interface Log {
  topics: readonly string[] | string[];
  data: string;
}

export function getEventsFromReceipt(receipt: TransactionReceipt, iface: Interface, eventName: string): LogDescription[] {
  return getEventsFromLogs(
    receipt.logs.map((l) => l),
    iface,
    eventName
  );
}

export function getEventsFromLogs(logs: Log[] | undefined, iface: Interface, eventName: string): LogDescription[] {
  if (!logs) {
    throw new Error();
  }

  const topic = iface.getEvent(eventName)?.topicHash;
  const log = logs.filter((x) => x.topics[0] == topic);
  return log.map((l) => iface.parseLog({ topics: l.topics.map((s) => s), data: l.data })) as LogDescription[];
}

export async function asyncFilter<T>(arr: T[], predicate: (elem: T) => Promise<boolean>): Promise<T[]> {
  const results = await Promise.all(arr.map(predicate));

  return arr.filter((_v, index) => results[index]);
}

export async function asyncMap<T1, T2>(arr: T1[], func: (elem: T1) => Promise<T2>): Promise<T2[]> {
  return Promise.all(arr.map(func));
}

export function getInferfaceId(iface: Interface): string {
  let interfaceId = BigInt(0);
  iface.forEachFunction((f) => {
    interfaceId = interfaceId ^ BigInt(f.selector);
  });
  return ethers.toBeHex(interfaceId);
}
