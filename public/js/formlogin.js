/* eslint-disable no-undef */

/*-----Iniciar Session*/
const myform = globalThis.document.getElementById("myform")
myform.addEventListener("submit", (e) => {
	e.preventDefault()

	let nameuser = globalThis.document.getElementById("user").value
	let password = globalThis.document.getElementById("pass").value

	fetch("/", {
		method: "Post",
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			nameuser: nameuser,
			password: password,
		}),
	})
		.then((response) => response.json())
		.then((data) => {

			if (data.success) {
				// const $alert = globalThis.document.getElementById("alert")
				// const $span = globalThis.document.createElement("span")
				// $span.textContent = data.msg
				// $alert.appendChild($span)

				console.log(data.user[0].dni)
				localStorage.setItem("dni", data.user[0].dni)
				// localStorage.getItem("key")
				// localStorage.removeItem("user")

				swal({
					title: data.msg,
					text: "Bienvenido al asistentente virtual BotShot",
					icon: "success",
					timer: 5000,
				})

				setTimeout(function () {
					location.reload()
				}, 2000)
			} else {
				swal({
					title: data.msg,
					text: "Usuario o contraseña erróneos, porfavor vuelva a ingresarlos",
					icon: "error",
					timer: 5000,
				})
			}
		})
})

/*-----Registrar Usuario*/
const registerform = globalThis.document.getElementById("registerform")
registerform.addEventListener("submit", (e) => {
	e.preventDefault()
	let dni = globalThis.document.getElementById("dni").value
	let name = globalThis.document.getElementById("name").value
	let lastName = globalThis.document.getElementById("lastName").value
	let email = globalThis.document.getElementById("email").value
	let nameuser = globalThis.document.getElementById("nameuser").value
	let password = globalThis.document.getElementById("password").value

	console.table(dni, name, lastName, email, nameuser, password)

	fetch("/register", {
		method: "Post",
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			dni: dni,
			name: name,
			lastName: lastName,
			email: email,
			nameuser: nameuser,
			password: password,
		}),
	})
		.then((response) => response.json())
		.then((data) => {
			if (data.success) {
				swal({
					title: data.msg,
					text: "Ahora podrás disfrutar de todos los beneficios de BotShot",
					icon: "success",
					timer: 5000,
				})

				setTimeout(function () {
					location.reload()
				}, 2000)
			} else {
				swal({
					title: data.msg,
					text: "Vuelva a intentarlo",
					icon: "error",
					timer: 5000,
				})
			}
		})
})
