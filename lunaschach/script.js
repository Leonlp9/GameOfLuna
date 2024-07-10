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
                const img = document.createElement("div");
                img.classList.add("schachfigur");
                img.style.backgroundImage = `url(${textures[figur[0]]})`;
                img.style.backgroundPosition = "center";
                img.style.backgroundSize = "cover";
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