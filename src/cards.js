const cardNames = require('./constants').cardNames;

module.exports = {
	initCards: function() {
    	function getRandom(min, max) {
	  		return Math.random() * (max - min) + min;
		}
		let cards = [];
		for(let i = 0; i < 8; i++) {
			let random = Math.round(getRandom(1, cardNames.length));
			cards.push(cardNames[random-1]);
		}
		console.log('cards', cards);
		return cards;	
	}
}