export class Rule {
	constructor({
		name,
		description,
		question,
		fallback,
		conditions = [],
	}) {
		this.name = name
		this.description = description
		this.question = question
		this.fallback = fallback
		this.conditions = conditions
	}

}