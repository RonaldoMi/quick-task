<template>
  <div>
    <v-navigation-drawer
      app
      width="200"
      v-model="drawer"
      :clipped="$vuetify.breakpoint.lgAndUp"
    >
      <v-list
        dense
        shaped
      >
        <template
          v-for="(menu, index) in menuItems"
        >
          <v-list-item
            link
            :key="index"
            :to="menu.route"
          >
            <v-list-item-action>
              <v-icon>
                {{menu.icon}}
              </v-icon>
            </v-list-item-action>

            <v-list-item-content>
              <v-list-item-title
                :id="index"
              >
                {{ menu.text }}
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </template>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar
      app
      dark
      height="50"
      :clipped-left="$vuetify.breakpoint.lgAndUp"
      :style="bgGrandient"
    >
      <v-app-bar-nav-icon 
        @click="drawer = !drawer" 
        v-show="$vuetify.breakpoint.mdAndDown"
      />

      <v-toolbar-title
        style="width: 350px"
        class="ml-0 pl-4"
      >
        <v-layout
          align-center
        >
          <img
            src="@/assets/login/logo.png"
            height="35"
            width="35"
            contain
          />
          <span
            class="hidden-sm-and-down pl-3"
            style="font-family: Otomanopee One; font-size: 30px;"
          >
            <strong>Quick Task</strong>
          </span>
        </v-layout>
      </v-toolbar-title>

      <v-spacer/>

      <v-menu
        transition="slide-y-transition"
        bottom
        right
        offset-y
      >
        <template v-slot:activator="{ on }">
          <v-btn
            large
            text
            v-on="on"
          >
            <v-avatar
              size="32px"
              color="purple"
            >
              <span
                class="
                  white--text
                  headline
                  body-1"
              >
                {{ getAvatarName(useName) }}
              </span>
            </v-avatar>

            <b
              v-show="$vuetify.breakpoint.mdAndUp"
              class="text-capitalize pl-2"
            >
              {{ `Olá, ${getFirstName(useName)}` }}
            </b>
            <v-icon right dark>keyboard_arrow_down</v-icon>
          </v-btn>
        </template>

        <v-list
          dense
          shaped
        >
          <v-list-item
            @click="userLogout()"
          >
            <v-icon
              class="pr-3"
            >
              logout
            </v-icon>

            <v-list-item-title>
              Sair
            </v-list-item-title>

          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>
  </div>
</template>

<script lang="ts">
import { getAvatarName, getFirstName } from '@/mixins/helpersFunc'
import { UserMutation } from '@/store/user/mutations'

export default {
  name: 'DrawerMenu',


  data: () => ({
    getAvatarName: getAvatarName,
    getFirstName: getFirstName,

    drawer: true,
    menuItems: [
      { icon: 'home', text: 'Início', route: '/home' },
      { icon: 'task', text: 'Tarefas', route: '/task' },
    ],
    bgGrandient: 'background: linear-gradient(to bottom right, #1FB2AD, #022B8E)'
  }),

  computed: {
    useName: {
      get(): string {
        return this.$store.getters.getUserName
      }
    },

    userLogged: {
      get(): boolean {
        return this.$store.getters.getUserLogged
      },

      set (value: boolean): void {
        this.$store.commit(UserMutation.SET_USER_LOGGED, value);
      }
    }
  },

  methods: {
    userLogout(): void {
      this.userLogged = false
      this.$router.push('/');
    },
  },
};
</script>