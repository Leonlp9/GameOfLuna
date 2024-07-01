let currentBalance = 0;
const shopItems = [
    {
        name: 'Kaninchen',
        startPrice: 10,
        priceIncrease: 1.1,
        generateMoneyPerSecond: 0.25,
        generateMoneyIncrease: 1.05,
    },
    {
        name: 'Rollerblades',
        startPrice: 250,
        priceIncrease: 1.1,
        generateMoneyPerSecond: 12.5,
        generateMoneyIncrease: 1.05,
    },
    {
        name: 'Laptop',
        startPrice: 1500,
        priceIncrease: 1.1,
        generateMoneyPerSecond: 150,
        generateMoneyIncrease: 1.05,
    },
    {
        name: 'Informatik',
        startPrice: 10000,
        priceIncrease: 1.2,
        generateMoneyPerSecond: 1000,
        generateMoneyIncrease: 1.1,
    },
    {
        name: 'RAM',
        startPrice: 50000,
        priceIncrease: 1.2,
        generateMoneyPerSecond: 5000,
        generateMoneyIncrease: 1.1,
    },
    {
        name: 'Speicherkarte',
        startPrice: 1000000,
        priceIncrease: 1.2,
        generateMoneyPerSecond: 100000,
        generateMoneyIncrease: 1.1,
    },
    {
        name: 'Lenkrad',
        startPrice: 75000000,
        priceIncrease: 1.3,
        generateMoneyPerSecond: 5000000,
        generateMoneyIncrease: 1.15,
    },
    {
        name: 'Pedale',
        startPrice: 1000000000,
        priceIncrease: 1.3,
        generateMoneyPerSecond: 25500000,
        generateMoneyIncrease: 1.15,
    },
    {
        name: 'Schalthebel',
        startPrice: 10000000000,
        priceIncrease: 1.3,
        generateMoneyPerSecond: 100000000,
        generateMoneyIncrease: 1.15,
    },
    {
        name: 'Laptopkühler',
        startPrice: 100000000000,
        priceIncrease: 1.4,
        generateMoneyPerSecond: 500000000,
        generateMoneyIncrease: 1.2,
    },
    {
        name: 'Grafikkarte',
        startPrice: 750000000000,
        priceIncrease: 1.4,
        generateMoneyPerSecond: 2500000000,
        generateMoneyIncrease: 1.2,
    },
    {
        name: 'Führerschein',
        startPrice: 10000000000000,
        priceIncrease: 1.4,
        generateMoneyPerSecond: 10000000000,
        generateMoneyIncrease: 1.2,
    },
    {
        name: 'Auto',
        startPrice: 100000000000000,
        priceIncrease: 1.5,
        generateMoneyPerSecond: 50000000000,
        generateMoneyIncrease: 1.25,
    },
    {
        name: 'Autolift',
        startPrice: 1000000000000000,
        priceIncrease: 1.5,
        generateMoneyPerSecond: 250000000000,
        generateMoneyIncrease: 1.25,
    },
    {
        name: 'Garage',
        startPrice: 10000000000000000,
        priceIncrease: 1.5,
        generateMoneyPerSecond: 15000000000000,
        generateMoneyIncrease: 1.25,
    },
    {
        name: 'Werkstatt',
        startPrice: 100000000000000000,
        priceIncrease: 1.6,
        generateMoneyPerSecond: 250000000000000,
        generateMoneyIncrease: 1.3,
    },
    {
        name: 'Autohaus',
        startPrice: 1000000000000000000,
        priceIncrease: 1.6,
        generateMoneyPerSecond: 5000000000000000,
        generateMoneyIncrease: 1.3,
    },
    {
        name: 'Automarke',
        startPrice: 10000000000000000000,
        priceIncrease: 1.6,
        generateMoneyPerSecond: 100000000000000000,
        generateMoneyIncrease: 1.3,
    }
];
const upgrades = [
    {
        name: 'Finger',
        description: 'Erhöht die Menge an Geld, die du pro Klick erhältst.',
        price: 1,
        increase: 4,
    },
    {
        name: 'Kaffeemaschine',
        description: 'Dein Kaffeerausch hält länger an.',
        price: 2,
        increase: 1.1,
    },
    {
        name: "Superluna",
        description: "Die Monde welche vom Himmel fallen, geben dir mehr Geld.",
        price: 3,
        increase: 1.1,
    },
    {
        name: 'IDE',
        description: 'Erhöht enorm die Menge an Geld, die du pro Sekunde durch Laptop und Informatik erhältst.',
        price: 1,
        increase: 1.1,
    },
    {
        name: 'Ginger',
        description: 'Erhöht die Menge an Geld, die du pro Sekunde erhältst.',
        price: 2,
        increase: 6,
    }
];
const skins = [
    {
        name: 'Standard',
        url: 'img/skins/clicker.png',
        requiredPerSecond: 0,
    },
    {
        name: 'Allergie-Luna',
        url: 'img/skins/allergie.png',
        requiredPerSecond: 1000,
    },
    {
        name: 'Gacha-Luna',
        url: 'img/skins/gacha.png',
        requiredPerSecond: 10000,
    },
    {
        name: 'Minecraft-Luna',
        url: 'img/skins/minecraft.png',
        requiredPerSecond: 100000,
    },
    {
        name: 'Racing-Luna',
        url: 'img/skins/race.png',
        requiredPerSecond: 10000000000000000,
    },
    {
        name: 'Kobold-Luna',
        url: 'img/skins/kobold.png',
        requiredPerSecond: 10000000000000000,
    },
    {
        name: 'Business-Luna',
        url: 'img/skins/business.png',
        requiredPerSecond: 10000000000000000,
    },
    {
        name: 'Biker-Luna',
        url: 'img/skins/biker.png',
        requiredPerSecond: 10000000000000000,
    },
    {
        name: 'Ulna Reykenbrek',
        url: 'img/skins/ulna.png',
        requiredPerSecond: 10000000000000000,
    }
];
let selectedSkin = 'Standard';
let shopItemsBought = {};
let lastClicks = [];
let soundTracks = [
    "sounds/musik/SoundTrack1.mp3",
    "sounds/musik/SoundTrack2.mp3",
    "sounds/musik/SoundTrack3.mp3",
    "sounds/musik/SoundTrack4.mp3",
    "sounds/musik/SoundTrack5.mp3",
    "sounds/musik/SoundTrack6.mp3",
    "sounds/musik/SoundTrack7.mp3",
];
let audio;

function saveGame() {
    localStorage.setItem('currentBalance', currentBalance);
    localStorage.setItem('shopItemsBought', JSON.stringify(shopItemsBought));
}

function loadGame() {
    registerTab('skillSetTabTitle', 'skills', 'Skillset');
    registerTab('upgradesTabTitle', 'upgrades', 'Upgrades');
    registerTab('skinsTabTitle', 'skins', 'Skins');
    createShop();
    createUpgrades();
    createSkins();

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

    setSkin(localStorage.getItem('skin') || 'Standard');

    window.addEventListener('click', initiateMusicOnInteraction);
    window.addEventListener('keypress', initiateMusicOnInteraction);

    let sound = localStorage.getItem('sound');
    if (sound) {
        document.getElementById('sound').value = sound;
    }else {
        sound = document.getElementById('sound').value;
    }
    document.getElementById('soundValue').textContent = Math.round(sound * 100) + '%';

    buildBackgrounds();

    setInterval(() => {
        addMoney(getMoneyPerSecond() / 10);
        updateIncomePerSecondElement();
        saveGame();

        //zu einer sehr kleinen Wahrscheinlichkeit fällt ein Superluna vom Himmel
        if (Math.random() < 0.00025) {
            spawnFallingSuperLuna();
        }

        updateShop()
        updateSkins()
    }, 100);

    settingEvents();
}

function setSkin(skin) {
    selectedSkin = skin;

    skins.forEach(skin => {
        document.getElementById("skin-" + skin.name).classList.remove('selected');
    });
    document.getElementById("skin-" + skin).classList.add('selected');

    document.getElementById('clicker').style.backgroundImage = `url('${skins.find(s => s.name === skin).url}')`;

    localStorage.setItem('skin', skin);
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

        setTimeout(() => {
            element.classList.remove('exploredAnimation');
        }, 600);
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

function createUpgradeElement(upgrade) {
    const element = document.createElement('div');
    element.classList.add('upgrade');

    const nameElement = document.createElement('div');
    nameElement.classList.add('upgrade-name');
    nameElement.innerText = upgrade.name;
    element.appendChild(nameElement);

    const iconElement = document.createElement('div');
    iconElement.classList.add('upgrade-icon');

    //check if the image exists
    const img = new Image();
    img.src = `img/${upgrade.name.toLowerCase()}.png`;
    img.onload = () => {
        iconElement.style.backgroundImage = `url('img/${upgrade.name.toLowerCase()}.png')`;
    };
    img.onerror = () => {
        iconElement.style.backgroundImage = 'url("img/loading.png")';
    }
    element.appendChild(iconElement);

    const priceElement = document.createElement('div');
    priceElement.classList.add('upgrade-price');
    priceElement.innerText = upgrade.price + ' R.';
    element.appendChild(priceElement);

    const descriptionElement = document.createElement('div');
    descriptionElement.classList.add('upgrade-description');
    descriptionElement.innerText = upgrade.description;
    element.appendChild(descriptionElement);

    descriptionElement.addEventListener('click', () => {
        customInfoScreen(upgrade.name, upgrade.description);
    });

    return element;
}

function createUpgrades() {
    const upgradesElement = document.getElementById('upgrades');

    upgradesElement.innerHTML = '';

    const rebirthElement = document.createElement('div');
    rebirthElement.classList.add('upgrade');
    rebirthElement.classList.add('rebirth');
    rebirthElement.addEventListener('click', () => {
        customConfirm('Rebirth', 'Möchtest du wirklich rebirthen? Du wirst all dein Geld und Skills verlieren aber erhältst dafür Rebirth-Punkte, die du in Upgrades investieren kannst.', 'Ja', 'Nein', () => {
            currentBalance = 0;
            shopItemsBought = {};
            saveGame();
            window.location.reload();
        });
    });

    const rebirthTitleElement = document.createElement('div');
    rebirthTitleElement.classList.add('rebirth-name');
    rebirthTitleElement.innerText = 'Rebirth';
    rebirthElement.appendChild(rebirthTitleElement);

    const rebirthIconElement = document.createElement('i');
    rebirthIconElement.classList.add('fas');
    rebirthIconElement.classList.add('fa-fw');
    rebirthIconElement.classList.add('fa-redo-alt');
    rebirthTitleElement.appendChild(rebirthIconElement);

    const rebirthGetRebirthPointsElement = document.createElement('div');
    rebirthGetRebirthPointsElement.classList.add('rebirth-description');
    rebirthGetRebirthPointsElement.innerText = 'Erhalte Rebirth-Punkte (Soon)';
    rebirthElement.appendChild(rebirthGetRebirthPointsElement);

    upgradesElement.appendChild(rebirthElement);

    upgrades.forEach(upgrade => {
        upgradesElement.appendChild(createUpgradeElement(upgrade));
    });

}

function createSkinElement(skin) {
    const element = document.createElement('div');
    element.classList.add('skin');
    element.id = 'skin-' + skin.name;

    if (skin.name === selectedSkin) {
        element.classList.add('selected');
    }

    const nameElement = document.createElement('div');
    nameElement.classList.add('skin-name');
    nameElement.innerText = skin.name;
    element.appendChild(nameElement);

    const iconElement = document.createElement('div');
    iconElement.classList.add('skin-icon');

    //check if the image exists
    const img = new Image();
    img.src = skin.url;
    img.onload = () => {
        iconElement.style.backgroundImage = `url('${skin.url}')`;

        element.addEventListener('click', () => {
            if (skin.requiredPerSecond <= getMoneyPerSecond()) {
                setSkin(skin.name);
            }
        });
    }
    img.onerror = () => {
        iconElement.style.backgroundImage = 'url("img/loading.png")';
    }

    element.appendChild(iconElement);

    const neededPerSecondElement = document.createElement('div');
    neededPerSecondElement.classList.add('skin-required-per-second');
    neededPerSecondElement.innerText = 'Benötigt: ' + formatMoney(skin.requiredPerSecond) + '/s';
    element.appendChild(neededPerSecondElement);

    return element;
}

function createSkins() {
    const skinsElement = document.getElementById('skins');

    skinsElement.innerHTML = '';

    skins.forEach(skin => {
        skinsElement.appendChild(createSkinElement(skin));
    });
}

function updateSkinElement(skin) {
    const element = document.getElementById('skin-' + skin.name);
    if (skin.requiredPerSecond <= getMoneyPerSecond() && element.classList.contains('locked')) {
        element.classList.remove('locked');
        setSkin(skin.name)
    }else if (skin.requiredPerSecond > getMoneyPerSecond() && !element.classList.contains('locked')) {
        element.classList.add('locked');
    }
}

function updateSkins() {
    skins.forEach(updateSkinElement);
}

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
//TODO class

    if (localStorage.getItem('moneyEffect') === 'false') {
        return;
    }

    //count the amount of objects that are currently falling
    let fallingMoney = document.getElementsByClassName('falling-money').length;

    if (fallingMoney > 20) {
        return;
    }


    let cursorX = event.clientX ? event.clientX : window.innerWidth / 2;
    let cursorY = event.clientY ? event.clientY : window.innerHeight / 2;

    const cursor = document.createElement('div');
    cursor.innerText = '💸+' + formatMoney(amount);
    cursor.classList.add('falling-money');
    cursor.classList.add('falling-object');

    cursor.style.left = cursorX + 'px';
    cursor.style.top = cursorY + 'px';

    cursor.style.pointerEvents = 'none';

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
    //TODO class
    let cursorX = Math.random() * window.innerWidth;
    let cursorY = 0;

    const cursor = document.createElement('div');
    cursor.style.backgroundImage = 'url("img/superluna.png")';
    cursor.classList.add('falling-collectible');
    cursor.classList.add('falling-object');

    cursor.style.left = cursorX + 'px';
    cursor.style.top = cursorY + 'px';

    cursor.style.width = '100px';
    cursor.style.height = '100px';
    cursor.style.pointerEvents = 'click';
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

function customConfirm(title, message, confirmText, cancelText, confirmCallback) {

    const overlay = document.createElement('div');
    overlay.classList.add('confirm-overlay');

    const content = document.createElement('div');
    content.classList.add('confirm-overlay-content');

    const titleElement = document.createElement('div');
    titleElement.classList.add('confirm-overlay-title');
    titleElement.innerText = title;
    content.appendChild(titleElement);

    const textElement = document.createElement('div');
    textElement.classList.add('confirm-overlay-text');
    textElement.innerText = message;
    content.appendChild(textElement);

    const buttonsElement = document.createElement('div');
    buttonsElement.classList.add('confirm-overlay-buttons');

    const yesElement = document.createElement('div');
    yesElement.classList.add('confirm-overlay-yes');
    yesElement.innerText = confirmText;
    yesElement.addEventListener('click', () => {
        overlay.remove();
        confirmCallback();
    });
    buttonsElement.appendChild(yesElement);

    const noElement = document.createElement('div');
    noElement.classList.add('confirm-overlay-no');
    noElement.innerText = cancelText;
    noElement.addEventListener('click', () => {
        overlay.remove();
    });
    buttonsElement.appendChild(noElement);

    content.appendChild(buttonsElement);
    overlay.appendChild(content);

    document.body.appendChild(overlay);
}

function customInfoScreen(title, message) {

    const overlay = document.createElement('div');
    overlay.classList.add('confirm-overlay');

    const content = document.createElement('div');
    content.classList.add('confirm-overlay-content');

    const titleElement = document.createElement('div');
    titleElement.classList.add('confirm-overlay-title');
    titleElement.innerText = title;
    content.appendChild(titleElement);

    const textElement = document.createElement('div');
    textElement.classList.add('confirm-overlay-text');
    textElement.innerText = message;
    content.appendChild(textElement);

    const buttonsElement = document.createElement('div');
    buttonsElement.classList.add('confirm-overlay-buttons');

    const okElement = document.createElement('div');
    okElement.classList.add('confirm-overlay-yes');
    okElement.innerText = 'OK';
    okElement.addEventListener('click', () => {
        overlay.remove();
    });
    buttonsElement.appendChild(okElement);

    content.appendChild(buttonsElement);
    overlay.appendChild(content);

    document.body.appendChild(overlay);
}

function userKlick() {
    addMoney(getMoneyPerSecond() / 5 + 1);
    summonFallingMoneyEffectAtCursor(getMoneyPerSecond() / 5 + 1);
    lastClicks.push(getMoneyPerSecond() / 5 + 1);
    setTimeout(() => {
        lastClicks.shift();
    }, 1000);
}

function settingEvents() {
    document.getElementById('clicker').addEventListener('mousedown', () => {
        userKlick();
    });
    document.getElementById('clicker').addEventListener('contextmenu', (e) => {
        e.preventDefault();
    });
    //wenn leertaste gedrückt wird, wird ein Klick simuliert
    document.addEventListener('keyup', (e) => {
        if (e.key === ' ') {
            userKlick();
        }
    });

    document.getElementById('reset').addEventListener('click', () => {
        customConfirm('Reset Game', 'Möchtest du wirklich dein Spiel zurücksetzen?', 'Ja', 'Nein', () => {
            localStorage.clear();
            resetGame();
        });
    });

    document.getElementById('reset-settings').addEventListener('click', () => {
        customConfirm('Reset Settings', 'Möchtest du wirklich deine Einstellungen zurücksetzen?', 'Ja', 'Nein', () => {
            localStorage.removeItem('color-theme');
            localStorage.removeItem('always-show-timer');
            localStorage.removeItem('background');
            localStorage.removeItem('moneyEffect');
            localStorage.removeItem('musik');
            localStorage.removeItem('sound');
            saveGame();
            window.location.reload();
        });
    });

    document.getElementById('settings-icon').addEventListener('click', () => {
        document.getElementById('settings').classList.toggle('settingsVisible');
    });

//wenn außerhalb des Settings-Menüs geklickt wird, wird es geschlossen wenn es geöffnet ist
    document.addEventListener('click', (e) => {
        if (!document.getElementById('settings').contains(e.target) && document.getElementById('settings').classList.contains('settingsVisible')) {

            //außer es das geklickte Element hat die Klasse confirm-overlay oder ist ein Kind davon
            if (e.target.classList.contains('confirm-overlay') || e.target.closest('.confirm-overlay')) {
                return;
            }

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
        } else if (value === '0' && !audio.paused) {
            audio.pause();
        }
    });

//slider
    document.getElementById('sound').addEventListener('change', () => {
        playSoundEffekt("sounds/new.wav");
    });
    document.getElementById('sound').addEventListener('input', () => {
        const value = document.getElementById('sound').value;
        document.getElementById('soundValue').textContent = Math.round(value * 100) + '%';
        localStorage.setItem('sound', value);
    });
}

function scrollManager(id) {
    let skills = document.getElementById(id);
    let scrollTarget = skills.scrollLeft;
    let startTouchX = 0;
    skills.addEventListener('wheel', function(e) {
        if (e.deltaY !== 0) {
            e.preventDefault();
            scrollTarget += e.deltaY;
        }
    });
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
}

function registerTab(tabTitleId, tabContentId, titleText) {
    const tabs = document.getElementById('tabs');
    const tabTitle = document.createElement('div');
    tabTitle.id = tabTitleId;
    tabTitle.classList.add('title');
    tabTitle.innerText = titleText;
    document.getElementById("tabsTitles").appendChild(tabTitle);

    const tabContent = document.createElement('div');
    tabContent.id = tabContentId;
    tabContent.classList.add('tab-content');
    document.getElementById("tabContents").appendChild(tabContent);

    //wenn tabContents nur einen Tab hat, wird dieser automatisch geöffnet
    if (document.getElementById("tabContents").children.length === 1) {
        tabContent.classList.add('tabVisible');
    }

    tabTitle.addEventListener('click', () => {

        if (!tabTitle.classList.contains('tabActive')) {
            //alle Tabs schließen
            tabs.querySelectorAll('.tab-content').forEach(tab => {
                tab.classList.remove('tabVisible');
            });
            tabs.querySelectorAll('.title').forEach(tab => {
                tab.classList.remove('tabActive');
            });

            //ausgewählten Tab öffnen
            tabContent.classList.toggle('tabVisible');
            tabTitle.classList.toggle('tabActive');
            tabs.classList.add('tabVisible');
            document.getElementById('scene').classList.add('tabOpen');
        }else {
            //tab schließen
            tabTitle.classList.remove('tabActive');
            tabs.classList.remove('tabVisible');
            document.getElementById('scene').classList.remove('tabOpen');
        }

    });

    scrollManager(tabContentId);
}

loadGame();