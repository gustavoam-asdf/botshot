import type { Application } from "express"
import express from "express"

const app: Application = express()

const port = 3000

app.get("/", (_req, res) => {
	res.send("TypeScript With Express")
})

app.listen(port, () => {
	console.log(`TypeScript with Express http://localhost:${port}/`)
})