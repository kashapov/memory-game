import { createElement } from '../utils/dom.js';

export const createHeader = ({ onNewGame, onLeaderboard }) => {
  const title = createElement('h1', { className: 'header__title', text: 'Memory Game' });

  const newGameButton = createElement('button', {
    className: 'button header__button',
    text: 'New game',
    attrs: { type: 'button', 'aria-label': 'Start a new game' },
    on: { click: onNewGame },
  });

  const leaderboardButton = createElement('button', {
    className: 'button header__button',
    text: 'Leaderboard',
    attrs: { type: 'button', 'aria-label': 'Open leaderboard' },
    on: { click: onLeaderboard },
  });

  const controls = createElement('div', { className: 'header__controls' }, [
    newGameButton,
    leaderboardButton,
  ]);

  return createElement('header', { className: 'header' }, [title, controls]);
};
