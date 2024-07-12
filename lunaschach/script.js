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

function playSoundEffekt(sound) {
    let audio = new Audio(sound);
    audio.play().then();
}

function getPieceAt(row, col){
    return board.find(field => field.row === row && field.col === col && !field.isOut);
}

function buildBrett(){
    isOut = [];
    botDifficulty = null;
    turn = "white";
    board = [
        {
            piece: "r",
            row: 0,
            col: 0,
            moved: false,
            isOut: false,
            selected: false
        },
        {
            piece: "n",
            row: 0,
            col: 1,
            moved: false,
            isOut: false,
            selected: false
        },
        {
            piece: "b",
            row: 0,
            col: 2,
            moved: false,
            isOut: false,
            selected: false
        },
        {
            piece: "q",
            row: 0,
            col: 3,
            moved: false,
            isOut: false,
            selected: false
        },
        {
            piece: "k",
            row: 0,
            col: 4,
            moved: false,
            isOut: false,
            selected: false
        },
        {
            piece: "b",
            row: 0,
            col: 5,
            moved: false,
            isOut: false,
            selected: false
        },
        {
            piece: "n",
            row: 0,
            col: 6,
            moved: false,
            isOut: false,
            selected: false
        },
        {
            piece: "r",
            row: 0,
            col: 7,
            moved: false,
            isOut: false,
            selected: false
        },
        {
            piece: "p",
            row: 1,
            col: 0,
            moved: false,
            isOut: false,
            selected: false
        },
        {
            piece: "p",
            row: 1,
            col: 1,
            moved: false,
            isOut: false,
            selected: false
        },
        {
            piece: "p",
            row: 1,
            col: 2,
            moved: false,
            isOut: false,
            selected: false
        },
        {
            piece: "p",
            row: 1,
            col: 3,
            moved: false,
            isOut: false,
            selected: false
        },
        {
            piece: "p",
            row: 1,
            col: 4,
            moved: false,
            isOut: false,
            selected: false
        },
        {
            piece: "p",
            row: 1,
            col: 5,
            moved: false,
            isOut: false,
            selected: false
        },
        {
            piece: "p",
            row: 1,
            col: 6,
            moved: false,
            isOut: false,
            selected: false
        },
        {
            piece: "p",
            row: 1,
            col: 7,
            moved: false,
            isOut: false,
            selected: false
        },
        {
            piece: "R",
            row: 7,
            col: 0,
            moved: false,
            isOut: false,
            selected: false
        },
        {
            piece: "N",
            row: 7,
            col: 1,
            moved: false,
            isOut: false,
            selected: false
        },
        {
            piece: "B",
            row: 7,
            col: 2,
            moved: false,
            isOut: false,
            selected: false
        },
        {
            piece: "Q",
            row: 7,
            col: 3,
            moved: false,
            isOut: false,
            selected: false
        },
        {
            piece: "K",
            row: 7,
            col: 4,
            moved: false,
            isOut: false,
            selected: false
        },
        {
            piece: "B",
            row: 7,
            col: 5,
            moved: false,
            isOut: false,
            selected: false
        },
        {
            piece: "N",
            row: 7,
            col: 6,
            moved: false,
            isOut: false,
            selected: false
        },
        {
            piece: "R",
            row: 7,
            col: 7,
            moved: false,
            isOut: false,
            selected: false
        },
        {
            piece: "P",
            row: 6,
            col: 0,
            moved: false,
            isOut: false,
            selected: false
        },
        {
            piece: "P",
            row: 6,
            col: 1,
            moved: false,
            isOut: false,
            selected: false
        },
        {
            piece: "P",
            row: 6,
            col: 2,
            moved: false,
            isOut: false,
            selected: false
        },
        {
            piece: "P",
            row: 6,
            col: 3,
            moved: false,
            isOut: false,
            selected: false
        },
        {
            piece: "P",
            row: 6,
            col: 4,
            moved: false,
            isOut: false,
            selected: false
        },
        {
            piece: "P",
            row: 6,
            col: 5,
            moved: false,
            isOut: false,
            selected: false
        },
        {
            piece: "P",
            row: 6,
            col: 6,
            moved: false,
            isOut: false,
            selected: false
        },
        {
            piece: "P",
            row: 6,
            col: 7,
            moved: false,
            isOut: false,
            selected: false
        }
    ];

    const brett = document.getElementById("schachbrett");

    brett.innerHTML = "";

    for(let i = 0; i < 8; i++){
        for(let j = 0; j < 8; j++){
            const field = document.createElement("div");
            field.classList.add("schachfeld");
            field.setAttribute("data-row", i + "");
            field.setAttribute("data-col", j + "");
            if((i + j) % 2 === 0){
                field.classList.add("black");
            }
            field.addEventListener("click", function(){
                if (field.classList.contains("valid")) {
                    const piece = getSelectedPiece();
                    const row = parseInt(field.getAttribute("data-row"));
                    const col = parseInt(field.getAttribute("data-col"));
                    movePiece(piece, row, col, field.classList.contains("hit"));
                    unselectAll()
                    hideValidMoves()

                }else {
                    const piece = getPieceAt(i, j);
                    if(piece && getPeacesColor(piece.piece) === turn){
                        showValidMoves(getPieceAt(i, j));
                        selectPiece(getPieceAt(i, j));
                    }
                }
            });
            brett.appendChild(field);
        }
    }

    updatePositions()
}

function unselectAll(){
    for(let i = 0; i < board.length; i++) {
        board[i].selected = false;
        let element = document.getElementById(i + "-schachfigur");
        if(element){
            element.classList.remove("selected");
        }
    }
}

function selectPiece(piece){
    unselectAll()
    let element = document.getElementById(board.indexOf(piece) + "-schachfigur");
    element.classList.add("selected");
    piece.selected = true;
}

function getSelectedPiece(){
    return board.find(field => field.selected);
}

function updatePositions(){
    let isOutCounter = 0;
    for (let i = 0; i < board.length; i++) {
        const piece = board[i].piece
        const row = board[i].row
        const col = board[i].col
        const isOut = board[i].isOut
        const color = getPeacesColor(piece)
        const id = i + "-schachfigur"

        //wenn kein element vorhanden ist, erstelle es
        if(!document.getElementById(id)){
            const img = document.createElement("div");
            img.classList.add("schachfigur");
            img.id = id;
            img.style.backgroundImage = "url(" + textures[piece] + ")";
            img.style.top = (row * 12.5) + "%";
            img.style.left = (col * 12.5) + "%";
            document.getElementById("schachbrett").appendChild(img);
        }
        //wenn element vorhanden ist, aktualisiere es
        else{
            const img = document.getElementById(id);

            if (isOut) {
                if (color === "white") {
                    img.style.top = "100%";
                }else {
                    img.style.top = "-14%";
                }
                img.style.left = (isOutCounter * 12.5 / 2) + "%";
            }else {
                img.style.top = (row * 12.5) + "%";
                img.style.left = (col * 12.5) + "%";
            }
        }
        if (isOut) {
            isOutCounter++;
        }
    }
}

function getPeacesColor(piece){
    return piece === piece.toUpperCase() ? "white" : "black";
}

function hideValidMoves(){
    const fields = document.querySelectorAll(".schachfeld");
    for(let i = 0; i < fields.length; i++){
        fields[i].classList.remove("valid");
        fields[i].classList.remove("hit");
    }
}

function showValidMoves(pieceObject){
    hideValidMoves()

    const validMoves = getValidMoves(pieceObject);

    playSoundEffekt('sounds/select.mp3')

    for(let i = 0; i < validMoves.length; i++){
        const move = validMoves[i];
        const field = document.querySelector(".schachfeld[data-row='" + move.row + "'][data-col='" + move.col + "']");
        field.classList.add("valid");
        if (move.isCapture) {
            field.classList.add("hit");
        }
    }
}

function movePiece(pieceObject, row, col, isCapture){
    const piece = pieceObject.piece;
    const oldRow = pieceObject.row;
    const oldCol = pieceObject.col;

    if(isCapture){
        const index = board.findIndex(field => field.row === row && field.col === col);
        board[index].isOut = true;
        const element = document.getElementById(index + "-schachfigur");
        element.style.transitionDelay = "0.4s";
    }

    pieceObject.row = row;
    pieceObject.col = col;
    pieceObject.moved = true;

    playSoundEffekt('sounds/move.mp3');

    if(piece.toLowerCase() === "p" && (row === 0 || row === 7)){
        pieceObject.piece = piece === "p" ? "q" : "Q";
    }

    if(turn === "white"){
        turn = "black";
    }
    else{
        turn = "white";
    }

    updatePositions();
}

function getValidMoves(pieceObject) {
    const { piece, row, col } = pieceObject;
    const color = getPeacesColor(piece);
    const validMoves = [];

    const addMove = (r, c, isCapture) => {
        if (r >= 0 && r < 8 && c >= 0 && c < 8) {
            validMoves.push({ row: r, col: c, isCapture });
        }
    };

    const handlePawnMoves = () => {
        const direction = color === "white" ? -1 : 1;
        const startRow = color === "white" ? 6 : 1;

        if (!getPieceAt(row + direction, col)) {
            addMove(row + direction, col, false);
            if (row === startRow && !getPieceAt(row + direction * 2, col)) {
                addMove(row + direction * 2, col, false);
            }
        }
        for (let dc of [-1, 1]) {
            const capturePiece = getPieceAt(row + direction, col + dc);
            if (capturePiece && getPeacesColor(capturePiece.piece) !== color) {
                addMove(row + direction, col + dc, true);
            }
        }
    };

    const handleRookMoves = () => {
        const directions = [[1, 0], [-1, 0], [0, 1], [0, -1]];
        for (let [dr, dc] of directions) {
            for (let i = 1; i < 8; i++) {
                const r = row + dr * i, c = col + dc * i;
                const pieceAtPos = getPieceAt(r, c);
                if (!pieceAtPos) {
                    addMove(r, c, false);
                } else {
                    if (getPeacesColor(pieceAtPos.piece) !== color) {
                        addMove(r, c, true);
                    }
                    break;
                }
            }
        }
    };

    const handleKnightMoves = () => {
        const moves = [[2, 1], [2, -1], [-2, 1], [-2, -1], [1, 2], [1, -2], [-1, 2], [-1, -2]];
        for (let [dr, dc] of moves) {
            const r = row + dr, c = col + dc;
            const pieceAtPos = getPieceAt(r, c);
            if (!pieceAtPos || getPeacesColor(pieceAtPos.piece) !== color) {
                addMove(r, c, !!pieceAtPos);
            }
        }
    };

    const handleBishopMoves = () => {
        const directions = [[1, 1], [1, -1], [-1, 1], [-1, -1]];
        for (let [dr, dc] of directions) {
            for (let i = 1; i < 8; i++) {
                const r = row + dr * i, c = col + dc * i;
                const pieceAtPos = getPieceAt(r, c);
                if (!pieceAtPos) {
                    addMove(r, c, false);
                } else {
                    if (getPeacesColor(pieceAtPos.piece) !== color) {
                        addMove(r, c, true);
                    }
                    break;
                }
            }
        }
    };

    const handleQueenMoves = () => {
        handleRookMoves();
        handleBishopMoves();
    };

    const handleKingMoves = () => {
        const moves = [[1, 0], [1, 1], [0, 1], [-1, 1], [-1, 0], [-1, -1], [0, -1], [1, -1]];
        for (let [dr, dc] of moves) {
            const r = row + dr, c = col + dc;
            const pieceAtPos = getPieceAt(r, c);
            if (!pieceAtPos || getPeacesColor(pieceAtPos.piece) !== color) {
                addMove(r, c, !!pieceAtPos);
            }
        }
    };

    switch (piece.toLowerCase()) {
        case "p":
            handlePawnMoves();
            break;
        case "r":
            handleRookMoves();
            break;
        case "n":
            handleKnightMoves();
            break;
        case "b":
            handleBishopMoves();
            break;
        case "q":
            handleQueenMoves();
            break;
        case "k":
            handleKingMoves();
            break;
    }

    return validMoves;
}

buildBrett()