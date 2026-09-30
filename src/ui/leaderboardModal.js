import { createElement } from '../utils/dom.js';
import { loadResults, formatDate } from '../storage/leaderboard.js';

const createRow = (cellTag, values) =>
  createElement(
    'tr',
    {},
    values.map((value) => createElement(cellTag, { text: value })),
  );

const createTable = (results) => {
  const head = createElement('thead', {}, [
    createElement(
      'tr',
      {},
      ['Place', 'Moves', 'Date'].map((title) =>
        createElement('th', { text: title, attrs: { scope: 'col' } }),
      ),
    ),
  ]);

  const body = createElement(
    'tbody',
    {},
    results.map((result, index) =>
      createRow('td', [index + 1, result.moves, formatDate(result.timestamp)]),
    ),
  );

  return createElement('table', { className: 'leaderboard' }, [head, body]);
};

export const openLeaderboardModal = ({ modal }) => {
  const results = loadResults();

  const content = results.length
    ? createTable(results)
    : createElement('p', { className: 'leaderboard__empty', text: 'No results yet' });

  const actions = createElement('div', { className: 'modal__actions' }, [
    modal.createActionButton({
      text: 'Close',
      onClick: modal.close,
      className: 'modal__button--secondary',
    }),
  ]);

  modal.open({ title: 'Leaderboard', content: [content, actions] });
};
