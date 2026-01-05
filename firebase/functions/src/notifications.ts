import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

/**
 * Fonction Cloud pour envoyer des rappels de vote
 * S'exécute automatiquement chaque vendredi à 18:00
 */

export const sendVoteReminders = functions.pubsub
  .schedule('0 18 * * 5') // Chaque vendredi à 18:00
  .timeZone('Europe/Paris')
  .onRun(async (context) => {
    const db = admin.firestore();
    
    try {
      // Récupérer tous les utilisateurs
      const usersSnapshot = await db.collection('users').get();
      
      for (const userDoc of usersSnapshot.docs) {
        const user = userDoc.data();
        const userId = userDoc.id;
        
        // Vérifier si l'utilisateur a des cercles actifs
        if (!user.circleIds || user.circleIds.length === 0) {
          continue;
        }

        // Vérifier si l'utilisateur a déjà voté cette semaine
        const weekId = getCurrentWeekId();
        const votesSnapshot = await db
          .collection('votes')
          .where('voterId', '==', userId)
          .where('weekId', '==', weekId)
          .get();

        const totalCircles = user.circleIds.length;
        const votedCircles = votesSnapshot.size;

        // Si l'utilisateur n'a pas voté pour tous ses cercles
        if (votedCircles < totalCircles) {
          // TODO: Envoyer une notification push via FCM
          console.log(`📬 Rappel de vote à envoyer à ${user.displayName} (${totalCircles - votedCircles} cercles restants)`);
          
          // Exemple de notification FCM (à implémenter avec les tokens FCM)
          // const message = {
          //   notification: {
          //     title: 'RANKED - Rappel de vote',
          //     body: `Il vous reste ${totalCircles - votedCircles} cercle(s) à voter !`,
          //   },
          //   token: user.fcmToken,
          // };
          // await admin.messaging().send(message);
        }
      }

      console.log('✅ Rappels de vote envoyés avec succès');
      return null;
    } catch (error) {
      console.error('❌ Erreur lors de l\'envoi des rappels:', error);
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
