/* eslint-disable no-undef */
swal({
	title: "asdsadasd",
	text: "Ahora podrás disfrutar de todos los beneficios de BotShot",
	icon: "success",
	timer: 5000,
})

const ulSelect = globalThis.document.getElementById("timeSelect")

const anclas = ulSelect.querySelectorAll("a")

anclas.forEach(a => {
	a.addEventListener("click", e => {
		e.preventDefault()

		const btnTime = globalThis.document.getElementById("btnTime")
		btnTime.textContent = e.target.innerText
		console.log(e.target.innerText)
	})
})

const SavingPlanForm = globalThis.document.getElementById("savingsPlanForm")
SavingPlanForm.addEventListener("submit", (e) => {
	e.preventDefault()

	swal({
		title: "wtf",
		text: "Ahora podrás disfrutar de todos los beneficios de BotShot",
		icon: "danger",
		timer: 5000,
	})
	//Iniciar	tiempo

	let amount = globalThis.document.getElementById("amount").value
	let time = globalThis.document.getElementById("time").value
	let inputState = globalThis.document.getElementById("inputState").value
	let gridCheck = globalThis.document.getElementById("gridCheck").value

	alert("asdasdasd")

	console.log({
		amount: amount,
		time: time,
		inputState: inputState,
		gridCheck: gridCheck,
	})
})
