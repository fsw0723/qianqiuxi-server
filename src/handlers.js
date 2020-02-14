const uuidv4 = require('uuid/v4');

const Player = require('./models/player');
const constants = require('./constants');
const cards = require('./cards');

const handleNewPlayer = function(wss, ws) {
	let uuid = uuidv4();
	console.log('Client connected, id:', uuid);
	wss.players.push(new Player(uuid));
	ws.send(JSON.stringify({
		type: constants.events.CREATE_PLAYER_ID,
		id: uuid
	}));
};

const handleInitCards = function(message, ws) {
	message = JSON.parse(message);
	if(message.type === constants.events.INIT_CARDS) {
		let initialCards = cards.initCards();
		ws.send(JSON.stringify({
			type: constants.events.INIT_CARDS,
			initialCards: initialCards
		}));
	}
}


module.exports = {
	handleNewPlayer,
	handleInitCards
}