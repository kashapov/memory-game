import { createElement } from './utils/dom.js';

const init = () => {
  const app = createElement('div', { className: 'app' });
  document.body.prepend(app);
};

init();
