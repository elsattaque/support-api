require('dotenv').config();
const RequestType = require('../src/models/RequestType');
const connectDB = require('../src/config/database');

async function seed() {
  try {
    await connectDB();

    console.log('🔄 Suppression des anciens types…');
    await RequestType.deleteMany({});

    console.log('🌱 Insertion des types de base…');
    const seedData = [
      {
        code: 'TECH_ISSUE',
        name: 'Problème technique',
        description: 'Bug, panne ou dysfonctionnement technique.',
        priority: 'high',
        category: 'Support',
        estimatedResponseTime: 4,
      },
      {
        code: 'BILLING_QUESTION',
        name: 'Question de facturation',
        description: 'Demande concernant une facture ou un paiement.',
        priority: 'medium',
        category: 'Facturation',
        estimatedResponseTime: 24,
      },
      {
        code: 'ACCOUNT_UPDATE',
        name: 'Demande de modification de compte',
        description: 'Modification d’informations liées au compte utilisateur.',
        priority: 'low',
        category: 'Compte',
        estimatedResponseTime: 48,
      },
      {
        code: 'FEATURE_REQUEST',
        name: 'Demande de fonctionnalité',
        description: 'Suggestion ou demande d’une nouvelle fonctionnalité.',
        priority: 'medium',
        category: 'Produit',
        estimatedResponseTime: 72,
      },
      {
        code: 'COMPLAINT',
        name: 'Réclamation',
        description: 'Plainte ou insatisfaction d’un utilisateur.',
        priority: 'critical',
        category: 'Support',
        estimatedResponseTime: 12,
      },
    ];

    await RequestType.insertMany(seedData);

    console.log('✅ Données initiales insérées avec succès !');
    process.exit(0);
  } catch (err) {
    console.error('❌ Erreur lors du seed :', err);
    process.exit(1);
  }
}

seed();
