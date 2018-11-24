import NodeJSTimerType = NodeJS.Timer;

export class Timer {
  projectId?: number | string = undefined;
  taskId?: number | string = undefined;
  time: number = 0;
  timer?: NodeJSTimerType = undefined;
  userWorkId?: number | string = undefined;
}
