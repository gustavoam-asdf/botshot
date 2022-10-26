import { Condition } from "./Condition.js"
import { Rule } from "./Rule.js"

const condicionIngresosBajos = new Condition({
	name: "Ingresos bajos",
	verifier: (value) => value < 1300
})

/**Regla de ingresos */

const condicionIngresosMedios = new Condition({
	name: "Ingresos medios",
	verifier: (value) => value < 3970
})

const condicionIngresosAltos = new Condition({
	name: "Ingresos altos",
	verifier: (value) => value < 12660
})

const condicionIngresosMuyAltos = new Condition({
	name: "Ingresos muy altos",
	verifier: (value) => value >= 12660
})

const ruleIngresos = new Rule({
	name: "Ingresos",
	description: "Determina si los ingresos mensuales del usuario son bajos, medios o altos",
	question: "¿Cuántos ingresos recibes mensualmente?",
	fallback: "No entendí tu respuesta, por favor ingresa un número",
	conditions: [
		condicionIngresosBajos,
		condicionIngresosMedios,
		condicionIngresosAltos,
		condicionIngresosMuyAltos
	]
})

/**Regla de Gastos */
const condicionesGastosIngresoMinimo = [
	new Condition({
		name: "Gastos mínimos",
		verifier: (value) => value < 390,
		precondition: condicionIngresosBajos
	}),
	new Condition({
		name: "Gastos moderados",
		verifier: (value) => value < 975,
		precondition: condicionIngresosBajos
	}),
	new Condition({
		name: "Gastos altos",
		verifier: (value) => value < 1300,
		precondition: condicionIngresosBajos
	}),
	new Condition({
		name: "Gastos excesivos",
		verifier: (value) => value >= 1300,
		precondition: condicionIngresosBajos
	})
]

const condicionesGastosIngresoMedio = [
	new Condition({
		name: "Gastos mínimos",
		verifier: (value) => value < 1588,
		precondition: condicionIngresosMedios
	}),
	new Condition({
		name: "Gastos moderados",
		verifier: (value) => value < 2977,
		precondition: condicionIngresosMedios
	}),
	new Condition({
		name: "Gastos altos",
		verifier: (value) => value < 3970,
		precondition: condicionIngresosMedios
	}),
	new Condition({
		name: "Gastos excesivos",
		verifier: (value) => value >= 3970,
		precondition: condicionIngresosMedios
	})
]

const condicionesGastosIngresoAlto = [
	new Condition({
		name: "Gastos mínimos",
		verifier: (value) => value < 5064,
		precondition: condicionIngresosAltos
	}),
	new Condition({
		name: "Gastos moderados",
		verifier: (value) => value < 9495,
		precondition: condicionIngresosAltos
	}),
	new Condition({
		name: "Gastos altos",
		verifier: (value) => value < 12660,
		precondition: condicionIngresosAltos
	}),
	new Condition({
		name: "Gastos excesivos",
		verifier: (value) => value >= 12660,
		precondition: condicionIngresosAltos
	})
]

const condicionesGastosIngresoMuyAlto = [
	new Condition({
		name: "Gastos mínimos",
		verifier: (value) => value < 40000,
		precondition: condicionIngresosMuyAltos
	}),
	new Condition({
		name: "Gastos moderados",
		verifier: (value) => value < 75000,
		precondition: condicionIngresosMuyAltos
	}),
	new Condition({
		name: "Gastos altos",
		verifier: (value) => value < 100000,
		precondition: condicionIngresosMuyAltos
	}),
	new Condition({
		name: "Gastos excesivos",
		verifier: (value) => value >= 100000,
		precondition: condicionIngresosMuyAltos
	})
]

const ruleGastos = new Rule({
	name: "Gastos",
	description: "Determina si los gastos mensuales del usuario son bajos, medios o altos de acuerdo a sus ingreso",
	question: "¿Cuántos gastos mensuales tienes?",
	fallback: "No se pudo determinar el nivel de gastos, por favor ingresa un valor numérico",
	conditions: [
		condicionesGastosIngresoMinimo,
		condicionesGastosIngresoMedio,
		condicionesGastosIngresoAlto,
		condicionesGastosIngresoMuyAlto
	]
})

/**Regla de Nivel educativo */

const conditionNivelSecundario = new Condition({
	name: "Secundario",
	verifier: (value) => value.toLowerCase().trim() === "secundario"
})

const conditionNivelSuperior = new Condition({
	name: "Superior",
	verifier: (value) => value.toLowerCase().trim() === "superior"
})

const ruleNivelEducativo = new Rule({
	name: "Nivel educativo",
	description: "Determina el nivel educativo del usuario",
	question: "¿Cuál es tu nivel educativo?",
	fallback: "No se pudo determinar el nivel educativo, por favor ingresa uno de los siguientes: Secundario, Superior",
	conditions: [
		conditionNivelSecundario,
		conditionNivelSuperior
	]
})


export const rules = [
	ruleIngresos,
	ruleGastos,
	ruleNivelEducativo
]