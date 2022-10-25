import { InteractiveChatbox } from "./Chat.js"

const chatButton = globalThis.document.querySelector(".chatbox__button")
const chatContent = globalThis.document.querySelector(".chatbox__support")
const icons = {
	isClicked: "<img src='./img/chat/icons/chatbox-icon.svg' />",
	isNotClicked: "<img src='./img/chat/icons/chatbox-icon.svg' />"
}
const chatbox = new InteractiveChatbox(chatButton, chatContent, icons)
chatbox.display()
chatbox.toggleIcon(false, chatButton)