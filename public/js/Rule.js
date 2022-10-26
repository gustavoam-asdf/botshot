export class Rule {
	constructor({
		name,
		description,
		question,
		conditions = [],
	}) {
		this.name = name
		this.description = description
		this.question = question
		this.conditions = conditions
	}

}