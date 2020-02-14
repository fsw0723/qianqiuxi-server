const { Server } = require('ws');

const cards = require('./cards');
const handlers = require('./handlers');

module.exports.createServer = function(server) {
	const wss = new Server({ server });
	wss.players = [];

	wss.on('connection', (ws) => {		
		handlers.handleNewPlayer(wss, ws);

		ws.on('message', function (message) {
			console.log('received: %s', message)

			if(message === 'InitCards') {
				console.log('come to init cards')
				let initialCards = cards.initCards();
				ws.send(`InitCards: ${initialCards.toString()}`);
			}
		});

		ws.on('close', () => console.log('Client disconnected'));
	});

}