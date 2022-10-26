import { RowDataPacket } from "mysql2"
export type iUser = User & RowDataPacket
export class User {
	constructor(
		public dni: string,
		public name: string,
		public lastName: string,
		public email: string,
		public nameuser: string,
		public password: string,
		public profile_id: number
	) {
	}
}