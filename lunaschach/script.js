let board = [];
let isOut = []

const textures = {
    'r': 'img/R-Black.png',
    'n': 'img/N-Black.png',
    'b': 'img/B-Black.png',
    'q': 'img/Q-Black.png',
    'k': 'img/K-Black.png',
    'p': 'img/P-Black.png',
    'R': 'img/R-White.png',
    'N': 'img/N-White.png',
    'B': 'img/B-White.png',
    'Q': 'img/Q-White.png',
    'K': 'img/K-White.png',
    'P': 'img/P-White.png'
};

let turn = "white";
let botDifficulty = null;

function getPieceAtPosition(row, col) {
    return board[row][col];
}

/**
 * Gibt die Position einer Figur auf dem Brett zurück oben links ist 0,0
 * @param {string} id - Die ID der Figur
 * @returns {number[]|null} - Die Position der Figur oder null, wenn die Figur nicht gefunden wurde
 */
function getLocationOfFigureId(id){
    for(let i = 0; i < 8; i++){
        for(let j = 0; j < 8; j++){
            if(board[i][j] === id){
                return [i, j];
            }
        }
    }
    return null;
}

function getFigureColorOnPosition(row, col){
    //wenn es keine figur gibt dann null
    if(getPieceAtPosition(row, col) === ""){
        return null;
    }

    //wenn der erste buchstabe groß ist dann weiß sonst schwarz
    return getPieceAtPosition(row, col)[0] === getPieceAtPosition(row, col)[0].toUpperCase() ? "white" : "black";
}

function getFieldElementByFieldID(id){
    return document.getElementById(id);
}

function getFigureIDAtField(field){
    const row = 8 - parseInt(field[1]);
    const col = field.charCodeAt(0) - 97;
    return getPieceAtPosition(row, col);
}

function getFigureElementByFigureID(id){
    const figuren = document.getElementsByClassName("schachfigur");
    for(let i = 0; i < figuren.length; i++){
        if(figuren[i].id === id){
            return figuren[i];
        }
    }
    return null;
}

function checkIfIsOutsideBoard(row, col){
    return row < 0 || row >= 8 || col < 0 || col >= 8;
}

function hideAllValidFields(){
    //allen feldern valid entfernen
    const oldValidFields = document.querySelectorAll(".valid");
    for(let i = 0; i < oldValidFields.length; i++){
        oldValidFields[i].classList.remove("valid");
        if (oldValidFields[i].classList.contains("hit")) {
            oldValidFields[i].classList.remove("hit");
        }
    }
}

function removeSelectedFromAllFields(){
    //entferne allen anderen selected
    const oldSelectedFields = document.getElementsByClassName("selected");
    for(let i = 0; i < oldSelectedFields.length; i++){
        oldSelectedFields[i].classList.remove("selected");
    }
}

function showMovesOfFigure(id, playSound = true){
    hideAllValidFields()

    const validFields = getValidFieldsToMoveOfFigure(id);
    for(let i = 0; i < validFields.length; i++){
        const field = getFieldElementByFieldID(String.fromCharCode(97 + validFields[i][1]) + (8 - validFields[i][0]));
        field.classList.add("valid");
        if(getPieceAtPosition(validFields[i][0], validFields[i][1]) !== "" && getFigureColorOnPosition(validFields[i][0], validFields[i][1]) !== getFigureColorOnPosition(getLocationOfFigureId(id)[0], getLocationOfFigureId(id)[1])){
            field.classList.add("hit");
        }
    }
    if (playSound) {
        playSoundEffekt("sounds/select.mp3")
    }
}

function getValidFieldsToMoveOfFigure(id){

    let type = id[0].toLowerCase();

    let pos = getLocationOfFigureId(id);
    let row = pos[0];
    let col = pos[1];
    let directions = [];

    //wenn lowercase dann schwarz sonst weiß
    let color = getFigureColorOnPosition(row, col)
    //weiße bauern gehen nach oben, schwarze nach unten
    let direction = color === "white" ? -1 : 1;
    let validFields = [];

    switch(type){
        case 'p':
            //Bauern können nur einen Schritt nach vorne gehen außer beim ersten Zug dann 2
            let nextRow = row + direction;
            let nextCol = col;
            if(!checkIfIsOutsideBoard(nextRow, nextCol) && getPieceAtPosition(nextRow, nextCol) === "" && getFigureColorOnPosition(nextRow, nextCol) !== color){
                validFields.push([nextRow, nextCol]);
                if((color === "white" && row === 6) || (color === "black" && row === 1)){
                    nextRow = row + 2 * direction;
                    if(!checkIfIsOutsideBoard(nextRow, nextCol) && getPieceAtPosition(nextRow, nextCol) === "" && getFigureColorOnPosition(nextRow, nextCol) !== color){
                        validFields.push([nextRow, nextCol]);
                    }
                }
            }
            //Bauern können schlagen
            nextRow = row + direction;
            nextCol = col + 1;
            if(!checkIfIsOutsideBoard(nextRow, nextCol) && getPieceAtPosition(nextRow, nextCol) !== "" && getFigureColorOnPosition(nextRow, nextCol) !== color){
                validFields.push([nextRow, nextCol]);
            }
            nextCol = col - 1;
            if(!checkIfIsOutsideBoard(nextRow, nextCol) && getPieceAtPosition(nextRow, nextCol) !== "" && getFigureColorOnPosition(nextRow, nextCol) !== color){
                validFields.push([nextRow, nextCol]);
            }
            break;
        case 'n':
            //Springer
            directions = [
                [-2, -1],
                [-2, 1],
                [-1, -2],
                [-1, 2],
                [1, -2],
                [1, 2],
                [2, -1],
                [2, 1]
            ];
            for(let i = 0; i < directions.length; i++){
                let nextRow = row + directions[i][0];
                let nextCol = col + directions[i][1];
                if(!checkIfIsOutsideBoard(nextRow, nextCol) && (getPieceAtPosition(nextRow, nextCol) === "" || getFigureColorOnPosition(nextRow, nextCol) !== color)){
                    validFields.push([nextRow, nextCol]);
                }
            }
            break;
        case 'b':
            //Läufer
            directions = [
                [-1, -1],
                [-1, 1],
                [1, -1],
                [1, 1]
            ];
            for(let i = 0; i < directions.length; i++){
                let nextRow = row + directions[i][0];
                let nextCol = col + directions[i][1];
                while(!checkIfIsOutsideBoard(nextRow, nextCol) && (getPieceAtPosition(nextRow, nextCol) === "" || getFigureColorOnPosition(nextRow, nextCol) !== color)){
                    validFields.push([nextRow, nextCol]);
                    if(getPieceAtPosition(nextRow, nextCol) !== ""){
                        break;
                    }
                    nextRow += directions[i][0];
                    nextCol += directions[i][1];
                }
            }
            break;
        case 'r':
            //Turm
            directions = [
                [-1, 0],
                [1, 0],
                [0, -1],
                [0, 1]
            ];
            for(let i = 0; i < directions.length; i++){
                let nextRow = row + directions[i][0];
                let nextCol = col + directions[i][1];
                while(!checkIfIsOutsideBoard(nextRow, nextCol) && (getPieceAtPosition(nextRow, nextCol) === "" || getFigureColorOnPosition(nextRow, nextCol) !== color)){
                    validFields.push([nextRow, nextCol]);
                    if(getPieceAtPosition(nextRow, nextCol) !== ""){
                        break;
                    }
                    nextRow += directions[i][0];
                    nextCol += directions[i][1];
                }
            }
            break;
        case 'q':
            //Dame
            directions = [
                [-1, -1],
                [-1, 1],
                [1, -1],
                [1, 1],
                [-1, 0],
                [1, 0],
                [0, -1],
                [0, 1]
            ];
            for(let i = 0; i < directions.length; i++){
                let nextRow = row + directions[i][0];
                let nextCol = col + directions[i][1];
                while(!checkIfIsOutsideBoard(nextRow, nextCol) && (getPieceAtPosition(nextRow, nextCol) === "" || getFigureColorOnPosition(nextRow, nextCol) !== color)){
                    validFields.push([nextRow, nextCol]);
                    if(getPieceAtPosition(nextRow, nextCol) !== ""){
                        break;
                    }
                    nextRow += directions[i][0];
                    nextCol += directions[i][1];
                }
            }
            break;
        case 'k':
            //König
            directions = [
                [-1, -1],
                [-1, 1],
                [1, -1],
                [1, 1],
                [-1, 0],
                [1, 0],
                [0, -1],
                [0, 1]
            ];
            for(let i = 0; i < directions.length; i++){
                let nextRow = row + directions[i][0];
                let nextCol = col + directions[i][1];
                if(!checkIfIsOutsideBoard(nextRow, nextCol) && (getPieceAtPosition(nextRow, nextCol) === "" || getFigureColorOnPosition(nextRow, nextCol) !== color)){
                    validFields.push([nextRow, nextCol]);
                }
            }
            break;
    }
    return validFields;
}

function hitFigureAtPosition(row, col){
    const figureId = getPieceAtPosition(row, col);
    if(figureId === ""){
        return;
    }
    isOut.push(figureId);
    board[row][col] = "";
}

function playSoundEffekt(sound) {
    let audio = new Audio(sound);
    audio.play().then();
}

function move(feld) {
    const selected = document.getElementsByClassName("selected")[0];
    const selectedFigureId = selected.id;
    const oldPos = getLocationOfFigureId(selectedFigureId);
    const newPos = [8 - parseInt(feld.id[1]), feld.id.charCodeAt(0) - 97];
    playSoundEffekt("sounds/move.mp3")

    //wenn eine figur geschlagen wurde
    if (board[newPos[0]][newPos[1]] !== "") {
        setTimeout(() => {
            playSoundEffekt("sounds/hit.mp3")
        }, 400)
    }

    //wenn ein könig geschlagen wurde
    if (board[newPos[0]][newPos[1]].toUpperCase().includes("K")) {
        setTimeout(() => {
            playSoundEffekt("sounds/game-end.mp3")
        }, 400)
    }

    hitFigureAtPosition(newPos[0], newPos[1]);

    board[oldPos[0]][oldPos[1]] = "";
    board[newPos[0]][newPos[1]] = selectedFigureId;

    //wenn es ein bauer ist und an der anderen seite angekommen ist dann
    askForTransformation(selectedFigureId);

    updatePositions();

    turn = turn === "white" ? "black" : "white";

    hideAllValidFields()
    removeSelectedFromAllFields();

    botPlay();
}

function buildBrett(){
    isOut = [];
    botDifficulty = null;
    turn = "white";
    board = [
        ['r-1', 'n-1', 'b-1', 'q-1', 'k-1', 'b-2', 'n-2', 'r-2'],
        ['p-1', 'p-2', 'p-3', 'p-4', 'p-5', 'p-6', 'p-7', 'p8'],
        ['', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', ''],
        ['P-1', 'P-2', 'P-3', 'P-4', 'P-5', 'P-6', 'P-7', 'P-8'],
        ['R-1', 'N-1', 'B-1', 'Q-1', 'K-1', 'B-2', 'N-2', 'R-2']
    ];

    const brett = document.getElementById("schachbrett");

    brett.innerHTML = "";

    const oldExitButton = document.getElementsByClassName("exit-button")[0];
    if(oldExitButton){
        document.body.removeChild(oldExitButton);
    }

    const exitButton = document.createElement("button");
    exitButton.classList.add("exit-button");
    exitButton.innerHTML = '<i class="fas fa-times"></i>';
    exitButton.addEventListener("click", function(){
        openStartMenu()
    });
    document.body.appendChild(exitButton);

    for(let i = 0; i < 8; i++){
        const reihe = document.createElement("div");
        reihe.classList.add("reihe");
        for(let j = 0; j < 8; j++){
            const feld = document.createElement("div");
            feld.classList.add("schachfeld");
            feld.id = String.fromCharCode(97 + i) + (8 - j);
            reihe.appendChild(feld);
            feld.addEventListener("click", function(){
                //wenn das feld die classe valid hat dann bewege die figur

                if (botDifficulty === null || turn === "white") {
                    if (feld.classList.contains("valid")) {
                        move(feld);
                    } else if (getFigureElementByFigureID(getFigureIDAtField(feld.id)) && getFigureColorOnPosition(8 - parseInt(feld.id[1]), feld.id.charCodeAt(0) - 97) === turn) {

                        //wenn es die gleiche farbe ist
                        removeSelectedFromAllFields();

                        getFigureElementByFigureID(getFigureIDAtField(feld.id)).classList.toggle("selected");
                        showMovesOfFigure(getFigureIDAtField(feld.id));

                    } else {
                        removeSelectedFromAllFields();
                        hideAllValidFields();
                    }
                }
            });

            const figur = getPieceAtPosition(i, j);
            if(figur){
                const img = document.createElement("div");
                img.classList.add("schachfigur");
                img.style.backgroundImage = `url(${textures[figur[0]]})`;
                img.id = figur;
                img.style.backgroundPosition = "center";
                img.style.backgroundSize = "contain";
                img.style.backgroundRepeat = "no-repeat";
                brett.appendChild(img);
            }
        }
        brett.appendChild(reihe);
    }

    for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
            if (i === 7 || j === 0) {
                // Bedingung für die spezielle Situation bei i = 7 und j = 0
                if (i === 7 && j === 0) {
                    // Element für letter
                    const letterDesc = document.createElement("div");
                    letterDesc.classList.add("description", "letter");
                    letterDesc.innerHTML = String.fromCharCode(97 + j);
                    letterDesc.style.left = `${j * 12.5}%`;
                    letterDesc.style.bottom = `${100 - (i + 1) * 12.5}%`;
                    brett.appendChild(letterDesc);

                    // Element für number
                    const numberDesc = document.createElement("div");
                    numberDesc.classList.add("description", "number");
                    numberDesc.innerHTML = 8 - i;
                    numberDesc.style.left = `${j * 12.5}%`;
                    numberDesc.style.bottom = `${100 - (i + 1) * 12.5}%`;
                    brett.appendChild(numberDesc);
                } else {
                    // Normale Bedingung für i = 7 oder j = 0
                    const desc = document.createElement("div");
                    desc.classList.add("description");

                    if (i === 7) {
                        desc.classList.add("letter");
                        desc.innerHTML = String.fromCharCode(97 + j);
                    }
                    if (j === 0) {
                        desc.classList.add("number");
                        desc.innerHTML = 8 - i;
                    }

                    desc.style.left = `${j * 12.5}%`;
                    desc.style.bottom = `${100 - (i + 1) * 12.5}%`;
                    brett.appendChild(desc);
                }
            }
        }
    }

    updatePositions();
}

function botPlay(){
    if (turn === "black" && botDifficulty !== null) {
        let schwarzeFiguren = [];
        for (let i = 0; i < 8; i++) {
            for (let j = 0; j < 8; j++) {
                if (getFigureColorOnPosition(i, j) === "black") {
                    schwarzeFiguren.push([i, j]);
                }
            }
        }

        if (botDifficulty === "easy") {
            //shuffle the array
            schwarzeFiguren.sort(() => Math.random() - 0.5);

            let ofFigures = [];
            let validMoves = [];
            for (let i = 0; i < schwarzeFiguren.length; i++) {
                const validFields = getValidFieldsToMoveOfFigure(board[schwarzeFiguren[i][0]][schwarzeFiguren[i][1]]);
                if (validFields.length > 0) {
                    validMoves.push([schwarzeFiguren[i], validFields]);
                    ofFigures.push(board[schwarzeFiguren[i][0]][schwarzeFiguren[i][1]]);
                }
            }

            if (validMoves.length > 0) {
                let randomFigure = ofFigures[Math.floor(Math.random() * ofFigures.length)];

                const figureElement = getFigureElementByFigureID(randomFigure);
                figureElement.classList.add("selected");

                showMovesOfFigure(randomFigure)

                setTimeout(() => {

                    let allValidFields = document.querySelectorAll(".valid");
                    let randomValidField = allValidFields[Math.floor(Math.random() * allValidFields.length)];
                    move(randomValidField);

                }, 1000)
            }
        }else if(botDifficulty === "medium") {
            //TODO vermeide das schlagen von eigenen Figuren und priorisiere das schlagen von gegnerischen Figuren

            //shuffle the array
            schwarzeFiguren.sort(() => Math.random() - 0.5);

            let ofFigures = [];
            let validMoves = []
            for (let i = 0; i < schwarzeFiguren.length; i++) {
                const validFields = getValidFieldsToMoveOfFigure(board[schwarzeFiguren[i][0]][schwarzeFiguren[i][1]]);
                if (validFields.length > 0) {
                    ofFigures.push(board[schwarzeFiguren[i][0]][schwarzeFiguren[i][1]]);
                }
            }

            if (ofFigures.length > 0) {
                //check for hit
                let hitFigures = [];
                for (let i = 0; i < ofFigures.length; i++) {
                    showMovesOfFigure(ofFigures[i], false);
                    let allValidFields = document.querySelectorAll(".valid");
                    for (let j = 0; j < allValidFields.length; j++) {
                        if (allValidFields[j].classList.contains("hit")) {
                            hitFigures.push(ofFigures[i]);
                        }
                    }
                }
                if (hitFigures.length > 0) {
                    let randomFigure = hitFigures[Math.floor(Math.random() * hitFigures.length)];
                    const figureElement = getFigureElementByFigureID(randomFigure);
                    figureElement.classList.add("selected");

                    showMovesOfFigure(randomFigure)

                    setTimeout(() => {

                        let allValidFields = document.querySelectorAll(".hit");
                        let randomValidField = allValidFields[Math.floor(Math.random() * allValidFields.length)];
                        move(randomValidField);

                    }, 1000)
                } else {
                    let randomFigure = ofFigures[Math.floor(Math.random() * ofFigures.length)];
                    const figureElement = getFigureElementByFigureID(randomFigure);
                    figureElement.classList.add("selected");

                    showMovesOfFigure(randomFigure)

                    setTimeout(() => {

                        let allValidFields = document.querySelectorAll(".valid");
                        let randomValidField = allValidFields[Math.floor(Math.random() * allValidFields.length)];
                        move(randomValidField);

                    }, 1000)

                }
            }
        }
    }
}

// Add this at the top of your script
const pieceValues = {
    'p': 1,
    'n': 3,
    'b': 3,
    'r': 5,
    'q': 9,
    'k': 0  // King's value is set to 0 because capturing the king ends the game
};

// Function to get the value of a piece
function getValueOfPiece(piece) {
    return pieceValues[piece.toLowerCase()];
}

// Function to check if a piece would be in danger after a move
function isPieceInDangerAfterMove(from, to) {
    const [fromRow, fromCol] = from;
    const [toRow, toCol] = to;

    const piece = board[fromRow][fromCol];
    const pieceColor = getFigureColorOnPosition(fromRow, fromCol);

    // Temporarily move the piece
    const temp = board[toRow][toCol];
    board[toRow][toCol] = piece;
    board[fromRow][fromCol] = "";

    // Check all opponent's moves to see if they can capture the piece
    let inDanger = false;
    outerLoop: for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
            if (getFigureColorOnPosition(i, j) !== pieceColor && getFigureColorOnPosition(i, j) !== null) {
                const opponentMoves = getValidFieldsToMoveOfFigure(board[i][j]);
                for (const move of opponentMoves) {
                    if (move[0] === toRow && move[1] === toCol) {
                        inDanger = true;
                        break outerLoop;
                    }
                }
            }
        }
    }

    // Revert the move
    board[fromRow][fromCol] = piece;
    board[toRow][toCol] = temp;

    return inDanger;
}

// Function to determine if a move would result in a check
function wouldResultInCheck(from, to) {
    const [fromRow, fromCol] = from;
    const [toRow, toCol] = to;

    const piece = board[fromRow][fromCol];
    const pieceColor = getFigureColorOnPosition(fromRow, fromCol);
    const opponentColor = pieceColor === "white" ? "black" : "white";

    // Temporarily move the piece
    const temp = board[toRow][toCol];
    board[toRow][toCol] = piece;
    board[fromRow][fromCol] = "";

    // Find the king's position
    let kingPosition;
    for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
            if (board[i][j] && board[i][j][0].toLowerCase() === 'k' && getFigureColorOnPosition(i, j) === pieceColor) {
                kingPosition = [i, j];
                break;
            }
        }
    }

    // Check all opponent's moves to see if they can capture the king
    let inCheck = false;
    outerLoop: for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
            if (getFigureColorOnPosition(i, j) === opponentColor) {
                const opponentMoves = getValidFieldsToMoveOfFigure(board[i][j]);
                for (const move of opponentMoves) {
                    if (move[0] === kingPosition[0] && move[1] === kingPosition[1]) {
                        inCheck = true;
                        break outerLoop;
                    }
                }
            }
        }
    }

    // Revert the move
    board[fromRow][fromCol] = piece;
    board[toRow][toCol] = temp;

    return inCheck;
}

// Function to determine if a move would result in checkmate
function wouldResultInCheckmate(from, to) {
    if (!wouldResultInCheck(from, to)) {
        return false;
    }

    const pieceColor = getFigureColorOnPosition(from[0], from[1]);
    const opponentColor = pieceColor === "white" ? "black" : "white";

    // Temporarily move the piece
    const temp = board[to[0]][to[1]];
    board[to[0]][to[1]] = board[from[0]][from[1]];
    board[from[0]][from[1]] = "";

    // Check if the opponent has any valid moves to get out of check
    let checkmate = true;
    outerLoop: for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
            if (getFigureColorOnPosition(i, j) === opponentColor) {
                const opponentMoves = getValidFieldsToMoveOfFigure(board[i][j]);
                for (const move of opponentMoves) {
                    const temp2 = board[move[0]][move[1]];
                    board[move[0]][move[1]] = board[i][j];
                    board[i][j] = "";
                    if (!wouldResultInCheck([move[0], move[1]], move)) {
                        checkmate = false;
                    }
                    board[i][j] = board[move[0]][move[1]];
                    board[move[0]][move[1]] = temp2;
                    if (!checkmate) {
                        break outerLoop;
                    }
                }
            }
        }
    }

    // Revert the move
    board[from[0]][from[1]] = board[to[0]][to[1]];
    board[to[0]][to[1]] = temp;

    return checkmate;
}

// Add the methods to the existing botPlay function
// Check and include these methods in the function that calls them


function updatePositions(){
    const figuren = document.getElementsByClassName("schachfigur");
    for(let i = 0; i < figuren.length; i++){
        const figur = figuren[i];
        const figurId = figur.id;
        //im board nach der Figur suchen
        let row = -1;
        let col = -1;
        for(let i = 0; i < 8; i++){
            for(let j = 0; j < 8; j++){
                if(board[i][j] === figurId){
                    row = i;
                    col = j;
                    break;
                }
            }
        }
        if(row === -1 || col === -1){
            continue;
        }
        figur.style.left = `${col * 12.5}%`;
        figur.style.top = `${row * 12.5}%`;
    }

    let blackIndex = 0;
    let whiteIndex = 0;
    for (let i = 0; i < isOut.length; i++) {
        const figure = isOut[i];
        const figureElement = getFigureElementByFigureID(figure);
        figureElement.style.transitionDelay = `0.4s`;
        if (figure[0] === figure[0].toLowerCase()) {
            figureElement.style.left = `${(blackIndex - 0.5) * 100 / 16}%`;
            figureElement.style.top = "-15%";
            blackIndex++;
        } else {
            figureElement.style.left = `${(whiteIndex - 0.5) * 100 / 16}%`;
            figureElement.style.top = "110%";
            whiteIndex++;
        }
    }
}

function askForTransformation(id) {
    const color = getFigureColorOnPosition(getLocationOfFigureId(id)[0], getLocationOfFigureId(id)[1]);
    const row = getLocationOfFigureId(id)[0];
    const col = getLocationOfFigureId(id)[1];

    if (id[0].toLowerCase() === 'p' && ((color === 'white' && row === 0) || (color === 'black' && row === 7))) {

        const askBackground = document.createElement("div");
        askBackground.classList.add("askBackground");
        document.body.appendChild(askBackground);

        const ask = document.createElement("div");
        ask.classList.add("ask");
        askBackground.appendChild(ask);

        const text = document.createElement("div");
        text.classList.add("text");
        text.innerHTML = "Wähle eine Figur aus";
        ask.appendChild(text);

        const figures = document.createElement("div");
        figures.classList.add("figures");
        ask.appendChild(figures);

        const queen = document.createElement("div");
        queen.classList.add("queen");
        queen.style.backgroundImage = `url(${textures[(color === 'white' ? 'Q' : 'q')]})`;
        queen.addEventListener("click", function () {
            board[row][col] = (color === 'white' ? 'Q' : 'q') + "-" + (parseInt(id[2]) + 2);
            getFigureElementByFigureID(id).style.backgroundImage = `url(${textures[(color === 'white' ? 'Q' : 'q')]})`;
            getFigureElementByFigureID(id).id = (color === 'white' ? 'Q' : 'q') + "-" + (parseInt(id[2]) + 2);
            document.body.removeChild(askBackground);
            updatePositions();
        });
        figures.appendChild(queen);

        const rook = document.createElement("div");
        rook.classList.add("rook");
        rook.style.backgroundImage = `url(${textures[(color === 'white' ? 'R' : 'r')]})`;
        rook.addEventListener("click", function () {
            board[row][col] = (color === 'white' ? 'R' : 'r') + "-" + (parseInt(id[2]) + 2);
            getFigureElementByFigureID(id).style.backgroundImage = `url(${textures[(color === 'white' ? 'R' : 'r')]})`;
            getFigureElementByFigureID(id).id = (color === 'white' ? 'R' : 'r') + "-" + (parseInt(id[2]) + 2);
            document.body.removeChild(askBackground);
            updatePositions();
        });
        figures.appendChild(rook);

        const bishop = document.createElement("div");
        bishop.classList.add("bishop");
        bishop.style.backgroundImage = `url(${textures[(color === 'white' ? 'B' : 'b')]})`;
        bishop.addEventListener("click", function () {
            board[row][col] = (color === 'white' ? 'B' : 'b') + "-" + (parseInt(id[2]) + 2);
            getFigureElementByFigureID(id).style.backgroundImage = `url(${textures[(color === 'white' ? 'B' : 'b')]})`;
            getFigureElementByFigureID(id).id = (color === 'white' ? 'B' : 'b') + "-" + (parseInt(id[2]) + 2);
            document.body.removeChild(askBackground);
            updatePositions();
        });
        figures.appendChild(bishop);

        const knight = document.createElement("div");
        knight.classList.add("knight");
        knight.style.backgroundImage = `url(${textures[(color === 'white' ? 'N' : 'n')]})`;
        knight.addEventListener("click", function () {
            board[row][col] = (color === 'white' ? 'N' : 'n') + "-" + (parseInt(id[2]) + 2);
            getFigureElementByFigureID(id).style.backgroundImage = `url(${textures[(color === 'white' ? 'N' : 'n')]})`;
            getFigureElementByFigureID(id).id = (color === 'white' ? 'N' : 'n') + "-" + (parseInt(id[2]) + 2);
            document.body.removeChild(askBackground);
            updatePositions();
        });
        figures.appendChild(knight);

    }
}

function openStartMenu(){

    const oldExitButton = document.getElementsByClassName("exit-button")[0];
    if(oldExitButton){
        document.body.removeChild(oldExitButton);
    }

    const startMenuBackground = document.createElement("div");
    startMenuBackground.classList.add("startMenuBackground");
    document.body.appendChild(startMenuBackground);

    const startMenu = document.createElement("div");
    startMenu.classList.add("startMenu");
    startMenuBackground.appendChild(startMenu);

    const backHome = document.createElement('button');
    backHome.classList.add('back-home');
    backHome.style.position = 'absolute';
    backHome.style.top = '10px';
    backHome.style.left = '10px';
    backHome.innerHTML = '<i class="fas fa-home"></i>';
    backHome.addEventListener('click', () => {
        location.href = '../index.html';
    });
    startMenu.appendChild(backHome);

    const title = document.createElement("div");
    title.classList.add("title");
    title.innerHTML = "Schach";
    startMenu.appendChild(title);

    const startButtons = document.createElement("div");
    startButtons.classList.add("startButtons");
    startMenu.appendChild(startButtons);

    const startButtonPlayer = document.createElement("button");
    startButtonPlayer.classList.add("startButton");
    startButtonPlayer.innerHTML = "Start Spieler<i class='fas fa-user'></i>";
    startButtonPlayer.addEventListener("click", function(){
        document.body.removeChild(startMenuBackground);
        buildBrett();
    });

    const startButtonComputer = document.createElement("button");
    startButtonComputer.classList.add("startButton");
    startButtonComputer.innerHTML = "Start Bot<i class='fas fa-robot'></i>";
    startButtonComputer.addEventListener("click", function(){
        startMenu.innerHTML = "";

        const schwierigkeit = document.createElement("div");
        schwierigkeit.classList.add("title");
        schwierigkeit.innerHTML = "Schwierigkeit";
        startMenu.appendChild(schwierigkeit);

        const schwierigkeitButtons = document.createElement("div");
        schwierigkeitButtons.classList.add("startButtons");
        startMenu.appendChild(schwierigkeitButtons);

        const easyButton = document.createElement("button");
        easyButton.classList.add("startButton");
        easyButton.innerHTML = "Leicht";
        easyButton.addEventListener("click", function(){
            document.body.removeChild(startMenuBackground);
            buildBrett();
            botDifficulty = "easy";
        });

        const mediumButton = document.createElement("button");
        mediumButton.classList.add("startButton");
        mediumButton.innerHTML = "Mittel";
        mediumButton.addEventListener("click", function(){
            document.body.removeChild(startMenuBackground);
            buildBrett();
            botDifficulty = "medium";
        });

        const hardButton = document.createElement("button");
        hardButton.classList.add("startButton");
        hardButton.innerHTML = "Schwer";
        hardButton.addEventListener("click", function(){
        });

        schwierigkeitButtons.appendChild(easyButton);
        schwierigkeitButtons.appendChild(mediumButton);
        schwierigkeitButtons.appendChild(hardButton);



    });

    startButtons.appendChild(startButtonPlayer);
    startButtons.appendChild(startButtonComputer);

}

buildBrett()

openStartMenu()