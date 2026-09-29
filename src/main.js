import { createElement } from './utils/dom.js';
import { createHeader } from './ui/header.js';

const init = () => {
  const header = createHeader({
    onNewGame: () => {},
    onLeaderboard: () => {},
  });
  const main = createElement('main', { className: 'main' });
  const app = createElement('div', { className: 'app' }, [header, main]);

  document.body.prepend(app);
};

init();
