import { createDeck } from './deck.js';
import { createState } from './state.js';
import { CARDS } from '../data/cards.js';

const MISMATCH_DELAY_MS = 1000;
const TOTAL_PAIRS = CARDS.length;

export const createGame = ({ board, counters, onWin }) => {
  let state = createState([]);

  const updateCounters = () => {
    counters.update({ moves: state.moves, pairs: state.pairs });
  };

  const clearMismatchTimer = () => {
    if (state.timerId !== null) {
      clearTimeout(state.timerId);
      state.timerId = null;
    }

    state.locked = false;
  };

  const start = () => {
    clearMismatchTimer();
    state = createState(createDeck());
    board.render(state.deck);
    updateCounters();
  };

  const finish = () => {
    state.finished = true;
    onWin?.({ moves: state.moves });
  };

  const resolvePair = () => {
    const [first, second] = state.opened;
    state.opened = [];
    state.moves += 1;

    if (state.deck[first].id === state.deck[second].id) {
      state.matched.add(first);
      state.matched.add(second);
      state.pairs += 1;
      board.markMatched(first);
      board.markMatched(second);
    } else {
      hideMismatch(first, second);
    }

    updateCounters();

    if (state.pairs === TOTAL_PAIRS) {
      finish();
    }
  };

  const hideMismatch = (first, second) => {
    state.locked = true;
    state.timerId = setTimeout(() => {
      board.closeCard(first);
      board.closeCard(second);
      state.locked = false;
      state.timerId = null;
    }, MISMATCH_DELAY_MS);
  };

  const canOpen = (index) =>
    !state.finished &&
    !state.locked &&
    index >= 0 &&
    index < state.deck.length &&
    !state.opened.includes(index) &&
    !state.matched.has(index);

  const handleCardClick = (index) => {
    if (!canOpen(index)) {
      return;
    }

    state.opened.push(index);
    board.openCard(index);

    if (state.opened.length === 2) {
      resolvePair();
    }
  };

  return { start, handleCardClick };
};
