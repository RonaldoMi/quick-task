<template>
  <div
    class="
      main
      d-flex justify-center
      align-center">
    <v-card
      :height="mainCardSize.height"
      :width="mainCardSize.width"
      elevation="12"
      color="white"
      class="mainCard"
    >
      <v-layout
        style="height: 100%"
        align-center
        justify-center
      >
        <v-card
          :class="cardLeftClass"
          :height="$vuetify.breakpoint.lgAndUp ? '640px' : mainCardSize.height"
          :width="$vuetify.breakpoint.lgAndUp ? '55%' : mainCardSize.width"
          color="white"
          elevation="0"
        >
          <v-layout style="height:100%" column align-center justify-center>
            <CardLogin/>

            <v-layout>
              <span
                class="d-flex justify-center"
                :style="helpers.fonts.poppins('10px', '#686872', '400')"
              >
                Powered By .:
                <a
                  href="https://github.com/RonaldoMi/quick-task"
                >
                  Ronaldo Miranda
                </a>
                :.
              </span>
            </v-layout>
          </v-layout>
        </v-card>

        <v-card
          v-if="!$vuetify.breakpoint.mobile"
          class="cardRight"
          :height="bannerSize.height"
          :width="bannerSize.width"
          elevation="8"
        />
      </v-layout>
    </v-card>
  </div>
</template>

<script lang="ts">
import CardLogin from './CardLogin.vue'
import helpers from "@/mixins/helpers"


export default {
  name: 'MainLogin',

  components: {
    CardLogin,
  },

  data() {
    return {
      helpers: helpers,
      user: '',
      password: '',
      loading: false,
    };
  },

  methods: {

  },

  computed: {
    mainCardSize(): object {
      let result: object = {
        height: 0,
        width: 0
      }

      switch (this.$vuetify.breakpoint.name) {
        case 'xs':
          result = {height: 568, width: 400}
          break;
        case 'sm':
          result = {height: 550, width: 550}
          break;
        case 'md':
          result = {height: 600, width: 600}
          break;
        case 'lg':
          result = {height: 1280/2, width: 1200}
          break;
        case 'xl':
          result = {height: 1280/1.4, width: 1500}
          break;
      }

      return result
    },

    bannerSize(): object {
      let result: object = {
        height: 0,
        width: 0
      }

      switch (this.$vuetify.breakpoint.name) {
        case 'lg': 
          result = {height: 1280/2, width: 1024/1.7}
          break;
        case 'xl': 
          result = {height: 1280/1.4, width: 1024/1.2}
          break;
      }

      return result
    },

    cardLeftClass(): string {
      let result = 'cardLeft '

      if (this.$vuetify.breakpoint.mdAndDown){
        result += 'mobile'
      }

      return result
    }
  }

};
</script>
<style scoped>
.main{
  width: 100%;
  height: 100%;
  background: #1FB2AD;
  background: -webkit-linear-gradient(top left, #1FB2AD, #022B8E);
  background: -moz-linear-gradient(top left, #1FB2AD, #022B8E);
  background: linear-gradient(to bottom right, #1FB2AD, #022B8E);
}

.mainCard {
  border-radius: 1rem !important;
}

.cardRight {
  background-image: url('../../assets/login/background.png');
  background-position: top;
  background-size: 108%;
  border-radius: 0 !important;
  animation: zoom-out 0.7s ease;
  animation-iteration-count: 1;
  border-top-right-radius: 1rem !important;
  border-bottom-right-radius: 1rem !important;;
}

.cardLeft {
  border-top-left-radius: 1rem !important;
  border-bottom-left-radius: 1rem !important;
}

.cardLeft .mobile {
  border-radius: 1rem !important;
}

@keyframes zoom-out {
  0% {
    transform: scale(1.2, 1.2);
  }
  100% {
    transform: scale(1, 1);
  }
}
</style>