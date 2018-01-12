const Sequelize = require('sequelize');
const db = require('../db');
const Route = require('./route');
const User = require('./user');

const Run = db.define('run', {
  date: {
    type: Sequelize.DATEONLY,
    defaultValue: new Date(),
  },
  startTime: {
    type: Sequelize.TIME,
  },
}, {
    defaultScope: {
      include: [
        { model: Route, attributes: ['id', 'name', 'map'] },
        {
          model: User,
          as: 'participants',
          attributes: ['firstName', 'lastName', 'id', 'email'],
          through: { attributes: [] }, // gets rid of nested join table
        }],
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
Run.afterCreate(async (run, options) => {
  await run.setRoute(1);
});
