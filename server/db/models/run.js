const Sequelize = require('sequelize');
const db = require('../db');
const Route = require('./route');
const User = require('./user');

const Run = db.define('run', {
  date: {
    type: Sequelize.DATEONLY,
    defaultValue: Date.now(),
  },
  startTime: {
    type: Sequelize.STRING,
    defaultValue: 'TBA',
  },
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
Run.afterSave('setDefaultAdmins', async (run, options) => {
  const group = await run.getGroup();
  const groupAdmins = await group.getAdmins();
  return run.addAdmins(groupAdmins);
});
