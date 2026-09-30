# Memory Game

A browser memory game: find all 8 matching pairs in as few moves as possible.

Built for the [RS School Memory Game](https://github.com/rolling-scopes-school/tasks/tree/master/tasks/memory-game) task with plain HTML, CSS, and JavaScript (ES modules). No frameworks or UI libraries.

## Features

- 16 cards (8 pairs), shuffled on every load and every new game
- Move and pair counters
- Win modal with the final move count
- Leaderboard of the top 10 results in `localStorage`
- Shared modal component (backdrop click, Escape, scroll lock)

## How to run locally

ES modules do not load from the `file://` protocol. Serve the project folder with any static server:

```bash
# Option 1
npx --yes serve .

# Option 2
python3 -m http.server 5500
```

Then open the printed URL (for example `http://localhost:3000` or `http://localhost:5500`) in your browser.

## Project structure

```
index.html          # empty body + module script only
styles/main.css
assets/cards/       # custom SVG faces and card back
src/
  main.js
  data/cards.js
  game/             # deck, state, game logic
  ui/               # header, board, counters, modals
  storage/          # leaderboard in localStorage
  utils/            # createElement helper, Fisher–Yates shuffle
```

## Card images

All card images are original SVG files created for this project. No third-party licenses apply.

## Deploy

The app can be deployed to any static host (for example GitHub Pages) from the `memory-game` branch.
