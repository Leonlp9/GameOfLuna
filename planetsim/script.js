const canvas = document.getElementById('canvas');
updateSize();
const ctx = canvas.getContext('2d');

//resize event
window.addEventListener('resize', function(){
    updateSize()
});

function updateSize(){
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

let trails = {};
let planets = [];
const timestart = Date.now();
let timepassed = 0;

let camera = {
    x: 0,
    y: 0,
    zoom: 1
}

let isDragging = false;
let lastMouseX, lastMouseY;

canvas.addEventListener('wheel', function(event) {
    const zoomIntensity = 0.1;
    const wheel = event.deltaY < 0 ? 1 : -1;
    const zoom = Math.exp(wheel * zoomIntensity);

    // Berechnen der neuen Zoomstufe
    const newZoom = camera.zoom * zoom;

    // Berechnen der Mausposition relativ zum Zentrum des Canvas
    const mouseX = event.clientX - canvas.width / 2;
    const mouseY = event.clientY - canvas.height / 2;

    // Anpassen der Kameraposition basierend auf dem Zoom
    camera.x -= mouseX * (1 - 1 / zoom);
    camera.y -= mouseY * (1 - 1 / zoom);

    // Aktualisieren der Zoomstufe der Kamera
    camera.zoom = newZoom;

    event.preventDefault();
});
canvas.addEventListener('mousedown', function(event) {
    isDragging = true;
    lastMouseX = event.clientX;
    lastMouseY = event.clientY;
});

canvas.addEventListener('mousemove', function(event) {
    if (isDragging) {
        const dx = event.clientX - lastMouseX;
        const dy = event.clientY - lastMouseY;
        camera.x -= dx / camera.zoom;  // Invertiere Bewegungsrichtung
        camera.y -= dy / camera.zoom;  // Invertiere Bewegungsrichtung
        lastMouseX = event.clientX;
        lastMouseY = event.clientY;
    }
});

canvas.addEventListener('mouseup', function(event) {
    isDragging = false;
});

canvas.addEventListener('mouseleave', function(event) {
    isDragging = false;
});

class Planet {
    constructor(name, radius, mass, x, y, dx, dy, color) {
        this.name = name;
        this.radius = radius;
        this.mass = mass;
        this.x = x;
        this.y = y;
        this.dx = dx;
        this.dy = dy;
        this.color = color;
    }

    draw(scale, offsetX, offsetY) {
        // Anpassen der Positionen basierend auf dem Zoom und der Kameraverschiebung
        const scaledX = (this.x * scale + offsetX - camera.x) * camera.zoom;
        const scaledY = (this.y * scale + offsetY - camera.y) * camera.zoom;
        const scaledRadius = this.radius * camera.zoom;

        ctx.beginPath();
        ctx.arc(scaledX, scaledY, scaledRadius, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
    }
}

planets.push(new Planet('Sun', 20, 1.989e30, 0, 0, 0, 0, 'yellow'));
planets.push(new Planet('Mercury', 3, 3.3e23, 57.9e9, 0, 0, 47.4e3, 'gray'));
planets.push(new Planet('Venus', 5, 4.87e24, 108.2e9, 0, 0, 35e3, 'orange'));
planets.push(new Planet('Earth', 5, 5.97e24, 149.6e9, 0, 0, 29.8e3, 'blue'));
planets.push(new Planet('Mars', 4, 6.42e23, 227.9e9, 0, 0, 24.1e3, 'red'));
planets.push(new Planet('Jupiter', 12, 1.9e27, 778.5e9, 0, 0, 13.1e3, 'orange'));
planets.push(new Planet('Saturn', 10, 5.68e26, 1433.5e9, 0, 0, 9.7e3, 'yellow'));
planets.push(new Planet('Uranus', 8, 8.68e25, 2872.5e9, 0, 0, 6.8e3, 'lightblue'));
planets.push(new Planet('Neptune', 8, 1.02e26, 4495.1e9, 0, 0, 5.4e3, 'blue'));

const AU = 149.6e9;
const SCALE = 100 / AU;
const G = 6.67430e-11;
const dt = 3600;
const offsetX = canvas.width / 2;
const offsetY = canvas.height / 2;

const speedInput = document.getElementById('planetSpeedInput');
const trailInput = document.getElementById('planetTrailInput');
const trailLengthInput = document.getElementById('planetTrailLengthInput');
const trailColorInput = document.getElementById('planetTrailColorInput');
const trailWidthInput = document.getElementById('planetTrailWidthInput');

function distance(planet1, planet2) {
    return Math.sqrt(Math.pow(planet1.x - planet2.x, 2) + Math.pow(planet1.y - planet2.y, 2));
}

function simulate() {
    let newPlanets = [];
    let speedFactor = Math.pow(parseFloat(speedInput.value), 2.25); // Exponentielle Zunahme

    timepassed += dt * speedFactor;

    planets.forEach(planet => {
        let ax = 0;
        let ay = 0;
        planets.forEach(otherPlanet => {
            if (planet !== otherPlanet) {
                let dx = otherPlanet.x - planet.x;
                let dy = otherPlanet.y - planet.y;
                let distance = Math.sqrt(dx * dx + dy * dy);
                let force = (G * planet.mass * otherPlanet.mass) / (distance * distance);
                ax += force * dx / distance / planet.mass;
                ay += force * dy / distance / planet.mass;
            }
        });
        let vx = planet.dx + ax * dt * speedFactor;
        let vy = planet.dy + ay * dt * speedFactor;
        let x = planet.x + vx * dt * speedFactor;
        let y = planet.y + vy * dt * speedFactor;
        newPlanets.push(new Planet(planet.name, planet.radius, planet.mass, x, y, vx, vy, planet.color));

        if (!trails[planet.name]) trails[planet.name] = [];
        trails[planet.name].push({ x: x * SCALE + offsetX, y: y * SCALE + offsetY });
        if (trails[planet.name].length > trailLengthInput.value) {
            trails[planet.name].shift();
        }
    });

    planets = newPlanets;
}

function drawTrails() {
    if (!trailInput.checked) return;

    ctx.strokeStyle = trailColorInput.value;
    ctx.lineWidth = trailWidthInput.value;

    planets.forEach(planet => {
        if (trails[planet.name]) {
            ctx.beginPath();
            trails[planet.name].forEach((point, index) => {
                const scaledX = (point.x - camera.x) * camera.zoom;
                const scaledY = (point.y - camera.y) * camera.zoom;
                const scaledRadius = planet.radius * camera.zoom;
                if (index === 0) {
                    ctx.moveTo(scaledX, scaledY);
                } else {
                    ctx.lineTo(scaledX, scaledY);
                }
            });
            ctx.stroke();
        }
    });
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawTrails();
    planets.forEach(planet => {
        planet.draw(SCALE, offsetX, offsetY);
    });
    simulate();
    document.getElementById('planetCount').innerText = "Anzahl der Planeten: " + planets.length;

    let time = new Date(timestart + timepassed * 1000);

    //00.00.0000 00:00:00 nicht 0.0.0000 0:0:0 also führende Nullen
    let formattedTime = time.getDate().toString().padStart(2, '0') + "." + (time.getMonth() + 1).toString().padStart(2, '0') + "." + time.getFullYear() + " " + time.getHours().toString().padStart(2, '0') + ":" + time.getMinutes().toString().padStart(2, '0') + ":" + time.getSeconds().toString().padStart(2, '0');

    document.getElementById('timestamp').innerText = "Zeit: " + formattedTime;
    document.getElementById('zoom').innerText = "Zoom: " + camera.zoom.toFixed(6);
    document.getElementById('position').innerText = "Position: " + camera.x.toFixed(6) + ", " + camera.y.toFixed(6);

    requestAnimationFrame(animate);
}

animate();