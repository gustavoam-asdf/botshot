export const MESSAGE_MODE = {
	USER: "operator",
	BOTSHOT: "visitor"
}

export class InteractiveChatbox {

	constructor(button, chatbox, messagesBox, icons) {
		this.args = {
			button,
			chatbox,
			messagesBox
		}
		this.icons = icons
		this.state = false
	}

	writeMessage({ mode, text }) {
		const { messagesBox } = this.args

		const message = globalThis.document.createElement("div")
		message.classList.add("messages__item")
		message.classList.add(`messages__item--${mode}`)
		message.innerHTML = text

		messagesBox.appendChild(message)
	}

	display() {
		const { button, chatbox } = this.args

		button.addEventListener("click", () => this.toggleState(chatbox))
	}

	toggleState(chatbox) {
		this.state = !this.state
		this.showOrHideChatBox(chatbox, this.args.button)
	}

	showOrHideChatBox(chatbox, button) {
		if (this.state) {
			chatbox.classList.add("chatbox--active")
			this.toggleIcon(true, button)
		} else if (!this.state) {
			chatbox.classList.remove("chatbox--active")
			this.toggleIcon(false, button)
		}
	}

	toggleIcon(state, button) {
		const { isClicked, isNotClicked } = this.icons

		if (state) {
			button.children[0].innerHTML = isClicked
		} else if (!state) {
			button.children[0].innerHTML = isNotClicked
		}
	}
}