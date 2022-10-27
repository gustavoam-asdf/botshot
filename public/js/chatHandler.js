import { InteractiveChatbox, MESSAGE_MODE } from "./Chat.js"
import { rules } from "./knowledgeBase.js"
import { Rule } from "./Rule.js"

const knowledgeBase = [
	new Rule({
		name: "Pregunta de nombre",
		question: "¿Cómo te llamas?",
		fallback: "No te entiendo",
	}),
	...rules
]

const chatButton = globalThis.document.querySelector(".chatbox__button")
const chatContent = globalThis.document.querySelector(".chatbox__support")
const messagesBox = globalThis.document.querySelector(".chatbox__messages div")
const icons = {
	isClicked: "<img src='./img/chat/icons/chatbox-icon.svg' />",
	isNotClicked: "<img src='./img/chat/icons/chatbox-icon.svg' />"
}
const chatbox = new InteractiveChatbox(chatButton, chatContent, messagesBox, icons) 
chatbox.display()
chatbox.toggleIcon(false, chatButton)

chatbox.writeMessage({
	mode: MESSAGE_MODE.BOTSHOT,
	text: "¡Hola, yo soy BotSHOT 🤖!, el asistente que te ayudará a ahorrar"
})

chatbox.writeMessage({
	mode: MESSAGE_MODE.BOTSHOT,
	text: knowledgeBase[0].question
})

const $userMessageForm = globalThis.document.getElementById("userMessageForm")

$userMessageForm.addEventListener("submit", (e) => {
	e.preventDefault()
	const { message } = $userMessageForm
	chatbox.writeMessage({
		mode: MESSAGE_MODE.USER,
		text: message.value
	})
	botSHOTResponsesHandler(message.value)
	const rule = knowledgeBase[0]
	if (rule) {
		chatbox.writeMessage({
			mode: MESSAGE_MODE.BOTSHOT,
			text: rule.question
		})
	}
	message.value = ""
})

function botSHOTResponsesHandler(userResponse) {
	const rule = knowledgeBase[0]
	if (!rule) return

	console.log({ rule, userResponse })
	if (rule.conditions.length === 0) {
		knowledgeBase.shift()
		return
	}

	const someConditionIsTrue = rule.conditions.some(condition => {
		if (condition.precondition) {
			return condition.precondition.status && condition.verify(userResponse)
		}
		return condition.verify(userResponse)
	})

	if (!someConditionIsTrue) {
		chatbox.writeMessage({
			mode: MESSAGE_MODE.BOTSHOT,
			text: rule.fallback
		})
		return
	}
	knowledgeBase.shift()

	if (knowledgeBase.length === 0) {
		const results = calculateResults()
		results.forEach(result => {
			chatbox.writeMessage({
				mode: MESSAGE_MODE.BOTSHOT,
				text: result
			})
		})
		chatbox.writeMessage({
			mode: MESSAGE_MODE.BOTSHOT,
			text: "Espero que estos consejos te sirvan de algo, ¡Hasta luego!"
		})
	}
}

function calculateResults() {
	let results = ["Estamos analizando tus resultados..."]
	const [ruleIngresos, ruleGastos, ruleNivelEducativo] = rules
	const ingresosCategory = ruleIngresos.conditions.findIndex(condition => condition.status)
	const gastosCategory = ruleGastos.conditions.findIndex(condition => condition.status)
	const nivelEducativoCategory = ruleNivelEducativo.conditions.findIndex(condition => condition.status)

	if (ingresosCategory === 0 && gastosCategory === 0 && nivelEducativoCategory === 0) {
		results.push("Nivel de riesgo: Medio")
		results.push("Debe a recurrir ahorrar un 25% de su sueldo y invertirlo asi generando pasivos para poder terminar su educacion")
	}
	if (ingresosCategory === 0 && gastosCategory === 0 && nivelEducativoCategory === 1) {
		results.push("Nivel de riesgo: Medio Bajo")
		results.push("Debe a recurrir ahorrar un 25% de su sueldo y invertirlo asi generando pasivos y con eso buscar mejores oportunidades sin tener el problema economico")
	}
	if (ingresosCategory === 0 && gastosCategory === 1 && nivelEducativoCategory === 0) {
		results.push("Nivel de riesgo: Medio Alto")
		results.push("Debe a recurrir ahorrar un 12% de su sueldo y invertirlo asi generando pasivos y con eso poder terminar su eduacion,pero ten cuidado estas a punto de gastar todo tu sueldo")
	}
	if (ingresosCategory === 0 && gastosCategory === 1 && nivelEducativoCategory === 1) {
		results.push("Nivel de riesgo: Medio")
		results.push("Debe a recurrir ahorrar un 12% de su sueldo y invertirlo asi generando pasivos y con eso buscar mejores oportunidades sin temer el problema economico pero ten cuidado estas a punto de gastar todo tu sueldo")
	}
	if (ingresosCategory === 0 && gastosCategory === 2 && nivelEducativoCategory === 0) {
		results.push("Nivel de riesgo: Alto")
		results.push("Plantéate a eliminar ciertos gastos innecesarios y busca crear un fondo de emergencias para prever riesgos ya que al no tener una educacion superior se te dificulta al buscar oportunidades")
	}
	if (ingresosCategory === 0 && gastosCategory === 2 && nivelEducativoCategory === 1) {
		results.push("Nivel de riesgo: Medio Alto")
		results.push("Plantéate eliminar la mayor cantidad de gastos innecesarios que puedas y la mejor manera de hacerlo es ponerte a pensar todo los gastos que hiciste diariamiente y veras que tendras ingresos")
		results.push("No te endeudes para cubrir otras deudas")
	}
	if (ingresosCategory === 1 && gastosCategory === 4 && nivelEducativoCategory === 0) {
		results.push("Nivel de riesgo: Medio")
		results.push("Debe a recurrir ahorrar un 25% de su sueldo y invertirlo asi generando pasivos para poder terminar su educacion")
	}
	if (ingresosCategory === 1 && gastosCategory === 4 && nivelEducativoCategory === 1) {
		results.push("Nivel de riesgo: Medio Bajo")
		results.push("Debe a recurrir ahorrar un 25% de su sueldo y invertirlo asi generando pasivos y con eso buscar oportunidades sin temer el problema economico")
	}
	if (ingresosCategory === 1 && gastosCategory === 5 && nivelEducativoCategory === 0) {
		results.push("Nivel de riesgo: Medio Alto")
		results.push("Debe a recurrir ahorrar un 12% de su sueldo y invertirlo asi generando pasivos y con eso poder terminar su educación,pero ten cuidado estas a punto de gastar todo tu sueldo")
	}
	if (ingresosCategory === 1 && gastosCategory === 5 && nivelEducativoCategory === 1) {
		results.push("Nivel de riesgo: Medio")
		results.push("Debe a recurrir ahorrar un 12% de su sueldo y invertirlo asi generando pasivos y con eso buscar mejores oportunidades sin temer el problema economico pero ten cuidado estas a punto de gastar todo tu sueldo")
	}
	if (ingresosCategory === 1 && gastosCategory === 6 && nivelEducativoCategory === 0) {
		results.push("Nivel de riesgo: Alto")
		results.push("Planteate a eliminar ciertos gastos innecesarios  y busca crear un fondo de emergencias para prever riesgos ya que al no tener una educación superior se te dificulta al buscar oportunidades")
	}
	if (ingresosCategory === 1 && gastosCategory === 6 && nivelEducativoCategory === 1) {
		results.push("Nivel de riesgo: Medio Alto")
		results.push("Plantéate eliminar la mayor cantidad de gastos innecesarios que puedas y la mejor manera de hacerlo es ponerte a pensar todo los gastos que hiciste diariamiente y veras que tendras ingresos")
		results.push("No te endeudes para cubrir otras deudas")
	}



	if (ingresosCategory === 2 && gastosCategory === 8 && nivelEducativoCategory === 0) {
		results.push("Nivel de riesgo: Medio")
		results.push("Debe a recurrir ahorrar un 25% de su sueldo y invertirlo asi generando pasivos y con eso buscar oportunidades sin temer el problema economico")
	}
	if (ingresosCategory === 2 && gastosCategory === 8 && nivelEducativoCategory === 1) {
		results.push("Nivel de riesgo: Medio Bajo")
		results.push("Debe a recurrir ahorrar un 12% de su sueldo y invertirlo asi generando pasivos y con eso poder terminar su eduacion,pero ten cuidado estas a punto de gastar todo tu sueldo")
	}
	if (ingresosCategory === 2 && gastosCategory === 9 && nivelEducativoCategory === 0) {
		results.push("Nivel de riesgo: Medio Alto")
		results.push("Debe a recurrir ahorrar un 12% de su sueldo y invertirlo asi generando pasivos y con eso poder terminar su eduacion,pero ten cuidado estas a punto de gastar todo tu sueldo ")
	}
	if (ingresosCategory === 2 && gastosCategory === 9 && nivelEducativoCategory === 1) {
		results.push("Nivel de riesgo: Medio")
		results.push("Debe a recurrir ahorrar un 12% de su sueldo y invertirlo asi generando pasivos y con eso buscar mejores oportunidades sin temer el problema economico pero ten cuidado estas a punto de gastar todo tu sueldo")
	}
	if (ingresosCategory === 2 && gastosCategory === 10 && nivelEducativoCategory === 0) {
		results.push("Nivel de riesgo: Alto")
		results.push("Planteate a eliminar ciertos gastos innecesarios  y busca crear un fondo de emergencias para prever riesgos ya que al no tener una educacion superior se te dificulta al buscar oportunidades")
	}
	if (ingresosCategory === 2 && gastosCategory === 10 && nivelEducativoCategory === 1) {
		results.push("Nivel de riesgo: Medio Alto")
		results.push("Plantéate eliminar la mayor cantidad de gastos innecesarios que puedas y la mejor manera de hacerlo es ponerte a pensar todo los gastos que hiciste diariamiente y veras que tendras ingresos")
		results.push("No te endeudes para cubrir otras deudas")
	}



	if (ingresosCategory === 3 && gastosCategory === 12 && nivelEducativoCategory === 0) {
		results.push("Nivel de riesgo: Medio")
		results.push("Debe a recurrir ahorrar un 25% de su sueldo y invertirlo asi generando pasivos para poder terminar su educacion")
	}
	if (ingresosCategory === 3 && gastosCategory === 12 && nivelEducativoCategory === 1) {
		results.push("Nivel de riesgo: Medio Bajo")
		results.push("Debe a recurrir ahorrar un 25% de su sueldo y invertirlo asi generando pasivos y con eso buscar oportunidades sin temer el problema economico")
	}
	if (ingresosCategory === 3 && gastosCategory === 13 && nivelEducativoCategory === 0) {
		results.push("Nivel de riesgo: Medio Alto")
		results.push("Debe a recurrir ahorrar un 12% de su sueldo y invertirlo asi generando pasivos y con eso poder terminar su eduacion,pero ten cuidado estas a punto de gastar todo tu sueldo")
	}
	if (ingresosCategory === 3 && gastosCategory === 13 && nivelEducativoCategory === 1) {
		results.push("Nivel de riesgo: Medio")
		results.push("Debe a recurrir ahorrar un 12% de su sueldo y invertirlo asi generando pasivos y con eso buscar mejores oportunidades sin temer el problema economico pero ten cuidado estas a punto de gastar todo tu sueldo")
	}
	if (ingresosCategory === 3 && gastosCategory === 14 && nivelEducativoCategory === 0) {
		results.push("Nivel de riesgo: Alto")
		results.push("Planteate a eliminar ciertos gastos innecesarios  y busca crear un fondo de emergencias para prever riesgos ya que al no tener una educacion superior se te dificulta al buscar oportunidades")
	}
	if (ingresosCategory === 3 && gastosCategory === 14 && nivelEducativoCategory === 1) {
		results.push("Nivel de riesgo: Medio Alto")
		results.push("Plantéate eliminar la mayor cantidad de gastos innecesarios que puedas y la mejor manera de hacerlo es ponerte a pensar todo los gastos que hiciste diariamiente y veras que tendras ingresos")
		results.push("No te endeudes para cubrir otras deudas")
	}

	return results


}