
//rechtsklick wird zu linksklick
document.addEventListener('contextmenu', event => {
    event.preventDefault();
    event.target.click();
});


const cardImageLinks = [
    '../img/auto.png',
    '../img/informatik.png',
    '../img/kaffeemaschine.png',
    '../img/kaninchen.png',
    '../img/laptop.png',
    '../img/lenkrad.png',
    '../img/ram.png',
    '../img/rollerblades.png',
    '../img/speicherkarte.png',
    '../img/superluna.png',
    '../img/skins/sherlock.png',
    '../img/skins/race.png',
    '../img/skins/allergie.webp',
    '../img/skins/clicker.webp',
    '../img/skins/business.png',
]

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
}

function shuffleCards() {
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        const randomIndex = Math.floor(Math.random() * cards.length);
        const randomCard = cards[randomIndex];
        card.parentNode.insertBefore(randomCard, card);
    });
}

const randomImageLinks = getRandomImageLinks(10);

randomImageLinks.forEach(imageLink => {
    addCardToCards(imageLink);
    addCardToCards(imageLink);
});

shuffleCards();

document.querySelectorAll('.card').forEach(card => {
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
                    }, 750);
                });
            } else {
                setTimeout(() => {
                    closeOpenCards();
                }, 1500);
            }
        }
    });
});

function getOpenCards() {
    return Array.from(document.querySelectorAll('.card.open'));
}

function closeOpenCards() {
    getOpenCards().forEach(card => {
        card.classList.remove('open');
    });
}