// import { expect } from "chai";
// import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";
// import { acceptRequest, changeScope, getTask } from "../../utils/taskHelper";
// import { createBudgetTaskFixture, createTakenTaskFixture } from "./00_TestTasksFixtures";
// import { RequestType, TaskMetadata } from "../../utils/taskTypes";
// import { FastForwardTakeTask } from "../Helpers/TestSetup";

// describe("Change scope", function () {
//   // Check if variables are set
//   it("should have the correct metadata", async function () {
//     const task = await loadFixture(createTakenTaskFixture);
//     const metadata : TaskMetadata = {
//         title: "Super fresh",
//         description: "NEW!!!!",
//         resources: [{
//             name: "Still empty",
//             url: "void://*"
//         }],
//     }
//     await changeScope({
//         tasks: task.TasksProposer,
//         taskId: task.taskId,
//         metadata: metadata,
//     });
//     const taskInfo = await getTask({ tasks: task.TasksExecutor, taskId: task.taskId });
//     expect(taskInfo.changeScopeRequests).to.be.lengthOf(1);
//     expect(taskInfo.changeScopeRequests[0].metadata).to.be.deep.equal(metadata);
//     expect(taskInfo.changeScopeRequests[0].accepted).to.be.null;
//     expect(taskInfo.metadata).to.be.not.deep.equal(metadata);
//     await acceptRequest({
//         tasks: task.TasksExecutor,
//         taskId: task.taskId,
//         requestType: RequestType.ChangeScope,
//         requestId: BigInt(0),
//     });
//     const taskInfo2 = await getTask({ tasks: task.TasksExecutor, taskId: task.taskId });
//     expect(taskInfo2.metadata).to.be.deep.equal(metadata);
//     expect(taskInfo2.changeScopeRequests[0].accepted).to.be.not.null;
//   });

//   it("budget", async function () {
//     const task = await loadFixture(createBudgetTaskFixture);
//     await FastForwardTakeTask({
//         tasksProposer: task.TasksProposer,
//         tasksExecutor: task.TasksExecutor,
//         taskId: task.taskId,
//     });
//     const reward = [{ nextToken: true, to: task.executor, amount: BigInt(1) }];
//     await changeScope({
//         tasks: task.TasksProposer,
//         taskId: task.taskId,
//         reward: reward,
//     });
//     const taskInfo = await getTask({ tasks: task.TasksExecutor, taskId: task.taskId });
//     expect(taskInfo.changeScopeRequests).to.be.lengthOf(1);
//     for (let i = 0; i < reward.length; i++) {
//         expect(taskInfo.changeScopeRequests[0].reward[i].nextToken).to.be.deep.equal(reward[i].nextToken);
//         expect(taskInfo.changeScopeRequests[0].reward[i].to).to.be.deep.equal(reward[i].to);
//         expect(taskInfo.changeScopeRequests[0].reward[i].amount).to.be.deep.equal(reward[i].amount);
//     }
//     await acceptRequest({
//         tasks: task.TasksExecutor,
//         taskId: task.taskId,
//         requestType: RequestType.ChangeScope,
//         requestId: BigInt(0),
//     });
//     const taskInfo2 = await getTask({ tasks: task.TasksExecutor, taskId: task.taskId });
//     for (let i = 0; i < reward.length; i++) {
//         expect(taskInfo2.applications[taskInfo2.executorApplication].reward[i].nextToken).to.be.equal(reward[i].nextToken);
//         expect(taskInfo2.applications[taskInfo2.executorApplication].reward[i].to).to.be.equal(reward[i].to);
//         expect(taskInfo2.applications[taskInfo2.executorApplication].reward[i].amount).to.be.equal(reward[i].amount);
//     }
//   });
// });