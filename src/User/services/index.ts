import { mysqlPool } from "../../Shared/db"

export function getUser(id: string) {
	return mysqlPool.query("SELECT * FROM users WHERE id = ?", [id])
}