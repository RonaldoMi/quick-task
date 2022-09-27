import { GetterTree } from "vuex";
import { TaskStates } from "./types";
import { RootState } from "../types";

export const getters: GetterTree<TaskStates, RootState> = {
  getTaskList (state): TaskStates {
    return state;
  },
}