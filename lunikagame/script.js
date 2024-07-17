const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
canvas.width = 400;
canvas.height = 600;

const fruits = [
    { name: 'cherry', score: 2, size: 30, texture: "https://suikagame.com/public/res/raw-assets/ad/ad16ccdc-975e-4393-ae7b-8ac79c3795f2.png" },
    { name: 'strawberry', score: 4, size: 40, texture: "https://suikagame.com/public/res/raw-assets/0c/0cbb3dbb-2a85-42a5-be21-9839611e5af7.png" },
    { name: 'grape', score: 6, size: 60, texture: "https://suikagame.com/public/res/raw-assets/d0/d0c676e4-0956-4a03-90af-fee028cfabe4.png" },
    { name: 'dekopon', score: 8, size: 80, texture: "https://suikagame.com/public/res/raw-assets/74/74237057-2880-4e1f-8a78-6d8ef00a1f5f.png" },
    { name: 'orange', score: 10, size: 100, texture: "https://suikagame.com/public/res/raw-assets/13/132ded82-3e39-4e2e-bc34-fc934870f84c.png" },
    { name: 'apple', score: 12, size: 120, texture: "https://suikagame.com/public/res/raw-assets/03/03c33f55-5932-4ff7-896b-814ba3a8edb8.png" },
    { name: 'pear', score: 14, size: 140, texture: "https://suikagame.com/public/res/raw-assets/66/665a0ec9-6c43-4858-974c-025514f2a0e7.png" },
    { name: 'peach', score: 16, size: 160, texture: "https://suikagame.com/public/res/raw-assets/84/84bc9d40-83d0-480c-b46a-3ef59e603e14.png" },
    { name: 'pineapple', score: 18, size: 180, texture: "https://suikagame.com/public/res/raw-assets/5f/5fa0264d-acbf-4a7b-8923-c106ec3b9215.png" },
    { name: 'melon', score: 20, size: 200, texture: "https://suikagame.com/public/res/raw-assets/56/564ba620-6a55-4cbe-a5a6-6fa3edd80151.png" },
    { name: 'watermelon', score: 22, size: 220, texture: "https://suikagame.com/public/res/raw-assets/50/5035266c-8df3-4236-8d82-a375e97a0d9c.png" }
];

let fruitsArray = [];
let score = 0;

function addScore(amount) {
    score += amount;
    document.getElementById('score').innerText = score;
}

class Fruit {
    constructor(x, y, fruit, type) {
        this.x = x;
        this.y = y;
        this.dx = 0;
        this.dy = 0;
        this.size = fruit.size;
        this.texture = fruit.texture;
        this.gravity = 0.2;
        this.rotation = 0;
        this.rotationSpeed = 0;
        this.type = type;
        fruitsArray.push(this);
    }

    draw() {
        const img = new Image();
        img.src = this.texture;
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotation * Math.PI / 180);
        ctx.drawImage(img, -this.size / 2, -this.size / 2, this.size, this.size);
        ctx.restore();
    }

    update(deltaTime) {
        this.dy += this.gravity * deltaTime;
        this.rotation += this.rotationSpeed * deltaTime;
        this.rotation %= 360;

        let nextX = this.x + this.dx * deltaTime;
        let nextY = this.y + this.dy * deltaTime;

        if (nextX - this.size / 2 < 0) {
            this.dx = Math.abs(this.dx);
            nextX = this.size / 2;
            this.rotationSpeed = Math.abs(this.rotationSpeed);
        } else if (nextX + this.size / 2 > canvas.width) {
            this.dx = -Math.abs(this.dx);
            nextX = canvas.width - this.size / 2;
            this.rotationSpeed = -Math.abs(this.rotationSpeed);
        }

        if (nextY - this.size / 2 < 0) {
            this.dy = Math.abs(this.dy);
            nextY = this.size / 2;
        } else if (nextY + this.size / 2 > canvas.height) {
            this.dy = -this.dy * 0.1;
            this.dx *= 0.95;
            nextY = canvas.height - this.size / 2;
            this.rotationSpeed *= 0.5;
        }

        this.x = nextX;
        this.y = nextY;

        this.draw();
    }

    upgrade() {
        const currentIndex = fruits.findIndex(f => f.name === this.type);
        if (currentIndex < fruits.length - 1) {
            const nextFruit = fruits[currentIndex + 1];
            this.type = nextFruit.name;
            this.size = nextFruit.size;
            this.texture = nextFruit.texture;
            addScore(nextFruit.score);
        }
    }
}

function checkFruitCollisions() {
    for (let i = 0; i < fruitsArray.length; i++) {
        for (let j = i + 1; j < fruitsArray.length; j++) {
            const fruitA = fruitsArray[i];
            const fruitB = fruitsArray[j];
            const dx = fruitA.x - fruitB.x;
            const dy = fruitA.y - fruitB.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            const minDistance = (fruitA.size / 2 + fruitB.size / 2);

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
                    const vxAAfter = ((fruitA.size - fruitB.size) * vxA + (2 * fruitB.size) * vxB) / (fruitA.size + fruitB.size) * energyLossFactor;
                    const vxBAfter = ((2 * fruitA.size) * vxA + (fruitB.size - fruitA.size) * vxB) / (fruitA.size + fruitB.size) * energyLossFactor;

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

function spawnFruit() {
    const fruitIndex = Math.floor(Math.random() * 3);
    new Fruit(
        Math.random() * canvas.width,
        0,
        fruits[fruitIndex],
        fruits[fruitIndex].name
    );
}

let lastTime = 0;
function animate(timestamp) {
    const deltaTime = (timestamp - lastTime) / 16.6667; // Normalize the deltaTime
    lastTime = timestamp;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    checkFruitCollisions();
    fruitsArray.forEach((fruit, index) => {
        fruit.update(deltaTime);
        if (fruit.y > canvas.height) {
            fruitsArray.splice(index, 1);
        }
    });
    requestAnimationFrame(animate);
}

animate(0);
setInterval(spawnFruit, 100);
