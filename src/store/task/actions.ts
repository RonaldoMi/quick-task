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
    let result = false
    await axios.post(`/msw/create_task`,
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
        result = true
        store.commit(TaskMutation.ADD_TASK_IN_LIST, response.data.task)
      }
    }).catch(e => {
      let msg = 'Não foi possível conectar com o servidor.'
      msg = e.response ? e.response.data.message : msg

      alert(msg)
    })

    return result
  },

  doneTask: async (context,  taskId: number) => {
    let result = false
    await axios.put(`/msw/done_task`, { id: taskId} ,
    {
      headers: {
        'Access-Token': store.getters.getUserToken
      },
    })
    .then(response => {
      if (response.status == 200){
        result = true
        store.commit(TaskMutation.PUT_TASK_IN_LIST, response.data.task)
      }
    }).catch(e => {
      let msg = 'Não foi possível conectar com o servidor.'
      msg = e.response ? e.response.data.message : msg

      alert(msg)
    })

    return result
  },

  deleteTask: async (context,  taskId: number) => {
    let result = false
    await axios.delete(`/msw/delete_task`,
    {
      params: {
        taskId: taskId
      },
      headers: {
        'Access-Token': store.getters.getUserToken
      },
    })
    .then(response => {
      if (response.status == 200){
        result = true
        store.commit(TaskMutation.DEL_TASK_IN_LIST, response.data.taskId)
      }
    }).catch(e => {
      let msg = 'Não foi possível conectar com o servidor.'
      msg = e.response ? e.response.data.message : msg

      alert(msg)
    })

    return result
  },
}