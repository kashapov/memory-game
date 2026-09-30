import { createDeck } from './deck.js';
import { createState } from './state.js';

export const createGame = ({ board, counters }) => {
  let state = createState([]);

  const updateCounters = () => {
    counters.update({ moves: state.moves, pairs: state.pairs });
  };

  const start = () => {
    state = createState(createDeck());
    board.render(state.deck);
    updateCounters();
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
      board.closeCard(first);
      board.closeCard(second);
    }

    updateCounters();
  };

  const handleCardClick = (index) => {
    if (state.opened.includes(index)) {
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
