import { UserMutation } from './../store/user/mutations';
import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import LoginView from '../views/LoginView.vue'
import TaskView from '@/views/TaskView.vue'
import axios from 'axios'
import store from '@/store/index'


Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'login',
    component: LoginView,
    meta: {
      breadCrumb: '',
      title: 'Login',
      requiresAuth: false,
    },
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach(async (to, from, next) =>  {
  if (to.matched.some(route => route.meta.requiresAuth)) {
    await axios.get('/msw/auth_token', {
      headers: {
        'Access-Token': store.getters.getUserToken
      },
    })
    .then(response => {
      if(response['status'] == 200) {
          next()
        }
      })
    .catch(e => {
      store.commit(UserMutation.SET_USER_LOGGED, false)
      let msg = "Não foi possível validar o token."
      msg = e.response ? e.response.data.message : msg
      alert(msg)

      next({ path: '/' })
    })
  } else {
    next()
  }
})

export default router
