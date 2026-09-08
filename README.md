# memory-card-match
Memory card match 
#  Memory Card Match

A fun and simple memory puzzle game built with pure HTML, CSS, and JavaScript. No frameworks, no installation — just open and play!

##  Live Demo

 [Play it here](https://hein0417.github.io/memory-card-match/)

---

##  About The Project

Memory Card Match is a classic flip-and-match card game. The goal is to find all matching pairs of emoji cards in as few moves and as little time as possible.

This project was built as a beginner-friendly web game to practice:
- HTML structure
- CSS animations and layout (CSS Grid, Flexbox)
- JavaScript DOM manipulation and game logic

---

##  Features

-  **3 Difficulty Levels** — Easy (4×4), Medium (5×4), Hard (6×5)
-  **Move Counter** — tracks how many flips you make
-  **Live Timer** — starts on your first flip
-  **36 Emoji Pairs** — randomly shuffled every new game
-  **Win Screen** — shows your final score with moves and time
-  **Responsive** — works on desktop and mobile

---

##  How To Run

### Option 1 — Open directly
1. Download or clone this repository
2. Open `index.html` in any browser
3. Start playing!

### Option 2 — Clone with Git
```bash
git clone https://github.com/hein0417/memory-card-match.git
cd memory-card-match
```
Then open `index.html` in your browser.

---

##  Project Structure

```
memory-card-match/
├── index.html      # Page structure and layout
├── style.css       # All styling and animations
├── script.js       # Game logic — flip, match, timer, win
└── README.md       # Project documentation
```

---

##  How To Play

1. Click **New Game** to start
2. Click any card to flip it and reveal the emoji
3. Click a second card — if they match, they stay face up 
4. If they don't match, both cards flip back over 
5. Keep going until all pairs are found!
6. Try to finish with the fewest moves and fastest time 

---

##  Built With

- HTML5
- CSS3 (Grid, Flexbox, 3D flip animation)
-- Vanilla JavaScript (no libraries)
- Separate files: index.html, style.css, script.js
- Google Fonts — Syne + DM Sans

---

##  Future Ideas

- [ ] Save best score with `localStorage`
- [ ] Add sound effects on flip and match
- [ ] Custom image cards instead of emojis
- [ ] Multiplayer mode (Player 1 vs Player 2)

---
## Leaderboard

The global leaderboard lets players from anywhere in the world compete and compare their scores in real time!

## How it works

When you finish a game:

1. A win screen appears showing your **moves**, **time**, and **score**
2. You type your **nickname**
3. You click **Submit**
4. Your score is saved to a live database
5. Anyone can see the leaderboard at any time!
   
# 📊 Scoring System
 
Your score is calculated like this:
 
```
Score = (Moves × 10) + Seconds
```
 
**Lower score = better rank** 
 
### Example:
| Moves | Time | Score |
|-------|------|-------|
| 10 | 30s | 130 |
| 12 | 20s | 140 |
| 8 | 60s | 140 |
| 6 | 25s | 85 ← best! |
 
---
 
##  Tips to Get a High Rank
 
- **Fewer moves = lower score** — think before you flip!
- **Faster time = lower score** — but don't rush and make mistakes
- **Easy mode is fastest** — great for chasing top scores
- **Hard mode is impressive** — fewer players finish it well
---
 
##  Filtering the Leaderboard
 
You can filter rankings by difficulty:
 
| Filter | Shows |
|--------|-------|
| **All** | Every player from all difficulties |
| **Easy** | Only Easy mode (4×4 grid) scores |
| **Medium** | Only Medium mode (5×4 grid) scores |
| **Hard** | Only Hard mode (6×5 grid) scores |
 
---
 
##  Rank Badges
 
| Badge | Rank |
|-------|------|
|  Gold | 1st place |
|  Silver | 2nd place |
|  Bronze | 3rd place |
| # | 4th place and below |
 
---
 
##  Technical Details
 
The leaderboard is powered by **Supabase** — a free open source database.
 
- Scores are saved instantly when you click Submit
- The leaderboard updates in real time
- No account or login needed — just a nickname
- Built with plain JavaScript and the Supabase REST API

---
##  Tips & Tricks
See [TIPS.md](TIPS.md) for tips on how to play and win!

##  Author

**Kyaw Swar Hein**
- GitHub: [@hein0417](https://github.com/hein0417)

---


