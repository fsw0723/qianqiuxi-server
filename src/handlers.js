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

module.exports = {
	handleNewPlayer,
	handlePairing
}