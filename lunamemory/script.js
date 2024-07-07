let cardAmount = 10;

//rechtsklick wird zu linksklick
document.addEventListener('contextmenu', event => {
    event.preventDefault();
    event.target.click();
});


const cardImageLinks = []
//cardImageLinks mit Bildern füllen aus images und ein "../" voranstellen
getImagesOfType("object").forEach(imageLink => {
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
        if (card.classList.contains('open')) return;
        if (getOpenCards().length >= 2) return;
        if (card.classList.contains('matched')) return;

        card.classList.add('open');

        const openCards = getOpenCards();
        if (openCards.length === 2) {
            const [firstCard, secondCard] = openCards;
            if (firstCard.dataset.imageLink === secondCard.dataset.imageLink) {
                openCards.forEach(card => {
                    setTimeout(() => {
                        card.classList.remove('open');
                        card.classList.add('matched');

                        if (isAllMatched()) {
                            setTimeout(() => {
                                openSelectionStartScreen()
                            }, 1000);
                        }
                    }, 750);
                });
            } else {
                setTimeout(() => {
                    closeOpenCards();
                }, 1500);
            }
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
    document.getElementById('cards').innerHTML = '';

    const randomImageLinks = getRandomImageLinks(cardAmount);

    randomImageLinks.forEach(imageLink => {
        addCardToCards(imageLink);
        addCardToCards(imageLink);
    });

    shuffleCards();
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
        placeCards();
    });

    const multiplayerButton = document.createElement('button');
    multiplayerButton.classList.add('multiplayer-button');
    multiplayerButton.innerHTML = 'Multiplayer <i class="fas fa-user"></i><i class="fas fa-user"></i>';
    multiplayerButton.addEventListener('click', () => {
        background.remove();
        placeCards();
    });

    const singleplayerButton = document.createElement('button');
    singleplayerButton.classList.add('singleplayer-button');
    singleplayerButton.innerHTML = 'Singleplayer <i class="fas fa-user"></i>';
    singleplayerButton.addEventListener('click', () => {
        background.remove();
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
    cardAmountInput.max = 20;
    cardAmountInput.value = cardAmount;
    cardAmountInput.addEventListener('change', () => {
        cardAmount = cardAmountInput.value;
    });
    selectionStartScreen.appendChild(cardAmountInput);

    background.appendChild(selectionStartScreen);

    document.body.appendChild(background);
}

openSelectionStartScreen()