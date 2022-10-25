import { User, iUser } from "../models/user"

import { mysqlPool } from "../../Shared/db"

type iUserIdentifiers = Pick<iUser, "dni" | "nameuser" | "email" | "password">
type iUserIdentifiersCreate = Pick<iUser, "dni" | "name" | "lastName" | "email" | "nameuser" | "password">
type iUserIdentifiers1 = Pick<iUser, "nameuser" | "password">

export async function getOneUser({
	dni,
	nameuser,
	email,
	password,
}: iUserIdentifiers) {
	const query = /*sql*/ `
		SELECT
			dni,
			name,
			lastName,
			email,
			password,
			profile_id
		FROM user WHERE email = ? AND password = ? AND dni = ?
	`
	const [result] = await mysqlPool.query<iUser[]>(query, [nameuser, email, password, dni])

	return result[0]
}

export async function getAllUsers() {
	const query = /*sql*/ `
		SELECT
			dni,
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
	dni,
	name,
	lastName,
	email,
	nameuser,
	password
}: iUserIdentifiersCreate) {
	const querySelector = /*sql*/`
	SELECT dni FROM user WHERE dni =?
	`
	const [resultSelector] = await mysqlPool.query<iUser[]>(querySelector, [
		dni
	])
	if (resultSelector.length == 0) {
		const query = /*sql*/ `
		INSERT INTO user (dni,name,lastName, email,nameuser,password)
		VALUES (?,?, ?, ?, ?, ?)
	`
		const [result] = await mysqlPool.query<iUser[]>(query, [
			dni,
			name,
			lastName,
			email,
			nameuser,
			password
		])
		return result
	}
	else {

		return resultSelector
	}

}

export async function verifyuser({
	nameuser,
	password
}: iUserIdentifiers1) {
	const query = /*sql*/ 
	`
		SELECT
			nameuser,
			password
		FROM user WHERE nameuser = ? AND password = ?
	`
	const [result] = await mysqlPool.query<iUser[]>(query, [nameuser, password])
	return result
}

export async function updateUser({
	dni,
	name,
	lastName,
	email,
	password,
	profile_id,
}: User) {
	const query = /*sql*/ `
		UPDATE user
		SET name = ?, lastName = ?, email = ?, password = ?, profile_id = ?
		WHERE dni = ?
	`
	const [result] = await mysqlPool.query<iUser[]>(query, [
		name,
		lastName,
		email,
		password,
		profile_id,
		dni,
	])

	return result
}

export async function deleteUser({
	dni,
	email,
	password
}: iUserIdentifiers) {
	const query = /*sql*/ `
		DELETE FROM user WHERE email = ? AND password = ? AND dni = ?
	`
	const [result] = await mysqlPool.query<iUser[]>(query, [email, password, dni])

	return result
}

