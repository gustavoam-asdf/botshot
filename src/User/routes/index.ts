import { Request, Response, Router } from "express"

import { mysqlPool } from "../../Shared/db"

const userRouter = Router()

userRouter
	.route("/")
	.get((req: Request, res: Response) => {
		res.send("Hola desde el router del usuario")
	})

userRouter
	.route("/ping")
	.get(async (req: Request, res: Response) => {
		const [result] = await mysqlPool.query("SELECT 'mensajedb' as result, 2 as number ;")
		res.send(result)
	})

export { userRouter }