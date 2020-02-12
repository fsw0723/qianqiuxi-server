'use strict';

const express = require('express');
const { Server } = require('ws');
const cors = require('cors');
const cards = require('./src/cards');

const PORT = process.env.PORT || 3000;
const INDEX = '/index.html';

let app = express();

let options = {
  setHeaders: function (res, path, stat) {
    res.set('Access-Control-Allow-Origin', '*');
  }
}
app.use(express.static('public', options));

app.use(cors({
    methods:['GET'],  //指定接收的请求类型
}))

const server = app
  .use((req, res) => res.sendFile(INDEX, { root: __dirname }))
  .listen(PORT, () => console.log(`Listening on ${PORT}`));

const wss = new Server({ server });

wss.on('connection', (ws) => {
  console.log('Client connected');
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

