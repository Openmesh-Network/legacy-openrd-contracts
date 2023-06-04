import { ContractReceipt } from "ethers";
import { Interface, LogDescription } from "@ethersproject/abi";

export function findEventsTopicLog(
    receipt: ContractReceipt,
    iface: Interface,
    eventName: string
  ): LogDescription[] {
    const topic = iface.getEventTopic(eventName);
    const log = receipt.logs.filter(x => x.topics[0] == topic);
    return log.map(l => iface.parseLog(l));
  }

  