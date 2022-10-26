import { InteractiveChatbox, MESSAGE_MODE } from "./Chat.js"
import { rules } from "./knowledgeBase.js"
import { Rule } from "./Rule.js"

const knowledgeBase = [
	new Rule({
		name: "Pregunta de nombre",
		question: "¿Cómo te llamas?",
		fallback: "No te entiendo",
	}),
	...rules,
	new Rule({
		name: "Despedida",
		question: "Hasta luego"
	}),
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

// eslint-disable-next-line no-undef
const LocaleDni = localStorage.getItem("dni")

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
}