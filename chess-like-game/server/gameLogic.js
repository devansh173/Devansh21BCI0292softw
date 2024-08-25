const gameState = {
    grid: Array.from({ length: 5 }, () => Array(5).fill(null)), // 5x5 grid
    activePlayer: 'Player1',
    units: {
        Player1: [
            { id: 'P1', role: 'Pawn', coords: [0, 0] },
            { id: 'H1', role: 'Hero1', coords: [0, 1] },
            { id: 'H2', role: 'Hero2', coords: [0, 2] },
        ],
        Player2: [
            { id: 'P1', role: 'Pawn', coords: [4, 0] },
            { id: 'H1', role: 'Hero1', coords: [4, 1] },
            { id: 'H2', role: 'Hero2', coords: [4, 2] },
        ],
    }
};

function startGame() {
    return gameState;
}

function makeMove(player, instruction) {
    const [unitId, direction] = instruction.split(':');
    const unit = gameState.units[player].find(u => u.id === unitId);
    if (!unit) return;

    const newCoords = getNewCoordinates(unit, direction);
    if (isMoveAllowed(newCoords)) {
        unit.coords = newCoords;
        gameState.activePlayer = gameState.activePlayer === 'Player1' ? 'Player2' : 'Player1';
        evaluateGameState();
    }
}

function getNewCoordinates(unit, direction) {
    const [x, y] = unit.coords;
    const movements = {
        'L': [x, y - 1],
        'R': [x, y + 1],
        'F': [x - 1, y],
        'B': [x + 1, y],
        'FL': [x - 1, y - 1],
        'FR': [x - 1, y + 1],
        'BL': [x + 1, y - 1],
        'BR': [x + 1, y + 1],
    };
    return movements[direction] || unit.coords;
}

function isMoveAllowed([x, y]) {
    return x >= 0 && x < 5 && y >= 0 && y < 5;
}

function evaluateGameState() {
    // Add logic to check for win conditions
}

module.exports = { startGame, makeMove };
