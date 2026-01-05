import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

/**
 * Fonction Cloud pour calculer les scores hebdomadaires
 * S'exécute automatiquement chaque dimanche à 23:59
 */

interface Vote {
  voterId: string;
  circleId: string;
  weekId: string;
  votes: {
    humor: string;
    intelligence: string;
    reliability: string;
    charisma: string;
    creativity: string;
  };
}

interface UserStats {
  humor: number;
  intelligence: number;
  reliability: number;
  charisma: number;
  creativity: number;
  global: number;
}

/**
 * Calcule le pourcentage de votes reçus pour une stat
 */
const calculatePercentage = (votes: number, total: number): number => {
  return total > 0 ? (votes / total) * 100 : 0;
};

/**
 * Calcule les scores pour tous les cercles
 */
export const calculateWeeklyScores = functions.pubsub
  .schedule('59 23 * * 0') // Chaque dimanche à 23:59
  .timeZone('Europe/Paris')
  .onRun(async (context) => {
    const db = admin.firestore();
    
    try {
      // Récupérer tous les cercles
      const circlesSnapshot = await db.collection('circles').get();
      
      for (const circleDoc of circlesSnapshot.docs) {
        const circle = circleDoc.data();
        const circleId = circleDoc.id;
        
        // Ignorer les cercles avec moins de 5 membres
        if (!circle.memberIds || circle.memberIds.length < 5) {
          continue;
        }

        // Récupérer les votes de la semaine pour ce cercle
        const weekId = getCurrentWeekId();
        const votesSnapshot = await db
          .collection('votes')
          .where('circleId', '==', circleId)
          .where('weekId', '==', weekId)
          .get();

        // Compter les votes pour chaque membre
        const voteCount: Record<string, UserStats> = {};
        
        // Initialiser les compteurs pour tous les membres
        circle.memberIds.forEach((memberId: string) => {
          voteCount[memberId] = {
            humor: 0,
            intelligence: 0,
            reliability: 0,
            charisma: 0,
            creativity: 0,
            global: 0,
          };
        });

        // Compter les votes
        votesSnapshot.docs.forEach((voteDoc) => {
          const vote = voteDoc.data() as Vote;
          
          Object.entries(vote.votes).forEach(([stat, votedUserId]) => {
            if (voteCount[votedUserId]) {
              voteCount[votedUserId][stat as keyof UserStats] += 1;
            }
          });
        });

        // Calculer les scores (pourcentage de votes reçus)
        const totalVotes = votesSnapshot.size;
        
        for (const [userId, stats] of Object.entries(voteCount)) {
          // Calculer le pourcentage pour chaque stat
          const scores: UserStats = {
            humor: calculatePercentage(stats.humor, totalVotes),
            intelligence: calculatePercentage(stats.intelligence, totalVotes),
            reliability: calculatePercentage(stats.reliability, totalVotes),
            charisma: calculatePercentage(stats.charisma, totalVotes),
            creativity: calculatePercentage(stats.creativity, totalVotes),
            global: 0,
          };

          // Calculer le score global (moyenne pondérée)
          scores.global = (
            scores.humor +
            scores.intelligence +
            scores.reliability +
            scores.charisma +
            scores.creativity
          ) / 5;

          // Mettre à jour le profil utilisateur
          await db.collection('users').doc(userId).set(
            {
              stats: scores,
              lastUpdated: admin.firestore.FieldValue.serverTimestamp(),
            },
            { merge: true }
          );
        }
      }

      console.log('✅ Scores hebdomadaires calculés avec succès');
      return null;
    } catch (error) {
      console.error('❌ Erreur lors du calcul des scores:', error);
      throw error;
    }
  });

/**
 * Génère un ID de semaine (format: YYYY-WW)
 */
function getCurrentWeekId(): string {
  const now = new Date();
  const startOfYear = new Date(now.getFullYear(), 0, 1);
  const days = Math.floor((now.getTime() - startOfYear.getTime()) / (24 * 60 * 60 * 1000));
  const weekNumber = Math.ceil((days + startOfYear.getDay() + 1) / 7);
  return `${now.getFullYear()}-${String(weekNumber).padStart(2, '0')}`;
}
