const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Ursprüngliche Canvas-Größe
const originalWidth = 350;
const originalHeight = 600;

// Skalierungsfaktor initialisieren
let scaleFactor = 1;

function resizeCanvas() {
    // Fensterbreite oder einen Maximalwert verwenden, um das Canvas nicht zu groß zu machen
    const maxWidth = Math.min(window.innerWidth - 50, 400);
    scaleFactor = maxWidth / originalWidth;
    canvas.width = originalWidth * scaleFactor;
    canvas.height = originalHeight * scaleFactor;
}

// Event-Listener für Fenstergrößenänderungen
window.addEventListener('resize', resizeCanvas);

let fruits = [
    { name: 'cherry', score: 2, size: 35, texture: "https://suikagame.com/public/res/raw-assets/ad/ad16ccdc-975e-4393-ae7b-8ac79c3795f2.png", img: new Image() },
    { name: 'strawberry', score: 4, size: 50, texture: "https://suikagame.com/public/res/raw-assets/0c/0cbb3dbb-2a85-42a5-be21-9839611e5af7.png", img: new Image() },
    { name: 'grape', score: 6, size: 65, texture: "https://suikagame.com/public/res/raw-assets/d0/d0c676e4-0956-4a03-90af-fee028cfabe4.png", img: new Image() },
    { name: 'dekopon', score: 8, size: 80, texture: "https://suikagame.com/public/res/raw-assets/74/74237057-2880-4e1f-8a78-6d8ef00a1f5f.png", img: new Image() },
    { name: 'orange', score: 10, size: 110, texture: "https://suikagame.com/public/res/raw-assets/13/132ded82-3e39-4e2e-bc34-fc934870f84c.png", img: new Image() },
    { name: 'apple', score: 12, size: 130, texture: "https://suikagame.com/public/res/raw-assets/03/03c33f55-5932-4ff7-896b-814ba3a8edb8.png", img: new Image() },
    { name: 'pear', score: 14, size: 150, texture: "https://suikagame.com/public/res/raw-assets/66/665a0ec9-6c43-4858-974c-025514f2a0e7.png", img: new Image() },
    { name: 'peach', score: 16, size: 180, texture: "https://suikagame.com/public/res/raw-assets/84/84bc9d40-83d0-480c-b46a-3ef59e603e14.png", img: new Image() },
    { name: 'pineapple', score: 18, size: 200, texture: "https://suikagame.com/public/res/raw-assets/5f/5fa0264d-acbf-4a7b-8923-c106ec3b9215.png", img: new Image() },
    { name: 'melon', score: 20, size: 230, texture: "https://suikagame.com/public/res/raw-assets/56/564ba620-6a55-4cbe-a5a6-6fa3edd80151.png", img: new Image() },
    { name: 'watermelon', score: 22, size: 260, texture: "https://suikagame.com/public/res/raw-assets/50/5035266c-8df3-4236-8d82-a375e97a0d9c.png", img: new Image() }
];

function fillFruitsRange() {
    const range = document.getElementById('fruitsRange');
    let i = 0;
    fruits.forEach(fruit => {
        const img = document.createElement('img');
        img.src = fruit.texture;

        //responsive size but cherry is smallest and melon is biggest
        img.style.width = 7 + i / 2.5 + '%';

        range.appendChild(img);
        i += 1;
    });
}

fillFruitsRange();

resizeCanvas();

function preloadImages() {
    fruits.forEach(fruit => {
        fruit.img.src = fruit.texture;
    });
}
preloadImages()

let fruitsArray = [];
let score = 0;
let allTime = localStorage.getItem('lunikaAllTime') || 0;
document.getElementById('AllTimeScore').innerText = allTime;
let lastX = canvas.width / 2;

function addScore(amount) {
    score += amount;
    document.getElementById('score').innerText = score;

    if (score > allTime) {
        allTime = score;
        document.getElementById('AllTimeScore').innerText = allTime;
        localStorage.setItem('lunikaAllTime', allTime);
    }
}

class Fruit {
    constructor(x, y, fruit, type) {
        this.x = x;
        this.y = y;
        this.dx = 0;
        this.dy = 0;
        this.size = fruit.size;
        this.image = fruit.img;
        this.gravity = 0.2;
        this.rotation = Math.random() * 360;
        this.rotationSpeed = 0;
        this.type = type;
        fruitsArray.push(this);
    }

    draw() {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotation * Math.PI / 180);
        ctx.drawImage(this.image, -this.size * scaleFactor / 2, -this.size * scaleFactor / 2, this.size * scaleFactor, this.size * scaleFactor);
        ctx.restore();
    }

    update(deltaTime) {
        if (newDroppingFruit !== this) {
            this.dy += this.gravity * deltaTime;
        }
        this.rotation += this.rotationSpeed * deltaTime;
        this.rotation %= 360;

        let nextX = this.x + this.dx * deltaTime;
        let nextY = this.y + this.dy * deltaTime;

        if (nextX - this.size * scaleFactor / 2 < 15) {
            this.dx = Math.abs(this.dx) * 0.25;
            nextX = this.size * scaleFactor / 2 + 15;
            this.rotationSpeed = Math.abs(this.rotationSpeed);
        } else if (nextX + this.size * scaleFactor / 2 > canvas.width - 15) {
            this.dx = -Math.abs(this.dx) * 0.25;
            nextX = canvas.width - 15 - this.size * scaleFactor / 2;
            this.rotationSpeed = -Math.abs(this.rotationSpeed);
        }

        if (nextY + this.size * scaleFactor / 2 > canvas.height - 15) {
            this.dy = -this.dy * 0.1;
            this.dx *= 0.95;
            nextY = canvas.height - 15 - this.size * scaleFactor / 2;
            this.rotationSpeed *= 0.5;
        }

        this.x = nextX;
        this.y = nextY;

        if (newDroppingFruit !== this) {
            if (this.y + this.size * scaleFactor / 2 < 115 && this.dy < 0) {
                fruitsArray = [];
                spawnFruit();
                score = 0;
            }
        }

        this.draw();
    }

    upgrade() {
        const currentIndex = fruits.findIndex(f => f.name === this.type);
        if (currentIndex < fruits.length - 1) {
            const nextFruit = fruits[currentIndex + 1];
            this.type = nextFruit.name;
            this.size = nextFruit.size;
            this.image = nextFruit.img;
            addScore(nextFruit.score);
        }
    }
}

function checkFruitCollisions() {
    for (let i = 0; i < fruitsArray.length; i++) {
        for (let j = i + 1; j < fruitsArray.length; j++) {
            if (newDroppingFruit === fruitsArray[i] || newDroppingFruit === fruitsArray[j]) {
                continue;
            }

            const fruitA = fruitsArray[i];
            const fruitB = fruitsArray[j];
            const dx = fruitA.x - fruitB.x;
            const dy = fruitA.y - fruitB.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            const minDistance = (fruitA.size * scaleFactor / 2 + fruitB.size * scaleFactor / 2);

            if (distance < minDistance) {
                if (fruitA.type === fruitB.type) {
                    fruitA.upgrade();
                    fruitsArray.splice(j, 1);
                } else {
                    const angle = Math.atan2(dy, dx);
                    const sin = Math.sin(angle);
                    const cos = Math.cos(angle);

                    const vxA = fruitA.dx * cos + fruitA.dy * sin;
                    const vyA = fruitA.dy * cos - fruitA.dx * sin;

                    const vxB = fruitB.dx * cos + fruitB.dy * sin;
                    const vyB = fruitB.dy * cos - fruitB.dx * sin;

                    const energyLossFactor = 0.7;
                    const vxAAfter = ((fruitA.size * scaleFactor - fruitB.size * scaleFactor) * vxA + (2 * fruitB.size * scaleFactor) * vxB) / (fruitA.size * scaleFactor + fruitB.size * scaleFactor) * energyLossFactor;
                    const vxBAfter = ((2 * fruitA.size * scaleFactor) * vxA + (fruitB.size * scaleFactor - fruitA.size * scaleFactor) * vxB) / (fruitA.size * scaleFactor + fruitB.size * scaleFactor) * energyLossFactor;

                    const overlap = (minDistance - distance) / 2;
                    fruitA.x += Math.cos(angle) * overlap;
                    fruitA.y += Math.sin(angle) * overlap;
                    fruitB.x -= Math.cos(angle) * overlap;
                    fruitB.y -= Math.sin(angle) * overlap;

                    fruitA.dx = vxAAfter * cos - vyA * sin;
                    fruitA.dy = vyA * cos + vxAAfter * sin;
                    fruitB.dx = vxBAfter * cos - vyB * sin;
                    fruitB.dy = vyB * cos + vxBAfter * sin;

                    fruitA.rotationSpeed = vxAAfter;
                    fruitB.rotationSpeed = vxBAfter;
                }
            }
        }
    }
}

let newDroppingFruit = null;

function spawnFruit() {
    const fruitIndex = Math.floor(Math.random() * 3);
    const fruit = fruits[fruitIndex];
    newDroppingFruit = new Fruit(lastX, 50, fruit, fruit.name);
}

//mouse
canvas.addEventListener('mousemove', (event) => {
    if (newDroppingFruit) {
        newDroppingFruit.x = event.clientX - canvas.getBoundingClientRect().left;
        newDroppingFruit.update(0)
        lastX = newDroppingFruit.x;
    }
});

canvas.addEventListener('click', (event) => {
    if (newDroppingFruit) {
        newDroppingFruit.x = event.clientX - canvas.getBoundingClientRect().left;
        newDroppingFruit.dy = 5;
        lastX = newDroppingFruit.x;
        newDroppingFruit = null;
        setTimeout(() => spawnFruit(), 250);
    }
});

//touch
document.addEventListener('touchstart', (event) => {
    document.querySelector('html').requestFullscreen();
});

canvas.addEventListener('touchmove', (event) => {
    if (newDroppingFruit) {
        newDroppingFruit.x = event.touches[0].clientX - canvas.getBoundingClientRect().left;
        newDroppingFruit.update(0)
        lastX = newDroppingFruit.x;
    }
});

canvas.addEventListener('touchend', (event) => {
    if (newDroppingFruit) {
        newDroppingFruit.x = event.changedTouches[0].clientX - canvas.getBoundingClientRect().left;
        newDroppingFruit.dy = 5;
        lastX = newDroppingFruit.x;
        newDroppingFruit = null;
        setTimeout(() => spawnFruit(), 250);
    }
});


let lastTime = 0;
function animate(timestamp) {
    const deltaTime = (timestamp - lastTime) / 16.6667; // Normalize the deltaTime
    lastTime = timestamp;

    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw the background
    ctx.fillStyle = '#e8d5ad';
    ctx.fillRect(0, 100, canvas.width, canvas.height - 100);

    //Dreieck oben
    ctx.beginPath();
    ctx.moveTo(0, 100);
    ctx.lineTo(50, 50);
    ctx.lineTo(canvas.width - 50, 50);
    ctx.lineTo(canvas.width, 100);
    ctx.closePath();
    ctx.fillStyle = '#e8d5ad';
    ctx.fill();

    //outline dreieck und background
    ctx.beginPath();
    ctx.moveTo(5, 110);
    ctx.lineTo(50, 50);
    ctx.lineTo(canvas.width - 50, 50);
    ctx.lineTo(canvas.width - 5, 110);
    ctx.lineTo(canvas.width - 5, canvas.height - 5);
    ctx.lineTo(5, canvas.height - 5);
    ctx.closePath();
    ctx.lineWidth = 20;
    ctx.strokeStyle = '#eed37b';
    ctx.stroke();

    if (newDroppingFruit) {
        //draw line from at x=lastX y=50 to y=canvas.height/2 The line loses transparency the closer it gets to the bottom
        const gradient = ctx.createLinearGradient(lastX, 50, lastX, canvas.height / 2);
        gradient.addColorStop(0, 'rgb(255,255,255)');
        gradient.addColorStop(1, 'rgba(255,255,255,0)');
        ctx.beginPath();
        ctx.moveTo(lastX, 50);
        ctx.lineTo(lastX, canvas.height / 1.2);
        ctx.strokeStyle = gradient;
        ctx.lineWidth = 4;
        ctx.stroke();

    }

    checkFruitCollisions();
    fruitsArray.forEach((fruit, index) => {
        fruit.update(deltaTime);
        if (fruit.y > canvas.height) {
            fruitsArray.splice(index, 1);
        }
    });

    // Draw line between dreieck and background
    ctx.beginPath();
    ctx.moveTo(0, 100);
    ctx.lineTo(400, 100);
    ctx.lineTo(400, 115);
    ctx.lineTo(0, 115);
    ctx.closePath();
    //linien breite
    ctx.lineWidth = 10;
    ctx.fillStyle = '#eed37b';
    ctx.fill();

    requestAnimationFrame(animate);
}



animate(0);
spawnFruit();