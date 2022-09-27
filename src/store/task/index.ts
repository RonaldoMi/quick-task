import { Module } from "vuex";
import { RootState } from '@/store/types';
import { TaskStates } from './types';
import { getters } from "./getters";
import { mutations } from "./mutations";
import { actions } from "./actions";

const state: TaskStates = []

export const task: Module<TaskStates, RootState> = {
  state,
  getters,
  mutations,
  actions
}