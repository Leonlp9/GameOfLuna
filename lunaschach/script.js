let board = [
    ['r', 'n', 'b', 'q', 'k', 'b', 'n', 'r'],
    ['p', 'p', 'p', 'p', 'p', 'p', 'p', 'p'],
    ['', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', ''],
    ['P', 'P', 'P', 'P', 'P', 'P', 'P', 'P'],
    ['R', 'N', 'B', 'Q', 'K', 'B', 'N', 'R']
];

function getPieceAtPosition(row, col) {
    return board[row][col];
}



function buildBrett(){
    const brett = document.getElementById("schachbrett");
    for(let i = 0; i < 8; i++){
        const reihe = document.createElement("div");
        reihe.classList.add("reihe");
        for(let j = 0; j < 8; j++){
            const feld = document.createElement("div");
            feld.classList.add("schachfeld");
            feld.id = String.fromCharCode(97 + j) + (8 - i);
            reihe.appendChild(feld);

            const figur = getPieceAtPosition(i, j);
            if(figur){
                const img = document.createElement("img");
                img.classList.add("schachfigur");
                img.src = `https://cdn-icons-png.flaticon.com/512/3411/3411055.png`;
                feld.appendChild(img);
            }
        }
        brett.appendChild(reihe);
    }

    updatePositions();
}

function updatePositions(){
    const figuren = document.getElementsByClassName("schachfigur");
    for(let figur of figuren){
        const id = figur.parentElement.id;
        const row = 8 - parseInt(id[1]);
        const col = id.charCodeAt(0) - 97;
        figur.style.left = `${col * 12.5}%`;
        figur.style.top = `${row * 12.5}%`;
    }
}

buildBrett()