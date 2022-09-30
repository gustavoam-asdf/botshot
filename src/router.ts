import { Router } from "express"
import { userRouter } from "./User/routes"

const router = Router()

router.use("/users", userRouter)

export { router }