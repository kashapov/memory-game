import { createElement } from '../utils/dom.js';

const createCounter = (label) => {
  const value = createElement('span', { className: 'counter__value' });
  const element = createElement('p', { className: 'counter' }, [
    createElement('span', { className: 'counter__label', text: label }),
    value,
  ]);

  return { element, value };
};

export const createCounters = (totalPairs) => {
  const moves = createCounter('Moves:');
  const pairs = createCounter('Pairs:');

  const element = createElement(
    'div',
    { className: 'counters', attrs: { 'aria-live': 'polite' } },
    [moves.element, pairs.element],
  );

  const update = ({ moves: movesCount, pairs: pairsCount }) => {
    moves.value.textContent = String(movesCount);
    pairs.value.textContent = `${pairsCount} of ${totalPairs}`;
  };

  update({ moves: 0, pairs: 0 });

  return { element, update };
};
