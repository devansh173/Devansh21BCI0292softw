const WebSocket = require('ws');
const { onClientConnect, onClientDisconnect } = require('./wsHandlers');
const { startNewGame } = require('./gameEngine');//game engine is used to make websockets work

const websocketServer = new WebSocket.Server({ port: 8000 });
let activePlayers = [];

websocketServer.on('connection', (clientSocket) => {//player change is after every move
    onClientConnect(clientSocket, activePlayers, websocketServer);
    
    clientSocket.on('close', () => {
        onClientDisconnect(clientSocket, activePlayers);
    });//
});

console.log('WebSocket server is live at ws://localhost:8000');
