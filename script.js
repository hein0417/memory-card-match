// =============================================
// REPLACE THESE WITH YOUR SUPABASE CREDENTIALS
const SUPABASE_URL = 'https://bnqlajncwqdvwpqsqrls.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJucWxham5jd3FkdndwcXNxcmxzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODg3MTY1OTUsImV4cCI6MjEwNDI5MjU5NX0.89RIAujlB8Pkveav-h3PijU2ldVAFbF6rHzFHI1ldWc';
// =============================================

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
let currentDifficulty = 'easy';

// Set difficulty level
function setDifficulty(btn) {
  document.querySelectorAll('.diff-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  cols = parseInt(btn.dataset.cols);
  currentDifficulty = btn.textContent.toLowerCase();
  startGame();
}

// Start or restart the game
function startGame() {
  clearInterval(timerInterval);
  seconds = 0; moves = 0; matched = 0; flipped = []; lock = false; started = false;
  updateStats();

  let rows = cols === 4 ? 4 : cols === 5 ? 4 : 5;
  let count = cols * rows;
  if (count % 2 !== 0) { rows++; count = cols * rows; }
  total = count / 2;

  const pool = [...EMOJIS].sort(() => Math.random() - 0.5).slice(0, total);
  const cards = [...pool, ...pool].sort(() => Math.random() - 0.5);

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
      setTimeout(() => {
        a.classList.add('matched'); b.classList.add('matched');
        a.classList.remove('flipped'); b.classList.remove('flipped');
        flipped = []; lock = false; matched++;
        document.getElementById('pairs').textContent = `${matched} / ${total}`;
        if (matched === total) win();
      }, 400);
    } else {
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
  const score = moves * 10 + seconds;

  document.getElementById('win-moves').textContent = moves;
  document.getElementById('win-time').textContent = seconds + 's';
  document.getElementById('win-score').textContent = score;
  document.getElementById('win-difficulty').textContent =
    currentDifficulty.charAt(0).toUpperCase() + currentDifficulty.slice(1);

  setTimeout(() => document.getElementById('overlay').classList.add('show'), 400);
}

// Submit score to Supabase
async function submitScore() {
  const nickname = document.getElementById('nickname-input').value.trim();
  const btn = document.getElementById('submit-btn');

  if (!nickname) {
    document.getElementById('nickname-input').style.borderColor = '#e05a5a';
    return;
  }

  if (SUPABASE_URL === 'YOUR_SUPABASE_URL') {
    document.getElementById('submit-status').textContent = '⚠️ Supabase not connected yet.';
    return;
  }

  btn.textContent = 'Saving…';
  btn.disabled = true;

  const score = moves * 10 + seconds;

  try {
    await fetch(`${SUPABASE_URL}/rest/v1/scores`, {
      method: 'POST',
      headers: {
        'apikey': SUPABASE_KEY,
        'Authorization': `Bearer ${SUPABASE_KEY}`,
        'Content-Type': 'application/json',
        'Prefer': 'return=minimal'
      },
      body: JSON.stringify({
        nickname,
        moves,
        seconds,
        score,
        difficulty: currentDifficulty
      })
    });

    document.getElementById('submit-status').textContent = '✅ Score saved!';
    btn.textContent = 'Saved!';
  } catch (err) {
    document.getElementById('submit-status').textContent = '❌ Could not save. Try again.';
    btn.textContent = 'Submit';
    btn.disabled = false;
  }
}

function updateStats() {
  document.getElementById('moves').textContent = '0';
  document.getElementById('pairs').textContent = '0 / 0';
  document.getElementById('timer').textContent = '0s';
}

startGame();
