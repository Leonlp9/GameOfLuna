let size = 3;
let shuffles = 100;
let board = [];
let moves = 0;
let started = false;
let img = new Image();

function getRandomImage() {
    const images = getImagesOfTypes(["object", "skin"])
    return images[Math.floor(Math.random() * images.length)]
}

function getRandomFieldIdNearEmpty() {
    const empty = findEmpty();
    const emptyRow = empty[0];
    const emptyCol = empty[1];

    let row = 0;
    let col = 0;
    while (true) {
        row = Math.floor(Math.random() * size);
        col = Math.floor(Math.random() * size);
        if (row === emptyRow && Math.abs(col - emptyCol) === 1 || col === emptyCol && Math.abs(row - emptyRow) === 1) {
            break;
        }
    }

    return board[row][col];
}

function createBoard() {
    started = false;
    moves = 0;
    board = [];
    for (let i = 0; i < size; i++) {
        board.push([]);
        for (let j = 0; j < size; j++) {
            board[i].push(i * size + j + 1);
        }
    }
    board[size - 1][size - 1] = '';

    img.src = "../" + getRandomImage();
    img.onload = function () {

        //spielfeld mit divs erstellen
        const spielfeld = document.getElementById("spielfeld");
        spielfeld.classList.remove("solved");
        spielfeld.innerHTML = '';

        resizeSpielfeld(img)

        //resize event
        window.addEventListener("resize", function () {
            resizeSpielfeld(img)
        });

        let id = 1;
        for (let i = 0; i < size; i++) {
            for (let j = 0; j < size; j++) {
                if (board[i][j] !== '') {
                    const feld = document.createElement("div");
                    feld.classList.add("feld");
                    feld.id = id + "";

                    feld.innerHTML = "<div class='feldnummer'>" + id + "</div>";

                    feld.style.width = 100 / size + "%";
                    feld.style.height = 100 / size + "%";
                    feld.style.backgroundImage = `url(${img.src})`;
                    //1 2 3
                    //4 5 6
                    //7 8

                    //pos und size
                    feld.style.backgroundSize = `${size * 100}%`;
                    feld.style.backgroundPosition = `${j * (100 / (size - 1))}% ${i * (100 / (size - 1))}%`;


                    feld.onclick = function () {
                        move(parseInt(feld.id));
                    };
                    spielfeld.appendChild(feld);

                    id++;
                }
            }
        }

        //counter erstellen
        const counter = document.createElement("div");
        counter.classList.add("counter");
        counter.innerHTML = "Züge: " + moves;
        spielfeld.appendChild(counter);

        //stopmatch button
        const stopMatch = document.createElement("button");
        stopMatch.innerHTML = "Stop";
        stopMatch.classList.add("stopMatch");
        stopMatch.onclick = function(){
            openStartMenu()
            started = false;
        }
        spielfeld.appendChild(stopMatch);

        shuffle()
        updatePositions()
        started = true;
    }
}

function openStartMenu() {
    const startMenu = document.createElement("div");
    startMenu.classList.add("startMenu");
    //2 schiebregler mit einmal größe und einmal shuffles
    startMenu.innerHTML = `
        <div class="startMenuContent">
            <button class="back-home" onclick="location.href='../index.html'">
                <i class="fas fa-home"></i>
            </button>
            <h1>Lunas<br>Schiebepuzzle</h1>
            <label for="size">Größe</label>
            <input type="range" id="size" min="3" max="8" value="${size}">
            <label for="shuffles">Shuffles</label>
            <input type="range" id="shuffles" min="1" max="1000" value="${shuffles}">
            <button onclick="
                size = parseInt(document.getElementById('size').value);
                shuffles = parseInt(document.getElementById('shuffles').value);
                document.body.removeChild(this.parentElement.parentElement);
                createBoard()
                ">Start</button>
          
        </div>
    `;
    document.body.appendChild(startMenu);
}

function resizeSpielfeld(img){
    const spielfeld = document.getElementById("spielfeld");
    let toSize = 500;

    if (window.innerWidth < window.innerHeight && window.innerWidth < 520) {
        toSize = window.innerWidth - 20;
    }else if (window.innerHeight < 520) {
        toSize = window.innerHeight - 20;
    }

    if (img.width > img.height) {
        spielfeld.style.width = toSize + "px"
        //berechne die breite des bildes, wenn es 500px hoch ist und setze das als breite des spielfeldes
        spielfeld.style.height = img.height / img.width * toSize + "px";
    }else {
        spielfeld.style.height = toSize + "px"
        //berechne die höhe des bildes, wenn es 500px breit ist und setze das als höhe des spielfeldes
        spielfeld.style.width = img.width / img.height * toSize + "px";
    }
}

function shuffle() {
    //bord
    for (let i = 0; i < shuffles; i++) {
        move(getRandomFieldIdNearEmpty(), true);
    }
}

function findEmpty() {
    for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
            if (board[i][j] === '') {
                return [i, j];
            }
        }
    }
}

function move(number, ignoreStarted = false) {
    if (!started && !ignoreStarted) return;

    const empty = findEmpty();
    const emptyRow = empty[0];
    const emptyCol = empty[1];

    let row = 0;
    let col = 0;
    for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
            if (board[i][j] === number) {
                row = i;
                col = j;
            }
        }
    }

    if (row === emptyRow && Math.abs(col - emptyCol) === 1 || col === emptyCol && Math.abs(row - emptyRow) === 1) {
        board[emptyRow][emptyCol] = number;
        board[row][col] = '';
        if (!ignoreStarted){
            moves++;
            document.getElementsByClassName("counter")[0].innerHTML = "Züge: " + moves;
        }
    }

    if (isSolvedState(board)) {
        started = false;
        setTimeout(function () {
            const spielfeld = document.getElementById("spielfeld");
            spielfeld.classList.add("solved");

            //das letzte feld unten rechts wo nichts ist wird platziert
            const feld = document.createElement("div");
            feld.classList.add("feld");
            feld.style.width = 100 / size + "%";
            feld.style.height = 100 / size + "%";
            feld.style.backgroundImage = `url(${img.src})`;
            feld.style.backgroundSize = `${size * 100}%`;
            feld.style.backgroundPosition = `${(size - 1) * (100 / (size - 1))}% ${(size - 1) * (100 / (size - 1))}%`;
            feld.style.bottom = 0;
            feld.style.right = 0;
            spielfeld.appendChild(feld);

            setTimeout(function () {
                openStartMenu()
            }, 1200);
        }, 200);
    }

    updatePositions()
}

function updatePositions() {
    const figuren = document.getElementsByClassName("feld");
    for (let figur of figuren) {
        //schau wo sich die figur auf dem board befindet
        const id = parseInt(figur.id);
        let row = 0;
        let col = 0;
        for (let i = 0; i < size; i++) {
            for (let j = 0; j < size; j++) {
                if (board[i][j] === id) {
                    row = i;
                    col = j;
                }
            }
        }
        //setze die position des divs
        figur.style.top = row * 100 / size + "%";
        figur.style.left = col * 100 / size + "%";
    }
}


function isSolvedState(board) {
    if (!started) return false;
    let id = 1;
    for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
            if (board[i][j] !== id && board[i][j] !== '') {
                return false;
            }
            id++;
        }
    }
    return true;
}

openStartMenu()

console.log(board);
