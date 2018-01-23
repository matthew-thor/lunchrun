const crypto = require('crypto');
const Sequelize = require('sequelize');
const db = require('../db');
const { sendInviteEmail } = require('../../../utils');

const Invite = db.define('invite', {
  code: {
    type: Sequelize.STRING,
    defaultValue: crypto.randomBytes(12).toString('base64'),
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
  this.code = crypto.randomBytes(12).toString('base64');
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
