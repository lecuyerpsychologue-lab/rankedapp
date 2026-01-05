import {
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  limit,
  Timestamp,
  addDoc,
} from 'firebase/firestore';
import { db } from './firebase';

/**
 * Helpers pour Firestore dans RANKED
 */

/**
 * Types de données
 */
export interface Circle {
  id: string;
  name: string;
  emoji: string;
  color: string;
  creatorId: string;
  memberIds: string[];
  createdAt: Timestamp;
}

export interface UserProfile {
  id: string;
  displayName: string;
  photoURL: string;
  email: string;
  stats: {
    humor: number;
    intelligence: number;
    reliability: number;
    charisma: number;
    creativity: number;
    global: number;
  };
  circleIds: string[];
  createdAt: Timestamp;
}

export interface Vote {
  id: string;
  circleId: string;
  voterId: string;
  weekId: string;
  votes: {
    humor: string;
    intelligence: string;
    reliability: string;
    charisma: string;
    creativity: string;
  };
  createdAt: Timestamp;
}

/**
 * Collections Firestore
 */
const COLLECTIONS = {
  users: 'users',
  circles: 'circles',
  votes: 'votes',
};

/**
 * Crée ou met à jour le profil utilisateur
 */
export const createOrUpdateUser = async (
  userId: string,
  data: Partial<UserProfile>
) => {
  const userRef = doc(db, COLLECTIONS.users, userId);
  await setDoc(userRef, data, { merge: true });
};

/**
 * Récupère le profil utilisateur
 */
export const getUserProfile = async (userId: string): Promise<UserProfile | null> => {
  const userRef = doc(db, COLLECTIONS.users, userId);
  const userSnap = await getDoc(userRef);
  
  if (userSnap.exists()) {
    return { id: userSnap.id, ...userSnap.data() } as UserProfile;
  }
  
  return null;
};

/**
 * Crée un nouveau cercle
 */
export const createCircle = async (circleData: Omit<Circle, 'id'>) => {
  const circlesRef = collection(db, COLLECTIONS.circles);
  const docRef = await addDoc(circlesRef, circleData);
  return docRef.id;
};

/**
 * Récupère un cercle par son ID
 */
export const getCircle = async (circleId: string): Promise<Circle | null> => {
  const circleRef = doc(db, COLLECTIONS.circles, circleId);
  const circleSnap = await getDoc(circleRef);
  
  if (circleSnap.exists()) {
    return { id: circleSnap.id, ...circleSnap.data() } as Circle;
  }
  
  return null;
};

/**
 * Récupère les cercles d'un utilisateur
 */
export const getUserCircles = async (userId: string): Promise<Circle[]> => {
  const circlesRef = collection(db, COLLECTIONS.circles);
  const q = query(
    circlesRef,
    where('memberIds', 'array-contains', userId),
    orderBy('createdAt', 'desc')
  );
  
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Circle));
};

/**
 * Ajoute un membre à un cercle
 */
export const addMemberToCircle = async (circleId: string, userId: string) => {
  const circleRef = doc(db, COLLECTIONS.circles, circleId);
  const circle = await getCircle(circleId);
  
  if (circle && !circle.memberIds.includes(userId)) {
    await updateDoc(circleRef, {
      memberIds: [...circle.memberIds, userId],
    });
  }
};

/**
 * Retire un membre d'un cercle
 */
export const removeMemberFromCircle = async (circleId: string, userId: string) => {
  const circleRef = doc(db, COLLECTIONS.circles, circleId);
  const circle = await getCircle(circleId);
  
  if (circle) {
    await updateDoc(circleRef, {
      memberIds: circle.memberIds.filter(id => id !== userId),
    });
  }
};

/**
 * Enregistre un vote
 */
export const submitVote = async (voteData: Omit<Vote, 'id'>) => {
  const votesRef = collection(db, COLLECTIONS.votes);
  const docRef = await addDoc(votesRef, voteData);
  return docRef.id;
};

/**
 * Récupère les votes d'un utilisateur pour une semaine donnée
 */
export const getUserVotesForWeek = async (
  userId: string,
  weekId: string,
  circleId: string
): Promise<Vote | null> => {
  const votesRef = collection(db, COLLECTIONS.votes);
  const q = query(
    votesRef,
    where('voterId', '==', userId),
    where('weekId', '==', weekId),
    where('circleId', '==', circleId),
    limit(1)
  );
  
  const snapshot = await getDocs(q);
  if (!snapshot.empty) {
    const doc = snapshot.docs[0];
    return { id: doc.id, ...doc.data() } as Vote;
  }
  
  return null;
};

/**
 * Génère un ID de semaine (format: YYYY-WW)
 */
export const getCurrentWeekId = (): string => {
  const now = new Date();
  const startOfYear = new Date(now.getFullYear(), 0, 1);
  const days = Math.floor((now.getTime() - startOfYear.getTime()) / (24 * 60 * 60 * 1000));
  const weekNumber = Math.ceil((days + startOfYear.getDay() + 1) / 7);
  return `${now.getFullYear()}-${String(weekNumber).padStart(2, '0')}`;
};
