const EMOJIS = [
  '🦊','🐬','🦋','🌸','🍄','⚡','🎸','🏔️',
  '🦑','🌙','🔮','🎯','🍉','🦚','🌊','🎪',
  '🦩','🍀','🎭','🛸','🌋','🎨','🦀','🌺',
  '🐉','🎠','🦜','🍋','🌌','🎲','🦁','🐳',
  '🎡','🌈','🦋','🎻'
];

let cols = 4;
let flipped = [];
let matched = 0;
let total = 0;
let moves = 0;
let lock = false;
let timerInterval = null;
let seconds = 0;
let started = false;

// Set difficulty level
function setDifficulty(btn) {
  document.querySelectorAll('.diff-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  cols = parseInt(btn.dataset.cols);
  startGame();
}

// Start or restart the game
function startGame() {
  clearInterval(timerInterval);
  seconds = 0; moves = 0; matched = 0; flipped = []; lock = false; started = false;
  updateStats();

  // Make sure total cards is even
  let rows = cols === 4 ? 4 : cols === 5 ? 4 : 5;
  let count = cols * rows;
  if (count % 2 !== 0) { rows++; count = cols * rows; }
  total = count / 2;

  // Pick random emojis and duplicate for pairs
  const pool = [...EMOJIS].sort(() => Math.random() - 0.5).slice(0, total);
  const cards = [...pool, ...pool].sort(() => Math.random() - 0.5);

  // Build the grid
  const grid = document.getElementById('grid');
  grid.setAttribute('data-cols', cols);
  grid.innerHTML = '';

  cards.forEach((emoji, i) => {
    const card = document.createElement('div');
    card.className = 'card';
    card.dataset.emoji = emoji;
    card.dataset.index = i;
    card.innerHTML = `
      <div class="card-inner">
        <div class="card-face card-back"></div>
        <div class="card-face card-front">${emoji}</div>
      </div>`;
    card.addEventListener('click', () => flipCard(card));
    grid.appendChild(card);
  });

  document.getElementById('pairs').textContent = `0 / ${total}`;
  document.getElementById('overlay').classList.remove('show');
}

// Flip a card
function flipCard(card) {
  if (lock || card.classList.contains('flipped') || card.classList.contains('matched')) return;

  // Start timer on first flip
  if (!started) {
    started = true;
    timerInterval = setInterval(() => {
      seconds++;
      document.getElementById('timer').textContent = seconds + 's';
    }, 1000);
  }

  card.classList.add('flipped');
  flipped.push(card);

  if (flipped.length === 2) {
    moves++;
    document.getElementById('moves').textContent = moves;
    lock = true;

    const [a, b] = flipped;

    if (a.dataset.emoji === b.dataset.emoji) {
      // Match found!
      setTimeout(() => {
        a.classList.add('matched'); b.classList.add('matched');
        a.classList.remove('flipped'); b.classList.remove('flipped');
        flipped = []; lock = false; matched++;
        document.getElementById('pairs').textContent = `${matched} / ${total}`;
        if (matched === total) win();
      }, 400);
    } else {
      // No match — flip back
      setTimeout(() => {
        a.classList.add('wrong'); b.classList.add('wrong');
        setTimeout(() => {
          a.classList.remove('flipped', 'wrong');
          b.classList.remove('flipped', 'wrong');
          flipped = []; lock = false;
        }, 400);
      }, 700);
    }
  }
}

// Show win screen
function win() {
  clearInterval(timerInterval);
  document.getElementById('win-msg').textContent =
    `${moves} moves · ${seconds} seconds · ${total} pairs found`;
  setTimeout(() => document.getElementById('overlay').classList.add('show'), 400);
}

// Reset stat display
function updateStats() {
  document.getElementById('moves').textContent = '0';
  document.getElementById('pairs').textContent = '0 / 0';
  document.getElementById('timer').textContent = '0s';
}

// Start game on page load
startGame();
