const cardNames = require('../constants').cardNames;

function getRandom(min, max) {
	return Math.random() * (max - min) + min;
}

module.exports = class Game {
	constructor(id, playerA, playerB) {
		this.id = id;
		this.playerA = playerA;
		this.playerB = playerB;
		this.cardsLeft = [...cardNames];
	};

	init() {
		this.playerA.setStatus('START');
		this.playerB.setStatus('START');

		this.initDeck();
		this.initPlayerCards(this.playerA);
		this.initPlayerCards(this.playerB);
	}

	initDeck() {
		let cards = [];
		for(let i = 0; i < 10; i++) {
			let random = Math.round(getRandom(1, this.cardsLeft.length));
			cards.push(this.cardsLeft[random-1]);
			this.cardsLeft.splice(random-1, 1);
		}
		this.deck = cards;
	}

	initPlayerCards(player) {
		let cards = [];
		for(let i = 0; i < 8; i++) {
			let random = Math.round(getRandom(1, this.cardsLeft.length));
			cards.push(this.cardsLeft[random-1]);
			this.cardsLeft.splice(random-1, 1);
		}
		player.cards = cards;
	}

	handleSelectCards(cardFromDeck) {
		this.deck.splice(this.deck.indexOf(cardFromDeck), 1);
		// Take a new card to deck
		let random = Math.round(getRandom(1, this.cardsLeft.length));
		this.deck.push(this.cardsLeft[random-1]);
		this.cardsLeft.splice(random-1, 1);
	}
}