import express from 'express'
import configExpressApp from './src/config/express.ts'

const app = express()
configExpressApp(app)