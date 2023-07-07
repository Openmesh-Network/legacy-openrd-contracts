import { ethers } from "hardhat";
import { FromBlockchainDate, ToBlockchainDate, days, now } from "./timeUnits";
import { ITasks, Tasks } from "../typechain-types";
import { ContractTransactionReceipt, ContractTransactionResponse } from "ethers";
import { Application, ApplicationMetadata, BudgetItem, Submission, SubmissionJudgement, SubmissionJudgementMetadata, SubmissionMetadata, Task, TaskMetadata, TaskState } from "./taskTypes";
import { asyncMap } from "./utils";
import { addToIpfs, getFromIpfs } from "./ipfsHelper";

// Helper to interact with the tasks contract

export interface CreateTaskSettings {
    tasks: Tasks;
    metadata?: TaskMetadata;
    deadline?: Date;
    budget?: BudgetItem[];
}
export async function createTaskTransaction(settings : CreateTaskSettings) : Promise<ContractTransactionResponse> {
    const metadata : TaskMetadata = {
        title: "",
        description: "",
        resources: []
    };
    const metadataHash = await addToIpfs(JSON.stringify(settings.metadata ?? metadata));
    const deadline = settings.deadline ? ToBlockchainDate(settings.deadline) : now() + 1 * days;
    const budget = settings.budget ?? [];
    return settings.tasks.createTask(metadataHash, deadline, budget);
}

export interface CreateTaskResult {
    taskId: bigint;
    receipt: ContractTransactionReceipt;
}
export async function createTask(settings : CreateTaskSettings) : Promise<CreateTaskResult> {
    const tx = await createTaskTransaction(settings);
    const receipt = await tx.wait();
    if (!receipt) {
        throw new Error();
    }
    return { taskId: await settings.tasks.taskCount() - BigInt(1), receipt: receipt };
}


export interface GetTaskSettings {
    tasks: Tasks;
    taskId: bigint;
}
export async function getTask(settings: GetTaskSettings) : Promise<Task> {
    const rawTask = await settings.tasks.getTask(settings.taskId);
    return {
        metadata: await getFromIpfs(rawTask.metadata),
        deadline: FromBlockchainDate(rawTask.deadline),
        budget: rawTask.budget,
        proposer: rawTask.proposer,
        creationTimestamp: FromBlockchainDate(rawTask.creationTimestamp),
        state: Number(rawTask.state),
        escrow: rawTask.escrow,
        applications: await asyncMap(rawTask.applications, toApplication),
        executorApplication: Number(rawTask.executorApplication),
        executorConfirmationTimestamp: FromBlockchainDate(rawTask.executorConfirmationTimestamp),
        submissions: await asyncMap(rawTask.submissions, toSubmission),
    };
}

export async function toApplication(application : ITasks.OffChainApplicationStructOutput) : Promise<Application> {
    return {
        metadata: await getFromIpfs(application.metadata),
        timestamp: FromBlockchainDate(application.timestamp),
        applicant: application.applicant,
        accepted: application.accepted,
        reward: application.reward,
    };
}

export async function toSubmission(submission : ITasks.SubmissionStructOutput) : Promise<Submission> {
    return {
        metadata: await getFromIpfs(submission.metadata),
        timestamp: FromBlockchainDate(submission.timestamp),
        judgement: Number(submission.judgement),
        judgementTimestamp: FromBlockchainDate(submission.judgementTimestamp),
        feedback: await getFromIpfs(submission.feedback),
    };
}

export interface ApplyForTaskSettings {
    tasks: Tasks;
    taskId: bigint;
    metadata?: ApplicationMetadata,
    reward?: bigint[],
};
export async function applyForTask(settings: ApplyForTaskSettings) {
    const metadata : ApplicationMetadata = {
        title: "",
        description: "",
        resources: [],
    };
    const metadataHash = await addToIpfs(JSON.stringify(settings.metadata ?? metadata));
    const reward = settings.reward ?? [];
    return settings.tasks.applyForTask(settings.taskId, metadataHash, reward);
}

export interface AcceptApplicationsSettings {
    tasks: Tasks;
    taskId: bigint;
    applications: bigint[];
};
export async function acceptApplications(settings : AcceptApplicationsSettings) {
    return settings.tasks.acceptApplications(settings.taskId, settings.applications);
}

export interface TakeTaskSettings {
    tasks: Tasks;
    taskId: bigint;
    application: bigint;
};
export async function takeTask(settings : TakeTaskSettings) {
    return settings.tasks.takeTask(settings.taskId, settings.application);
}

export interface CreateSubmissionSettings {
    tasks: Tasks;
    taskId: bigint;
    metadata?: SubmissionMetadata;
};
export async function createSubmission(settings : CreateSubmissionSettings) {
    const metadata : SubmissionMetadata = {
        fileName: "",
        fileFormat: "",
        fileContent: "",
    };
    const metadataHash = await addToIpfs(JSON.stringify(settings.metadata ?? metadata));
    return settings.tasks.createSubmission(settings.taskId, metadataHash);
}

export interface ReviewSubmissionSettings {
    tasks: Tasks;
    taskId: bigint;
    submissionId: bigint;
    judgement: SubmissionJudgement,
    judgementMetadata?: SubmissionJudgementMetadata,
};
export async function reviewSubmission(settings : ReviewSubmissionSettings) {
    const metadata : SubmissionJudgementMetadata = {
        feedback: "",
    };
    const metadataHash = await addToIpfs(JSON.stringify(settings.judgementMetadata ?? metadata));
    return settings.tasks.reviewSubmission(settings.taskId, settings.submissionId, settings.judgement, metadataHash);
}