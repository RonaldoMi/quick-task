<template>
    <v-row
      class="pt-3"
    >
      <v-dialog
        :value="value"
        persistent
        width="800"
      >
        <v-card
          color="grey lighten-2"
        >
          <v-sheet
            :style="headerGrandient"
            elevation="1"
          >
            <v-card-title
              class="d-flex justify-space-between"
            >
              <span
                class="title white--text"
              >
                Nova Tarefa
              </span>

              <v-btn
                color="red"
                class="white--text"
                fab
                elevation="1"
                x-small
                @click="closeForm()"
              >
                <v-icon
                  dark
                >
                  close
                </v-icon>
              </v-btn>
            </v-card-title>
          </v-sheet>

          <v-container>
            <v-card
              class="px-3"
              replace
              outlined
              elevation="12"
            >
              <v-form
                class="pt-6"
                ref="form"
              >
                <v-row
                  no-gutters
                  justify="space-between"
                >
                  <v-col
                    md="6"
                    cols="12"
                  >
                    <v-text-field
                      v-model="taskInfo.title"
                      dense
                      outlined
                      label="Título"
                      prepend-icon="edit"
                      :rules="[helpers.rules.required]"
                    />
                  </v-col>

                  <v-col
                    md="5"
                    cols="6"
                  >
                    <v-select
                      v-model="taskInfo.priority"
                      :items="priorityTypes"
                      item-text="name"
                      item-value="value"
                      dense
                      outlined
                      label="Prioridade"
                      prepend-icon="star"
                      :rules="[helpers.rules.required]"
                    />
                  </v-col>

                  <v-col
                    cols="6"
                  >
                   <v-text-field
                      v-model="taskInfo.state"
                      dense
                      outlined
                      label="Status"
                      readonly
                      prepend-icon="check"
                    />
                  </v-col>

                  <v-col
                    md="5"
                    cols="12"
                  >
                    <v-menu
                      v-model="dateMenu"
                      :close-on-content-click="false"
                      transition="scale-transition"
                      offset-y
                      max-width="290px"
                      min-width="auto"
                    >
                      <template v-slot:activator="{ on, attrs }">
                        <v-text-field
                          :value="cpDateFormatted"
                          dense
                          outlined
                          readonly
                          label="Prazo Limite"
                          prepend-icon="mdi-calendar"
                          v-bind="attrs"
                          v-on="on"
                          :rules="[helpers.rules.required]"
                        ></v-text-field>
                      </template>
                      <v-date-picker
                        v-model="taskInfo.limiteDate"
                        no-title
                        @input="dateMenu = false"
                      ></v-date-picker>
                    </v-menu>
                  </v-col>

                  <v-col
                    cols="12"
                  >
                   <v-textarea
                      v-model="taskInfo.description"
                      dense
                      outlined
                      label="Descrição"
                    />
                  </v-col>
                </v-row>
              </v-form>

              <v-divider
                class="pb-2"
              />

              <v-card-actions>
                <v-spacer/>

                <v-btn
                  class="white--text text-capitalize px-6"
                  color="blue"
                  elevation="2"
                  rounded
                  :loading="savingTask"
                  @click.prevent="sendNewTask()"
                >
                  <v-icon
                    class="pr-2"
                  >
                    save
                  </v-icon>
                  <span>Salvar</span>
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-container>
        </v-card>
      </v-dialog>
    </v-row>
</template>

<script lang="ts">
  import helpers from '@/mixins/helpers'
  import moment from 'moment'
  import { VForm } from '@/mixins/helpers'


  export default {
    name: 'NewTask',

     props: {
      value: {
        type: Boolean,
        required: false,
        default: false
      },
    },

    data () {
      return {
        helpers: helpers,
        dateMenu: false,
        savingTask: false,
        headerGrandient: 'background: linear-gradient(to bottom right, #1FB2AD, #022B8E)',
        taskInfo: {
          title: '',
          limiteDate: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
          description: '',
          priority: 'normal',
          state: 'Novo'
        },
        priorityTypes: [
          {name: "Baixa", value: 'low'},
          {name: "Normal", value: 'normal'},
          {name: "Alta", value: 'high'},
        ],
      }
    },

    computed: {
      cpDateFormatted (): string {
        return moment(this.taskInfo.limiteDate).format('DD/MM/YYYY')
      },

      form(): VForm {
        return this.$refs.form as VForm
      }
    },

    methods: {
      async sendNewTask (): Promise<boolean> {
        let result = false

        try {
          if (this.form.validate() && !this.savingTask) {
            this.savingTask = true

            await this.$store.dispatch("postNewTask", {
              newTask: {
                title: this.taskInfo.title,
                description: this.taskInfo.description,
                limiteDate: this.taskInfo.limiteDate,
                priority: this.taskInfo.priority
              }
            })
            result = true
            this.closeForm()
          }

        } catch (error) {
          alert("Não foi possível criar uma nova tarefa, Erro interno")
        }

        this.savingTask = false
        return result
      },

      cleanForm (): void{
        this.taskInfo = {
          title: '',
          limiteDate: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
          description: '',
          priority: 'normal',
          state: 'Novo'
        }
        this.savingTask = false
      },

      closeForm (): void {
        this.$emit('close')
        this.cleanForm()
      }
    },
  }
</script>
