/* global describe beforeEach it */

const { expect } = require('chai');
const db = require('../index');
const Run = db.model('run');

const { testClog } = require('../../../utils');

describe('Run model', () => {
  beforeEach(async () => {
    await db.sync({ force: true });
  });

  describe('test category goes here', () => {
    let testRun;

    beforeEach(async () => {
      testRun = await Run.create({
        date: Date.now(),
        startTime: '12:00:00',
      });
    });

    describe('test goes here', () => {
      xit('test description goes here', () => {
        expect(testRun.startTime).to.be.equal('12:00:00');
      });
    }); // end describe('---TEST DESCRIPTION---')
  }); // end describe('getterMethods')
}); // end describe('Run model')
