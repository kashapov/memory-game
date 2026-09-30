const STORAGE_KEY = 'memory-game-leaderboard';
const MAX_RESULTS = 10;

const isValidResult = (item) =>
  item !== null &&
  typeof item === 'object' &&
  Number.isInteger(item.moves) &&
  item.moves > 0 &&
  Number.isFinite(item.timestamp);

const compareResults = (a, b) => a.moves - b.moves || a.timestamp - b.timestamp;

export const loadResults = () => {
  try {
    const parsed = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '[]');

    if (!Array.isArray(parsed)) {
      return [];
    }

    return parsed.filter(isValidResult).sort(compareResults).slice(0, MAX_RESULTS);
  } catch {
    return [];
  }
};

const saveResults = (results) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(results));
  } catch {
    // Storage can be unavailable (private mode, quota); the game still works without it.
  }
};

export const addResult = (moves) => {
  const results = [...loadResults(), { moves, timestamp: Date.now() }]
    .sort(compareResults)
    .slice(0, MAX_RESULTS);

  saveResults(results);

  return results;
};

export const formatDate = (timestamp) => {
  const date = new Date(timestamp);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');

  return `${day}.${month}.${date.getFullYear()}`;
};
