import Vue from 'vue';
import Vuex, { StoreOptions } from 'vuex';
import { RootState } from '@/store/types';
import { user } from '@/store/user';
import { task } from '@/store/task';

Vue.use(Vuex)

const store: StoreOptions<RootState> = {
  modules: {
    user,
    task
  }
}

export default new Vuex.Store<RootState>(store)