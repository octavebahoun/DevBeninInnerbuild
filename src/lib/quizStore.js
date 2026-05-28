import { readJSON, writeJSON } from './storage';
import initialQuizData from '../data/quiz.json';

const QUIZ_KEY = 'devbenin-quiz';

export const quizStore = {
  getQuizData() {
    const stored = readJSON(QUIZ_KEY, null);
    if (stored && typeof stored === 'object') {
      return stored;
    }
    writeJSON(QUIZ_KEY, initialQuizData);
    return initialQuizData;
  },
  saveQuizData(data) {
    writeJSON(QUIZ_KEY, data);
  }
};
