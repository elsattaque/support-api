const mongoose = require('mongoose');

async function connectDB() {
  const uri = process.env.MONGODB_URI;

  if (!uri) {
    console.error(
      '❌ Erreur : MONGODB_URI non défini dans les variables d’environnement',
    );
    process.exit(1);
  }

  try {
    await mongoose.connect(uri);
    console.log('✅ Connecté à MongoDB');
  } catch (error) {
    console.error('❌ Erreur de connexion MongoDB :', error);
    process.exit(1);
  }
}

module.exports = connectDB;
