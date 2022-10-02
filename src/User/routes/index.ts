import { Router } from "express"
import { userController } from "../controllers"

const userRouter = Router()

userRouter
	.get("/", userController.getAllUsers)
	.get("/:id", userController.getOneUser)
	.post("/", userController.createUser)
	.put("/:id", userController.updateUser)
	.delete("/:id", userController.deleteUser)

export { userRouter }