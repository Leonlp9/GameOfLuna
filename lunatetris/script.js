let tetrisCellColorTexturesPaths = {
    'I': 'img/blue_block.png',
    'J': 'img/orange_block.png',
    'L': 'img/tuerkis_block.png',
    'O': 'img/yellow_block.png',
    'S': 'img/green_block.png',
    'T': 'img/magenta_block.png',
    'Z': 'img/red_block.png'
};

let tetrisGrid = document.getElementById('tetris-grid');

function initializeGrid() {
    for (let i = 0; i < 200; i++) { // 10 x 20 grid
        let cell = document.createElement('div');
        tetrisGrid.appendChild(cell);
    }
}

initializeGrid();


class Tetromino {
    constructor(shape, color) {
        this.shape = shape;
        this.color = color;
        this.position = { x: 4, y: 0 }; // Startposition
    }

    draw() {
        this.shape.forEach((row, y) => {
            row.forEach((cell, x) => {
                if (cell) {
                    const index = (this.position.y + y) * 10 + (this.position.x + x);
                    tetrisGrid.children[index].style.backgroundImage = `url(${tetrisCellColorTexturesPaths[this.color]})`;
                }
            });
        });
    }

    clear() {
        this.shape.forEach((row, y) => {
            row.forEach((cell, x) => {
                if (cell) {
                    const index = (this.position.y + y) * 10 + (this.position.x + x);
                    tetrisGrid.children[index].style.backgroundImage = '';
                }
            });
        });
    }
}

const tetrominos = {
    'I': [[1, 1, 1, 1]],
    'J': [[1, 0, 0], [1, 1, 1]],
    'L': [[0, 0, 1], [1, 1, 1]],
    'O': [[1, 1], [1, 1]],
    'S': [[0, 1, 1], [1, 1, 0]],
    'T': [[0, 1, 0], [1, 1, 1]],
    'Z': [[1, 1, 0], [0, 1, 1]]
};

function createRandomTetromino() {
    const keys = Object.keys(tetrominos);
    const key = keys[Math.floor(Math.random() * keys.length)];
    return new Tetromino(tetrominos[key], key);
}

let currentTetromino = createRandomTetromino();
currentTetromino.draw();


document.addEventListener('keydown', control);

function control(event) {
    if (event.key === 'ArrowLeft' || event.key === 'a') {
        moveLeft();
    } else if (event.key === 'ArrowRight' || event.key === 'd') {
        moveRight();
    } else if (event.key === 'ArrowDown' || event.key === 's') {
        moveDown();
    } else if (event.key === 'ArrowUp' || event.key === 'w') {
        rotate();
    }
}

function moveLeft() {
    currentTetromino.clear();
    if (!collision(-1, 0)) {
        currentTetromino.position.x -= 1;
    }
    currentTetromino.draw();
}

function moveRight() {
    currentTetromino.clear();
    if (!collision(1, 0)) {
        currentTetromino.position.x += 1;
    }
    currentTetromino.draw();
}

function moveDown() {
    currentTetromino.clear();
    if (!collision(0, 1)) {
        currentTetromino.position.y += 1;
    } else {
        currentTetromino.draw();
        removeFullRows();
        currentTetromino = createRandomTetromino();
    }
    currentTetromino.draw();
}

function rotate() {
    currentTetromino.clear();
    const shapeCopy = currentTetromino.shape.map(row => [...row]);
    const rotatedShape = shapeCopy[0].map((_, index) =>
        shapeCopy.map(row => row[index]).reverse()
    );
    const originalPosition = { ...currentTetromino.position };
    currentTetromino.shape = rotatedShape;

    if (collision(0, 0)) {
        currentTetromino.shape = shapeCopy;
        currentTetromino.position = originalPosition;
    }
    currentTetromino.draw();
}

function collision(x, y) {
    return currentTetromino.shape.some((row, dy) => {
        return row.some((cell, dx) => {
            if (cell) {
                const newX = currentTetromino.position.x + dx + x;
                const newY = currentTetromino.position.y + dy + y;
                return (
                    newX < 0 ||
                    newX >= 10 ||
                    newY >= 20 ||
                    tetrisGrid.children[newY * 10 + newX].style.backgroundImage !== ''
                );
            }
            return false;
        });
    });
}

function removeFullRows() {
    for (let y = 19; y >= 0; y--) {
        let isRowFull = true;
        for (let x = 0; x < 10; x++) {
            if (!tetrisGrid.children[y * 10 + x].style.backgroundImage) {
                isRowFull = false;
                break;
            }
        }
        if (isRowFull) {
            for (let row = y; row > 0; row--) {
                for (let col = 0; col < 10; col++) {
                    tetrisGrid.children[row * 10 + col].style.backgroundImage =
                        tetrisGrid.children[(row - 1) * 10 + col].style.backgroundImage;
                }
            }
            for (let col = 0; col < 10; col++) {
                tetrisGrid.children[col].style.backgroundImage = '';
            }
            y++;
            updateScore(10);
        }
    }
}

let score = 0;

function updateScore(points) {
    score += points;
    document.getElementById('tetris-score').innerText = `Punkte: ${score}`;
}

let touchStartX = 0;
let touchStartY = 0;
let touchEndX = 0;
let touchEndY = 0;

document.addEventListener('touchstart', function(e) {
    touchStartX = e.changedTouches[0].screenX;
    touchStartY = e.changedTouches[0].screenY;
}, false);

document.addEventListener('touchend', function(e) {
    touchEndX = e.changedTouches[0].screenX;
    touchEndY = e.changedTouches[0].screenY;
    handleSwipe();
}, false);

function handleSwipe() {
    const deltaX = touchEndX - touchStartX;
    const deltaY = touchEndY - touchStartY;

    if (Math.abs(deltaX) > Math.abs(deltaY)) {
        // Horizontal Swipe
        if (deltaX > 0) {
            moveRight();
        } else {
            moveLeft();
        }
    } else {
        // Vertical Swipe
        if (deltaY > 0) {
            moveDown();
        } else {
            rotate();
        }
    }
}

let gameInterval = setInterval(moveDown, 1000);
