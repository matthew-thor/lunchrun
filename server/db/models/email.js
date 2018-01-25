const Sequelize = require('sequelize');
const db = require('../db');

const Email = db.define('email', {
  time: {
    type: Sequelize.STRING,
  },
  type: {
    type: Sequelize.ENUM,
    values: ['first', 'update'],
  },
  days: {
    type: Sequelize.STRING,
  },
});

module.exports = Email;

/**
 * instanceMethods
 */

/**
 * classMethods
 */

/**
 * hooks
 */
