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

let map = maps.zimmer;

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

    for (let object in objects) {
        objects[object].texture.src = `objects/${object}.png`;
        objects[object].texture.imageRendering = 'pixelated';
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

    // Draw objects
    for (let object of map.tiles.objects) {
        const x = object.position.x * TILE_SIZE;
        const y = object.position.y * TILE_SIZE;

        ctx.imageSmoothingEnabled = false;
        ctx.drawImage(object.object.texture, x - camera.x, y - camera.y, object.width * TILE_SIZE, object.height * TILE_SIZE);

        if (object.klickRadius) {
            //wenn der spieler in der nähe ist wird das objekt hervorgehoben
            let distance = Math.sqrt(Math.pow(player.x - x, 2) + Math.pow(player.y - y, 2));
            if (distance < object.klickRadius * TILE_SIZE) {
                ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
                ctx.fillRect(x - camera.x, y - camera.y, object.width * TILE_SIZE, object.height * TILE_SIZE);
            }
        }
    }

    ctx.drawImage(player.texture, player.x - camera.x, player.y - camera.y, player.size, player.size);
}

function getNearestObjectInRange(){
    for (let object of map.tiles.objects) {
        const x = object.position.x * TILE_SIZE;
        const y = object.position.y * TILE_SIZE;

        let distance = Math.sqrt(Math.pow(player.x - x, 2) + Math.pow(player.y - y, 2));
        if (distance < object.klickRadius * TILE_SIZE) {
            return object;
        }
    }
    return null;
}

addEventListener('keydown', (event) => {
    //kann nicht bewegen wenn die boxen offen sind
    if (document.querySelector('.messageBox')) {
        return;
    }

    if (event.key === ' ') {
        getNearestObjectInRange().klick();
    }
});

function updatePlayerPosition(deltaTime) {

    //kann nicht bewegen wenn die boxen offen sind
    if (document.querySelector('.messageBox')) {
        return;
    }

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
        map.tiles.ground.forEach(tile => {
            if (tile.position.x === tileX && tile.position.y === tileY) {
                if (!tile.tile.walkable) {
                    canMoveX = false;
                }
            }
        });
    }

    // Überprüfe jede Ecke auf Kollision für Y
    for (let corner of cornersY) {
        let tileX = Math.floor(corner.x / TILE_SIZE);
        let tileY = Math.floor(corner.y / TILE_SIZE);

        //wenn nicht walkable
        map.tiles.ground.forEach(tile => {
            if (tile.position.x === tileX && tile.position.y === tileY) {
                if (!tile.tile.walkable) {
                    canMoveY = false;
                }
            }
        });
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


function messageBox(message, from = null, image = null, callbackOnRemove = null) {
    //unten in der mitte vom bildschirm wird eine box erstellt in der der text mit einer animation erscheint
    const messageBox = document.createElement('div');
    messageBox.classList.add('messageBox');

    if (callbackOnRemove != null) {
        messageBox.classList.add('newMessage');
    }

    document.body.appendChild(messageBox);


    //text buchstabe für buchstabe anzeigen
    let i = 0;
    let interval = setInterval(() => {
        // Überprüfe, ob es das Ende der Nachricht erreicht hat
        if (i < message.length) {
            messageBox.textContent = messageBox.textContent.slice(0, -1);

            messageBox.textContent += message[i];
            // Füge das Dreieck-Symbol hinzu, wenn es nicht das Ende der Nachricht ist
            messageBox.textContent += "_"; // Dreieck-Symbol hinzugefügt
            // Entferne das Dreieck-Symbol, bevor der nächste Buchstabe hinzugefügt wird

            if (i % 5 === 0){
                let sound = new Audio('sounds/tiping.wav');
                sound.volume = 0.4;
                sound.play();
            }
        }
        i++;
        if (i >= message.length) {
            clearInterval(interval);
            interval = null;
            messageBox.textContent = messageBox.textContent.slice(0, -1);
        }
    }, 20);


    let gamepadCheckInterval;

    function handleInteraction() {
        if (interval) {
            clearInterval(interval);
            messageBox.textContent = message;
            interval = null;
        } else {
            if (callbackOnRemove) {
                callbackOnRemove();
            }
            messageBox.remove();
            removeEventListeners();
        }
    }

    function handleClick() {
        handleInteraction();
    }

    function handleKeydown(event) {
        if (event.keyCode === 32) { // Leertaste
            handleInteraction();
        }
    }

    let buttonReleased = true;

    function checkGamepad() {
        const gamepad = navigator.getGamepads()[0];
        if (gamepad) {
            const isButtonPressed = gamepad.buttons[0].pressed || gamepad.buttons[2].pressed;

            if (isButtonPressed && buttonReleased) {
                handleInteraction();
            }

            buttonReleased = !isButtonPressed;
        }
    }

    function addEventListeners() {
        document.body.addEventListener('click', handleClick);
        document.addEventListener('keydown', handleKeydown);
        gamepadCheckInterval = setInterval(checkGamepad, 100);
    }

    function removeEventListeners() {
        document.body.removeEventListener('click', handleClick);
        document.removeEventListener('keydown', handleKeydown);
        clearInterval(gamepadCheckInterval);
    }

    addEventListeners();

}

function transition(callback) {
    //bildschirm wird schwarz callback wird ausgeführt und bildschirm wird wieder sichtbar
    const transition = document.createElement('div');
    transition.style.position = 'fixed';
    transition.style.width = '100%';
    transition.style.height = '100%';
    transition.style.top = 0;
    transition.style.left = 0;
    transition.style.backgroundColor = 'black';
    transition.style.zIndex = 1000;
    transition.style.transition = 'opacity 1s cubic-bezier(0.4, 0, 0.2, 1)';
    transition.style.opacity = 0;
    document.body.appendChild(transition);

    setTimeout(() => {
        transition.style.opacity = 1;
    }, 1);

    setTimeout(() => {
        callback();
    }, 1001);

    setTimeout(() => {
        transition.style.opacity = 0;
    }, 2002);

    setTimeout(() => {
        transition.remove();
    }, 3003);
}

messageBox('Dieses Feld hier ist ein Testfeld. Es wird verwendet, um Nachrichten anzuzeigen. Drücke die Leertaste, um die Nachricht zu schließen.', 'Testfeld');