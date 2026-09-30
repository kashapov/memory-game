import { createElement, clearElement } from '../utils/dom.js';

export const createModal = ({ appRoot }) => {
  const dialog = createElement('div', {
    className: 'modal',
    attrs: { role: 'dialog', 'aria-modal': 'true', tabindex: '-1' },
  });
  const overlay = createElement('div', { className: 'modal-overlay' }, [dialog]);

  let isOpen = false;
  let onCloseCallback = null;
  let previousFocus = null;

  const close = () => {
    if (!isOpen) {
      return;
    }

    isOpen = false;
    overlay.classList.remove('modal-overlay--visible');
    document.body.classList.remove('no-scroll');
    appRoot.inert = false;
    clearElement(dialog);

    if (previousFocus instanceof HTMLElement) {
      previousFocus.focus();
    }

    const callback = onCloseCallback;
    onCloseCallback = null;
    callback?.();
  };

  const open = ({ title, content, onClose = null }) => {
    if (isOpen) {
      close();
    }

    const heading = createElement('h2', {
      className: 'modal__title',
      text: title,
      attrs: { id: 'modal-title' },
    });

    clearElement(dialog);
    dialog.setAttribute('aria-labelledby', 'modal-title');
    dialog.append(heading, ...content);

    if (!overlay.isConnected) {
      document.body.append(overlay);
    }

    previousFocus = document.activeElement;
    onCloseCallback = onClose;
    isOpen = true;
    appRoot.inert = true;
    document.body.classList.add('no-scroll');
    overlay.classList.add('modal-overlay--visible');

    const firstButton = dialog.querySelector('button');
    (firstButton ?? dialog).focus();
  };

  overlay.addEventListener('click', (event) => {
    if (event.target === overlay) {
      close();
    }
  });

  document.addEventListener('keydown', (event) => {
    if (isOpen && event.key === 'Escape') {
      event.preventDefault();
      close();
    }
  });

  const createActionButton = ({ text, onClick, className = '' }) =>
    createElement('button', {
      className: `button modal__button ${className}`.trim(),
      text,
      attrs: { type: 'button' },
      on: { click: onClick },
    });

  return { open, close, createActionButton, isOpen: () => isOpen };
};
