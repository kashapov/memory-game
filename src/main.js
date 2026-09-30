import { createElement } from './utils/dom.js';
import { createHeader } from './ui/header.js';
import { createBoard } from './ui/board.js';
import { createCounters } from './ui/counters.js';
import { createDeck } from './game/deck.js';
import { CARDS } from './data/cards.js';

const init = () => {
  const header = createHeader({
    onNewGame: () => {},
    onLeaderboard: () => {},
  });
  const counters = createCounters(CARDS.length);
  const board = createBoard({ onCardClick: () => {} });
  const main = createElement('main', { className: 'main' }, [counters.element, board.element]);
  const app = createElement('div', { className: 'app' }, [header, main]);

  document.body.prepend(app);
  board.render(createDeck());
};

init();
