import { Express } from 'express'

import { bodyParser, cors, contentType } from '@/main/middlewares'

export const middlewaresConfig = (app: Express): void => {
  app.use(contentType)
  app.use(bodyParser)
  app.use(cors)
}
