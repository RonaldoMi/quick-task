interface TaskState {
  id: number,
  title: string
  description: string
  priority: string
  state: string
  limiteDate: Date
  createDate: Date
}

interface TaskStates extends Array<TaskState>{}
export { TaskStates, TaskState }