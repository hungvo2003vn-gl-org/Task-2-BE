import express, { NextFunction, Request, Response } from 'express'
import cors from 'cors'
import router from '../routers/index.ts'
import "dotenv/config";
import db from "./mongoDB.ts";
import { ErrorRO } from '#~/dro/error.interface.ts';

const port = process.env.PORT || 8000

const configExpressApp = async (app: express.Express): Promise<express.Express> => {
	
	db.connect()
	app.set('port', port)
	app.use(cors())
	app.use(express.json())
	app.use(express.urlencoded({extended: true}))
	app.use(router)

	//handle error middleware
	app.use((error: ErrorRO, req: Request, res: Response, next: NextFunction) => {

		console.log(error.message)
		const status = error.status || 500
		const message = error.message
		// const data = error.data
		res.status(status).json({message: message})

	})

	app.get('/', async function (req: Request, res: Response) {
		try {
			res.status(200).json({message: 'OK'})
		} catch (err) {
			res.status(500).json({message: err.message})
		}
	})
	
	app.listen(app.get('port'), async () => {
		try {
			console.log(`start server at port: ${app.get('port')}`)
		} catch (err) {
			console.log(err)
		}
	})
	return app
}

export default configExpressApp