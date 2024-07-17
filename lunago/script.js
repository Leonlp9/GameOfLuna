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
    tiles: {
        "ground": [
            {
                tile: tilemaps.wall,
                position: { x: 0, y: 0 }
            },
            {
                tile: tilemaps.wall,
                position: { x: 1, y: 0 }
            },
            {
                tile: tilemaps.wall,
                position: { x: 2, y: 0 }
            },
            {
                tile: tilemaps.wall,
                position: { x: 3, y: 0 }
            },
            {
                tile: tilemaps.wall,
                position: { x: 4, y: 0 }
            },
            {
                tile: tilemaps.wall,
                position: { x: 5, y: 0 }
            },
            {
                tile: tilemaps.wall,
                position: { x: 6, y: 0 }
            },
            {
                tile: tilemaps.wall,
                position: { x: 7, y: 0 }
            },
            {
                tile: tilemaps.wall,
                position: { x: 0, y: 1 }
            },
            {
                tile: tilemaps.woodenFloor,
                position: { x: 1, y: 1 }
            },
            {
                tile: tilemaps.woodenFloor,
                position: { x: 2, y: 1 }
            },
            {
                tile: tilemaps.woodenFloor,
                position: { x: 3, y: 1 }
            },
            {
                tile: tilemaps.woodenFloor,
                position: { x: 4, y: 1 }
            },
            {
                tile: tilemaps.woodenFloor,
                position: { x: 5, y: 1 }
            },
            {
                tile: tilemaps.woodenFloor,
                position: { x: 6, y: 1 }
            },
            {
                tile: tilemaps.wall,
                position: { x: 7, y: 1 }
            },
            {
                tile: tilemaps.wall,
                position: { x: 0, y: 2 }
            },
            {
                tile: tilemaps.woodenFloor,
                position: { x: 1, y: 2 }
            },
            {
                tile: tilemaps.woodenFloor,
                position: { x: 2, y: 2 }
            },
            {
                tile: tilemaps.woodenFloor,
                position: { x: 3, y: 2 }
            },
            {
                tile: tilemaps.woodenFloor,
                position: { x: 4, y: 2 }
            },
            {
                tile: tilemaps.woodenFloor,
                position: { x: 5, y: 2 }
            },
            {
                tile: tilemaps.woodenFloor,
                position: { x: 6, y: 2 }
            },
            {
                tile: tilemaps.wall,
                position: { x: 7, y: 2 }
            },
            {
                tile: tilemaps.wall,
                position: { x: 0, y: 3 }
            },
            {
                tile: tilemaps.woodenFloor,
                position: { x: 1, y: 3 }
            },
            {
                tile: tilemaps.woodenFloor,
                position: { x: 2, y: 3 }
            },
            {
                tile: tilemaps.woodenFloor,
                position: { x: 3, y: 3 }
            },
            {
                tile: tilemaps.woodenFloor,
                position: { x: 4, y: 3 }
            },
            {
                tile: tilemaps.woodenFloor,
                position: { x: 5, y: 3 }
            },
            {
                tile: tilemaps.woodenFloor,
                position: { x: 6, y: 3 }
            },
            {
                tile: tilemaps.wall,
                position: { x: 7, y: 3 }
            },
            {
                tile: tilemaps.wall,
                position: { x: 0, y: 4 }
            },
            {
                tile: tilemaps.woodenFloor,
                position: { x: 1, y: 4 }
            },
            {
                tile: tilemaps.woodenFloor,
                position: { x: 2, y: 4 }
            },
            {
                tile: tilemaps.woodenFloor,
                position: { x: 3, y: 4 }
            },
            {
                tile: tilemaps.woodenFloor,
                position: { x: 4, y: 4 }
            },
            {
                tile: tilemaps.woodenFloor,
                position: { x: 5, y: 4 }
            },
            {
                tile: tilemaps.woodenFloor,
                position: { x: 6, y: 4 }
            },
            {
                tile: tilemaps.wall,
                position: { x: 7, y: 4 }
            },
            {
                tile: tilemaps.wall,
                position: { x: 0, y: 5 }
            },
            {
                tile: tilemaps.woodenFloor,
                position: { x: 1, y: 5 }
            },
            {
                tile: tilemaps.woodenFloor,
                position: { x: 2, y: 5 }
            },
            {
                tile: tilemaps.woodenFloor,
                position: { x: 3, y: 5 }
            },
            {
                tile: tilemaps.woodenFloor,
                position: { x: 4, y: 5 }
            },
            {
                tile: tilemaps.woodenFloor,
                position: { x: 5, y: 5 }
            },
            {
                tile: tilemaps.woodenFloor,
                position: { x: 6, y: 5 }
            },
            {
                tile: tilemaps.wall,
                position: { x: 7, y: 5 }
            },
            {
                tile: tilemaps.wall,
                position: { x: 0, y: 6 }
            },
            {
                tile: tilemaps.woodenFloor,
                position: { x: 1, y: 6 }
            },
            {
                tile: tilemaps.woodenFloor,
                position: { x: 2, y: 6 }
            },
            {
                tile: tilemaps.woodenFloor,
                position: { x: 3, y: 6 }
            },
            {
                tile: tilemaps.woodenFloor,
                position: { x: 4, y: 6 }
            },
            {
                tile: tilemaps.woodenFloor,
                position: { x: 5, y: 6 }
            },
            {
                tile: tilemaps.woodenFloor,
                position: { x: 6, y: 6 }
            },
            {
                tile: tilemaps.wall,
                position: { x: 7, y: 6 }
            },
            {
                tile: tilemaps.wall,
                position: { x: 0, y: 7 }
            },
            {
                tile: tilemaps.woodenFloor,
                position: { x: 1, y: 7 }
            },
            {
                tile: tilemaps.woodenFloor,
                position: { x: 2, y: 7 }
            },
            {
                tile: tilemaps.woodenFloor,
                position: { x: 3, y: 7 }
            },
            {
                tile: tilemaps.wall,
                position: { x: 4, y: 7 }
            },
            {
                tile: tilemaps.woodenFloor,
                position: { x: 5, y: 7 }
            },
            {
                tile: tilemaps.woodenFloor,
                position: { x: 6, y: 7 }
            },
            {
                tile: tilemaps.wall,
                position: { x: 7, y: 7 }
            },
            {
                tile: tilemaps.wall,
                position: { x: 0, y: 8 }
            },
            {
                tile: tilemaps.woodenFloor,
                position: { x: 1, y: 8 }
            },
            {
                tile: tilemaps.woodenFloor,
                position: { x: 2, y: 8 }
            },
            {
                tile: tilemaps.woodenFloor,
                position: { x: 3, y: 8 }
            },
            {
                tile: tilemaps.woodenFloor,
                position: { x: 4, y: 8 }
            },
            {
                tile: tilemaps.woodenFloor,
                position: { x: 5, y: 8 }
            },
            {
                tile: tilemaps.woodenFloor,
                position: { x: 6, y: 8 }
            },
            {
                tile: tilemaps.wall,
                position: { x: 7, y: 8 }
            },
            {
                tile: tilemaps.wall,
                position: { x: 0, y: 9 }
            },
            {
                tile: tilemaps.woodenFloor,
                position: { x: 1, y: 9 }
            },
            {
                tile: tilemaps.woodenFloor,
                position: { x: 2, y: 9 }
            },
            {
                tile: tilemaps.woodenFloor,
                position: { x: 3, y: 9 }
            },
            {
                tile: tilemaps.woodenFloor,
                position: { x: 4, y: 9 }
            },
            {
                tile: tilemaps.woodenFloor,
                position: { x: 5, y: 9 }
            },
            {
                tile: tilemaps.woodenFloor,
                position: { x: 6, y: 9 }
            },
            {
                tile: tilemaps.wall,
                position: { x: 7, y: 9 }
            },
            {
                tile: tilemaps.wall,
                position: { x: 0, y: 10 }
            },
            {
                tile: tilemaps.woodenFloor,
                position: { x: 1, y: 10 }
            },
            {
                tile: tilemaps.woodenFloor,
                position: { x: 2, y: 10 }
            },
            {
                tile: tilemaps.woodenFloor,
                position: { x: 3, y: 10 }
            },
            {
                tile: tilemaps.woodenFloor,
                position: { x: 4, y: 10 }
            },
            {
                tile: tilemaps.woodenFloor,
                position: { x: 5, y: 10 }
            },
            {
                tile: tilemaps.woodenFloor,
                position: { x: 6, y: 10 }
            },
            {
                tile: tilemaps.wall,
                position: { x: 7, y: 10 }
            },
            {
                tile: tilemaps.wall,
                position: { x: 0, y: 11 }
            },
            {
                tile: tilemaps.woodenFloor,
                position: { x: 1, y: 11 }
            },
            {
                tile: tilemaps.woodenFloor,
                position: { x: 2, y: 11 }
            },
            {
                tile: tilemaps.woodenFloor,
                position: { x: 3, y: 11 }
            },
            {
                tile: tilemaps.woodenFloor,
                position: { x: 4, y: 11 }
            },
            {
                tile: tilemaps.woodenFloor,
                position: { x: 5, y: 11 }
            },
            {
                tile: tilemaps.woodenFloor,
                position: { x: 6, y: 11 }
            },
            {
                tile: tilemaps.wall,
                position: { x: 7, y: 11 }
            },
            {
                tile: tilemaps.wall,
                position: { x: 0, y: 12 }
            },
            {
                tile: tilemaps.woodenFloor,
                position: { x: 1, y: 12 }
            },
            {
                tile: tilemaps.woodenFloor,
                position: { x: 2, y: 12 }
            },
            {
                tile: tilemaps.woodenFloor,
                position: { x: 3, y: 12 }
            },
            {
                tile: tilemaps.woodenFloor,
                position: { x: 4, y: 12 }
            },
            {
                tile: tilemaps.woodenFloor,
                position: { x: 5, y: 12 }
            },
            {
                tile: tilemaps.woodenFloor,
                position: { x: 6, y: 12 }
            },
            {
                tile: tilemaps.wall,
                position: { x: 7, y: 12 }
            },
            {
                tile: tilemaps.wall,
                position: { x: 0, y: 13 }
            },
            {
                tile: tilemaps.woodenFloor,
                position: { x: 1, y: 13 }
            },
            {
                tile: tilemaps.woodenFloor,
                position: { x: 2, y: 13 }
            },
            {
                tile: tilemaps.woodenFloor,
                position: { x: 3, y: 13 }
            },
            {
                tile: tilemaps.woodenFloor,
                position: { x: 4, y: 13 }
            },
            {
                tile: tilemaps.woodenFloor,
                position: { x: 5, y: 13 }
            },
            {
                tile: tilemaps.woodenFloor,
                position: { x: 6, y: 13 }
            },
            {
                tile: tilemaps.wall,
                position: { x: 7, y: 13 }
            },
            {
                tile: tilemaps.wall,
                position: { x: 0, y: 14 }
            },
            {
                tile: tilemaps.wall,
                position: { x: 1, y: 14 }
            },
            {
                tile: tilemaps.wall,
                position: { x: 2, y: 14 }
            },
            {
                tile: tilemaps.wall,
                position: { x: 3, y: 14 }
            },
            {
                tile: tilemaps.wall,
                position: { x: 4, y: 14 }
            },
            {
                tile: tilemaps.wall,
                position: { x: 5, y: 14 }
            },
            {
                tile: tilemaps.wall,
                position: { x: 6, y: 14 }
            },
            {
                tile: tilemaps.wall,
                position: { x: 7, y: 14 }
            }
        ]
    },
    width: 8,
    height: 14
};

let camera = {
    x: 3 * TILE_SIZE - canvas.width / 2,
    y: canvas.width / 2 - 3 * TILE_SIZE,
    smoothSpeed: 4
}

const player = {
    x: 3 * TILE_SIZE,
    y: 3 * TILE_SIZE,
    size: TILE_SIZE / 1.05,
    speed: 200, // speed in pixels per frame
    dx: 0,
    dy: 0,
    texture: new Image()
};
player.texture.src = 'skin.png';

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

function drawMap(deltaTime) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Update camera position smoothly
    camera.x = Math.floor(easeOut(camera.x, player.x - canvas.width / 2 + player.size / 2, camera.smoothSpeed * deltaTime));
    camera.y = Math.floor(easeOut(camera.y, player.y - canvas.height / 2 + player.size / 2, camera.smoothSpeed * deltaTime));

    // Draw ground tiles
    for (let tile of map.tiles.ground) {
        const x = tile.position.x * TILE_SIZE;
        const y = tile.position.y * TILE_SIZE;

        ctx.imageSmoothingEnabled = false;
        ctx.drawImage(tile.tile.defaultTexture, x - camera.x, y - camera.y, TILE_SIZE, TILE_SIZE);
    }

    ctx.drawImage(player.texture, player.x - camera.x, player.y - camera.y, player.size, player.size);
}

function updatePlayerPosition(deltaTime) {
    let nextX = player.x + player.dx * deltaTime;
    let nextY = player.y + player.dy * deltaTime;

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

        //wenn nicht walkable
        if (!map.tiles.ground[tileY * map.width + tileX].tile.walkable) {
            canMoveX = false;
            break;
        }
    }

    // Überprüfe jede Ecke auf Kollision für Y
    for (let corner of cornersY) {
        let tileX = Math.floor(corner.x / TILE_SIZE);
        let tileY = Math.floor(corner.y / TILE_SIZE);

        //wenn nicht walkable
        if (!map.tiles.ground[tileY * map.width + tileX].tile.walkable) {
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

let lastTime = 0;
function gameLoop(timestamp) {

    // Berechne Delta Time in Sekunden
    const deltaTime = (timestamp - lastTime) / 1000;
    lastTime = timestamp;

    checkGamepadInput();
    switch (inputDevice) {
        case 'keyboard':
            updateKeyboardMovement();
            break;
        case 'touch':
            updateTouchMovement();
            break;
        case 'gamepad':
            updateGamepadMovement();
            break;
    }
    updatePlayerPosition(deltaTime);
    drawMap(deltaTime);
    requestAnimationFrame(gameLoop);
}

requestAnimationFrame(gameLoop);