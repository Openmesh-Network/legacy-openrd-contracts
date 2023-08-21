import { FromBlockchainDate, ToBlockchainDate, days, now } from "./timeUnits";
import { ITasks, Tasks } from "../typechain-types";
import { ContractTransactionReceipt, ContractTransactionResponse, Signer, BigNumberish } from "ethers";
import {
  Application,
  ApplicationMetadata,
  BudgetItem,
  CancelTaskRequest,
  CancelTaskRequestMetadata,
  NativeReward,
  RequestType,
  Reward,
  Submission,
  SubmissionJudgement,
  SubmissionJudgementMetadata,
  SubmissionMetadata,
  Task,
  TaskMetadata,
} from "./taskTypes";
import { asyncMap, getEventsFromReceipt } from "./utils";
import { addToIpfs, getFromIpfs } from "./ipfsHelper";
import { Wei } from "./ethersUnits";

// Helper to interact with the tasks contract

export interface CreateTaskSettings {
  tasks: Tasks;
  metadata?: TaskMetadata;
  deadline?: Date;
  budget?: BudgetItem[];
  nativeBudget?: bigint;
  manager?: string;
  preapproved?: {
    applicant: string;
    reward?: Reward[];
    nativeReward?: NativeReward[];
  }[];
}
export async function createTaskTransaction(settings: CreateTaskSettings): Promise<ContractTransactionResponse> {
  const metadata: TaskMetadata = {
    title: "",
    description: "",
    resources: [],
  };
  const metadataHash = await addToIpfs(JSON.stringify(settings.metadata ?? metadata));
  const deadline = settings.deadline ? ToBlockchainDate(settings.deadline) : now() + 1 * days;
  const budget = settings.budget ?? [];
  const nativeBudget = settings.nativeBudget ?? Wei(0);
  const manager = settings.manager ?? (await (settings.tasks.runner as Signer).getAddress());
  const preapproved = (settings.preapproved ?? []).map((p) => {
    return {
      applicant: p.applicant,
      reward: p.reward ?? [],
      nativeReward: p.nativeReward ?? [],
    };
  });
  return settings.tasks.createTask(metadataHash, deadline, budget, manager, preapproved, { value: nativeBudget });
}

export interface CreateTaskResult {
  taskId: bigint;
  receipt: ContractTransactionReceipt;
}
export async function createTask(settings: CreateTaskSettings): Promise<CreateTaskResult> {
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
export async function getTask(settings: GetTaskSettings): Promise<Task> {
  const rawTask = await settings.tasks.getTask(settings.taskId);
  return {
    metadata: await getFromIpfs(rawTask.metadata),
    deadline: FromBlockchainDate(rawTask.deadline),
    budget: rawTask.budget,
    nativeBudget: rawTask.nativeBudget,
    creator: rawTask.creator,
    manager: rawTask.manager,
    state: Number(rawTask.state),
    escrow: rawTask.escrow,
    applications: await asyncMap(rawTask.applications, toApplication),
    executorApplication: Number(rawTask.executorApplication),
    submissions: await asyncMap(rawTask.submissions, toSubmission),
    cancelTaskRequests: await asyncMap(rawTask.cancelTaskRequests, toCancelTaskRequest),
  };
}

export async function toApplication(application: ITasks.OffChainApplicationStructOutput): Promise<Application> {
  return {
    metadata: await getFromIpfs(application.metadata),
    applicant: application.applicant,
    accepted: application.accepted,
    reward: application.reward,
    nativeReward: application.nativeReward,
  };
}

export async function toSubmission(submission: ITasks.SubmissionStructOutput): Promise<Submission> {
  return {
    metadata: await getFromIpfs(submission.metadata),
    judgement: Number(submission.judgement),
    feedback: await getFromIpfs(submission.feedback),
  };
}

export async function toCancelTaskRequest(request: ITasks.CancelTaskRequestStructOutput): Promise<CancelTaskRequest> {
  return {
    explanation: await getFromIpfs(request.explanation),
    request: request.request,
  };
}

export interface ApplyForTaskSettings {
  tasks: Tasks;
  taskId: bigint;
  metadata?: ApplicationMetadata;
  reward?: Reward[];
  nativeReward?: NativeReward[];
}
export async function applyForTask(settings: ApplyForTaskSettings) {
  const metadata: ApplicationMetadata = {
    title: "",
    description: "",
    resources: [],
  };
  const metadataHash = await addToIpfs(JSON.stringify(settings.metadata ?? metadata));
  const reward = settings.reward ?? [];
  const nativeReward = settings.nativeReward ?? [];
  return settings.tasks.applyForTask(settings.taskId, metadataHash, reward, nativeReward);
}

export interface AcceptApplicationsSettings {
  tasks: Tasks;
  taskId: bigint;
  applications: bigint[];
  value?: bigint;
}
export async function acceptApplications(settings: AcceptApplicationsSettings) {
  return settings.tasks.acceptApplications(settings.taskId, settings.applications, {
    value: settings.value,
  });
}

export interface TakeTaskSettings {
  tasks: Tasks;
  taskId: bigint;
  application: bigint;
}
export async function takeTask(settings: TakeTaskSettings) {
  return settings.tasks.takeTask(settings.taskId, settings.application);
}

export interface CreateSubmissionSettings {
  tasks: Tasks;
  taskId: bigint;
  metadata?: SubmissionMetadata;
}
export async function createSubmission(settings: CreateSubmissionSettings) {
  const metadata: SubmissionMetadata = {
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
  judgement: SubmissionJudgement;
  judgementMetadata?: SubmissionJudgementMetadata;
}
export async function reviewSubmission(settings: ReviewSubmissionSettings) {
  const metadata: SubmissionJudgementMetadata = {
    feedback: "",
  };
  const metadataHash = await addToIpfs(JSON.stringify(settings.judgementMetadata ?? metadata));
  return settings.tasks.reviewSubmission(settings.taskId, settings.submissionId, settings.judgement, metadataHash);
}

export interface CancelTaskSettings {
  tasks: Tasks;
  taskId: bigint;
  explanation?: CancelTaskRequestMetadata;
}
export async function cancelTask(settings: CancelTaskSettings) {
  const metadata: CancelTaskRequestMetadata = {
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
}
export async function acceptRequest(settings: AcceptRequestSettings) {
  const execute = settings.execute ?? true;
  return settings.tasks.acceptRequest(settings.taskId, settings.requestType, settings.requestId, execute);
}

export interface ExecuteRequestSettings {
  tasks: Tasks;
  taskId: bigint;
  requestType: RequestType;
  requestId: bigint;
}
export async function executeRequest(settings: ExecuteRequestSettings) {
  return settings.tasks.executeRequest(settings.taskId, settings.requestType, settings.requestId);
}
