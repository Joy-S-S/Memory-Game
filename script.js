let gameBoard = document.getElementById('gameBoard');
let cardValues = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
let flippedCards = [];
let matchedCards = [];
let gameActive = false;
let score = 0;
let timer = 0;
let timerInterval;
let winBanner = document.getElementById('winBanner'); // Access the win banner element

// Shuffle function to randomize the card order
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

// Create the game board by shuffling the card values
function createBoard() {
  shuffle(cardValues);
  gameBoard.innerHTML = '';
  flippedCards = [];
  matchedCards = [];
  winBanner.style.display = 'none'; // Hide the win banner when a new game starts
  
  cardValues.forEach((value, index) => {
    let card = document.createElement('div');
    card.classList.add('card');
    card.setAttribute('data-value', value);
    card.addEventListener('click', flipCard);
    gameBoard.appendChild(card);
  });
}

// Handle card flipping
function flipCard() {
  if (!gameActive || this.classList.contains('flipped') || flippedCards.length === 2) return;
  
  this.classList.add('flipped');
  this.textContent = this.getAttribute('data-value');
  flippedCards.push(this);
  
  if (flippedCards.length === 2) {
    setTimeout(checkMatch, 500);
  }
}

// Check if the flipped cards match
function checkMatch() {
  if (flippedCards[0].getAttribute('data-value') === flippedCards[1].getAttribute('data-value')) {
    flippedCards.forEach(card => card.classList.add('matched'));
    matchedCards.push(...flippedCards);
    flippedCards = [];
    score += 10; // Increase score for each match
    updateScore();
    
    // Check if all cards are matched
    if (matchedCards.length === cardValues.length) {
      clearInterval(timerInterval);
      winBanner.style.display = 'block'; // Show the win banner
      gameActive = false;
    }
  } else {
    flippedCards.forEach(card => {
      card.classList.remove('flipped');
      card.textContent = ''; // Hide unmatched cards
    });
    flippedCards = [];
  }
}

// Update the score display
function updateScore() {
  document.getElementById('score').textContent = `Score: ${score}`;
}

// Update the timer display
function updateTimer() {
  document.getElementById('timer').textContent = `Time: ${timer}s`;
}

// Start a new game
function startGame() {
  score = 0;
  timer = 0;
  updateScore();
  updateTimer();
  clearInterval(timerInterval);
  timerInterval = setInterval(() => {
    timer++;
    updateTimer();
  }, 1000);
  createBoard();
  gameActive = true;
}