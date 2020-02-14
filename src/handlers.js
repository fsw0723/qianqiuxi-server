const uuidv4 = require('uuid/v4');

const Player = require('./models/player');
const constants = require('./constants');

const handleNewPlayer = function(wss, ws) {
	let uuid = uuidv4();
	console.log('Client connected, id:', uuid);
	wss.players.push(new Player(uuid));
	ws.send(JSON.stringify({
		type: constants.events.CREATE_PLAYER_ID,
		id: uuid
	}));
}


module.exports = {
	handleNewPlayer
}