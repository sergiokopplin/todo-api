import { Express } from 'express'
import { serve, setup } from 'swagger-ui-express'

import swaggerDocs from '@/main/docs'
import { noCache } from '@/main/middlewares'

export const swaggerConfig = (app: Express): void => {
  app.use('/api-docs', noCache, serve, setup(swaggerDocs))
}
