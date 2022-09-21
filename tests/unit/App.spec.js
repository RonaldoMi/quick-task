import App from "@/App.vue"
import handlers from '../../src/mocks/handlers'
import {render, screen, waitFor} from '@testing-library/vue'
import { setupServer } from "msw/node"
import { rest } from 'msw'
import '@testing-library/jest-dom'
import * as fetchers from '@/services/fetchers'


const server = setupServer(...handlers)
const fetchMessageSpy = jest.spyOn(fetchers, 'fetchMessage')

beforeAll(() => server.listen())
afterEach(() => {
  server.resetHandlers()
  fetchMessageSpy.mockClear()
})
afterAll(() => server.close())

test("calls fetchMessage once and displays a message", async () => {
  render(App)

  await waitFor(() => {
    expect(screen.getByText('it works :)')).toBeInTheDocument()
  })
  expect(fetchMessageSpy).toHaveBeenCalledTimes(1)
});

test('shows an error message on server error', async () => {
  server.use(rest.get('/message', (req, res, ctx) => {
    return res(ctx.status(500))
  }))

  render(App)
  await waitFor(() => {
    expect(screen.getByText('server error :(')).toBeInTheDocument()
  })
  expect(fetchMessageSpy).toHaveBeenCalledTimes(1)
})
