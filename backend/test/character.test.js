const request = require('supertest');
const app = require('../index.js'); // Ajuste o caminho conforme necessário
const database = require('../config/database'); // Ajuste o caminho conforme necessário
const sequelize = database.getSequelize(); // Obtenha a instância do Sequelize

beforeAll(async () => {
  await sequelize.sync();
});

afterAll(async () => {
  await sequelize.close();
});

describe('GET /api/v1/character/:id', () => {
  it('deve retornar um personagem específico', async () => {
    const response = await request(app).get('/api/v1/character/1');
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('name'); // ou outra propriedade esperada
  }, 10000); // aumenta o timeout para 10 segundos
});
