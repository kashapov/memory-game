import { CARDS } from '../data/cards.js';
import { shuffle } from '../utils/shuffle.js';

export const createDeck = () => {
  const pairs = CARDS.flatMap((card) => [
    { ...card, uid: `${card.id}-a` },
    { ...card, uid: `${card.id}-b` },
  ]);

  return shuffle(pairs);
};
