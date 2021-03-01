import { Express, Router } from 'express'

import { accountRoutes, todoRoutes } from '@/main/routes'

export const routesConfig = (app: Express): void => {
  const router = Router()

  app.use('/api', router)

  accountRoutes(router)
  todoRoutes(router)
}
