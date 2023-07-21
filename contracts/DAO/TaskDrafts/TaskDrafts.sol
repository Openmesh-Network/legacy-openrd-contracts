// SPDX-License-Identifier: None
pragma solidity ^0.8.0;

import { ITasks } from "../../Tasks/ITasks.sol";
import { IPluginProposals } from "../Governance/IPluginProposals.sol";

contract TaskDrafts {
    ITasks private tasks;
    IPluginProposals private governancePlugin;

    constructor(ITasks _tasks, IPluginProposals _governancePlugin) {
        tasks = _tasks;
        governancePlugin = _governancePlugin;
    }
}