let board = [
    ['r-1', 'n-1', 'b-1', 'q-1', 'k-1', 'b-2', 'n-2', 'r-2'],
    ['p-1', 'p-2', 'p-3', 'p-4', 'p-5', 'p-6', 'p-7', 'p8'],
    ['', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', ''],
    ['P-1', 'P-2', 'P-3', 'P-4', 'P-5', 'P-6', 'P-7', 'P-8'],
    ['R-1', 'N-1', 'B-1', 'Q-1', 'K-1', 'B-2', 'N-2', 'R-2']
];

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

function showMovesOfFigure(id){
    hideAllValidFields()

    const validFields = getValidFieldsToMoveOfFigure(id);
    for(let i = 0; i < validFields.length; i++){
        const field = getFieldElementByFieldID(String.fromCharCode(97 + validFields[i][1]) + (8 - validFields[i][0]));
        field.classList.add("valid");
        if(getPieceAtPosition(validFields[i][0], validFields[i][1]) !== "" && getFigureColorOnPosition(validFields[i][0], validFields[i][1]) !== getFigureColorOnPosition(getLocationOfFigureId(id)[0], getLocationOfFigureId(id)[1])){
            field.classList.add("hit");
        }
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
    console.log(validFields);
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

function buildBrett(){
    const brett = document.getElementById("schachbrett");
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
                if(feld.classList.contains("valid")){
                    const selected = document.getElementsByClassName("selected")[0];
                    const selectedFigureId = selected.id;
                    const selectedFigure = getFigureElementByFigureID(selectedFigureId);
                    const oldPos = getLocationOfFigureId(selectedFigureId);
                    const newPos = [8 - parseInt(feld.id[1]), feld.id.charCodeAt(0) - 97];
                    hitFigureAtPosition(newPos[0], newPos[1]);
                    board[oldPos[0]][oldPos[1]] = "";
                    board[newPos[0]][newPos[1]] = selectedFigureId;
                    updatePositions();
                    hideAllValidFields()
                    removeSelectedFromAllFields();
                }else
                if (getFigureElementByFigureID(getFigureIDAtField(feld.id))){
                    removeSelectedFromAllFields();

                    getFigureElementByFigureID(getFigureIDAtField(feld.id)).classList.toggle("selected");
                    showMovesOfFigure(getFigureIDAtField(feld.id));
                }else {
                    removeSelectedFromAllFields();
                    hideAllValidFields();
                }
            });

            const figur = getPieceAtPosition(i, j);
            if(figur){
                const img = document.createElement("div");
                img.classList.add("schachfigur");
                img.style.backgroundImage = `url(${textures[figur[0]]})`;
                img.id = figur;
                img.style.backgroundPosition = "center";
                img.style.backgroundSize = "cover";
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
            console.error("Figur nicht gefunden");
            continue;
        }
        figur.style.left = `${col * 12.5}%`;
        figur.style.top = `${row * 12.5}%`;
    }

    setTimeout(() => {
        let blackIndex = 0;
        let whiteIndex = 0;
        for (let i = 0; i < isOut.length; i++) {
            const figure = isOut[i];
            const figureElement = getFigureElementByFigureID(figure);
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
    }, 400);
}

buildBrett()