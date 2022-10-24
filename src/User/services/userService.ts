import { User, iUser } from "../models/user"

import { mysqlPool } from "../../Shared/db"

type iUserIdentifiers = Pick<iUser,"id" | "nameuser" | "email" | "password">
type iUserIdentifiersCreate = Pick<iUser,"id" |"name"|"lastName"| "email"  | "nameuser"  | "password">
type iUserIdentifiers1 = Pick<iUser, "nameuser" | "password">

export async function getOneUser({
	id,
	nameuser,
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
	const [result] = await mysqlPool.query<iUser[]>(query, [nameuser,email, password, id])

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
	id,
	name,
	lastName,
	email,
	nameuser,
	password
}:iUserIdentifiersCreate) {
	const querySelector = /*sql*/`
	SELECT id FROM user WHERE id =?
	`
	const [resultSelector] = await mysqlPool.query<iUser[]>(querySelector, [
		id
	])
	if(resultSelector.length==0)
	{
		const query = /*sql*/ `
		INSERT INTO user (id,name,lastName, email,nameuser,password)
		VALUES (?,?, ?, ?, ?, ?)
	`
		const [result] = await mysqlPool.query<iUser[]>(query, [
			id,
			name,
			lastName,
			email,
			nameuser,
			password
		])
		return result
	}
	else{

		return resultSelector
	}
	
}

export async function verifyuser({
	nameuser,
	password
}: iUserIdentifiers1) {
	const query = /*sql*/ `
	SELECT
			nameuser,
			password
		 FROM user WHERE nameuser = ? AND password = ?
	`
	const [result] = await mysqlPool.query<iUser[]>(query, [nameuser, password])
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

