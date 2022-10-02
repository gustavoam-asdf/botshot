import { Request, Response } from "express"

import { iUser } from "../models/user"
import { userService } from "../services"

export async function getOneUser(req: Request, res: Response) {
	const { id } = req.params as iUser
	const { email, password } = req.body as iUser
	const user = await userService.getOneUser({
		id,
		email,
		password
	})
	res.json(user)
}

export async function getAllUsers(req: Request, res: Response) {
	const allUsers = await userService.getAllUsers()
	res.json(allUsers)
}

export async function createUser(req: Request, res: Response) {
	const {
		name,
		lastName,
		email,
		password,
		profile_id,
	} = req.body as iUser
	const user = await userService.createUser({
		name,
		lastName,
		email,
		password,
		profile_id
	})
	res.json(user)
}

export async function updateUser(req: Request, res: Response) {
	const { id } = req.params as iUser
	const {
		name,
		lastName,
		email,
		password,
		profile_id,
	} = req.body as iUser

	const user = await userService.updateUser({
		id,
		name,
		lastName,
		email,
		password,
		profile_id,
	})
	res.json(user)
}

export async function deleteUser(req: Request, res: Response) {
	const { id } = req.params as iUser
	const { email, password } = req.body as iUser
	const user = await userService.deleteUser({
		id,
		email,
		password
	})
	res.json(user)
}
