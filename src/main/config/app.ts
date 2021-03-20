import express from 'express'

import { middlewaresConfig } from './middlewares'
import { routesConfig } from './routes'
import { swaggerConfig } from './swagger'
import { staticConfig } from './static-files'

const app = express()

staticConfig(app)
swaggerConfig(app)
middlewaresConfig(app)
routesConfig(app)

export default app
