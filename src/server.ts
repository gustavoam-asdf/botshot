import { Server } from "http"
import app from "./app"

export const server: Server = app.listen(app.get("port"), () => {
	console.log(
		"  App is running at http://localhost:%d in %s mode",
		app.get("port"),
		app.get("env")
	)
	console.log("  Press CTRL-C to stop\n")
})
