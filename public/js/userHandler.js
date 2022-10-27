

export const verifyLogin = (chatbox, MESSAGE_MODE) => {
	const dni = globalThis.Storage.getItem("dni")
	if(dni){


		chatbox.writeMessage({
			mode: MESSAGE_MODE.BOTSHOT,
			text: "¿En que te puedo ayudar?",
		})
		return true
	}else {
		return false
	}
} 