<template>
  <div>
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
          <v-flex
            xs8
            sm4
            md2
          >
            <v-btn
              class="text-capitalize white--text"
              color="blue"
              elevation="1"
              @click.prevent="showNewTask = true"
            >
              <v-icon
                class="pr-1"
              >
                post_add
              </v-icon>
              Criar Tarefa
            </v-btn>
          </v-flex>

          <v-spacer/>

          <v-flex
            xs8
            sm8
            md5
          >
            <v-text-field
              v-model="search"
              flat
              solo
              hide-details
              prepend-inner-icon="search"
              label="Busca Rápida"
            ></v-text-field>
          </v-flex>

          <template v-if="$vuetify.breakpoint.mdAndUp">
            <v-spacer/>
              <v-tooltip
                bottom
              >
                <template v-slot:activator="{ on }">
                  <v-flex
                    md2
                    v-on="on"
                  >
                    <v-select
                      @change="sortBy()"
                      v-model="selectSortBy"
                      flat
                      solo-inverted
                      hide-details
                      :items="labelKeys"
                      prepend-inner-icon="filter_list"
                      label="Ordenar Por"
                    ></v-select>
                  </v-flex>
                </template>
                <span>Ordenar Por</span>
              </v-tooltip>

            <v-spacer/>

            <v-flex
              md1
            >
              <v-btn-toggle
                v-model="sortDesc"
                mandatory
              >
                <v-tooltip bottom>
                  <template v-slot:activator="{ on }">
                    <v-btn
                      v-on="on"
                      normal
                      depressed
                      color="grey lighten-2"
                      :value="false"
                    >
                      <v-icon>keyboard_arrow_up</v-icon>
                    </v-btn>
                  </template>
                  <span>Ordenar de A a Z</span>
                </v-tooltip>
                <v-tooltip bottom>
                  <template v-slot:activator="{ on }">
                    <v-btn
                      v-on="on"
                      normal
                      depressed
                      color="grey lighten-2"
                      :value="true"
                    >
                      <v-icon>keyboard_arrow_down</v-icon>
                    </v-btn>
                  </template>
                  <span>Ordenar de Z a A</span>
                </v-tooltip>
              </v-btn-toggle>
            </v-flex>
          </template>
          <v-spacer/>

        </v-toolbar>
      </template>

      <template v-slot:default="props">
        <div
          v-for="item in props.items"
          :key="item.id"
          class="py-2 px-2"
        >
          <v-card
            @click="openTaskDetail(item)"
          >
            <v-row
              :class="`
                py-0
                pa-3
                d-flex align-center
                taskBorder ${item.state}`"
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
                          <span>{{ formatDate(item.createDate) }}</span>
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
                                v-for="(num, index) in 3"
                                :key="index"
                                :color="num <= priorityTypes[item.priority][1] ? 'purple' : ''"
                              >
                                star
                              </v-icon>
                            </v-layout>
                          </template>
                          <span>{{priorityTypes[item.priority][0]}}</span>
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
                            <span>{{priorityTypes[item.priority][0]}}</span>
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

    <NewTask
      v-model="showNewTask"
      @close="showNewTask = false"
    />
    <TaskDetails
      v-model="showTaskDetails"
      :task="selectedTask"
      @close="showTaskDetails = false"
    />
  </div>
</template>

<script lang="ts">
  import moment from 'moment'
  import NewTask from './NewTask.vue'
  import TaskDetails from './TaskDetails.vue'
  import { TaskState, TaskStates } from '@/store/task/types'


  export default {
    name: 'MainTask',

    components: {
      NewTask,
      TaskDetails
    },

    data () {
      return {
        selectedTask: {} as TaskState,
        selectSortBy: 'Criado em',
        search: '',
        sortDesc: true,
        page: 1,
        itemsPerPage: 15,
        valueSortBy: 'createDate',
        showNewTask: false,
        showTaskDetails: false,
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
          low: ['Baixa', 1],
          normal: ['Normal', 2],
          high: ['Alta', 3],
        },
        stateNames: {
          new: 'Novo',
          done: 'Concluído',
        },
      }
    },

    computed: {
      taskList (): TaskStates {
        return this.$store.getters.getTaskList
      },

      numberOfPages (): number {
        return Math.ceil(this.taskList.length / this.itemsPerPage)
      },
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

      formatDate (date: Date): string {
        return moment(date).format("DD/MM/YYYY")
      },

      openTaskDetail (task: TaskState): void {
        this.selectedTask = task
        this.showTaskDetails = true
      }
    },

    mounted(){
      this.$store.dispatch("getAllTasks")
    }
  }
</script>

<style>
.taskBorder.new {
  border-left: 4px solid cornflowerblue;
}
.taskBorder.done {
  border-left: 4px solid green;
}
</style>