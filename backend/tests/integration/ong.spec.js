const request = require('supertest');
const app = require('../../src/app');
const connection = require('../../src/database/connection');


describe('ONG', () => {
  beforeEach(async () => {
    await connection.migrate.rollback();
    await connection.migrate.latest();
  });

  afterAll(async () => {
    await connection.destroy();
  });

  it('should be able to create an new ONG', async () => {
    const response = await request(app)
      .post('/ongs')
      .send({
        name: "ONG2",
        email: "omgteste@teste.com",
        whatsapp: "47996566569",
        city: "Blumenau",
        uf: "SC"
      });

    expect(response.body).toHaveProperty('id');
    expect(response.body.id).toHaveLength(8);

  });
});