let board = [];
let history = [];

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

const pieceValues = {
    'p': 1,
    'n': 3,
    'b': 3,
    'r': 5,
    'q': 9,
    'k': 1000,
    'P': 1,
    'N': 3,
    'B': 3,
    'R': 5,
    'Q': 9,
    'K': 1000
};

let turn = "white";
let botDifficulty = null;

function playSoundEffekt(sound) {
    let audio = new Audio(sound);
    audio.play().then();
}

function getPieceAt(row, col) {
    return board.find(field => field.row === row && field.col === col && field.isOut === null);
}

function getIsOutAmount(color) {
    return board.filter(field => field.isOut !== null && getPeacesColor(field.piece) === color).length;
}

function getPeacesColor(piece) {
    return piece === piece.toUpperCase() ? "white" : "black";
}

function unselectAll() {
    for (let i = 0; i < board.length; i++) {
        board[i].selected = false;
        let element = document.getElementById(i + "-schachfigur");
        if (element) {
            element.classList.remove("selected");
        }
    }
}

function selectPiece(piece) {
    unselectAll()
    let element = document.getElementById(board.indexOf(piece) + "-schachfigur");
    element.classList.add("selected");
    piece.selected = true;
}

function getSelectedPiece() {
    return board.find(field => field.selected);
}

function getPieceValue(pieceObject) {
    return pieceValues[pieceObject.piece.toLowerCase()];
}

function hasMoved(row, col) {
    const piece = getPieceAt(row, col);
    return piece ? piece.moved : false;
}

function getValidMoves(pieceObject) {
    const { piece, row, col } = pieceObject;
    const color = getPeacesColor(piece);
    const validMoves = [];

    if (pieceObject.isOut !== null) {
        return validMoves;
    }

    const addMove = (r, c, isCapture) => {
        if (r >= 0 && r < 8 && c >= 0 && c < 8) {
            validMoves.push({ row: r, col: c, isCapture });
        }
    };

    const handleLinearMoves = (directions) => {
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

    const handleKingMoves = () => {
        const moves = [[1, 0], [1, 1], [0, 1], [-1, 1], [-1, 0], [-1, -1], [0, -1], [1, -1]];
        for (let [dr, dc] of moves) {
            const r = row + dr, c = col + dc;
            const pieceAtPos = getPieceAt(r, c);
            if (!pieceAtPos || getPeacesColor(pieceAtPos.piece) !== color) {
                addMove(r, c, !!pieceAtPos);
            }
        }
        if (!hasMoved(row, col)) {
            if (!getPieceAt(row, col + 1) && !getPieceAt(row, col + 2) && !hasMoved(row, col + 3)) {
                addMove(row, col + 2, false);
            }
            if (!getPieceAt(row, col - 1) && !getPieceAt(row, col - 2) && !getPieceAt(row, col - 3) && !hasMoved(row, col - 4)) {
                addMove(row, col - 2, false);
            }
        }
    };

    switch (piece.toLowerCase()) {
        case "p":
            handlePawnMoves();
            break;
        case "r":
            handleLinearMoves([[1, 0], [-1, 0], [0, 1], [0, -1]]);
            break;
        case "n":
            handleKnightMoves();
            break;
        case "b":
            handleLinearMoves([[1, 1], [1, -1], [-1, 1], [-1, -1]]);
            break;
        case "q":
            handleLinearMoves([[1, 0], [-1, 0], [0, 1], [0, -1], [1, 1], [1, -1], [-1, 1], [-1, -1]]);
            break;
        case "k":
            handleKingMoves();
            break;
    }

    return validMoves;
}

function hideValidMoves() {
    const fields = document.querySelectorAll(".schachfeld");
    for (let i = 0; i < fields.length; i++) {
        fields[i].classList.remove("valid");
        fields[i].classList.remove("hit");
    }
}

function showValidMoves(pieceObject) {
    hideValidMoves()

    const validMoves = getValidMoves(pieceObject);

    playSoundEffekt('sounds/select.mp3')

    for (let i = 0; i < validMoves.length; i++) {
        const move = validMoves[i];
        const field = document.querySelector(".schachfeld[data-row='" + move.row + "'][data-col='" + move.col + "']");
        field.classList.add("valid");
        if (move.isCapture) {
            field.classList.add("hit");
        }
    }
}

function buildBrett() {
    hideValidMoves()
    unselectAll()

    turn = "white";
    history = [];
    board = [
        { piece: "r", row: 0, col: 0, moved: false, isOut: null, selected: false },
        { piece: "n", row: 0, col: 1, moved: false, isOut: null, selected: false },
        { piece: "b", row: 0, col: 2, moved: false, isOut: null, selected: false },
        { piece: "q", row: 0, col: 3, moved: false, isOut: null, selected: false },
        { piece: "k", row: 0, col: 4, moved: false, isOut: null, selected: false },
        { piece: "b", row: 0, col: 5, moved: false, isOut: null, selected: false },
        { piece: "n", row: 0, col: 6, moved: false, isOut: null, selected: false },
        { piece: "r", row: 0, col: 7, moved: false, isOut: null, selected: false },
        { piece: "p", row: 1, col: 0, moved: false, isOut: null, selected: false },
        { piece: "p", row: 1, col: 1, moved: false, isOut: null, selected: false },
        { piece: "p", row: 1, col: 2, moved: false, isOut: null, selected: false },
        { piece: "p", row: 1, col: 3, moved: false, isOut: null, selected: false },
        { piece: "p", row: 1, col: 4, moved: false, isOut: null, selected: false },
        { piece: "p", row: 1, col: 5, moved: false, isOut: null, selected: false },
        { piece: "p", row: 1, col: 6, moved: false, isOut: null, selected: false },
        { piece: "p", row: 1, col: 7, moved: false, isOut: null, selected: false },
        { piece: "R", row: 7, col: 0, moved: false, isOut: null, selected: false },
        { piece: "N", row: 7, col: 1, moved: false, isOut: null, selected: false },
        { piece: "B", row: 7, col: 2, moved: false, isOut: null, selected: false },
        { piece: "Q", row: 7, col: 3, moved: false, isOut: null, selected: false },
        { piece: "K", row: 7, col: 4, moved: false, isOut: null, selected: false },
        { piece: "B", row: 7, col: 5, moved: false, isOut: null, selected: false },
        { piece: "N", row: 7, col: 6, moved: false, isOut: null, selected: false },
        { piece: "R", row: 7, col: 7, moved: false, isOut: null, selected: false },
        { piece: "P", row: 6, col: 0, moved: false, isOut: null, selected: false },
        { piece: "P", row: 6, col: 1, moved: false, isOut: null, selected: false },
        { piece: "P", row: 6, col: 2, moved: false, isOut: null, selected: false },
        { piece: "P", row: 6, col: 3, moved: false, isOut: null, selected: false },
        { piece: "P", row: 6, col: 4, moved: false, isOut: null, selected: false },
        { piece: "P", row: 6, col: 5, moved: false, isOut: null, selected: false },
        { piece: "P", row: 6, col: 6, moved: false, isOut: null, selected: false },
        { piece: "P", row: 6, col: 7, moved: false, isOut: null, selected: false }
    ];

    let brett = document.getElementById("schachbrett");

    if (!brett) {
        brett = document.createElement("div");
        brett.id = "schachbrett";
        document.getElementById("schach").appendChild(brett);

        for (let i = 0; i < 8; i++) {
            for (let j = 0; j < 8; j++) {
                const field = document.createElement("div");
                field.classList.add("schachfeld");
                field.setAttribute("data-row", i + "");
                field.setAttribute("data-col", j + "");
                if ((i + j) % 2 === 0) {
                    field.classList.add("black");
                }
                field.addEventListener("click", function () {
                    if (turn === "black" && botDifficulty !== null) {
                        return;
                    }
                    if (field.classList.contains("valid")) {
                        const piece = getSelectedPiece();
                        const row = parseInt(field.getAttribute("data-row"));
                        const col = parseInt(field.getAttribute("data-col"));
                        movePiece(piece, row, col, field.classList.contains("hit"));
                        unselectAll()
                        hideValidMoves()

                        setTimeout(() => {
                            botMove();
                        }, 500);

                    } else {
                        const piece = getPieceAt(i, j);
                        if (piece && getPeacesColor(piece.piece) === turn) {
                            showValidMoves(getPieceAt(i, j));
                            selectPiece(getPieceAt(i, j));
                        } else {
                            unselectAll()
                            hideValidMoves()
                        }
                    }
                });
                brett.appendChild(field);

                if (j === 0) {
                    const label = document.createElement("div");
                    label.classList.add("label");
                    label.textContent = (8 - i) + "";
                    label.classList.add("number");
                    field.appendChild(label);
                }
                if (i === 7) {
                    const label = document.createElement("div");
                    label.classList.add("label");
                    label.textContent = String.fromCharCode(65 + j);
                    label.classList.add("letter");
                    field.appendChild(label);
                }
            }
        }
    }else {
        //entferne allen Schachfiguren den transition delay
        for (let i = 0; i < board.length; i++) {
            const element = document.getElementById(i + "-schachfigur");
            if (element) {
                element.style.transitionDelay = "0s";
                element.classList.remove("isOut");
            }
        }
    }
    updateHistory();

    updatePositions()
}

function updatePositions() {
    for (let i = 0; i < board.length; i++) {
        const piece = board[i].piece
        const row = board[i].row
        const col = board[i].col
        const isOut = board[i].isOut
        const color = getPeacesColor(piece)
        const id = i + "-schachfigur"

        if (!document.getElementById(id)) {
            const img = document.createElement("div");
            img.classList.add("schachfigur");
            img.id = id;
            img.style.backgroundImage = "url(" + textures[piece] + ")";
            img.style.top = (row * 12.5) + "%";
            img.style.left = (col * 12.5) + "%";
            document.getElementById("schachbrett").appendChild(img);
        } else {
            const img = document.getElementById(id);

            img.style.top = (row * 12.5) + "%";
            img.style.left = (col * 12.5) + "%";
            img.style.zIndex = "33";
            if (isOut !== null) {
                img.style.transitionDelay = "0.4s";
                img.classList.add("isOut");
                img.style.top = ((isOut - 1) * 12.5 / 2) + "%";
                img.style.left = (color === "white" ? 100 : -12.5) + "%";
                img.style.zIndex = isOut;
            }
        }
    }
}

function addMoveToHistory(pieceObject, row, col, isCapture) {
    // history hat einmal old und new col und row
    let oldRow = pieceObject.row;
    let oldCol = pieceObject.col;
    let newRow = row;
    let newCol = col;

    history.push({ piece: pieceObject, oldRow, oldCol, newRow, newCol, isCapture });

    updateHistory();
}

function updateHistory() {
    let historyElement = document.getElementById("history");
    if (!historyElement) {
        historyElement = document.createElement("div");
        historyElement.id = "history";
        document.getElementById("schachbrett").appendChild(historyElement);
    } else {
        historyElement.innerHTML = "";
    }

    //logge in der console einmal die alte und neue position
    for (let i = 0; i < history.length; i++) {
        const move = history[i];
        const moveElement = document.createElement("div");
        moveElement.classList.add("move");

        if (move.isCapture) {
            moveElement.classList.add("capture");
        }

        const oldPos = document.createElement("div");
        oldPos.classList.add("old");
        oldPos.textContent = String.fromCharCode(65 + move.oldCol) + (8 - move.oldRow);
        moveElement.appendChild(oldPos);

        const newPos = document.createElement("div");
        newPos.classList.add("new");
        newPos.textContent = String.fromCharCode(65 + move.newCol) + (8 - move.newRow);
        moveElement.appendChild(newPos);

        historyElement.appendChild(moveElement);
    }

    //scrollt automatisch nach rechts
    historyElement.scrollLeft = historyElement.scrollWidth;
}

function undoMove() {
    if (history.length === 0) {
        return;
    }

    const lastMove = history[history.length - 1];
    const piece = lastMove.piece;
    const oldRow = lastMove.oldRow;
    const oldCol = lastMove.oldCol;
    const newRow = lastMove.newRow;
    const newCol = lastMove.newCol;
    const isCapture = lastMove.isCapture;

    const pieceAtNewPos = getPieceAt(newRow, newCol);
    if (isCapture) {
        const index = board.findIndex(field => field.row === newRow && field.col === newCol && field.isOut !== null);
        board[index].isOut = null;
    }

    piece.row = oldRow;
    piece.col = oldCol;
    piece.moved = false;

    if (isCapture) {
        board.push({ piece: pieceAtNewPos.piece, row: newRow, col: newCol, moved: false, isOut: null, selected: false });
    }

    if (turn === "white") {
        turn = "black";
    } else {
        turn = "white";
    }

    history.pop();
    updatePositions();
    updateHistory();
}

function movePiece(pieceObject, row, col, isCapture) {
    const piece = pieceObject.piece;

    addMoveToHistory(pieceObject, row, col, isCapture);

    if (isCapture) {
        const index = board.findIndex(field => field.row === row && field.col === col && field.isOut === null);
        board[index].isOut = getIsOutAmount(getPeacesColor(board[index].piece));
        const element = document.getElementById(index + "-schachfigur");
        element.style.transitionDelay = "0.4s";
        playSoundEffekt('sounds/hit.mp3');
    }

    pieceObject.row = row;
    pieceObject.col = col;
    pieceObject.moved = true;

    playSoundEffekt('sounds/move.mp3');

    if (piece.toLowerCase() === "p" && (row === 0 || row === 7)) {
        pieceObject.piece = piece === "p" ? "q" : "Q";
    }

    if (turn === "white") {
        turn = "black";
    } else {
        turn = "white";
    }

    updatePositions();
}

function botMove() {
    if (botDifficulty === null) {
        return;
    }
    if (turn === "black") {
        if (botDifficulty === "easy") {
            //kompletter random bot
            const validMoves = [];
            for (let i = 0; i < board.length; i++) {
                const piece = board[i];
                if (getPeacesColor(piece.piece) === "black") {
                    const moves = getValidMoves(piece);
                    for (let move of moves) {
                        validMoves.push({ piece, move });
                    }
                }
            }
            const randomFigure = validMoves[Math.floor(Math.random() * validMoves.length)];
            showValidMoves(randomFigure.piece);
            selectPiece(randomFigure.piece);

            setTimeout(() => {
                movePiece(randomFigure.piece, randomFigure.move.row, randomFigure.move.col, randomFigure.move.isCapture);
                unselectAll()
                hideValidMoves()
            }, 500);
        }else if (botDifficulty === "medium") {
            const validMoves = [];
            for (let i = 0; i < board.length; i++) {
                const piece = board[i];
                if (getPeacesColor(piece.piece) === "black") {
                    const moves = getValidMoves(piece);
                    for (let move of moves) {
                        validMoves.push({ piece, move, value: move.isCapture ? getPieceValue({piece: getPieceAt(move.row, move.col).piece}) : 0 });
                    }
                }
            }

            const captureMoves = validMoves.filter(move => move.move.isCapture);
            let selectedMove;
            if (captureMoves.length > 0) {
                // Sortiere die Schlagzüge nach dem Wert der geschlagenen Figur absteigend
                captureMoves.sort((a, b) => b.value - a.value);
                const highestValue = captureMoves[0].value;
                // Filtere die Züge, die die wertvollste Figur schlagen
                const highestValueMoves = captureMoves.filter(move => move.value === highestValue);
                // Wähle zufällig einen der besten Schlagzüge
                selectedMove = highestValueMoves[Math.floor(Math.random() * highestValueMoves.length)];
            } else {
                // Wenn es keine Schlagzüge gibt, wähle einen komplett zufälligen Zug
                selectedMove = validMoves[Math.floor(Math.random() * validMoves.length)];
            }

            showValidMoves(selectedMove.piece);
            selectPiece(selectedMove.piece);

            setTimeout(() => {
                movePiece(selectedMove.piece, selectedMove.move.row, selectedMove.move.col, selectedMove.move.isCapture);
                unselectAll();
                hideValidMoves();
            }, 500);
        }else if (botDifficulty === "hard") {

        }
    }
}

function openStartMenu() {
    const startMenu = document.getElementById("startMenu");
    if (startMenu) {
        startMenu.remove();
    } else {
        const menu = document.createElement("div");
        menu.id = "startMenuHintergrund";
        menu.style.zIndex = "1000";

        const startMenu = document.createElement("div");
        startMenu.id = "startMenu";
        menu.appendChild(startMenu);

        const backButton = document.createElement("div");
        backButton.classList.add("back");
        backButton.innerHTML = "<i class='fas fa-home'></i>";
        backButton.addEventListener("click", function () {
            window.location.href = "../index.html";
        });
        startMenu.appendChild(backButton);


        const title = document.createElement("h1");
        title.textContent = "Lunaschach";
        startMenu.appendChild(title);

        const mitspieler = document.createElement("div");
        mitspieler.classList.add("option");
        mitspieler.textContent = "Mitspieler";
        mitspieler.addEventListener("click", function () {
            botDifficulty = null;
            menu.remove();
            buildBrett();
        });

        const bot = document.createElement("div");
        bot.classList.add("option");
        bot.textContent = "Bot";
        bot.addEventListener("click", function () {
            mitspieler.remove();
            bot.remove();

            const botMenu = document.createElement("div");
            botMenu.id = "botMenu";
            startMenu.appendChild(botMenu);

            const easy = document.createElement("div");
            easy.classList.add("option");
            easy.textContent = "Leicht";
            easy.addEventListener("click", function () {
                menu.remove();
                botDifficulty = "easy";
                buildBrett();
            });
            botMenu.appendChild(easy);

            const medium = document.createElement("div");
            medium.classList.add("option");
            medium.textContent = "Mittel";
            medium.addEventListener("click", function () {
                menu.remove();
                botDifficulty = "medium";
                buildBrett();
            });
            botMenu.appendChild(medium);

            const hard = document.createElement("div");
            hard.classList.add("option");
            hard.textContent = "Schwer";
            hard.addEventListener("click", function () {

            });
            botMenu.appendChild(hard);
        });

        startMenu.appendChild(mitspieler);
        startMenu.appendChild(bot);

        document.body.appendChild(menu);

    }
}

const endGameButton = document.createElement("endGame");
endGameButton.id = "endGame";
endGameButton.innerHTML = "<i class='fas fa-times'></i>";
endGameButton.addEventListener("click", function () {
    openStartMenu();
});
document.body.appendChild(endGameButton);

openStartMenu();
buildBrett();