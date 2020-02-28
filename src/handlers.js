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
					opponent: client.player.id,
					deck: game.deck,
					cards: ws.player.cards
				}));

				client.send(JSON.stringify({
					type: 'START',
					gameId,
					opponent: ws.player.id,
					deck: game.deck,
					cards: client.player.cards
				}));

				console.log('----GAME----', game)
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


		wss.clients.forEach(function each(client) {
		  	if (client !== ws && client.readyState === ws.OPEN && client.game && client.game.id === ws.game.id) {
				ws.send(JSON.stringify({
					type: 'CARD_SELECTED',
					gameId: ws.game.id,
					score: ws.player.score,
					opponentScore: client.player.score,
					deck: ws.game.deck,
					cards: ws.player.cards,
					newDeckCard,
					newPairs
				}));

				client.send(JSON.stringify({
					type: 'OPPONENT_CARD_SELECTED',
					gameId: ws.game.id,
					score: client.player.score,
					opponentScore: ws.player.score,
					opponentSelectedOwnCard: message.selectedOwnCard,
					opponentSelectedDeckCard: message.selectedCardFromDeck,
					deck: ws.game.deck,
					cards: client.player.cards,
					newDeckCard,
					newPairs
				}));
	  		}
		});

		
	}
};

module.exports = {
	handleNewPlayer,
	handlePairing,
	handleSelectCard
}