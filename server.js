'use strict';

const express = require('express');
const cors = require('cors');
const https = require('https');
const fs = require('fs');

const {createServer} = require('./src/ws');

const PORT = process.env.PORT || 3000;
const INDEX = '/index.html';

let app = express();

let options = {
  setHeaders: function (res, path, stat) {
    res.set('Access-Control-Allow-Origin', '*');
    if (path.endsWith('.jpg')) {
      res.set('Cache-Control', 'public, max-age=86400');
    }
  }
}
app.use(express.static('public', options));

app.use(cors({
  methods:['GET'],  //指定接收的请求类型
}));

app.use((req, res) => res.sendFile(INDEX, { root: __dirname }));


const server = https.createServer({
  key: fs.readFileSync('./cert/3551896_fun-world.xyz.key'),//证书文件的存放目录
  cert: fs.readFileSync('./cert/3551896_fun-world.xyz.crt')
},app).listen(PORT, () => console.log(`Listening on ${PORT}`));

createServer(server);