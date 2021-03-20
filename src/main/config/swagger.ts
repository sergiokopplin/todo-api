import swaggerDocs from '@/main/docs'
import { noCache } from '@/main/middlewares'

import { serve, setup } from 'swagger-ui-express'
import { Express } from 'express'

export const swaggerConfig = (app: Express): void => {
  app.use('/api-docs', noCache, serve, setup(swaggerDocs))
}
