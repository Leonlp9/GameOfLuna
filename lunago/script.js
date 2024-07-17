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

let map = maps.lunasZimmer;

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
            messageBox.remove();
            if (callbackOnRemove) {
                callbackOnRemove();
            }
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

messageBox('Hi, ich bin Luna. Ich bin ein kleines Mädchen und ich habe ein Problem. Ich habe mein Kuscheltier verloren. Kannst du mir helfen es zu finden?', null, null,
    function () {
    messageBox('Ich habe es zuletzt in meinem Zimmer gesehen. Es ist ein kleiner Bär mit einem roten Schal.', null, null,
        function () {
        messageBox('Ich habe gehört, dass es in einem der Schränke versteckt ist. Kannst du es finden?', null, null,
            function () {
            messageBox('Du kannst mich mit den Pfeiltasten oder dem Joystick bewegen.');
        });
    });
});