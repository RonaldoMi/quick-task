import { GetterTree } from "vuex";
import { UserState } from "./types";
import { RootState } from "../types";

export const getters: GetterTree<UserState, RootState> = {
  getUserName (state): string {
    return state.name;
  },

  getUserEmail (state): string {
    return state.email;
  },

  getUserToken (state): string {
    return state.token;
  },

  getStoreMsgError (state): string {
    return state.storeMsgError;
  },

  getUserLogged (state): boolean {
    return state.isLogged;
  },
}