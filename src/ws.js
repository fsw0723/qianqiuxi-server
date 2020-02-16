const { Server } = require('ws');

const handlers = require('./handlers');

module.exports.createServer = function(server) {
	const wss = new Server({ server });
	wss.games = [];

	wss.on('connection', (ws) => {		
		handlers.handleNewPlayer(wss, ws);
		ws.on('message', function (message) {
			console.log('received: %s', message)

			message = JSON.parse(message);
			handlers.handlePairing(wss, ws, message);
		});

		ws.on('close', () => console.log('Client disconnected'));
	});

}