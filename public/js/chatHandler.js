import { InteractiveChatbox, MESSAGE_MODE } from "./Chat.js"

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

if(LocaleDni !== undefined && LocaleDni !== null){

	fetch("/findUser/" + LocaleDni, {
		method: "GET",
	})
		.then((response) => response.json())
		.then((data) => {
			chatbox.writeMessage({
				mode: MESSAGE_MODE.BOTSHOT,
				text: "¡Hola, yo soy BotSHOT 🤖!, el asistente que te ayudará a ahorrar"
			})
			
			chatbox.writeMessage({
				mode: MESSAGE_MODE.BOTSHOT,
				text: "¿En que te puedo ayudar, " + data.name + "?"
			})
		})

}else {
	chatbox.writeMessage({
		mode: MESSAGE_MODE.BOTSHOT,
		text: "¡Hola, yo soy BotSHOT 🤖!, el asistente que te ayudará a ahorrar"
	})
	
	chatbox.writeMessage({
		mode: MESSAGE_MODE.BOTSHOT,
		text: "¿Cuál es tu nombre?"
	})
}

const $userMessageForm = globalThis.document.getElementById("userMessageForm")

$userMessageForm.addEventListener("submit", (e) => {
	e.preventDefault()
	const { message } = $userMessageForm
	chatbox.writeMessage({
		mode: MESSAGE_MODE.USER,
		text: message.value
	})
	
	chatbox.writeMessage({
		mode: MESSAGE_MODE.BOTSHOT,
		text: "Bienvenido a BotSHOT, " + message.value
	})

	message.value = ""
})