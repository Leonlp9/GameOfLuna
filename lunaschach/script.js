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
                alert(getFigureIDAtField(feld.id) + " auf " + feld.id);
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
}

buildBrett()