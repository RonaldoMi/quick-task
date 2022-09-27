import { TaskState } from '@/store/task/types';
import { rest } from 'msw'


// simulated database
const taskDb: Array<TaskState> = []
let lastTaskId: number

// Method to generate 30 tasks with random information
for (let i=0; i<30; i++){
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
  taskDb.push(newTask)
  lastTaskId = i+1
}


export const handlers = [
  // route for authentication of a new user
  rest.post('/msw/user_auth', async (req, res, ctx) => {
    const { userEmail, userPass } = await req.json()

    if (userEmail && userPass){
      return res(
        ctx.json({
          userToken: 'f79e82e8-c34a-4dc7-a49e-9fadc0979fda',
          userEmail,
          userName: 'Ronaldo Miranda',
        })
      );
    } else {
      return res(
        ctx.status(404),
        ctx.json({
          message: 'Não foi possível validar o usuário, \
                    parâmetros esperados -> [userEmail, userPass]'
        })
      );
    }
  }),

  // Route for authentication of a user already logged into the system
  rest.get('/msw/auth_token', async (req, res, ctx) => {
    const token: string | null = req.headers.get('access-token')

    if (token && token == 'f79e82e8-c34a-4dc7-a49e-9fadc0979fda'){
      return res(
        ctx.json({
          auth: true,
        })
      );
    } else {
      return res(
        ctx.status(400),
        ctx.json({
          message: 'Token inválido e/ou expirado.'
        })
      );
    }
  }),

  // route to submit all tasks
  rest.get('/msw/get_tasks', async (req, res, ctx) => {
    const token: string | null = req.headers.get('access-token')

    if (token && token == 'f79e82e8-c34a-4dc7-a49e-9fadc0979fda'){
      return res(
        ctx.json({ taskDb })
      );
    } else {
      return res(
        ctx.status(400),
        ctx.json({
          message: 'Token inválido e/ou expirado.'
        })
      );
    }
  }),

  // Route to create a new task
  rest.post('/msw/create_task', async (req, res, ctx) => {
    const token: string | null = req.headers.get('access-token')
    const taskInfo = await req.json()

    if (token && token == 'f79e82e8-c34a-4dc7-a49e-9fadc0979fda'){
      const newTask: TaskState = {
        id: lastTaskId+1,
        title: taskInfo.title,
        description: taskInfo.description,
        priority: taskInfo.priority,
        state: 'new',
        limiteDate: taskInfo.limiteDate,
        createDate: new Date(),
        doneDate: null,
      }
      taskDb.push(newTask)
      lastTaskId+1

      return res(
        ctx.json({
          task: newTask,
          message: 'Tarefa criada com sucesso!'
        })
      );
    } else {
      return res(
        ctx.status(400),
        ctx.json({
          message: 'Token inválido e/ou expirado.'
        })
      );
    }
  }),

  // Route to complete task
  rest.put('/msw/done_task', async (req, res, ctx) => {
    const token: string | null = req.headers.get('access-token')
    const task = await req.json()
    let msgError = 'Token inválido e/ou expirado.'

    if (token && token == 'f79e82e8-c34a-4dc7-a49e-9fadc0979fda'){
      const findTask = taskDb.find(el => el.id == task.id)

      if (findTask){
        findTask.state = 'done'
        findTask.doneDate = new Date()
        return res(
          ctx.json({
            task: findTask,
            message: 'Tarefa concluída com sucesso!'
          })
        );
      } else {
        msgError = 'Tarefa não encontrada.'
      }
    }
    return res(
      ctx.status(400),
      ctx.json({
        message: msgError
      })
    );
  }),

  // Route to delete task
  rest.delete('/msw/delete_task', async (req, res, ctx) => {
    const token: string | null = req.headers.get('access-token')
    const taskId = req.url.searchParams.get('taskId')
    let msgError = 'Token inválido e/ou expirado.'

    if (token && token == 'f79e82e8-c34a-4dc7-a49e-9fadc0979fda'){
      const indexTask = taskDb.findIndex(el => el.id == Number(taskId))

      if (indexTask > -1){
        taskDb.splice(indexTask, 1)
        return res(
          ctx.json({
            taskId: Number(taskId),
            message: 'Tarefa Removida com sucesso!'
          })
        );
      } else {
        msgError = 'Tarefa não encontrada.'
      }
    }
    return res(
      ctx.status(400),
      ctx.json({
        message: msgError
      })
    );
  }),
];