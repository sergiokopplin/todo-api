import express from 'express'

import { middlewaresConfig } from './middlewares'
import { routesConfig } from './routes'

const app = express()

middlewaresConfig(app)
routesConfig(app)

export default app
