const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

let inputDevice = 'touch';

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

const TILE_SIZE = 48;

tilemaps = {
    woodenFloor: {
        walkable: true,
        defaultTexture: new Image(),
        texturesWithNeighbours: {
            'wall': {
                'top': new Image(),
                'right': new Image(),
                'bottom': new Image(),
                'left': new Image(),
                'topRight': new Image(),
                'topLeft': new Image(),
                'bottomRight': new Image(),
                'bottomLeft': new Image()
            }
        }
    },
    wall: {
        walkable: false,
        defaultTexture: new Image(),
        texturesWithNeighbours: {}
    }
}

let map = {
    width: 8,
    height: 14,
    tiles: {
        "ground": [
            [tilemaps.wall, tilemaps.wall, tilemaps.wall, tilemaps.wall, tilemaps.wall, tilemaps.wall, tilemaps.wall, tilemaps.wall],
            [tilemaps.wall, tilemaps.woodenFloor, tilemaps.woodenFloor, tilemaps.woodenFloor, tilemaps.woodenFloor, tilemaps.woodenFloor, tilemaps.woodenFloor, tilemaps.wall],
            [tilemaps.wall, tilemaps.woodenFloor, tilemaps.woodenFloor, tilemaps.wall, tilemaps.woodenFloor, tilemaps.woodenFloor, tilemaps.woodenFloor, tilemaps.wall],
            [tilemaps.wall, tilemaps.woodenFloor, tilemaps.wall, tilemaps.woodenFloor, tilemaps.woodenFloor, tilemaps.woodenFloor, tilemaps.woodenFloor, tilemaps.wall],
            [tilemaps.wall, tilemaps.woodenFloor, tilemaps.woodenFloor, tilemaps.woodenFloor, tilemaps.wall, tilemaps.woodenFloor, tilemaps.woodenFloor, tilemaps.wall],
            [tilemaps.wall, tilemaps.woodenFloor, tilemaps.woodenFloor, tilemaps.wall, tilemaps.woodenFloor, tilemaps.woodenFloor, tilemaps.woodenFloor, tilemaps.wall],
            [tilemaps.wall, tilemaps.woodenFloor, tilemaps.woodenFloor, tilemaps.woodenFloor, tilemaps.woodenFloor, tilemaps.wall, tilemaps.woodenFloor, tilemaps.wall],
            [tilemaps.wall, tilemaps.woodenFloor, tilemaps.woodenFloor, tilemaps.woodenFloor, tilemaps.woodenFloor, tilemaps.wall, tilemaps.woodenFloor, tilemaps.wall],
            [tilemaps.wall, tilemaps.woodenFloor, tilemaps.woodenFloor, tilemaps.woodenFloor, tilemaps.woodenFloor, tilemaps.woodenFloor, tilemaps.woodenFloor, tilemaps.wall],
            [tilemaps.wall, tilemaps.woodenFloor, tilemaps.woodenFloor, tilemaps.woodenFloor, tilemaps.woodenFloor, tilemaps.woodenFloor, tilemaps.woodenFloor, tilemaps.wall],
            [tilemaps.wall, tilemaps.woodenFloor, tilemaps.woodenFloor, tilemaps.woodenFloor, tilemaps.woodenFloor, tilemaps.woodenFloor, tilemaps.woodenFloor, tilemaps.wall],
            [tilemaps.wall, tilemaps.woodenFloor, tilemaps.woodenFloor, tilemaps.woodenFloor, tilemaps.woodenFloor, tilemaps.woodenFloor, tilemaps.woodenFloor, tilemaps.wall],
            [tilemaps.wall, tilemaps.woodenFloor, tilemaps.woodenFloor, tilemaps.woodenFloor, tilemaps.woodenFloor, tilemaps.woodenFloor, tilemaps.woodenFloor, tilemaps.wall],
            [tilemaps.wall, tilemaps.wall, tilemaps.wall, tilemaps.wall, tilemaps.wall, tilemaps.wall, tilemaps.wall, tilemaps.wall],
        ]
    }
};

let camera = {
    x: map.width / 2 * TILE_SIZE - canvas.width / 2,
    y: -500,
    smoothSpeed: 0.05
}

const player = {
    x: map.width / 2 * TILE_SIZE,
    y: map.height / 2 * TILE_SIZE,
    size: TILE_SIZE / 1.05,
    speed: 2, // speed in pixels per frame
    dx: 0,
    dy: 0
};

function setUpTextures() {
    for (let tile in tilemaps) {
        const textures = tilemaps[tile].texturesWithNeighbours;
        tilemaps[tile].defaultTexture.src = `tilemaps/${tile}.png`;
        tilemaps[tile].defaultTexture.imageRendering = 'pixelated';
    }
}
setUpTextures();

function easeOut(current, target, ease) {
    return current + (target - current) * ease;
}

function drawMap() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Update camera position smoothly
    camera.x = Math.floor(easeOut(camera.x, player.x - canvas.width / 2 + player.size / 2, camera.smoothSpeed));
    camera.y = Math.floor(easeOut(camera.y, player.y - canvas.height / 2 + player.size / 2, camera.smoothSpeed));

    for (let y = 0; y < map.height; y++) {
        for (let x = 0; x < map.width; x++) {
            if (x * TILE_SIZE - camera.x < -TILE_SIZE || x * TILE_SIZE - camera.x > canvas.width || y * TILE_SIZE - camera.y < -TILE_SIZE || y * TILE_SIZE - camera.y > canvas.height) {
                continue;
            }

            const texture = map.tiles.ground[y][x].defaultTexture;

            ctx.drawImage(texture, x * TILE_SIZE - camera.x, y * TILE_SIZE - camera.y, TILE_SIZE, TILE_SIZE);
        }
    }

    ctx.fillStyle = 'red';
    ctx.fillRect( Math.floor(player.x - camera.x),  Math.floor(player.y - camera.y), player.size, player.size);
}

function updatePlayerPosition() {
    let nextX = player.x + player.dx;
    let nextY = player.y + player.dy;

    let canMoveX = true;
    let canMoveY = true;

    // Berechne die Ecken für die horizontale Bewegung
    let cornersX = [
        { x: nextX + (player.dx > 0 ? player.size - 1 : 0), y: player.y }, // Oben rechts/links
        { x: nextX + (player.dx > 0 ? player.size - 1 : 0), y: player.y + player.size - 1 } // Unten rechts/links
    ];

    // Berechne die Ecken für die vertikale Bewegung
    let cornersY = [
        { x: player.x, y: nextY + (player.dy > 0 ? player.size - 1 : 0) }, // Unten links/oben
        { x: player.x + player.size - 1, y: nextY + (player.dy > 0 ? player.size - 1 : 0) } // Unten rechts/oben
    ];

    // Überprüfe jede Ecke auf Kollision für X
    for (let corner of cornersX) {
        let tileX = Math.floor(corner.x / TILE_SIZE);
        let tileY = Math.floor(corner.y / TILE_SIZE);

        if (map.tiles.ground[tileY] && map.tiles.ground[tileY][tileX] && !map.tiles.ground[tileY][tileX].walkable) {
            canMoveX = false;
            break;
        }
    }

    // Überprüfe jede Ecke auf Kollision für Y
    for (let corner of cornersY) {
        let tileX = Math.floor(corner.x / TILE_SIZE);
        let tileY = Math.floor(corner.y / TILE_SIZE);

        if (map.tiles.ground[tileY] && map.tiles.ground[tileY][tileX] && !map.tiles.ground[tileY][tileX].walkable) {
            canMoveY = false;
            break;
        }
    }

    // Bewege den Spieler nur, wenn er sich in eine Richtung bewegen kann
    if (canMoveX) {
        player.x = nextX;
    } else {
        player.dx = 0;
    }

    if (canMoveY) {
        player.y = nextY;
    } else {
        player.dy = 0;
    }
}


function updateInputDevice(device) {
    inputDevice = device;
}

let keys = {
    'KeyW': false,
    'KeyA': false,
    'KeyS': false,
    'KeyD': false
};
function updateKeyboardMovement() {
    if (inputDevice === 'keyboard') {
        player.dx = 0;

        player.dy = 0;
        if (keys['KeyW']) {
            player.dy = -player.speed;
        }

        if (keys['KeyA']) {
            player.dx = -player.speed;
        }

        if (keys['KeyS']) {
            player.dy = player.speed;
        }

        if (keys['KeyD']) {
            player.dx = player.speed;
        }
    }
}

addEventListener('keydown', (e) => {
    if (e.code in keys) {
        keys[e.code] = true;
    }
});

addEventListener('keyup', (e) => {
    if (e.code in keys) {
        keys[e.code] = false;
    }
});

function updateTouchMovement() {
    if (inputDevice === 'touch') {
        const joystick = getJoystickDirection();
        player.dx = joystick.x * player.speed;
        player.dy = joystick.y * player.speed;
    }
}

function updateGamepadMovement() {
    if (inputDevice === 'gamepad') {
        const gamepad = navigator.getGamepads()[0];
        if (gamepad) {
            player.dx = gamepad.axes[0] * player.speed;
            player.dy = gamepad.axes[1] * player.speed;
        }
    }
}

function gameLoop() {
    updateKeyboardMovement();
    updateTouchMovement();
    updateGamepadMovement();
    updatePlayerPosition();
    drawMap();
    requestAnimationFrame(gameLoop);
}

requestAnimationFrame(gameLoop);