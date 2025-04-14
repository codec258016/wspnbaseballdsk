const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const path = require('path');
const open = (...args) => import('open').then(mod => mod.default(...args)); // 브라우저 열기용

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

app.use(express.static(path.join(__dirname, 'public')));

wss.on('connection', (ws) => {
  console.log('WebSocket 연결됨');
  ws.on('message', (message) => {
    const text = message.toString();
    console.log('수신 메시지:', text);

    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(text);
        client.send(JSON.stringify({
          type: 'log',
          payload: text
        }));
      }
    });
  });
});

server.listen(5000, async () => {
  const url = 'http://localhost:5000/wspndskcontrol.html';
  console.log(`🌐 서버 실행 중: ${url}`);
  await open(url);
});