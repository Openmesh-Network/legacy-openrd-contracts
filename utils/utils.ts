import { TransactionReceipt } from "ethers";
import { Interface, LogDescription } from "@ethersproject/abi";

// Various utility functions

export function findEventsTopicLog(
    receipt: TransactionReceipt,
    iface: Interface,
    eventName: string
  ): LogDescription[] {
    const topic = iface.getEventTopic(eventName);
    const log = receipt.logs.filter(x => x.topics[0] == topic);
    return log.map(l => iface.parseLog({topics: l.topics.map(s => s), data: l.data}));
}

export async function asyncFilter<T>(arr : T[], predicate : ((elem : T) => Promise<boolean>)) {
  const results = await Promise.all(arr.map(predicate));

  return arr.filter((_v, index) => results[index]);
}

export async function asyncMap<T1, T2>(arr : T1[], func : ((elem : T1) => Promise<T2>)) {
  return Promise.all(arr.map(func));
}
  