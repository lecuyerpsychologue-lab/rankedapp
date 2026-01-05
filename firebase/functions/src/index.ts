import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

// Initialiser Firebase Admin
admin.initializeApp();

export { calculateWeeklyScores } from './calculateScores';
export { sendVoteReminders } from './notifications';
