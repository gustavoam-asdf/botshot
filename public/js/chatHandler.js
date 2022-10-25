import { InteractiveChatbox } from "./Chat.js"

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