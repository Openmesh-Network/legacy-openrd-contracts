import axios from "axios";
import FormData from "form-data";
import { ethers, network } from "hardhat";

// Helper to interact with IPFS.

const ipfsMock: string[] = [];
const ipfsUrl = "https://ipfs-0.aragon.network/api/v0/";
const ipfsApiKey = "b477RhECf8s8sdM7XrkLBs2wHc4kCMwpbcFC55Kt"; // Publicly known Aragon IPFS node API key

/** Upload a file to the cluster and pin it */
export async function addToIpfs(json: string): Promise<string> {
  if (!network.live) {
    ipfsMock.push(json);
    return ethers.toBeHex(ipfsMock.length - 1, 32);
  }

  let data = new FormData();
  data.append("path", json);

  const config = {
    method: "POST",
    url: ipfsUrl + "add",
    headers: {
      "X-API-KEY": ipfsApiKey,
    },
    data: data,
  };

  const res = await axios(config);
  return res.data.Hash;
}

export async function getFromIpfs(hash: string): Promise<any> {
  if (hash == undefined || hash == "") {
    return null;
  }

  if (!network.live) {
    const index = ethers.toBigInt(hash);
    return JSON.parse(ipfsMock[Number(index)]);
  }

  const config = {
    method: "POST",
    url: ipfsUrl + "cat?arg=" + hash,
    headers: {
      "X-API-KEY": ipfsApiKey,
    },
  };

  const res = await axios(config);
  return res.data;
}
