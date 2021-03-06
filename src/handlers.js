const uuidv4 = require('uuid/v4');

const Player = require('./models/player');
const Game = require('./models/game');
const constants = require('./constants');

const handleNewPlayer = function(wss, ws) {
	let uuid = uuidv4();
	console.log('Client connected, id:', uuid);
	let player = new Player(uuid);
	ws.player = player;
	ws.send(JSON.stringify({
		type: constants.events.CREATE_PLAYER_ID,
		id: uuid
	}));
};

const handlePairing = function(wss, ws, message) {
	// 1. find player in waiting state
	// 2. create new Game and update both player
	// 3. Send data to both clients
	// if(message.includes('PAIRING')) {
	if(message.type === constants.events.PAIRING) {
		ws.player.setStatus('WAITING');

		wss.clients.forEach(function each(client) {
		  	if (client !== ws && client.readyState === ws.OPEN && client.player.isWaiting()) {
		  		let gameId = uuidv4();
				let game = new Game(gameId, ws.player, client.player);

				ws.game = game;
				client.game = game;

				game.init();

				ws.send(JSON.stringify({
					type: constants.events.START,
					gameId,
					id: ws.player.id,
					opponentId: client.player.id,
					deck: game.deck,
					cards: ws.player.cards,
					turn: ws.player.id
				}));

				client.send(JSON.stringify({
					type: constants.events.START,
					gameId,
					id: client.player.id,
					opponentId: ws.player.id,
					deck: game.deck,
					cards: client.player.cards,
					turn: ws.player.id
				}));

		  	}
		});
	}
};

const handleSelectCard = function(wss, ws, message) {
	// if(message.includes('SELECT_CARD')) {
	if(message.type === constants.events.SELECT_CARD) {

		// let {newPairs, score} = ws.player.handleSelectCards(ws.player.cards[0], ws.game.deck[0]);
		// ws.game.handleSelectCards(ws.game.deck[0]);
		let {newPairs, score} = ws.player.handleSelectCards(message.selectedOwnCard, message.selectedCardFromDeck);
		let newDeckCard = ws.game.handleSelectCards(message.selectedCardFromDeck);
		let isGameOver = ws.game.isGameOver();
		let winner;
		if(isGameOver) {
			winner = ws.game.getWinner();
		}

		wss.clients.forEach(function each(client) {
		  	if (client !== ws && client.readyState === ws.OPEN && client.game && client.game.id === ws.game.id) {
				ws.send(JSON.stringify({
					type: constants.events.CARD_SELECTED,
					gameId: ws.game.id,
					id: ws.player.id,
					score: ws.player.score,
					opponentScore: client.player.score,
					deck: ws.game.deck,
					cards: ws.player.cards,
					newDeckCard,
					newPairs,
					isGameOver,
					turn: client.player.id,
					winner
				}));

				client.send(JSON.stringify({
					type: constants.events.OPPONENT_CARD_SELECTED,
					gameId: ws.game.id,
					id: client.player.id,
					score: client.player.score,
					opponentScore: ws.player.score,
					opponentSelectedOwnCard: message.selectedOwnCard,
					opponentSelectedDeckCard: message.selectedCardFromDeck,
					deck: ws.game.deck,
					cards: client.player.cards,
					newDeckCard,
					newPairs,
					isGameOver,
					turn: client.player.id,
					winner
				}));
	  		}
		});

		
	}
};

const handleDiscardCard = function(wss, ws, message) {
	if(message.type === constants.events.DISCARD_CARD) {
		wss.clients.forEach(function each(client) {
		  	if (client !== ws && client.readyState === ws.OPEN && client.game && client.game.id === ws.game.id) {
		  		let {newCard} = ws.game.handleDiscardCard(message.cardToDiscard, ws.player);

				ws.send(JSON.stringify({
					type: constants.events.CARD_DISCARDED,
					gameId: ws.game.id,
					id: ws.player.id,
					deck: ws.game.deck,
					cards: ws.player.cards,
					newCard
				}));

				client.send(JSON.stringify({
					type: constants.events.OPPONENT_CARD_DISCARDED,
					gameId: client.game.id,
					id: client.player.id,
					deck: ws.game.deck,
					cardDiscarded: message.cardToDiscard
				}));
		  	}
	  	});
		
	}

};

const notifyOpponent = function(wss, ws, eventName) {
	wss.clients.forEach(function each(client) {
	  	if (client !== ws && client.readyState === ws.OPEN && client.game && client.game.id === ws.game.id) {
	  		client.send(JSON.stringify({
	  			type: eventName,
	  			gameId: client.game.id,
	  			id: client.player.id
	  		}));
	  	}
  	});
};

module.exports = {
	handleNewPlayer,
	handlePairing,
	handleSelectCard,
	handleDiscardCard,
	notifyOpponent
}