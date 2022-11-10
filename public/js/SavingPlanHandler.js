/* eslint-disable no-undef */

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

	let amount = globalThis.document.getElementById("amount").value
	let time = globalThis.document.getElementById("time").value
	let tiempo = globalThis.document.getElementById("btnTime").textContent
	let inputState = globalThis.document.getElementById("inputState").value
	let gridCheck = globalThis.document.getElementById("gridCheck").value

	if (amount !== "" || time !== "" || tiempo !== "" || inputState !== "" || gridCheck !== "") {

		let tiempo_ahorro = amount/time //1000 * semana = 4000 * mes

		swal({
			title: "¡Tu plan de ahorro!",
			text: "Debes ahorrar " + tiempo_ahorro + " soles en " + time +" "+ tiempo + " para alcanzar tu meta",
			icon: "success",
			timer: 5000,
		})
	} else if(inputState === "low" && tiempo_ahorro > 1300 ) {
		swal({
			title: "¡No puedes ahorrar esta cantidad!",
			text: "Por favor, ingresa una cantidad menor",
			icon: "danger",
			timer: 5000,
		})
	}
	console.log({
		amount: amount,
		time: time,
		tiempo: tiempo,
		inputState: inputState,
		gridCheck: gridCheck,
	})
})
