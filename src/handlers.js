const uuidv4 = require('uuid/v4');

const Player = require('./models/player');
const Game = require('./models/game');
const constants = require('./constants');
const cards = require('./cards');

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
				client.player.setStatus('START');
				ws.player.setStatus('START');
				ws.game = game;
				client.game = game;

				let initialDeck = cards.initCards();

				ws.send(JSON.stringify({
					type: 'START',
					gameId,
					opponent: client.player.id,
					deck: initialDeck
				}));

				client.send(JSON.stringify({
					type: 'START',
					gameId,
					opponent: ws.player.id,
					deck: initialDeck
				}));
		  	}
		});
		// let i = 0;
		// wss.clients.forEach(function each(client) {
		  	
		//   	console.log('----CLIENT----', i);
		//   	console.log(client.player);
		//   	console.log(client.game);
		//   	i++;
		// });
	}
}


module.exports = {
	handleNewPlayer,
	handlePairing
}