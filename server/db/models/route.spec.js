/* global describe beforeEach it */

const { expect } = require('chai');
const db = require('../index');
const Route = db.model('route');

const { testClog } = require('../../../utils');

describe('Route model', () => {
  beforeEach(async () => {
    await db.sync({ force: true });
  });

  describe('test category goes here', () => {
    let testRoute;

    beforeEach(async () => {
      testRoute = await Route.create({ name: 'South to Monkey Tree' });
    });

    describe('test goes here', () => {
      xit('test description goes here', () => {
        expect(testRoute.name).to.be.equal('South to Monkey Tree');
      });
    }); // end describe('---TEST DESCRIPTION---')
  }); // end describe('---TEST CATEGORY---')
}); // end describe('Route model')
