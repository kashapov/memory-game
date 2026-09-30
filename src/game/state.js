export const createState = (deck) => ({
  deck,
  opened: [],
  matched: new Set(),
  moves: 0,
  pairs: 0,
  locked: false,
  timerId: null,
});
