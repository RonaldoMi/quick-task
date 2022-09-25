<template>
  <div style="height: 95%; width: 95%;">
    <v-container class="d-flex justify-center">
      <div>
        <v-img
          src="@/assets/login/logo.png"
          :max-height="$vuetify.breakpoint.smAndDown ? '110px' : '150px'"
          contain
          @load="logoIsLoaded = true"
          class="logoAnimation"
        />
        <v-layout
          v-show="!logoIsLoaded"
          style="width:100%"
          align-center
          justify-center
        >
          <v-skeleton-loader
            height="150"
            width="150"
            type="card"
          />
        </v-layout>
      </div>
    </v-container>

    <v-col class="px-12" cols="12">
      <v-divider />
    </v-col>

    <v-container class="text-left">
      <v-form ref="form">
        <v-text-field
          v-model="userEmail"
          label="Email"
          placeholder="Exemplo@email.com.br"
          outlined
          rounded
          ref="email"
          append-icon="email"
          :rules="[
            helpers.rules.required,
            helpers.rules.validateEmail]"
        />

        <v-text-field
          v-model="userPass"
          label="Senha"
          outlined
          rounded
          placeholder="••••••••••••"
          ref="password"
          append-icon="visibility"
          :rules="[helpers.rules.validatePassword]"
          :type="showPassword ? 'text' : 'password'"
        >
          <template v-slot:append>
            <v-btn
              icon
              class="mt-n1"
              color="grey"
              @click="showPassword = !showPassword"
            >
              <v-icon
                color="grey"
              >
                {{ showPassword ? 'visibility' : 'visibility_off' }}
              </v-icon>
            </v-btn>
          </template>
        </v-text-field>

        <div class="mb-4">
            <span
              style="color: #FE5050"
            >
              {{storeMsgError}}
            </span>
        </div>

        <v-layout justify-center>
          <v-btn
            :loading="signinLoading"
            @click.prevent="onSignin"
            color="#47bcc3"
            rounded
            height="40"
            width="130"
            class="
              white--text
              text-capitalize
              font-weight-bold
              btnSignin"
          >
            <span
              :style="helpers.fonts.poppins(16, 'white')"
            >
              entrar
            </span>
            <v-icon
              color="white"
              class="pl-2"
            >
              exit_to_app
            </v-icon>
          </v-btn>
        </v-layout>
      </v-form>
    </v-container>
  </div>
</template>

<script lang="ts">
import helpers from '@/mixins/helpers'
import { VForm } from '@/mixins/helpers'
import { UserMutation } from '@/store/user/mutations'


export default {
  name: 'CardLogin',

  components: {

  },

  data() {
    return {
      helpers: helpers,
      userEmail: '',
      userPass: '',

      showPassword: false,
      logoIsLoaded: false,
      signinLoading: false,
    };
  },

  computed: {
    storeMsgError: {
      get (): string {
        return this.$store.getters.getStoreMsgError;
      },

      set (value: string): void {
        this.$store.commit(UserMutation.SET_STORE_MSG_ERROR, value);
      }
    },

    userLogged: {
      get (): boolean {
        return this.$store.getters.getUserLogged;
      },
    },

    form(): VForm {
      return this.$refs.form as VForm
    }
  },

  watch: {
    userLogged(): void {
      if (this.userLogged) {
        this.$router.push('task')
      }
    }
  },

  methods: {
    myHandler (event: KeyboardEvent): void {
      if (event.keyCode === 13) {
          this.onSignin();
      }
    },

    async onSignin(): Promise<void> {
      if (this.form.validate() && !this.signinLoading) {
        this.storeMsgError = ""

        await this.$store.dispatch("authUser", {
          userEmail: this.userEmail,
          userPass: this.userPass
        })
        this.signinLoading = true
      }

      this.signinLoading = false
    },
  },

  mounted(): void {
    window.addEventListener('keyup', this.myHandler);
  },

  beforeDestroy(): void {
    window.removeEventListener('keyup', this.myHandler);
  },
};
</script>
<style scoped>
.logoAnimation {
  animation: zoom-in 0.5s ease;
  animation-iteration-count: 1;
}

@keyframes zoom-in {
  0% {
    transform: scale(0.2, 0.2);
  }
  100% {
    transform: scale(1, 1);
  }
}

.btnSignin:hover{
  -webkit-animation: iconAnimation 0.3s forwards; /* for less modern browsers */
  animation: iconAnimation 0.3s forwards;
}

@keyframes iconAnimation {
  0% {
    transform: scale(1, 1);
    background-color: #47bcc3;
  }
  100% {
    transform: scale(1.1, 1.1);
    background-color: #086e72;
  }
}
</style>