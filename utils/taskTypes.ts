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

export enum TaskState { Open, Taken, Closed }
export interface Task {
    metadata: TaskMetadata;
    deadline: Date;
    budget: BudgetItem[];
    proposer: string;
    creationTimestamp: Date;
    state: TaskState;
    escrow: string;
    applications: Application[];
    executorApplication: number;
    executorConfirmationTimestamp: Date;
    submissions: Submission[];
}

export interface ApplicationMetadata {
    title: string;
    description: string;
    resources: Resource[];
}

export interface Application {
    metadata: ApplicationMetadata;
    timestamp: Date;
    applicant: string;
    accepted: boolean;
    reward: bigint[];
}

export interface SubmissionMetadata {
    fileName: string;
    fileFormat: string;
    fileContent: string;
}

export interface SubmissionJudgementMetadata {
    feedback: string;
}

export enum SubmissionJudgement { None, Accepted, Rejected }
export interface Submission {
    metadata: SubmissionMetadata;
    timestamp: Date;
    judgement: SubmissionJudgement;
    judgementTimestamp: Date;
    feedback: SubmissionJudgementMetadata;
}