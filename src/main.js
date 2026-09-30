import { createElement } from './utils/dom.js';
import { createHeader } from './ui/header.js';
import { createBoard } from './ui/board.js';
import { createCounters } from './ui/counters.js';
import { createModal } from './ui/modal.js';
import { openWinModal } from './ui/winModal.js';
import { createGame } from './game/game.js';
import { CARDS } from './data/cards.js';

const init = () => {
  const header = createHeader({
    onNewGame: () => {},
    onLeaderboard: () => {},
  });
  const counters = createCounters(CARDS.length);
  const board = createBoard({ onCardClick: (index) => game.handleCardClick(index) });
  const main = createElement('main', { className: 'main' }, [counters.element, board.element]);
  const app = createElement('div', { className: 'app' }, [header, main]);
  const modal = createModal({ appRoot: app });

  const startNewGame = () => {
    modal.close();
    game.start();
  };

  const game = createGame({
    board,
    counters,
    onWin: ({ moves }) => openWinModal({ modal, moves, onNewGame: startNewGame }),
  });

  document.body.prepend(app);
  game.start();
};

init();
