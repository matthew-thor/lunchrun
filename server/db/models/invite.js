const randomstring = require('randomstring');
const Sequelize = require('sequelize');
const db = require('../db');
const { sendInviteEmail } = require('../../../utils');

const Invite = db.define('invite', {
  code: {
    type: Sequelize.STRING,
    defaultValue: randomstring.generate({
      length: 16,
      charset: 'alphanumeric',
    }),
  },
  email: {
    type: Sequelize.STRING,
    validate: {
      isEmail: true,
    },
  },
  groupId: {
    type: Sequelize.INTEGER,
  },
});

module.exports = Invite;

/**
 * instanceMethods
 */
Invite.prototype.generateNewCode = function () {
  this.code = randomstring.generate({
    length: 16,
    charset: 'alphanumeric',
  });
  this.save();
};

Invite.prototype.sendEmail = function () {
  sendInviteEmail(this.code, this.email, this.groupId);
};

/**
 * classMethods
 */

/**
 * hooks
 */
