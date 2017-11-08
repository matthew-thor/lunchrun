const Sequelize = require('sequelize');
const db = require('../db');

const Run = db.define('run', {
  date: {
    type: Sequelize.DATEONLY,
    defaultValue: new Date()
  },
  startTime: {
    type: Sequelize.TIME,
  }
});

module.exports = Run;

/**
 * instanceMethods
 */

/**
 * classMethods
 */

/**
 * hooks
 */
