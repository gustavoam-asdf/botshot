import { RowDataPacket } from "mysql2"

export type iUser = User & RowDataPacket
export class User {
	constructor(
		public id: number,
		public name: string,
		public lastName: string,
		public email: string,
		public password: string,
		public profile_id: number
	) {

	}
}