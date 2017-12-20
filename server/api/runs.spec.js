/* global describe beforeEach it */

const { expect } = require('chai');
const request = require('supertest');
const db = require('../db');
const app = require('../index');
const Run = db.model('run');

const { testClog } = require('../../utils');

describe('Run routes', () => {
  beforeEach(async () => {
    await db.sync({ force: true });
  });

  const start = '12:30:00';
  const newStart = '11:45:00';
  const newRun = { startTime: '11:50:00' };

  describe('/api/runs', () => {

    beforeEach(async () => {
      await Run.create({ startTime: start });
    });

    it('GET /api/runs', async () => {
      const res = await request(app).get('/api/runs');

      expect(res.status).to.be.equal(200);
      expect(res.body).to.be.an('array');
      expect(res.body[0].startTime).to.be.equal(start);
    });

    it('GET /api/runs/:id', async () => {
      const res = await request(app).get('/api/runs/1');

      expect(res.body).to.be.an('object');
      expect(res.status).to.be.equal(200);
      expect(res.body.startTime).to.be.equal(start);
    });

    xit('PUT /api/runs/:id', async () => {
      const res = await request(app)
        .put('/api/runs/1')
        .type('form')
        .send({ startTime: newStart });

      expect(res.body).to.be.an('object');
      expect(res.status).to.be.equal(204);

      const updatedRun = await Run.findById(1);
      expect(updatedRun.email).to.be.equal(newStart);
    });

    xit('POST /api/runs', async () => {

      const res = await request(app)
        .post('/api/runs')
        .type('form')
        .send(newRun);

      expect(res.body).to.be.an('object');
      expect(res.status).to.be.equal(201);
      expect(res.body.startTime).to.be.equal(newRun.startTime);
    });

    xit('DELETE /api/runs/:id', async () => {
      const res = await request(app).delete('/api/runs/1');
      const run1 = await Run.findById(1);

      expect(res.status).to.be.equal(204);
      expect(run1).to.be.equal(null);
    });
  }); // end describe('/api/runs')

  describe('/api/runs/date', () => {
    const NYE2017 = '2017-12-31';
    const my32ndBirthday = '2018-07-25';

    beforeEach(async () => {
      await Run.create({ date: NYE2017, startTime: '12:15:00' });
    });

    it('GET /api/runs/date/:date', async () => {
      const res1 = await request(app).get(`/api/runs/date/${NYE2017}`);

      expect(res1.status).to.be.equal(200);
      expect(res1.body.date).to.be.equal(NYE2017);

      const res2 = await request(app).get(`/api/runs/date/${my32ndBirthday}`);

      expect(res2.status).to.be.equal(201);
      expect(res2.body.date).to.be.equal(my32ndBirthday);
    });

    it('PUT /api/runs/date/:date', async () => {
      const res = await request(app)
        .put(`/api/runs/date/${NYE2017}`)
        .type('form')
        .send({ startTime: newStart });

      expect(res.body).to.be.an('object');
      expect(res.status).to.be.equal(204);

      const updatedRun = await Run.findById(1);
      expect(updatedRun.startTime).to.be.equal(newStart);
    });
  }); // end describe('/api/runs/date')
}); // end describe('Run routes')
