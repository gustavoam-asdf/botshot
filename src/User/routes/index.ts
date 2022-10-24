/* eslint-disable quotes */
import { Router } from "express"
import { userController } from "../controllers"

const userRouter = Router()

userRouter
	.get("/", userController.getAllUsers)
	.get("/", userController.getOneUser)
	.put("/:id", userController.updateUser)
	.delete("/:id", userController.deleteUser)
	.post("/register", userController.createUser)
	.post("/", userController.verifyUser)
	



export { userRouter }