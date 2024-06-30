let currentBalance = 0;
const shopItems = [
    {
        name: 'Kaninchen',
        startPrice: 10,
        priceIncrease: 1.1,
        generateMoneyPerSecond: 0.25,
    },
    {
        name: 'Rollerblades',
        startPrice: 250,
        priceIncrease: 1.1,
        generateMoneyPerSecond: 12.5,
    },
    {
        name: 'Laptop',
        startPrice: 1500,
        priceIncrease: 1.1,
        generateMoneyPerSecond: 150,
    },
    {
        name: 'Informatik',
        startPrice: 10000,
        priceIncrease: 1.2,
        generateMoneyPerSecond: 1000,
    },
    {
        name: 'RAM',
        startPrice: 50000,
        priceIncrease: 1.2,
        generateMoneyPerSecond: 5000,
    },
    {
        name: 'Speicherkarte',
        startPrice: 1000000,
        priceIncrease: 1.2,
        generateMoneyPerSecond: 100000,
    },
    {
        name: 'Laptopkühler',
        startPrice: 75000000,
        priceIncrease: 1.3,
        generateMoneyPerSecond: 5000000,
    },
    {
        name: 'Führerschein',
        startPrice: 1000000000,
        priceIncrease: 1.3,
        generateMoneyPerSecond: 25500000,
    },
    {
        name: 'Auto',
        startPrice: 10000000000,
        priceIncrease: 1.3,
        generateMoneyPerSecond: 100000000,
    },
    {
        name: 'Autolift',
        startPrice: 100000000000,
        priceIncrease: 1.4,
        generateMoneyPerSecond: 500000000,
    },
    {
        name: 'Garage',
        startPrice: 750000000000,
        priceIncrease: 1.4,
        generateMoneyPerSecond: 2500000000,
    },
    {
        name: 'Werkstatt',
        startPrice: 10000000000000,
        priceIncrease: 1.4,
        generateMoneyPerSecond: 10000000000,
    },
    {
        name: 'Nichts',
        startPrice: 100000000000000,
        priceIncrease: 1.5,
        generateMoneyPerSecond: 50000000000,
    },
    {
        name: 'Chaos',
        startPrice: 1000000000000000,
        priceIncrease: 1.5,
        generateMoneyPerSecond: 250000000000,
    },
    {
        name: 'Ordnung',
        startPrice: 10000000000000000,
        priceIncrease: 1.5,
        generateMoneyPerSecond: 15000000000000,
    },
    {
        name: 'Zeit',
        startPrice: 100000000000000000,
        priceIncrease: 1.6,
        generateMoneyPerSecond: 250000000000000,
    },
    {
        name: 'Raum',
        startPrice: 1000000000000000000,
        priceIncrease: 1.6,
        generateMoneyPerSecond: 1000000000000000,
    }
];
let shopItemsBought = {};
let lastClicks = [];
let soundTracks = [
    "sounds/musik/SoundTrack1.mp3",
    "sounds/musik/SoundTrack2.mp3",
    "sounds/musik/SoundTrack3.mp3",
    "sounds/musik/SoundTrack4.mp3",
    "sounds/musik/SoundTrack5.mp3",
    "sounds/musik/SoundTrack6.mp3",
];

function saveGame() {
    localStorage.setItem('currentBalance', currentBalance);
    localStorage.setItem('shopItemsBought', JSON.stringify(shopItemsBought));
}

function loadGame() {
    currentBalance = parseFloat(localStorage.getItem('currentBalance')) || 0;
    shopItemsBought = JSON.parse(localStorage.getItem('shopItemsBought')) || shopItemsBought;
    updateShop();
    updateIncomePerSecondElement();

    const colorTheme = localStorage.getItem('color-theme');
    if (colorTheme) {
        const r = document.querySelector(':root');
        r.style.setProperty('--clicker-color', colorTheme);
        document.getElementById('color-theme').value = colorTheme;
    }

    const alwaysShowTimer = localStorage.getItem('always-show-timer');
    if (alwaysShowTimer) {
        document.getElementById('always-show-timer-checkbox').checked = alwaysShowTimer === 'true';
        document.getElementById('skills').classList.toggle('alwaysShowTimer', alwaysShowTimer === 'true');
    }

    const background = localStorage.getItem('background');
    if (background) {
        const r = document.querySelector(':root');
        r.style.setProperty('--background', 'url(' + background + ')');
    }

    const moneyEffect = localStorage.getItem('moneyEffect');
    if (moneyEffect) {
        document.getElementById('moneyEffect').checked = moneyEffect === 'true';
    }

    let musik = localStorage.getItem('musik');
    if (musik) {
        document.getElementById('musik').value = musik;
    }else {
        musik = document.getElementById('musik').value;
    }
    document.getElementById('musikValue').textContent = Math.round(musik * 100) + '%';

    let sound = localStorage.getItem('sound');
    if (sound) {
        document.getElementById('sound').value = sound;
    }else {
        sound = document.getElementById('sound').value;
    }
    document.getElementById('soundValue').textContent = Math.round(sound * 100) + '%';

    buildBackgrounds();
}

function buildBackgrounds() {
    const backgrounds = document.getElementById('backgrounds');
    const r = document.querySelector(':root');
    for (let i = 1; i <= 9; i++) {
        const input = document.createElement('input');
        input.type = 'radio';
        input.id = 'background' + i;
        input.name = 'background';
        input.value = 'background' + i;
        if (r.style.getPropertyValue('--background').includes('bg' + i + '.png')) {
            input.checked = true;
        }
        backgrounds.appendChild(input);

        const label = document.createElement('label');
        label.htmlFor = 'background' + i;
        label.style.height = '50px';
        const img = document.createElement('img');
        img.src = 'img/bg' + i + '.png';
        img.alt = 'background' + i;
        label.appendChild(img);
        backgrounds.appendChild(label);
    }
}

function resetGame() {
    currentBalance = 0;
    shopItemsBought = {};
    saveGame();
    window.location.reload();
}

function createShopItemElement(shopItem) {

    const element = document.createElement('div');
    element.id = shopItem.name;
    element.classList.add('skill');
    element.style.position = 'relative';

    const nameElement = document.createElement('div');
    nameElement.classList.add('skill-name');
    nameElement.innerText = shopItem.name;
    element.appendChild(nameElement);

    const nameElement2 = document.createElement('div');
    nameElement2.classList.add('skill-name-unexplored');
    element.appendChild(nameElement2);

    const iconElement = document.createElement('div');

    //check if the image exists
    const img = new Image();
    img.src = `img/${shopItem.name.toLowerCase()}.png`;
    img.onload = () => {
        iconElement.style.backgroundImage = `url('img/${shopItem.name.toLowerCase()}.png')`;
    };
    img.onerror = () => {
        iconElement.style.backgroundImage = 'url("img/loading.png")';
    }

    iconElement.classList.add('skill-icon');
    element.appendChild(iconElement);

    element.addEventListener('click', () => {
        const price = Math.round(shopItem.startPrice * Math.pow(shopItem.priceIncrease, shopItemsBought[shopItem.name] ? shopItemsBought[shopItem.name] : 0));
        if (currentBalance >= price) {

            if (!shopItemsBought[shopItem.name]) {
                shopItemsBought[shopItem.name] = 1;
            }else {
                shopItemsBought[shopItem.name]++;
            }
            removeMoney(price);
            updateShopItemElement(shopItem);
            saveGame();
            playSoundEffekt("sounds/buy.mp3");
        }else {
            playSoundEffekt("sounds/error.mp3")
        }
    });

    const priceElement = document.createElement('div');
    priceElement.classList.add('skill-price');

    const priceElementText = document.createElement('p');
    priceElementText.classList.add('skill-price-text');
    priceElementText.innerText = formatMoney(Math.round(shopItem.startPrice * Math.pow(shopItem.priceIncrease, shopItemsBought[shopItem.name] ? shopItemsBought[shopItem.name] : 0)));
    priceElement.appendChild(priceElementText);

    //tooltip mit der Zeit bis zum Kauf
    const timerElement = document.createElement('div');
    timerElement.classList.add('skill-timer');
    priceElement.appendChild(timerElement);

    element.appendChild(priceElement);

    const generateMoneyPerSecondElement = document.createElement('div');
    generateMoneyPerSecondElement.classList.add('skill-generate-money-per-second');
    generateMoneyPerSecondElement.innerText = "+ " + formatMoney(shopItem.generateMoneyPerSecond) + '/s';
    element.appendChild(generateMoneyPerSecondElement);

    const amountElement = document.createElement('div');
    amountElement.classList.add('skill-amount');
    amountElement.innerText = shopItemsBought[shopItem.name];

    element.appendChild(amountElement);

    return element;
}

function playSoundEffekt(sound) {
    if (localStorage.getItem('sound') && localStorage.getItem('sound') === 'false') {
        return;
    }

    let audio = new Audio(sound);
    audio.volume = document.getElementById('sound').value;
    audio.play().then(r => {});
}

function updateShopItemElement(shopItem) {
    const element = document.getElementById(shopItem.name);
    const priceElement = element.querySelector('.skill-price-text');
    const amountElement = element.querySelector('.skill-amount');
    const timerElement = element.querySelector('.skill-timer');
    priceElement.innerText = formatMoney(Math.round(shopItem.startPrice * Math.pow(shopItem.priceIncrease, shopItemsBought[shopItem.name] ? shopItemsBought[shopItem.name] : 0)));
    priceElement.style.color = currentBalance >= Math.round(shopItem.startPrice * Math.pow(shopItem.priceIncrease, shopItemsBought[shopItem.name] ? shopItemsBought[shopItem.name] : 0)) ? 'green' : 'red';
    amountElement.innerText = shopItemsBought[shopItem.name] ? shopItemsBought[shopItem.name] : '';
    timerElement.innerText = getFormattedTimeTo(getCalculatedTimeStampWhenReachableBalance(Math.round(shopItem.startPrice * Math.pow(shopItem.priceIncrease, shopItemsBought[shopItem.name] ? shopItemsBought[shopItem.name] : 0))));
    if (!shopItemsBought[shopItem.name] || shopItemsBought[shopItem.name] === 0 && !element.classList.contains('unexplored')) {
        element.classList.add('unexplored');
    }else if (shopItemsBought[shopItem.name] > 0 && element.classList.contains('unexplored')) {
        element.classList.remove('unexplored');
        element.classList.add('exploredAnimation');

        //play sounds/new.mp3
        //playSoundEffekt("sounds/new.wav");
    }

    //get previous element
    let previousElement = element.previousElementSibling;
    if (previousElement && previousElement.classList.contains('unexplored')) {
        element.classList.add('hidden');
    }else {
        element.classList.remove('hidden');
    }
}

function updateShop() {
    shopItems.forEach(updateShopItemElement);
}

function updateIncomePerSecondElement() {
    document.getElementById('income-per-second').innerText = formatMoney(getMoneyPerSecondWithClicks()) + '/s';
}

function createShop() {
    const shopElement = document.getElementById('skills');

    shopElement.innerHTML = '';

    shopItems.forEach(shopItem => {
        shopElement.appendChild(createShopItemElement(shopItem));
    });

    //add a info element at the end
    const infoElement = document.createElement('div');
    infoElement.classList.add('info');
    infoElement.classList.add('skill');
    infoElement.innerText = 'Kaufe Skills, um weitere zu entdecken.';
    shopElement.appendChild(infoElement);
}

createShop();
loadGame();

function getMoneyPerSecondOfShopItem(shopItem) {
    return shopItem.generateMoneyPerSecond * (shopItemsBought[shopItem.name] ? shopItemsBought[shopItem.name] : 0);
}

function getMoneyPerSecond() {
    return shopItems.reduce((sum, shopItem) => sum + getMoneyPerSecondOfShopItem(shopItem), 0);
}

function getMoneyPerSecondWithClicks() {
    let lastClicksSum = lastClicks.reduce((sum, click) => sum + click, 0);
    return getMoneyPerSecond() + lastClicksSum / 10;
}

function getFormattedTimeTo(futureTimestamp) {

    if (!futureTimestamp) {
        return '';
    }

    let currentTimestamp = Date.now();
    let timeDifference = futureTimestamp - currentTimestamp;
    let seconds = Math.floor(timeDifference / 1000);
    let minutes = Math.floor(seconds / 60);
    let hours = Math.floor(minutes / 60);
    let days = Math.floor(hours / 24);
    let weeks = Math.floor(days / 7);
    let months = Math.floor(weeks / 4);
    let years = Math.floor(months / 12);

    seconds = seconds % 60;
    minutes = minutes % 60;
    hours = hours % 24;
    days = days % 7;
    weeks = weeks % 4;
    months = months % 12;

    let length = 0;
    let formattedTime = '';
    if (years > 0 && length < 2) {
        formattedTime += years + 'y ';
        length++;
    }
    if (months > 0 && length < 2) {
        formattedTime += months + 'm ';
        length++;
    }
    if (weeks > 0 && length < 2) {
        formattedTime += weeks + 'w ';
        length++;
    }
    if (days > 0 && length < 2) {
        formattedTime += days + 'd ';
        length++;
    }
    if (hours > 0 && length < 2) {
        formattedTime += hours + 'h ';
        length++;
    }
    if (minutes > 0 && length < 2) {
        formattedTime += minutes + 'm ';
        length++;
    }
    if (seconds > 0 && length < 2) {
        formattedTime += seconds + 's';
        length++;
    }

    return formattedTime;
}

function getCalculatedTimeStampWhenReachableBalance(neededBalance) {
    let currentTimestamp = Date.now();
    let moneyPerSecond = getMoneyPerSecondWithClicks();

    if (moneyPerSecond === 0 || neededBalance <= currentBalance) {
        return false;
    }

    let timeDifference = (neededBalance - currentBalance) / moneyPerSecond * 1000;
    let futureTimestamp = currentTimestamp + timeDifference + 1000;

    if (futureTimestamp < currentTimestamp) {
        return false;
    }else{
        return futureTimestamp;
    }
}

setInterval(() => {
    addMoney(getMoneyPerSecond() / 10);
    updateIncomePerSecondElement();
    saveGame();

    //zu einer sehr kleinen Wahrscheinlichkeit fällt ein Superluna vom Himmel
    if (Math.random() < 0.00025) {
        spawnFallingSuperLuna();
    }

    updateShop()
}, 100);


let audio;
function startMusic() {
    if (localStorage.getItem('musik') && localStorage.getItem('musik') === 'false') {
        return;
    }

    audio = new Audio(soundTracks[Math.floor(Math.random() * soundTracks.length)]);
    audio.volume = document.getElementById('musik').value;
    audio.play().catch(error => {
        console.error('Error playing audio:', error);
    });

    audio.addEventListener('ended', function() {
        startMusic();
    });
}

function initiateMusicOnInteraction() {
    window.removeEventListener('click', initiateMusicOnInteraction);
    window.removeEventListener('keypress', initiateMusicOnInteraction);
    startMusic();
}

window.addEventListener('click', initiateMusicOnInteraction);
window.addEventListener('keypress', initiateMusicOnInteraction);

function formatMoney(amount) {
    const suffixes = [
        { value: 1e93, suffix: 'ba' },
        { value: 1e90, suffix: 'az' },
        { value: 1e87, suffix: 'ay' },
        { value: 1e84, suffix: 'ax' },
        { value: 1e81, suffix: 'aw' },
        { value: 1e78, suffix: 'av' },
        { value: 1e75, suffix: 'au' },
        { value: 1e72, suffix: 'at' },
        { value: 1e69, suffix: 'as' },
        { value: 1e66, suffix: 'ar' },
        { value: 1e63, suffix: 'aq' },
        { value: 1e60, suffix: 'ap' },
        { value: 1e57, suffix: 'ao' },
        { value: 1e54, suffix: 'an' },
        { value: 1e51, suffix: 'am' },
        { value: 1e48, suffix: 'al' },
        { value: 1e45, suffix: 'ak' },
        { value: 1e42, suffix: 'aj' },
        { value: 1e39, suffix: 'ai' },
        { value: 1e36, suffix: 'ah' },
        { value: 1e33, suffix: 'ag' },
        { value: 1e30, suffix: 'af' },
        { value: 1e27, suffix: 'ae' },
        { value: 1e24, suffix: 'ad' },
        { value: 1e21, suffix: 'ac' },
        { value: 1e18, suffix: 'ab' },
        { value: 1e15, suffix: 'aa' },
        { value: 1e12, suffix: 'T' },
        { value: 1e9, suffix: 'B' },
        { value: 1e6, suffix: 'M' },
        { value: 1e3, suffix: 'K' },
    ];

    for (let i = 0; i < suffixes.length; i++) {
        if (amount >= suffixes[i].value) {
            return (amount / suffixes[i].value).toFixed(2) + suffixes[i].suffix + ' €';
        }
    }

    return amount.toFixed(2) + ' €';
}

function setMoney(amount) {
  currentBalance = amount;
  document.getElementById('balance').innerText = formatMoney(Math.round(currentBalance));
}

function addMoney(amount) {
    setMoney(currentBalance + amount);
}

function removeMoney(amount) {
    setMoney(currentBalance - amount);
}

function summonFallingMoneyEffectAtCursor(amount) {

    if (localStorage.getItem('moneyEffect') === 'false') {
        return;
    }

    //count the amount of objects that are currently falling
    let fallingMoney = document.getElementsByClassName('falling-money').length;

    if (fallingMoney > 20) {
        return;
    }


    let cursorX = event ? event.clientX : window.innerWidth / 2;
    let cursorY = event ? event.clientY : window.innerHeight / 2;

    const cursor = document.createElement('div');
    cursor.innerText = '💸+' + formatMoney(amount);
    cursor.classList.add('falling-money');
    cursor.style.color = 'green';
    cursor.style.fontWeight = 'bold';
    cursor.style.fontFamily = 'Arial, sans-serif';
    cursor.style.position = 'fixed';
    cursor.style.left = cursorX + 'px';
    cursor.style.top = cursorY + 'px';
    cursor.style.transform = 'translate(-50%, -50%)';
    cursor.style.fontSize = '3em';
    cursor.style.pointerEvents = 'none';
    cursor.style.zIndex = '99';
    cursor.style.wordBreak = 'keep-all';
    cursor.style.whiteSpace = 'nowrap';
    cursor.style.textShadow = '3px 3px 2px #303030FF';
    document.body.appendChild(cursor);

    let verticalSpeed = - Math.random() * 4 - 4;
    let horizontalSpeed = Math.random() * 6 - 3;
    const gravity = Math.random() * 0.2 + 0.1;

    function animate() {
        if (cursor.offsetTop > window.innerHeight) {
            cursor.remove();
        } else {
            cursor.style.top = cursor.offsetTop + verticalSpeed + 'px';
            cursor.style.left = cursor.offsetLeft + horizontalSpeed + 'px';
            verticalSpeed += gravity;
            requestAnimationFrame(animate);
        }
    }

    animate();
}

function spawnFallingSuperLuna(){
    let cursorX = Math.random() * window.innerWidth;
    let cursorY = 0;

    const cursor = document.createElement('div');
    cursor.style.backgroundImage = 'url("img/superluna.png")';
    cursor.style.backgroundSize = 'cover';
    cursor.style.backgroundPosition = 'center';
    cursor.classList.add('falling-collectible');
    cursor.style.position = 'fixed';
    cursor.style.left = cursorX + 'px';
    cursor.style.top = cursorY + 'px';
    cursor.style.transform = 'translate(-50%, -50%)';
    cursor.style.width = '100px';
    cursor.style.height = '100px';
    cursor.style.pointerEvents = 'click';
    cursor.style.zIndex = '99';
    cursor.style.animation = 'featherFall 2s infinite linear';
    cursor.addEventListener('click', () => {
        cursor.remove();
        addMoney(getMoneyPerSecond() * 60);
        summonFallingMoneyEffectAtCursor(getMoneyPerSecond() * 60);
        playSoundEffekt("sounds/clickSuperLuna.wav");
    });
    document.body.appendChild(cursor);

    //move down slowly
    let verticalSpeed = 1;

    function animate() {
        if (cursor.offsetTop > window.innerHeight) {
            cursor.remove();
        } else {
            cursor.style.top = cursor.offsetTop + verticalSpeed + 'px';
            requestAnimationFrame(animate);
        }
    }

    animate();
}

document.getElementById('clicker').addEventListener('mousedown', () => {
    addMoney(getMoneyPerSecond() / 5 + 1);
    summonFallingMoneyEffectAtCursor(getMoneyPerSecond() / 5 + 1);
    lastClicks.push(getMoneyPerSecond() / 5 + 1);
    setTimeout(() => {
        lastClicks.shift();
    }, 1000);
});

document.getElementById('reset').addEventListener('click', () => {
    //ask for confirmation
    if (confirm('Möchtest du wirklich dein Spiel zurücksetzen?')) {
        localStorage.clear();
        resetGame();
    }
});

document.getElementById('reset-settings').addEventListener('click', () => {
    //ask for confirmation
    if (confirm('Möchtest du wirklich deine Einstellungen zurücksetzen?')) {
        localStorage.clear();
        saveGame();
        window.location.reload();
    }
});

document.getElementById('settings-icon').addEventListener('click', () => {
    document.getElementById('settings').classList.toggle('settingsVisible');
});

//wenn außerhalb des Settings-Menüs geklickt wird, wird es geschlossen wenn es geöffnet ist
document.addEventListener('click', (e) => {
    if (!document.getElementById('settings').contains(e.target) && document.getElementById('settings').classList.contains('settingsVisible')) {
        document.getElementById('settings').classList.remove('settingsVisible');
    }
});

document.getElementById('settings-close').addEventListener('click', () => {
    document.getElementById('settings').classList.remove('settingsVisible');
});

document.getElementById('color-theme').addEventListener('input', () => {
    const r = document.querySelector(':root');
    r.style.setProperty('--clicker-color', document.getElementById('color-theme').value);
    localStorage.setItem('color-theme', document.getElementById('color-theme').value);
});

document.getElementById('always-show-timer-checkbox').addEventListener('change', () => {
    const checked = document.getElementById('always-show-timer-checkbox').checked;
    document.getElementById('skills').classList.toggle('alwaysShowTimer', checked);
    localStorage.setItem('always-show-timer', checked);
});

document.getElementById('backgrounds').addEventListener('click', function (e) {
    if (e.target.tagName === 'IMG') {
        const r = document.querySelector(':root');
        r.style.setProperty('--background', 'url(' + e.target.src + ')');
        localStorage.setItem('background', e.target.src);
    }
});

document.getElementById('moneyEffect').addEventListener('click', () => {
    const checked = document.getElementById('moneyEffect').checked;
    localStorage.setItem('moneyEffect', checked);
});

//slider
document.getElementById('musik').addEventListener('input', () => {
    const value = document.getElementById('musik').value;
    document.getElementById('musikValue').textContent = Math.round(value * 100) + '%';
    localStorage.setItem('musik', value);
    audio.volume = value;
    if (value > 0 && audio.paused) {
        startMusic();
    }else if (value === '0' && !audio.paused) {
        audio.pause();
    }
});

//slider
document.getElementById('sound').addEventListener('change', () => {playSoundEffekt("sounds/new.wav");});
document.getElementById('sound').addEventListener('input', () => {
    const value = document.getElementById('sound').value;
    document.getElementById('soundValue').textContent = Math.round(value * 100) + '%';
    localStorage.setItem('sound', value);
});

let skills = document.getElementById('skills');
let scrollTarget = skills.scrollLeft;
let startTouchX = 0;

// Event-Listener für das Mausrad
skills.addEventListener('wheel', function(e) {
    if (e.deltaY != 0) {
        e.preventDefault();
        scrollTarget += e.deltaY;
    }
});

// Event-Listener für Touch-Events
skills.addEventListener('touchstart', function(e) {
    startTouchX = e.touches[0].clientX;
});

skills.addEventListener('touchmove', function(e) {
    let touchX = e.touches[0].clientX;
    let deltaX = startTouchX - touchX;
    startTouchX = touchX;
    scrollTarget += deltaX * 2.5;
    e.preventDefault();
});

function lerp(start, end, t) {
    return start * (1 - t) + end * t;
}

function animate() {
    let maxScroll = skills.scrollWidth - skills.clientWidth;
    if (scrollTarget < 0) scrollTarget = 0;
    if (scrollTarget > maxScroll) scrollTarget = maxScroll;
    skills.scrollLeft = lerp(skills.scrollLeft, scrollTarget, 0.1);
    requestAnimationFrame(animate);
}

animate();

const skillsetTab = document.getElementById('skillset');
const skillsetTabTitle = skillsetTab.querySelector('.title');
skillsetTabTitle.addEventListener('click', () => {
    skillsetTab.classList.toggle('tabVisible');
    document.getElementById('scene').classList.toggle('tabOpen');
});