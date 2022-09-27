<template>
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
          <v-flex
            sm4
            md3
          >
            <span
              class="title white--text"
            >
              Detalhes da Tarefa
            </span>
          </v-flex>

          <v-flex
            sm4
            md6
            class="d-flex justify-center"
          >
            <v-menu
              transition="slide-y-transition"
              bottom
              right
              offset-y
            >
              <template v-slot:activator="{ on }">
                <v-btn
                  elevation="1"
                  small
                  color="blue-grey"
                  class="white--text text-capitalize text-subtitle-2"
                  v-on="on"
                >
                  Ações
                  <v-icon right dark>keyboard_arrow_down</v-icon>
                </v-btn>
              </template>
              <v-list dense>
                <template v-for="item in actionMenu">
                  <v-list-item
                    :key="item.text"
                    @click="handleSubMenuClick(item.id)"
                    link
                  >
                    <v-list-item-action>
                      <v-icon>{{ item.icon }}</v-icon>
                    </v-list-item-action>
                    <v-list-item-content>
                      <v-list-item-title>
                        {{ item.text }}
                      </v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                </template>
              </v-list>
            </v-menu>
          </v-flex>

          <v-flex
            sm3
            md3
            class="d-flex justify-end"
          >
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
          </v-flex>
        </v-card-title>
      </v-sheet>

      <v-container>
        <v-card
          class="px-3"
          replace
          outlined
          elevation="12"
        >
          <v-row
            no-gutters
            justify="space-between"
            class="pt-5"
          >
            <v-col
              cols="12"
            >
              <v-text-field
                :value="task.title"
                dense
                outlined
                readonly
                label="Título"
                prepend-icon="edit"
              />
            </v-col>

            <v-col
              md="6"
              sm="5"
              cols="12"
            >
              <v-text-field
                :value="limDateFormatted"
                dense
                outlined
                readonly
                label="Prazo Limite"
                prepend-icon="mdi-calendar"
              ></v-text-field>
            </v-col>

            <v-col
              md="5"
              sm="5"
              cols="12"
            >
              <v-text-field
                :value="crtDateFormatted"
                dense
                outlined
                readonly
                label="Criado em"
                prepend-icon="mdi-calendar"
              ></v-text-field>
            </v-col>

            <v-col
              md="6"
              sm="5"
              cols="6"
            >
              <v-text-field
                :value="priorityTypes[task.priority]"
                dense
                outlined
                readonly
                label="Prioridade"
                prepend-icon="star"
              />
            </v-col>

            <v-col
              md="5"
              sm="5"
              cols="6"
            >
              <v-text-field
                :value="task.state"
                dense
                outlined
                label="Status"
                readonly
                prepend-icon="check"
              />
            </v-col>

            <v-col
              cols="12"
            >
              <v-textarea
                :value="task.description"
                dense
                outlined
                readonly
                label="Descrição"
              />
            </v-col>
          </v-row>
        </v-card>
      </v-container>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
  import helpers from '@/mixins/helpers'
  import moment from 'moment'
  import { TaskState } from '@/store/task/types'

  export default {
    name: 'TaskDetails',

     props: {
      value: {
        type: Boolean,
        required: false,
        default: false
      },

      task: {
        type:  Object as () => TaskState,
        required: true
      }
    },

    data () {
      return {
        helpers: helpers,
        dateMenu: false,
        savingTask: false,
        headerGrandient: 'background: linear-gradient(to bottom right, #1FB2AD, #022B8E)',
        priorityTypes: {
          low: 'Baixa',
          normal: 'Normal',
          high: 'Alta',
        },
        actionMenu: [
          { icon: 'done', text: 'Concluir Tarefa', id: 1 },
          { icon: 'delete', text: 'Excluir Tarefa', id: 2 },
        ],
      }
    },

    computed: {
      crtDateFormatted (): string {
        return moment(this.task.createDate).format('DD/MM/YYYY hh:mm')
      },

      limDateFormatted (): string {
        return moment(this.task.limiteDate).format('DD/MM/YYYY')
      },
    },

    methods: {
      handleSubMenuClick (id: number): void {
        switch (id) {
          case 1:
            console.log("Concluir")
            break;
          case 2:
            console.log("Deletar")
            break;
        }
      },

      closeForm (): void {
        this.$emit('close')
      }
    },
  }
</script>
