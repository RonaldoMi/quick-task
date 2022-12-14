import '@testing-library/jest-dom'
import { generateRandTasks, calcChartTasks } from '../../src/mixins/helpersFunc'


describe('calls calcChartTasks passing a task list with random information', () => {
  it('Calls generateRandTasks() and generate 100 random tasks', () => {
    // generating the tasks
    const tasks = generateRandTasks(100)
    expect(tasks.length == 100).toBeTruthy()
  })

  it('Calls calcChartTasks() with 100 randomly generated tasks', () => {
    // generating the tasks
    const tasks = generateRandTasks(100)
    let chartTasks = []
    expect(tasks.length == 100).toBeTruthy()

    // Calculating the number of tasks per day
    if (tasks) {
      chartTasks = calcChartTasks(tasks)
    }
    expect(typeof(chartTasks) == 'object').toBeTruthy()
  })

  it('Check integrity of data generated by calcChartTasks()', () => {
    // generating the tasks
    let chartTasks = []
    const tasks = generateRandTasks(100)
    expect(tasks.length == 100).toBeTruthy()

    // Calculating the number of tasks per day
    if (tasks) {
      chartTasks = calcChartTasks(tasks)
    }
    expect(typeof(chartTasks)).toEqual('object')

    // Checking data integrity of completed tasks
    const amountDoneTsk = tasks.filter(el => el.state == 'done').length
    let amtChartDoneTsk = 0

    Object.keys(chartTasks.doneDate).forEach(key => {
      amtChartDoneTsk += chartTasks.doneDate[key]
    })
    expect(amtChartDoneTsk).toEqual(amountDoneTsk)

    // Checking data integrity of total created tasks
    const amountCrtTsk = tasks.length
    let amtChartCrtTsk = 0

    Object.keys(chartTasks.createDate).forEach(key => {
      amtChartCrtTsk += chartTasks.createDate[key]
    })
    expect(amtChartCrtTsk).toEqual(amountCrtTsk)
  })
})
