import { deployments } from "hardhat";
import { Tasks } from "../../typechain-types";
import { acceptApplications, applyForTask, takeTask } from "../../utils/taskHelper";

export async function TestSetup() {
  await deployments.fixture(["Tasks", "DisputeDAO", "DepartmentDAO"]);
}

export interface FastForwardTakeTaskSettings {
  tasksProposer: Tasks;
  tasksExecutor: Tasks;
  taskId: bigint;
}
export async function FastForwardTakeTask(settings: FastForwardTakeTaskSettings) {
  await applyForTask({
    tasks: settings.tasksExecutor,
    taskId: settings.taskId,
  });
  await acceptApplications({
    tasks: settings.tasksProposer,
    taskId: settings.taskId,
    applications: [BigInt(0)],
  });
  await takeTask({
    tasks: settings.tasksExecutor,
    taskId: settings.taskId,
    application: BigInt(0),
  });
}
