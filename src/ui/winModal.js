import { createElement } from '../utils/dom.js';

const formatMoves = (moves) => `${moves} ${moves === 1 ? 'move' : 'moves'}`;

export const openWinModal = ({ modal, moves, onNewGame }) => {
  const message = createElement('p', {
    className: 'win__message',
    text: 'You found all pairs!',
  });

  const result = createElement('p', { className: 'win__result' }, [
    'Your result: ',
    createElement('strong', { text: formatMoves(moves) }),
  ]);

  const actions = createElement('div', { className: 'modal__actions' }, [
    modal.createActionButton({ text: 'New game', onClick: onNewGame }),
    modal.createActionButton({
      text: 'Close',
      onClick: modal.close,
      className: 'modal__button--secondary',
    }),
  ]);

  modal.open({ title: 'Congratulations!', content: [message, result, actions] });
};
