const mongoose = require('mongoose');

const RequestTypeSchema = new mongoose.Schema(
  {
    code: { type: String, unique: true, required: true }, // ex: "TECH_ISSUE"
    name: { type: String, required: true }, // ex: "Problème technique"
    description: { type: String, required: true },
    priority: {
      type: String,
      enum: ['low', 'medium', 'high', 'critical'],
      default: 'medium',
    },
    category: { type: String, required: true },
    estimatedResponseTime: { type: Number }, // en heures
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true },
);

module.exports = mongoose.model('RequestType', RequestTypeSchema);
