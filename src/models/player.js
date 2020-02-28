const pairs = require('../constants').pairs;

const includePair = function(pairCards, existingCards) {
	// pairCards = ['a', 'b', 'c']
	// existingCards = ['a', 'd', 'c', 'b']
	for(let i = 0; i < pairCards.length; i++) {
		if(!existingCards.includes(pairCards[i])) {
			return false;
		}
	}
	return true;
};

module.exports = class Player {
	constructor(id) {
		this.id = id;
		this.score = 0;
		this.selectedCards = [];
		this.pairs = [];
		this.cards = [];
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

	addScore(score) {
		this.score += score;
	}

	handleSelectCards(ownCard, cardFromDeck) {
		//remove selected cards  from own cards and add to selectedCards;
		this.selectedCards = [...this.selectedCards, ...[ownCard, cardFromDeck]];
		this.cards.splice(this.cards.indexOf(ownCard), 1);

		let score = 0;
		let newPairs = [];
		this.score += 4;
		pairs.forEach((pair) => {
			if(!this.pairs.includes(pair) && includePair(pair.cards, this.selectedCards)) {
				this.pairs.push(pair);
				newPairs.push(pair);
				score += pair.points;
				this.score += pair.points;
			}
		});
		return {
			newPairs,
			score
		}
	}
}