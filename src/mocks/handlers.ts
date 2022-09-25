import { rest } from 'msw'


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
  })
];