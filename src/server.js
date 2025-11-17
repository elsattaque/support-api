require('dotenv').config();
const express = require('express');
const connectDB = require('./config/database');
const requestTypesRoutes = require('./routes/requestTypes');

const app = express();

// Middleware pour parser le JSON
app.use(express.json());

// Health check
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

// Routes Request Types
app.use('/api/request-types', requestTypesRoutes);

// Démarrage du serveur uniquement hors mode test
if (process.env.NODE_ENV !== 'test') {
  const PORT = process.env.PORT || 3000;

  connectDB().then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  });
} else {
  // En mode test, on se contente de se connecter à la DB
  connectDB();
}

module.exports = app;
