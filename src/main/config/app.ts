import express from 'express'

import { middlewaresConfig } from './middlewares'

const app = express()

middlewaresConfig(app)

export { app }
