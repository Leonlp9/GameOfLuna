let game = {
    mapConfig: {
        width: 30,
        height: 18,
        speed: 250
    },
    cars: [
        {
            position: {
                x: 4,
                y: 5
            },
            orientation: "right"
        },
        {
            position: {
                x: 3,
                y: 5
            },
            orientation: "right"
        },
        {
            position: {
                x: 2,
                y: 5
            },
            orientation: "right"
        },
        {
            position: {
                x: 1,
                y: 5
            },
            orientation: "right"
        },
        {
            position: {
                x: 0,
                y: 5
            },
            orientation: "right"
        }
    ],
    benzin: []
}

let lastPressedOrientation = "right";

function getFirstCarOrientation() {
    return game.cars[0].orientation;
}

// Event
document.addEventListener("keydown", function (event) {
    let firstCarOrientation = getFirstCarOrientation();
    let orientation = "";
    switch (event.key) {
        case "ArrowUp":
        case "w":
        case "W":
            if (firstCarOrientation !== "down") {
                orientation = "up";
            }
            break;
        case "ArrowDown":
        case "s":
        case "S":
            if (firstCarOrientation !== "up") {
                orientation = "down";
            }
            break;
        case "ArrowLeft":
        case "a":
        case "A":
            if (firstCarOrientation !== "right"){
                orientation = "left";
            }
            break;
        case "ArrowRight":
        case "d":
        case "D":
            if (firstCarOrientation !== "left") {
                orientation = "right";
            }
            break;
    }
    if (orientation !== "") {
        lastPressedOrientation = orientation;
    }
});

//mobile swipe gesture
let touchStartX = 0;
let touchStartY = 0;
document.addEventListener("touchstart", function (event) {
    touchStartX = event.touches[0].clientX;
    touchStartY = event.touches[0].clientY;
});
document.addEventListener("touchend", function (event) {
    let touchEndX = event.changedTouches[0].clientX;
    let touchEndY = event.changedTouches[0].clientY;
    let dx = touchEndX - touchStartX;
    let dy = touchEndY - touchStartY;
    let orientation = "";
    if (Math.abs(dx) > Math.abs(dy)) {
        if (dx > 0) {
            if (getFirstCarOrientation() !== "left") {
                orientation = "right";
            }
        } else {
            if (getFirstCarOrientation() !== "right") {
                orientation = "left";
            }
        }
    } else {
        if (dy > 0) {
            if (getFirstCarOrientation() !== "up") {
                orientation = "down";
            }
        } else {
            if (getFirstCarOrientation() !== "down") {
                orientation = "up";
            }
        }
    }
    if (orientation !== "") {
        lastPressedOrientation = orientation;
    }
});

function getObjectsAtPosition(x, y) {
    let objects = [];
    for (let car of game.cars) {
        if (car.position.x === x && car.position.y === y) {
            objects.push(car);
        }
    }
    for (let benzin of game.benzin) {
        if (benzin.position.x === x && benzin.position.y === y) {
            objects.push(benzin);
        }
    }
    return objects;
}

function getEmptyPositionAmount() {
    let emptyPositionAmount = 0;
    for (let x = 0; x < game.mapConfig.width; x++) {
        for (let y = 0; y < game.mapConfig.height; y++) {
            if (getObjectsAtPosition(x, y).length === 0) {
                emptyPositionAmount++;
            }
        }
    }
    return emptyPositionAmount;
}

function placeBenzinAtRandomPosition() {
    let emptyPositionAmount = getEmptyPositionAmount();
    if (emptyPositionAmount === 0) {
        return;
    }
    let randomPosition = Math.floor(Math.random() * emptyPositionAmount);
    for (let x = 0; x < game.mapConfig.width; x++) {
        for (let y = 0; y < game.mapConfig.height; y++) {
            if (getObjectsAtPosition(x, y).length === 0) {
                if (randomPosition === 0) {
                    game.benzin.push({
                        position: {
                            x: x,
                            y: y
                        }
                    });
                    return;
                }
                randomPosition--;
            }
        }
    }
}

function moveCars() {
    //das erste auto bekommt die lastPressedOrientation und die anderen bekommen die orientation des vorherigen autos
    for (let i = game.cars.length; i > 0; i--) {
        let car = game.cars[i];
        let previousCar = game.cars[i - 1];
        if (previousCar !== undefined && car !== undefined) {
            car.orientation = previousCar.orientation;
        }
    }
    game.cars[0].orientation = lastPressedOrientation;
    for (let car of game.cars) {
        let newX = car.position.x;
        let newY = car.position.y;
        const orientation = car.orientation;
        switch (orientation) {
            case "up":
                newY--;
                break;
            case "down":
                newY++;
                break;
            case "left":
                newX--;
                break;
            case "right":
                newX++;
                break;
        }
        if (newX < 0 || newX >= game.mapConfig.width || newY < 0 || newY >= game.mapConfig.height) {
            console.log("Game Over")
            continue;
        }
        let objects = getObjectsAtPosition(newX, newY);
        if (objects.length > 0) {
            for (let object of objects) {
                //wenn es ein benzin ist
                if (object.position !== undefined) {
                    let index = game.benzin.indexOf(object);
                    if (index > -1) {
                        game.benzin.splice(index, 1);

                        //neues benzin platzieren
                        placeBenzinAtRandomPosition();
                    }
                }
            }
        }
        car.position.x = newX;
        car.position.y = newY;
    }
}

// Store rotation states for each car
let carRotations = {};
placeBenzinAtRandomPosition();
updatePositions();
setInterval(function () {
    moveCars();
    updatePositions();
}, game.mapConfig.speed);
function updatePositions() {
    game.cars.forEach(function (car, index) {
        let carElement = document.getElementById("car-" + index);
        if (carElement === null) {
            carElement = document.createElement("div");
            carElement.id = "car-" + index;
            carElement.style.width = "50px";
            carElement.style.height = "50px";
            carElement.style.backgroundColor = "red";
            carElement.style.position = "absolute";
            carElement.style.borderRadius = "25%";
            carElement.style.transition = "left " + game.mapConfig.speed + "ms cubic-bezier(0.5, 0.5, 0.5, 0.5), top " + game.mapConfig.speed + "ms cubic-bezier(0.5, 0.5, 0.5, 0.5), transform " + game.mapConfig.speed + "ms cubic-bezier(0.5, 0.5, 0.5, 0.5)";
            document.body.appendChild(carElement);
        }
        carElement.style.left = car.position.x * 50 + "px";
        carElement.style.top = car.position.y * 50 + "px";

        // Initialize rotation state if not already done
        if (carRotations[index] === undefined) {
            carRotations[index] = 0;
        }

        // Determine the target rotation based on orientation
        let targetRotation;
        switch (car.orientation) {
            case "right":
                targetRotation = 0;
                break;
            case "down":
                targetRotation = 90;
                break;
            case "left":
                targetRotation = 180;
                break;
            case "up":
                targetRotation = 270;
                break;
            default:
                targetRotation = 0;
        }

        // Calculate the shortest rotation path
        let currentRotation = carRotations[index];
        let deltaRotation = targetRotation - (currentRotation % 360);

        if (deltaRotation > 180) {
            deltaRotation -= 360;
        } else if (deltaRotation < -180) {
            deltaRotation += 360;
        }

        // Update the rotation state
        carRotations[index] += deltaRotation;
        carElement.style.transform = `rotate(${carRotations[index]}deg)`;
    });

    game.benzin.forEach(function (benzin, index) {
        let benzinElement = document.getElementById("benzin-" + index);
        if (benzinElement === null) {
            benzinElement = document.createElement("div");
            benzinElement.id = "benzin-" + index;
            benzinElement.style.width = "50px";
            benzinElement.style.height = "50px";
            benzinElement.style.backgroundColor = "green";
            benzinElement.style.position = "absolute";
            benzinElement.style.transition = "left 0.05s cubic-bezier(0.5, 0.5, 0.5, 0.5), top 0.05s cubic-bezier(0.5, 0.5, 0.5, 0.5)";
            benzinElement.style.transitionDelay = "0.1s";
            document.body.appendChild(benzinElement);
        }
        benzinElement.style.left = benzin.position.x * 50 + "px";
        benzinElement.style.top = benzin.position.y * 50 + "px";
    });
}
