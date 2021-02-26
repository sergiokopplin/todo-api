import { Express } from 'express'

import { bodyParser } from '@/main/middlewares'

export const middlewaresConfig = (app: Express): void => {
  app.use(bodyParser)
}
