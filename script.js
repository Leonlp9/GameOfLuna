/*++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// Variables
*++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/
const shopItems = [
    {
        name: 'Kaninchen',
        startPrice: 12,
        priceIncrease: 1.18,
        generateMoneyPerSecond: 0.6,
        generateMoneyIncrease: 1.12,
    },
    {
        name: 'Rollerblades',
        startPrice: 420,
        priceIncrease: 1.25,
        generateMoneyPerSecond: 20,
        generateMoneyIncrease: 1.14,
    },
    {
        name: 'Laptop',
        startPrice: 2750,
        priceIncrease: 1.27,
        generateMoneyPerSecond: 250,
        generateMoneyIncrease: 1.16,
    },
    {
        name: 'Informatik',
        startPrice: 18250,
        priceIncrease: 1.30,
        generateMoneyPerSecond: 1700,
        generateMoneyIncrease: 1.18,
    },
    {
        name: 'RAM',
        startPrice: 90000,
        priceIncrease: 1.32,
        generateMoneyPerSecond: 8000,
        generateMoneyIncrease: 1.20,
    },
    {
        name: 'Speicherkarte',
        startPrice: 1800000,
        priceIncrease: 1.35,
        generateMoneyPerSecond: 160000,
        generateMoneyIncrease: 1.22,
    },
    {
        name: 'Lenkrad',
        startPrice: 105000000,
        priceIncrease: 1.38,
        generateMoneyPerSecond: 6000000,
        generateMoneyIncrease: 1.24,
    },
    {
        name: 'Pedale',
        startPrice: 1650000000,
        priceIncrease: 1.41,
        generateMoneyPerSecond: 32000000,
        generateMoneyIncrease: 1.26,
    },
    {
        name: 'Schalthebel',
        startPrice: 22000000000,
        priceIncrease: 1.43,
        generateMoneyPerSecond: 160000000,
        generateMoneyIncrease: 1.28,
    },
    {
        name: 'Laptopkühler',
        startPrice: 275000000000,
        priceIncrease: 1.46,
        generateMoneyPerSecond: 800000000,
        generateMoneyIncrease: 1.30,
    },
    {
        name: 'Grafikkarte',
        startPrice: 1150000000000,
        priceIncrease: 1.48,
        generateMoneyPerSecond: 4000000000,
        generateMoneyIncrease: 1.32,
    },
    {
        name: 'Führerschein',
        startPrice: 25000000000000,
        priceIncrease: 1.50,
        generateMoneyPerSecond: 17000000000,
        generateMoneyIncrease: 1.34,
    },
    {
        name: 'Auto',
        startPrice: 375000000000000,
        priceIncrease: 1.52,
        generateMoneyPerSecond: 85000000000,
        generateMoneyIncrease: 1.36,
    },
    {
        name: 'Autolift',
        startPrice: 6500000000000000,
        priceIncrease: 1.55,
        generateMoneyPerSecond: 420000000000,
        generateMoneyIncrease: 1.38,
    },
    {
        name: 'Garage',
        startPrice: 120000000000000000,
        priceIncrease: 1.57,
        generateMoneyPerSecond: 25000000000000,
        generateMoneyIncrease: 1.40,
    },
    {
        name: 'Werkstatt',
        startPrice: 1750000000000000000,
        priceIncrease: 1.60,
        generateMoneyPerSecond: 500000000000000,
        generateMoneyIncrease: 1.42,
    },
    {
        name: 'Autohaus',
        startPrice: 22500000000000000000,
        priceIncrease: 1.62,
        generateMoneyPerSecond: 10000000000000000,
        generateMoneyIncrease: 1.44,
    },
    {
        name: 'Automarke',
        startPrice: 600000000000000000000,
        priceIncrease: 1.65,
        generateMoneyPerSecond: 200000000000000000,
        generateMoneyIncrease: 1.46,
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
        url: 'img/skins/clicker.webp',
        requiredPerSecond: 0,
    },
    {
        name: 'Allergie-Luna',
        url: 'img/skins/allergie.webp',
        requiredPerSecond: 1000,
    },
    {
        name: 'Gacha-Luna',
        url: 'img/skins/gacha.webp',
        requiredPerSecond: 10000,
    },
    {
        name: 'Minecraft-Luna',
        url: 'img/skins/minecraft.webp',
        requiredPerSecond: 100000,
    },
    {
        name: 'Racing-Luna',
        url: 'img/skins/race.webp',
        requiredPerSecond: 1e301,
    },
    {
        name: 'Kobold-Luna',
        url: 'img/skins/kobold.webp',
        requiredPerSecond: 1e301,
    },
    {
        name: 'Business-Luna',
        url: 'img/skins/business.webp',
        requiredPerSecond: 1e301,
    },
    {
        name: 'Biker-Luna',
        url: 'img/skins/biker.webp',
        requiredPerSecond: 1e301,
    },
    {
        name: 'Ulna Reykenbrek',
        url: 'img/skins/ulna.webp',
        requiredPerSecond: 1e301,
    }
];
const soundTracks = [
    "sounds/musik/SoundTrack1.mp3",
    "sounds/musik/SoundTrack2.mp3",
    "sounds/musik/SoundTrack3.mp3",
    "sounds/musik/SoundTrack4.mp3",
    "sounds/musik/SoundTrack5.mp3",
    "sounds/musik/SoundTrack6.mp3",
    "sounds/musik/SoundTrack7.mp3",
];
const defaultSettings = {
    keepVariables: {
        "rebirthsPoints": 0.0,
        "settings": {
            "color-theme": "#f75218",
            "always-show-timer": false,
            "background": "img/bg1.png",
            "moneyEffect": true,
            "musik": 0.5,
            "sound": 0.75,
        }
    },
    resetVariables: {
        "currentBalance": 0.0,
        "selectedSkin": "Standard",
        "shopItemsBought": {},
    }
}

let game = {}

let lastClicks = [];
let audio;
let eventsAdded = false;
/*+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/



/*++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    Game
*++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/
/**
 * Speichert das Spiel
 */
function saveGame() {
    localStorage.setItem('game', JSON.stringify(game));
}

/**
 * Lädt das Spiel
 */
function loadGame() {
    const r = document.querySelector(':root');

    game = JSON.parse(localStorage.getItem('game')) || {};
    game.resetVariables = Object.assign({}, defaultSettings.resetVariables, game.resetVariables);
    game.keepVariables = Object.assign({}, defaultSettings.keepVariables, game.keepVariables);
    game.keepVariables.settings = Object.assign({}, defaultSettings.keepVariables.settings, game.keepVariables.settings);

    createSettings();
    registerTab('skillSetTabTitle', 'skills', 'Skillset');
    registerTab('upgradesTabTitle', 'upgrades', 'Upgrades');
    registerTab('skinsTabTitle', 'skins', 'Skins');
    createShop();
    createUpgrades();
    createSkins();

    updateIncomePerSecondElement();

    document.getElementById('skills').classList.toggle('alwaysShowTimer', getSetting('always-show-timer'));

    const background = getSetting('background');
    r.style.setProperty('--background', 'url(' + background + ')');

    setSkin(game.resetVariables.selectedSkin);

    if (!eventsAdded) {
        window.addEventListener('click', initiateMusicOnInteraction);
        window.addEventListener('keypress', initiateMusicOnInteraction);
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
        updateSkins()
    }, 100);

    if (!eventsAdded) {
        settingEvents();
        eventsAdded = true;
    }
}

/**
 * Lösche das Spiel
 */
function resetGame() {
    game.resetVariables = defaultSettings.resetVariables;
    saveGame();
    loadGame();
}

/**
 * Speichert das Spiel in einer Datei
 */
function downloadGame() {
    const a = document.createElement('a');
    a.href = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(game));
    a.download = 'game.json';
    a.click();
}

/**
 * Lädt das Spiel von einer Datei
 */
function uploadGame() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    input.onchange = () => {
        const file = input.files[0];
        const reader = new FileReader();
        reader.onload = () => {
            game = JSON.parse(reader.result || '{}');
            saveGame();
            audio.pause();
            loadGame();
            startMusic();
        }
        reader.readAsText(file);
    }
    input.click();
}
/*+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/



/*++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    Settings
 *++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/
/**
 * Creates a save in the settings
 * @param key
 * @param value
 */
function saveToSettings(key, value) {
    game.keepVariables.settings[key] = value;
    saveGame();
}

/**
 * Gets a setting from the settings
 * @param key
 * @returns {*}
 */
function getSetting(key) {
    return game.keepVariables.settings[key];
}
/*+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/



/*++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    Sounds
*++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/
/**
 * Plays a sound effect
 * @param sound
 */
function playSoundEffekt(sound) {
    if (getSetting('sound') && getSetting('sound') === false) {
        return;
    }

    let audio = new Audio(sound);
    audio.volume = document.getElementById('sound').value;
    audio.play().then();
}

/**
 * Starts the music
 */
function startMusic() {
    if (getSetting('musik') && getSetting('musik') === false) {
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

/**
 * Adds the event listener to start the music
 */
function initiateMusicOnInteraction() {
    window.removeEventListener('click', initiateMusicOnInteraction);
    window.removeEventListener('keypress', initiateMusicOnInteraction);
    startMusic();
}
/*+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/



/*++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    Create Elements
 *++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/
/**
 * Creates the shop
 */
function createShop() {
    const shopElement = document.getElementById('skills');

    shopElement.innerHTML = '';

    shopItems.forEach(shopItem => {
        shopElement.appendChild(createShopItemElement(shopItem));
    });

    //add an info element at the end
    const infoElement = document.createElement('div');
    infoElement.classList.add('info');
    infoElement.classList.add('skill');
    infoElement.innerText = 'Kaufe Skills, um weitere zu entdecken.';
    shopElement.appendChild(infoElement);

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
        img.onload = () => {
            iconElement.style.backgroundImage = `url('img/${shopItem.name.toLowerCase()}.png')`;
        };
        img.onerror = (event => {
            iconElement.style.backgroundImage = 'url("img/loading.png")';
            event.preventDefault();
        });
        img.src = `img/${shopItem.name.toLowerCase()}.png`;

        iconElement.classList.add('skill-icon');
        element.appendChild(iconElement);

        element.addEventListener('click', () => {
            const price = Math.round(shopItem.startPrice * Math.pow(shopItem.priceIncrease, game.resetVariables.shopItemsBought[shopItem.name] ? game.resetVariables.shopItemsBought[shopItem.name] : 0));
            if (game.resetVariables.currentBalance >= price) {

                if (!game.resetVariables.shopItemsBought[shopItem.name]) {
                    game.resetVariables.shopItemsBought[shopItem.name] = 1;
                }else {
                    game.resetVariables.shopItemsBought[shopItem.name]++;
                }
                removeMoney(price);

                updateShop();

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
        priceElementText.innerText = formatMoney(Math.round(shopItem.startPrice * Math.pow(shopItem.priceIncrease, game.resetVariables.shopItemsBought[shopItem.name] ? game.resetVariables.shopItemsBought[shopItem.name] : 0)));
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
        amountElement.innerText = game.resetVariables.shopItemsBought[shopItem.name];

        element.appendChild(amountElement);

        return element;
    }

    updateShop();
}

/**
 * Updates the shop
 */
function updateShop() {
    shopItems.forEach(updateShopItemElement);

    function updateShopItemElement(shopItem) {
        const element = document.getElementById(shopItem.name);
        const priceElement = element.querySelector('.skill-price-text');
        const amountElement = element.querySelector('.skill-amount');
        const timerElement = element.querySelector('.skill-timer');
        priceElement.innerText = formatMoney(Math.round(shopItem.startPrice * Math.pow(shopItem.priceIncrease, game.resetVariables.shopItemsBought[shopItem.name] ? game.resetVariables.shopItemsBought[shopItem.name] : 0)));
        priceElement.style.color = game.resetVariables.currentBalance >= Math.round(shopItem.startPrice * Math.pow(shopItem.priceIncrease, game.resetVariables.shopItemsBought[shopItem.name] ? game.resetVariables.shopItemsBought[shopItem.name] : 0)) ? 'green' : 'red';
        amountElement.innerText = game.resetVariables.shopItemsBought[shopItem.name] ? game.resetVariables.shopItemsBought[shopItem.name] : '';
        timerElement.innerText = getFormattedTimeTo(getCalculatedTimeStampWhenReachableBalance(Math.round(shopItem.startPrice * Math.pow(shopItem.priceIncrease, game.resetVariables.shopItemsBought[shopItem.name] ? game.resetVariables.shopItemsBought[shopItem.name] : 0))));
        if (!game.resetVariables.shopItemsBought[shopItem.name] || game.resetVariables.shopItemsBought[shopItem.name] === 0 && !element.classList.contains('unexplored')) {
            element.classList.add('unexplored');
        }else if (game.resetVariables.shopItemsBought[shopItem.name] > 0 && element.classList.contains('unexplored')) {
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
}

/**
 * Creates the upgrades
 */
function createUpgrades() {
    const upgradesElement = document.getElementById('upgrades');

    upgradesElement.innerHTML = '';

    const rebirthElement = document.createElement('div');
    rebirthElement.classList.add('upgrade');
    rebirthElement.classList.add('rebirth');
    rebirthElement.addEventListener('click', () => {
        customConfirm('Rebirth', 'Möchtest du wirklich ein rebirth machen? Du wirst all dein Geld und Skills verlieren aber erhältst dafür Rebirth-Punkte, die du in Upgrades investieren kannst.', 'Ja', 'Nein', () => {
            game.resetVariables = defaultSettings.resetVariables;

            //Todo berechnen wie viele punkte gegeben werden sollen
            game.keepVariables.rebirthsPoints++;

            saveGame();
            loadGame();
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
        img.onload = () => {
            iconElement.style.backgroundImage = `url('img/${upgrade.name.toLowerCase()}.png')`;
        };
        img.onerror = (event => {
            iconElement.style.backgroundImage = 'url("img/loading.png")';
            //disable console error
            event.preventDefault();
        });
        img.src = `img/${upgrade.name.toLowerCase()}.png`;
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

    updateUpgrades();
}

/**
 * Updates the upgrades
 */
function updateUpgrades() {

}

/**
 * Creates the skins
 */
function createSkins() {
    const skinsElement = document.getElementById('skins');

    skinsElement.innerHTML = '';

    skins.forEach(skin => {
        skinsElement.appendChild(createSkinElement(skin));
    });

    function createSkinElement(skin) {
        const element = document.createElement('div');
        element.classList.add('skin');
        element.id = 'skin-' + skin.name;

        if (skin.name === game.resetVariables.selectedSkin) {
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
        }
        img.onerror = () => {
            iconElement.style.backgroundImage = 'url("img/loading.png")';
        }

        element.addEventListener('click', () => {
            if (skin.requiredPerSecond <= getMoneyPerSecond()) {
                setSkin(skin.name);
                playSoundEffekt("sounds/select.wav")
            }else {
                playSoundEffekt("sounds/error.mp3")
            }
        });

        element.appendChild(iconElement);

        const neededPerSecondElement = document.createElement('div');
        neededPerSecondElement.classList.add('skin-required-per-second');
        neededPerSecondElement.innerText = 'Benötigt: ' + formatMoney(skin.requiredPerSecond) + '/s';
        element.appendChild(neededPerSecondElement);

        return element;
    }
}

/**
 * Updates the skins
 */
function updateSkins() {
    skins.forEach(updateSkinElement);

    function updateSkinElement(skin) {
        const element = document.getElementById('skin-' + skin.name);
        if (skin.requiredPerSecond <= getMoneyPerSecond() && element.classList.contains('locked')) {
            element.classList.remove('locked');
            setSkin(skin.name)
        }else if (skin.requiredPerSecond > getMoneyPerSecond() && !element.classList.contains('locked')) {
            element.classList.add('locked');
        }
    }

}
/*+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/



/*++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    Helper Functions
*++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/
/**
 * Gets the money per second of a shop item
 * @param shopItem
 * @returns {number}
 */
function getMoneyPerSecondOfShopItem(shopItem) {
    return shopItem.generateMoneyPerSecond * (game.resetVariables.shopItemsBought[shopItem.name] ? game.resetVariables.shopItemsBought[shopItem.name] : 0);
}

/**
 * Gets the money per second
 * @returns {number}
 */
function getMoneyPerSecond() {
    return shopItems.reduce((sum, shopItem) => sum + getMoneyPerSecondOfShopItem(shopItem), 0);
}

/**
 * Gets the money per second with user clicks
 * @returns {number}
 */
function getMoneyPerSecondWithClicks() {
    let lastClicksSum = lastClicks.reduce((sum, click) => sum + click, 0);
    return getMoneyPerSecond() + lastClicksSum;
}

/**
 * Gets the formatted time to a future timestamp
 * @param futureTimestamp
 * @returns {string}
 */
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

/**
 * Gets the calculated timestamp when the balance is reachable
 * @param neededBalance
 * @returns {number|boolean}
 */
function getCalculatedTimeStampWhenReachableBalance(neededBalance) {
    let currentTimestamp = Date.now();
    let moneyPerSecond = getMoneyPerSecondWithClicks();

    if (moneyPerSecond === 0 || neededBalance <= game.resetVariables.currentBalance) {
        return false;
    }

    let timeDifference = (neededBalance - game.resetVariables.currentBalance) / moneyPerSecond * 1000;
    let futureTimestamp = currentTimestamp + timeDifference + 1000;

    if (futureTimestamp < currentTimestamp) {
        return false;
    }else{
        return futureTimestamp;
    }
}

/**
 * Updates the income per second element
 */
function updateIncomePerSecondElement() {
    document.getElementById('income-per-second').innerText = formatMoney(getMoneyPerSecondWithClicks()) + '/s';
}

/**
 * Set the Skin
 * @param skin
 */
function setSkin(skin) {
    game.resetVariables.selectedSkin = skin;

    skins.forEach(skin => {
        document.getElementById("skin-" + skin.name).classList.remove('selected');
    });
    document.getElementById("skin-" + skin).classList.add('selected');

    document.getElementById('clicker').style.backgroundImage = `url('${skins.find(s => s.name === skin).url}')`;
}

/**
 * Build the Backgrounds in the settings
 */
function buildBackgrounds(value, id) {
    const backgrounds = document.getElementById(id);
    backgrounds.innerHTML = '';
    const r = document.querySelector(':root');
    for (let i = 1; i <= 9; i++) {
        const input = document.createElement('input');
        input.type = 'radio';
        input.id = 'background' + i;
        input.name = 'background';
        input.value = 'background' + i;
        if (value === 'img/bg' + i + '.png') {
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

        input.addEventListener('change', () => {
            r.style.setProperty('--background', 'url(img/bg' + i + '.png)');
            saveToSettings('background', 'img/bg' + i + '.png');
        });
    }
}
/*+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/



/*++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
   Money System
++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/
/**
 * Formats a number to money string
 * @param amount
 * @returns {string}
 */
function formatMoney(amount) {
    const baseSuffixes = [
        { value: 1e12, suffix: 'T' },
        { value: 1e9, suffix: 'B' },
        { value: 1e6, suffix: 'M' },
        { value: 1e3, suffix: 'K' },
    ];

    const extendedSuffixes = [];
    const alphabet = 'abcdefghijklmnopqrstuvwxyz';

    let value = 1e15;
    for (let i = 0; i < alphabet.length; i++) {
        for (let j = 0; j < alphabet.length; j++) {
            extendedSuffixes.push({ value: value, suffix: alphabet[i] + alphabet[j] });
            value *= 1e3;
        }
    }

    const suffixes = [...extendedSuffixes.reverse(), ...baseSuffixes];

    for (let i = 0; i < suffixes.length; i++) {
        if (amount >= suffixes[i].value) {
            return (amount / suffixes[i].value).toFixed(2) + suffixes[i].suffix + ' €';
        }
    }

    return amount.toFixed(2) + ' €';
}

/**
 * Sets the money amount
 * @param amount
 */
function setMoney(amount) {
  game.resetVariables.currentBalance = amount;
  document.getElementById('balance').innerText = formatMoney(Math.round(game.resetVariables.currentBalance * 100) / 100);
}

/**
 * Adds money to the current balance
 * @param amount
 */
function addMoney(amount) {
    setMoney(game.resetVariables.currentBalance + amount);
}

/**
 * Removes money from the current balance
 * @param amount
 */
function removeMoney(amount) {
    setMoney(game.resetVariables.currentBalance - amount);
}
/*+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/



/*++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    Falling Effects
*++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/
/**
 * Summons a falling money effect at the cursor
 * @param amount
 */
function summonFallingMoneyEffectAtCursor(amount) {
    if (getSetting('moneyEffect') === false) {
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

/**
 * Summons a falling superluna randomly at the top of the screen
 */
function spawnFallingSuperLuna(){
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
/*+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/



/*++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    Custom Modals
*++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/
/**
 * Creates an overlay
 * @param title
 * @param message
 */
function createOverlay(title, message) {
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

    content.appendChild(buttonsElement);
    overlay.appendChild(content);

    return overlay;
}

/**
 * Creates a custom confirm modal
 * @param title
 * @param message
 * @param confirmText
 * @param cancelText
 * @param confirmCallback
 */
function customConfirm(title, message, confirmText, cancelText, confirmCallback) {
    playSoundEffekt("sounds/warning.wav")

    const overlay = createOverlay(title, message);
    const buttonsElement = overlay.querySelector('.confirm-overlay-buttons');

    const yesElement = document.createElement('div');
    yesElement.classList.add('confirm-overlay-yes');
    yesElement.innerText = confirmText;
    yesElement.addEventListener('click', () => {
        playSoundEffekt("sounds/select.wav")
        overlay.remove();
        confirmCallback();
    });
    buttonsElement.appendChild(yesElement);

    const noElement = document.createElement('div');
    noElement.classList.add('confirm-overlay-no');
    noElement.innerText = cancelText;
    noElement.addEventListener('click', () => {
        playSoundEffekt("sounds/select.wav")
        overlay.remove();
    });
    buttonsElement.appendChild(noElement);

    document.body.appendChild(overlay);
}

/**
 * Creates a custom info screen
 * @param title
 * @param message
 */
function customInfoScreen(title, message) {
    playSoundEffekt("sounds/select.wav");

    const overlay = createOverlay(title, message);
    const buttonsElement = overlay.querySelector('.confirm-overlay-buttons');

    const okElement = document.createElement('div');
    okElement.classList.add('confirm-overlay-yes');
    okElement.innerText = 'OK';
    okElement.addEventListener('click', () => {
        playSoundEffekt("sounds/select.wav");
        overlay.remove();
    });
    buttonsElement.appendChild(okElement);

    document.body.appendChild(overlay);
}
/*+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/



/*++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    Settings
 *++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/
/**
 * Adds the events to the settings
 * @param title
 * @param id
 * @param value
 * @param changeCallback
 * @param inputCallback
 */
function createNewColorSelectionSetting(title, id, value, changeCallback, inputCallback) {
    const settings = document.getElementById('settings-content');

    const container = document.createElement('div');
    container.id = id + '-container';
    container.classList.add('setting-container');
    container.classList.add('color');
    settings.appendChild(container);

    const label = document.createElement('label');
    label.htmlFor = id;
    label.innerText = title;
    container.appendChild(label);

    const input = document.createElement('input');
    input.type = 'color';
    input.id = id;
    input.value = value;
    container.appendChild(input);

    input.addEventListener('change', () => changeCallback(input));
    input.addEventListener('input', () => inputCallback(input));

    inputCallback(input);
}

/**
 * Adds the events to the settings
 * @param title
 * @param id
 * @param checked
 * @param changeCallback
 */
function createNewCheckboxSetting(title, id, checked, changeCallback) {
    const settings = document.getElementById('settings-content');

    const container = document.createElement('div');
    container.id = id + '-container';
    container.classList.add('setting-container');
    container.classList.add('checkbox');
    settings.appendChild(container);

    const label = document.createElement('label');
    label.htmlFor = id;
    label.innerText = title;
    container.appendChild(label);

    const input = document.createElement('input');
    input.type = 'checkbox';
    input.id = id;
    input.checked = checked;
    input.addEventListener('change', () => changeCallback(input));
    container.appendChild(input);

}

/**
 * Adds the events to the settings
 * @param title
 * @param id
 * @param value
 * @param min
 * @param max
 * @param step
 * @param changeCallback
 * @param inputCallback
 */
function createNewRangeSetting(title, id, value, min, max, step, changeCallback, inputCallback) {
    const settings = document.getElementById('settings-content');

    const container = document.createElement('div');
    container.id = id + '-container';
    container.classList.add('setting-container');
    container.classList.add('range');
    settings.appendChild(container);

    const label = document.createElement('label');
    label.htmlFor = id;
    label.innerText = title + ': ' + Math.round(value * 100) + '%';
    container.appendChild(label);

    const input = document.createElement('input');
    input.type = 'range';
    input.id = id;
    input.min = min;
    input.max = max;
    input.step = step;
    input.value = value;
    input.addEventListener('change', () => changeCallback(input));
    input.addEventListener('input', () => {
        inputCallback(input);
        label.innerText = title + ': ' + Math.round(input.value * 100) + '%';
    });
    container.appendChild(input);
}

/**
 * Adds the events to the settings
 * @param title
 * @param id
 * @param clickCallback
 * @param isWarning
 */
function createNewButtonSetting(title, id, clickCallback, isWarning = false) {
    const settings = document.getElementById('settings-content');

    const container = document.createElement('div');
    container.id = id + '-container';
    container.classList.add('setting-container');
    container.classList.add('button');
    settings.appendChild(container);
    container.innerText = title;
    container.addEventListener('click', () => clickCallback(container));

    if (isWarning) {
        container.classList.add('warning');
    }
}

/**
 * Adds the events to the settings
 * @param title
 * @param id
 * @param value
 * @param fillCallback
 * @param changeCallback
 */
function createNewRadioSetting(title, id, value, fillCallback, changeCallback) {
    const settings = document.getElementById('settings-content');

    const container = document.createElement('div');
    container.id = id + '-container';
    container.classList.add('setting-container');
    container.classList.add('radio');
    settings.appendChild(container);

    const label = document.createElement('label');
    label.htmlFor = id;
    label.innerText = title;
    container.appendChild(label);

    const input = document.createElement('div');
    input.id = id;
    input.addEventListener('click', () => changeCallback(input));
    container.appendChild(input);

    fillCallback(value, id);

}

/**
 * Creates the settings
 */
function createSettings(){
    document.getElementById('settings-content').innerHTML = '';

    createNewColorSelectionSetting('Clicker Farbe', 'color-theme', getSetting('color-theme'), (input) => {
            playSoundEffekt("sounds/select.wav");
        },
        (input) => {
            const r = document.querySelector(':root');
            r.style.setProperty('--clicker-color', input.value);
            saveToSettings('color-theme', input.value);
        });

    createNewRadioSetting('Hintergrund', 'background', getSetting('background'), (value, id) => {
        buildBackgrounds(value, id);
    }, (input) => {});

    createNewCheckboxSetting('Immer Timer anzeigen', 'always-show-timer', getSetting('always-show-timer'), (input) => {
        playSoundEffekt("sounds/select.wav");
        const checked = input.checked;
        document.getElementById('skills').classList.toggle('alwaysShowTimer', checked);
        saveToSettings('always-show-timer', checked);
    });

    createNewCheckboxSetting('Geld Effekt', 'moneyEffect', getSetting('moneyEffect'), (input) => {
        playSoundEffekt("sounds/select.wav");
        saveToSettings('moneyEffect', input.checked);
    });

    createNewRangeSetting('Musik', 'musik', getSetting('musik'), 0, 1, 0.01, (input) => {
        playSoundEffekt("sounds/select.wav");
    }, (input) => {
        saveToSettings('musik', input.value);
        audio.volume = input.value;
        if (input.value > 0 && audio.paused) {
            startMusic();
        } else if (input.value === '0' && !audio.paused) {
            audio.pause();
        }
    });

    createNewRangeSetting('Sound', 'sound', getSetting('sound'), 0, 1, 0.01, (input) => {
        playSoundEffekt("sounds/select.wav");
    }, (input) => {
        saveToSettings('sound', input.value);
    });

    createNewButtonSetting('Spielstand herunterladen', 'download', (button) => {
        playSoundEffekt("sounds/select.wav");
        downloadGame();
    });

    createNewButtonSetting('Spielstand hochladen', 'upload', (button) => {
        playSoundEffekt("sounds/select.wav");
        uploadGame();
    });

    createNewButtonSetting('Reset Settings', 'reset-settings', (button) => {
        customConfirm('Reset Settings', 'Möchtest du wirklich deine Einstellungen zurücksetzen?', 'Ja', 'Nein', () => {
            game.keepVariables.settings = defaultSettings.keepVariables.settings;
            saveGame();
            loadGame();
            audio.pause();
            startMusic();
        });
    }, true);

    createNewButtonSetting('Reset Game', 'reset', (button) => {
        customConfirm('Reset Game', 'Möchtest du wirklich dein Spiel zurücksetzen?', 'Ja', 'Nein', () => {
            game.keepVariables.settings = defaultSettings.keepVariables.settings;
            resetGame();
        });
    }, true);
}
/*+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/




/**
 * This function sets the events
 */
function settingEvents() {

    /*++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
        Clicker
     *++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/
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
    /*+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/



    /*++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
        Settings menu
    *++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/
    document.getElementById('settings-icon').addEventListener('click', () => {
        document.getElementById('settings').classList.toggle('settingsVisible');
        playSoundEffekt("sounds/select.wav");
    });

    //wenn außerhalb des Settings-Menüs geklickt wird, wird es geschlossen, wenn es geöffnet ist
    document.addEventListener('click', (e) => {
        if (!document.getElementById('settings').contains(e.target) && document.getElementById('settings').classList.contains('settingsVisible')) {

            //außer es das geklickte Element hat die Klasse confirm-overlay oder ist ein Kind davon
            if (e.target.classList.contains('confirm-overlay') || e.target.closest('.confirm-overlay')) {
                return;
            }

            document.getElementById('settings').classList.remove('settingsVisible');

            playSoundEffekt("sounds/select.wav")
        }
    });

    document.getElementById('settings-close').addEventListener('click', () => {
        document.getElementById('settings').classList.remove('settingsVisible');
        playSoundEffekt("sounds/select.wav");
    });
    /*+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/

    /**
     * This function is called when the user clicks on the clicker
     */
    function userKlick() {
        addMoney(getMoneyPerSecond() / 5 + 1);
        summonFallingMoneyEffectAtCursor(getMoneyPerSecond() / 5 + 1);
        lastClicks.push(getMoneyPerSecond() / 5 + 1);
        setTimeout(() => {
            lastClicks.shift();
        }, 1000);
        playSoundEffekt("sounds/click.wav");
    }
}

/**
 * This function adds a smooth scrolling effect to the element with the given id
 * @param id
 */
function scrollManager(id) {
    let skills = document.getElementById(id);
    let scrollTarget = skills.scrollLeft;
    let startTouchX = 0;
    let lastScrollLeft = skills.scrollLeft;
    let lastTimestamp = Date.now();
    let speed = 0;

    // Event listener for wheel events
    skills.addEventListener('wheel', function(e) {
        if (e.deltaY !== 0 || e.deltaX !== 0) {
            e.preventDefault();
            scrollTarget += e.deltaY !== 0 ? e.deltaY : e.deltaX;
        }
    });

    // Event listener for touchstart events
    skills.addEventListener('touchstart', function(e) {
        startTouchX = e.touches[0].clientX;
    });

    // Event listener for touchmove events
    skills.addEventListener('touchmove', function(e) {
        let touchX = e.touches[0].clientX;
        let deltaX = startTouchX - touchX;
        startTouchX = touchX;
        scrollTarget += deltaX * 2.5;
        e.preventDefault();
    });

    // Linear interpolation function
    function lerp(start, end, t) {
        return start * (1 - t) + end * t;
    }

    // Calculate scroll speed
    function calculateSpeed() {
        let currentScrollLeft = skills.scrollLeft;
        let currentTime = Date.now();
        let distance = currentScrollLeft - lastScrollLeft;
        let time = currentTime - lastTimestamp;
        speed = Math.abs(distance / time);

        lastScrollLeft = currentScrollLeft;
        lastTimestamp = currentTime;
    }

    // Adjust vertical position based on speed
    function adjustVerticalPosition() {
        let elements = skills.children;
        let containerRect = skills.getBoundingClientRect();
        let centerX = containerRect.left + containerRect.width / 2;

        for (let element of elements) {
            let rect = element.getBoundingClientRect();
            let distanceFromCenter = Math.abs(rect.left + rect.width / 2 - centerX);
            let influence = Math.max(1 - distanceFromCenter / (containerRect.width / 2), 0);
            let offset = Math.min(speed * 20, 100) * (1-influence); // Adjust the factor to control vertical movement
            element.style.transform = `translateY(${offset}px)`;
        }
    }

    // Animation function for smooth scrolling and adjusting vertical position
    function animate() {
        let maxScroll = skills.scrollWidth - skills.clientWidth;
        if (scrollTarget < 0) scrollTarget = 0;
        if (scrollTarget > maxScroll) scrollTarget = maxScroll;
        skills.scrollLeft = lerp(skills.scrollLeft, scrollTarget, 0.1);
        calculateSpeed();
        adjustVerticalPosition();
        requestAnimationFrame(animate);
    }

    // Start the animation
    animate();
}

/**
 * Register a new tab with the given title and content
 * @param tabTitleId
 * @param tabContentId
 * @param titleText
 */
function registerTab(tabTitleId, tabContentId, titleText) {
    const tabs = document.getElementById('tabs');

    if (document.getElementById(tabTitleId) || document.getElementById(tabContentId)) {
        return;
    }

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
            playSoundEffekt("sounds/select.wav");
        }else {
            //tab schließen
            tabTitle.classList.remove('tabActive');
            tabs.classList.remove('tabVisible');
            document.getElementById('scene').classList.remove('tabOpen');
            playSoundEffekt("sounds/select.wav");
        }

    });

    scrollManager(tabContentId);
}

loadGame();