/* global describe beforeEach it */

const { expect } = require('chai');
const request = require('supertest');
const db = require('../db');
const app = require('../index');
const User = db.model('user');

const { testClog } = require('../../utils');

describe('User routes', () => {
  beforeEach(async () => {
    await db.sync({ force: true });
  });

  describe('/api/users', () => {
    const bentosEmail = 'bento@puppy.dog';

    beforeEach(async () => {
      await User.create({
        firstName: 'Bento',
        lastName: 'Thor',
        email: bentosEmail,
      });
    });

    it('GET /api/users', async () => {
      const res = await request(app).get('/api/users');

      expect(res.status).to.be.equal(200);
      expect(res.body).to.be.an('array');
      expect(res.body[0].email).to.be.equal(bentosEmail);
    });

    it('GET /api/users/:id', async () => {
      const res = await request(app).get('/api/users/1');

      expect(res.body).to.be.an('object');
      expect(res.status).to.be.equal(200);
      expect(res.body.email).to.be.equal(bentosEmail);
    });

    it('PUT /api/users/:id', async () => {
      const res = await request(app)
      .put('/api/users/1')
      .type('form')
      .send({ email: 'email@for.bento' });

      expect(res.body).to.be.an('object');
      expect(res.status).to.be.equal(204);

      const newBento = await User.findById(1);
      expect(newBento.email).to.be.equal('email@for.bento');
    });

    it('POST /api/users', async () => {
      const chilisEmail = 'chili@big.dog';

      const res = await request(app)
      .post('/api/users')
      .type('form')
      .send({
        email: chilisEmail,
        firstName: 'Chili',
        lastName: 'Thor',
      });

      expect(res.body).to.be.an('object');
      expect(res.status).to.be.equal(201);
      expect(res.body.email).to.be.equal(chilisEmail);
    });

    it('DELETE /api/users/:id', async () => {
      const res = await request(app).delete('/api/users/1');
      const user1 = await User.findById(1);

      expect(res.status).to.be.equal(204);
      expect(user1).to.be.equal(null);
    });
  }); // end describe('/api/users')
}); // end describe('User routes')
