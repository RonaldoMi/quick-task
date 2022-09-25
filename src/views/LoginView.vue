<template>
  <MainLogin />
</template>

<script lang="ts">
  import Vue from 'vue'
  import MainLogin from '../components/Login/MainLogin.vue'

  export default Vue.extend({
    name: 'LoginView',

    components: {
      MainLogin,
    },
  })
</script>
