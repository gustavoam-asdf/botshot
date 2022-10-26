export class Condition {
	constructor({
		name,
		verifier = () => false,
		precondition
	}) {
		this.name = name
		this.verifier = verifier
		/**
		 * @type {Condition}
		 */
		this.precondition = precondition
		this.status = false
	}

	verify(value) {
		try {
			this.status = this.verifier(value)
		} catch (error) {
			console.error(error)
			this.status = false
		}
		return this.status
	}
}