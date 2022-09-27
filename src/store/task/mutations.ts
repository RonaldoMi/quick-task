import { MutationTree } from "vuex";
import { TaskStates, TaskState } from "./types";


export enum TaskMutation {
  SET_TASK_LIST = "SET_TASK_LIST",
  ADD_TASK_IN_LIST = "ADD_TASK_IN_LIST",
  PUT_TASK_IN_LIST = "PUT_TASK_IN_LIST",
  DEL_TASK_IN_LIST = "DEL_TASK_IN_LIST"
}

export const mutations: MutationTree<TaskStates> = {
  [TaskMutation.SET_TASK_LIST] (state, task: TaskStates) {
    state.splice(0, state.length)

    task.forEach(el => {
      state.push(el)
    })
  },

  [TaskMutation.ADD_TASK_IN_LIST] (state, task: TaskState) {
    state.push(task)
  },

  [TaskMutation.PUT_TASK_IN_LIST] (state, task: TaskState) {
    const newTask = state.find(el => el.id == task.id)

    if (newTask){
      Object.assign(newTask, task)
    }
  },

  [TaskMutation.DEL_TASK_IN_LIST] (state, taskId: number) {
    const taskIndex = state.findIndex(el => el.id == taskId)

    if (taskIndex > -1){
      state.splice(taskIndex, 1)
    }
  },

}