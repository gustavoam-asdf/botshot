import type { Application, Request, Response } from "express"

import express from "express"

const app: Application = express()

const PORT = process.env.PORT || 3000

app.get("/", (_req: Request, res: Response) => {
	res.send("TypeScript With Express")
})

app.listen(PORT, () => {
	console.log(`Server listening on http://localhost:${PORT}/`)
})