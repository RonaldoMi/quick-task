import { MutationTree } from "vuex";
import { UserState } from "./types";

export enum UserMutation {
  SET_USER_NAME = "SET_USER_NAME",
  SET_USER_EMAIL = "SET_USER_EMAIL",
  SET_USER_TOKEN = "SET_USER_TOKEN",
  SET_USER_LOGGED = "SET_USER_LOGGED",
  SET_STORE_MSG_ERROR = "SET_STORE_MSG_ERROR",
}

export const mutations: MutationTree<UserState> = {
  [UserMutation.SET_USER_NAME] (state, payload: string) {
    state.name = payload;
  },

  [UserMutation.SET_USER_EMAIL] (state, payload: string) {
    state.email = payload;
  },

  [UserMutation.SET_USER_TOKEN] (state, payload: string) {
    state.token = payload;
  },

  [UserMutation.SET_USER_LOGGED] (state, payload: boolean) {
    state.isLogged = payload;
  },

  [UserMutation.SET_STORE_MSG_ERROR] (state, payload: string) {
    state.storeMsgError = payload;
  },
}