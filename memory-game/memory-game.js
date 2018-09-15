const CARD_MATCHED = 'card--matched';
const CARD_FLIP = 'card--flip';

const cards = document.querySelectorAll('.card');

let hasFlippedCard = false,
  lockBoard = false,
  firstCard,
  secondCard;

function flipCard() {
  if (lockBoard || this === firstCard) return;

  this.classList.toggle(CARD_FLIP);

  if (!hasFlippedCard) {
    hasFlippedCard = true;
    firstCard = this;
    return;
  }

  secondCard = this;
  checkForMatch();
}

function checkForMatch() {
  let isMatch = firstCard.dataset.match === secondCard.dataset.match;
  isMatch ? disableCards() : unflipCards();
}

function disableCards() {
  firstCard.removeEventListener('click', flipCard);
  secondCard.removeEventListener('click', flipCard);
  
  firstCard.classList.add(CARD_MATCHED);
  secondCard.classList.add(CARD_MATCHED);
  
  resetBoard();
}

function unflipCards() {
  lockBoard = true;
  setTimeout(() => {
    firstCard.classList.remove(CARD_FLIP);
    secondCard.classList.remove(CARD_FLIP);
    resetBoard();
  }, 1000);
}

function resetBoard() {
  [hasFlippedCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
}

// Shuffle cards using the flex order attribute
(function shuffle() {
  cards.forEach(card => {
    let ramdomPosition = Math.floor(Math.random() * 12);
    card.style.order = ramdomPosition;
  });
})();

cards.forEach(card => card.addEventListener('click', flipCard));