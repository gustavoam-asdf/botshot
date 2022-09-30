import type { Application } from "express"
import express from "express"
import path from "path"
import { router } from "./router"

const app: Application = express()

const PORT = process.env.PORT || 3000
app.set("port", PORT)

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const STATIC_FILES_PATH = path.join(__dirname, "../public")
app.use(express.static(STATIC_FILES_PATH, {
	maxAge: 31557600000
}))

app.use("/api", router)

export { app }