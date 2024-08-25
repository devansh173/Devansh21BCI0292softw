const socket = new WebSocket('ws://localhost:8000');
let currentGameState;

socket.onopen = () => {
    console.log('Connected to the game server');
};

socket.onmessage = (event) => {
    const data = JSON.parse(event.data);
    handleServerMessage(data);
};

function handleServerMessage(message) {
    switch (message.type) {//make it like a error msg
        case 'initialize':
            currentGameState = message.state;
            displayBoard(currentGameState);
            break;
        case 'update':
            currentGameState = message.state;
            refreshBoard(currentGameState);
            break;
        case 'gameEnd':
            displayGameOver(message.winner);
            break;
        default:
            console.error('Unknown message type:', message.type);
            break;
    }
}

function displayBoard(state) {
    const boardElement = document.getElementById('board');
    boardElement.innerHTML = '';

    state.grid.forEach((row, i) => {
        row.forEach((cell, j) => {
            const cellElement = document.createElement('div');
            cellElement.className = 'cell';
            const piece = getPieceAtCoordinates(state, [i, j]);
            if (piece) {
                cellElement.textContent = piece.id;
            }
            boardElement.appendChild(cellElement);
        });
    });
}

function refreshBoard(state) {
    displayBoard(state);
}



function getPieceAtCoordinates(state, [x, y]) {

    const allPieces = [...state.units.Player1, ...state.units.Player2];
    //make it 5 v5 in real 
    return allPieces.find(piece => piece.coords[0] === x && piece.coords[1] === y);
}

function submitMove() {
    const moveCommand = document.getElementById('moveInput').value;
    const currentPlayer = currentGameState.activePlayer;
    socket.send(JSON.stringify({ player: currentPlayer, command: moveCommand }));
}
