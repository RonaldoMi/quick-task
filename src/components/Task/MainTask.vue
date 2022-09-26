<template>
  <v-data-iterator
    ref="dataIterator"
    :items="taskList"
    :items-per-page.sync="itemsPerPage"
    :page="page"
    :search="search"
    :sort-by="valueSortBy"
    :sort-desc="sortDesc"
    hide-default-footer
    class="px-0"
    no-results-text='Tarefa não encontrada :('
    no-data-text='Nenhum registro encontrado.'
  >
    <template v-slot:header>
      <v-toolbar
        color="grey lighten-2"
        class="mb-1"
        elevation="2"
      >
        <v-flex xs8 sm4 md1>
          <v-btn
            class="text-capitalize white--text"
            color="blue"
            elevation="1"
          >
            <v-icon class="pr-1">post_add</v-icon>
            Criar Tarefa
          </v-btn>
        </v-flex>
        <v-spacer></v-spacer>
        <v-flex xs8 sm8 md9>
          <v-text-field
            v-model="search"
            flat
            solo
            hide-details
            prepend-inner-icon="search"
            label="Busca Rápida"
          ></v-text-field>
        </v-flex>
        <v-spacer/>

      </v-toolbar>
    </template>

    <template v-slot:default="props">
      <div
        v-for="item in props.items"
        :key="item.id"
        class="py-2 px-2"
      >
        <v-card>
          <v-row
            class="py-0 pa-3 d-flex align-center taskBorder"
            no-gutters
          >
            <v-list-item>
              <v-col cols="12">
                <v-card flat>
                  <v-row>
                    <v-flex
                      xs6
                      md4
                      class="text-truncate"
                    >
                      <div
                        class="caption grey--text text-left"
                      >
                        Título
                      </div>
                      <span class="text-body-2">
                        {{ item.title }}
                      </span>
                    </v-flex>

                    <v-flex
                      xs6
                      md3
                      class="text-truncate"
                    >
                      <div
                        class="caption grey--text text-left"
                      >
                        Criado em
                      </div>
                      <div>
                        <span>{{ item.createDate }}</span>
                      </div>
                    </v-flex>

                    <v-flex
                      xs6
                      md2
                      class="text-truncate"
                    >
                      <div
                        class="caption grey--text text-left"
                      >
                        Prioridade
                      </div>

                      <v-tooltip
                        bottom
                      >
                        <template v-slot:activator="{ on }">
                          <v-layout v-on="on">
                            <v-icon
                              color="purple"
                              v-for="(num, index) in priorityTypes[item.priority]"
                              :key="index"
                            >
                              star
                            </v-icon>
                          </v-layout>
                        </template>
                        <span>{{priorityNames[item.priority]}}</span>
                      </v-tooltip>
                    </v-flex>

                    <v-flex
                      xs6
                      md3
                      class="text-truncate"
                    >
                      <div
                        class="caption grey--text text-center"
                      >
                        Status
                      </div>

                      <div
                        class="d-flex justify-center"
                      >
                        <v-tooltip
                          bottom
                        >
                          <template v-slot:activator="{ on }">
                            <v-chip
                              small
                              class="white--text"
                              v-on="on"
                              :color="item.state == 'new' ? 'blue' : 'green'"
                            >
                              {{stateNames[item.state]}}
                            </v-chip>
                          </template>
                          <span>{{priorityNames[item.priority]}}</span>
                        </v-tooltip>
                      </div>
                    </v-flex>
                  </v-row>
                </v-card>
              </v-col>
            </v-list-item>
          </v-row>
        </v-card>
      </div>
    </template>

    <template v-slot:footer>
      <v-row class="mt-2 px-6 d-flex justify-space-between" align="center" justify="center">
        <v-spacer/>
        <div>
          <span
            class="mr-4
            grey--text"
          >
            Página {{ page }} de {{ numberOfPages }}
          </span>
          <v-btn
            elevation="2"
            small
            fab
            normal
            color="grey lighten-2"
            class="mr-5"
            @click="formerPage"
          >
            <v-icon>keyboard_arrow_left</v-icon>
          </v-btn>
          <v-btn
            elevation="2"
            small
            fab
            normal
            color="grey lighten-2"
            class="mr-2"
            @click="nextPage"
          >
            <v-icon>keyboard_arrow_right</v-icon>
          </v-btn>
        </div>
      </v-row>
    </template>
  </v-data-iterator>
</template>

<script lang="ts">
  import moment from 'moment'


  export default {
    name: 'MainTask',

    components: {
    },

    data () {
      return {
        selectSortBy: 'Título',
        search: '',
        sortDesc: true,
        page: 1,
        itemsPerPage: 40,
        valueSortBy: '',
        keys: [
          'title',
          'createDate',
          'priority',
          'state',
        ],
        labelKeys: [
          'Título',
          'Criado em',
          'Prioridade',
          'Status',
        ],
        priorityTypes: {
          low: 1,
          normal: 2,
          high: 3,
        },
        priorityNames: {
          low: 'Baixa',
          normal: 'Normal',
          high: 'Alta',
        },
        stateNames: {
          new: 'Novo',
          done: 'Concluído',
        },
        taskList: [
          {
            title: 'Primeira Tarefa',
            createDate: moment(new Date()).format('DD/MM/YYYY - hh:mm'),
            priority: 'low',
            state: 'new'
          },
          {
            title: 'Segunda Tarefa',
            createDate: moment(new Date()).format('DD/MM/YYYY - hh:mm'),
            priority: 'normal',
            state: 'done'
          },
          {
            title: 'Terceira Tarefa',
            createDate: moment(new Date()).format('DD/MM/YYYY - hh:mm'),
            priority: 'high',
            state: 'new'
          },
        ]
      }
    },

    methods: {
      sortBy(): void {
        const i = this.labelKeys.indexOf(this.selectSortBy)
        this.valueSortBy = this.keys[i]
      },

      nextPage (): void {
        if (this.page + 1 <= this.numberOfPages) {
          this.page += 1
        }
      },

      formerPage (): void {
        if ((this.page - 1) >= 1) {
          this.page -= 1
        }
      },

      updateItemsPerPage (value: number): void {
        this.itemsPerPage = value
      },
    },

    computed: {
      numberOfPages (): number {
        return Math.ceil(this.taskList.length / this.itemsPerPage)
      },
    },
  }
</script>

<style>
.taskBorder {
  border-left: 4px solid cornflowerblue;
}
</style>