/* global describe beforeEach it */

const { expect } = require('chai');
const db = require('../index');
const User = db.model('user');

const { testClog } = require('../../../utils');

describe('User model', () => {
  beforeEach(async () => {
    await db.sync({ force: true });
  });

  describe('getterMethods', () => {
    let bento;

    beforeEach(async () => {
      bento = await User.create({
        email: 'bento@puppy.dog',
        firstName: 'Bento',
        lastName: 'Thor',
        password: 'bones',
      });
    });

    describe('fullName', () => {
      it("returns a string of a user's first and last names", () => {
        expect(bento.fullName).to.be.equal('Bento Thor');
      });
    }); // end describe('fullName')
  }); // end describe('getterMethods')

  describe('instanceMethods', () => {
    let bento;

    beforeEach(async () => {
      bento = await User.create({
        email: 'bento@puppy.dog',
        firstName: 'Bento',
        lastName: 'Thor',
        password: 'bones',
      });
    });

    describe('correctPassword', () => {
      it('returns true if the password is correct', () => {
        expect(bento.correctPassword('bones')).to.be.equal(true);
      });

      it('returns false if the password is incorrect', () => {
        expect(bento.correctPassword('bonez')).to.be.equal(false);
      });
    }); // end describe('correctPassword')
  }); // end describe('instanceMethods')
}); // end describe('User model')
