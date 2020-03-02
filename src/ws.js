const { Server } = require('ws');

const handlers = require('./handlers');

function noop() {}
 
function heartbeat() {
  this.isAlive = true;
}

module.exports.createServer = function(server) {
	const wss = new Server({ server });

	wss.on('connection', (ws) => {		
		ws.isAlive = true;
  		ws.on('pong', heartbeat);

		handlers.handleNewPlayer(wss, ws);
		ws.on('message', function (message) {
			console.log(`[${new Date()}]received: %s`, message)

			try {
				message = JSON.parse(message);

				handlers.handlePairing(wss, ws, message);
				handlers.handleSelectCard(wss, ws, message);
				handlers.handleDiscardCard(wss, ws, message);
			} catch(error) {
				console.error(error);
			}
		
		});

		ws.on('close', () => console.log('Client disconnected', new Date()));
	});

	const interval = setInterval(function ping() {
	  	wss.clients.forEach(function each(ws) {
		    if (ws.isAlive === false) return ws.terminate();

		    ws.isAlive = false;
		    ws.ping(noop);
	  	});
	}, 30000);

	wss.on('close', function close() {
	  clearInterval(interval);
	});

}