let currentPlayer = 'X';
let game = []
let lines = [
    [{x: 0, y: 0}, {x: 1, y: 0}, {x: 2, y: 0}],
    [{x: 0, y: 1}, {x: 1, y: 1}, {x: 2, y: 1}],
    [{x: 0, y: 2}, {x: 1, y: 2}, {x: 2, y: 2}],
    [{x: 0, y: 0}, {x: 0, y: 1}, {x: 0, y: 2}],
    [{x: 1, y: 0}, {x: 1, y: 1}, {x: 1, y: 2}],
    [{x: 2, y: 0}, {x: 2, y: 1}, {x: 2, y: 2}],
    [{x: 0, y: 0}, {x: 1, y: 1}, {x: 2, y: 2}],
    [{x: 2, y: 0}, {x: 1, y: 1}, {x: 0, y: 2}]
];

function buildField(){
    let field = document.getElementById('tictactoe');
    field.innerHTML = '';
    game = [];
    for (let i = 0; i < 9; i++){
        let cell = document.createElement('div');
        cell.classList.add('cell');
        cell.setAttribute('data-x', i % 3);
        cell.setAttribute('data-y', Math.floor(i / 3));
        field.appendChild(cell);

        field.addEventListener('click', function(event){
            if (event.target.classList.contains('cell')){
                let x = event.target.getAttribute('data-x');
                let y = event.target.getAttribute('data-y');
                if (game.find(cell => cell.x == x && cell.y == y)){
                    return;
                }
                placeCell(x, y, currentPlayer);
            }
        });
    }
}

function placeCell(x, y, value){
    let cell = document.querySelector(`.cell[data-x="${x}"][data-y="${y}"]`);
    cell.innerText = value;
    game.push({
        value: value,
        x: x,
        y: y
    });
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    if (game.length > 6){
        removeOldestInGame();
        highlightNextRemovingOldest();
    }
    let winner = checkWinner();
    if (winner){
        highlightWinner();
        setTimeout(() => {
            alert(`Player ${winner} wins!`);
            buildField();
        }, 100);
    }else
    if (currentPlayer === 'O'){
        botMove();
    }
}

function highlightWinner(){
    lines.forEach(line => {
        let values = line.map(cell => {
            let gameCell = game.find(c => c.x == cell.x && c.y == cell.y);
            return gameCell ? gameCell.value : null;
        });

        if (values.every(value => value === 'X') || values.every(value => value === 'O')){
            line.forEach(cell => {
                let gameCell = game.find(c => c.x == cell.x && c.y == cell.y);
                let cells = document.querySelectorAll('.cell');
                cells.forEach(cell => {
                    if (cell.getAttribute('data-x') == gameCell.x && cell.getAttribute('data-y') == gameCell.y){
                        cell.classList.add('winner');
                    }
                });
            });
        }
    });
}

function highlightNextRemovingOldest(){
    let oldest = game[0];
    let cells = document.querySelectorAll('.cell');
    cells.forEach(cell => {
        if (cell.getAttribute('data-x') == oldest.x && cell.getAttribute('data-y') == oldest.y){
            cell.classList.add('highlight');
        }else{
            cell.classList.remove('highlight');
        }
    });
}

function removeOldestInGame(){
    let oldest = game.shift();
    let cells = document.querySelectorAll('.cell');
    cells.forEach(cell => {
        if (cell.getAttribute('data-x') == oldest.x && cell.getAttribute('data-y') == oldest.y){
            cell.innerText = '';
        }
    });
}

function checkWinner(){
    let winner = null;

    lines.forEach(line => {
        let values = line.map(cell => {
            let gameCell = game.find(c => c.x == cell.x && c.y == cell.y);
            return gameCell ? gameCell.value : null;
        });

        if (values.every(value => value === 'X')){
            winner = 'X';
        } else if (values.every(value => value === 'O')){
            winner = 'O';
        }
    });

    return winner;
}

function getAvailableMoves() {
    let availableMoves = [];
    for (let i = 0; i < 9; i++){
        let x = i % 3;
        let y = Math.floor(i / 3);
        if (!game.find(cell => cell.x == x && cell.y == y)){
            availableMoves.push({x, y});
        }
    }
    return availableMoves;
}

function botMove() {
    let opponent = currentPlayer === 'X' ? 'O' : 'X';
    let move = findWinningMove(currentPlayer); // Versuche zu gewinnen für den aktuellen Spieler
    if (!move) {
        move = findWinningMove(opponent); // Versuche zu blockieren
    }
    if (!move) {
        move = getRandomMove(); // Wähle einen zufälligen Zug
    }
    if (move) {
        setTimeout(() => {
            placeCell(move.x, move.y, currentPlayer);
        }, 100);
    }
}

function findWinningMove(player) {
    for (let line of lines) {
        let values = line.map(cell => {
            let gameCell = game.find(c => c.x == cell.x && c.y == cell.y);
            return gameCell ? gameCell.value : null;
        });
        if (values.filter(value => value === player).length === 2 && values.includes(null)) {
            let index = values.indexOf(null);
            let move = line[index];
            if (!game.find(cell => cell.x == move.x && cell.y == move.y)) {
                return move;
            }
        }
    }
    return null;
}

function getRandomMove() {
    let availableMoves = getAvailableMoves();
    if (availableMoves.length > 0) {
        let randomIndex = Math.floor(Math.random() * availableMoves.length);
        return availableMoves[randomIndex];
    }
    return null;
}

buildField()