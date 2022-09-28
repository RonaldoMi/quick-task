import { TaskState } from "@/store/task/types";
import moment from "moment";


// return first letter of first and last name
export function getAvatarName(name: string): string{
  if (name){
    const firstLetter = name.charAt(0)
    const lastSpace = name.lastIndexOf(" ")
    let lastLetter = ""

    if(lastSpace > 0) {
      lastLetter = name.substring(lastSpace + 1, lastSpace + 2);
    }

    return (firstLetter + lastLetter).toUpperCase()
  }

  return ''
}

// return first name from a full name
export function getFirstName(name: string): string {
  if (name){
    return name.split(' ').slice(0, -1).join(' ')
  }

  return ''
}

// returns total tasks completed and created per day for chart display
// eslint-disable-next-line
export function calcChartTasks (tasks: Array<TaskState>): { doneDate: any, createDate: any } {
  interface CreateDate {
      [key: string]: number
  }
  interface DoneDate {
    [key: string]: number
  }
  const createDate: CreateDate = {}
  const doneDate: DoneDate = {}

  tasks.forEach(task => {
    const crtDateKey = moment(task.createDate).format("DD/MM/YYYY")
    const doneDateKey = task.doneDate ? moment(task.doneDate).format("DD/MM/YYYY") : null

    createDate[crtDateKey] = !isNaN(createDate[crtDateKey]) ? createDate[crtDateKey] + 1 : 1
    if (doneDateKey){
      doneDate[doneDateKey] = !isNaN(doneDate[doneDateKey]) ? doneDate[doneDateKey] + 1 : 1
    }
  })
  return { doneDate: doneDate, createDate: createDate }
}

export function generateRandTasks (amount: number): Array<TaskState> | undefined {
  const taskList: Array<TaskState> = []

  // Method to generate x tasks with random information
  for (let i=0; i<amount; i++){
    const prioritys = ['low', 'normal', 'high']
    const states = ['new', 'done']
    const lmDate = new Date(new Date().setDate(Math.floor(Math.random() * 28)))
    const crDate = new Date(new Date().setDate(Math.floor(Math.random() * 28)))
    const doneDate = new Date(new Date().setDate(Math.floor(Math.random() * 28)))

    const randState = states[Math.floor(Math.random() * 2)]
    const newTask: TaskState = {
      id: i+1,
      title: `Gerada automática ${i}`,
      description: `Descrição automática ${i}`,
      priority: prioritys[Math.floor(Math.random() * 3)],
      state: randState,
      limiteDate: lmDate,
      createDate: crDate,
      doneDate: randState == 'done' ? doneDate : null
    }
    taskList.push(newTask)
  }

  return taskList
}