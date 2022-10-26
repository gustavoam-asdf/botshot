import { Request, Response } from "express"
import { iUser } from "../models/user"
import { userService } from "../services"

export async function getOneUser(req: Request, res: Response) {
	const { dni } = req.params as iUser
	// const { email, nameuser, password } = req.body as iUser
	// const { dni } = req.body as iUser|
	const user = await userService.getOneUser({
		dni,
	})
	return res.json(user)
}

export async function getAllUsers(req: Request, res: Response) {
	const allUsers = await userService.getAllUsers()
	res.json(allUsers)
}

export async function createUser(req: Request, res: Response) {
	const {
		dni,
		name,
		lastName,
		email,
		nameuser,
		password
	} = req.body as iUser
	const user = await userService.createUser({
		dni,
		name,
		lastName,
		email,
		nameuser,
		password
	})

	if (user.length === 1) {
		return res.json({
			success: false,
			msg: "Ocurrió un error al registrar el usuario",
			user: user,
		})
	} else {
		return res.json({
			success: true,
			msg: "Usuario fue registrado con éxito",
			user: user,
		})
	}
}

export async function updateUser(req: Request, res: Response) {
	const { dni } = req.params as iUser
	const {
		name,
		lastName,
		email,
		nameuser,
		password,
		profile_id,
	} = req.body as iUser

	const user = await userService.updateUser({
		dni,
		name,
		lastName,
		email,
		nameuser,
		password,
		profile_id,
	})
	res.json(user)
}

export async function deleteUser(req: Request, res: Response) {
	const { dni } = req.params as iUser
	const { nameuser, email, password } = req.body as iUser
	const user = await userService.deleteUser({
		dni,
		email,
		nameuser,
		password
	})

	return res.json({
		success: false,
		msg: "Usuario eliminado",
		user: user,
	})
}

export async function verifyUser(request: Request, res: Response) {

	const { nameuser, password } = request.body as iUser
	const user = await userService.verifyuser({
		nameuser,
		password
	})

	if (user.length === 0) {

		return res.json({
			success: false,
			msg: "Usuario no encontrado",
			user: user,
		})

	} else {

		return res.json({
			success: true,
			msg: "Sesión iniciada",
			user: user,
		})
	}
}