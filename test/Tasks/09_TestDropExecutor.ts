// import { expect } from "chai";
// import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";
// import { acceptRequest, dropExecutor, getTask } from "../../utils/taskHelper";
// import { createTakenTaskFixture } from "./00_TestTasksFixtures";
// import { DropExecutorRequestMetadata, RequestType, TaskState } from "../../utils/taskTypes";

// describe("Drop executor", function () {
//   // Check if variables are set
//   it("should have the correct metadata", async function () {
//     const task = await loadFixture(createTakenTaskFixture);
//     const metadata : DropExecutorRequestMetadata = {
//         explanation: "Juse because",
//     };
//     await dropExecutor({
//         tasks: task.TasksProposer,
//         taskId: task.taskId,
//         explanation: metadata,
//     });
//     const taskInfo = await getTask({ tasks: task.TasksExecutor, taskId: task.taskId });
//     expect(taskInfo.dropExecutorRequests).to.be.lengthOf(1);
//     expect(taskInfo.dropExecutorRequests[0].explanation).to.be.deep.equal(metadata);
//     expect(taskInfo.dropExecutorRequests[0].accepted).to.be.null;
//     expect(taskInfo.state).to.be.equal(TaskState.Taken);
//     await acceptRequest({
//         tasks: task.TasksExecutor,
//         taskId: task.taskId,
//         requestType: RequestType.DropExecutor,
//         requestId: BigInt(0),
//     });
//     const taskInfo2 = await getTask({ tasks: task.TasksExecutor, taskId: task.taskId });
//     expect(taskInfo2.state).to.be.equal(TaskState.Open);
//     expect(taskInfo2.dropExecutorRequests[0].accepted).to.be.not.null;
//   });
// });