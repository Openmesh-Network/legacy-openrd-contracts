export interface Resource {
  name: string;
  url: string;
}

export interface BudgetItem {
  tokenContract: string;
  amount: bigint;
}

export interface TaskMetadata {
  title: string;
  description: string;
  resources: Resource[];
}

export interface PreapprovedApplication {
  applicant: string;
  reward: Reward[];
}

export enum TaskState {
  Open,
  Taken,
  Closed,
}
export interface Task {
  metadata: TaskMetadata;
  deadline: Date;
  budget: BudgetItem[];
  creator: string;
  manager: string;
  state: TaskState;
  escrow: string;
  applications: Application[];
  executorApplication: number;
  submissions: Submission[];
  cancelTaskRequests: CancelTaskRequest[];
}

export interface Reward {
  nextToken: boolean;
  to: string;
  amount: bigint;
}

export interface ApplicationMetadata {
  title: string;
  description: string;
  resources: Resource[];
}

export interface Application {
  metadata: ApplicationMetadata;
  applicant: string;
  accepted: boolean;
  reward: Reward[];
}

export interface SubmissionMetadata {
  fileName: string;
  fileFormat: string;
  fileContent: string;
}

export interface SubmissionJudgementMetadata {
  feedback: string;
}

export enum SubmissionJudgement {
  None,
  Accepted,
  Rejected,
}
export interface Submission {
  metadata: SubmissionMetadata;
  judgement: SubmissionJudgement;
  feedback: SubmissionJudgementMetadata;
}

export enum RequestType {
  CancelTask,
}
export interface Request {
  accepted: boolean;
  executed: boolean;
}

export interface CancelTaskRequestMetadata {
  explanation: string;
}
export interface CancelTaskRequest {
  request: Request;
  explanation: CancelTaskRequestMetadata;
}
