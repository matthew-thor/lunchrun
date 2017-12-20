const Sequelize = require('sequelize');
const db = require('../db');

const Route = db.define('route', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  map: {
    type: Sequelize.STRING,
    defaultValue: 'http://www.gmap-pedometer.com/',
    validate: {
      isUrl: true,
    },
  },
});

module.exports = Route;

/**
 * instanceMethods
 */

/**
 * classMethods
 */

/**
 * hooks
 */
