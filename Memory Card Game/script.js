const gameBoard = document.getElementById("gameBoard");
const scoreDisplay = document.getElementById("score");
const attemptsDisplay = document.getElementById("attempts");

const emojis = ["🍎", "🍌", "🍇", "🍉", "🍓", "🍒", "🥝", "🍍"];
let cards = [...emojis, ...emojis];

let flippedCards = [];
let score = 0;
let attempts = 0;
let lockBoard = false;

// Shuffle function
function shuffle(array) {
  return array.sort(() => 0.5 - Math.random());
}

// Create cards
function createBoard() {
  gameBoard.innerHTML = "";
  shuffle(cards).forEach((emoji) => {
    const card = document.createElement("div");
    card.classList.add("card");
    card.innerHTML = `
      <div class="card-inner">
        <div class="card-front">${emoji}</div>
        <div class="card-back"></div>
      </div>
    `;

    card.addEventListener("click", () => flipCard(card, emoji));
    gameBoard.appendChild(card);
  });
}

function flipCard(card, emoji) {
  if (lockBoard) return;
  if (card.classList.contains("flip")) return;
  if (flippedCards.length === 2) return;

  card.classList.add("flip");
  flippedCards.push({ card, emoji });

  if (flippedCards.length === 2) {
    attempts++;
    attemptsDisplay.textContent = attempts;
    checkMatch();
  }
}

function checkMatch() {
  const [first, second] = flippedCards;

  if (first.emoji === second.emoji) {
    score++;
    scoreDisplay.textContent = score;
    flippedCards = [];

    if (score === emojis.length) {
      setTimeout(() => alert("🎉 You Won!"), 500);
    }
  } else {
    lockBoard = true;
    setTimeout(() => {
      first.card.classList.remove("flip");
      second.card.classList.remove("flip");
      flippedCards = [];
      lockBoard = false;
    }, 800);
  }
}

function restartGame() {
  score = 0;
  attempts = 0;
  flippedCards = [];
  scoreDisplay.textContent = score;
  attemptsDisplay.textContent = attempts;
  createBoard();
}

createBoard();