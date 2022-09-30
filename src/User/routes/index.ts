import { Request, Response, Router } from "express"

const userRouter = Router()

userRouter
	.route("/")
	.get((req: Request, res: Response) => {
		res.send("Hola desde el router del usuario")
	})

export { userRouter }