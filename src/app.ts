/* eslint-disable @typescript-eslint/no-var-requires */

import type { Application } from "express"
import { LOG_FORMAT } from "./Shared/config"
import express from "express"
import morgan from "morgan"
import path from "path"
import { router } from "./router"


const app: Application = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const STATIC_FILES_PATH = path.join(__dirname, "../public")
app.use(express.static(STATIC_FILES_PATH, {
	maxAge: 31557600000
}))

app.use(morgan(LOG_FORMAT))

// eslint-disable-next-line quotes
app.use('/',router)
// eslint-disable-next-line quotes

export { app }