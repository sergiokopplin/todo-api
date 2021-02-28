import { Express, Router } from 'express'

import { exampleRoute } from '@/main/routes'

export const routesConfig = (app: Express): void => {
  const router = Router()

  app.use('/api', router)

  exampleRoute(router)
}
