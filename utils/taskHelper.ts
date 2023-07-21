import { FromBlockchainDate, ToBlockchainDate, days, now } from "./timeUnits";
import { ITasks, Tasks } from "../typechain-types";
import { ContractTransactionReceipt, ContractTransactionResponse, Signer } from "ethers";
import { Application, ApplicationMetadata, BudgetItem, CancelTaskRequest, CancelTaskRequestMetadata, ChangeScopeRequest, DropExecutorRequest, DropExecutorRequestMetadata, PreapprovedApplication, RequestType, Reward, Submission, SubmissionJudgement, SubmissionJudgementMetadata, SubmissionMetadata, Task, TaskMetadata, TaskState } from "./taskTypes";
import { asyncMap, getEventsFromReceipt } from "./utils";
import { addToIpfs, getFromIpfs } from "./ipfsHelper";

// Helper to interact with the tasks contract

export interface CreateTaskSettings {
    tasks: Tasks;
    metadata?: TaskMetadata;
    deadline?: Date;
    budget?: BudgetItem[];
    manager?: string;
    preapproved?: PreapprovedApplication[];
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
    const manager = settings.manager ?? await (settings.tasks.runner as Signer).getAddress();
    const preapproved = settings.preapproved ?? [];
    return settings.tasks.createTask(metadataHash, deadline, budget, manager, preapproved);
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
    const taskCreationEvent = getEventsFromReceipt(receipt, settings.tasks.interface, "TaskCreated");
    const taskId = taskCreationEvent[0].args.taskId;
    return { taskId: taskId, receipt: receipt };
}


export interface GetTaskSettings {
    tasks: Tasks;
    taskId: bigint;
}
export async function getTask(settings: GetTaskSettings) : Promise<Task> {
    const rawTask = await settings.tasks.getTask(settings.taskId);
    return {
        // metadata: await getFromIpfs(rawTask.metadata),
        deadline: FromBlockchainDate(rawTask.deadline),
        budget: rawTask.budget,
        proposer: rawTask.proposer,
        // creationTimestamp: FromBlockchainDate(rawTask.creationTimestamp),
        state: Number(rawTask.state),
        escrow: rawTask.escrow,
        applications: await asyncMap(rawTask.applications, toApplication),
        executorApplication: Number(rawTask.executorApplication),
        // executorConfirmationTimestamp: FromBlockchainDate(rawTask.executorConfirmationTimestamp),
        submissions: await asyncMap(rawTask.submissions, toSubmission),
        // changeScopeRequests: await asyncMap(rawTask.changeScopeRequests, toChangeScopeRequest),
        // dropExecutorRequests: await asyncMap(rawTask.dropExecutorRequests, toDropExecutorRequest),
        cancelTaskRequests: await asyncMap(rawTask.cancelTaskRequests, toCancelTaskRequest),
    };
}

export async function toApplication(application : ITasks.OffChainApplicationStructOutput) : Promise<Application> {
    return {
        // metadata: await getFromIpfs(application.metadata),
        // timestamp: FromBlockchainDate(application.timestamp),
        applicant: application.applicant,
        accepted: application.accepted,
        reward: application.reward,
    };
}

export async function toSubmission(submission : ITasks.SubmissionStructOutput) : Promise<Submission> {
    return {
        // metadata: await getFromIpfs(submission.metadata),
        // timestamp: FromBlockchainDate(submission.timestamp),
        judgement: Number(submission.judgement),
        // judgementTimestamp: FromBlockchainDate(submission.judgementTimestamp),
        // feedback: await getFromIpfs(submission.feedback),
    };
}

// export async function toChangeScopeRequest(request : ITasks.OffChainChangeScopeRequestStructOutput) : Promise<ChangeScopeRequest> {
//     return {
//         // metadata: await getFromIpfs(request.metadata),
//         // timestamp: FromBlockchainDate(request.timestamp),
//         // accepted: request.accepted == BigInt(0) ? null : FromBlockchainDate(request.accepted),
//         accepted: request.accepted,
//         deadline: FromBlockchainDate(request.deadline),
//         reward: request.reward,
//     };
// }

// export async function toDropExecutorRequest(request : ITasks.DropExecutorRequestStructOutput) : Promise<DropExecutorRequest> {
//     return {
//         // explanation: await getFromIpfs(request.explanation),
//         // timestamp: FromBlockchainDate(request.timestamp),
//         // accepted: request.accepted == BigInt(0) ? null : FromBlockchainDate(request.accepted),
//         accepted: request.accepted,
//     };
// }

export async function toCancelTaskRequest(request : ITasks.CancelTaskRequestStructOutput) : Promise<CancelTaskRequest> {
    return {
        // explanation: await getFromIpfs(request.explanation),
        // timestamp: FromBlockchainDate(request.timestamp),
        // accepted: request.accepted == BigInt(0) ? null : FromBlockchainDate(request.accepted),
        accepted: request.accepted,
        executed: request.executed,
    };
}

export interface ApplyForTaskSettings {
    tasks: Tasks;
    taskId: bigint;
    metadata?: ApplicationMetadata,
    reward?: Reward[],
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

export interface ChangeScopeSettings {
    tasks: Tasks;
    taskId: bigint;
    metadata?: TaskMetadata;
    deadline?: Date;
    reward?: Reward[]
};
// export async function changeScope(settings : ChangeScopeSettings) {
//     const metadata : TaskMetadata = {
//         title: "",
//         description: "",
//         resources: []
//     };
//     const metadataHash = await addToIpfs(JSON.stringify(settings.metadata ?? metadata));
//     const deadline = settings.deadline ? ToBlockchainDate(settings.deadline) : now() + 1 * days;
//     const reward = settings.reward ?? [];
//     return settings.tasks.changeScope(settings.taskId, metadataHash, deadline, reward);
// }

export interface DropExecutorSettings {
    tasks: Tasks;
    taskId: bigint;
    explanation?: DropExecutorRequestMetadata;
};
// export async function dropExecutor(settings : DropExecutorSettings) {
//     const metadata : DropExecutorRequestMetadata = {
//         explanation: "",
//     };
//     const metadataHash = await addToIpfs(JSON.stringify(settings.explanation ?? metadata));
//     return settings.tasks.dropExecutor(settings.taskId, metadataHash);
// }

export interface CancelTaskSettings {
    tasks: Tasks;
    taskId: bigint;
    explanation?: CancelTaskRequestMetadata;
};
export async function cancelTask(settings : CancelTaskSettings) {
    const metadata : CancelTaskRequestMetadata = {
        explanation: "",
    };
    const metadataHash = await addToIpfs(JSON.stringify(settings.explanation ?? metadata));
    return settings.tasks.cancelTask(settings.taskId, metadataHash);
}

export interface AcceptRequestSettings {
    tasks: Tasks;
    taskId: bigint;
    requestType: RequestType;
    requestId: bigint;
    execute?: boolean;
};
export async function acceptRequest(settings : AcceptRequestSettings) {
    const execute = settings.execute ?? true;
    return settings.tasks.acceptRequest(settings.taskId, settings.requestType, settings.requestId, execute);
}

export interface ExecuteRequestSettings {
    tasks: Tasks;
    taskId: bigint;
    requestType: RequestType;
    requestId: bigint;
};
export async function executeRequest(settings : ExecuteRequestSettings) {
    return settings.tasks.executeRequest(settings.taskId, settings.requestType, settings.requestId);
}