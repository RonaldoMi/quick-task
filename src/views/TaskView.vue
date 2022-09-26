<template>
  <MainTask />
</template>

<script lang="ts">
  import Vue from 'vue'
  import MainTask from '@/components/Task/MainTask.vue'

  export default Vue.extend({
    name: 'TaskView',

    components: {
      MainTask,
    },
  })
</script>