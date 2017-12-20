/* global describe beforeEach xit */

const { expect } = require('chai');
const request = require('supertest');
const db = require('../db');
const app = require('../index');
const Route = db.model('route');

const { testClog } = require('../../utils');

describe('Route routes', () => {
  beforeEach(async () => {
    await db.sync({ force: true });
  });

  const monkeyTree = 'South to Monkey Tree';
  const sharkBoard = 'North to Shark Board'
  const alleyRun = { name: 'Alley Run!' };

  describe('/api/routes', () => {

    beforeEach(async () => {
      await Route.create({ name: monkeyTree });
    });

    it('GET /api/routes', async () => {
      const res = await request(app).get('/api/routes');

      expect(res.status).to.be.equal(200);
      expect(res.body).to.be.an('array');
      expect(res.body[0].name).to.be.equal(monkeyTree);
    });

    it('GET /api/routes/:id', async () => {
      const res = await request(app).get('/api/routes/1');

      expect(res.body).to.be.an('object');
      expect(res.status).to.be.equal(200);
      expect(res.body.name).to.be.equal(monkeyTree);
    });

    it('PUT /api/routes/:id', async () => {
      const res = await request(app)
        .put('/api/routes/1')
        .type('form')
        .send({ name: sharkBoard });

      expect(res.body).to.be.an('object');
      expect(res.status).to.be.equal(204);

      const updatedRoute = await Route.findById(1);
      expect(updatedRoute.name).to.be.equal(sharkBoard);
    });

    it('POST /api/routes', async () => {

      const res = await request(app)
        .post('/api/routes')
        .type('form')
        .send(alleyRun);

      expect(res.body).to.be.an('object');
      expect(res.status).to.be.equal(201);
      expect(res.body.name).to.be.equal(alleyRun.name);
    });

    it('DELETE /api/routes/:id', async () => {
      const res = await request(app).delete('/api/routes/1');
      const route1 = await Route.findById(1);

      expect(res.status).to.be.equal(204);
      expect(route1).to.be.equal(null);
    });
  }); // end describe('/api/routes')
}); // end describe('Route routes')
