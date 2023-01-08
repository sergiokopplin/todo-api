import express from 'express'

import { middlewaresConfig } from './middlewares'
import { routesConfig } from './routes'
import { staticConfig } from './static-files'
import { swaggerConfig } from './swagger'

const app = express()

staticConfig(app)
swaggerConfig(app)
middlewaresConfig(app)
routesConfig(app)

export default app
