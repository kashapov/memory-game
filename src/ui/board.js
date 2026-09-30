import { createElement, clearElement } from '../utils/dom.js';
import { CARD_BACK } from '../data/cards.js';

const HIDDEN_LABEL = 'Hidden card';

const createCard = (card, index, onCardClick) => {
  const back = createElement('span', { className: 'card__face card__face--back' }, [
    createElement('img', {
      attrs: { src: CARD_BACK, alt: '', draggable: 'false' },
    }),
  ]);

  const front = createElement('span', { className: 'card__face card__face--front' }, [
    createElement('img', {
      attrs: { src: card.image, alt: '', draggable: 'false' },
    }),
  ]);

  const inner = createElement('span', { className: 'card__inner' }, [back, front]);

  return createElement(
    'button',
    {
      className: 'card',
      attrs: { type: 'button', 'aria-label': HIDDEN_LABEL, 'data-index': index },
      on: { click: () => onCardClick(index) },
    },
    [inner],
  );
};

export const createBoard = ({ onCardClick }) => {
  const element = createElement('section', {
    className: 'board',
    attrs: { 'aria-label': 'Game board' },
  });
  let cards = [];
  let deck = [];

  const render = (newDeck) => {
    deck = newDeck;
    cards = deck.map((card, index) => createCard(card, index, onCardClick));
    clearElement(element);
    element.append(...cards);
  };

  const openCard = (index) => {
    cards[index].classList.add('card--open');
    cards[index].setAttribute('aria-label', deck[index].name);
  };

  const closeCard = (index) => {
    cards[index].classList.remove('card--open');
    cards[index].setAttribute('aria-label', HIDDEN_LABEL);
  };

  const markMatched = (index) => {
    cards[index].classList.add('card--matched');
    cards[index].setAttribute('aria-disabled', 'true');
  };

  return { element, render, openCard, closeCard, markMatched };
};
