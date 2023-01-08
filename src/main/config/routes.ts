import { Express, Router } from 'express'

import { accountRoutes, todosRoutes } from '@/main/routes'

export const routesConfig = (app: Express): void => {
  const router = Router()

  app.use('/api', router)

  accountRoutes(router)
  todosRoutes(router)
}
