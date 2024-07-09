let cardAmount = 9;
let isStarted = false;
let mode = 'singleplayer';
let botDifficulty = 'easy';
let whoIsPlaying = 'player1';
let points = {
    player1: 0,
    player2: 0,
    bot: 0
}

//rechtsklick wird zu linksklick
document.addEventListener('contextmenu', event => {
    event.preventDefault();
    event.target.click();
});


const cardImageLinks = []
//cardImageLinks mit Bildern füllen aus images und ein "../" voranstellen
getImagesOfTypes(["object", "skin"]).forEach(imageLink => {
    cardImageLinks.push('../' + imageLink);
});

//get random image links with amount of parameter, no duplicates
function getRandomImageLinks(amount) {
    if (amount > cardImageLinks.length) throw new Error('Amount is greater than the amount of available card image links');

    const randomImageLinks = [];
    while (randomImageLinks.length < amount) {
        const randomIndex = Math.floor(Math.random() * cardImageLinks.length);
        const randomImageLink = cardImageLinks[randomIndex];
        if (!randomImageLinks.includes(randomImageLink)) {
            randomImageLinks.push(randomImageLink);
        }
    }
    return randomImageLinks;
}

function setOtherPlayer() {
    if (mode === 'multiplayer') {
        whoIsPlaying = whoIsPlaying === 'player1' ? 'player2' : 'player1';

        setTimeout(() => {
            playSwitchToPlayerAnimation(whoIsPlaying === 'player1' ? 'Spieler 1\nist drann!' : 'Spieler 2\nist drann!')
        }, 500);

    }else if (mode === 'bot') {
        whoIsPlaying = whoIsPlaying === 'player1' ? 'bot' : 'player1';
        if (botDifficulty === 'medium') {
            forgetOneRandomCard();
        }

        setTimeout(() => {
            playSwitchToPlayerAnimation(whoIsPlaying === 'player1' ? 'Spieler\nist drann!' : 'Bot\nist drann!')
        }, 500);
    }else if (mode === 'singleplayer') {
        whoIsPlaying = 'player1';
    }
}

function checkOpenCards() {
    const openCards = getOpenCards();
    const [firstCard, secondCard] = openCards;
    if (firstCard.dataset.imageLink === secondCard.dataset.imageLink) {
        openCards.forEach(card => {
            setTimeout(() => {
                card.classList.remove('open');
                card.classList.add('matched');

                if (isAllMatched()) {
                    setTimeout(() => {
                        isStarted = false;
                        openSelectionStartScreen()
                    }, 1000);
                }
            }, 750);
        });

        setTimeout(() => {
            if (mode === 'multiplayer' || mode === 'bot') {
                points[whoIsPlaying] += 1;
                document.getElementById(whoIsPlaying + 'Points').textContent = points[whoIsPlaying];
            }
        });

    } else {
        setOtherPlayer();
        setTimeout(() => {
            closeOpenCards();

            if (mode === 'bot') {
                setTimeout(() => {
                    botPlay();
                }, 1000);
            }
        }, 2000);
    }
}

function addCardToCards(cardImageLink) {
    const card = document.createElement('div');
    card.classList.add('card');

    card.dataset.imageLink = cardImageLink;

    card.innerHTML = `
                <div class="front"></div>
                <div class="back">
                    <img src="${cardImageLink}" alt="Back">
                </div>
            `;
    document.getElementById('cards').appendChild(card);

    card.addEventListener('click', () => {
        if (whoIsPlaying === 'bot') return;
        if (!isStarted) return;
        if (card.classList.contains('open')) return;
        if (getOpenCards().length >= 2) return;
        if (card.classList.contains('matched')) return;

        openCard(card);

        const openCards = getOpenCards();
        if (openCards.length === 2) {
            checkOpenCards();
        }
    });
}

function shuffleCards() {
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        const randomIndex = Math.floor(Math.random() * cards.length);
        const randomCard = cards[randomIndex];
        card.parentNode.insertBefore(randomCard, card);
    });
}

function placeCards(){
    //delete all cards
    seenCards = {};
    points = {
        player1: 0,
        player2: 0,
        bot: 0
    }
    document.getElementById('cards').innerHTML = '';

    const randomImageLinks = getRandomImageLinks(cardAmount);

    randomImageLinks.forEach(imageLink => {
        addCardToCards(imageLink);
        addCardToCards(imageLink);
    });

    shuffleCards();

    setTimeout(() => {
        playSwitchToPlayerAnimation('Spieler 1\nist drann!')
    },500)

    const tafel = document.getElementById("punkteTafel")
    tafel.innerHTML = ""

    //tafel mit spieler 1 und spieler 2 füllen oder bot
    if (mode === 'multiplayer') {
        const player1 = document.createElement('div');
        player1.classList.add('player1');
        player1.innerHTML = 'Spieler 1: <span id="player1Points">0</span>';
        tafel.appendChild(player1);

        const player2 = document.createElement('div');
        player2.classList.add('player2');
        player2.innerHTML = 'Spieler 2: <span id="player2Points">0</span>';
        tafel.appendChild(player2);
    }
    if (mode === 'bot') {
        const player1 = document.createElement('div');
        player1.classList.add('player1');
        player1.innerHTML = 'Spieler: <span id="player1Points">0</span>';
        tafel.appendChild(player1);

        const bot = document.createElement('div');
        bot.classList.add('bot');
        bot.classList.add(botDifficulty);
        bot.innerHTML = 'Bot: <span id="botPoints">0</span>';
        tafel.appendChild(bot);
    }
}

function getOpenCards() {
    return Array.from(document.querySelectorAll('.card.open'));
}

function closeOpenCards() {
    getOpenCards().forEach(card => {
        card.classList.remove('open');
    });
}

function isAllMatched() {
    return document.querySelectorAll('.card.matched').length === document.querySelectorAll('.card').length;
}

function openSelectionStartScreen() {
    isStarted = false;

    const background = document.createElement('div');
    background.classList.add('background');

    const selectionStartScreen = document.createElement('div');
    selectionStartScreen.classList.add('selection-start-screen');

    const title = document.createElement('h1');
    title.textContent = 'Memory';
    selectionStartScreen.appendChild(title);

    const buttons = document.createElement('div');
    buttons.classList.add('buttons');
    selectionStartScreen.appendChild(buttons);

    const botButton = document.createElement('button');
    botButton.classList.add('bot-button');
    botButton.innerHTML = 'Bot <i class="fas fa-robot"></i>';
    botButton.addEventListener('click', () => {
        background.remove();
        mode = 'bot';
        whoIsPlaying = 'player1';

        openAskMenu("Schwierigkeit", ['Easy', 'Medium', 'Hard', 'Expert'], [
            () => {
                botDifficulty = 'easy';
                isStarted = true;
                placeCards();
            },
            () => {
                botDifficulty = 'medium';
                isStarted = true;
                placeCards();
            },
            () => {
                botDifficulty = 'hard';
                isStarted = true;
                placeCards();
            },
            () => {
                botDifficulty = 'expert';
                isStarted = true;
                placeCards();
            }
        ],
        [
            'Der Bot wird zufällig Karten öffnen',
            'Der Bot wird bekannte Paare bevorzugen und zufällig Karten öffnen aber nach jedem Spieler wechsel eine Zufällige Karte vergeßen',
            'Der Bot wird bekannte Paare bevorzugen und zufällig Karten öffnen',
            'Der Bot wird bekannte Paare bevorzugen und zufällig Karten öffnen welche er noch nicht gesehen hat'
        ],
        [
            '#68b668',
            '#f1c40f',
            '#e74c3c',
            '#8e44ad'
        ]
        );

    });

    const multiplayerButton = document.createElement('button');
    multiplayerButton.classList.add('multiplayer-button');
    multiplayerButton.innerHTML = 'Multiplayer <i class="fas fa-user"></i><i class="fas fa-user"></i>';
    multiplayerButton.addEventListener('click', () => {
        background.remove();
        mode = 'multiplayer';
        whoIsPlaying = 'player1';
        isStarted = true;
        placeCards();
    });

    const singleplayerButton = document.createElement('button');
    singleplayerButton.classList.add('singleplayer-button');
    singleplayerButton.innerHTML = 'Singleplayer <i class="fas fa-user"></i>';
    singleplayerButton.addEventListener('click', () => {
        background.remove();
        mode = 'singleplayer';
        whoIsPlaying = 'player1';
        isStarted = true;
        placeCards();
    });

    buttons.appendChild(botButton);
    buttons.appendChild(multiplayerButton);
    buttons.appendChild(singleplayerButton);

    const label = document.createElement('label');
    label.textContent = 'Card Amount:';
    label.htmlFor = 'card-amount-input';
    selectionStartScreen.appendChild(label);

    const cardAmountInput = document.createElement('input');
    cardAmountInput.id = 'card-amount-input';
    cardAmountInput.type = 'number';
    cardAmountInput.min = 2;
    cardAmountInput.max = cardImageLinks.length;
    cardAmountInput.value = cardAmount;
    cardAmountInput.addEventListener('change', () => {
        cardAmount = cardAmountInput.value;
    });
    selectionStartScreen.appendChild(cardAmountInput);

    background.appendChild(selectionStartScreen);

    document.body.appendChild(background);
}

function openAskMenu(title, buttonTitles, buttonCallbacks, descriptions, colors) {
    const background = document.createElement('div');
    background.classList.add('background');

    const askMenu = document.createElement('div');
    askMenu.classList.add('ask-menu');

    const askMenuTitle = document.createElement('h1');
    askMenuTitle.textContent = title;
    askMenu.appendChild(askMenuTitle);

    const askMenuButtons = document.createElement('div');
    askMenuButtons.classList.add('ask-menu-buttons');

    buttonTitles.forEach((buttonTitle, index) => {
        const button = document.createElement('button');
        button.textContent = buttonTitle;
        button.addEventListener('click', () => {
            background.remove();
            askMenu.remove();
            buttonCallbacks[index]();
        });
        button.title = descriptions[index];
        if (colors) {
            button.style.backgroundColor = colors[index];
            button.style.color = 'white';
            button.style.fontWeight = 'bold';
            button.style.textShadow = '1px 1px 1px black';
        }
        askMenuButtons.appendChild(button);
    });

    askMenu.appendChild(askMenuButtons);

    background.appendChild(askMenu);

    document.body.appendChild(background);
}

let seenCards = {}; // Store the seen cards

function openCard(element) {
    if (!element) return; // Ensure the element is valid
    element.classList.add('open');
    // Add card to seenCards
    const imageLink = element.dataset.imageLink;
    if (!seenCards[imageLink]) {
        seenCards[imageLink] = [];
    }
    if (!seenCards[imageLink].includes(element)) seenCards[imageLink].push(element);
}

function forgetOneRandomCard() {
    //lösche eine zufällige karte aus seenCards welche noch nicht matched ist
    const imageLinks = Object.keys(seenCards);
    const notMatchedImageLinks = imageLinks.filter(imageLink => {
        const cards = seenCards[imageLink];
        return !cards.some(card => card.classList.contains('matched'));
    });
    if (notMatchedImageLinks.length === 0) return;
    const randomImageLink = notMatchedImageLinks[Math.floor(Math.random() * notMatchedImageLinks.length)];
    const cards = seenCards[randomImageLink];
    const randomCard = cards[Math.floor(Math.random() * cards.length)];
    seenCards[randomImageLink] = cards.filter(card => card !== randomCard);
}

function getRemainingCards() {
    return Array.from(document.querySelectorAll('.card:not(.matched):not(.open)'));
}

let interval = null;

function getRemainingCardsNotSeen() {
    const remainingCards = getRemainingCards();
    return remainingCards.filter(card => {
        const imageLink = card.dataset.imageLink;
        return !seenCards[imageLink];
    });
}

// bot jede sekunde eine karte öffnen
function botPlay() {
    if (whoIsPlaying === 'bot') {
        if (!isStarted) return;
        if (getOpenCards().length >= 2) return;

        let cardToOpen = null;

        if (botDifficulty === 'expert' || botDifficulty === 'hard' || botDifficulty === 'medium') {
            //check ob es 2 gleiche karten gibt im seenCards
            const imageLinks = Object.keys(seenCards);
            imageLinks.forEach(imageLink => {
                //wenn es 2 gleiche karten gibt und eine der beiden oder beide nicht offen sind und beide nicht matched haben, dann öffne die karte der beiden, welche noch kein open hat und wenn beide kein open haben dann öffne eine zufällige
                if (seenCards[imageLink].length === 2) {
                    const [firstCard, secondCard] = seenCards[imageLink];
                    if (!firstCard.classList.contains('open') && !firstCard.classList.contains('matched')) {
                        cardToOpen = firstCard;
                    } else if (!secondCard.classList.contains('open') && !secondCard.classList.contains('matched')) {
                        cardToOpen = secondCard;
                    }
                }
            });
        }

        if (botDifficulty === 'expert') {
            if (!cardToOpen) {
                //eine zufällige karte öffnen, von dennen die noch nicht in seenCards sind
                const notMatchedCards = getRemainingCardsNotSeen();
                cardToOpen = notMatchedCards[Math.floor(Math.random() * notMatchedCards.length)];
            }
        }

        if (botDifficulty === 'easy' || !cardToOpen) {
            if (!cardToOpen){
                const notMatchedCards = getRemainingCards();
                cardToOpen = notMatchedCards[Math.floor(Math.random() * notMatchedCards.length)];
            }
        }

        if (cardToOpen) {
            openCard(cardToOpen);
        }

        if (interval) clearInterval(interval);
        interval = setInterval(() => {
            botPlay();
        }, 1250);

        if (getOpenCards().length >= 2) {
            checkOpenCards()
        }
    }
}

function playSwitchToPlayerAnimation(text){
    const circle = document.createElement('div');
    circle.classList.add('circle');
    circle.classList.add(whoIsPlaying)
    if (mode === 'bot') {
        circle.classList.add(botDifficulty);
    }

    document.body.appendChild(circle);

    circle.innerText = text;

    //nach 3s löschen
    setTimeout(() => {
        circle.remove()
    }, 3000)
}

openSelectionStartScreen()