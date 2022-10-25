/* eslint-disable no-undef */
export class InteractiveChatbox {
	constructor(button, chatbox, icons) {
		this.args = {
			button,
			chatbox
		}
		this.icons = icons
		this.state = false
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
// const d =document,w=window

// function scrollTopButton(btn)
// {
// 	const $scrollbtn=d.querySelector(btn)

// 	w.addEventListener("scroll",(e)=>
// 	{
// 		let scrollTop =w.pageXOffset || d.documentElement.scrollTop

	

// 	})

// }