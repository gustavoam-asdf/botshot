import { User, iUser } from "../models/user"

import { mysqlPool } from "../../Shared/db"

type iUserIdentifiers = Pick<iUser, "id" | "email" | "password">

export async function getOneUser({
	id,
	email,
	password,
}: iUserIdentifiers) {
	const query = /*sql*/ `
		SELECT
			id,
			name,
			lastName,
			email,
			password,
			profile_id
		FROM user WHERE email = ? AND password = ? AND id = ?
	`
	const [result] = await mysqlPool.query<iUser[]>(query, [email, password, id])

	return result[0]
}

export async function getAllUsers() {
	const query = /*sql*/ `
		SELECT
			id,
			name,
			lastName,
			email,
			password,
			profile_id
		FROM user
	`
	const [result] = await mysqlPool.query<iUser[]>(query)
	return result
}

export async function createUser({
	name,
	lastName,
	email,
	password,
	profile_id,
}: Omit<User, "id">) {
	const query = /*sql*/ `
		INSERT INTO user (name, lastName, email, password, profile_id)
		VALUES (?, ?, ?, ?, ?)
	`
	const [result] = await mysqlPool.query<iUser[]>(query, [
		name,
		lastName,
		email,
		password,
		profile_id,
	])

	return result
}

export async function updateUser({
	id,
	name,
	lastName,
	email,
	password,
	profile_id,
}: User) {
	const query = /*sql*/ `
		UPDATE user
		SET name = ?, lastName = ?, email = ?, password = ?, profile_id = ?
		WHERE id = ?
	`
	const [result] = await mysqlPool.query<iUser[]>(query, [
		name,
		lastName,
		email,
		password,
		profile_id,
		id,
	])

	return result
}

export async function deleteUser({
	id,
	email,
	password
}: iUserIdentifiers) {
	const query = /*sql*/ `
		DELETE FROM user WHERE email = ? AND password = ? AND id = ?
	`
	const [result] = await mysqlPool.query<iUser[]>(query, [email, password, id])

	return result
}