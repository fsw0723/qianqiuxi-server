module.exports = class Player {
	constructor(id) {
		this.id = id;
	}

	setStatus(status) {
		this.status = status;
	}

	isWaiting() {
		return this.status === 'WAITING';
	}

	setCards() {
		this.cards = cards;
	}
}