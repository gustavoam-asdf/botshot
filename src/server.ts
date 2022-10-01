import { PORT } from "./Shared/config"
import { Server } from "http"
import { app } from "./app"

export const server: Server = app.listen(PORT, () => {
	console.log(
		" 🚀 App is running at http://localhost:%d in %s mode",
		PORT,
		app.get("env")
	)
	console.log("    Press CTRL-C to stop\n")
})
