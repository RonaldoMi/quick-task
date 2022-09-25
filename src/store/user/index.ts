import { Module } from "vuex";
import { RootState } from '@/store/types';
import { UserState } from './types';
import { getters } from "./getters";
import { mutations } from "./mutations";
import { actions } from "./actions";

const state: UserState = {
  name: "",
  email: "",
  token: "",
  storeMsgError: "",
  isLogged: false
}

export const user: Module<UserState, RootState> = {
  state,
  getters,
  mutations,
  actions
}