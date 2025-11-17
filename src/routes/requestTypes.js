const express = require('express');
const RequestType = require('../models/RequestType');

const router = express.Router();

// GET /api/request-types : liste tous les types actifs
router.get('/', async (req, res) => {
  try {
    const types = await RequestType.find({ isActive: true });
    res.status(200).json(types);
  } catch {
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

// GET /api/request-types/:id : récupère un type par ID
router.get('/:id', async (req, res) => {
  try {
    const type = await RequestType.findById(req.params.id);

    if (!type) {
      return res.status(404).json({ error: 'Type non trouvé' });
    }

    res.status(200).json(type);
  } catch {
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

// POST /api/request-types : créer un type
router.post('/', async (req, res) => {
  try {
    const newType = await RequestType.create(req.body);
    res.status(201).json(newType);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
