import axios from 'axios';
import { ActionTree } from "vuex";
import { TaskStates } from './types';
import { RootState } from '@/store/types';
import { TaskMutation } from './mutations';
import store from '../';


export const actions: ActionTree<TaskStates, RootState> = {
  getAllTasks: async () => {
    axios.get(`/msw/get_tasks`, {
      headers: {
        'Access-Token': store.getters.getUserToken
      },
    })
    .then(response => {
      if (response.status == 200){
        store.commit(TaskMutation.SET_TASK_LIST, response.data.taskDb)
      }
    }).catch(e => {
      let msg = 'Não foi possível conectar com o servidor.'
      msg = e.response ? e.response.data.message : msg

      alert(msg)
    })
  },

  postNewTask: async (context,  { newTask }) => {
    axios.post(`/msw/create_task`,
    {
        title: newTask.title,
        description: newTask.description,
        priority: newTask.priority,
        limiteDate: newTask.limiteDate,
    },
    {
      headers: {
        'Access-Token': store.getters.getUserToken
      },
    })
    .then(response => {
      if (response.status == 200){
        store.commit(TaskMutation.ADD_TASK_IN_LIST, response.data.task)
      }
    }).catch(e => {
      let msg = 'Não foi possível conectar com o servidor.'
      msg = e.response ? e.response.data.message : msg

      alert(msg)
    })
  },
}