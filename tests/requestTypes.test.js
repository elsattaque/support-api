const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../src/server');
const RequestType = require('../src/models/RequestType');

describe('API Request Types', () => {
  let existingType;

  beforeAll(async () => {
    // Nettoyage + création d’un type de base
    await RequestType.deleteMany({});

    existingType = await RequestType.create({
      code: 'TEST_TYPE',
      name: 'Type de test',
      description: 'Description test',
      priority: 'medium',
      category: 'Test',
      estimatedResponseTime: 10,
      isActive: true,
    });
  });

  afterAll(async () => {
    // Fermeture propre de la connexion Mongo
    await mongoose.connection.close();
  });

  test('GET /health should return 200 and status ok', async () => {
    const res = await request(app).get('/health');

    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({ status: 'ok' });
  });

  test('GET /api/request-types should return an array', async () => {
    const res = await request(app).get('/api/request-types');

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    // On s’assure au moins qu’un type existe
    expect(res.body.length).toBeGreaterThanOrEqual(1);
  });

  test('GET /api/request-types/:id should return a single type', async () => {
    const res = await request(app).get(`/api/request-types/${existingType._id}`);

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('_id', existingType._id.toString());
    expect(res.body).toHaveProperty('code', 'TEST_TYPE');
  });

  test('GET /api/request-types/:id should return 404 if not found', async () => {
    const fakeId = new mongoose.Types.ObjectId();
    const res = await request(app).get(`/api/request-types/${fakeId}`);

    expect(res.statusCode).toBe(404);
    expect(res.body).toHaveProperty('error');
  });

  test('POST /api/request-types should create a new entry', async () => {
    const newType = {
      code: 'NEW_TYPE',
      name: 'Nouveau type',
      description: 'Création via test',
      priority: 'high',
      category: 'TestCat',
      estimatedResponseTime: 5,
    };

    const res = await request(app)
      .post('/api/request-types')
      .send(newType);

    expect(res.statusCode).toBe(201);
    expect(res.body.code).toBe('NEW_TYPE');
    expect(res.body.name).toBe('Nouveau type');
  });
});
