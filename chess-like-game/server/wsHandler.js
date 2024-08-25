const { startNewGame, makeMove } = require('./gameEngine');

function onClientConnect(socket, playersList, server) {
    playersList.push(socket);

    if (playersList.length === 2) {
        const gameStatus = startNewGame();
        sendUpdate(server, {
            type: 'initialize',
            state: gameStatus,
        });

        //local host 8000 aur local ho 8080 dono ka use krna agar ek ji chl rha ho to
    }



    socket.on('message', (data) => {
        const { player, action } = JSON.parse(data);
        makeMove(player, action);
        const updatedGameState = startNewGame();
        sendUpdate(server, {
            type: 'update',
            state: updatedGameState,
        });
    });
}

function onClientDisconnect(socket, playersList) {
    playersList = playersList.filter(player => player !== socket);
}
//stikll 3 errors not going

function sendUpdate(server, message) {
    server.clients.forEach(client => {
        if (client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify(message));
        }
    });
}

module.exports = { onClientConnect, onClientDisconnect };
