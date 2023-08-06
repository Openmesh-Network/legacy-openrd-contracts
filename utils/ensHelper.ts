import { ethers } from "ethers";
import { PublicResolver } from "../typechain-types";

// Helper for performing ENS queries and doing ENS encoding.

/**
 * Encodes the node string according to ENS spec
 * (ethers.namehash)
 * @param node The node in string form
 * @returns The node encoded according to ENS spec
 */
export function toEnsNode(node: string): string {
  return ethers.namehash(node);
}

/**
 * Encodes the label string according to ENS spec
 * (ethers.keccak256(ethers.toUtf8Bytes(label)))
 * @param label The label in string form
 * @returns The label encoded according to ENS spec
 */
export function toEnsLabel(label: string): string {
  return ethers.keccak256(ethers.toUtf8Bytes(label));
}

/**
 * Asks the resolver for the address stored at subdomain.domain
 * Calls the .addr(bytes32) function of the smart contract
 * @param resolver The resolver to ask
 * @param domain The domain to ask about
 * @param subdomain The subdomain to ask about
 * @returns The address stored at subdomain.domain
 */
export async function resolveENS(resolver: PublicResolver, domain: string, subdomain: string): Promise<string> {
  return await resolver["addr(bytes32)"](
    ethers.keccak256(ethers.AbiCoder.defaultAbiCoder().encode(["bytes32 node", "bytes32 _label"], [toEnsNode(domain), toEnsLabel(subdomain)]))
  );
}
