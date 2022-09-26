<template>
  <v-app>
    <DrawerMenu
      v-if="disableMenu()"
    />

    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue';
import DrawerMenu from '@/components/Global/DrawerMenu.vue'

export default Vue.extend({
  name: 'App',

  components: {
    DrawerMenu
  },

  data: () => ({
    //
  }),

  methods: {
    disableMenu(): boolean {
      return this.$route.meta?.requiresAuth
    },
  }
});
</script>
