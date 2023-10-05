import { deployments, ethers } from "hardhat";
import { BigNumberish } from "ethers";

// TODO allow to also override voting settings
export async function getTokenListGovernanceSettings(nftCollection: string, tokens: BigNumberish[], manager: string) {
  const tokenListGovernanceFormat = [
    "tuple(uint8 votingMode, uint64 supportThreshold, uint64 minParticipation, uint64 minDuration, uint256 minProposerVotingPower) votingSettings",
    "address tokenCollection",
    "uint256[] members",
    "address manager",
  ];
  enum VotingMode {
    Standard,
    EarlyExecution,
    VoteReplacement,
  }
  const tokenListGovernanceValues: any[] = [
    {
      votingMode: VotingMode.EarlyExecution,
      supportThreshold: 50 * 10 ** 4, // % * 10**4 (ppm)
      minParticipation: 20 * 10 ** 4, // % * 10**4 (ppm)
      minDuration: 3600, // seconds
      minProposerVotingPower: 1, // require people to be a member to create proposals (this is a boolean in disguise)
    },
    nftCollection,
    tokens,
    manager,
  ];
  const tokenListGovernanceBytes = ethers.AbiCoder.defaultAbiCoder().encode(tokenListGovernanceFormat, tokenListGovernanceValues);
  const tokenListGovernanceSettings = {
    pluginSetupRef: {
      versionTag: {
        release: 1,
        build: 1,
      },
      pluginSetupRepo: (await deployments.get("TokenListGovernanceRepo")).address,
    },
    data: tokenListGovernanceBytes,
  };
  return tokenListGovernanceSettings;
}

export async function getTaskDraftsSettings(tasks: string, governancePlugin: string) {
  const taskDraftsFormat = ["address tasks", "address governancePlugin"];
  const taskDraftsValues: any[] = [tasks, governancePlugin];
  const taskDraftsBytes = ethers.AbiCoder.defaultAbiCoder().encode(taskDraftsFormat, taskDraftsValues);
  const taskDraftsSettings = {
    pluginSetupRef: {
      versionTag: {
        release: 1,
        build: 1,
      },
      pluginSetupRepo: (await deployments.get("TaskDraftsRepo")).address,
    },
    data: taskDraftsBytes,
  };
  return taskDraftsSettings;
}

export async function getTaskDisputesSettings(tasks: string, governancePlugin: string, disputeCost: bigint) {
  const taskDisputeFormat = ["address tasks", "address governancePlugin", "uint256 disputeCost"];
  const taskDisputeValues: any[] = [tasks, governancePlugin, disputeCost];
  const taskDisputeBytes = ethers.AbiCoder.defaultAbiCoder().encode(taskDisputeFormat, taskDisputeValues);
  const taskDisputeSettings = {
    pluginSetupRef: {
      versionTag: {
        release: 1,
        build: 1,
      },
      pluginSetupRepo: (await deployments.get("TaskDisputesRepo")).address,
    },
    data: taskDisputeBytes,
  };
  return taskDisputeSettings;
}

export async function getTokenVotingSettings(erc20Collection: string) {
  const tokenVotingFormat = [
    "tuple(uint8 votingMode, uint64 supportThreshold, uint64 minParticipation, uint64 minDuration, uint256 minProposerVotingPower) votingSettings",
    "tuple(address addr, string name, string symbol)",
    "tuple(address[] receivers, uint256[] amounts)",
  ];
  enum VotingMode {
    Standard,
    EarlyExecution,
    VoteReplacement,
  }
  const tokenVotingValues: any[] = [
    {
      votingMode: VotingMode.EarlyExecution,
      supportThreshold: 50 * 10 ** 4, // % * 10**4 (ppm)
      minParticipation: 20 * 10 ** 4, // % * 10**4 (ppm)
      minDuration: 3600, // seconds
      minProposerVotingPower: 1, // require people to be a member to create proposals (this is a boolean in disguise)
    },
    {
      addr: erc20Collection,
      name: "",
      symbol: "",
    },
    {
      receivers: [],
      amounts: [],
    },
  ];
  const tokenVotingBytes = ethers.AbiCoder.defaultAbiCoder().encode(tokenVotingFormat, tokenVotingValues);
  const tokenVotingSettings = {
    pluginSetupRef: {
      versionTag: {
        release: 1, //get latest ?
        build: 1,
      },
      pluginSetupRepo: (await deployments.get("token-voting-repo")).address,
    },
    data: tokenVotingBytes,
  };
  return tokenVotingSettings;
}

export async function getSharedAddressSettings() {
  const taskDisputeFormat = ["address hats"];
  const hats = await deployments.get("Hats");
  const taskDisputeValues: any[] = [hats.address];
  const taskDisputeBytes = ethers.AbiCoder.defaultAbiCoder().encode(taskDisputeFormat, taskDisputeValues);
  const taskDisputeSettings = {
    pluginSetupRef: {
      versionTag: {
        release: 1,
        build: 1,
      },
      pluginSetupRepo: (await deployments.get("SharedAddressRepo")).address,
    },
    data: taskDisputeBytes,
  };
  return taskDisputeSettings;
}

export async function getSubDAOSettings() {
  const taskDisputeFormat: string[] = [];
  const taskDisputeValues: any[] = [];
  const taskDisputeBytes = ethers.AbiCoder.defaultAbiCoder().encode(taskDisputeFormat, taskDisputeValues);
  const taskDisputeSettings = {
    pluginSetupRef: {
      versionTag: {
        release: 1,
        build: 1,
      },
      pluginSetupRepo: (await deployments.get("SubDAORepo")).address,
    },
    data: taskDisputeBytes,
  };
  return taskDisputeSettings;
}

// exports dummy function for hardhat-deploy. Otherwise we would have to move this file
export default function () {}
