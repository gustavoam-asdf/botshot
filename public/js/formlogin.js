/*-----Iniciar Session*/
const myform = globalThis.document.getElementById("myform")
myform.addEventListener("submit", (e) => {
	e.preventDefault()

	let nameuser = globalThis.document.getElementById("user").value
	let password = globalThis.document.getElementById("pass").value

	fetch("/", {
		method: "Post",
		headers: {
			"Accept": "application/json",
			"Content-Type": "application/json"
		},
		body: JSON.stringify({
			nameuser: nameuser,
			password: password
		})
	})
		.then(response => response.json())
		.then(data => console.log(data))
}
)

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
			"Accept": "application/json",
			"Content-Type": "application/json"
		},
		body: JSON.stringify({
			dni: dni,
			name: name,
			lastName: lastName,
			email: email,
			nameuser: nameuser,
			password: password
		})
	})
		.then(response => response.json())
		.then(data => console.log(data))
}
)

