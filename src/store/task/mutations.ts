import { MutationTree } from "vuex";
import { TaskStates, TaskState } from "./types";


export enum TaskMutation {
  SET_TASK_LIST = "SET_TASK_LIST",
  ADD_TASK_IN_LIST = "ADD_TASK_IN_LIST",
  PUT_TASK_IN_LIST = "PUT_TASK_IN_LIST",
  DEL_TASK_IN_LIST = "DEL_TASK_IN_LIST"
}

export const mutations: MutationTree<TaskStates> = {
  [TaskMutation.SET_TASK_LIST] (state, payload: TaskStates) {
    state.splice(0, state.length)

    payload.forEach(el => {
      state.push(el)
    })
  },

  [TaskMutation.ADD_TASK_IN_LIST] (state, payload: TaskState) {
    state.push(payload)
  },

  [TaskMutation.PUT_TASK_IN_LIST] (state, payload: TaskState) {
    let newTask = state.find(el => el.id == payload.id)

    if (newTask){
      newTask = payload
    }
  },

  [TaskMutation.DEL_TASK_IN_LIST] (state, payload: TaskState) {
    const taskIndex = state.findIndex(el => el.id == payload.id)

    if (taskIndex > -1){
      state.splice(taskIndex, 1)
    }
  },

}