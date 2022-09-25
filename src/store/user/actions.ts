import axios from 'axios';
import { ActionTree } from "vuex";
import { UserState } from './types';
import { RootState } from '@/store/types';
import { UserMutation } from './mutations';
import store from '../';


export const actions: ActionTree<UserState, RootState> = {
  authUser: async (context, { userEmail, userPass }) => {
    axios.post(`/msw/user_auth`, { userEmail: userEmail, userPass: userPass })
    .then(response => {
      if (response.status == 200){
        store.commit(UserMutation.SET_USER_NAME, response.data.userName)
        store.commit(UserMutation.SET_USER_EMAIL, response.data.userEmail)
        store.commit(UserMutation.SET_USER_TOKEN, response.data.userToken)
        store.commit(UserMutation.SET_USER_LOGGED, true)
      }
    }).catch(e => {
      let msg = 'Não foi possível conectar com o servidor.'
      msg = e.response ? e.response.data.message : msg

      store.commit(UserMutation.SET_STORE_MSG_ERROR, msg)
    })
  },
}