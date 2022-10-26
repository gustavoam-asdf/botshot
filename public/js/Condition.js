export class Condition {
	constructor({
		name,
		verifier = () => false,
		precondition
	}) {
		this.name = name
		this.verifier = verifier
		this.precondition = precondition
		this.status = false
	}

	verify(value) {
		this.status = this.verifier(value)
		return this.status
	}
}