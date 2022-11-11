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

	if (amount !== "" || time !== "") {

		let tiempo_ahorro = 0

		tiempo_ahorro = chooseTime(time, amount, tiempo, tiempo_ahorro)


		if(inputState === "low" && tiempo_ahorro >= 1300 ) {
			showResult(amount, time, tiempo, 1300, "El monto ingresado es muy alto para tu ingreso")
		}else if(inputState === "middle" && tiempo_ahorro >= 3970 ) {
			showResult(amount, time, tiempo, 3970, "El monto ingresado excede tu ingreso de clase media")
		}else if(inputState === "high" && tiempo_ahorro >= 12660 ) {
			showResult(amount, time, tiempo, 12660, "El monto ingresado excede tus privilegios de clase alta")
		} else {
			swal({
				title: "¡Tu plan de ahorro!",
				text: "Debes ahorrar " + tiempo_ahorro + " soles en " + time +" "+ tiempo + " para alcanzar tu meta",
				icon: "success",
				timer: 5000,
			})
		}
	}else {
		swal({
			title: "¡Error!",
			text: "Por favor, completa todos los campos",
			icon: "error",
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

const chooseTime = (time, amount, tiempo, tiempo_ahorro) => {

	if (tiempo === "Semanas") {

		tiempo_ahorro = (amount / time) * 4

	} else if (tiempo === "Meses") {

		tiempo_ahorro = amount / time

	} else if (tiempo === "Años") {

		tiempo_ahorro = (amount / time) / 12

	}
	console.log(tiempo_ahorro)
	return tiempo_ahorro

}

const showResult = (amount, time, tiempo, maxSueldo, msg) => {
	let tiempo_minimo = Math.ceil(amount/maxSueldo)

	let tiempo_ahorro = chooseTime(tiempo_minimo, amount, "Meses", 0)
	tiempo_ahorro = Math.ceil(tiempo_ahorro)

	swal({
		title: msg,
		text: `Por ahora no puedes ahorrar ${amount} en ${time} ${tiempo}, pero si puedes llegar a tu meta ahorrando ${tiempo_ahorro} por ${tiempo_minimo} meses`,
		icon: "warning",
		timer: 9000,
	})
}