const crypto = require('crypto');
const Sequelize = require('sequelize');
const db = require('../db');
const { sendPasswordResetEmail } = require('../../../utils');

const User = db.define('user', {
  firstName: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  lastName: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  email: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false,
    validate: {
      isEmail: true,
    },
  },
  password: {
    type: Sequelize.STRING,
  },
  salt: {
    type: Sequelize.STRING,
  },
  googleId: {
    type: Sequelize.STRING,
  },
  admin: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  },
  fullName: {
    type: Sequelize.VIRTUAL,
    get() {
      return this.getDataValue('firstName') + ' ' + this.getDataValue('lastName');
    },
  },
}, {
    scopes: {
      noSensitive: {
        attributes: { exclude: ['password', 'salt', 'googleId'] },
      },
    },
  });

module.exports = User;

/**
 * instanceMethods
 */
User.prototype.correctPassword = function (candidatePwd) {
  return User.encryptPassword(candidatePwd, this.salt) === this.password;
};

User.prototype.resetPassword = function () {
  const tempPw = crypto.randomBytes(8).toString('base64');
  this.password = tempPw;
  this.save();
  sendPasswordResetEmail(tempPw, this.email);
  return this.id;
};

/**
 * classMethods
 */
User.generateSalt = function () {
  return crypto.randomBytes(16).toString('base64');
};

User.encryptPassword = function (plainText, salt) {
  return crypto
    .createHash('RSA-SHA256')
    .update(plainText)
    .update(salt)
    .digest('hex');
};

/**
 * hooks
 */
const setSaltAndPassword = user => {
  if (user.changed('password')) {
    user.salt = User.generateSalt();
    user.password = User.encryptPassword(user.password, user.salt);
  }
};

User.beforeCreate(setSaltAndPassword);
User.beforeUpdate(setSaltAndPassword);
