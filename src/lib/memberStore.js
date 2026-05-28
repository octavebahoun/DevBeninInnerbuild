import { readJSON, writeJSON } from './storage';
import initialMembers from '../data/membres.json';

const MEMBERS_KEY = 'devbenin-membres';

export const memberStore = {
  getMembers() {
    const stored = readJSON(MEMBERS_KEY, null);
    if (Array.isArray(stored) && stored.length > 0) {
      return stored;
    }
    writeJSON(MEMBERS_KEY, initialMembers);
    return initialMembers;
  },
  saveMembers(members) {
    writeJSON(MEMBERS_KEY, members);
  }
};
