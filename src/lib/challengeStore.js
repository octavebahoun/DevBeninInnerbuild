import { readJSON, writeJSON } from './storage';
import initialChallenges from '../data/challenges.json';

const CHALLENGE_KEY = 'devbenin-challenges';

export const challengeStore = {
  getChallenges() {
    const stored = readJSON(CHALLENGE_KEY, null);
    if (Array.isArray(stored) && stored.length > 0) {
      return stored;
    }
    writeJSON(CHALLENGE_KEY, initialChallenges);
    return initialChallenges;
  },
  saveChallenges(challenges) {
    writeJSON(CHALLENGE_KEY, challenges);
  }
};
