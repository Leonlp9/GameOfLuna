let currentBalance = 0;
const shopItems = [
    {
        name: 'Intelligenz',
        startPrice: 10,
        priceIncrease: 1.1,
        generateMoneyPerSecond: 0.25,
    },
    {
        name: 'Auto',
        startPrice: 250,
        priceIncrease: 1.1,
        generateMoneyPerSecond: 15,
    },
    {
        name: 'Haus',
        startPrice: 1500,
        priceIncrease: 1.2,
        generateMoneyPerSecond: 150,
    },
    {
        name: 'Yacht',
        startPrice: 10000,
        priceIncrease: 1.2,
        generateMoneyPerSecond: 1000,
    },
    {
        name: 'Flugzeug',
        startPrice: 50000,
        priceIncrease: 1.3,
        generateMoneyPerSecond: 5000,
    },
    {
        name: 'Raumschiff',
        startPrice: 1000000,
        priceIncrease: 1.3,
        generateMoneyPerSecond: 50000,
    },
    {
        name: 'Mond',
        startPrice: 100000000,
        priceIncrease: 1.4,
        generateMoneyPerSecond: 200000,
    },
    {
        name: 'Sonne',
        startPrice: 1000000000,
        priceIncrease: 1.4,
        generateMoneyPerSecond: 1050000,
    },
    {
        name: 'Galaxie',
        startPrice: 10000000000,
        priceIncrease: 1.5,
        generateMoneyPerSecond: 5000000,
    },
    {
        name: 'Universum',
        startPrice: 100000000000,
        priceIncrease: 1.5,
        generateMoneyPerSecond: 25000000,
    },
    {
        name: 'Gott',
        startPrice: 1000000000000,
        priceIncrease: 1.6,
        generateMoneyPerSecond: 100000000,
    },
    {
        name: 'Alles',
        startPrice: 10000000000000,
        priceIncrease: 1.6,
        generateMoneyPerSecond: 500000000,
    },
    {
        name: 'Nichts',
        startPrice: 100000000000000,
        priceIncrease: 1.7,
        generateMoneyPerSecond: 1000000000,
    },
    {
        name: 'Chaos',
        startPrice: 1000000000000000,
        priceIncrease: 1.7,
        generateMoneyPerSecond: 5000000000,
    },
    {
        name: 'Ordnung',
        startPrice: 10000000000000000,
        priceIncrease: 2.5,
        generateMoneyPerSecond: 10000000000,
    },
    {
        name: 'Zeit',
        startPrice: 100000000000000000,
        priceIncrease: 2.6,
        generateMoneyPerSecond: 25000000000,
    },
    {
        name: 'Raum',
        startPrice: 1000000000000000000,
        priceIncrease: 2.7,
        generateMoneyPerSecond: 50000000000,
    },
    {
        name: 'Materie',
        startPrice: 10000000000000000000,
        priceIncrease: 2.8,
        generateMoneyPerSecond: 100000000000,
    },
    {
        name: 'Energie',
        startPrice: 100000000000000000000,
        priceIncrease: 2.9,
        generateMoneyPerSecond: 250000000000,
    },
    {
        name: 'Bewusstsein',
        startPrice: 1000000000000000000000,
        priceIncrease: 3,
        generateMoneyPerSecond: 500000000000,
    },
    {
        name: 'Liebe',
        startPrice: 10000000000000000000000,
        priceIncrease: 3.1,
        generateMoneyPerSecond: 1000000000000,
    },
    {
        name: 'Glück',
        startPrice: 100000000000000000000000,
        priceIncrease: 3.2,
        generateMoneyPerSecond: 2500000000000,
    },
    {
        name: 'Frieden',
        startPrice: 1000000000000000000000000,
        priceIncrease: 3.3,
        generateMoneyPerSecond: 5000000000000,
    },
    {
        name: 'Freiheit',
        startPrice: 10000000000000000000000000,
        priceIncrease: 3.4,
        generateMoneyPerSecond: 10000000000000,
    },
    {
        name: 'Gerechtigkeit',
        startPrice: 100000000000000000000000000,
        priceIncrease: 3.5,
        generateMoneyPerSecond: 25000000000000,
    },
    {
        name: 'Wahrheit',
        startPrice: 1000000000000000000000000000,
        priceIncrease: 3.6,
        generateMoneyPerSecond: 75000000000000,
    },
    {
        name: 'Weisheit',
        startPrice: 10000000000000000000000000000,
        priceIncrease: 3.7,
        generateMoneyPerSecond: 80000000000000,
    },
    {
        name: 'Erkenntnis',
        startPrice: 100000000000000000000000000000,
        priceIncrease: 3.8,
        generateMoneyPerSecond: 80000000000000,
    },
    {
        name: 'Erfahrung',
        startPrice: 1000000000000000000000000000000,
        priceIncrease: 3.9,
        generateMoneyPerSecond: 80000000000000,
    },
    {
        name: 'Erinnerung',
        startPrice: 10000000000000000000000000000000,
        priceIncrease: 4,
        generateMoneyPerSecond: 80000000000000,
    },
    {
        name: 'Vergangenheit',
        startPrice: 100000000000000000000000000000000,
        priceIncrease: 4.1,
        generateMoneyPerSecond: 80000000000000,
    },
    {
        name: 'Gegenwart',
        startPrice: 1000000000000000000000000000000000,
        priceIncrease: 4.2,
        generateMoneyPerSecond: 80000000000000,
    },
    {
        name: 'Zukunft',
        startPrice: 10000000000000000000000000000000000,
        priceIncrease: 4.3,
        generateMoneyPerSecond: 80000000000000,
    },
    {
        name: 'Unendlichkeit',
        startPrice: 100000000000000000000000000000000000,
        priceIncrease: 4.4,
        generateMoneyPerSecond: 80000000000000,
    },
    {
        name: 'Ewigkeit',
        startPrice: 1000000000000000000000000000000000000,
        priceIncrease: 4.5,
        generateMoneyPerSecond: 80000000000000,
    },
    {
        name: 'Nirvana',
        startPrice: 10000000000000000000000000000000000000,
        priceIncrease: 4.6,
        generateMoneyPerSecond: 80000000000000,
    },
    {
        name: 'Paradies',
        startPrice: 100000000000000000000000000000000000000,
        priceIncrease: 4.7,
        generateMoneyPerSecond: 80000000000000,
    },
    {
        name: 'Himmel',
        startPrice: 1000000000000000000000000000000000000000,
        priceIncrease: 4.8,
        generateMoneyPerSecond: 80000000000000,
    },
    {
        name: 'Göttlichkeit',
        startPrice: 10000000000000000000000000000000000000000,
        priceIncrease: 4.9,
        generateMoneyPerSecond: 80000000000000,
    },
    {
        name: 'Ginger',
        startPrice: 100000000000000000000000000000000000000000,
        priceIncrease: 5,
        generateMoneyPerSecond: 80000000000000,
    },
];
let shopItemsBought = {};
let lastClicks = [];

function saveGame() {
    localStorage.setItem('currentBalance', currentBalance);
    localStorage.setItem('shopItemsBought', JSON.stringify(shopItemsBought));
}

function loadGame() {
    currentBalance = parseFloat(localStorage.getItem('currentBalance')) || 0;
    shopItemsBought = JSON.parse(localStorage.getItem('shopItemsBought')) || shopItemsBought;
    updateShop();
    updateIncomePerSecondElement();
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

    const nameElement = document.createElement('div');
    nameElement.classList.add('skill-name');
    nameElement.innerText = shopItem.name;
    element.appendChild(nameElement);

    const iconElement = document.createElement('div');
    iconElement.style.backgroundImage = `url('img/${shopItem.name.toLowerCase()}.png')`;
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
        }
    });

    const priceElement = document.createElement('div');
    priceElement.classList.add('skill-price');
    priceElement.innerText = formatMoney(Math.round(shopItem.startPrice * Math.pow(shopItem.priceIncrease, shopItemsBought[shopItem.name] ? shopItemsBought[shopItem.name] : 0)));
    element.appendChild(priceElement);

    //timer that shows how long it takes to buy the next item
    const timerElement = document.createElement('div');
    timerElement.classList.add('skill-timer');
    element.appendChild(timerElement);

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

function updateShopItemElement(shopItem) {
    const element = document.getElementById(shopItem.name);
    const priceElement = element.querySelector('.skill-price');
    const amountElement = element.querySelector('.skill-amount');
    const timerElement = element.querySelector('.skill-timer');
    priceElement.innerText = formatMoney(Math.round(shopItem.startPrice * Math.pow(shopItem.priceIncrease, shopItemsBought[shopItem.name] ? shopItemsBought[shopItem.name] : 0)));
    priceElement.style.color = currentBalance >= Math.round(shopItem.startPrice * Math.pow(shopItem.priceIncrease, shopItemsBought[shopItem.name] ? shopItemsBought[shopItem.name] : 0)) ? 'black' : 'red';
    amountElement.innerText = shopItemsBought[shopItem.name] ? shopItemsBought[shopItem.name] : '0';
    timerElement.innerText = getFormattedTimeTo(getCalculatedTimeStampWhenReachableBalance(Math.round(shopItem.startPrice * Math.pow(shopItem.priceIncrease, shopItemsBought[shopItem.name] ? shopItemsBought[shopItem.name] : 0))));
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
    addMoney(1);
    summonFallingMoneyEffectAtCursor(getMoneyPerSecond() / 4 + 1);
    lastClicks.push(getMoneyPerSecond() / 4 + 1);
    setTimeout(() => {
        lastClicks.shift();
    }, 1000);
});

document.getElementById('reset').addEventListener('click', () => {
    resetGame();
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
    scrollTarget += deltaX * 2;
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
   if (skillsetTab.classList.contains('tabVisible')) {
       skillsetTab.classList.remove('tabVisible');
   }else {
       skillsetTab.classList.add('tabVisible');
   }
});